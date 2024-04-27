document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const categorySelect = document.getElementById('category-select');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-input');
  
    // Function to fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        return products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    // Function to render products
    const renderProducts = async () => {
      const products = await fetchProducts();
      const searchTerm = searchInput.value.trim().toLowerCase();
      const selectedCategory = categorySelect.value;
  
      let filteredProducts = products;
  
      // Filter by category
      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
      }
  
      // Filter by search term
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchTerm));
      }
  
      // Sort products by price
      const sortBy = sortSelect.value;
      if (sortBy === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
  
      // Clear existing product list
      productList.innerHTML = '';
  
      // Render products
      filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>$${product.price.toFixed(2)}</p>
        `;
        productList.appendChild(productItem);
      });
    };
  
    // Event listeners for filters
    categorySelect.addEventListener('change', renderProducts);
    sortSelect.addEventListener('change', renderProducts);
    searchInput.addEventListener('input', renderProducts);
  
    // Initial render
    renderProducts();
  });