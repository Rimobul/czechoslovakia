using MusicAtlas.Data;
using MusicAtlas.Model.Processing;
using MusicAtlas.Model.Spotify;

namespace MusicAtlas.Service
{
    public class LinkService
    {
        public IEnumerable<LinkableArtist> ExtractLinkableArtists(Artist sourceArtist, IEnumerable<TrackCollection> trackCollections, IEnumerable<ArtistCollection> searchResults)
        {
            var skipIds = new HashSet<string> { sourceArtist.Id };

            foreach (var track in trackCollections.SelectMany(x => x.Tracks))
            {
                foreach (var artist in track.Artists)
                {
                    if (!skipIds.Contains(artist.Id))
                    {
                        skipIds.Add(artist.Id);
                        yield return new LinkableArtist
                        {
                            LinkWeight = 2,
                            SpotifyId = artist.Id,
                            SpotifyName = artist.Name
                        };
                    }
                }
            }

            foreach (var artist in searchResults.SelectMany(x => x.Artists.Items))
            {
                if (!skipIds.Contains(artist.Id))
                {
                    skipIds.Add(artist.Id);
                    yield return new LinkableArtist
                    {
                        LinkWeight = 1,
                        SpotifyId = artist.Id,
                        SpotifyName = artist.Name
                    };
                }
            }
        }

        public async Task AddLink(AppDbContext context, Model.Database.Artist sourceArtist, Model.Database.Artist destinationArtist, int weight)
        {
            var existingLink = context.Links.FirstOrDefault(x => x.SourceArtistId == sourceArtist.Id && x.DestinationArtistId == destinationArtist.Id);

            if (existingLink == null)
            {
                context.Links.Add(new Model.Database.Link
                {
                    DestinationArtist = destinationArtist,
                    LastUpdated = DateTime.UtcNow,
                    SourceArtist = sourceArtist,
                    Weight = weight,
                });
            }
            else
            {
                existingLink.LastUpdated = DateTime.UtcNow;
                existingLink.Weight = weight;
            }

            await context.SaveChangesAsync();
        }

        public async Task CreateLinks(AppDbContext context, Model.Database.Artist sourceArtist, IEnumerable<(int Weight, Model.Database.Artist Artist)> destinationArtists)
        {
            foreach(var destinationArtist in destinationArtists)
            {
                var existingLink = context.Links.FirstOrDefault(x => x.SourceArtistId == sourceArtist.Id && x.DestinationArtistId == destinationArtist.Artist.Id);

                if (existingLink == null)
                {
                    context.Links.Add(new Model.Database.Link
                    {
                        DestinationArtist = destinationArtist.Artist,
                        LastUpdated = DateTime.UtcNow,
                        SourceArtist = sourceArtist,
                        Weight = destinationArtist.Weight,
                    });
                }
                else
                {
                    existingLink.LastUpdated = DateTime.UtcNow;
                    existingLink.Weight = destinationArtist.Weight;
                }
            }

            await context.SaveChangesAsync();
        }
    }
}
