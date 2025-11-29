import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the e-commerce store brand name in navbar', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/E-Commerce Store/i);
  expect(brandElements.length).toBeGreaterThan(0);
  expect(brandElements[0]).toBeInTheDocument();
});

test('renders the cart button in navbar', () => {
  render(<App />);
  const cartButtons = screen.getAllByRole('button');
  const cartButton = cartButtons.find(btn => btn.textContent.includes('Carrito'));
  expect(cartButton).toBeInTheDocument();
});

test('renders the search box', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Buscar productos/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders product cards', () => {
  render(<App />);
  const productElement = screen.getByText(/Laptop Gaming Pro/i);
  expect(productElement).toBeInTheDocument();
});

test('renders footer with correct text', () => {
  render(<App />);
  const footerElement = screen.getByText(/Solución de Ejercicio React para Desarrollo Web/i);
  expect(footerElement).toBeInTheDocument();
});
