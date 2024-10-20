import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import AboutPage from './components/AboutPage';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: { name: string; price: string; image: string }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, id: Date.now(), quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage addToCart={addToCart} />;
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        );
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage addToCart={addToCart} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItems.length} setCurrentPage={setCurrentPage} />
      <main className="flex-grow bg-brown-50">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;