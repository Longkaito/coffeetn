import React from 'react';
import { Coffee, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import bg_word from "../assets/images/bg_word.jpg";

interface HeaderProps {
  cartItemCount: number;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, setCurrentPage }) => {
  return (
    <header className="text-white p-4" style={{backgroundImage: `url('${bg_word}')`}}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <Link to="/" className="font-bold cursor-pointer" style={{ fontSize: '28px' }}>Trung Nguyên E-Coffee</Link>
        </div>
        <nav>
          <ul className="flex flex-wrap justify-center sm:space-x-4">
            <li className="mx-2 my-1 sm:mx-0 sm:my-0">
              <Link to="/" className="hover:text-brown-300" onClick={() => setCurrentPage('home')}>Trang chủ</Link>
            </li>
            <li className="mx-2 my-1 sm:mx-0 sm:my-0">
              <Link to="/about" className="hover:text-brown-300" onClick={() => setCurrentPage('about')}>Giới thiệu</Link>
            </li>
            <li className="mx-2 my-1 sm:mx-0 sm:my-0">
              <Link to="/cart" className="hover:text-brown-300 flex items-center" onClick={() => setCurrentPage('cart')}>
                <ShoppingCart className="w-4 h-4 mr-1" />
                Giỏ hàng
                {cartItemCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;