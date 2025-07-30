import React from "react";
import "../data/Wishlist.css";
function Wishlist({ wishlistItems }) {
    return (
        <div className="wishlist">
            <h2>Lista ta de dorințe</h2>
            {wishlistItems.length === 0 ? (
                <p>Nu ai produse în Wishlist.</p>
            ) : (
                <ul>
                    {wishlistItems.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.price} Lei
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Wishlist;