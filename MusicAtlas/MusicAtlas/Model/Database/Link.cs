namespace MusicAtlas.Model.Database
{
    public class Link
    {
        public Guid SourceArtistId { get; set; }
        public Artist SourceArtist { get; set; }
        public Guid DestinationArtistId { get; set; }
        public Artist DestinationArtist { get; set; }
        public int Weight { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
