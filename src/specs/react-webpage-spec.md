# New Czechoslovakia (NCS) - React Web Application Specification

## Project Overview

**Project Name:** New Czechoslovakia  
**Domain:** ncs.eu  
**Title Localization:**
- English: "New Czechoslovakia"
- Czech: "Nové ČeskoSlovensko"
- Slovak: "Nové ČeskoSlovensko"

**Purpose:** A content-rich website presenting data, articles, and maps comparing information about Czechia and Slovakia. The site serves as a platform for original analysis, curated external resources, and interactive visualizations.

---

## Technology Stack

### Framework & Rendering
- **Framework:** Next.js (React-based)
- **Rendering Strategy:** Static Site Generation (SSG) for SEO optimization
- **Language:** TypeScript

### Content Management
- **Blog Posts:** Markdown files with YAML frontmatter
- **Maps Metadata:** JSON files
- **External Content:** JSON file (with potential future migration to database)
- **Static Assets:** Images, thumbnails stored in public directory

### Hosting & Infrastructure
- **Hosting:** Cloudflare Pages (free tier)
- **CDN:** Cloudflare (EU edge servers)
- **Domain Management:** Cloudflare (includes free SSL)
- **Region:** Europe

---

## Design System

### Visual Style
- **Aesthetic:** Newspaper/academic - clean, professional, content-focused
- **Mood:** Minimalist with occasional bold visual elements

