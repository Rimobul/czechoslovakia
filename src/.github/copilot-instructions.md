# Copilot Instructions for "New Czechoslovakia" Website

## Purpose
This repository hosts the frontend code for the landing page of the **New Czechoslovakia** political-civil movement. The design emphasizes unity, modernity, and dignity, reflecting our mission to promote dialogue around the peaceful reunification of the Czech and Slovak republics.

## Design Principles
- **Visual tone**: Clean, serious, and hopeful. Balances tradition with modern, slightly futuristic UI.
- **Color palette**: 
  - Background: White or very light grey (#f9f9f9)
  - Accents: Blood red (#b20000) and royal blue (#0033a0)
  - Text: Black for body, white or blue for headers and links
- **Layout**: 
  - Sticky vertical top-aligned navigation menu with logo, language selector, theme toggle, and search
  - Hero image at top with readable heading and subtitle overlay
  - Three-column layout: section menu, main content, live news feed
  - Footer with legal links and a clickable map of Czechoslovakia’s regions

## Behavior and Features
- Theme toggle (light/dark/system)
- Responsive design for desktop and mobile
- Scroll behavior: Main heading shrinks and docks to top-left in nav on scroll
- Accessibility: Semantic HTML, proper contrast, keyboard navigation support

## Content Blocks
- **Why Now?** and **Our Vision** articles feature images, concise persuasive text, and optional call-to-action buttons
- **Live News Feed** updates automatically (to be implemented)
- Footer includes regional navigation via image map (interactive SVG or <map> tag)

## Notes to Copilot
- Use semantic HTML5 structure (header, nav, main, aside, footer)
- Use Flexbox/Grid for responsive layout
- Ensure accessibility: `aria` labels, keyboard support, sufficient color contrast
- Keep JS modular and minimal; focus on progressive enhancement
- Style with CSS custom properties to allow future theming

## Future Enhancements
- Server-side CMS integration for content/news
- Animation for hero transitions and heading movement on scroll
