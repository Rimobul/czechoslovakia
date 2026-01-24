# Maps Section Specification

**Routes:**
- Listing: `/[lang]/maps`
- Detail: `/[lang]/maps/[slug]`

---

## Purpose

The maps section showcases interactive visualizations comparing geographic, demographic, economic, and cultural data between Czechia and Slovakia.

---

## Map Types Supported

### Currently Implemented
- **Flourish embeds** - Interactive choropleth maps, data visualizations

### Future Support
- Google Maps embeds
- Mapbox visualizations
- Custom D3.js maps
- Static image maps with hotspots

---

## Content Structure

### Maps Metadata (JSON)

Central registry of all maps:

```
content/maps/maps.json
```

```json
{
  "maps": [
    {
      "slug": "population-density",
      "embedType": "flourish",
      "embedUrl": "https://flo.uri.sh/visualisation/123456/embed",
      "thumbnail": "/images/maps/population-density.jpg",
      "dateAdded": "2026-01-22",
      "hasExtendedContent": true
    },
    {
      "slug": "gdp-per-capita",
      "embedType": "flourish",
      "embedUrl": "https://flo.uri.sh/visualisation/789012/embed",
      "thumbnail": "/images/maps/gdp-per-capita.jpg",
      "dateAdded": "2026-01-15",
      "hasExtendedContent": false
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| slug | string | Yes | URL-safe identifier |
| embedType | string | Yes | "flourish", "google", "mapbox", "static" |
| embedUrl | string | Yes | Embed source URL |
| thumbnail | string | Yes | Preview image path |
| dateAdded | string (ISO) | Yes | Date map was added |
| hasExtendedContent | boolean | Yes | Whether MDX content exists |

### Localized Content (MDX)

Title, description, and extended content per language:

```
content/maps/
├── maps.json
└── content/
    ├── population-density/
    │   ├── cs.mdx
    │   ├── sk.mdx
    │   └── en.mdx
    └── gdp-per-capita/
        ├── cs.mdx
        ├── sk.mdx
        └── en.mdx
```

### Map MDX Frontmatter

```yaml
---
title: "Population Density by District"
description: "Interactive map showing population per square kilometer across all districts of former Czechoslovakia."
---
```

### Map MDX Content (Optional Extended Content)

```mdx
---
title: "Population Density by District"
description: "Interactive map showing population per square kilometer..."
---

## About This Map

This visualization shows the population density across all 77 districts of Czechia and 79 districts of Slovakia...

### Data Sources

- Czech Statistical Office (ČSÚ)
- Statistical Office of the Slovak Republic

### Methodology

Population data from the 2021 census was divided by district area...

<Callout type="info">
  Click on any district to see detailed population statistics.
</Callout>

### Key Observations

1. **Prague** has the highest density at 2,700 people/km²
2. **Bratislava** follows with 1,200 people/km²
3. Rural border regions show the lowest density
```

---

## Maps Listing Page

**Route:** `/[lang]/maps`

### Page Styling
- Section class: `section` (dark background #0e0d0c)
- Container class: `container`
- Light text on dark background

### Layout
- Header with H2 title and optional intro paragraph
- Grid of map cards: `grid_2-col gap-medium` or `grid_3-col`
- Optional sidebar with list navigation (quick jump to specific map)

### Map Cards

**Card Component Classes:**
- Card wrapper: `card on-secondary` (darker background #151515)
- Image container: `image-ratio_16x9 margin-bottom_small`
- Image: `image_cover`
- Title: `heading_h3`
- Description: `paragraph text-color_secondary`
- Date: `eyebrow` or small text with secondary color

```
┌─────────────────────────────────────────┐
│                                         │
│         [Map Thumbnail - 16:9]          │  ← image-ratio_16x9
│                                         │
├─────────────────────────────────────────┤
│  Population Density by District         │  ← heading_h3
│                                         │
│  Interactive map showing population     │  ← paragraph
│  per square kilometer across...         │  ← text-color_secondary
│                                         │
│  January 22, 2026                       │  ← eyebrow
└─────────────────────────────────────────┘
```

### Sorting
- Default: Newest first (by dateAdded)

### Grid Layout
- Desktop: 2-3 columns (`grid_2-col` or `grid_3-col`)
- Tablet: 2 columns
- Mobile: Single column (grid auto-collapses)

---

## Map Detail Page

**Route:** `/[lang]/maps/[slug]`

### Page Styling
- Section class: `section` (dark background #0e0d0c)
- Container class: `container`
- Light text (#ebebeb) on dark background

### Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  POPULATION DENSITY BY DISTRICT                         │  ← heading_h1, Jost font
│                                                         │
│  Interactive map showing population per square...       │  ← paragraph_large
│                                                         │     text-color_secondary
│  January 22, 2026                                       │  ← eyebrow
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │            [Interactive Map Embed]              │   │  ← Full-width embed
│  │                                                 │   │
│  │         (Flourish/Google Maps/etc.)             │   │
│  │                                                 │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Extended MDX Content - if hasExtendedContent=true]    │  ← prose class
│                                                         │
│  ## About This Map                                      │  ← heading_h2
│  Methodology, data sources, observations...            │  ← paragraph_large
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ← Back to Maps                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Map Embed Component

### Flourish Embed

```tsx
interface MapEmbedProps {
  embedType: 'flourish' | 'google' | 'mapbox' | 'static';
  embedUrl: string;
  title: string;
  height?: number;  // default: 500
}

// Flourish implementation
<iframe
  src={embedUrl}
  title={title}
  width="100%"
  height={height}
  frameBorder="0"
  scrolling="no"
  allowFullScreen
/>
```

### Responsive Behavior
- Embed container: 100% width of content area
- Height: Fixed (500px default) or aspect-ratio based
- Mobile: May reduce height to 350px

### Interactivity
- Users can interact with Flourish maps (hover, click regions)
- Tooltip data displayed by embed itself
- No additional handling required from our side

---

## Data Queries

### Listing Page
```typescript
// Get all maps with localized titles/descriptions
export async function getMaps(lang: string) {
  const mapsJson = await loadMapsJson();
  const mapsWithContent = await Promise.all(
    mapsJson.maps.map(async (map) => {
      const content = await loadMapContent(map.slug, lang);
      return {
        ...map,
        title: content.frontmatter.title,
        description: content.frontmatter.description,
      };
    })
  );
  return mapsWithContent.sort((a, b) => 
    new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
}
```

### Detail Page
```typescript
// Get single map with full content
export async function getMap(slug: string, lang: string) {
  const mapsJson = await loadMapsJson();
  const mapMeta = mapsJson.maps.find(m => m.slug === slug);
  const content = await loadMapContent(slug, lang);
  
  return {
    ...mapMeta,
    title: content.frontmatter.title,
    description: content.frontmatter.description,
    extendedContent: mapMeta.hasExtendedContent ? content.compiledMDX : null,
  };
}
```

---

## SEO

- **Title tag:** `{Map Title} | NCS Maps`
- **Meta description:** Map description
- **Open Graph:** Thumbnail image

---

## Related Specifications

- [00-overview.md](00-overview.md) - Component architecture
- [01-landing-page.md](01-landing-page.md) - Featured map on landing page
- [02-blog-section.md](02-blog-section.md) - InteractiveMap MDX component (reused)
