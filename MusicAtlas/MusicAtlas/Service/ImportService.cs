using Microsoft.EntityFrameworkCore;
using MusicAtlas.Data;
using MusicAtlas.Model.Database;
using MusicAtlas.Model.Processing;
using MusicAtlas.Model.Spotify;

namespace MusicAtlas.Service
{
    public class ImportService
    {
        private readonly SpotifyService spotifyService;
        //private readonly AppleService appleService;
        private readonly ArtistService artistService;
        private readonly LinkService linkService;

        public ImportService()
        {
            spotifyService = new SpotifyService();
            //appleService = new AppleService();
            artistService = new ArtistService();
            linkService = new LinkService();
        }

        public async Task Import(SeedInfo seed)
        {
            using (var context = new AppDbContext())
            {
                context.Database.EnsureCreated();

                var seedSpotifyProfile = await context.SpotifyProfiles.FirstOrDefaultAsync(x => x.Id == seed.SpotifyId);

                if (seedSpotifyProfile == null)
                {
                    await CreateArtist(context, seed.SpotifyId, seed.AppleId, ArtistStatus.Accepted);
                }

                await ImportAccepted(context);
            }
        }

        private async Task ImportAccepted(AppDbContext context)
        {
            var acceptedArtists = context.Artists
                .Where(x => x.Status == ArtistStatus.Accepted)
                .Include(x => x.SpotifyProfiles).ThenInclude(x => x.Genres);

            var spotifyAccessToken = await spotifyService.GetAccessToken();

            //var appleAccessToken = await appleService.GetAccessToken();

            // Spotify IDs which already exist and should not be imported again
            HashSet<string> skipIds = context.SpotifyProfiles.Select(x => x.Id).ToHashSet();

            foreach (var artist in acceptedArtists)
            {
                await UpdateSpotifyInfo(context, artist, spotifyAccessToken, skipIds);
                //await UpdateAppleInfo(context, artist, appleAccessToken);
                await MarkAsProcessed(context, artist);

                await context.SaveChangesAsync();
            }
        }

        private async Task MarkAsProcessed(AppDbContext context, Model.Database.Artist artist)
        {
            artist.Status = ArtistStatus.Processed;
            await context.SaveChangesAsync();
        }

        //private async Task UpdateAppleInfo(AppDbContext context, Model.Database.Artist artist, string appleAccessToken)
        //{
        //    var appleProfiles = artist.AppleProfiles;

        //    foreach (var appleProfile in appleProfiles)
        //    {
        //        // Update artist info
        //        var appleArtist = await appleService.GetArtistInfoAsync(appleProfile.Id, appleAccessToken);

        //        await artistService.UpdateAppleProfile(context, artist, appleArtist);

        //        // Link related artists
        //        var relatedArtists = await appleService.GetRelatedArtists(appleProfile.Id, appleAccessToken);

        //        foreach (var relatedArtist in relatedArtists)
        //        {
        //            var linkedArtist = await artistService.GetOrCreateLinkableArtist(context, relatedArtist, artist.Iteration);
        //            await linkService.AddLink(context, artist, linkedArtist, relatedArtist.LinkWeight);
        //        }
        //    }
        //}

        private async Task UpdateSpotifyInfo(AppDbContext context, Model.Database.Artist artist, string spotifyAccessToken, HashSet<string> skipIds)
        {
            var spotifyProfiles = artist.SpotifyProfiles;

            foreach(var spotifyProfile in spotifyProfiles)
            {
                // Update artist info
                var spotifyArtist = await spotifyService.GetArtistInfoAsync(spotifyProfile.Id, spotifyAccessToken);

                var czechTracks = await spotifyService.GetArtistsTopTracks(spotifyProfile.Id, Constants.CzechMarket, spotifyAccessToken);
                var slovakTracks = await spotifyService.GetArtistsTopTracks(spotifyProfile.Id, Constants.SlovakMarket, spotifyAccessToken);

                var bestTrack = czechTracks.Tracks.Union(slovakTracks.Tracks).OrderByDescending(x => x.Popularity).FirstOrDefault();

                await artistService.UpdateSpotifyProfile(context, artist, spotifyArtist, bestTrack);

                // Link related artists
                var czechSearchResult = await spotifyService.SearchSpotify(spotifyArtist.Name, Constants.CzechMarket, spotifyAccessToken);
                var slovakSearchResult = await spotifyService.SearchSpotify(spotifyArtist.Name, Constants.SlovakMarket, spotifyAccessToken);

                var linkableArtists = linkService.ExtractSpotifyArtists(
                    skipIds,
                    new List<TrackCollection> { czechTracks, slovakTracks },
                    new List<ArtistCollection> { czechSearchResult, slovakSearchResult });

                foreach (var linkableArtist in linkableArtists)
                {
                    var linkedArtist = await artistService.GetOrCreateLinkableArtist(context, linkableArtist, artist.Iteration);
                    await linkService.AddLink(context, artist, linkedArtist, linkableArtist.LinkWeight);
                }
            }            
        }

        private async Task<Model.Database.Artist> CreateArtist(AppDbContext context, string spotifySeedId, long appleId, ArtistStatus status = ArtistStatus.New)
        {
            var accessToken = await spotifyService.GetAccessToken();
            var spotifyArtist = await spotifyService.GetArtistInfoAsync(spotifySeedId, accessToken);
            
            var sourceArtist = await artistService.AddNewArtist(context, spotifyArtist, 0, status);

            //if (appleId != null)
            //{
            //    var appleAccessToken = await appleService.GetAccessToken();
            //    var appleArtist = await appleService.GetArtistInfoAsync(appleId, appleAccessToken);

            //    await artistService.AddAppleProfile(context, appleArtist, sourceArtist);
            //}

            return sourceArtist;
        }

        private async Task UpdateArtist(AppDbContext context, string spotifySeedId, ArtistStatus status = ArtistStatus.New)
        {
            var accessToken = await spotifyService.GetAccessToken();
            
            
        }
    }
}
