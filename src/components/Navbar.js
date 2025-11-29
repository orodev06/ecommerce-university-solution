import React from 'react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ onCartClick, onHomeClick }) => {
  const { getCartItemsCount } = useCart();
  const itemCount = getCartItemsCount();

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={onHomeClick}>
        <span className="brand-icon">🛒</span>
        <span className="brand-text">E-Commerce Store</span>
      </div>
      <div className="navbar-menu">
        <button className="nav-link" onClick={onHomeClick}>
          Inicio
        </button>
        <button className="cart-button" onClick={onCartClick}>
          <span className="cart-icon">🛍️</span>
          <span className="cart-text">Carrito</span>
          {itemCount > 0 && (
            <span className="cart-badge">{itemCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
