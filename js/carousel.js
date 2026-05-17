/* ============================================
   v1
   CAROUSEL LIGHTBOX MODULE
   Shared carousel logic for product and portfolio
   ============================================ */

let carouselCurrentIndex = 0;

function openCarousel(startIndex) {
  startIndex = startIndex || 0;
  const modal = document.querySelector('.carousel-modal, .portfolio-carousel-modal');
  if (!modal) return;

  carouselCurrentIndex = startIndex;
  updateCarousel(startIndex);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCarousel() {
  const modal = document.querySelector('.carousel-modal.active, .portfolio-carousel-modal.active');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
  document.body.style.overflowX = 'clip';
}

function updateCarousel(index) {
  const modal = document.querySelector('.carousel-modal.active, .portfolio-carousel-modal.active');
  if (!modal) return;

  const carouselImages = modal.querySelectorAll('.carousel-image');
  if (carouselImages.length === 0) return;

  const constrainedIndex = ((index % carouselImages.length) + carouselImages.length) % carouselImages.length;

  carouselImages.forEach(function (el) { el.classList.remove('active'); });
  carouselImages[constrainedIndex].classList.add('active');

  const currentCounter = modal.querySelector('.carousel-current');
  if (currentCounter) currentCounter.textContent = constrainedIndex + 1;

  carouselCurrentIndex = constrainedIndex;
}

function prevCarouselImage() {
  const modal = document.querySelector('.carousel-modal.active, .portfolio-carousel-modal.active');
  if (!modal) return;

  const total = modal.querySelectorAll('.carousel-image').length;
  if (total === 0) return;

  carouselCurrentIndex = (carouselCurrentIndex - 1 + total) % total;
  updateCarousel(carouselCurrentIndex);
}

function nextCarouselImage() {
  const modal = document.querySelector('.carousel-modal.active, .portfolio-carousel-modal.active');
  if (!modal) return;

  const total = modal.querySelectorAll('.carousel-image').length;
  if (total === 0) return;

  carouselCurrentIndex = (carouselCurrentIndex + 1) % total;
  updateCarousel(carouselCurrentIndex);
}

(function () {
  function init() {
    document.querySelectorAll('.carousel-modal .carousel-close, .portfolio-carousel-modal .carousel-close').forEach(function (btn) {
      btn.addEventListener('click', closeCarousel);
    });

    document.querySelectorAll('.carousel-modal .carousel-prev, .portfolio-carousel-modal .carousel-prev').forEach(function (btn) {
      btn.addEventListener('click', prevCarouselImage);
    });

    document.querySelectorAll('.carousel-modal .carousel-next, .portfolio-carousel-modal .carousel-next').forEach(function (btn) {
      btn.addEventListener('click', nextCarouselImage);
    });

    document.addEventListener('keydown', function (e) {
      const modal = document.querySelector('.carousel-modal.active, .portfolio-carousel-modal.active');
      if (!modal) return;
      if (e.key === 'ArrowLeft') prevCarouselImage();
      if (e.key === 'ArrowRight') nextCarouselImage();
      if (e.key === 'Escape') closeCarousel();
    });

    document.querySelectorAll('.carousel-modal, .portfolio-carousel-modal').forEach(function (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeCarousel();
      });
    });

    document.querySelectorAll('.carousel-modal, .portfolio-carousel-modal').forEach(function (carousel) {
      const images = carousel.querySelectorAll('.carousel-image');
      const totalCounter = carousel.querySelector('.carousel-total');
      if (totalCounter) totalCounter.textContent = images.length;
      if (images.length > 0) images[0].classList.add('active');
    });
  }

  // Webflow footer scripts run after DOMContentLoaded has already fired.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
