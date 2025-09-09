# 🇨🇿🇸🇰 Nové Československo - Website (Astro Migration)

This project has been migrated from ad‑hoc static HTML with client-side includes to an Astro static site for reliable componentization, theming, and future extensibility.

## ✅ Current Source of Truth

```
astro/
    src/
        components/ (Header, Footer, Layout)
        pages/       (index, about, events, business, news, contact, 404)
        i18n/        (translations.ts – ESM translations data)
    public/
        css/styles.css
        js/script.js
        favicon.svg
```

Legacy root files (e.g. `index.html`, `about.html`, `css/`, `js/`, `includes/`) are deprecated and retained temporarily for reference. They can be deleted after deployment validation.

## 🚀 Develop
```bash
cd astro
npm install
npx astro dev
# visit http://localhost:4321
```

## 🏗️ Build
```bash
cd astro
npx astro build
```
Static output: `astro/dist/`

## � Internationalization
Client-side language switching still updates text via data-translate attributes. Translations now live in `src/i18n/translations.ts` (ES module) and are dynamically imported by the client script.

Planned enhancement: dedicated i18n routes (`/cs/...`, `/sk/...`, `/en/...`) with pre-rendered language variants.

## 🎨 Design Principles
Sharp geometric aesthetic, no rounded corners, dual accent colors (Red #dc2626, Blue #2563eb), elegant serif typography (Playfair Display + Source Serif Pro), light/dark theme support.

## ✨ Features
- Component-based layout (Astro)
- Multi-language (CS/SK/EN) client toggle
- Theme toggle with system preference detection
- Sticky, responsive navigation & mobile menu
- Newsletter form (simulated submission + feedback)
- Scroll-triggered card animations

## 🗺️ Next Steps (Optional)
1. Generate static language routes (`/cs`, `/sk`, `/en`).
2. Remove legacy root files after production deploy.
3. Add sitemap & SEO metadata per page.
4. Split JS into smaller, route-level hydrated islands if necessary.

## 📜 License
Internal civic initiative project (add explicit license if distributing).

