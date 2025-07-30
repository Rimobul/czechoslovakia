# 🇨🇿🇸🇰 Nové Československo - Website

## 🚀 How to Run the Website

This website uses JavaScript includes for header and footer, which require a local HTTP server to work properly due to browser security restrictions.

### Option 1: Python HTTP Server (Recommended)
```bash
# Navigate to the src directory
cd src

# Start the server
python -m http.server 3000

# Open in browser
# Visit: http://localhost:3000
```

### Option 2: Node.js HTTP Server
```bash
# Install a simple HTTP server
npm install -g http-server

# Navigate to src directory and start server
cd src
http-server -p 3000

# Visit: http://localhost:3000
```

### Option 3: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` 
3. Select "Open with Live Server"

## 🏗️ Project Structure

```
src/
├── index.html          # Home page
├── about.html          # About page
├── events.html         # Events page
├── business.html       # Business page
├── news.html           # News page
├── contact.html        # Contact page
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   ├── includes.js     # Header/footer loader
│   ├── translations.js # Multi-language support
│   └── script.js       # Main JavaScript
└── includes/
    ├── header.html     # Shared header
    └── footer.html     # Shared footer
```

## 🌍 Features

- ✅ Multi-language support (Czech, Slovak, English)
- ✅ Responsive design
- ✅ Dark/Light theme toggle
- ✅ Modular header/footer includes
- ✅ Sticky navigation
- ✅ Modern CSS with no rounded corners
- ✅ Transparent button design

## ❗ Troubleshooting

**Problem**: Header and footer not loading
**Solution**: Make sure you're running the website through an HTTP server (not opening files directly)

**Problem**: CORS errors in console
**Solution**: Use one of the server options above instead of opening HTML files directly

## 🎨 Design

- **Colors**: Red (#dc2626) and Blue (#2563eb)
- **Fonts**: Playfair Display + Source Serif Pro
- **Style**: Modern, minimalist, sharp geometric design
