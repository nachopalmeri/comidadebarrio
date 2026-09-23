/**
 * COMIDA DE BARRIO - Menú por restaurante
 * Lee ?restaurant=<id> y arma el encabezado y los platos de ese lugar.
 * Los datos del restaurante vienen de restaurantes.js (restaurantsData).
 */

const DISHES = {
  empanadas: { name: 'Empanadas de Carne', price: 10500, image: '/assets/img/empanadas-carne.jpg', description: 'Pasteles salados rellenos con carne molida sazonada, cebollas y aceitunas.' },
  choripan: { name: 'Choripán', price: 11500, image: '/assets/img/choripan.jpg', description: 'Chorizo a la parrilla servido en un pan crujiente, generalmente acompañado con salsa chimichurri.' },
  milanesa: { name: 'Milanesa Napolitana', price: 13500, image: '/assets/img/milanesa-napolitana.jpg', description: 'Milanesa de carne empanada cubierta con jamón, salsa de tomate y queso mozzarella derretido.' },
  asado: { name: 'Asado', price: 15500, image: '/assets/img/asado.jpg', description: 'Selección de carnes a la parrilla, incluyendo costillas, chorizos y achuras, cocinadas a fuego abierto.' },
  pizza: { name: 'Pizza Argentina', price: 14500, image: '/assets/img/pizza-argentina.jpg', description: 'Pizza tradicional argentina con masa gruesa, mozzarella y tu elección de ingredientes.' },
  locro: { name: 'Locro', price: 9800, image: '/assets/img/cocina-tradicional.jpg', description: 'Guiso criollo de maíz blanco, porotos, zapallo y carne, cocinado a fuego lento.' }
};

// Qué sirve cada lugar: [entradas, platos principales].
const MENUS = {
  'sabores-mi-tierra': [['empanadas', 'choripan'], ['milanesa', 'asado', 'pizza']],
  'parrilla-asador': [['choripan', 'empanadas'], ['asado', 'milanesa']],
  'pizzeria-nonna': [['empanadas'], ['pizza', 'milanesa']],
  'empanadas-don-mario': [['empanadas'], ['locro']],
  'milanesas-el-cortijo': [['empanadas'], ['milanesa']],
  'parrilla-los-amigos': [['choripan'], ['asado']]
};

const formatPrice = (n) => `$${new Intl.NumberFormat('es-AR').format(n)}`;

function dishArticle(dish, category, restaurant) {
  const article = document.createElement('article');
  article.className = 'menu-item';
  article.innerHTML = `
    <div class="row align-items-center">
      <div class="col-md-8 menu-item-content">
        <div class="menu-item-info">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h3 class="h5 mb-0"></h3>
            <button class="btn btn-sm btn-link text-danger p-0" data-action="fav" aria-label="Agregar a favoritos">
              <i class="bi bi-heart"></i>
            </button>
          </div>
          <p class="menu-item-description"></p>
          <div class="d-flex gap-2 align-items-center">
            <span class="h5 mb-0 text-primary me-2"></span>
            <button class="btn btn-outline-primary" data-action="details">Ver Detalles</button>
            <button class="btn btn-primary" data-action="add" aria-label="Agregar al carrito">
              <i class="bi bi-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <img class="menu-item-image" style="cursor: pointer;" loading="lazy">
      </div>
    </div>`;
  article.querySelector('h3').textContent = dish.name;
  article.querySelector('.menu-item-description').textContent = dish.description;
  article.querySelector('.text-primary').textContent = formatPrice(dish.price);
  const img = article.querySelector('img');
  img.src = dish.image;
  img.alt = dish.name;
  const details = () => showFoodModal(dish.name, dish.price, dish.description, dish.image, category, { restaurant: restaurant.name, image: dish.image });
  img.addEventListener('click', details);
  article.querySelector('[data-action="details"]').addEventListener('click', details);
  article.querySelector('[data-action="add"]').addEventListener('click', () => addToCart(dish.name, dish.price, { restaurant: restaurant.name, image: dish.image }));
  article.querySelector('[data-action="fav"]').addEventListener('click', () => showNotification(`${dish.name} agregado a favoritos`));
  return article;
}

function renderMenu() {
  const container = document.getElementById('menu-sections');
  if (!container || typeof restaurantsData === 'undefined') return;
  const id = new URLSearchParams(location.search).get('restaurant');
  const restaurant = restaurantsData.find((r) => r.id === id) || restaurantsData[0];
  const [starters, mains] = MENUS[restaurant.id] || MENUS['sabores-mi-tierra'];

  document.title = `Menú de ${restaurant.name} | Comida de Barrio`;
  document.getElementById('restaurant-name').textContent = restaurant.name;
  document.getElementById('restaurant-rating').textContent = restaurant.rating;
  document.getElementById('restaurant-reviews').textContent = `(${restaurant.reviews}+ reseñas)`;
  document.getElementById('restaurant-kind').textContent = `· ${restaurant.cuisine} · ${restaurant.price}`;

  container.innerHTML = '';
  [['Entradas', starters], ['Platos Principales', mains]].forEach(([title, keys], i) => {
    if (!keys.length) return;
    const section = document.createElement('section');
    section.setAttribute('aria-labelledby', `menu-section-${i}`);
    if (i > 0) section.className = 'mt-5';
    const heading = document.createElement('h3');
    heading.id = `menu-section-${i}`;
    heading.className = 'h4 mb-4';
    heading.textContent = title;
    section.appendChild(heading);
    keys.forEach((k) => section.appendChild(dishArticle(DISHES[k], title, restaurant)));
    container.appendChild(section);
  });
}

document.addEventListener('DOMContentLoaded', renderMenu);
