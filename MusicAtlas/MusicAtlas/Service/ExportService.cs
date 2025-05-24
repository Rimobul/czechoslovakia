using CsvHelper;
using Microsoft.EntityFrameworkCore;
using MusicAtlas.Data;
using MusicAtlas.Model.Database;
using MusicAtlas.Model.Processing;
using System.Globalization;

namespace MusicAtlas.Service
{
    internal class ExportService
    {
        public ExportService()
        {
        }

        internal async Task Export(string path)
        {
            using (var context = new AppDbContext())
            {
                context.Database.EnsureCreated();

                var newArtists = context.Artists
                    .Include(x => x.SpotifyProfiles)
                    .Where(x => x.Status == ArtistStatus.New)
                    .OrderBy(x => x.Name)
                    .Take(100);

                var exportArtists = ConvertToExportArtists(newArtists);

                string directoryPath = Path.GetDirectoryName(path);
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                using (var writer = new StreamWriter(path, false, new System.Text.UTF8Encoding(true)))
                using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                {
                    await csv.WriteRecordsAsync(exportArtists);
                }
            }
        }

        private IEnumerable<ExportArtist> ConvertToExportArtists(IQueryable<Artist> newArtists)
        {
            foreach (var artist in newArtists)
            {
                // At this stage, there should be a 1:1 mapping between Artist and Spotify profile.
                // This is not guaranteed in later steps of processing.
                var spotifyProfile = artist.SpotifyProfiles.Single();

                yield return new ExportArtist
                {
                    Id = artist.Id,
                    // The space at the end is important to terminate URL in text editors
                    SpotifyLink = $"https://open.spotify.com/artist/{spotifyProfile.Id} ",
                    Iteration = artist.Iteration,
                    Name = artist.Name,
                    Status = artist.Status,
                    WithDetails = artist.WithDetails
                };
            }
        }
    }
}