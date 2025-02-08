using MusicAtlas.Model.Spotify;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace MusicAtlas.Service
{
    public class SpotifyService
    {
        public async Task<TrackCollection> GetArtistsTopTracks(string artistId, string market, string accessToken)
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                string url = $"https://api.spotify.com/v1/artists/{artistId}/top-tracks?market={market}";

                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                TrackCollection trackCollection = JsonConvert.DeserializeObject<TrackCollection>(responseBody);

                return trackCollection;
            }
        }

        public async Task<Artist> GetArtistInfoAsync(string artistId, string accessToken)
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                string url = $"https://api.spotify.com/v1/artists/{artistId}";

                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                Artist artist = JsonConvert.DeserializeObject<Artist>(responseBody);

                return artist;
            }
        }

        public async Task<ArtistCollection> SearchSpotify(string artistName, string market, string accessToken, int limit = 10, int offset = 0)
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                string url = $"https://api.spotify.com/v1/search?q={artistName}&type=artist&market={market}&limit={limit}&offset={offset}";

                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                ArtistCollection searchResult = JsonConvert.DeserializeObject<ArtistCollection>(responseBody);

                return searchResult;
            }
        }

        public async Task<string> GetAccessToken()
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
