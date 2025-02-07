namespace MusicAtlas.Model.Spotify
{
    public class Track
    {
        public Album Album { get; set; }
        public List<Artist> Artists { get; set; }
        public int DiscNumber { get; set; }
        public int DurationMs { get; set; }
        public bool Explicit { get; set; }
        public Dictionary<string, string> ExternalIds { get; set; }
        public Dictionary<string, string> ExternalUrls { get; set; }
        public string Href { get; set; }
        public string Id { get; set; }
        public bool IsLocal { get; set; }
        public bool IsPlayable { get; set; }
        public string Name { get; set; }
        public int Popularity { get; set; }
        public object PreviewUrl { get; set; }
        public int TrackNumber { get; set; }
        public string Type { get; set; }
        public string Uri { get; set; }
    }
}