import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../data/Header.css"

function Header({ cartItems, wishlistItems, setSearchTerm }) {
    const [inputValue, setInputValue] = useState("");

    const handleSearch = () => {
        setSearchTerm(inputValue);
        setInputValue("");
    };

    return (
        <header className="header">
            <div className="left-section">
                <Link to="/" className="home-link" onClick={() => setSearchTerm("")}>
                🏠 Home
                </Link>
                 <h1 className="logo">A Junior Developer's Store  👨‍💻👋🏽</h1>
            </div>
             
             <div className="header-center">
                <input
                  type="text"
                  clasName="search-input"
                  placeholder="Search for a product..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                />
                <button className="search-button" onClick={handleSearch}>
                    🔍 Search
                </button>
             </div>
         
            <div className="cart-info">
                <Link to="/cart" className="cart-link">
                   🛒 Cart: {cartItems.length} products
                </Link>
                <Link to="/wishlist" className="cart-link">
                   ❤️ Favorites: {wishlistItems ? wishlistItems.length : 0}
                </Link>
            </div>
        </header>
    );
}

export default Header;