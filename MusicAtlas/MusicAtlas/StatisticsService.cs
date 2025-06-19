
using Microsoft.EntityFrameworkCore;
using MusicAtlas.Data;

namespace MusicAtlas
{
    internal class StatisticsService
    {
        public StatisticsService()
        {
        }

        internal async Task<List<string>> GetStatistics(int maxIteration)
        {
            var result = new List<string>();

            using (var context = new AppDbContext())
            {
                context.Database.EnsureCreated();

                var allArtists = await context.Artists
                    .Where(x => x.Status == Model.Database.ArtistStatus.Processed
                        && x.Iteration <= maxIteration)
                    .Include(x => x.SpotifyProfiles)
                    .ThenInclude(x => x.Genres)
                    .Include(x => x.SourceLinks)
                    .Include(x => x.DestinationLinks)
                    .ToListAsync();

                var artistIds = allArtists.Select(x => x.Id).ToHashSet();

                var czechArtists = allArtists.Where(x => x.Nationality == "Czech").Count();

                result.Add($"Total artists: {allArtists.Count}");
                result.Add($"Czech {czechArtists}, Slovak {allArtists.Count - czechArtists}");

                var mostPopular = allArtists
                    .GroupBy(x => x.Name,
                        x => x.SpotifyProfiles.Max(y => y.BestTrackPopularity + y.Popularity))
                    .OrderByDescending(x => x.Max(y => y))
                    .Take(10)
                    .ToDictionary(x => x.Key, x => x.Max(y => y));

                result.Add("Top 10 artists:");
                for (int i = 0; i < mostPopular.Count; i++)
                {
                    var artist = mostPopular.ElementAt(i);
                    result.Add($"{i + 1}. {artist.Key}, relative popularity {artist.Value}");
                }

                var combined = new Dictionary<string, int>();

                foreach (var artist in allArtists)
                {
                    combined[artist.Name] = 
                        artist.SourceLinks.Where(x => artistIds.Contains(x.DestinationArtistId)).Count()
                        + artist.DestinationLinks.Where(x => artistIds.Contains(x.SourceArtistId)).Count();
                }

                var maxCombined = combined.OrderByDescending(x => x.Value).FirstOrDefault();

                result.Add($"Artist with most links: {maxCombined.Key} with {maxCombined.Value} links.");

                var mostPopularGenres = allArtists
                    .SelectMany(x => x.SpotifyProfiles.SelectMany(y => y.Genres))
                    .GroupBy(x => x.Name)
                    .OrderByDescending(x => x.Count())
                    .Take(5)
                    .ToDictionary(x => x.Key, x => x.Count());

                result.Add("Most popular genres:");
                foreach (var genre in mostPopularGenres)
                {
                    result.Add($"{genre.Key} with {genre.Value} artists.");
                }

                return result;
            }
        }
    }
}