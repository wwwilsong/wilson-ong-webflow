/* ============================================
   v2 — 2026-05-17
   PRODUCT PAGE - STICKY DETAILS + SCROLL IMAGES
   Right column sticks in place; left images scroll past naturally.
   ============================================ */

(function () {
  function init() {
    // Webflow sets overflow-x:hidden on body, which breaks position:sticky.
    // 'clip' clips identically but does not create a scroll container.
    document.body.style.overflowX = 'clip';
    document.documentElement.style.overflowX = 'clip';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    document.querySelectorAll('.product-image').forEach(function (img, index) {
      img.addEventListener('click', function () {
        if (typeof openCarousel === 'function') openCarousel(index);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
