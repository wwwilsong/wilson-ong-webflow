/* ============================================
   v2
   PRODUCT PAGE - STICKY DETAILS + SCROLL IMAGES
   Right column sticks in place; left images scroll past naturally.
   ============================================ */

(function () {
  function init() {
    // Webflow sets overflow-x:hidden on body, which breaks position:sticky.
    // 'clip' clips identically but does not create a scroll container.
    document.body.style.overflowX = 'clip';
    document.documentElement.style.overflowX = 'clip';

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
