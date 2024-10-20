import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brown-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">E-Coffee</h3>
          <p>
            Chào mừng đến với Cà phê Trung Nguyên của chúng tôi! Nơi bạn thưởng
            thức những ly cà phê đặc biệt từ thương hiệu danh tiếng Trung
            Nguyên, mang đậm hương vị truyền thống và tinh túy Việt Nam. Hãy ghé
            qua và trải nghiệm hương vị cà phê đỉnh cao!
          </p>
        </div>
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
          <ul>
            <li className="flex items-center mb-2">
              <Phone className="w-4 h-4 mr-2" />
              0865 830 840
            </li>
            <li className="flex items-center mb-2">
              <Mail className="w-4 h-4 mr-2" />
              trungnguyencoffee@gmail.com
            </li>
            <li className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              SP 14-17 ĐLNT, Vinhomes Oceanpark 2, Văn Giang, Hưng Yên
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-4">Đăng ký nhận tin</h3>
          <form className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Email của bạn"
              className="p-2 w-full sm:w-auto mb-2 sm:mb-0 rounded-l-md"
            />
            <button
              type="submit"
              className="bg-brown-600 text-white p-2 rounded-r-md hover:bg-brown-700"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
