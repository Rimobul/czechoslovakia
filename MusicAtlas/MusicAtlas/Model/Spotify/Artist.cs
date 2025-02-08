namespace MusicAtlas.Model.Spotify
{
    public class Artist
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Uri { get; set; }
        public int Popularity { get; set; }
        public List<string> Genres { get; set; }
        public Followers Followers { get; set; }
    }
}
