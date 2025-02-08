using System.ComponentModel.DataAnnotations;

namespace MusicAtlas.Model.Database
{
    public class AppleProfile
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }

        public Guid ArtistId { get; set; }
        public Artist Artist { get; set; }
    }
}
