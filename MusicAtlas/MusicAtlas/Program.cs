using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json.Linq;

namespace MusicAtlas
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            string artistId = "2rfkmr5WzRN9D9gAfb2ycd"; // Spotify artist ID
            string artistName = "Vesna";
            string market = "SK"; //"CZ";

            string accessToken = await GetAccessToken();
            //string artistInfo = await GetArtistInfoAsync(artistId, accessToken);
            //string artistInfo = await SearchSpotify(artistId, market, accessToken);
            string artistInfo = await GetArtistsTopTracks(artistId, market, accessToken);
            Console.WriteLine(artistInfo);
        }

        private static async Task<string> GetArtistsTopTracks(string artistId, string market, string accessToken)
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                string url = $"https://api.spotify.com/v1/artists/{artistId}/top-tracks?market={market}";

                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                JObject artistJson = JObject.Parse(responseBody);

                return artistJson.ToString();
            }
        }

        private static async Task<string> GetArtistInfoAsync(string artistId, string accessToken)
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                string url = $"https://api.spotify.com/v1/artists/{artistId}";

                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                JObject artistJson = JObject.Parse(responseBody);

                return artistJson.ToString();
            }
        }

        private static async Task<string> SearchSpotify(string artistName, string market, string accessToken, int limit = 10, int offset = 0)
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                string url = $"https://api.spotify.com/v1/search?q={artistName}&type=artist&market={market}&limit={limit}&offset={offset}";

                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                JObject artistJson = JObject.Parse(responseBody);

                return artistJson.ToString();
            }
        }

        private static async Task<string> GetAccessToken()
        {
            using (HttpClient client = new HttpClient())
            {
                string tokenEndpoint = "https://accounts.spotify.com/api/token";

                var encodedCredentials = Convert.ToBase64String(Encoding.UTF8.GetBytes(Secrets.ClientId + ":" + Secrets.ClientSecret));
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", encodedCredentials);

                var dataContent = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("grant_type", "client_credentials")
                });

                HttpResponseMessage response = await client.PostAsync(tokenEndpoint, dataContent);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                var tokenResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(responseBody);

                string accessToken = tokenResponse.access_token;
                return accessToken;
            }
        }
    }
}
