/* ============================================
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

    // Webflow sets overflow-x:hidden on body, which breaks position:sticky in Chrome/Safari.
    // Switching to 'clip' clips content identically but does not create a scroll container,
    // so sticky works correctly again.
    document.body.style.overflowX = 'clip';
    document.documentElement.style.overflowX = 'clip';

    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;

      // getBoundingClientRect gives viewport-relative position; adding scrollY converts to page-absolute.
      const rect = detailsColumn.getBoundingClientRect();
      const detailsTop = rect.top + scrollY;
      const detailsHeight = detailsColumn.offsetHeight;

      const scrollStart = detailsTop - viewportHeight;
      const scrollEnd = detailsTop + detailsHeight;

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
