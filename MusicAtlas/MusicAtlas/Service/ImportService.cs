using Microsoft.EntityFrameworkCore;
using MusicAtlas.Data;

namespace MusicAtlas.Service
{
    public class ImportService
    {
        public async Task Import(string spotifySeedId)
        {
            using (var context = new AppDbContext())
            {
                context.Database.EnsureCreated();

                var seedSpotifyProfile = await context.SpotifyProfiles.FirstOrDefaultAsync(x => x.Id == spotifySeedId);

                if (seedSpotifyProfile == null)
                {
                    await ImportSeed(context, spotifySeedId);
                }
                else
                {
                    await ImportUnprocessed(context);
                }
            }
        }

        private Task ImportUnprocessed(AppDbContext context)
        {
            throw new NotImplementedException();
        }

        private async Task ImportSeed(AppDbContext context, string spotifySeedId)
        {
            var spotifyService = new SpotifyService();

            var accessToken = await spotifyService.GetAccessToken();
            var spotifyArtist = await spotifyService.GetArtistInfoAsync(spotifySeedId, accessToken);

            var czechTracks = await spotifyService.GetArtistsTopTracks(spotifySeedId, Constants.CzechMarket, accessToken);
            var slovakTracks = await spotifyService.GetArtistsTopTracks(spotifySeedId, Constants.SlovakMarket, accessToken);

            var bestTrack = czechTracks.Tracks.Union(slovakTracks.Tracks).OrderByDescending(x => x.Popularity).FirstOrDefault();

            // TODO: process links

            var mappingService = new MappingService();

            await mappingService.AddNewSpotifyArtist(context, spotifyArtist, bestTrack, 0);
        }
    }
}
