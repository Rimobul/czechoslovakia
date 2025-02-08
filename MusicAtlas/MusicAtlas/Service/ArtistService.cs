using Microsoft.EntityFrameworkCore;
using MusicAtlas.Data;
using MusicAtlas.Model.Database;
using MusicAtlas.Model.Processing;
using MusicAtlas.Model.Spotify;

namespace MusicAtlas.Service
{
    public class ArtistService
    {
        public async Task<Model.Database.Artist> AddNewSpotifyArtist(AppDbContext context, Model.Spotify.Artist input, Track bestTrack, int sourceIteration)
        {
            var result = new Model.Database.Artist
            {
                Id = Guid.NewGuid(),
                Name = input.Name,
                Iteration = sourceIteration + 1,
                Status = ArtistStatus.New
            };

            result.SpotifyProfiles.Add(MapNewSpotifyProfile(input, bestTrack));

            await HandleGenres(context, input, result);

            context.Artists.Add(result);
            await context.SaveChangesAsync();

            return result;
        }
        public async Task<Model.Database.Artist> AddLinkableArtist(AppDbContext context, LinkableArtist input, int sourceIteration)
        {
            var result = new Model.Database.Artist
            {
                Id = Guid.NewGuid(),
                Name = input.SpotifyName,
                Iteration = sourceIteration + 1,
                Status = ArtistStatus.New
            };

            result.SpotifyProfiles.Add(MapLinkableSpotifyProfile(input));

            context.Artists.Add(result);
            await context.SaveChangesAsync();

            return result;
        }

        private async Task HandleGenres(AppDbContext context, Model.Spotify.Artist input, Model.Database.Artist result)
        {
            var inputGenres = input.Genres;

            foreach (var genre in inputGenres)
            {
                var existingGenre = await context.Genres.FirstOrDefaultAsync(x => x.Name == genre);

                if (existingGenre != null)
                {
                    result.Genres.Add(existingGenre);
                }
                else
                {
                    result.Genres.Add(new Genre
                    {
                        Id = Guid.NewGuid(),
                        Name = genre,
                        LastUpdated = DateTime.Now,
                    });
                }
            }
        }

        private SpotifyProfile MapNewSpotifyProfile(Model.Spotify.Artist input, Track bestTrack)
        {
            return new SpotifyProfile
            {
                BestTrackPopularity = bestTrack.Popularity,
                Id = input.Id,
                LastUpdated = DateTime.UtcNow,
                Name = input.Name,
                Popularity = input.Popularity
            };
        }

        private SpotifyProfile MapLinkableSpotifyProfile(LinkableArtist input)
        {
            return new SpotifyProfile
            {
                Id = input.SpotifyId,
                LastUpdated = DateTime.UtcNow,
                Name = input.SpotifyName
            };
        }
    }
}
