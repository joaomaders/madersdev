# João Maders - Personal Website

A clean, modern portfolio website built with HTML, CSS, and JavaScript. Inspired by matheus.digital design patterns.

## Features

- 🎨 **Modern Design** - Clean, professional layout with smooth animations
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast** - Lightweight, no frameworks, pure HTML/CSS/JS
- 🌐 **Bilingual** - English (root) and Portuguese (br/)
- 🔍 **SEO Friendly** - Semantic HTML, sitemap, robots.txt, hreflang
- ♿ **Accessible** - WCAG-oriented markup, reduced-motion support, aria-labels
- 🎯 **Smooth Scrolling** - Native smooth scroll (respects prefers-reduced-motion)
- 📊 **Sections Included**:
  - Hero section with CTA
  - About me
  - Skills (categorized)
  - Work experience (4 positions)
  - Contact information (with cat widget)
  - Social links

## Project Structure

```
madersdev/
├── index.html              # English (EN)
├── br/
│   └── index.html          # Portuguese (PT-BR)
├── src/
│   ├── styles.css         # Main stylesheet (imports layers)
│   ├── css/
│   │   ├── variables.css  # Theme and color tokens
│   │   ├── base.css       # Reset, body, container
│   │   ├── layout.css     # Sections, nav, hero, content, footer
│   │   ├── components.css # Buttons, social, cat widget
│   │   └── device-preview.css
│   ├── js/
│   │   ├── theme.js       # Dark/light toggle
│   │   ├── nav.js         # Hamburger, scroll spy
│   │   ├── scroll.js      # Scroll-to-top, scroll animations
│   │   ├── effects.js    # Footer year, paw effect
│   │   └── device-preview.js
│   ├── john-maders.png
│   ├── maders-dev-header-logo.svg
│   └── maders-dev-header-logo-black.svg
├── sitemap.xml
├── robots.txt
└── README.md
```

## Getting Started

1. **Open in Browser**
   - Open `index.html` in any modern web browser (EN) or `br/index.html` (PT)

2. **Using a Local Server (Recommended)**
   ```bash
   # Python 3
   python3 -m http.server 8000

   # Node.js (http-server)
   npx http-server
   ```
   Then visit `http://localhost:8000`

## Customization

### Update Personal Information
- **English:** Edit `index.html` (name, about, skills, experience, contact, social links).
- **Portuguese:** Edit `br/index.html` the same way to keep both languages in sync.

### Modify Colors
Edit theme variables in `src/css/variables.css`:
```css
:root {
    --primary-color: var(--color-yellow);
    --text-color: var(--color-black);
    /* ... */
}
```

### Change Fonts
Update `font-family` in `src/css/base.css` (body).

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- No external dependencies or build step
- CSS split into logical files (variables, base, layout, components, device-preview); main file imports them
- JavaScript split into modules (theme, nav, scroll, effects, device-preview)
- Preload for critical CSS and hero image
- No jQuery or frameworks
- Optimized CSS Grid and Flexbox

## Deployment

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: (leave empty)
4. Publish directory: `/`
5. Click Deploy

### Deploy to Vercel / GitHub Pages
Same idea: static site, publish root. For GitHub Pages, set source to `main` and root (or `/docs` if you use that folder).

### Deploy to Any Static Host
Upload the repo as-is. Ensure `sitemap.xml` and `robots.txt` are at the root if you use a custom domain (e.g. maders.dev).

## License

Feel free to use this template for your own portfolio!

## Credits

- Design inspiration: [matheus.digital](https://matheus.digital/)
- Icons: SVG icons for LinkedIn and GitHub
- Fonts: System fonts for better performance

---

**Created:** February 2026
