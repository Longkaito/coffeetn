import React from 'react';
import { X } from 'lucide-react';

interface AddToCartPopupProps {
  product: {
    name: string;
    price: string;
  };
  onClose: () => void;
}

const AddToCartPopup: React.FC<AddToCartPopupProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Thêm vào giỏ hàng</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="mb-4">
          Bạn đã thêm <span className="font-semibold">{product.name}</span> vào giỏ hàng.
        </p>
        <p className="mb-4">
          Giá: <span className="font-semibold">{product.price}</span>
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-brown-600 text-white py-2 px-4 rounded hover:bg-brown-700 mr-2"
          >
            Tiếp tục mua sắm
          </button>
          <button
            onClick={onClose}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Xem giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartPopup;