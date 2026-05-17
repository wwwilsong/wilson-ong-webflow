# Architecture & Design Decisions

This document explains the "why" behind key architectural choices.

## CSS Architecture

### Why Split CSS into Multiple Files?

**Problem:** One 400-line CSS file mixing concerns (reset, layout, carousel, responsive).

**Solution:** Modular files organized by concern:
- Easier to locate and modify styles
- Smaller files for faster loading
- Clear mental model: designer needs product styles? → look in `product-page.css`
- Scales better as portfolio expands

### Why No Utility Classes?

Semantic naming (`.product-title`, `.carousel-image`) is more readable for designers and creates stable class names. Utility frameworks (`@apply`, Tailwind) obscure the actual CSS and make debugging harder. Editorial sites benefit from restraint, not abstraction layers.

### Selector Organization

All selectors are scoped to semantic containers:
```css
.product-page { ... }
  .product-images-column { ... }
    .product-images-container { ... }
      .product-image-section { ... }
        .product-image { ... }
```

This avoids:
- Global `.image` class pollution
- Specificity wars
- Accidental style leakage

### No !important Declarations

Removed 140+ `!important` statements from original CSS. Specificity is managed through proper nesting and container scoping instead. This makes the cascade predictable and easier to debug.

## JavaScript Architecture

### Modular Functions, Not Classes

Each module exports functions (not ES6 classes) for simplicity and direct browser API access:

```javascript
// carousel.js
function openCarousel(startIndex) { ... }
function closeCarousel() { ... }
function nextCarouselImage() { ... }
```

No class instance tracking, no inheritance chains. Functions are easier to debug and work well with vanilla DOM manipulation.

### Shared Carousel Module

Both product and portfolio pages need carousel functionality. `carousel.js` is a single source of truth:

```javascript
// Works for both .carousel-modal and .portfolio-carousel-modal
const modal = document.querySelector('.carousel-modal.active, .portfolio-carousel-modal.active');
```

Reduces duplication and ensures consistent behavior.

### Scroll Effect Design (product-scroll.js)

The scroll-wipe effect calculates image offset based on the **details column scroll position**, not the window scroll position:

```javascript
const scrollStart = detailsTop - viewportHeight;  // When details enters viewport
const scrollEnd = detailsTop + detailsHeight;     // When details exits viewport
let scrollProgress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
```

**Why this approach?**
- Creates a tight link between reading product details and seeing image progression
- Feels intentional, not accidental
- Supports cinematic pacing

### Gallery Interaction (portfolio.js)

Thumbnails update the featured image AND open the carousel:

```javascript
thumbnail.addEventListener('click', () => {
  mainImage.src = thumbnail.dataset.image;  // Update featured
  openCarousel(index);                       // Open carousel
});
```

Simple, no state management. Data attribute (`data-image`) is the single source of truth.

## HTML Templates

### Why Templates, Not Full HTML Files?

These are **templates** meant to be pasted into Webflow embed elements, not standalone HTML files. Webflow handles:
- CMS content injection
- Page structure
- Asset hosting

This repo provides the interactive layer only.

### Image URL Placeholders

Templates use `[REPLACE-WITH-IMAGE-URL]` placeholders to make it clear where Webflow asset URLs go. Copy-paste workflow is straightforward.

## Responsive Design

### Breakpoints

- **Large (no media query)** — 2-column layout, sticky image, full 100vh heights
- **Tablet (max 1200px)** — 1-column, reduced image heights (500px)
- **Mobile (max 768px)** — 1-column, constrained image heights (400px), reduced padding

**Philosophy:** Preserve editorial composition at all sizes. Don't follow mobile-first framework conventions. Large monitors get the best experience (full cinema mode), mobile gets condensed but readable version.

### Responsive Images

Images use `object-fit: cover` for responsive sizing without distortion:
```css
.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;  /* Maintains aspect ratio, fills container */
}
```

This is more resilient than hardcoded aspect ratios or stretched images.

## Performance Considerations

### Transform-Based Animations

Scroll effect uses `transform` (GPU-accelerated):
```javascript
imageContainer.style.transform = `translateY(-${yOffset}%)`;
```

Avoid:
- `top`, `left` changes (trigger layout recalculation)
- `opacity` on large images (unnecessary with `transform`)
- Multiple repaints per scroll event

### will-change Hint

```css
.product-images-container {
  will-change: transform;  /* Tells browser to optimize this property */
}
```

Only on elements that actually transform frequently. Overuse negates benefits.

### Carousel Transitions

Opacity fade between carousel images (not slide transforms):
```css
.carousel-image {
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
}
.carousel-image.active {
  opacity: 1;
}
```

Simpler than transform-based carousel, sufficient for restrained design aesthetic.

## Keyboard Accessibility

Carousel supports keyboard navigation:
```javascript
if (e.key === 'ArrowLeft') prevCarouselImage();
if (e.key === 'ArrowRight') nextCarouselImage();
if (e.key === 'Escape') closeCarousel();
```

No ARIA labels yet (future enhancement).

## Future Improvements

### Image Duplication Reduction

Currently, carousel images are duplicated in HTML:
```html
<!-- In product sections -->
<div class="product-image-section">
  <img src="image-1.jpg" class="product-image">
</div>

<!-- In carousel modal -->
<div class="carousel-modal">
  <img src="image-1.jpg" class="carousel-image">
</div>
```

**Future approach:** Generate carousel images dynamically from product images, reducing markup.

### Dynamic Loading

Could lazy-load carousel images and prefetch next image during navigation for smoother UX.

### Cinematic Pacing Enhancements

Current scroll effect is linear. Future directions:
- Easing functions for natural acceleration
- Image hold points (pause at certain scroll positions)
- Multiple image sequences per product

## Why Vanilla JavaScript?

No frameworks, no build step, no dependencies. This keeps:
- File sizes small
- Debugging straightforward
- Maintenance burden low
- Webflow integration simple

For this use case (product carousels, scroll effects, gallery interactions), vanilla JS is sufficient and more transparent.
