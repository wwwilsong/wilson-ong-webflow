/* ============================================
   PORTFOLIO PAGE - GALLERY INTERACTIONS
   Gallery thumbnail selection and carousel
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const mainImage = document.getElementById('mainPortfolioImage');
  const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');

  if (!mainImage || galleryThumbnails.length === 0) {
    console.warn('Portfolio main image or gallery thumbnails not found');
    return;
  }

  // Thumbnail click handler: updates featured image and opens carousel
  // The data-image attribute stores the full-size image URL
  galleryThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      const imageUrl = thumbnail.dataset.image;

      // Update featured image on left column
      if (imageUrl) {
        mainImage.src = imageUrl;
      }

      // Open carousel at clicked index (shows matching image in lightbox)
      // This allows browsing at thumbnail size, then full-size in carousel
      openCarousel(index); // Defined in carousel.js
    });
  });

  // Initialize featured image from first thumbnail if not already set
  // Ensures featured image shows something on page load
  const firstThumbnail = galleryThumbnails[0];
  if (firstThumbnail && mainImage.src === '') {
    const initialImage = firstThumbnail.dataset.image;
    if (initialImage) {
      mainImage.src = initialImage;
    }
  }
});
