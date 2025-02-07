namespace MusicAtlas.Model.Spotify
{
    public class Album
    {
        public string AlbumType { get; set; }
        public List<Artist> Artists { get; set; }
        public Dictionary<string, string> ExternalUrls { get; set; }
        public string Href { get; set; }
        public string Id { get; set; }
        public bool IsPlayable { get; set; }
        public string Name { get; set; }
        public string ReleaseDate { get; set; }
        public string ReleaseDatePrecision { get; set; }
        public int TotalTracks { get; set; }
        public string Type { get; set; }
        public string Uri { get; set; }
    }
}