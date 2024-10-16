const express = require('express');
const app = express();
const { products } = require('./data');

// Serve the products on the main page
app.get('/', (req, res) => {
  let productHTML = '<h2>Products</h2>';
  
  // Search input form
  productHTML += `
    <form action="/api/products/search" method="get" style="margin-bottom: 20px;">
      <input type="text" name="query" placeholder="Search for a product" style="
        padding: 10px; 
        border-radius: 5px; 
        border: 1px solid #ccc; 
        margin-right: 10px;">
      <button type="submit" style="
        padding: 10px 15px; 
        background-color: #007BFF; 
        color: white; 
        border: none; 
        border-radius: 5px; 
        cursor: pointer; 
        transition: background-color 0.3s;">
        Search
      </button>
    </form>
  `;

  // Generate HTML for each product
  products.forEach((product) => {
    productHTML += `
      <div style="
        border: 1px solid #ccc; 
        border-radius: 10px; 
        padding: 20px; 
        margin-bottom: 20px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
        text-align: center; 
        background-color: #fff;
        max-width: 300px;
        margin: 20px auto;
      ">
        <h2 style="font-size: 22px; margin-bottom: 15px;">${product.name}</h2>
        <a href="/product/${product.id}">
          <button style="
            background-color: #007BFF; 
            color: white; 
            padding: 10px 15px; 
            border: none; 
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;">
            More Info
          </button>
        </a>
      </div>
    `;
  });

  res.send(productHTML);
});


app.get('/api/products/search', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required.' });
  }


  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  let searchResultsHTML = '<h2>Search Results</h2>';
  if (filteredProducts.length > 0) {
    filteredProducts.forEach((product) => {
      searchResultsHTML += `
        <div style="
          border: 1px solid #ccc; 
          border-radius: 10px; 
          padding: 20px; 
          margin-bottom: 20px; 
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
          text-align: center; 
          background-color: #fff;
          max-width: 300px;
          margin: 20px auto;
        ">
          <h2 style="font-size: 22px; margin-bottom: 15px;">${product.name}</h2>
          <a href="/product/${product.id}">
            <button style="
              background-color: #007BFF; 
              color: white; 
              padding: 10px 15px; 
              border: none; 
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s;">
              More Info
            </button>
          </a>
        </div>
      `;
    });
  } else {
    searchResultsHTML += '<p>No products found matching your search.</p>';
  }
  
  res.send(searchResultsHTML);
});


app.get('/product/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    const productDetailHTML = `
      <div style="
        border: 1px solid #ccc; 
        border-radius: 10px; 
        padding: 20px; 
        max-width: 350px; 
        margin: 20px auto; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
        background-color: #fff;
      ">
        <h2 style="font-size: 24px; margin-bottom: 10px;">${product.name}</h2>
        <img src="./${product.image}.jpg" alt="${product.name}" style="width: 200px; border-radius: 10px; margin-bottom: 15px;">
        <p style="font-size: 18px; font-weight: bold;">Price: $${product.price}</p>
        <p style="font-size: 16px; color: #555; margin-bottom: 20px;">${product.desc}</p>
        <a href="/" style="
          padding: 10px 20px;
          background-color: #007BFF;
          color: white;
          border-radius: 5px;
          transition: background-color 0.3s;">
          Back to Products
        </a>
      </div>
    `;
    res.send(productDetailHTML);
  } else {
    res.status(404).send('<h2>Product not found</h2><a href="/">Back to Products</a>');
  }
});


app.listen(5001, () => {
  console.log('Server is listening on port 5001....');
});
