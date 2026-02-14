/**
 * COMIDA DE BARRIO - Página de Favoritos
 * Muestra favoritos estáticos
 */

// Datos estáticos de restaurantes favoritos
const favoriteRestaurantsData = [
  {
    id: 'sabores-mi-tierra',
    name: 'Sabores de Mi Tierra',
    rating: 4.5,
    reviews: 200,
    cuisine: 'Argentino',
    price: '$$',
    description: 'Comida tradicional argentina con los mejores sabores de barrio.',
    image: '../assets/img/restaurante-sabores-mi-tierra.jpg'
  },
  {
    id: 'parrilla-asador',
    name: 'Parrilla El Asador',
    rating: 4.8,
    reviews: 150,
    cuisine: 'Parrilla',
    price: '$$$',
    description: 'Las mejores carnes a la parrilla con tradición familiar.',
    image: '../assets/img/restaurante-parrilla-asador.jpg'
  }
];

// Datos estáticos de comidas favoritas
const favoriteItemsData = [
  {
    id: 'empanadas-carne',
    name: 'Empanadas de Carne',
    price: 10500,
    description: 'Pasteles salados rellenos con carne molida sazonada, cebollas y aceitunas.',
    image: '../assets/img/empanadas-carne.jpg',
    category: 'Entradas'
  },
  {
    id: 'asado',
    name: 'Asado',
    price: 15500,
    description: 'Selección de carnes a la parrilla, incluyendo costillas, chorizos y achuras.',
    image: '../assets/img/asado.jpg',
    category: 'Platos Principales'
  }
];

/**
 * Carga y muestra los restaurantes favoritos estáticos
 */
function loadFavoriteRestaurants() {
  const container = document.getElementById('favorite-restaurants');
  const noRestaurants = document.getElementById('no-restaurants');
  
  if (!container) return;
  
  if (favoriteRestaurantsData.length === 0) {
    container.innerHTML = '';
    if (noRestaurants) noRestaurants.classList.remove('d-none');
    return;
  }
  
  if (noRestaurants) noRestaurants.classList.add('d-none');
  
  container.innerHTML = favoriteRestaurantsData.map(restaurant => {
    return `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm restaurant-card">
          <div class="position-relative">
            <img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}" style="height: 200px; object-fit: cover;">
            <button class="btn btn-sm position-absolute top-0 end-0 m-2 favorite-btn active" 
                    onclick="showNotification('${restaurant.name} eliminado de favoritos')"
                    aria-label="Quitar de favoritos">
              <i class="bi bi-heart-fill"></i>
            </button>
          </div>
          <div class="card-body">
            <h3 class="card-title h5">${restaurant.name}</h3>
            <p class="card-text">
              <span class="badge bg-warning text-dark">${restaurant.rating}</span>
              <span class="text-muted">(${restaurant.reviews}+ reseñas)</span>
              <span class="text-muted">· ${restaurant.cuisine} · ${restaurant.price}</span>
            </p>
            <p class="card-text">${restaurant.description}</p>
            <a href="menu.html?restaurant=${restaurant.id}" class="btn btn-outline-primary">Ver Menú</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Carga y muestra los items favoritos estáticos
 */
function loadFavoriteItems() {
  const container = document.getElementById('favorite-items');
  const noItems = document.getElementById('no-items');
  
  if (!container) return;
  
  if (favoriteItemsData.length === 0) {
    container.innerHTML = '';
    if (noItems) noItems.classList.remove('d-none');
    return;
  }
  
  if (noItems) noItems.classList.add('d-none');
  
  container.innerHTML = favoriteItemsData.map(item => {
    return `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="position-relative">
            <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
            <button class="btn btn-sm position-absolute top-0 end-0 m-2 favorite-item-btn active" 
                    onclick="showNotification('${item.name} eliminado de favoritos')"
                    aria-label="Quitar de favoritos">
              <i class="bi bi-heart-fill"></i>
            </button>
          </div>
          <div class="card-body">
            <h3 class="card-title h5">${item.name}</h3>
            <p class="text-muted mb-2"><span class="badge bg-secondary">${item.category}</span></p>
            <p class="card-text">${item.description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="h5 mb-0 text-primary">$${new Intl.NumberFormat('es-AR').format(item.price)}</span>
              <button class="btn btn-sm btn-primary" onclick="addToCart('${item.name}', ${item.price})">Agregar al Carrito</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Cargar favoritos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  loadFavoriteRestaurants();
  loadFavoriteItems();
  
  if (typeof updateFavoritesBadge === 'function') {
    updateFavoritesBadge();
  }
  if (typeof updateCartBadge === 'function') {
    updateCartBadge();
  }
});
