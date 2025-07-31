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
           ⬅️ Înapoi la produse
        </button>
        <div className="cart-page">
            <h2>Coșul tău</h2>
            {cartItems.length === 0 ? (
                <p>Coșul este gol😢</p>
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
                            <p>{item.name} x {item.quantity || 1} - {item.price} Lei</p>
                            {item.selectedSize && (
                              <p><strong>{item.sizeLabel || "Mărime"}:</strong> {item.selectedSize}</p>
                            )}
                            </div>
                            <button
                            className="remove-button"
                             onClick={() => removeItem(index)}>Șterge</button>
                        </div>
                    ))}
                </ul>
                <h3>Total: {total.toFixed(2)} Lei</h3>
                <button className="clear-cart-button" onClick={clearCart}>
                    Golește coșul
                </button>
                <button className="checkout-button" onClick={handleCheckout}>
                    Finalizează comanda
                </button>
            </>
            )}
        </div>
    </>
    );
}

export default Cart;