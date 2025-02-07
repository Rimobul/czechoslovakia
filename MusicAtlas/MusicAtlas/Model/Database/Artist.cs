namespace MusicAtlas.Model.Database
{
    public class Artist
    {
        public Guid Id { get; set; }
        public string SpotifyId { get; set; }
        public string AppleId { get; set; }
        public string Name { get; set; }
        public HashSet<string> AltSpotifyIds { get; set; }
        public HashSet<string> AltAppleIds { get; set; }
        public HashSet<string> AltNames { get; set; }
        public int Iteration { get; set; }
        public int Listeners { get; set; }
        public int BestTrackScore { get; set; }
        public List<Language> Languages { get; set; }
        public List<Genre> Genres { get; set; }
        public Country Nationality { get; set; }
        public City BornIn { get; set; }
        public DateTime? BornOn { get; set; }
        public City? DiedIn { get; set; }
        public DateTime? DiedOn { get; set; }
        public ArtistStatus Status { get; set; }
        public bool Processed { get; set; }
    }
}
