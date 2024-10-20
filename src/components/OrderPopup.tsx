import React, { useState } from 'react';
import { X } from 'lucide-react';
import ThankYouPopup from './ThankYouPopup';

interface OrderPopupProps {
  onClose: () => void;
  total: number;
}

const OrderPopup: React.FC<OrderPopupProps> = ({ onClose, total }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const validatePhone = (value: string) => {
    const phoneRegex = /^(0|\+84)(\s?[0-9]{9})$/;
    if (!phoneRegex.test(value)) {
      setPhoneError('Số điện thoại không hợp lệ');
    } else {
      setPhoneError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    validatePhone(value);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const content = `
      Tên khách hàng: ${name}
      Số điện thoại: ${phone}
      Địa chỉ: ${address}
      Tổng tiền: ${total}
    `;
    
    const url = `https://api.telegram.org/bot7637526991:AAHrp8RZ3m793vYAp8jAO9BawFSys3S6Urs/sendMessage?chat_id=-4541856003&text=${content}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      if (!phoneError) {
        const json = await response.json();
        setShowThankYou(true);
        localStorage.removeItem("cartItems");
      }
  
    } catch (error: any) {
      console.error(error.message);
    }
  }

  if (showThankYou) {
    return <ThankYouPopup onClose={onClose} customerName={name} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-brown-800">Thông tin đặt hàng</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition duration-150">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition duration-150"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition duration-150 ${
                phoneError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {phoneError && <p className="mt-1 text-sm text-red-600">{phoneError}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition duration-150"
              rows={3}
              required
            ></textarea>
          </div>
          <div className="bg-brown-50 p-4 rounded-md">
            <p className="text-lg font-semibold text-brown-800">Tổng cộng: {total.toLocaleString('vi-VN')}đ</p>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500 transition duration-150"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brown-600 hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500 transition duration-150"
              disabled={!!phoneError}
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPopup;