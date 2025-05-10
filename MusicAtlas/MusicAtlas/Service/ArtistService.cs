using Microsoft.EntityFrameworkCore;
using MusicAtlas.Data;
using MusicAtlas.Model.Database;
using MusicAtlas.Model.Processing;
using MusicAtlas.Model.Spotify;

namespace MusicAtlas.Service
{
    public class ArtistService
    {
        private readonly GenreService genreService;

        public ArtistService()
        {
            genreService = new GenreService();
        }

        public async Task<Model.Database.Artist> AddNewArtist(AppDbContext context, Model.Spotify.Artist input, int sourceIteration, ArtistStatus status)
        {
            var result = new Model.Database.Artist
            {
                Id = Guid.NewGuid(),
                Name = input.Name,
                Iteration = sourceIteration + 1,
                Status = status
            };

            var spotifyProfile = MapNewSpotifyProfile(input, null);
            result.SpotifyProfiles.Add(spotifyProfile);

            context.Artists.Add(result);
            await context.SaveChangesAsync();

            return result;
        }
        public async Task<Model.Database.Artist> GetOrCreateLinkableArtist(AppDbContext context, LinkableArtist input, int sourceIteration)
        {
            var result = await context.SpotifyProfiles.SingleOrDefaultAsync(x => x.Id == input.SpotifyId);

            if (result != null)
            {
                return result.Artist;
            }

            var artist = new Model.Database.Artist
            {
                Id = Guid.NewGuid(),
                Name = input.SpotifyName,
                Iteration = sourceIteration + 1,
                Status = ArtistStatus.New
            };

            artist.SpotifyProfiles.Add(MapLinkableSpotifyProfile(input));

            context.Artists.Add(artist);
            await context.SaveChangesAsync();

            return artist;
        }

        private SpotifyProfile MapNewSpotifyProfile(Model.Spotify.Artist input, Track? bestTrack)
        {
            return new SpotifyProfile
            {
                BestTrackPopularity = bestTrack?.Popularity ?? 0,
                Id = input.Id,
                LastUpdated = DateTime.UtcNow,
                Name = input.Name,
                Popularity = input.Popularity
            };
        }

        private SpotifyProfile MapLinkableSpotifyProfile(LinkableArtist input)
        {
            return new SpotifyProfile
            {
                Id = input.SpotifyId,
                LastUpdated = DateTime.UtcNow,
                Name = input.SpotifyName
            };
        }

        internal Task AddAppleProfile(AppDbContext context, object appleArtist, Model.Database.Artist sourceArtist)
        {
            throw new NotImplementedException();
        }

        internal async Task UpdateSpotifyProfile(AppDbContext context, Model.Database.Artist artist, Model.Spotify.Artist spotifyArtist, Track? bestTrack)
        {
            var spotifyProfile = artist.SpotifyProfiles.Single(x => x.Id == spotifyArtist.Id);

            spotifyProfile.BestTrackPopularity = bestTrack?.Popularity ?? 0;
            spotifyProfile.LastUpdated = DateTime.UtcNow;
            spotifyProfile.Name = spotifyArtist.Name;
            spotifyProfile.Popularity = spotifyArtist.Popularity;

            await genreService.UpdateGenresIfNeeded(context, spotifyProfile, spotifyArtist);

            await context.SaveChangesAsync();
        }

        internal async Task UpdateAppleProfile(AppDbContext context, Model.Database.Artist artist, object appleArtist)
        {
            throw new NotImplementedException();
        }
    }
}
