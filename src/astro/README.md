# Astro Migration (Work in Progress)

This directory contains an in-progress migration of the static site to Astro for component-based layouts (Header, Footer) and server-side rendered static pages.

## Develop

Install dependencies and start dev server:

```bash
npm install
npm run dev
```

Then open the shown localhost URL.

## Structure
- `src/components` shared UI (Header, Footer, Layout)
- `src/pages` routed pages (`/` complete, others pending)
- `public/` static assets (reuse existing css/js by copying or symlinking later)

## Next Steps
- Create about, events, business, news, contact pages as `.astro`
- Move `css/` and `js/` into `public/` (or convert to Astro assets + partial hydration if needed)
- Replace runtime include loader with direct component imports (already removed here)
- Adapt translation boot logic to run without include events (components exist at load)
- Add language-aware routing if desired (`/cs`, `/sk`, `/en`)

