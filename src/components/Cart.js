import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = ({ onBack, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <button className="back-button" onClick={onBack}>
          ← Continuar comprando
        </button>
        <div className="empty-cart">
          <span className="empty-cart-icon">🛒</span>
          <h2>Tu carrito está vacío</h2>
          <p>¡Agrega algunos productos para comenzar!</p>
          <button className="continue-shopping-btn" onClick={onBack}>
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <button className="back-button" onClick={onBack}>
        ← Continuar comprando
      </button>
      <h1 className="cart-title">🛒 Tu Carrito</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.image} 
                alt={item.name}
                className="cart-item-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/100x100?text=Producto';
                }}
              />
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-category">{item.category}</p>
                <span className="cart-item-price">${item.price.toFixed(2)}</span>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Resumen del pedido</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span>{getCartTotal() >= 500 ? 'Gratis' : '$15.00'}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>
              ${(getCartTotal() + (getCartTotal() >= 500 ? 0 : 15)).toFixed(2)}
            </span>
          </div>
          {getCartTotal() < 500 && (
            <p className="free-shipping-notice">
              ¡Agrega ${(500 - getCartTotal()).toFixed(2)} más para envío gratis!
            </p>
          )}
          <button className="checkout-btn" onClick={onCheckout}>
            Proceder al pago
          </button>
          <button className="clear-cart-btn" onClick={clearCart}>
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
