using Microsoft.EntityFrameworkCore;
using MusicAtlas.Data;
using MusicAtlas.Model.Spotify;

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

            var czechSearchResult = await spotifyService.SearchSpotify(spotifyArtist.Name, Constants.CzechMarket, accessToken);
            var slovakSearchResult = await spotifyService.SearchSpotify(spotifyArtist.Name, Constants.SlovakMarket, accessToken);

            var artistService = new ArtistService();

            var sourceArtist = await artistService.AddNewSpotifyArtist(context, spotifyArtist, bestTrack, 0);

            var linkService = new LinkService();

            var linkableArtists = linkService.ExtractLinkableArtists(
                spotifyArtist,
                new List<TrackCollection> { czechTracks, slovakTracks },
                new List<ArtistCollection> { czechSearchResult, slovakSearchResult });

            foreach (var linkableArtist in linkableArtists)
            {
                var linkedArtist= await artistService.AddLinkableArtist(context, linkableArtist, sourceArtist.Iteration);
                await linkService.AddLink(context, sourceArtist, linkedArtist, linkableArtist.LinkWeight);
            }
        }
    }
}
