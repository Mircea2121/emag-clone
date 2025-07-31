import React, { useEffect, useState } from "react";
import "../data/Cart.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Cart({ cartItems, clearCart, removeItem }) {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
    <>
        <button className="back-button" onClick={() => navigate('/')}>
           ⬅️ Back to products
        </button>
        <div className="cart-page">
            <h2>Your cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty😢</p>
            ) : (
            <>    
                <ul>
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="cart-item-image"
                            />
                            <div className="cart-item-details">
                            <p>{item.name} x {item.quantity || 1} - {item.price} €</p>
                            {item.selectedSize && (
                              <p><strong>{item.sizeLabel || "Size"}:</strong> {item.selectedSize}</p>
                            )}
                            </div>
                            <button
                            className="remove-button"
                             onClick={() => removeItem(index)}>Delete</button>
                        </div>
                    ))}
                </ul>
                <h3>Total: {total.toFixed(2)} €</h3>
                <button className="clear-cart-button" onClick={clearCart}>
                    Clear cart
                </button>
                <button className="checkout-button" onClick={handleCheckout}>
                    Place order
                </button>
            </>
            )}
        </div>
    </>
    );
}

export default Cart;