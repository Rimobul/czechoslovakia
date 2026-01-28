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
- **Aesthetic:** Modern, bold, themed design inspired by contemporary web design
- **Mood:** Sleek, professional with strong visual contrast and clean typography
- **Inspiration:** Webflow-based design with CSS custom properties and utility classes
- **Theming:** Supports light, dark, and system (auto-detect) themes

### Color Palette

The site supports both light and dark themes. Colors are defined as CSS custom properties.

#### Dark Theme (Default)

| Role | Color | Usage |
|------|-------|-------|
| Neutral Primary | Dark (#0e0d0c) | Main background |
| Neutral Secondary | Darker (#151515) | Secondary sections, cards |
| Neutral Inverse | Light (#ebebeb) | Text on dark, inverse sections |
| Accent Primary | Red (#d3433b) | Buttons, CTAs, highlights |
| Accent Hover | Light Red (#de736d) | Button hover states |
| Accent Text | Bright Red (#f34f48) | Links, accent text on dark |
| Text Primary | Light (#ebebeb) | Main text on dark backgrounds |
| Text Secondary | Light 60% | Muted text, descriptions |
| Border Primary | Light 10% | Subtle borders |
| Border Secondary | Light 20% | Card borders, dividers |

#### Light Theme

| Role | Color | Usage |
|------|-------|-------|
| Neutral Primary | Light (#fafafa) | Main background |
| Neutral Secondary | Off-white (#f0f0f0) | Secondary sections, cards |
| Neutral Inverse | Dark (#1a1a1a) | Text on light, inverse sections |
| Accent Primary | Red (#d3433b) | Buttons, CTAs, highlights |
| Accent Hover | Light Red (#de736d) | Button hover states |
| Accent Text | Dark Red (#c23830) | Links, accent text on light |
| Text Primary | Dark (#1a1a1a) | Main text on light backgrounds |
| Text Secondary | Dark 65% | Muted text, descriptions |
| Border Primary | Dark 10% | Subtle borders |
| Border Secondary | Dark 15% | Card borders, dividers |

### Typography

| Element | Font | Size | Style |
|---------|------|------|-------|
| Display | Jost | 5.61rem | Weight 500, -0.01em spacing |
| H1 | Jost | 4.21rem | Weight 500, -0.01em spacing |
| H2 | Jost | 2.37rem | Weight 500, -0.01em spacing |
| H3 | Jost | 1.78rem | Weight 500, -0.01em spacing |
| H4 | Jost | 1.33rem | Weight 500, -0.01em spacing |
| Body XL | Jost | 1.5rem | Regular, line-height 1.6 |
| Body Large | Jost | 1.13rem | Regular, line-height 1.6 |
| Body | Jost | 1rem | Regular, line-height 1.6 |
| Body Small | Jost | 0.88rem | Regular, line-height 1.6 |
| Eyebrow | Jost | 0.9rem | Uppercase, 0.01em spacing |

**Font Stack:** Jost, Inter, Helvetica Neue, sans-serif

### Visual Elements
- Dark background with light text for strong contrast
- Large hero sections with background images and dark overlays
- Bold, prominent title text with text-wrap: balance
- Sharp edges (border-radius: 0) for modern, editorial feel
- Cards use 85% transparent grey background (no borders)
- Generous section padding (8rem desktop, 5rem mobile)

---

## Layout & Navigation

### Page Layout
- **Background:** Dark (#0e0d0c) primary, darker (#151515) for sections
- **Content Width:** Centered container layout (max-width: 1280px)
- **Section Padding:** 8rem vertical on desktop, 5rem on mobile
- **Responsive:** Fluid adaptation with grid-based layouts

### Navigation - Desktop
- **Position:** Top horizontal navbar, sticky
- **Style:** Themed background with contrasting text
- **Behavior:** Always visible on scroll
- **Items:** Home, Blog, Maps, External Content, About, Theme Switcher, Language Picker

### Navigation - Mobile
- **Position:** Bottom horizontal navbar
- **Style:** Themed secondary background with border-top
- **Behavior:** Sticky, horizontally scrollable
- **Rationale:** Optimized for thumb navigation while holding phone
- **Items:** Same as desktop plus Theme Switcher, icon-based with labels

### Footer
- **Style:** Dark inverse background (#ebebeb) with dark text
- **Content:** 
  - Navigation links to all sections (large text)
  - Social media icons
  - Short "About the Authors" blurb
  - Copyright notice
- **Layout:** 2-column grid with divider

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
│   ├── Sidebar.tsx         # Sub-navigation sidebar
│   ├── ThemeProvider.tsx   # Theme context provider
│   └── ThemeSwitcher.tsx   # Theme toggle components
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
| [07-theming.md](07-theming.md) | Theme system specification |

---

## Authors

- **Human Author:** [Your Name]
- **AI Collaborator:** GitHub Copilot (Claude)

---

*Specification Version: 2.0*  
*Created: January 22, 2026*
