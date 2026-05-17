# Wilson Ong Webflow — Frontend Architecture

Custom frontend layer for a Webflow-hosted editorial fashion website. This repository contains the CSS, JavaScript, and HTML templates that power interactive elements, animations, and responsive design.

## Quick Start

This repository is a source of truth for:
- **CSS** — visual system, responsive design, component styling
- **JavaScript** — scroll interactions, carousel navigation, gallery behavior
- **HTML** — templates for embedding into Webflow

### File Structure

```
/css
  global.css          # Reset, base typography, site-wide styles
  product-page.css    # Product layout and details
  portfolio-page.css  # Portfolio gallery and featured image
  carousel.css        # Carousel lightbox modal (shared)
  responsive.css      # Tablet and mobile breakpoints

/js
  carousel.js         # Carousel modal logic (shared)
  product-scroll.js   # Product scroll-wipe effect
  portfolio.js        # Portfolio gallery interactions

/html
  product-page.html   # Product page template
  portfolio-page.html # Portfolio page template

/docs
  README.md                  # This file
  architecture-notes.md      # Design decisions and patterns
  webflow-integration.md     # Webflow embedding instructions
```

## Aesthetic Principles

- **Editorial** — restrained, typography-led design
- **Gallery-like** — image dominance, cinematic pacing
- **Luxury** — minimalist approach, generous spacing
- **Semantic** — meaningful class names, no utility frameworks

Avoid generic ecommerce styling. Preserve the current visual language.

## CSS Architecture

Each CSS file handles a specific concern:

- **global.css** — resets, typeface, base element styles
- **product-page.css** — two-column grid, sticky images, details panel
- **portfolio-page.css** — featured image, gallery grid, credentials
- **carousel.css** — modal overlay, fade transitions, navigation controls
- **responsive.css** — tablet and mobile adjustments

No `!important` declarations. Clean selector specificity. All utilities are semantic: `.product-page`, `.carousel-modal`, `.gallery-thumbnail`.

## JavaScript Modules

Each module is independent and can be loaded separately:

- **carousel.js** — shared modal controller (prev/next, keyboard nav, counter)
- **product-scroll.js** — scroll-triggered image sequencing with page-relative calculations
- **portfolio.js** — gallery thumbnail selection and featured image updates

Modules communicate via function calls. No state libraries. Browser APIs only.

## Integration with Webflow

All files are hosted on GitHub and loaded via CDN into Webflow embed elements.

**CSS links** (add to Webflow custom code):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/css/global.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/css/product-page.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/css/carousel.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/css/responsive.css">
```

**JS links** (add to Webflow custom code):
```html
<script src="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/js/carousel.js"></script>
<script src="https://cdn.jsdelivr.net/gh/wwwilsong/wilson-ong-webflow@main/js/product-scroll.js"></script>
```

See [webflow-integration.md](docs/webflow-integration.md) for detailed instructions.

## Development

### Making Changes

1. Edit CSS or JS files locally
2. Test in browser (use live preview or local server)
3. Commit changes to main branch
4. CDN will automatically serve updated files

### Testing Checklist

- [ ] Responsive behavior on desktop, tablet, mobile
- [ ] Scroll interactions smooth and performant
- [ ] Carousel navigation works with mouse, keyboard, touch
- [ ] Images load correctly from Webflow
- [ ] No console errors or warnings

### Performance Notes

- Images use `object-fit: cover` for responsive sizing
- Scroll listener uses `transform` for 60fps animations
- Carousel uses opacity transitions (GPU-accelerated)
- No layout thrashing or unnecessary repaints

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 JavaScript (no transpilation needed for this codebase)
- CSS Grid and Flexbox support required
- `transform` and `will-change` optimizations enabled

## Future Directions

- Reduce image duplication between product carousel sections
- Add prefetch for smoother image transitions
- Enhance keyboard accessibility (ARIA labels, focus management)
- Consider lazy loading for portfolio galleries

## Questions?

Refer to [architecture-notes.md](docs/architecture-notes.md) for design rationale and [webflow-integration.md](docs/webflow-integration.md) for implementation details.
