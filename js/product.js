/* ============================================
   PRODUCT PAGE - SCROLL-WIPE EFFECT (PUBLISHED FIX)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const imageContainer = document.querySelector('.product-images-container');
  const imageSections = document.querySelectorAll('.product-image-section');
  const detailsColumn = document.querySelector('.product-details-column');
  const totalImages = imageSections.length;

  if (!imageContainer || totalImages === 0) {
    console.warn('Image container or sections not found');
    return;
  }

  // Scroll listener for wipe effect
  window.addEventListener('scroll', function() {
    if (!detailsColumn) return;

    // Get the details column's position in the viewport
    const detailsRect = detailsColumn.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate how far down the details column is visible in viewport
    // When details column enters viewport (top = viewportHeight), start at image 0
    // When details column exits viewport (top = 0), show last image
    
    const detailsScrollStart = detailsRect.top;
    const detailsHeight = detailsRect.height;
    
    // Progress: 0 when details just enters viewport, 1 when it exits
    let scrollProgress = (viewportHeight - detailsScrollStart) / (viewportHeight + detailsHeight);
    scrollProgress = Math.max(0, Math.min(1, scrollProgress));

    // Convert progress to image index (0 to totalImages-1)
    const imageIndex = scrollProgress * (totalImages - 1);
    
    // Calculate Y offset as percentage
    const yOffset = imageIndex * 100;
    
    imageContainer.style.transform = `translateY(-${yOffset}%)`;
  }, false);

  // Click image to open carousel
  document.querySelectorAll('.product-image').forEach((img, index) => {
    img.addEventListener('click', function() {
      openCarousel(index);
    });
  });
});

/* ============================================
   CAROUSEL LIGHTBOX MODAL
   ============================================ */

let carouselCurrentIndex = 0;

function openCarousel(startIndex = 0) {
  const modal = document.querySelector('.carousel-modal');
  if (!modal) return;

  carouselCurrentIndex = startIndex;
  updateCarousel(startIndex);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCarousel() {
  const modal = document.querySelector('.carousel-modal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function updateCarousel(index) {
  const carouselImages = document.querySelectorAll('.carousel-modal .carousel-image');
  if (carouselImages.length === 0) return;

  const constrainedIndex = ((index % carouselImages.length) + carouselImages.length) % carouselImages.length;

  carouselImages.forEach(el => el.classList.remove('active'));
  carouselImages[constrainedIndex].classList.add('active');

  const currentCounter = document.querySelector('.carousel-modal .carousel-current');
  if (currentCounter) {
    currentCounter.textContent = constrainedIndex + 1;
  }

  carouselCurrentIndex = constrainedIndex;
}

function prevCarouselImage() {
  const carouselImages = document.querySelectorAll('.carousel-modal .carousel-image');
  const totalImages = carouselImages.length;
  if (totalImages === 0) return;

  carouselCurrentIndex = (carouselCurrentIndex - 1 + totalImages) % totalImages;
  updateCarousel(carouselCurrentIndex);
}

function nextCarouselImage() {
  const carouselImages = document.querySelectorAll('.carousel-modal .carousel-image');
  const totalImages = carouselImages.length;
  if (totalImages === 0) return;

  carouselCurrentIndex = (carouselCurrentIndex + 1) % totalImages;
  updateCarousel(carouselCurrentIndex);
}

// Carousel event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Close button
  const closeBtn = document.querySelector('.carousel-modal .carousel-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCarousel);
  }

  // Prev/Next buttons
  const prevBtn = document.querySelector('.carousel-modal .carousel-prev');
  const nextBtn = document.querySelector('.carousel-modal .carousel-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', prevCarouselImage);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextCarouselImage);
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    const modal = document.querySelector('.carousel-modal');
    if (!modal || !modal.classList.contains('active')) return;

    if (e.key === 'ArrowLeft') prevCarouselImage();
    if (e.key === 'ArrowRight') nextCarouselImage();
    if (e.key === 'Escape') closeCarousel();
  });

  // Click outside modal to close
  const modal = document.querySelector('.carousel-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeCarousel();
      }
    });
  }

  // Set total carousel images count and initialize
  const carouselImages = document.querySelectorAll('.carousel-modal .carousel-image');
  const totalCounter = document.querySelector('.carousel-modal .carousel-total');
  if (totalCounter) {
    totalCounter.textContent = carouselImages.length;
  }

  if (carouselImages.length > 0) {
    carouselImages[0].classList.add('active');
  }
});
