import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist';
import ThankYou from './components/ThankYou';
import ProductDetails from './components/ProductDetails';
import productsData from './data/products.json';
import './index.css';


function App() {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const handleAddToWishList = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleRemoveFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const [products] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.categorie === selectedCategory);

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

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <>
      <Header cartItems={cart} wishlistItems={wishlist} />
      <Routes>
        <Route 
          path="/" 
          element={
            <ProductList 
              products={filteredProducts} 
              onAddToCart={handleAddToCart} 
              onAddToWishlist={handleAddToWishList}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          } 
        />
        <Route 
          path="/produs/:id" 
          element={<ProductDetails onAddToCart={(productWithSize) => setCart([...cart, productWithSize])} />} 
        />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cartItems={cart} 
              clearCart={clearCart} 
              removeItem={removeItem} 
            />
          } 
        />
        <Route 
          path="/checkout" 
          element={<Checkout cart={cart} setCart={setCart} />} 
        />
        <Route 
          path="/wishlist" 
          element={
            <Wishlist 
              wishlistItems={wishlist} 
              onRemoveFromWishlist={handleRemoveFromWishlist} 
            />
          } 
        />
        <Route
           path="/product/:id"
           element={<ProductDetails />} 
             />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </>
  );
}

export default App;
