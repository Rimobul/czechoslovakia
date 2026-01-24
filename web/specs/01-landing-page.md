# Landing Page Specification

**Route:** `/[lang]/`

---

## Purpose

The landing page serves as the main entry point, introducing visitors to the website's purpose and showcasing the latest content across all sections.

---

## Page Sections

### 1. Hero Section

**Layout:** Full-viewport-width container with background image

**Components:**
- Background image spanning full width with dark gradient overlay
- CSS: `background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('...')`
- Logo/icon centered above title
- Large bold title (H1) with uppercase text
- Subtitle/tagline below (H2 style)

**Styling:**
- Background: Dark overlay over high-quality photograph
- Title: Jost font, weight 500, light text (#ebebeb)
- Section class: `section hero-background`
- Height: 70-100vh on desktop, 50-70vh on mobile
- Container class: `container is-max` for full-width

**Example:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    [Dark Background Image]              │
│                                                         │
│                      [Logo Icon]                        │
│              NOVÉ ČESKOSLOVENSKO                        │
│                   Lepší spolu                           │
│                                                         │
│   [3-column intro text grid]                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### 2. Introduction Block

**Layout:** Centered container below hero with 3-column grid

**Content:**
- Spread across 3 columns on desktop
- Left column: First paragraph about Czech-Slovak connection
- Middle column: Second paragraph about exploring the vision
- Right column: CTA button (optional)

**Styling:**
- Container class: `container`
- Grid class: `grid_3-col gap-small`
- Text class: `paragraph` (body size, secondary text color)
- Text color: Light text on dark background
- Generous padding (inherited from hero section)

**Localized Content:**
```yaml
cs: "I víc, než 30 let po rozdělení společného státu jsou si Češi a Slováci výjimečně blízcí..."
sk: "Aj viac ako 30 rokov po rozdelení spoločného štátu sú si Česi a Slováci výnimočne blízki..."
en: "Even more than 30 years after the split, Czechs and Slovaks remain exceptionally close..."
```

---

### 3. Features/Reasons Block (NEW - from oldweb)

**Title:**
- CS: "7 důvodů pro Československo"
- SK: "7 dôvodov pre Československo"
- EN: "7 Reasons for Czechoslovakia"

**Layout:**
- Section class: `section is-secondary`
- Header with eyebrow text and H2 heading centered
- 2-column grid of feature cards

**Card Component (FeatureCard):**
```
┌─────────────────────────────────┐
│  [Icon Image]                   │
│                                 │
│  Feature Title (accent color)  │
│  Description text...            │
│                                 │
└─────────────────────────────────┘
```

**Card Styling:**
- Class: `card card_body on-secondary`
- Title class: `paragraph_large text-color_accent-primary`
- Description class: `paragraph_small text-color_secondary`
- Grid container: `grid_2-col gap-small`

---

### 4. Latest Blog Posts Block

**Title:** 
- CS: "Nejnovější články"
- SK: "Najnovšie články"  
- EN: "Latest Articles"

**Layout:** 
- Section class: `section` (primary dark background)
- Desktop: 3-column grid (`grid_3-col gap-large`)
- Tablet: 2-column grid
- Mobile: Single column, stacked

**Content:** 3 most recent published blog posts

**Card Component (BlogCard):**
```
┌─────────────────────┐
│   [Thumbnail]       │  ← class: image-ratio_1x1 margin-bottom_xsmall
│                     │
├─────────────────────┤
│ Tag (Date)          │  ← class: tag margin-bottom_xsmall
│ Article Title       │  ← class: heading_h3 text-decoration_none
│ Intro excerpt...    │  ← class: paragraph text-decoration_none
└─────────────────────┘
```

**Card Styling:**
- Link wrapper class: `content-block-link`
- Image class: `image_cover`
- No visible card border, relies on content structure

**Card Data (from MDX frontmatter):**
- `thumbnail` → Card image
- `title[lang]` → Card title (linked to article)
- `excerpt[lang]` → Short intro text
- `date` → Formatted date in tag

**Footer Link:** "View all articles →" linking to `/[lang]/blog`

---

### 5. FAQ Section (NEW - from oldweb)

**Title:**
- CS: "Časté dotazy"
- SK: "Časté otázky"
- EN: "FAQ"

**Layout:**
- Section class: `section is-secondary`
- Container class: `container is-small`
- Header with eyebrow text ("ČASTÉ DOTAZY") and H2 centered
- Subheading paragraph

**Content:** List of FAQ items as expandable dividers

**FAQ Item:**
```
┌─────────────────────────────────────────────────────────┐
│ Question Title (heading_h4)                             │
│ Answer paragraph (rich-text paragraph_large)            │
└─────────────────────────────────────────────────────────┘
```

**Styling:**
- Each FAQ item: `divider` class (border-top, padding)
- Question: `heading_h4`
- Answer: `rich-text paragraph_large`

---

### 6. Latest Map Block

**Title:**
- CS: "Nejnovější mapa"
- SK: "Najnovšia mapa"
- EN: "Latest Map"

**Layout:**
- Section class: `section` (primary dark background)
- 2-column grid: Image on left, content card on right
- Grid classes: `grid_2-col tablet-1-col gap-small`

**Content:** Most recently added map

**Display:**
```
┌───────────────────────────┬─────────────────────────────┐
│                           │                             │
│   [Map Preview Image]     │   Card with content:        │
│   class: image-ratio_4x3  │   - H3 title                │
│   image_cover             │   - Description paragraph   │
│                           │   - Email signup form       │
│                           │                             │
└───────────────────────────┴─────────────────────────────┘
```

**Card Styling:**
- Card class: `card_body is-y-center is-secondary`
- Title: `heading_h3`
- Form: horizontal layout with input and button

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
