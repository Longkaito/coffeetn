import React, { useState, useEffect } from 'react';
import { Flame, ShoppingCart, X } from 'lucide-react';

interface Product {
  name: string;
  price: string;
  image: string;
  active: boolean;
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
  const [promotionalProducts, setPromotionalProducts] = useState<PromotionalProduct[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [refreshingDrinks, setRefreshingDrinks] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://67387e0d4eb22e24fca81726.mockapi.io/api/products');
        const data = await response.json();

        // Lọc sản phẩm theo category
        const promotional = data.filter((item: any) => 
          item.category === "Chương trình khuyến mại"
        ) as PromotionalProduct[];

        const featured = data.filter((item: any) => 
          item.category === "Sản phẩm nổi bật"
        ) as Product[];

        const refreshing = data.filter((item: any) => 
          item.category === "Đồ uống thanh nhiệt"
        ) as Product[];

        setPromotionalProducts(promotional);
        setFeaturedProducts(featured);
        setRefreshingDrinks(refreshing);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Đang tải...</div>;
  }

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
      {products
        .filter(product => product.active)
        .map((product, index) => (
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
      {products
        .filter(product => product.active)
        .map((product, index) => (
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

  // Hàm kiểm tra xem category có sản phẩm active không
  const hasCategoryActiveProducts = (products: Product[]) => {
    return products.some(product => product.active);
  };

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
        <h2 className="text-3xl font-bold mb-4">Chào mừng đến với E-Coffee</h2>
        <p className="text-lg">
          Chúng tôi tự hào mang đến cho bạn những hạt cà phê chất lượng nhất, được chọn lọc kỹ càng từ các vùng trồng nổi tiếng.
          Hãy đến và trải nghiệm hương vị đặc biệt của chúng tôi!
        </p>
      </section>
      
      {hasCategoryActiveProducts(promotionalProducts) && (
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
      )}

      {hasCategoryActiveProducts(featuredProducts) && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Sản phẩm nổi bật</h2>
          <ProductGrid products={featuredProducts} />
        </section>
      )}

      {hasCategoryActiveProducts(refreshingDrinks) && (
        <section>
          <h2 className="text-3xl font-bold mb-6">Đồ uống thanh nhiệt</h2>
          <ProductGrid products={refreshingDrinks} />
        </section>
      )}
    </div>
  );
};

export default HomePage;