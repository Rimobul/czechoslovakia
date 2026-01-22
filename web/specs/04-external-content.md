# External Content Specification

**Route:** `/[lang]/external`

---

## Purpose

A curated collection of external articles, videos, and resources about Czechia and Slovakia from third-party sources. This section aggregates valuable content from across the web.

---

## Key Characteristics

- Content links to external websites (opens in new tab)
- Descriptions are written by the site author
- **NOT translated** - displayed in author's language regardless of site language
- Sourced from various media outlets, YouTube channels, academic sources

---

## Content Storage

### JSON Data File

```
content/external/external-content.json
```

```json
{
  "items": [
    {
      "id": "guardian-velvet-divorce",
      "type": "article",
      "title": "The Velvet Divorce: 30 Years On",
      "source": "The Guardian",
      "url": "https://www.theguardian.com/world/2023/velvet-divorce",
      "thumbnail": "/images/external/guardian-velvet.jpg",
      "dateAdded": "2026-01-20",
      "categories": ["history", "politics"],
      "description": "An excellent retrospective on the peaceful separation of Czechoslovakia, featuring interviews with key political figures from both nations."
    },
    {
      "id": "youtube-prague-vs-bratislava",
      "type": "video",
      "title": "Prague vs Bratislava: Which Capital is Better?",
      "source": "YouTube - Geography Now",
      "url": "https://www.youtube.com/watch?v=abc123",
      "thumbnail": "/images/external/geo-now-capitals.jpg",
      "dateAdded": "2026-01-15",
      "categories": ["travel", "culture"],
      "description": "Fun comparison of the two capital cities covering cost of living, attractions, and local culture."
    },
    {
      "id": "economist-czech-economy",
      "type": "article",
      "title": "Czech Republic: Central Europe's Economic Engine",
      "source": "The Economist",
      "url": "https://www.economist.com/czech-economy-2025",
      "thumbnail": "/images/external/economist-czech.jpg",
      "dateAdded": "2026-01-10",
      "categories": ["economics"],
      "description": "In-depth analysis of Czechia's manufacturing sector and its role in European supply chains."
    }
  ]
}
```

### Data Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| type | "article" \| "video" | Yes | Content type |
| title | string | Yes | Original title of the content |
| source | string | Yes | Publisher/platform name |
| url | string | Yes | External URL |
| thumbnail | string | Yes | Preview image path |
| dateAdded | string (ISO) | Yes | When added to our site |
| categories | string[] | Yes | Topic categories |
| description | string | Yes | Author's description/commentary |

---

## Page Layout

**Route:** `/[lang]/external`

### Header
- Page title (localized): "External Resources" / "Externí zdroje" / "Externé zdroje"
- Brief intro explaining this is curated external content

### Filters & Sorting

**Filter Options:**
- By type: All / Articles / Videos
- By category: All / History / Politics / Economics / Culture / Travel / etc.

**Sorting Options:**
- Date added (newest first) - **default**
- Title (A-Z)

**Implementation:** Client-side filtering for simplicity (JSON is loaded once)

### Content Grid

```
┌─────────────────────────────────────────┐
│ Type: [All ▼]  Category: [All ▼]        │  ← Filters
│ Sort by: [Date Added ▼]                 │  ← Sorting
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ Card 1  │  │ Card 2  │  │ Card 3  │ │
│  └─────────┘  └─────────┘  └─────────┘ │
│                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ Card 4  │  │ Card 5  │  │ Card 6  │ │
│  └─────────┘  └─────────┘  └─────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

---

## External Content Card

```
┌─────────────────────────────────────────┐
│                                         │
│         [Thumbnail Image]               │
│                                    ▶️   │  ← Video icon overlay (if type=video)
│                                         │
├─────────────────────────────────────────┤
│  ARTICLE · The Guardian                 │  ← Type badge + Source
│                                         │
│  The Velvet Divorce: 30 Years On        │  ← Title (linked, opens new tab)
│                                         │
│  An excellent retrospective on the      │  ← Description
│  peaceful separation of Czechoslovakia, │
│  featuring interviews with key...       │
│                                         │
│  History · Politics                     │  ← Category badges
│  Added: January 20, 2026                │  ← Date added
└─────────────────────────────────────────┘
```

### Card Behavior
- Entire card clickable
- Opens external URL in new tab (`target="_blank"`)
- Include `rel="noopener noreferrer"` for security

### Type Badges
- **Article:** Gray/neutral badge
- **Video:** Red badge (YouTube-like) with play icon

---

## Responsive Layout

| Breakpoint | Columns | Card Layout |
|------------|---------|-------------|
| Desktop | 3 columns | As shown above |
| Tablet | 2 columns | As shown above |
| Mobile | 1 column | Horizontal card (thumbnail left, content right) |

### Mobile Card Variant

```
┌─────────────────────────────────────────────┐
│ ┌──────┐  ARTICLE · The Guardian            │
│ │Thumb │  The Velvet Divorce: 30 Years On   │
│ │      │  An excellent retrospective...     │
│ └──────┘  History · Politics                │
└─────────────────────────────────────────────┘
```

---

## Data Management

### Adding New Content

1. Find thumbnail image, save to `/public/images/external/`
2. Add entry to `external-content.json`
3. Rebuild site (SSG regenerates page)

### Future Migration Path

When content grows significantly:
1. Migrate to SQLite database
2. Create simple admin interface for adding content
3. Consider incremental static regeneration (ISR)

---

## No Translation Notice

Since external content is not translated, display a notice at the top of the page:

```
ℹ️ Descriptions are provided by the author and may not be in your selected language.
```

Localized versions:
- CS: "Popisy jsou poskytnuty autorem a nemusí být ve vašem jazyce."
- SK: "Popisy sú poskytnuté autorom a nemusia byť vo vašom jazyku."
- EN: "Descriptions are provided by the author and may not be in your selected language."

---

## SEO

- **Title tag:** "External Resources | NCS" (localized)
- **Meta description:** "Curated collection of articles and videos about Czechia and Slovakia"
- **Note:** No individual detail pages (links go to external sites)

---

## Related Specifications

- [00-overview.md](00-overview.md) - Card component, badges
- [06-localization.md](06-localization.md) - Translation exception handling
