/* ============================================
   v1
   WILSON ONG - Cart Counter
   Manages item count badge in the header
   ============================================ */

let cartCount = 0;

function updateCartDisplay() {
  const badge = document.getElementById('cartBadge');
  const number = document.getElementById('cartNumber');
  if (!badge || !number) return;

  if (cartCount > 0) {
    number.textContent = cartCount;
    badge.style.display = 'inline';
  } else {
    badge.style.display = 'none';
  }
}

function addToCart(quantity) {
  cartCount += (quantity || 1);
  updateCartDisplay();
}

function removeFromCart(quantity) {
  cartCount = Math.max(0, cartCount - (quantity || 1));
  updateCartDisplay();
}

function clearCart() {
  cartCount = 0;
  updateCartDisplay();
}

/* Expose globally so product page can call addToCart() */
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