### Color Palette
| Role | Color | Usage |
|------|-------|-------|
| Primary Text | Black (#000000) | Body text, headings |
| Background | White (#FFFFFF) | Page background |
| Secondary Text | Dark Gray (#333333) | Metadata, captions |
| Accent - Links | Blue (#0066CC) | Hyperlinks, interactive elements |
| Accent - Validation/Error | Red (#CC0000) | Error states, required fields |
| Borders/Dividers | Light Gray (#E0E0E0) | Separators, card borders |

### Typography
| Element | Font Type | Style |
|---------|-----------|-------|
| Headings (H1-H6) | Sans-serif | Bold, large sizes |
| Body Text | Serif | Regular weight, newspaper-style |
| Navigation | Sans-serif | Medium weight |
| Metadata (dates, authors) | Sans-serif | Small, muted color |

**Suggested Font Pairings:**
- Headings: Inter, Helvetica Neue, or Source Sans Pro
- Body: Merriweather, Georgia, or Source Serif Pro

### Visual Elements
- Large hero images spanning full viewport width
- Bold, prominent title text over hero images
- Generous whitespace for readability
- Subtle borders and dividers
- Black & white imagery preferred (especially for About page)

---

## Layout & Navigation

### Page Layout
- **Content Width:** Centered column layout (max-width ~800px for readability)
- **Responsive:** Fluid adaptation for all screen sizes
- **Sidebar:** Optional, used for sub-navigation (e.g., list of blog posts, maps)

### Navigation - Desktop
- **Position:** Top horizontal navbar
- **Behavior:** Sticky (always visible on scroll)
- **Items:** Home, Blog, Maps, External Content, About, Language Picker

### Navigation - Mobile
- **Position:** Bottom horizontal navbar
- **Behavior:** Sticky, horizontally scrollable
- **Rationale:** Optimized for thumb navigation while holding phone
- **Items:** Same as desktop, icon-based with labels

### Footer
- **Content:** 
  - Navigation links to all sections
  - Short "About the Authors" blurb (mentioning human author + AI collaboration)
  - Copyright notice
- **Style:** Simple, minimal

---

## Localization (i18n)

### Supported Languages
1. Czech (cs) - **Default**
2. Slovak (sk)
3. English (en)

### URL Structure
```
https://ncs.eu/cs/          → Czech homepage
https://ncs.eu/sk/          → Slovak homepage
https://ncs.eu/en/          → English homepage
https://ncs.eu/cs/blog      → Czech blog listing
https://ncs.eu/en/blog/my-article → English article
```

### Language Detection & Selection
1. **First Visit:** Auto-detect from browser's Accept-Language header
2. **Language Picker:** Visible in navigation, allows manual selection
3. **Persistence:** Store preference in cookie
4. **Subsequent Visits:** Read language from cookie

### Content Translation Rules
- **UI Elements:** All translated to 3 languages
- **Blog Posts:** Eventually all translated; new content may temporarily exist only in Czech
- **Maps Descriptions:** All translated
- **External Content:** NOT translated (links to external resources in original language)

### Fallback Behavior
- If content not available in selected language, show Czech version with notice

---

## Page Specifications

### 1. Landing Page (`/[lang]/`)

#### Hero Section
- **Layout:** Full-viewport-width image
- **Content:** 
  - Large bold title overlaid on image
  - Semi-transparent overlay for text readability
- **Image:** High-quality photograph related to Czechoslovakia

#### Introduction Block
- **Content:** 2-3 sentence paragraph explaining the website's purpose
- **Style:** Centered, serif font, generous padding

#### Latest Blog Posts Block
- **Title:** "Latest Articles" / "Nejnovější články" / "Najnovšie články"
- **Content:** 3 most recent blog posts
- **Card Layout:**
  - Thumbnail image
  - Title (linked)
  - Short intro text (excerpt)
  - Publish date
- **Layout:** 3-column grid on desktop, single column on mobile

#### Latest Map Block
- **Title:** "Featured Map" / "Vybraná mapa" / "Vybraná mapa"
- **Content:** Most recently added map
- **Layout:**
  - Map embed/preview
  - Title and short description
  - "View all maps" link

#### Future Extensibility
- Design component system to easily add new content blocks (e.g., statistics highlights, newsletter signup)

---

### 2. Blog Section (`/[lang]/blog`)

#### Blog Listing Page
- **Layout:** Main content area with optional sidebar for filtering
- **Sidebar Content:**
  - Category filter
  - Archive by date (optional, future)
- **Article Cards:**
  - Thumbnail image
  - Title
  - Publish date
  - Author name
  - Category badge(s)
  - Intro excerpt (first ~150 characters)
- **Sorting:** Newest first (default)
- **Pagination:** Load more or numbered pages

#### Blog Post Detail Page (`/[lang]/blog/[slug]`)
- **Header:**
  - Title (large, bold, sans-serif)
  - Featured image (full-width)
  - Metadata bar: Author, Publish date, Category/categories
- **Content:**
  - Rendered Markdown
  - Support for: headings, paragraphs, images, blockquotes, code blocks, lists, tables
  - Embedded media (YouTube, Flourish maps)
- **Footer:**
  - "Back to Blog" link
  - Related articles (optional, future)

#### Blog Post Data Model (Markdown Frontmatter)
```yaml
---
slug: "article-slug"
title:
  cs: "Český název"
  sk: "Slovenský názov"
  en: "English Title"
author: "Author Name"
date: "2026-01-22"
categories: ["category1", "category2"]
thumbnail: "/images/blog/thumbnail.jpg"
excerpt:
  cs: "Krátký úvod..."
  sk: "Krátky úvod..."
  en: "Short intro..."
published: true
availableLanguages: ["cs", "sk", "en"]
---

Content in respective language...
```

---

### 3. Maps Section (`/[lang]/maps`)

#### Maps Listing Page
- **Layout:** Grid of map cards with sidebar for filtering/navigation
- **Sidebar:** List of all maps for quick navigation
- **Map Cards:**
  - Preview image/thumbnail
  - Title
  - Short description
  - Date added

#### Map Detail Page (`/[lang]/maps/[slug]`)
- **Header:**
  - Title
  - Date added
- **Map Embed:**
  - Flourish embed (iframe)
  - Future: Google Maps, other embed types
  - Responsive container
- **Description Section:**
  - Short description
  - Extended content (backstory, methodology, data sources)
  - Rendered from Markdown
- **Interactivity Notes:**
  - Users can click regions/features for additional data (handled by embed)

#### Map Data Model (JSON)
```json
{
  "slug": "map-slug",
  "title": {
    "cs": "Název mapy",
    "sk": "Názov mapy",
    "en": "Map Title"
  },
  "description": {
    "cs": "Krátký popis...",
    "sk": "Krátky popis...",
    "en": "Short description..."
  },
  "thumbnail": "/images/maps/map-thumbnail.jpg",
  "embedType": "flourish",
  "embedUrl": "https://flo.uri.sh/visualisation/123456/embed",
  "dateAdded": "2026-01-22",
  "contentFile": "map-slug-content.md"
}
```

---

### 4. External Content Section (`/[lang]/external`)

#### Page Purpose
Curated collection of external articles, videos, and resources about Czechia and Slovakia.

#### Listing Layout
- **Default Sort:** Date added (newest first)
- **Filters:**
  - By category
  - By type (article, video)
- **Search:** Title search (optional, future)

#### Content Cards
- Thumbnail image
- Title
- Source name (e.g., "The Guardian", "YouTube")
- Type badge (Article / Video)
- Date added
- Short description (user-provided)
- External link (opens in new tab)

#### External Content Data Model (JSON)
```json
{
  "items": [
    {
      "id": "unique-id",
      "type": "article",
      "title": "Article Title",
      "source": "The Guardian",
      "url": "https://example.com/article",
      "thumbnail": "/images/external/thumbnail.jpg",
      "dateAdded": "2026-01-22",
      "categories": ["history", "politics"],
      "description": "A brief description of why this article is relevant..."
    }
  ]
}
```

**Note:** External content is NOT translated. Descriptions are provided by the site author in their preferred language.

---

### 5. About Page (`/[lang]/about`)

#### Content
- **Author Photo:** Black & white photograph
- **Background:** Brief personal introduction
- **Motivation:** Why this project was created
- **Acknowledgment:** Mention of AI collaboration (GitHub Copilot)

#### Layout
- Centered, single-column
- Photo positioned prominently (top or side)
- Simple, clean presentation

#### Privacy
- **No contact form** (spam/phishing prevention)
- No email address displayed
- Optional: Social media links in future if desired

---

## Component Architecture

### Shared Components
```
components/
├── layout/
│   ├── Header.tsx          # Desktop navigation
│   ├── MobileNav.tsx       # Bottom mobile navigation
│   ├── Footer.tsx
│   ├── Layout.tsx          # Page wrapper
│   └── Sidebar.tsx         # Sub-navigation sidebar
├── common/
│   ├── LanguagePicker.tsx
│   ├── Card.tsx            # Reusable content card
│   ├── Button.tsx
│   ├── Badge.tsx           # Category/type badges
│   └── SEO.tsx             # Meta tags component
├── blog/
│   ├── BlogCard.tsx
│   ├── BlogList.tsx
│   └── BlogContent.tsx     # Markdown renderer
├── maps/
│   ├── MapCard.tsx
│   ├── MapList.tsx
│   └── MapEmbed.tsx        # Iframe wrapper
└── external/
    ├── ExternalCard.tsx
    └── ExternalList.tsx
```

### Page Structure
```
pages/
├── [lang]/
│   ├── index.tsx           # Landing page
│   ├── blog/
│   │   ├── index.tsx       # Blog listing
│   │   └── [slug].tsx      # Blog post detail
│   ├── maps/
│   │   ├── index.tsx       # Maps listing
│   │   └── [slug].tsx      # Map detail
│   ├── external/
│   │   └── index.tsx       # External content listing
│   └── about/
│       └── index.tsx       # About page
└── index.tsx               # Redirect to default language
```

### Content Directory
```
content/
├── blog/
│   ├── cs/
│   │   └── article-slug.md
│   ├── sk/
│   │   └── article-slug.md
│   └── en/
│       └── article-slug.md
├── maps/
│   ├── maps.json           # Maps metadata
│   ├── cs/
│   │   └── map-slug.md     # Extended content
│   ├── sk/
│   └── en/
├── external/
│   └── external-content.json
└── i18n/
    ├── cs.json             # UI translations
    ├── sk.json
    └── en.json
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, bottom nav, stacked cards |
| Tablet | 640px - 1024px | 2-column grids, top nav |
| Desktop | > 1024px | 3-column grids, sidebar visible, top nav |

---

## SEO Requirements

- **Meta Tags:** Title, description, Open Graph, Twitter Cards per page
- **Structured Data:** Article schema for blog posts
- **Sitemap:** Auto-generated XML sitemap
- **Robots.txt:** Properly configured
- **Canonical URLs:** Set for each page with language alternates
- **Language Alternates:** `hreflang` tags for all language versions

---

## Performance Goals

- **Lighthouse Score:** 90+ for all categories
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Image Optimization:** Next.js Image component with WebP format
- **Font Loading:** Subset fonts, use `font-display: swap`

---

## Future Considerations

1. **MusicAtlas Integration:** Interactive music data visualization section (pending more data)
2. **Newsletter Signup:** Email subscription for new content
3. **Comments System:** Discuss articles (consider privacy-respecting options)
4. **Database Migration:** Move from JSON to SQLite/PostgreSQL for content management
5. **CMS Interface:** Simple admin panel for content editing
6. **Statistics Dashboard:** Interactive data comparisons between CZ and SK

---

## Development Phases

### Phase 1 - Foundation
- [ ] Project setup (Next.js, TypeScript, Tailwind CSS)
- [ ] Design system implementation (colors, typography, components)
- [ ] Layout components (Header, Footer, MobileNav)
- [ ] Localization setup (next-intl or similar)
- [ ] Landing page (static content)

### Phase 2 - Content Sections
- [ ] Blog system (listing, detail pages, Markdown rendering)
- [ ] Maps section (listing, detail pages, Flourish embeds)
- [ ] External content section
- [ ] About page

### Phase 3 - Polish & Launch
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Responsive testing
- [ ] Content population
- [ ] Cloudflare Pages deployment
- [ ] Domain setup (ncs.eu)

---

## Authors

- **Human Author:** [Your Name]
- **AI Collaborator:** GitHub Copilot (Claude)

---

*Specification Version: 1.0*  
*Created: January 22, 2026*
