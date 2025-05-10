using MusicAtlas.Model.Processing;
using MusicAtlas.Service;

namespace MusicAtlas
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            string sootifyArtistId = "2rfkmr5WzRN9D9gAfb2ycd"; // Spotify artist ID
            long appleArtistId = 42125570;
            string artistName = "Vesna";
            string market = "SK"; //"CZ";

            ImportService importService = new ImportService();

            SeedInfo seedInfo = new SeedInfo
            {
                AppleId = appleArtistId,
                SpotifyId = sootifyArtistId
            };
            await importService.Import(seedInfo);

            Console.WriteLine("Done.");
        }
    }
}
