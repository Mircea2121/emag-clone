import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import products from '../data/products.json';
import '../data/ProductDetails.css';
import { useNavigate } from 'react-router-dom';

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = products.find((p) => String(p.id) === id);
    console.log("ID din URL:", id);
    console.log("Produs gasit:", foundProduct);
    setProduct(foundProduct);
  }, [id]);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size!");
      return;
    }

    const productWithSize = {
        ...product, 
        selectedSize: selectedSize || null,
        sizeLabel: product.categorie === "Phones" ? "Memory" : "Size",
    };

    onAddToCart(productWithSize);
    alert(`Added to cart: ${product.name}${selectedSize ? ` Size: ${selectedSize})` : ""}`);
    // aici poți integra cu context sau localStorage dacă vrei persistentă reală
  };

  if (!product) return <p className="loading">Loading...</p>;

  return (
      <>
        <button className="back-button" onClick={() => navigate('/')}>
           ⬅️ Back to products
        </button>
    <div className="product-details-container">
      <div className="product-image-section">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info-section">
        <h2>{product.name}</h2>
        <p className="description">{product.description}</p>
        <p className="price">
          <del>{product.oldPrice} €</del> <strong>{product.price} €</strong>
        </p>
        <p className="rating">⭐ {product.rating}</p>
      {product.sizes && product.sizes.length > 0 && (
        <div className="size-selector">
          <label htmlFor="size">
            {product.categorie === "Phones" ? "Memory:" : "Size:"}
          </label>
          <select id="size" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="">Select</option>
            {product.sizes?.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  </>
  );
}

export default ProductDetails;
