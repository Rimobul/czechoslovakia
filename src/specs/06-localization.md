# Localization Specification

---

## Supported Languages

| Code | Language | Native Name | Default |
|------|----------|-------------|---------|
| cs | Czech | Čeština | ✅ Yes |
| sk | Slovak | Slovenčina | No |
| en | English | English | No |

---

## URL Structure

All routes include language prefix:

```
https://ncs.eu/                → Redirect to /cs/ (default)
https://ncs.eu/cs/             → Czech homepage
https://ncs.eu/sk/             → Slovak homepage
https://ncs.eu/en/             → English homepage
https://ncs.eu/cs/blog         → Czech blog listing
https://ncs.eu/en/blog/my-post → English blog post
https://ncs.eu/sk/maps         → Slovak maps listing
```

### Implementation (Next.js App Router)

```
app/
├── [lang]/
│   ├── layout.tsx      # Sets lang context
│   ├── page.tsx        # Landing page
│   ├── blog/
│   │   └── ...
│   └── ...
└── page.tsx            # Root redirect to /cs/
```

```typescript
// app/page.tsx - Root redirect
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/cs');
}
```

```typescript
// app/[lang]/layout.tsx
export async function generateStaticParams() {
  return [{ lang: 'cs' }, { lang: 'sk' }, { lang: 'en' }];
}

export default function LangLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
```

---

## Language Detection & Selection

### First Visit Flow

```
User visits ncs.eu
        │
        ▼
┌───────────────────┐
│ Check for cookie  │
│ "preferred_lang"  │
└───────────────────┘
        │
        ▼
   Cookie exists?
    │         │
   Yes        No
    │         │
    ▼         ▼
Redirect   Check browser
to saved   Accept-Language
language   header
              │
              ▼
        Match found?
        │         │
       Yes        No
        │         │
        ▼         ▼
    Redirect   Redirect
    to match   to /cs/
```

### Accept-Language Parsing

```typescript
function detectLanguage(acceptLanguage: string): 'cs' | 'sk' | 'en' {
  const supported = ['cs', 'sk', 'en'];
  
  // Parse header: "cs,en-US;q=0.9,en;q=0.8"
  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().substring(0, 2));
  
  for (const lang of languages) {
    if (supported.includes(lang)) {
      return lang as 'cs' | 'sk' | 'en';
    }
  }
  
  return 'cs'; // Default fallback
}
```

### Language Picker Component

**Location:** Header/navigation bar

**Display:** 
- Desktop: Full language names or abbreviations (CS | SK | EN)
- Mobile: Flag icons or abbreviations

**Behavior:**
1. User clicks language option
2. Set cookie `preferred_lang` (expires: 1 year)
3. Redirect to same page in new language

```typescript
function switchLanguage(newLang: string) {
  // Set cookie
  document.cookie = `preferred_lang=${newLang}; path=/; max-age=31536000`;
  
  // Redirect to same page in new language
  const currentPath = window.location.pathname;
  const newPath = currentPath.replace(/^\/(cs|sk|en)/, `/${newLang}`);
  window.location.href = newPath;
}
```

---

## Cookie Specification

| Cookie Name | Value | Expires | Path | SameSite |
|-------------|-------|---------|------|----------|
| preferred_lang | cs \| sk \| en | 1 year | / | Lax |

---

## UI Translation Files

### File Structure

```
content/i18n/
├── cs.json
├── sk.json
└── en.json
```

### Translation File Format

```json
// content/i18n/en.json
{
  "common": {
    "home": "Home",
    "blog": "Blog",
    "maps": "Maps",
    "external": "External Content",
    "about": "About",
    "readMore": "Read more",
    "viewAll": "View all",
    "backTo": "Back to",
    "loading": "Loading...",
    "error": "An error occurred"
  },
  "landing": {
    "latestArticles": "Latest Articles",
    "latestMap": "Latest Map",
    "viewAllArticles": "View all articles",
    "viewAllMaps": "View all maps"
  },
  "blog": {
    "title": "Blog",
    "by": "By",
    "publishedOn": "Published on",
    "categories": "Categories",
    "backToBlog": "Back to Blog"
  },
  "maps": {
    "title": "Maps",
    "addedOn": "Added on",
    "backToMaps": "Back to Maps"
  },
  "external": {
    "title": "External Resources",
    "intro": "Curated collection of articles and videos about Czechia and Slovakia.",
    "notTranslated": "Descriptions are provided by the author and may not be in your selected language.",
    "filterByType": "Type",
    "filterByCategory": "Category",
    "sortBy": "Sort by",
    "dateAdded": "Date added",
    "allTypes": "All",
    "articles": "Articles",
    "videos": "Videos"
  },
  "about": {
    "title": "About"
  },
  "footer": {
    "copyright": "© 2026 New Czechoslovakia",
    "madeWith": "Made with"
  },
  "errors": {
    "notFound": "Page not found",
    "contentNotAvailable": "This content is not yet available in English. Showing Czech version."
  }
}
```

