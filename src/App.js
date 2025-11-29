import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setCurrentView('products');
  };

  const handleCartClick = () => {
    setCurrentView('cart');
  };

  const handleCheckout = () => {
    setCurrentView('checkout');
  };

  const handleCheckoutComplete = () => {
    setCurrentView('products');
  };

  const renderView = () => {
    switch (currentView) {
      case 'detail':
        return (
          <ProductDetail 
            product={selectedProduct} 
            onBack={handleBackToProducts}
          />
        );
      case 'cart':
        return (
          <Cart 
            onBack={handleBackToProducts}
            onCheckout={handleCheckout}
          />
        );
      case 'checkout':
        return (
          <Checkout 
            onBack={handleCartClick}
            onComplete={handleCheckoutComplete}
          />
        );
      default:
        return <ProductList onViewDetails={handleViewDetails} />;
    }
  };

  return (
    <CartProvider>
      <div className="App">
        <Navbar 
          onCartClick={handleCartClick}
          onHomeClick={handleBackToProducts}
        />
        <main className="main-content">
          {renderView()}
        </main>
        <footer className="footer">
          <p>© 2024 E-Commerce Store - Solución de Ejercicio React para Desarrollo Web</p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
