using System.ComponentModel.DataAnnotations;

namespace MusicAtlas.Model.Database
{
    public class SpotifyProfile
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public int Popularity { get; set; }
        public int BestTrackPopularity { get; set; }
        public DateTime LastUpdated { get; set; }
        public List<Genre> Genres { get; set; }

        public Guid ArtistId { get; set; }
        public Artist Artist { get; set; }
    }
}
