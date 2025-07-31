import React from 'react';
import { Link } from 'react-router-dom';

function Header({ cartItems }) {
    return (
        <header className="header">
            <div className="left-section">
                <Link to="/" className="home-link">🏠 Home</Link>
            <h1 className="logo">A Junior Developer's Store  👨‍💻👋🏽</h1>
            </div>
            <div className="cart-info">
            <Link to="/cart" className="cart-link">
                🛒 Cart: {cartItems.length} produse
            </Link>
            </div>
        </header>
    );
}

export default Header;