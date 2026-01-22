# About Page Specification

**Route:** `/[lang]/about`

---

## Purpose

A simple, personal page introducing the author, explaining the motivation behind the project, and acknowledging the AI collaboration.

---

## Design Principles

- Clean and minimal
- Personal but professional
- No contact information (spam/phishing prevention)
- Black & white photography

---

## Page Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    ABOUT                                │  ← H1, centered
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                 ┌─────────────┐                        │
│                 │             │                        │
│                 │   [B&W      │                        │
│                 │   Photo]    │                        │
│                 │             │                        │
│                 └─────────────┘                        │
│                                                         │
│                   Your Name                             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ## About Me                                            │
│                                                         │
│  Brief personal introduction paragraph. Background,     │
│  interests, connection to Czech/Slovak topics...        │
│                                                         │
│  ## Why This Project?                                   │
│                                                         │
│  Motivation paragraph explaining what inspired the      │
│  creation of this website. Why compare CZ and SK?       │
│  What do you hope readers will learn or discover?       │
│                                                         │
│  ## Acknowledgments                                     │
│                                                         │
│  This website was created with assistance from          │
│  GitHub Copilot (Claude), an AI programming assistant.  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Content Sections

### 1. Author Photo

**Specifications:**
- Black & white photograph
- Professional but approachable
- Size: ~200x200px displayed (higher resolution source)
- Shape: Circular or rounded rectangle
- Centered on page

### 2. About Me

Short paragraph covering:
- Who you are (first name, general background)
- Your connection to Czechia/Slovakia
- Professional or personal interests relevant to the site

**Example:**
> I'm a data enthusiast with roots in both Czechia and Slovakia. Having grown up experiencing both cultures, I've always been fascinated by the similarities and differences between these two nations that once formed a single country.

### 3. Why This Project?

Paragraph explaining:
- Motivation for creating the website
- What gap it fills or perspective it offers
- Goals for readers/visitors

**Example:**
> After the Velvet Divorce in 1993, Czechia and Slovakia took different paths while maintaining close ties. This website aims to explore how these two nations have evolved—through data, maps, and stories. Whether you're from one of these countries or simply curious about Central Europe, I hope you'll find something interesting here.

### 4. Acknowledgments

Brief mention of tools and collaborators:
- AI collaboration (GitHub Copilot)
- Data sources (general mention)
- Any other acknowledgments

**Example:**
> This website was built with assistance from GitHub Copilot, an AI programming assistant. The maps and visualizations use data from various public sources including Eurostat, Czech Statistical Office, and Statistical Office of the Slovak Republic.

---

## Localized Content

Store About page content in MDX or translation files:

### Option A: MDX Files

```
content/about/
├── cs.mdx
├── sk.mdx
└── en.mdx
```

### Option B: Translation Files

```json
// content/i18n/cs.json
{
  "about": {
    "title": "O mně",
    "sections": {
      "aboutMe": {
        "title": "O mně",
        "content": "Jsem datový nadšenec s kořeny v Česku i na Slovensku..."
      },
      "whyThisProject": {
        "title": "Proč tento projekt?",
        "content": "Po sametovém rozvodu v roce 1993..."
      },
      "acknowledgments": {
        "title": "Poděkování",
        "content": "Tyto webové stránky byly vytvořeny..."
      }
    }
  }
}
```

**Recommendation:** Use MDX for flexibility (allows adding links, formatting, etc.)

---

## Styling Details

### Typography
- **Page title (H1):** Sans-serif, large, centered
- **Section headings (H2):** Sans-serif, medium
- **Body text:** Serif, regular

### Layout
- Max-width: 600px (narrower than articles for intimacy)
- Centered content
- Generous whitespace
- Photo: Centered above content

### Photo Styling
```css
.author-photo {
  width: 200px;
  height: 200px;
  border-radius: 50%;  /* or 12px for rounded rectangle */
  filter: grayscale(100%);
  object-fit: cover;
  margin: 2rem auto;
}
```

---

## Privacy Considerations

### What NOT to Include
- ❌ Email address
- ❌ Phone number
- ❌ Physical address
- ❌ Contact form
- ❌ Social media links (optional - can add later if desired)

### Rationale
- Prevents spam and phishing attempts
- Maintains privacy
- If contact is needed in future, consider:
  - Adding social media links
  - Creating a simple CAPTCHA-protected form
  - Using a contact service that hides your email

---

## SEO

- **Title tag:** "About | NCS" / "O mně | NČS" / "O mne | NČS"
- **Meta description:** "Learn about the creator of New Czechoslovakia and the motivation behind this project."

---

## Related Specifications

- [00-overview.md](00-overview.md) - Typography, design system
- [06-localization.md](06-localization.md) - Content translation approach
