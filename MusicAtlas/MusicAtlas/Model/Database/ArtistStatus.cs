namespace MusicAtlas.Model.Database
{
    [Flags]
    public enum ArtistStatus
    {
        New = 0,
        Skip = 1,
        Linked = 2,
        Accepted = 4,
        WithLinks = 8,
        WithDetails = 16
    }
}