### Using Translations in Components

```typescript
// lib/i18n.ts
import cs from '@/content/i18n/cs.json';
import sk from '@/content/i18n/sk.json';
import en from '@/content/i18n/en.json';

const translations = { cs, sk, en };

export function useTranslation(lang: string) {
  const t = translations[lang as keyof typeof translations] || translations.cs;
  
  return {
    t: (key: string) => {
      const keys = key.split('.');
      let value: any = t;
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    }
  };
}

// Usage in component
const { t } = useTranslation(lang);
<h2>{t('landing.latestArticles')}</h2>
```

---

## Content Translation

### Blog Posts

Each post has separate MDX files per language:

```
content/blog/my-post/
├── cs.mdx    # Czech (always exists)
├── sk.mdx    # Slovak (may not exist initially)
└── en.mdx    # English (may not exist initially)
```

### Maps Content

Same structure:

```
content/maps/content/population-map/
├── cs.mdx
├── sk.mdx
└── en.mdx
```

### External Content

**NOT translated.** Descriptions remain in author's language (typically Czech).

---

## Fallback Behavior

When content doesn't exist in requested language:

### Strategy

1. Check for content in requested language
2. If not found, load Czech version (always exists)
3. Display fallback notice to user

### Fallback Notice Component

```tsx
interface FallbackNoticeProps {
  originalLang: string;
  requestedLang: string;
}

function FallbackNotice({ originalLang, requestedLang }: FallbackNoticeProps) {
  const messages = {
    en: `This content is not yet available in English. Showing Czech version.`,
    sk: `Tento obsah zatiaľ nie je dostupný v slovenčine. Zobrazuje sa česká verzia.`,
  };
  
  return (
    <div className="fallback-notice">
      ℹ️ {messages[requestedLang as keyof typeof messages]}
    </div>
  );
}
```

### Implementation

```typescript
async function getContent(slug: string, lang: string) {
  try {
    // Try requested language
    return await loadContent(slug, lang);
  } catch {
    // Fallback to Czech
    const content = await loadContent(slug, 'cs');
    return {
      ...content,
      isFallback: true,
      originalLang: 'cs',
    };
  }
}
```

---

## SEO: Hreflang Tags

Every page includes alternate language links:

```html
<head>
  <link rel="alternate" hreflang="cs" href="https://ncs.eu/cs/blog/my-post" />
  <link rel="alternate" hreflang="sk" href="https://ncs.eu/sk/blog/my-post" />
  <link rel="alternate" hreflang="en" href="https://ncs.eu/en/blog/my-post" />
  <link rel="alternate" hreflang="x-default" href="https://ncs.eu/cs/blog/my-post" />
</head>
```

### Implementation

```tsx
// components/SEO.tsx
function SEO({ lang, slug, path }: SEOProps) {
  const languages = ['cs', 'sk', 'en'];
  const baseUrl = 'https://ncs.eu';
  
  return (
    <Head>
      {languages.map(l => (
        <link
          key={l}
          rel="alternate"
          hreflang={l}
          href={`${baseUrl}/${l}${path}`}
        />
      ))}
      <link
        rel="alternate"
        hreflang="x-default"
        href={`${baseUrl}/cs${path}`}
      />
    </Head>
  );
}
```

---

## Date & Number Formatting

Use Intl APIs for locale-aware formatting:

```typescript
function formatDate(date: string, lang: string): string {
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

// Results:
// cs: "22. ledna 2026"
// sk: "22. januára 2026"  
// en: "January 22, 2026"
```

---

## Related Specifications

- [00-overview.md](00-overview.md) - File structure overview
- [02-blog-section.md](02-blog-section.md) - MDX content structure
- [04-external-content.md](04-external-content.md) - Translation exception
