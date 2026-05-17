# Webflow Integration Guide

How to embed and maintain this frontend in Webflow.

## Overview

Webflow handles:
- CMS (content management)
- Hosting and domains
- Page structure and layout

This repository provides:
- CSS (styling, layout, responsive design)
- JavaScript (interactions, animations, carousel)
- HTML templates (structure for embed elements)

## Setup Instructions

### Step 1: Add CSS Links

In Webflow, go to **Project Settings > Custom Code > Head Code** and add:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/css/global.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/css/product-page.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/css/carousel.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/css/responsive.css">
```

For portfolio pages, also add:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/css/portfolio-page.css">
```

### Step 2: Add JavaScript Links

In Webflow, go to **Project Settings > Custom Code > Footer Code** and add:

```html
<script src="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/js/carousel.js"></script>
<script src="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/js/product-scroll.js"></script>
```

For portfolio pages, also add:
```html
<script src="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/js/portfolio.js"></script>
```

### Step 3: Create Embed Elements

On a **Product Page** in Webflow:

1. Add an **Embed element**
2. Open the template from `html/product-page.html`
3. Copy the entire HTML content
4. Paste into Webflow embed
5. Replace `[REPLACE-WITH-PRODUCT-IMAGE-X]` with actual Webflow image URLs

Repeat for portfolio pages using `html/portfolio-page.html`.

### Step 4: Link Webflow Images

In Webflow, you can link images directly:

```html
<!-- Instead of: -->
<img src="[REPLACE-WITH-PRODUCT-IMAGE-1]">

<!-- Use Webflow image upload: -->
<img src="https://uploads-ssl.webflow.com/...">
```

Webflow will generate the CDN URL when you upload an image.

## CSS Customization in Webflow

If you need to override styles in Webflow (e.g., color scheme, typography):

**Option 1: Direct override in Webflow**

Add to Webflow custom code (after CDN links):
```html
<style>
  .product-title {
    color: #000;  /* Override from global CSS */
  }
</style>
```

**Option 2: Modify this repository**

Edit the relevant CSS file:
- Product color changes → `css/product-page.css`
- Carousel styles → `css/carousel.css`
- Typography → `css/global.css`

Push to GitHub. CDN will update automatically (may take a few minutes for cache).

## File Deployment

### Auto-Update via CDN (jsDelivr)

Files are automatically served from GitHub:
```
https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/css/global.css
```

**How it works:**
1. Push changes to `main` branch
2. CDN caches for ~1 hour
3. Webflow pages automatically use latest files

To force an immediate cache clear:
```
https://purge.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/css/global.css
```

### Version Pinning (Optional)

For production stability, you can pin to a specific release:
```html
<!-- Instead of @main (always latest): -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@v1.0.0/css/global.css">
```

## Troubleshooting

### Styles Not Showing

1. Check that CSS links are in **custom code > head code** (not page-level)
2. Open browser DevTools → Network tab → verify CSS files load (status 200)
3. Check for cache issues: use incognito mode or hard-refresh (Cmd+Shift+R / Ctrl+Shift+R)
4. Verify CDN URL is correct: `https://cdn.jsdelivr.net/...`

### JavaScript Not Working

1. Verify JS files are in **custom code > footer code**
2. Check browser console (F12 → Console) for errors
3. Verify embed HTML has correct class names (`.product-page`, `.carousel-modal`, etc.)
4. Ensure CSS is loaded first (CSS files in head code, JS in footer code)

### Images Not Loading

1. Replace `[REPLACE-WITH-IMAGE-URL]` with actual Webflow image URLs
2. Webflow images must be uploaded in **Assets** panel
3. Check image URLs in DevTools → Network tab (verify 200 status)
4. Verify image format is supported (JPG, PNG, WebP)

### Carousel Not Opening

1. Ensure `carousel.js` is loaded
2. Check that embed HTML includes `.carousel-modal` element
3. Verify `.product-image` elements have click listeners
4. Check console for JavaScript errors

## Testing Checklist Before Publishing

- [ ] All CSS loads without errors (DevTools → Network)
- [ ] Scroll effect works on product pages
- [ ] Carousel opens when clicking product images
- [ ] Carousel navigation works (arrows, keyboard, close button)
- [ ] Responsive layout works on mobile and tablet
- [ ] No console errors or warnings
- [ ] Images load from Webflow CDN
- [ ] Forms/buttons work correctly

## Updating the Repository

To make changes to CSS or JavaScript:

1. Clone the repository locally
2. Make changes in the relevant file
3. Test locally (open HTML in browser)
4. Commit and push to `main` branch
5. Wait 1-5 minutes for CDN cache to clear
6. Hard-refresh Webflow preview (Cmd+Shift+R)

### Git Workflow

```bash
# Clone
git clone https://github.com/wilsonong/wilson-ong-webflow.git

# Create branch for changes
git checkout -b fix/carousel-keyboard-nav

# Make changes, test locally
# ...

# Commit
git add css/carousel.css
git commit -m "Fix: improve carousel keyboard navigation"

# Push
git push origin fix/carousel-keyboard-nav

# Create PR or push to main
git checkout main
git merge fix/carousel-keyboard-nav
git push origin main
```

## Performance Optimization

### Image Optimization

- Compress product images before uploading to Webflow
- Use modern formats (WebP with JPG fallback)
- Avoid oversized images; let CSS resize with `object-fit`

### CSS Delivery

- CSS is loaded from CDN (fast global delivery)
- Consider HTTP/2 multiplexing benefits
- Inline critical CSS in Webflow if needed for above-the-fold performance

### JavaScript Performance

- Minimal JS footprint (no frameworks)
- Scroll listener is throttled via `will-change` and transform-only changes
- Carousel preloads current + next image for instant navigation

## Support & Debugging

For issues:

1. Check browser console (F12)
2. Verify network requests (CSS/JS loading)
3. Inspect HTML structure (ensure class names match CSS selectors)
4. Test in multiple browsers (Chrome, Safari, Firefox)
5. Compare with template HTML (`html/product-page.html`)

## Future Enhancements

- [ ] Add analytics tracking to carousel views
- [ ] Implement image lazy-loading
- [ ] Add touch gesture support (swipe carousel)
- [ ] Optimize for different connection speeds
