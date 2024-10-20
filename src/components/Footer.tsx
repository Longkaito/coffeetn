import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brown-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">Cà Phê Ngon</h3>
          <p>Mang đến cho bạn hương vị cà phê tuyệt hảo mỗi ngày.</p>
        </div>
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
          <ul>
            <li className="flex items-center mb-2"><Phone className="w-4 h-4 mr-2" /> 0123 456 789</li>
            <li className="flex items-center mb-2"><Mail className="w-4 h-4 mr-2" /> info@caphengon.com</li>
            <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> 123 Đường Cà Phê, TP. Hồ Chí Minh</li>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-4">Đăng ký nhận tin</h3>
          <form className="flex flex-col sm:flex-row">
            <input type="email" placeholder="Email của bạn" className="p-2 w-full sm:w-auto mb-2 sm:mb-0 rounded-l-md" />
            <button type="submit" className="bg-brown-600 text-white p-2 rounded-r-md hover:bg-brown-700">Đăng ký</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;