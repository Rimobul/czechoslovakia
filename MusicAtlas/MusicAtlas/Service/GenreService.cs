using Microsoft.EntityFrameworkCore;
using MusicAtlas.Data;
using MusicAtlas.Model.Database;

namespace MusicAtlas.Service
{
    public class GenreService
    {
        public async Task UpdateGenresIfNeeded(AppDbContext context, SpotifyProfile dbProfile, Model.Spotify.Artist source)
        {
            if (AreGenresEqual(dbProfile.Genres, source.Genres))
            {
                return;
            }

            dbProfile.Genres.RemoveAll(x => true);
            await context.SaveChangesAsync();

            await UpdateGenres(context, dbProfile, source);
            await context.SaveChangesAsync();
        }

        private bool AreGenresEqual(List<Genre> dbGenres, List<string> sourceGenres)
        {
            return dbGenres.Select(x => x.Name)
                .OrderBy(x => x)
                .SequenceEqual(sourceGenres.OrderBy(x => x));
        }

        private async Task UpdateGenres(AppDbContext context, SpotifyProfile dbProfile, Model.Spotify.Artist input)
        {
            var inputGenres = input.Genres;

            foreach (var genre in inputGenres)
            {
                var existingGenre = await context.Genres.FirstOrDefaultAsync(x => x.Name == genre);

                if (existingGenre != null)
                {
                    dbProfile.Genres.Add(existingGenre);
                }
                else
                {
                    var newGenre = new Genre
                    {
                        Id = Guid.NewGuid(),
                        Name = genre,
                        LastUpdated = DateTime.Now,
                    };

                    context.Genres.Add(newGenre);
                    await context.SaveChangesAsync();

                    dbProfile.Genres.Add(newGenre);
                }
            }
        }
    }
}
