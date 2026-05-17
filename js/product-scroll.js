/* ============================================
   v1
   PRODUCT PAGE - SCROLL-WIPE EFFECT
   Scroll-triggered image sequencing
   ============================================ */

(function () {
  function init() {
    const imageContainer = document.querySelector('.product-images-container');
    const imageSections = document.querySelectorAll('.product-image-section');
    const detailsColumn = document.querySelector('.product-details-column');
    const totalImages = imageSections.length;

    if (!imageContainer || totalImages === 0 || !detailsColumn) {
      console.warn('Product images container or sections not found');
      return;
    }

    document.body.style.overflowX = 'clip';
    document.documentElement.style.overflowX = 'clip';

    // Give the right column enough height so the page is scrollable — one viewport per image.
    // JS overrides the CSS min-height so it adapts to however many images are on the page.
    detailsColumn.style.minHeight = (totalImages * 100) + 'vh';

    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;

      const rect = detailsColumn.getBoundingClientRect();
      const detailsTop = rect.top + scrollY;
      const detailsHeight = detailsColumn.offsetHeight;

      // scrollStart: column top reaches viewport top (progress=0, show image 1)
      // scrollEnd: column bottom reaches viewport bottom (progress=1, show last image)
      const scrollStart = detailsTop;
      const scrollEnd = detailsTop + detailsHeight - viewportHeight;

      let scrollProgress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));

      const yOffset = scrollProgress * (totalImages - 1) * 100;
      imageContainer.style.transform = `translateY(-${yOffset}%)`;
    }, { passive: true });

    document.querySelectorAll('.product-image').forEach(function (img, index) {
      img.addEventListener('click', function () {
        if (typeof openCarousel === 'function') openCarousel(index);
      });
    });
  }

  // Webflow footer scripts run after DOMContentLoaded has already fired.
  // Check readyState so init() always executes regardless of load timing.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
