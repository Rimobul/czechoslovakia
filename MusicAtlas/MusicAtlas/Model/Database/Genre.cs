using System.ComponentModel.DataAnnotations;

namespace MusicAtlas.Model.Database
{
    public class Genre
    {
        public Genre()
        {
            SpotifyProfiles = new List<SpotifyProfile>();
        }

        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<SpotifyProfile> SpotifyProfiles { get; set; }
        public DateTime LastUpdated { get; internal set; }
    }
}