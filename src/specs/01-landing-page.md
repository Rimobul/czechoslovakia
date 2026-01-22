# Landing Page Specification

**Route:** `/[lang]/`

---

## Purpose

The landing page serves as the main entry point, introducing visitors to the website's purpose and showcasing the latest content across all sections.

---

## Page Sections

### 1. Hero Section

**Layout:** Full-viewport-width container

**Components:**
- Background image spanning full width
- Semi-transparent dark overlay for text readability (optional, based on image)
- Large bold title (H1) centered over image
- Subtitle/tagline (optional)

**Styling:**
- Image: High-quality photograph related to Czechoslovakia
- Title: Sans-serif, bold, white text with subtle shadow
- Height: 70-100vh on desktop, 50-70vh on mobile

**Example:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    [Background Image]                   │
│                                                         │
│              NOVÉ ČESKOSLOVENSKO                        │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### 2. Introduction Block

**Layout:** Centered text block below hero

**Content:**
- 2-3 sentence paragraph explaining the website's purpose
- Brief mention of what visitors will find (articles, maps, data)

**Styling:**
- Max-width: 700px
- Font: Serif, regular weight
- Generous padding (top/bottom: 4rem)
- Text alignment: Center

**Localized Content:**
```yaml
cs: "Vítejte na stránkách věnovaných srovnání České republiky a Slovenska..."
sk: "Vitajte na stránkach venovaných porovnaniu Českej republiky a Slovenska..."
en: "Welcome to a website dedicated to comparing Czechia and Slovakia..."
```

---

### 3. Latest Blog Posts Block

**Title:** 
- CS: "Nejnovější články"
- SK: "Najnovšie články"  
- EN: "Latest Articles"

**Layout:** 
- Desktop: 3-column grid
- Tablet: 2-column grid
- Mobile: Single column, stacked

**Content:** 3 most recent published blog posts

**Card Component (BlogCard):**
```
┌─────────────────────┐
│   [Thumbnail]       │
│                     │
├─────────────────────┤
│ Category Badge      │
│ Article Title       │
│ Intro excerpt...    │
│ Jan 22, 2026        │
└─────────────────────┘
```

**Card Data (from MDX frontmatter):**
- `thumbnail` → Card image
- `title[lang]` → Card title (linked to article)
- `excerpt[lang]` → Short intro text (max ~100 chars)
- `date` → Formatted publish date
- `categories` → Category badge(s)

**Footer Link:** "View all articles →" linking to `/[lang]/blog`

---

### 4. Latest Map Block

**Title:**
- CS: "Nejnovější mapa"
- SK: "Najnovšia mapa"
- EN: "Latest Map"

**Layout:** Full-width section with centered content

**Content:** Most recently added map

**Display:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                   [Map Preview Image]                   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Map Title                                              │
│  Short description of what the map shows...            │
│                                                         │
│  [View Map →]                                           │
└─────────────────────────────────────────────────────────┘
```

**Data (from maps.json):**
- `thumbnail` → Preview image
- `title[lang]` → Map title
- `description[lang]` → Short description
- Link to `/[lang]/maps/[slug]`

**Footer Link:** "View all maps →" linking to `/[lang]/maps`

---

## Data Requirements

### Blog Posts Query
```typescript
// Fetch 3 most recent posts with only frontmatter (no content body)
const latestPosts = await getBlogPosts({
  lang: currentLang,
  limit: 3,
  fields: ['slug', 'title', 'excerpt', 'thumbnail', 'date', 'categories']
});
```

### Maps Query
```typescript
// Fetch most recent map
const latestMap = await getMaps({
  limit: 1,
  fields: ['slug', 'title', 'description', 'thumbnail', 'dateAdded']
});
```

---

## Responsive Behavior

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Hero height | 80vh | 60vh | 50vh |
| Hero title size | 4rem | 3rem | 2rem |
| Blog cards | 3 columns | 2 columns | 1 column |
| Map preview | Large | Medium | Full-width |

---

## Future Extensions

- Statistics highlights block (CZ vs SK quick facts)
- Newsletter signup form
- Featured external content
- MusicAtlas preview (when data available)

---

## Related Specifications

- [00-overview.md](00-overview.md) - Design system, typography
- [02-blog-section.md](02-blog-section.md) - BlogCard component details
- [03-maps-section.md](03-maps-section.md) - Map data structure
