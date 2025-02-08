namespace MusicAtlas.Model.Database
{
    [Flags]
    public enum ArtistStatus
    {
        New = 0,
        Skip = 1,
        Accepted = 2,
        WithLinks = 4,
        WithDetails = 8
    }
}