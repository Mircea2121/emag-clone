import React from "react";
import "../data/Wishlist.css";
function Wishlist({ wishlistItems }) {
    return (
        <div className="wishlist">
            <h2>Your wishlist</h2>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <ul>
                    {wishlistItems.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.price} €
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Wishlist;