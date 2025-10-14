// Store all products globally for search functionality
let allProducts = []

// Format price with comma separator
function formatPrice(price) {
  return `£${price.toLocaleString()}`
}

// Create HTML for a single product card
function createProductCard(product) {
  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="image-container">
        <img
          src="${product.image}"
          alt="${product.alt}"
        />
      </div>
      <h2 class="product-name">${product.name}</h2>
      <p class="product-description">
        ${product.description}
      </p>
      <div class="price-container">
        <span class="price">${formatPrice(product.price)}</span>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    </article>
  `
}

// Display products in the container
function displayProducts(products) {
  const container = document.getElementById('productsContainer')
  const loading = document.getElementById('loading')
  const noResults = document.getElementById('noResults')

  loading.style.display = 'none'

  if (products.length === 0) {
    container.innerHTML = ''
    noResults.style.display = 'block'
    return
  }

  noResults.style.display = 'none'
  container.innerHTML = products.map(createProductCard).join('')
}

// Load products from JSON file
async function loadProducts() {
  try {
    const response = await fetch('../data/products.json')

    if (!response.ok) {
      throw new Error('Failed to load products')
    }

    const data = await response.json()
    allProducts = data.products
    displayProducts(allProducts)
  } catch (error) {
    console.error('Error loading products:', error)
    const loading = document.getElementById('loading')
    loading.innerHTML =
      '<p style="color: red;">Error loading products. Please try again later.</p>'
  }
}

// Search products by name or description
function searchProducts() {
  const searchInput = document.getElementById('searchInput')
  const searchTerm = searchInput.value.toLowerCase().trim()

  if (searchTerm === '') {
    displayProducts(allProducts)
    return
  }

  const filteredProducts = allProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    )
  })

  displayProducts(filteredProducts)
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartCount = document.getElementById('cartCount')
  if (cartCount) cartCount.textContent = totalItems
}

// Add to cart functionality
function addToCart(productId) {
  const product = allProducts.find((p) => p.id === productId)

  if (!product) {
    console.error('Product not found')
    return
  }

  console.log('Adding to cart:', product)
  alert(`Added "${product.name}" to cart!`)

  let cart = JSON.parse(localStorage.getItem('cart') || '[]')

  updateCartCount()

  // Check if product already in cart
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  updateCartCount()
  renderMiniCart()
}

// Allow search on Enter key
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput')

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchProducts()
      }
    })

    // Optional: Search as user types (with debounce)
    let searchTimeout
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout)
      searchTimeout = setTimeout(searchProducts, 300)
    })
  }

  // Load products when page loads
  loadProducts()
  const cartWrapper = document.querySelector('.cart-wrapper')
  const cartIcon = document.getElementById('cartIcon')
  const cartDropdown = document.getElementById('cartDropdown')
  const clearCartBtn = document.getElementById('clearCartBtn')
  const checkoutBtn = document.getElementById('checkoutBtn')

  if (cartIcon && cartDropdown) {
    cartIcon.addEventListener('click', (e) => {
      e.stopPropagation()
      const isVisible = cartDropdown.classList.contains('show')
      document
        .querySelectorAll('.cart-dropdown')
        .forEach((el) => el.classList.remove('show'))
      if (!isVisible) {
        renderMiniCart()
        cartDropdown.classList.add('show')
      }
    })

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!cartWrapper.contains(e.target)) {
        cartDropdown.classList.remove('show')
      }
    })
  }
})

function renderMiniCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const cartItems = document.getElementById('cartItems')
  const cartTotal = document.getElementById('cartTotal')

  if (!cartItems || !cartTotal) return

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>'
    cartTotal.textContent = ''
    return
  }

  let total = 0
  let html = ''

  cart.forEach((item, index) => {
    total += item.price * item.quantity
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <strong>${item.name}</strong><br>
          £${item.price.toLocaleString()} × ${item.quantity}
        </div>
        <button onclick="removeFromCart(${index})">✕</button>
      </div>
    `
  })

  cartItems.innerHTML = html
  cartTotal.textContent = `Total: £${total.toLocaleString()}`
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  cart.splice(index, 1)
  localStorage.setItem('cart', JSON.stringify(cart))
  updateCartCount()
  renderMiniCart()
}
