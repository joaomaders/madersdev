# João Maders - Personal Website

A clean, modern portfolio website built with HTML, CSS, and JavaScript. Inspired by matheus.digital design patterns.

## Features

- 🎨 **Modern Design** - Clean, professional layout with smooth animations
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast** - Lightweight, no frameworks, pure HTML/CSS/JS
- 🔍 **SEO Friendly** - Semantic HTML structure
- ♿ **Accessible** - WCAG compliant markup
- 🎯 **Smooth Scrolling** - Native smooth scroll behavior
- 📊 **Sections Included**:
  - Hero section with CTA
  - About me
  - Skills (categorized)
  - Work experience (4 positions)
  - Contact information
  - Social links

## Project Structure

```
maders/
├── index.html          # Main HTML file
├── src/
│   ├── styles.css      # All styles
│   └── script.js       # JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. **Open in Browser**
   - Simply open `index.html` in any modern web browser

2. **Using a Local Server (Recommended)**
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (http-server)
   npx http-server
   ```
   Then visit `http://localhost:8000`

## Customization

### Update Personal Information
Edit `index.html` and update:
- Name and subtitle
- About section content
- Skills (add/remove tags in skill groups)
- Experience entries (add/remove jobs)
- Contact email and phone
- Social media links

### Modify Colors
Edit the CSS variables in `src/styles.css`:
```css
:root {
    --primary-color: #0066cc;      /* Main blue */
    --text-color: #1a1a1a;         /* Dark text */
    --light-bg: #f5f5f5;           /* Light background */
    --secondary-text: #666;        /* Gray text */
}
```

### Change Fonts
Update the font-family in `src/styles.css`:
```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- No external dependencies
- Single stylesheet (~10KB)
- Single script file (~3KB)
- No jQuery or frameworks
- Optimized CSS Grid and Flexbox

## Deployment

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: (leave empty)
4. Publish directory: `/`
5. Click Deploy

### Deploy to Vercel
1. Push code to GitHub
2. Import project from Vercel dashboard
3. Click Deploy

### Deploy to GitHub Pages
1. Push code to GitHub
2. Go to Settings → Pages
3. Select `main` branch as source
4. Click Save
5. Site will be available at `https://username.github.io/maders`

### Deploy to Any Static Host
Since this is a static site, you can deploy to:
- AWS S3 + CloudFront
- Azure Static Web Apps
- Firebase Hosting
- Any traditional web host (just upload files via FTP)

## License

Feel free to use this template for your own portfolio!

## Credits

- Design inspiration: [matheus.digital](https://matheus.digital/)
- Icons: SVG icons for LinkedIn and GitHub
- Fonts: System fonts for better performance

---

**Created:** February 2026
