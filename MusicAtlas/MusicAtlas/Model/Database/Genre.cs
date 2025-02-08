using System.ComponentModel.DataAnnotations;

namespace MusicAtlas.Model.Database
{
    public class Genre
    {
        public Genre()
        {
            Artists = new List<Artist>();
        }

        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Artist> Artists { get; set; }
        public DateTime LastUpdated { get; internal set; }
    }
}