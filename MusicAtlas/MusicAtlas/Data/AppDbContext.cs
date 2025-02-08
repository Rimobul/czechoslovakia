using Microsoft.EntityFrameworkCore;
using MusicAtlas.Model.Database;

namespace MusicAtlas.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<AppleProfile> AppleProfiles { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Link> Links { get; set; }
        public DbSet<SpotifyProfile> SpotifyProfiles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=musicatlas.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Artist>()
                .HasMany(c => c.AppleProfiles)
                .WithOne(o => o.Artist)
                .HasForeignKey(o => o.ArtistId);

            modelBuilder.Entity<Artist>()
                .HasMany(c => c.SpotifyProfiles)
                .WithOne(o => o.Artist)
                .HasForeignKey(o => o.ArtistId);

            modelBuilder.Entity<Artist>()
                .HasMany(c => c.SourceLinks)
                .WithOne(o => o.SourceArtist)
                .HasForeignKey(o => o.SourceArtistId);

            modelBuilder.Entity<Artist>()
                .HasMany(c => c.DestinationLinks)
                .WithOne(o => o.DestinationArtist)
                .HasForeignKey(o => o.DestinationArtistId);

            modelBuilder.Entity<Artist>()
                .HasMany(c => c.Genres)
                .WithMany(o => o.Artists);

            modelBuilder.Entity<Link>()
                .HasKey(l => new { l.SourceArtistId, l.DestinationArtistId });
        }
    }

}
