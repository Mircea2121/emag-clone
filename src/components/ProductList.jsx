import React from 'react';
import ProductCard from './ProductCard';
import "../data/ProductList.css";


function ProductList({ products, onAddToCart, onAddToWishlist, setSelectedCategory }) {
    const filteredProducts = setSelectedCategory === "All"
      ? products
      : products.filter(p => p.categorie === setSelectedCategory)
    return (
        <div className="page-layout">

   <aside className="sidebar">
        <h3>Categories</h3>
        <ul>
          {["All", "Clothing", "Footwear", "Household", "Appliances", "Phones", "Stationery", "Sports"].map((cat) => (
            <li key={cat}>
              <button onClick={() => setSelectedCategory(cat)}>{cat}</button>
            </li>
          ))}
        </ul>
    </aside>

    <section className="product-list">
      {products.length === 0 ? (
       <p style={{ padding: "1rem" }}>No products found.</p>
     ) : (
        products.map((product) => (
          <ProductCard
           key={product.id}
           product={product}
           onAddToCart={onAddToCart}
           onAddToWishlist={onAddToWishlist}
           setSelectedCategory={setSelectedCategory}
      />
    ))
  )}
    </section>
        </div>
    );
}

export default ProductList;