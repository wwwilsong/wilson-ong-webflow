/* ============================================
   CAROUSEL LIGHTBOX MODULE
   Shared carousel logic for product and portfolio
   ============================================ */

let carouselCurrentIndex = 0;

// Opens carousel modal and displays image at startIndex
// Called from product-scroll.js and portfolio.js
function openCarousel(startIndex = 0) {
  const modal = document.querySelector('.carousel-modal, .portfolio-carousel-modal');
  if (!modal) return;

  carouselCurrentIndex = startIndex;
  updateCarousel(startIndex);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scroll while modal open
}

// Closes carousel modal and restores background scroll
function closeCarousel() {
  const modal = document.querySelector('.carousel-modal.active, .portfolio-carousel-modal.active');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Updates carousel to show image at index
// Handles image visibility (active class), counter display, and index tracking
// Uses modulo arithmetic to allow infinite loop navigation (wraps at boundaries)
function updateCarousel(index) {
  const modal = document.querySelector('.carousel-modal.active, .portfolio-carousel-modal.active');
  if (!modal) return;

  const carouselImages = modal.querySelectorAll('.carousel-image');
  if (carouselImages.length === 0) return;

  // Constrain index to valid range: handles negative numbers and values > length
  const constrainedIndex = ((index % carouselImages.length) + carouselImages.length) % carouselImages.length;

  // Update visibility: remove 'active' from all images, add to current
  carouselImages.forEach(el => el.classList.remove('active'));
  carouselImages[constrainedIndex].classList.add('active');

  // Update counter display (1-indexed for humans, 0-indexed for JS)
  const currentCounter = modal.querySelector('.carousel-current');
  if (currentCounter) {
    currentCounter.textContent = constrainedIndex + 1;
  }

  carouselCurrentIndex = constrainedIndex;
}

// Navigate to previous image (wraps to last image when at beginning)
function prevCarouselImage() {
  const modal = document.querySelector('.carousel-modal.active, .portfolio-carousel-modal.active');
  if (!modal) return;

  const carouselImages = modal.querySelectorAll('.carousel-image');
  const totalImages = carouselImages.length;
  if (totalImages === 0) return;

  carouselCurrentIndex = (carouselCurrentIndex - 1 + totalImages) % totalImages;
  updateCarousel(carouselCurrentIndex);
}

// Navigate to next image (wraps to first image when at end)
function nextCarouselImage() {
  const modal = document.querySelector('.carousel-modal.active, .portfolio-carousel-modal.active');
  if (!modal) return;

  const carouselImages = modal.querySelectorAll('.carousel-image');
  const totalImages = carouselImages.length;
  if (totalImages === 0) return;

  carouselCurrentIndex = (carouselCurrentIndex + 1) % totalImages;
  updateCarousel(carouselCurrentIndex);
}

// Initialize carousel controls when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wire up close button handlers (both modal types)
  const closeBtns = document.querySelectorAll('.carousel-modal .carousel-close, .portfolio-carousel-modal .carousel-close');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeCarousel);
  });

  // Wire up prev/next button handlers
  const prevBtns = document.querySelectorAll('.carousel-modal .carousel-prev, .portfolio-carousel-modal .carousel-prev');
  const nextBtns = document.querySelectorAll('.carousel-modal .carousel-next, .portfolio-carousel-modal .carousel-next');

  prevBtns.forEach(btn => {
    btn.addEventListener('click', prevCarouselImage);
  });

  nextBtns.forEach(btn => {
    btn.addEventListener('click', nextCarouselImage);
  });

  // Keyboard navigation: arrow keys and escape
  // Scoped to only work when carousel is active (prevents interference with page navigation)
  document.addEventListener('keydown', function(e) {
    const modal = document.querySelector('.carousel-modal.active, .portfolio-carousel-modal.active');
    if (!modal) return;

    if (e.key === 'ArrowLeft') prevCarouselImage();
    if (e.key === 'ArrowRight') nextCarouselImage();
    if (e.key === 'Escape') closeCarousel();
  });

  // Click outside modal (on background) to close
  // Checks if click target is the modal itself, not content inside it
  const modals = document.querySelectorAll('.carousel-modal, .portfolio-carousel-modal');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeCarousel();
      }
    });
  });

  // Set total image count in carousel counter (e.g., "1 / 5")
  const allCarousels = document.querySelectorAll('.carousel-modal, .portfolio-carousel-modal');
  allCarousels.forEach(carousel => {
    const carouselImages = carousel.querySelectorAll('.carousel-image');
    const totalCounter = carousel.querySelector('.carousel-total');
    if (totalCounter) {
      totalCounter.textContent = carouselImages.length;
    }

    // Initialize first image as visible
    if (carouselImages.length > 0) {
      carouselImages[0].classList.add('active');
    }
  });
});
