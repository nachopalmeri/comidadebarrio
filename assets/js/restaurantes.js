/**
 * COMIDA DE BARRIO - Página de Restaurantes
 * Carga y muestra todos los restaurantes disponibles
 */

// Base de datos de restaurantes
const restaurantsData = [
  {
    id: 'sabores-mi-tierra',
    name: 'Sabores de Mi Tierra',
    rating: 4.5,
    reviews: 200,
    cuisine: 'Argentino',
    price: '$$',
    description: 'Comida tradicional argentina con los mejores sabores de barrio. Especialistas en empanadas, milanesas y platos caseros.',
    image: '../assets/img/restaurante-sabores-mi-tierra.jpg'
  },
  {
    id: 'parrilla-asador',
    name: 'Parrilla El Asador',
    rating: 4.8,
    reviews: 150,
    cuisine: 'Parrilla',
    price: '$$$',
    description: 'Las mejores carnes a la parrilla con tradición familiar. Asado, choripanes y cortes premium.',
    image: '../assets/img/restaurante-parrilla-asador.jpg'
  },
  {
    id: 'pizzeria-nonna',
    name: 'Pizzería La Nonna',
    rating: 4.6,
    reviews: 180,
    cuisine: 'Pizzería',
    price: '$',
    description: 'Pizza al estilo argentino con masa casera y ingredientes frescos. Tradición italiana en cada bocado.',
    image: '../assets/img/restaurante-pizzeria-nonna.jpg'
  },
  {
    id: 'empanadas-don-mario',
    name: 'Empanadas Don Mario',
    rating: 4.7,
    reviews: 120,
    cuisine: 'Argentino',
    price: '$',
    description: 'Las mejores empanadas del barrio. Masa casera y rellenos tradicionales. También ofrecemos locro y humitas.',
    image: '../assets/img/restaurante-sabores-mi-tierra.jpg'
  },
  {
    id: 'milanesas-el-cortijo',
    name: 'Milanesas El Cortijo',
    rating: 4.4,
    reviews: 95,
    cuisine: 'Argentino',
    price: '$$',
    description: 'Especialistas en milanesas napolitanas, a caballo y con papas fritas. Porciones generosas y sabores auténticos.',
    image: '../assets/img/restaurante-parrilla-asador.jpg'
  },
  {
    id: 'parrilla-los-amigos',
    name: 'Parrilla Los Amigos',
    rating: 4.9,
    reviews: 250,
    cuisine: 'Parrilla',
    price: '$$$',
    description: 'Parrilla de barrio con más de 30 años de experiencia. Ambiente familiar y las mejores carnes.',
    image: '../assets/img/restaurante-pizzeria-nonna.jpg'
  }
];

/**
 * Carga y muestra todos los restaurantes
 */
function loadRestaurants() {
  const container = document.getElementById('restaurants-grid');
  if (!container) return;
  
  container.innerHTML = restaurantsData.map(restaurant => {
    return `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm restaurant-card">
          <div class="position-relative">
            <img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}" style="height: 200px; object-fit: cover;">
            <button class="btn btn-sm position-absolute top-0 end-0 m-2 favorite-btn" 
                    onclick="showNotification('${restaurant.name} agregado a favoritos')"
                    aria-label="Agregar a favoritos">
              <i class="bi bi-heart"></i>
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
            <div class="d-grid gap-2">
              <button class="btn btn-outline-primary" onclick='showRestaurantModal(${JSON.stringify(restaurant)})'>
                Ver Detalles
              </button>
              <a href="menu.html?restaurant=${restaurant.id}" class="btn btn-primary">
                Ver Menú
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Cargar restaurantes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  loadRestaurants();
  
  if (typeof updateFavoritesBadge === 'function') {
    updateFavoritesBadge();
  }
  if (typeof updateCartBadge === 'function') {
    updateCartBadge();
  }
});
