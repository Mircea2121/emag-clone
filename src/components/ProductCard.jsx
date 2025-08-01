import React from 'react';
import "../data/ProductCard.css";
import { useNavigate } from 'react-router-dom';


function ProductCard({ product, handleAddToCart, onAddToWishlist }) {
    const navigate = useNavigate();
    return (
    <div className="product-card" onClick={() => navigate(`/produs/${product.id}`)} style={{ cursor: "pointer"}}>
            <img src={product.image} alt={product.name} />

        <div className="product-title-and-button">
            <h3>{product.name}</h3>
            <p>
                <s>{product.oldPrice} €</s>
                <strong> {product.price} €</strong>
            </p>
            <p>⭐ {product.rating}</p>
            <div className="card-buttons">
            <button onClick={(e) => { e.stopPropagation(); navigate(`/produs/${product.id}`) }}>Add to cart</button>
            <button onClick={(e) => { e.stopPropagation(); onAddToWishlist(product); }}>❤️</button>
            </div>
        </div>
    </div>
    );
}

export default ProductCard;