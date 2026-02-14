/**
 * COMIDA DE BARRIO - JavaScript Principal
 * Solo funcionalidades básicas: modales y validación
 */

// Datos estáticos del carrito (solo para mostrar)
const cartItems = [
  { name: 'Empanadas de Carne', quantity: 2, price: 10500 },
  { name: 'Milanesa Napolitana', quantity: 1, price: 13500 }
];

// Datos estáticos de favoritos (solo para mostrar)
const favoriteRestaurants = [
  { id: 'sabores-mi-tierra', name: 'Sabores de Mi Tierra' },
  { id: 'parrilla-asador', name: 'Parrilla El Asador' }
];

const favoriteItems = [
  { id: 'empanadas-carne', name: 'Empanadas de Carne' },
  { id: 'asado', name: 'Asado' }
];

/**
 * Actualiza el badge del carrito en la navbar
 */
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

/**
 * Actualiza el badge de favoritos en la navbar
 */
function updateFavoritesBadge() {
  const badge = document.getElementById('favorites-badge');
  if (badge) {
    const totalFavorites = favoriteRestaurants.length + favoriteItems.length;
    badge.textContent = totalFavorites;
    badge.style.display = totalFavorites > 0 ? 'block' : 'none';
  }
}

/**
 * Muestra una notificación temporal
 */
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
  notification.style.zIndex = '9999';
  notification.style.minWidth = '300px';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

/**
 * Agrega un item al carrito (solo muestra notificación)
 */
function addToCart(name, price) {
  showNotification(`${name} agregado al carrito`);
  updateCartBadge();
}

/**
 * MODAL DE COMIDA
 */
function showFoodModal(name, price, description, image, category) {
  const modal = document.getElementById('foodModal');
  if (!modal) return;
  
  document.getElementById('foodModalName').textContent = name;
  const formattedPrice = new Intl.NumberFormat('es-AR').format(price);
  document.getElementById('foodModalPrice').textContent = `$${formattedPrice}`;
  document.getElementById('foodModalDescription').textContent = description;
  document.getElementById('foodModalImage').src = image;
  document.getElementById('foodModalImage').alt = name;
  document.getElementById('foodModalCategory').textContent = category;
  
  const addToCartBtn = document.getElementById('foodModalAddToCartBtn');
  addToCartBtn.onclick = () => {
    addToCart(name, price);
    const bsModal = bootstrap.Modal.getInstance(modal);
    if (bsModal) bsModal.hide();
  };
  
  const favoriteBtn = document.getElementById('foodModalFavoriteBtn');
  if (favoriteBtn) {
    favoriteBtn.onclick = () => {
      showNotification(`${name} agregado a favoritos`);
    };
  }
  
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
}

/**
 * MODAL DE RESTAURANTE
 */
function showRestaurantModal(restaurant) {
  const modal = document.getElementById('restaurantModal');
  if (!modal) return;
  
  document.getElementById('restaurantModalName').textContent = restaurant.name;
  document.getElementById('restaurantModalRating').textContent = restaurant.rating;
  document.getElementById('restaurantModalReviews').textContent = `(${restaurant.reviews}+ reseñas)`;
  document.getElementById('restaurantModalCuisine').textContent = restaurant.cuisine;
  document.getElementById('restaurantModalPrice').textContent = restaurant.price;
  document.getElementById('restaurantModalDescription').textContent = restaurant.description;
  document.getElementById('restaurantModalImage').src = restaurant.image;
  document.getElementById('restaurantModalImage').alt = restaurant.name;
  
  const viewMenuBtn = document.getElementById('restaurantModalViewMenuBtn');
  viewMenuBtn.onclick = () => {
    window.location.href = `menu.html?restaurant=${restaurant.id}`;
  };
  
  const favoriteBtn = document.getElementById('restaurantModalFavoriteBtn');
  const favoriteText = document.getElementById('restaurantModalFavoriteText');
  const icon = favoriteBtn.querySelector('i');
  
  const isFavorite = favoriteRestaurants.some(r => r.id === restaurant.id);
  
  if (isFavorite) {
    icon.classList.remove('bi-heart');
    icon.classList.add('bi-heart-fill');
    favoriteBtn.classList.add('active');
    if (favoriteText) favoriteText.textContent = 'Quitar de Favoritos';
  } else {
    icon.classList.remove('bi-heart-fill');
    icon.classList.add('bi-heart');
    favoriteBtn.classList.remove('active');
    if (favoriteText) favoriteText.textContent = 'Agregar a Favoritos';
  }
  
  favoriteBtn.onclick = () => {
    if (isFavorite) {
      showNotification(`${restaurant.name} eliminado de favoritos`);
    } else {
      showNotification(`${restaurant.name} agregado a favoritos`);
    }
  };
  
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
}

/**
 * Procede al checkout
 */
function proceedToCheckout() {
  if (cartItems.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  alert('Redirigiendo al checkout...');
}

/**
 * Inicialización básica
 */
document.addEventListener('DOMContentLoaded', function() {
  updateCartBadge();
  updateFavoritesBadge();
});

// Exportar funciones para uso global
window.addToCart = addToCart;
window.proceedToCheckout = proceedToCheckout;
window.showFoodModal = showFoodModal;
window.showRestaurantModal = showRestaurantModal;
window.showNotification = showNotification;
