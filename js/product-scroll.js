/* ============================================
   PRODUCT PAGE - SCROLL-WIPE EFFECT
   Scroll-triggered image sequencing
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const imageContainer = document.querySelector('.product-images-container');
  const imageSections = document.querySelectorAll('.product-image-section');
  const detailsColumn = document.querySelector('.product-details-column');
  const totalImages = imageSections.length;

  if (!imageContainer || totalImages === 0) {
    console.warn('Product images container or sections not found');
    return;
  }

  // Scroll listener calculates image index based on details column scroll position
  // This creates a tight link: as you read the description, images progress
  // Uses page-relative calculations (not viewport-relative) for cinematic effect
  window.addEventListener('scroll', function() {
    if (!detailsColumn) return;

    const detailsTop = detailsColumn.offsetTop;          // Where details column starts in page
    const detailsHeight = detailsColumn.offsetHeight;    // How tall the details column is
    const viewportHeight = window.innerHeight;            // Visible window height
    const scrollY = window.scrollY || window.pageYOffset; // Current scroll position

    // Define the scroll range where image progression occurs:
    // Start: when details column enters viewport (top of details - viewport height)
    // End: when details column completely exits viewport (bottom of details)
    const scrollStart = detailsTop - viewportHeight;
    const scrollEnd = detailsTop + detailsHeight;

    // Calculate progress as 0 to 1 within the scroll range
    // Clamped so it doesn't go below 0 or above 1
    let scrollProgress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
    scrollProgress = Math.max(0, Math.min(1, scrollProgress));

    // Convert progress (0-1) to image index (0 to totalImages-1)
    // Linear interpolation: at progress 0, show image 0; at progress 1, show last image
    const imageIndex = scrollProgress * (totalImages - 1);

    // Calculate Y offset as percentage to move container
    // Each 100% shift reveals the next image in the vertical stack
    const yOffset = imageIndex * 100;

    // Use transform for GPU acceleration (60fps, smooth performance)
    imageContainer.style.transform = `translateY(-${yOffset}%)`;
  }, false);

  // Click image to open carousel lightbox at that image index
  // Uses array position to determine which carousel image to show
  document.querySelectorAll('.product-image').forEach((img, index) => {
    img.addEventListener('click', function() {
      openCarousel(index); // Defined in carousel.js
    });
  });
});
