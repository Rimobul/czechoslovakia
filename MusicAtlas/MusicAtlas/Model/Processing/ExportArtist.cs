using MusicAtlas.Model.Database;

namespace MusicAtlas.Model.Processing
{
    internal class ExportArtist
    {
        public Guid Id { get; set; }
        public string SpotifyLink { get; internal set; }
        public string Name { get; set; }
        public int Iteration { get; set; }
        public ArtistStatus Status { get; set; }
        public bool WithDetails { get; set; }
        public string? Nationality { get; set; }
        public string? BornIn { get; set; }
        public DateTime? BornOn { get; set; }
        public string? DiedIn { get; set; }
        public DateTime? DiedOn { get; set; }
        public Guid? DuplicateParentId { get; set; }
    }
}
