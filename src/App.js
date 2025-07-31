import React, { use, useState } from 'react';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import productsData from './data/products.json';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist';
import './index.css';
import ThankYou from './components/ThankYou';
import ProductDetails from './components/ProductDetails';


function App() {
  const [wishlist, setWishlist] = useState([]);
  const [products] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.categorie === selectedCategory);
  
    console.log(filteredProducts);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  };

  const removeItem = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  function handleAddToCart(product) {
    setCart([...cart, product]);
  }
  
  function handleAddToWishList(product) {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  }

  return (
    <>
      <Header cartItems={cart} />
      <Routes>
        <Route path="/" element={<ProductList products={filteredProducts} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishList} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />} />
        <Route path="/produs/:id" element={<ProductDetails onAddToCart={(productWithSize) => setCart([...cart, productWithSize])}/>} />
        <Route path="/cart" element={<Cart cartItems={cart} clearCart={clearCart} removeItem={removeItem} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path="/wishlist" element={<Wishlist wishlistItems={wishlist} />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </>
  );
}

export default App;