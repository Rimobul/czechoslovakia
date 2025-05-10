using CsvHelper;
using MusicAtlas.Data;
using MusicAtlas.Model.Database;
using MusicAtlas.Model.Processing;
using System.Globalization;
using System.Text;

namespace MusicAtlas.Service
{
    public class CsvProcessingService
    {
        public async Task Process(string path)
        {
            using (var context = new AppDbContext())
            {
                context.Database.EnsureCreated();

                using (var reader = new StreamReader(path, new UTF8Encoding(true)))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    var artists = csv.GetRecords<ExportArtist>(); // Automatically maps CSV to objects
                    foreach (var artist in artists)
                    {
                        switch (artist.Status)
                        {
                            case ArtistStatus.Refused:
                                await RefuseArtist(context, artist);
                                break;
                            case ArtistStatus.Accepted:
                                await UpdateArtist(context, artist);
                                break;
                            case ArtistStatus.Duplicate:
                                await ProcessDuplicate(context, artist);
                                break;
                            default:
                                continue;
                        }
                    }
                }
            }
        }

        private async Task ProcessDuplicate(AppDbContext context, ExportArtist artist)
        {
            var artistToDelete = context.Artists.Single(x => x.Id == artist.Id);
            var newParentArtist = context.Artists.Single(x => x.Id == artist.DuplicateParentId);

            // Reparent all Spotify profiles
            var spotifyProfiles = context.SpotifyProfiles.Where(x => x.ArtistId == artistToDelete.Id);
            foreach (var spotifyProfile in spotifyProfiles)
            {
                spotifyProfile.ArtistId = newParentArtist.Id;
            }
            await context.SaveChangesAsync();

            // Delete duplicate
            context.Artists.Remove(artistToDelete);
            await context.SaveChangesAsync();
        }

        private async Task UpdateArtist(AppDbContext context, ExportArtist artist)
        {
            var dbArtist = context.Artists.Single(x => x.Id == artist.Id);

            dbArtist.BornIn = artist.BornIn;
            dbArtist.BornOn = artist.BornOn;
            dbArtist.DiedIn = artist.DiedIn;
            dbArtist.DiedOn = artist.DiedOn;
            dbArtist.Name = artist.Name;
            dbArtist.Nationality = artist.Nationality;
            dbArtist.Status = ArtistStatus.Accepted;
            dbArtist.WithDetails = artist.WithDetails;

            await context.SaveChangesAsync();
        }

        private async Task RefuseArtist(AppDbContext context, ExportArtist artist)
        {
            var dbArtist = context.Artists.Single(x => x.Id == artist.Id);
            dbArtist.Status = ArtistStatus.Refused;
            await context.SaveChangesAsync();
        }
    }
}
