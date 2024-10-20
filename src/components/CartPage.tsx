import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import OrderPopup from './OrderPopup';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface CartPageProps {
  cartItems: CartItem[];
  updateQuantity: (id: number, newQuantity: number) => void;
  removeItem: (id: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, updateQuantity, removeItem }) => {
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d]/g, ''));
    return sum + price * item.quantity;
  }, 0);

  const handleOrder = () => {
    setShowOrderPopup(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center border-b py-4 last:border-b-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-0 sm:mr-4 mb-4 sm:mb-0" />
                <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.price}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-gray-500 hover:text-gray-700"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={20} />
                  </button>
                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Plus size={20} />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Tổng cộng:</span>
              <span className="text-xl font-bold">{total.toLocaleString('vi-VN')}đ</span>
            </div>
            <button 
              className="w-full bg-brown-600 text-white py-2 px-4 rounded hover:bg-brown-700"
              onClick={handleOrder}
            >
              Đặt hàng
            </button>
          </div>
        </>
      )}
      {showOrderPopup && (
        <OrderPopup onClose={() => setShowOrderPopup(false)} total={total} />
      )}
    </div>
  );
};

export default CartPage;