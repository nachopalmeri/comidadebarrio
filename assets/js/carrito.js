/**
 * COMIDA DE BARRIO - Carrito
 * Muestra lo que el usuario agregó (localStorage), permite cambiar
 * cantidades o quitar platos y recalcula el total.
 */

const SHIPPING = 2500;
const cartMoney = (n) => `$${new Intl.NumberFormat('es-AR').format(n)}`;

function renderCart() {
  const list = document.getElementById('order-items');
  if (!list) return;
  const cart = getCart();
  list.innerHTML = '';

  if (cart.length === 0) {
    list.innerHTML = `
      <div class="text-center text-muted py-5">
        <i class="bi bi-cart3 fs-1 d-block mb-3"></i>
        <p class="mb-3">Tu carrito está vacío.</p>
        <a href="/secciones/restaurantes.html" class="btn btn-primary">Ver restaurantes</a>
      </div>`;
  }

  cart.forEach((item, index) => {
    const article = document.createElement('article');
    article.className = 'order-item';
    article.innerHTML = `
      <img class="order-item-image">
      <div class="order-item-info">
        <div class="order-item-name"></div>
        <div class="order-item-restaurant text-muted small"></div>
        <div class="d-flex align-items-center gap-2 mt-1">
          <button class="btn btn-sm btn-outline-secondary" data-step="-1" aria-label="Quitar uno">−</button>
          <span class="order-item-quantity"></span>
          <button class="btn btn-sm btn-outline-secondary" data-step="1" aria-label="Agregar uno">+</button>
          <button class="btn btn-sm btn-link text-danger" data-remove aria-label="Quitar del carrito"><i class="bi bi-trash"></i></button>
        </div>
      </div>
      <div class="order-item-price"></div>`;
    const img = article.querySelector('img');
    img.src = item.image || '/assets/img/cocina-tradicional.jpg';
    img.alt = item.name;
    article.querySelector('.order-item-name').textContent = item.name;
    article.querySelector('.order-item-restaurant').textContent = item.restaurant || '';
    article.querySelector('.order-item-quantity').textContent = `${item.quantity} ${item.quantity === 1 ? 'item' : 'items'}`;
    article.querySelector('.order-item-price').textContent = cartMoney(item.price * item.quantity);
    article.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => {
      const next = getCart();
      next[index].quantity += Number(b.dataset.step);
      if (next[index].quantity <= 0) next.splice(index, 1);
      saveCart(next);
      renderCart();
    }));
    article.querySelector('[data-remove]').addEventListener('click', () => {
      const next = getCart();
      next.splice(index, 1);
      saveCart(next);
      renderCart();
    });
    list.appendChild(article);
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cart.length ? SHIPPING : 0;
  document.getElementById('cart-subtotal').textContent = cartMoney(subtotal);
  document.getElementById('cart-shipping').textContent = cartMoney(shipping);
  document.getElementById('cart-total').textContent = cartMoney(subtotal + shipping);
  const checkout = document.querySelector('.checkout-btn');
  if (checkout) checkout.disabled = cart.length === 0;
  updateCartBadge();
}

document.addEventListener('DOMContentLoaded', renderCart);
