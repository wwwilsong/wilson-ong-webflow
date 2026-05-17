/* ============================================
   v2
   PORTFOLIO PAGE — scroll-to + active thumbnail
   ============================================ */

(function () {
  function init() {
    document.body.style.overflowX = 'clip';
    document.documentElement.style.overflowX = 'clip';

    var imageSections = document.querySelectorAll('.portfolio-image-section');
    var thumbnails = document.querySelectorAll('.gallery-thumbnail');

    if (!imageSections.length || !thumbnails.length) return;

    // Thumbnail click: smooth scroll to corresponding image
    thumbnails.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var index = parseInt(thumb.dataset.index, 10);
        if (imageSections[index]) {
          imageSections[index].scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // IntersectionObserver: highlight active thumbnail as images scroll into view
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var index = parseInt(entry.target.dataset.index, 10);
          thumbnails.forEach(function (t) { t.classList.remove('active'); });
          if (thumbnails[index]) thumbnails[index].classList.add('active');
        }
      });
    }, { threshold: 0.5 });

    imageSections.forEach(function (section) {
      observer.observe(section);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
