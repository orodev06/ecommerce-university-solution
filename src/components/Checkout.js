import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = ({ onBack, onComplete }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      onBack();
    }
  }, [cart.length, onBack, orderComplete]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  const shippingCost = getCartTotal() >= 500 ? 0 : 15;
  const total = getCartTotal() + shippingCost;

  if (orderComplete) {
    return (
      <div className="checkout-container">
        <div className="order-complete">
          <div className="success-icon">✓</div>
          <h1>¡Pedido Completado!</h1>
          <p>Gracias por tu compra. Tu pedido ha sido procesado exitosamente.</p>
          <p className="order-number">Número de orden: #ORD-{Date.now().toString(36).toUpperCase()}</p>
          <button className="back-home-btn" onClick={onComplete}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <button className="back-button" onClick={onBack}>
        ← Volver al carrito
      </button>
      <h1 className="checkout-title">💳 Checkout</h1>
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Información de envío</h2>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Juan Pérez"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="juan@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Calle Principal 123"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Ciudad</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Ciudad"
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Código postal</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  placeholder="12345"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Información de pago</h2>
            <div className="form-group">
              <label htmlFor="cardNumber">Número de tarjeta</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Fecha de expiración</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  placeholder="123"
                  maxLength="4"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
          </button>
        </form>

        <div className="order-summary">
          <h2>Resumen del pedido</h2>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="summary-item-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/60x60?text=Producto';
                  }}
                />
                <div className="summary-item-info">
                  <span className="summary-item-name">{item.name}</span>
                  <span className="summary-item-qty">Cant: {item.quantity}</span>
                </div>
                <span className="summary-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
