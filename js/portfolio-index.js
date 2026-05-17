/* ============================================
   v2 — 2026-05-17
   PORTFOLIO INDEX — hover preview, arrow nav, filter
   ============================================ */

(function () {
  function init() {
    document.body.style.overflowX = 'clip';
    document.documentElement.style.overflowX = 'clip';

    var cards = Array.from(document.querySelectorAll('.pi-card'));
    var heroImage = document.querySelector('.pi-hero-image');
    var heroLink = document.querySelector('.pi-hero-link');
    var piNumberLink = document.querySelector('.pi-number-link');
    var piTitle = document.querySelector('.pi-title');
    var piYear = document.querySelector('.pi-year');
    var filterSelect = document.querySelector('.pi-filter');
    var prevBtn = document.querySelector('.pi-prev');
    var nextBtn = document.querySelector('.pi-next');

    if (!cards.length || !heroImage) return;

    var currentIndex = 0;

    function activateCard(card) {
      currentIndex = cards.indexOf(card);
      cards.forEach(function (c) { c.classList.remove('active'); });
      card.classList.add('active');
      heroImage.src = card.dataset.image;
      heroLink.href = card.dataset.href;
      piNumberLink.textContent = card.dataset.number;
      piNumberLink.href = card.dataset.href;
      piTitle.textContent = card.dataset.title;
      piYear.textContent = card.dataset.year;
    }

    function visibleCards() {
      return cards.filter(function (c) {
        return !c.classList.contains('filtered-out');
      });
    }

    // Default: activate first card
    activateCard(cards[0]);

    // Hover on card
    cards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        activateCard(card);
      });
      card.addEventListener('click', function () {
        window.location.href = card.dataset.href;
      });
    });

    // Prev arrow
    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var visible = visibleCards();
        if (!visible.length) return;
        var pos = visible.indexOf(cards[currentIndex]);
        if (pos === -1) pos = 0;
        var prevCard = visible[(pos - 1 + visible.length) % visible.length];
        activateCard(prevCard);
      });
    }

    // Next arrow
    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var visible = visibleCards();
        if (!visible.length) return;
        var pos = visible.indexOf(cards[currentIndex]);
        if (pos === -1) pos = 0;
        var nextCard = visible[(pos + 1) % visible.length];
        activateCard(nextCard);
      });
    }

    // Filter
    if (filterSelect) {
      filterSelect.addEventListener('change', function () {
        var val = filterSelect.value;
        cards.forEach(function (card) {
          if (val === 'all' || card.dataset.category === val) {
            card.classList.remove('filtered-out');
          } else {
            card.classList.add('filtered-out');
          }
        });
        // If current card was filtered out, jump to first visible
        if (cards[currentIndex].classList.contains('filtered-out')) {
          var visible = visibleCards();
          if (visible.length) activateCard(visible[0]);
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
