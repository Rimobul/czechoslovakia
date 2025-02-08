using MusicAtlas.Service;

namespace MusicAtlas
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            string artistId = "2rfkmr5WzRN9D9gAfb2ycd"; // Spotify artist ID
            string artistName = "Vesna";
            string market = "SK"; //"CZ";

            ImportService importService = new ImportService();

            await importService.Import(artistId);

            Console.WriteLine("Done.");
        }
    }
}
