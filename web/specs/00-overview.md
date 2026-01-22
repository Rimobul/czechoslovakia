# New Czechoslovakia (NCS) - Project Overview

## Project Identity

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
- **Blog Posts:** MDX files (Markdown + JSX) with YAML frontmatter
- **Maps Metadata:** JSON files with MDX for extended content
- **External Content:** JSON file (potential future migration to database)
- **Content Library:** Contentlayer or next-mdx-remote for MDX processing
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

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, bottom nav, stacked cards |
| Tablet | 640px - 1024px | 2-column grids, top nav |
| Desktop | > 1024px | 3-column grids, sidebar visible, top nav |

---

## Site Structure

```
/[lang]/                    → Landing Page
/[lang]/blog                → Blog Listing
/[lang]/blog/[slug]         → Blog Post Detail
/[lang]/maps                → Maps Listing
/[lang]/maps/[slug]         → Map Detail
/[lang]/external            → External Content Listing
/[lang]/about               → About Page
```

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
│   └── MDXComponents.tsx   # Custom MDX component mappings
├── maps/
│   ├── MapCard.tsx
│   ├── MapList.tsx
│   └── MapEmbed.tsx        # Iframe wrapper
├── external/
│   ├── ExternalCard.tsx
│   └── ExternalList.tsx
└── mdx/
    ├── InteractiveMap.tsx  # Flourish/Google Maps embed
    ├── Poll.tsx            # Interactive poll
    ├── Visualization.tsx   # Data visualization
    ├── ImageGallery.tsx    # Image carousel
    └── Callout.tsx         # Highlighted text box
```

### Page Structure
```
app/
├── [lang]/
│   ├── page.tsx            # Landing page
│   ├── blog/
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx    # Blog post detail
│   ├── maps/
│   │   ├── page.tsx        # Maps listing
│   │   └── [slug]/
│   │       └── page.tsx    # Map detail
│   ├── external/
│   │   └── page.tsx        # External content listing
│   └── about/
│       └── page.tsx        # About page
└── page.tsx                # Redirect to default language
```

### Content Directory
```
content/
├── blog/
│   ├── my-article/
│   │   ├── cs.mdx          # Czech version
│   │   ├── sk.mdx          # Slovak version
│   │   └── en.mdx          # English version
│   └── another-post/
│       ├── cs.mdx
│       └── ...
├── maps/
│   ├── maps.json           # Maps metadata
│   └── map-content/
│       ├── population-map/
│       │   ├── cs.mdx      # Extended Czech content
│       │   ├── sk.mdx
│       │   └── en.mdx
│       └── ...
├── external/
│   └── external-content.json
└── i18n/
    ├── cs.json             # UI translations
    ├── sk.json
    └── en.json
```

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

## Specification Documents

| Document | Description |
|----------|-------------|
| [00-overview.md](00-overview.md) | This document - project overview |
| [01-landing-page.md](01-landing-page.md) | Landing page specification |
| [02-blog-section.md](02-blog-section.md) | Blog system specification |
| [03-maps-section.md](03-maps-section.md) | Maps section specification |
| [04-external-content.md](04-external-content.md) | External content specification |
| [05-about-page.md](05-about-page.md) | About page specification |
| [06-localization.md](06-localization.md) | Localization requirements |

---

## Authors

- **Human Author:** [Your Name]
- **AI Collaborator:** GitHub Copilot (Claude)

---

*Specification Version: 2.0*  
*Created: January 22, 2026*
