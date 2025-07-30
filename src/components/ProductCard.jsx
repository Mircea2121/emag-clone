import React from 'react';
import "../data/ProductCard.css";
import { useNavigate } from 'react-router-dom';


function ProductCard({ product, onAddToCart, onAddToWishlist }) {
    const navigate = useNavigate();
    return (
    <div className="product-card" onClick={() => navigate(`/produs/${product.id}`)} style={{ cursor: "pointer"}}>
            <img src={product.image} alt={product.name} />

        <div className="product-title-and-button">
            <h3>{product.name}</h3>
            <p>
                <s>{product.oldPrice} Lei</s>
                <strong> {product.price} Lei</strong>
            </p>
            <p>⭐ {product.rating}</p>
            <div className="card-buttons">
            <button onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>Adaugă în coș</button>
            <button onClick={(e) => { e.stopPropagation(); onAddToWishlist(product); }}>❤️</button>
            </div>
        </div>
    </div>
    );
}

export default ProductCard;