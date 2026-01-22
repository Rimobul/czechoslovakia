# Blog Section Specification

**Routes:**
- Listing: `/[lang]/blog`
- Detail: `/[lang]/blog/[slug]`

---

## Purpose

The blog section hosts original articles written by the site author, covering topics comparing Czechia and Slovakia including history, culture, politics, economics, and data analysis.

---

## Content Format: MDX

### Why MDX?

MDX (Markdown + JSX) allows:
- Writing prose in familiar Markdown syntax
- Embedding interactive React components
- Full TypeScript support
- Native Next.js integration

### File Structure

Each blog post exists in a folder with localized versions:

```
content/blog/
├── comparing-gdp/
│   ├── cs.mdx          # Czech version
│   ├── sk.mdx          # Slovak version
│   └── en.mdx          # English version
├── beer-culture/
│   ├── cs.mdx
│   ├── sk.mdx
│   └── en.mdx
└── ...
```

### MDX Frontmatter Schema

Each `.mdx` file contains YAML frontmatter:

```yaml
---
slug: "comparing-gdp"
title: "Comparing GDP: Czechia vs Slovakia"
author: "Your Name"
date: "2026-01-22"
categories: ["economics", "data"]
thumbnail: "/images/blog/gdp-comparison.jpg"
excerpt: "An in-depth analysis of economic growth patterns in both countries over the past 30 years..."
published: true
---
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| slug | string | Yes | URL-safe identifier (same across all language versions) |
| title | string | Yes | Article title in this language |
| author | string | Yes | Author name |
| date | string (ISO) | Yes | Publish date |
| categories | string[] | Yes | Category tags |
| thumbnail | string | Yes | Path to thumbnail image |
| excerpt | string | Yes | Short intro (used in cards, ~150 chars) |
| published | boolean | Yes | Whether to show on site |

### MDX Content Example

```mdx
---
slug: "comparing-gdp"
title: "Comparing GDP: Czechia vs Slovakia"
author: "Your Name"
date: "2026-01-22"
categories: ["economics", "data"]
thumbnail: "/images/blog/gdp-comparison.jpg"
excerpt: "An in-depth analysis of economic growth patterns..."
published: true
---

# Introduction

Since the Velvet Divorce in 1993, both nations have taken different economic paths...

<Callout type="info">
  This analysis uses data from Eurostat and national statistics offices.
</Callout>

## Historical Context

The economic landscape in 1993 was vastly different...

![Factory in Ostrava](/images/blog/ostrava-factory.jpg)

## GDP Growth Comparison

<Visualization 
  type="line-chart"
  dataSource="/data/gdp-comparison.json"
  caption="GDP growth 1993-2025"
/>

### Key Findings

1. Czechia maintained higher absolute GDP
2. Slovakia showed faster growth rates in the 2000s
3. Both countries converged after EU accession

<InteractiveMap 
  src="https://flo.uri.sh/visualisation/123456/embed"
  caption="Regional GDP distribution"
/>

## Conclusion

The economic stories of these two nations...

<Poll 
  question="Which economic model do you find more successful?"
  options={["Czech approach", "Slovak approach", "Both equally"]}
/>
```

---

## Available MDX Components

### InteractiveMap
Embeds Flourish or other map visualizations.

```tsx
<InteractiveMap 
  src="https://flo.uri.sh/visualisation/123456/embed"
  caption="Optional caption"
  height={500}  // optional, default 400
/>
```

### Visualization
Data visualizations (charts, graphs).

```tsx
<Visualization 
  type="line-chart" | "bar-chart" | "pie-chart"
  dataSource="/data/file.json"
  caption="Chart description"
/>
```

### Poll
Interactive reader poll (results stored in localStorage or optional backend).

```tsx
<Poll 
  question="Your question here?"
  options={["Option 1", "Option 2", "Option 3"]}
/>
```

### Callout
Highlighted information box.

```tsx
<Callout type="info" | "warning" | "tip">
  Important information here...
</Callout>
```

### ImageGallery
Carousel of images.

```tsx
<ImageGallery 
  images={[
    { src: "/img/1.jpg", alt: "Description 1" },
    { src: "/img/2.jpg", alt: "Description 2" }
  ]}
/>
```

---

## Content Reusability

The frontmatter enables automatic reuse across pages:

| Page | Data Used |
|------|-----------|
| Landing Page (cards) | thumbnail, title, excerpt, date, categories |
| Blog Listing (cards) | thumbnail, title, excerpt, date, categories, author |
| Blog Detail (full) | All frontmatter + MDX content body |

### Implementation

```typescript
// For listing pages - only frontmatter, no content
export async function getBlogPostsMeta(lang: string) {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
    title: post.frontmatter.title,
    excerpt: post.frontmatter.excerpt,
    thumbnail: post.frontmatter.thumbnail,
    date: post.frontmatter.date,
    categories: post.frontmatter.categories,
    author: post.frontmatter.author,
  }));
}

// For detail page - frontmatter + compiled MDX content
export async function getBlogPost(slug: string, lang: string) {
  const post = await getPostBySlug(slug, lang);
  return {
    frontmatter: post.frontmatter,
    content: post.compiledMDX,  // Ready to render
  };
}
```

---

## Blog Listing Page

**Route:** `/[lang]/blog`

### Layout
- Main content area with article cards
- Optional sidebar with category filter

### Sidebar (Optional)
- Category filter (checkbox or links)
- Future: Archive by year/month

### Article Cards

```
┌─────────────────────────────────────────┐
│  [Thumbnail Image]                      │
├─────────────────────────────────────────┤
│  Economics · Data                       │  ← Category badges
│                                         │
│  Comparing GDP: Czechia vs Slovakia     │  ← Title (H3, linked)
│                                         │
│  An in-depth analysis of economic       │  ← Excerpt
│  growth patterns in both countries...   │
│                                         │
│  Your Name · January 22, 2026           │  ← Author & date
└─────────────────────────────────────────┘
```

### Sorting & Pagination
- Default sort: Newest first
- Pagination: 10 articles per page, numbered navigation or "Load more"

---

## Blog Detail Page

**Route:** `/[lang]/blog/[slug]`

### Layout

```
┌─────────────────────────────────────────────────────────┐
│                  [Featured Image]                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  COMPARING GDP: CZECHIA VS SLOVAKIA                     │  ← H1, sans-serif
│                                                         │
│  Economics · Data                                       │  ← Categories
│  By Your Name · January 22, 2026                        │  ← Metadata
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [MDX Content Rendered Here]                            │
│                                                         │
│  Introduction paragraph...                              │
│                                                         │
│  ## Subheading                                          │
│                                                         │
│  More content with <InteractiveMap /> ...               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ← Back to Blog                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Content Styling
- Max-width: 700px (centered)
- Typography: Serif for body, sans-serif for headings
- Images: Full content-width with captions
- Code blocks: Syntax highlighting
- Blockquotes: Left border, italic

---

## Fallback Behavior

If content not available in selected language:
1. Show Czech version as fallback
2. Display notice: "This article is not yet available in [Language]. Showing Czech version."

---

## SEO

- **Title tag:** `{Article Title} | NCS Blog`
- **Meta description:** Article excerpt
- **Open Graph:** Thumbnail, title, excerpt
- **Structured data:** Article schema with author, date, publisher

---

## Related Specifications

- [00-overview.md](00-overview.md) - MDX component architecture
- [01-landing-page.md](01-landing-page.md) - Blog cards on landing page
- [06-localization.md](06-localization.md) - Language fallback details
