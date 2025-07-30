import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import products from '../data/products.json';
import '../data/ProductDetails.css';

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const foundProduct = products.find((p) => String(p.id) === id);
    console.log("ID din URL:", id);
    console.log("Produs gasit:", foundProduct);
    setProduct(foundProduct);
  }, [id]);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Te rog selectează o mărime!");
      return;
    }

    const productWithSize = {
        ...product, 
        selectedSize: selectedSize || null,
    };

    onAddToCart(productWithSize);
    alert(`Adăugat în coș: ${product.name}${selectedSize ? ` Mărime: ${selectedSize})` : ""}`);
    // aici poți integra cu context sau localStorage dacă vrei persistentă reală
  };

  if (!product) return <p className="loading">Se încarcă...</p>;

  return (
    <div className="product-details-container">
      <div className="product-image-section">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info-section">
        <h2>{product.name}</h2>
        <p className="description">{product.description}</p>
        <p className="price">
          <del>{product.oldPrice} Lei</del> <strong>{product.price} Lei</strong>
        </p>
        <p className="rating">⭐ {product.rating}</p>
      {product.sizes && product.sizes.length > 0 && (
        <div className="size-selector">
          <label htmlFor="size">
            {product.categorie === "Telefoane" ? "Memorie:" : "Mărime:"}
          </label>
          <select id="size" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="">Selectează</option>
            {product.sizes?.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Adaugă în coș
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
