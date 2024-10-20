import React, { useState, useEffect } from 'react';
import { Flame, ShoppingCart, X } from 'lucide-react';

interface Product {
  name: string;
  price: string;
  image: string;
}

interface PromotionalProduct extends Product {
  originalPrice: string;
  discountPercentage: number;
}

interface HomePageProps {
  addToCart: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ addToCart }) => {
  const [notification, setNotification] = useState<{ message: string; product: Product } | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const promotionalProducts: PromotionalProduct[] = [
    {
      name: 'Cà phê Espresso Blend',
      price: '120.000đ',
      originalPrice: '150.000đ',
      discountPercentage: 20,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Cà phê Cold Brew',
      price: '45.000đ',
      originalPrice: '60.000đ',
      discountPercentage: 25,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Bộ pha cà phê Drip',
      price: '280.000đ',
      originalPrice: '350.000đ',
      discountPercentage: 20,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Cà phê Cappuccino',
      price: '50.000đ',
      originalPrice: '65.000đ',
      discountPercentage: 23,
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
  ];

  const featuredProducts: Product[] = [
    { name: 'Cà phê Robusta', price: '80.000đ', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Cà phê Arabica', price: '100.000đ', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Cà phê Chồn', price: '250.000đ', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Cà phê Moka', price: '120.000đ', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Cà phê Culi', price: '90.000đ', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Cà phê Cherry', price: '110.000đ', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  ];

  const refreshingDrinks: Product[] = [
    { name: 'Trà xanh matcha', price: '45.000đ', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Trà hoa cúc mật ong', price: '40.000đ', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Nước ép dưa hấu', price: '35.000đ', image: 'https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Sinh tố bơ', price: '50.000đ', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Soda chanh bạc hà', price: '38.000đ', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Trà đào cam sả', price: '42.000đ', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Nước ép cà rốt gừng', price: '38.000đ', image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Smoothie dâu chuối', price: '48.000đ', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Trà atiso mật ong', price: '40.000đ', image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Nước ép cần tây táo', price: '45.000đ', image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Trà ô long hoa nhài', price: '42.000đ', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Nước dừa tươi', price: '35.000đ', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  ];

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setNotification({ message: "Sản phẩm đã được thêm vào giỏ hàng!", product });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
            <button
              className="mt-4 bg-brown-600 text-white py-2 px-4 rounded hover:bg-brown-700 w-full"
              onClick={() => handleAddToCart(product)}
            >
              Mua ngay
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const PromotionalProductGrid: React.FC<{ products: PromotionalProduct[] }> = ({ products }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg">
              -{product.discountPercentage}%
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600 line-through">{product.originalPrice}</p>
              <p className="text-red-600 font-semibold">{product.price}</p>
            </div>
            <button
              className="mt-2 bg-brown-600 text-white py-2 px-4 rounded hover:bg-brown-700 w-full"
              onClick={() => handleAddToCart(product)}
            >
              Mua ngay
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && (
        <div className="fixed bottom-4 right-4 bg-white border border-green-500 text-green-700 px-4 py-3 rounded shadow-lg z-50 max-w-sm w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              <p className="font-medium">{notification.message}</p>
            </div>
            <button onClick={() => setNotification(null)} className="text-green-700 hover:text-green-900">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center">
            <img src={notification.product.image} alt={notification.product.name} className="w-10 h-10 object-cover rounded mr-2" />
            <div>
              <p className="font-semibold">{notification.product.name}</p>
              <p className="text-sm">{notification.product.price}</p>
            </div>
          </div>
        </div>
      )}
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Chào mừng đến với Cà Phê Ngon</h2>
        <p className="text-lg">
          Chúng tôi tự hào mang đến cho bạn những hạt cà phê chất lượng nhất, được chọn lọc kỹ càng từ các vùng trồng nổi tiếng.
          Hãy đến và trải nghiệm hương vị đặc biệt của chúng tôi!
        </p>
      </section>
      
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <h2 className="text-3xl font-bold mr-3">Chương trình khuyến mại</h2>
          <span className="bg-red-500 text-white text-sm font-bold py-1 px-2 rounded-full flex items-center">
            <Flame size={16} className="mr-1" />
            HOT
          </span>
        </div>
        <PromotionalProductGrid products={promotionalProducts} />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Sản phẩm nổi bật</h2>
        <ProductGrid products={featuredProducts} />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Đồ uống thanh nhiệt</h2>
        <ProductGrid products={refreshingDrinks} />
      </section>

      {selectedProduct && (
        <AddToCartPopup product={selectedProduct} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default HomePage;