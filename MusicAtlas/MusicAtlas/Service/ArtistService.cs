using Microsoft.EntityFrameworkCore;
using MusicAtlas.Data;
using MusicAtlas.Model.Database;
using MusicAtlas.Model.Processing;
using MusicAtlas.Model.Spotify;

namespace MusicAtlas.Service
{
    public class ArtistService
    {
        public async Task<Model.Database.Artist> AddNewArtist(AppDbContext context, Model.Spotify.Artist input, int sourceIteration, ArtistStatus status)
        {
            var result = new Model.Database.Artist
            {
                Id = Guid.NewGuid(),
                Name = input.Name,
                Iteration = sourceIteration + 1,
                Status = status
            };

            result.SpotifyProfiles.Add(MapNewSpotifyProfile(input, null));

            await HandleGenres(context, input, result);

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

        private async Task HandleGenres(AppDbContext context, Model.Spotify.Artist input, Model.Database.Artist result)
        {
            var inputGenres = input.Genres;

            foreach (var genre in inputGenres)
            {
                var existingGenre = await context.Genres.FirstOrDefaultAsync(x => x.Name == genre);

                if (existingGenre != null)
                {
                    result.Genres.Add(existingGenre);
                }
                else
                {
                    result.Genres.Add(new Genre
                    {
                        Id = Guid.NewGuid(),
                        Name = genre,
                        LastUpdated = DateTime.Now,
                    });
                }
            }
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

        internal Task UpdateSpotifyProfile(AppDbContext context, Model.Database.Artist artist, Model.Spotify.Artist spotifyArtist, Track? bestTrack)
        {
            throw new NotImplementedException();
        }

        internal async Task UpdateAppleProfile(AppDbContext context, Model.Database.Artist artist, object appleArtist)
        {
            throw new NotImplementedException();
        }
    }
}
