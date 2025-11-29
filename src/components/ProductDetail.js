import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = ({ product, onBack }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={onBack}>
        ← Volver a productos
      </button>
      <div className="product-detail">
        <div className="product-detail-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-detail-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/500x400?text=Producto';
            }}
          />
        </div>
        <div className="product-detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <div className="detail-price-section">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            <span className={`detail-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
            </span>
          </div>
          <button 
            className="detail-add-btn"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? '🛒 Agregar al carrito' : 'Sin stock disponible'}
          </button>
          <div className="product-features">
            <h3>Características:</h3>
            <ul>
              <li>✓ Envío gratis en compras mayores a $500</li>
              <li>✓ Garantía de 12 meses</li>
              <li>✓ Devolución gratuita en 30 días</li>
              <li>✓ Soporte técnico incluido</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
