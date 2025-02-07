using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json.Linq;

namespace MusicAtlas
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            string artistId = "2rfkmr5WzRN9D9gAfb2ycd?si=9Riumf8VS6Cxo0u6burlQQ"; // Spotify artist ID

            string accessToken = await GetAccessToken();
            string artistInfo = await GetArtistInfoAsync(artistId, accessToken);
            Console.WriteLine(artistInfo);
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
