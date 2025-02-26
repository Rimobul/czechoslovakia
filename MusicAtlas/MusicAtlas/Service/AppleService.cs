using MusicAtlas.Data;
using MusicAtlas.Model.Processing;
using MusicAtlas.Model.Spotify;

namespace MusicAtlas.Service
{
    public class AppleService
    {
        internal async Task<string> GetAccessToken()
        {
            throw new NotImplementedException();
        }

        internal async Task<object> GetArtistInfoAsync(string appleId, object appleAccessToken)
        {
            throw new NotImplementedException();
        }

        internal async Task<List<object>> GetRelatedArtists(string id, string appleAccessToken)
        {
            throw new NotImplementedException();
        }
    }
}
