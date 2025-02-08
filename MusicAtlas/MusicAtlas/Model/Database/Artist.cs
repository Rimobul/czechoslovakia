using System.ComponentModel.DataAnnotations;

namespace MusicAtlas.Model.Database
{
    public class Artist
    {
        public Artist()
        {
            SpotifyProfiles = new List<SpotifyProfile>();
            AppleProfiles = new List<AppleProfile>();
            //Languages = new List<Language>();
            Genres = new List<Genre>();
            SourceLinks = new List<Link>();
        }

        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Iteration { get; set; }
        public ArtistStatus Status { get; set; }

        public List<SpotifyProfile> SpotifyProfiles { get; set; }
        public List<AppleProfile> AppleProfiles { get; set; }
        public List<Genre> Genres { get; set; }
        public List<Link> SourceLinks { get; set; }
        public List<Link> DestinationLinks { get; set; }

        //public List<string> Languages { get; set; }
        public string? Nationality { get; set; }
        public string? BornIn { get; set; }
        public DateTime? BornOn { get; set; }
        public string? DiedIn { get; set; }
        public DateTime? DiedOn { get; set; }
    }
}
