# Theme System Specification

## Overview

The NCS website supports three theme modes:
- **Light** - Light background with dark text
- **Dark** - Dark background with light text (default)
- **System** - Automatically follows the user's operating system preference

---

## Implementation

### Technology Stack
- **CSS Custom Properties** - All colors are defined as CSS variables
- **Tailwind CSS** - Uses `darkMode: 'class'` configuration
- **React Context** - `ThemeProvider` manages theme state
- **localStorage** - Persists user preference across sessions

### Components

| Component | Location | Purpose |
|-----------|----------|---------|
| ThemeProvider | `components/layout/ThemeProvider.tsx` | Context provider for theme state |
| ThemeSwitcher | `components/layout/ThemeSwitcher.tsx` | Desktop dropdown theme picker |
| MobileThemeSwitcher | `components/layout/ThemeSwitcher.tsx` | Mobile bottom nav theme button |

---

## Color Palette

### Dark Theme (Default)

| Role | Color | Usage |
|------|-------|-------|
| Neutral Primary | `#0e0d0c` | Main background |
| Neutral Secondary | `#151515` | Secondary sections, cards |
| Neutral Inverse | `#ebebeb` | Inverse sections |
| Text Primary | `#ebebeb` | Main text |
| Text Secondary | `rgba(235, 235, 235, 0.6)` | Muted text |
| Border Primary | `rgba(235, 235, 235, 0.1)` | Subtle borders |
| Border Secondary | `rgba(235, 235, 235, 0.2)` | Card borders, dividers |
| Accent Primary | `#d3433b` | Buttons, CTAs |
| Accent On Dark | `#f34f48` | Links, accent text |

### Light Theme

| Role | Color | Usage |
|------|-------|-------|
| Neutral Primary | `#fafafa` | Main background |
| Neutral Secondary | `#f0f0f0` | Secondary sections, cards |
| Neutral Inverse | `#1a1a1a` | Inverse sections |
| Text Primary | `#1a1a1a` | Main text |
| Text Secondary | `rgba(26, 26, 26, 0.65)` | Muted text |
| Border Primary | `rgba(26, 26, 26, 0.1)` | Subtle borders |
| Border Secondary | `rgba(26, 26, 26, 0.15)` | Card borders, dividers |
| Accent Primary | `#d3433b` | Buttons, CTAs (same) |
| Accent On Light | `#c23830` | Links, accent text |

---

## CSS Variables

All theme colors are defined as CSS custom properties in `globals.css`:

```css
/* Dark Theme */
:root,
:root.dark {
  --color-neutral-primary: #0e0d0c;
  --color-text-primary: #ebebeb;
  /* ... */
}

/* Light Theme */
:root.light {
  --color-neutral-primary: #fafafa;
  --color-text-primary: #1a1a1a;
  /* ... */
}
```

---

## User Experience

### Theme Selection
1. User clicks theme icon in header (desktop) or bottom nav (mobile)
2. Dropdown/toggle shows three options: Light, Dark, System
3. Selection is immediately applied and saved to localStorage
4. On next visit, saved preference is automatically applied

### System Theme Detection
When "System" is selected:
- Uses `prefers-color-scheme` media query
- Automatically updates when OS theme changes
- No page reload required

### Flash Prevention
A small inline script in `<head>` reads the stored preference before React hydrates, preventing any flash of the wrong theme.

---

## Accessibility

- Theme switcher has proper `aria-label` for screen readers
- Sufficient color contrast maintained in both themes (WCAG AA)
- Focus states visible in both themes
- No motion-based theme transitions (respects `prefers-reduced-motion`)

---

## Localization

Theme labels are localized in all supported languages:

| Key | Czech | Slovak | English |
|-----|-------|--------|---------|
| `theme.light` | Světlý | Svetlý | Light |
| `theme.dark` | Tmavý | Tmavý | Dark |
| `theme.system` | Systém | Systém | System |
| `theme.toggle` | Přepnout motiv | Prepnúť motív | Toggle theme |

---

## Storage

| Key | Location | Purpose |
|-----|----------|---------|
| `ncs-theme` | localStorage | Stores user's theme preference (`light`, `dark`, or `system`) |

---

## Tailwind Configuration

```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: 'class',
  // ...
}
```

The `class` strategy allows JavaScript control over the theme, enabling the "system" option and localStorage persistence.

---

*Specification Version: 1.0*  
*Created: January 28, 2026*
