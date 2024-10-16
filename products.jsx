import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredProducts, setFilteredProducts] = useState([]); 

  useEffect(() => {

    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); 
      });
  }, []);

  const handleSearch = () => {
    fetch(`/api/products/search?query=${searchTerm}`) 
      .then((response) => response.json())
      .then((data) => setFilteredProducts(data));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '300px',
        }}
      />
      <button onClick={handleSearch} style={{
          padding: '10px 15px',
          borderRadius: '5px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginLeft: '10px',
          transition: 'background-color 0.3s',
        }} 
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
      >
        Search
      </button>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {filteredProducts.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '20px',
              width: '250px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              transition: 'transform 0.3s',
              cursor: 'pointer',
            }}
          >
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{product.name}</h2>
            <img
              src={product.image}
              alt={product.name}
              style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px' }}
            />
            <p style={{ fontSize: '16px', color: '#555' }}>{product.category}</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
