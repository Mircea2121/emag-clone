import React from "react";
import "../data/Wishlist.css";
import { Link } from "react-router-dom";

function Wishlist({ wishlistItems, onRemoveFromWishlist }) {
  return (
    <>
      <div className="back-button-container">
        <Link to="/" className="back-button">⬅️ Back to products</Link>
      </div>

      <div className="wishlist-container">
        <h2>Your wishlist</h2>

        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.title} className="wishlist-item-image" />
              </Link>

              <div className="wishlist-details">
                <Link to={`/product/${item.id}`} className="product-link">
                  <p><strong>{item.name}</strong></p>
                </Link>
                <p>{item.price} €</p>
              </div>

              <button
                onClick={() => onRemoveFromWishlist(item.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Wishlist;
