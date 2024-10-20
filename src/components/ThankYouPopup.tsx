import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ThankYouPopupProps {
  onClose: () => void;
  customerName: string;
}

const ThankYouPopup: React.FC<ThankYouPopupProps> = ({ onClose, customerName }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-6">
          <CheckCircle size={64} className="mx-auto text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-brown-800 mb-4">Cảm ơn bạn!</h2>
        <p className="text-xl text-gray-700 mb-6">
          {customerName}, đơn hàng của bạn đã được xác nhận thành công.
        </p>
        <p className="text-gray-600 mb-8">
          Chúng tôi sẽ liên hệ với bạn sớm để xác nhận thông tin giao hàng.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-brown-600 text-white rounded-full font-semibold hover:bg-brown-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default ThankYouPopup;