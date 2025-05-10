using MusicAtlas.Model.Processing;
using MusicAtlas.Service;

namespace MusicAtlas
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Choose an option:");
            Console.WriteLine("1. Download from Spotify");
            Console.WriteLine("2. Export CSV");
            Console.WriteLine("3. Process CSV");

            var option = int.Parse(Console.ReadLine());

            switch (option)
            {
                case 1:
                    await DownloadFromSpotify();
                    break;
                case 2:
                    await ExportCSV();
                    break;
                case 3:
                    await ProcessCSV();
                    break;
                default:
                    Console.WriteLine("Invalid option");
                    break;
            }

            Console.WriteLine("Done.");
        }

        private static async Task ProcessCSV()
        {
            string path = @"C:\musicAtlas\export.csv";
            CsvProcessingService csvProcessingService = new CsvProcessingService();
            await csvProcessingService.Process(path);
        }

        private static async Task ExportCSV()
        {
            string path = @"C:\musicAtlas\export.csv";
            ExportService exportService = new ExportService();
            await exportService.Export(path);
        }

        private static async Task DownloadFromSpotify()
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
        }
    }
}
