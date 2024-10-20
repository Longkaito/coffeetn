import React from 'react';
import { Coffee, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, setCurrentPage }) => {
  return (
    <header className="bg-brown-800 text-white p-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <Coffee className="w-8 h-8 mr-2 cursor-pointer" onClick={() => setCurrentPage('home')} />
          <span className="text-xl font-bold cursor-pointer" onClick={() => setCurrentPage('home')}>E-Coffee</span>
        </div>
        <nav>
          <ul className="flex flex-wrap justify-center sm:space-x-4">
            <li className="mx-2 my-1 sm:mx-0 sm:my-0"><a href="#" className="hover:text-brown-300" onClick={() => setCurrentPage('home')}>Trang chủ</a></li>
            <li className="mx-2 my-1 sm:mx-0 sm:my-0"><a href="#" className="hover:text-brown-300" onClick={() => setCurrentPage('about')}>Giới thiệu</a></li>
            <li className="mx-2 my-1 sm:mx-0 sm:my-0">
              <a href="#" className="hover:text-brown-300 flex items-center" onClick={() => setCurrentPage('cart')}>
                <ShoppingCart className="w-4 h-4 mr-1" />
                Giỏ hàng
                {cartItemCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {cartItemCount}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;