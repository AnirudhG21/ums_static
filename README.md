# Utility Management Services – Corporate Website

> **Water Purification · Industrial RO/UV Systems · Wastewater Treatment**  
> Proprietor: **Ganesh Murthy BN**

---

## Project Structure

```
UMS/
├── index.html                  ← Main website (single-page)
├── css/
│   └── style.css               ← All styles, responsive design, animations
├── js/
│   └── script.js               ← Vanilla JS interactions & functionality
├── assets/
│   ├── images/
│   │   ├── logo.png            ← [REPLACE] Company logo
│   │   ├── hero-water.jpg      ← [REPLACE] Hero section background image
│   │   ├── about.jpg           ← [REPLACE] About section image
│   │   ├── video-poster.jpg    ← [REPLACE] Video poster/thumbnail
│   │   ├── proprietor.jpg      ← [REPLACE] Ganesh Murthy BN profile photo
│   │   ├── domestic-ro.jpg     ← [REPLACE] Domestic RO purifier product image
│   │   ├── uv-purifier.jpg     ← [REPLACE] UV purifier product image
│   │   ├── ro-uv-purifier.jpg  ← [REPLACE] RO+UV purifier product image
│   │   ├── ro-membrane.jpg     ← [REPLACE] RO membrane product image
│   │   ├── filters.jpg         ← [REPLACE] Replacement filters product image
│   │   ├── pumps-parts.jpg     ← [REPLACE] Pumps & spare parts product image
│   │   ├── accessories.jpg     ← [REPLACE] Accessories product image
│   │   ├── industrial-ro.jpg   ← [REPLACE] Industrial RO plant image
│   │   ├── industrial-uv.jpg   ← [REPLACE] Industrial UV system image
│   │   ├── commercial-ro.jpg   ← [REPLACE] Commercial RO system image
│   │   ├── water-treatment-equipment.jpg ← [REPLACE]
│   │   ├── filtration-systems.jpg        ← [REPLACE]
│   │   ├── ro-components.jpg             ← [REPLACE]
│   │   └── clients/            ← [ADD] Client logo files here
│   ├── videos/
│   │   └── company-advertisement.mp4 ← [REPLACE] Actual 30-sec ad video
│   └── icons/                  ← (icons handled via Phosphor Icons CDN)
└── README.md                   ← This file
```

---

## Placeholders to Replace Before Launch

### 🔴 Critical — Must Replace

| Location | Placeholder | What to Add |
|---|---|---|
| `index.html` → all WhatsApp links | `91XXXXXXXXXX` | Actual mobile number (no + or spaces): e.g. `919845000000` |
| `index.html` → Phone links | `+91XXXXXXXXXX` | Actual phone number |
| `index.html` → Email | `info@utilitymanagementservices.in` | Actual email address |
| `index.html` → Address | `[Street Address]…` | Actual business address |
| `js/script.js` → line ~169 | `var waNumber = '91XXXXXXXXXX'` | Same WhatsApp number |
| `assets/videos/` | `company-advertisement.mp4` | Actual 30-second ad video |
| `assets/images/` | `hero-water.jpg` | High-quality water/RO plant background |
| `assets/images/` | `proprietor.jpg` | Professional photo of Ganesh Murthy BN |
| `index.html` → Google Maps | Comment block near map placeholder | Paste actual Google Maps embed iframe src |

### 🟡 Recommended — Improves Quality

| Location | What to Add |
|---|---|
| `assets/images/` | All product images (domestic-ro.jpg, uv-purifier.jpg, etc.) |
| `assets/images/clients/` | Actual client logo files (PNG/SVG, ideally white/greyscale) |
| `assets/images/` | `about.jpg` – water treatment facility or team photo |
| `index.html` → Footer social links | Actual Facebook, Instagram, YouTube profile URLs |
| `assets/images/` | `video-poster.jpg` – thumbnail shown before video plays |

### 🟢 Optional — Nice to Have

| Location | What to Add |
|---|---|
| `index.html` → `<head>` og:url | Actual website URL |
| `index.html` → Structured data | Actual phone, email, address in JSON-LD block |
| `js/script.js` → analytics hook | Replace `console.log` with `gtag()` or analytics call |

---

## How to Update the WhatsApp Number

1. Open `index.html` — search for `91XXXXXXXXXX` and replace **all** occurrences with your number.
2. Open `js/script.js` — find line ~169: `var waNumber = '91XXXXXXXXXX';` — replace with same number.

**Format:** Country code + number, no `+`, no spaces, no dashes.  
Example: `+91 98450 00000` → `919845000000`

---

## How to Add Google Maps

1. Go to [Google Maps](https://maps.google.com) and search for your business address.
2. Click **Share** → **Embed a map** → Copy the `src` URL from the `<iframe>` code.
3. In `index.html`, find the comment block near `<!-- Uncomment and replace src when ready -->`.
4. Uncomment the `<iframe>` block and paste your Maps src URL.

---

## How to Add Client Logos

1. Save client logos as PNG or SVG files in `assets/images/clients/`.
2. In `index.html`, find the `client-logo-grid` sections.
3. Replace each `<div class="client-logo__placeholder">` block with:
```html
<div class="client-logo" role="listitem" aria-label="Client Name">
  <img src="assets/images/clients/client-name.png" 
       alt="Client Name logo" 
       loading="lazy" />
</div>
```

---

## Deployment

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit – UMS corporate website"
git remote add origin https://github.com/YOUR_USERNAME/ums-website.git
git push -u origin main
# Then: GitHub repo Settings → Pages → Branch: main / root → Save
```

### Netlify (Drag & Drop)
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the entire `UMS/` folder onto the Netlify dashboard
3. Done — site is live instantly

### Any Web Host (cPanel / FTP)
Upload all files maintaining the folder structure to your `public_html/` directory.

---

## Technology Stack

- **HTML5** – Semantic structure, accessibility (ARIA), SEO
- **CSS3** – Custom properties, Flexbox, CSS Grid, animations, responsive design
- **Vanilla JavaScript** – No frameworks, no dependencies
- **Google Fonts** – Inter + Poppins (loaded from CDN)
- **Phosphor Icons** – Icon library (loaded from CDN, `defer`ed)

---

## Browser Support

| Browser | Version |
|---|---|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Chrome/Safari | Current |

---

## SEO Included

- ✅ Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ✅ Proper heading hierarchy (h1 → h2 → h3 → h4)
- ✅ Meta description & keywords
- ✅ Open Graph tags (Facebook/LinkedIn preview)
- ✅ Twitter Card tags
- ✅ Local Business JSON-LD structured data
- ✅ Descriptive `alt` attributes on all images
- ✅ Descriptive section `id` attributes for clean anchor URLs
- ✅ `loading="lazy"` on below-fold images

---

*© Utility Management Services. All rights reserved. Proprietor: Ganesh Murthy BN.*
