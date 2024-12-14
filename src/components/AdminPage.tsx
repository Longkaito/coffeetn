import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  discountPercentage: number;
  image: string;
  category: string;
  active: boolean;
}

function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: '',
    originalPrice: '',
    discountPercentage: 0,
    image: '',
    category: 'Đồ uống thanh nhiệt',
    active: true
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://67387e0d4eb22e24fca81726.mockapi.io/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Tuan.12345') {
      setIsAuthenticated(true);
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      alert('Tên đăng nhập hoặc mật khẩu không đúng!');
      window.location.href = '/'; // Chuyển hướng về trang chủ
    }
  };

  const handleLogout = () => {
    localStorage.setItem('adminLoggedIn', 'false');
    setIsAuthenticated(false);
    window.location.href = '/'; // Chuyển về trang chủ sau khi đăng xuất
  };

  // Nếu chưa đăng nhập, hiển thị form đăng nhập
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Đăng nhập Admin
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Tên đăng nhập</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Mật khẩu</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleUpdate = async (updatedProduct: Product) => {
    try {
      const response = await fetch(
        `https://67387e0d4eb22e24fca81726.mockapi.io/api/products/${updatedProduct.id}`, 
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct)
        }
      );

      if (!response.ok) {
        throw new Error('Lỗi khi cập nhật sản phẩm');
      }

      setIsEditModalOpen(false);
      setProducts(products.map(p => 
        p.id === updatedProduct.id ? updatedProduct : p
      ));
      toast.success('Cập nhật dữ liệu thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      toast.error('Có lỗi xảy ra khi cập nhật sản phẩm!');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    try {
      // Gọi API xóa sản phẩm
      await fetch(`https://67387e0d4eb22e24fca81726.mockapi.io/api/products/${selectedProduct.id}`, {
        method: 'DELETE'
      });
      
      setIsDeleteModalOpen(false);
      // Cập nhật lại danh sách sản phẩm
      setProducts(products.filter(p => p.id !== selectedProduct.id));
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://67387e0d4eb22e24fca81726.mockapi.io/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        throw new Error('Lỗi khi thêm sản phẩm');
      }

      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setIsAddModalOpen(false);
      setNewProduct({
        name: '',
        price: '',
        originalPrice: '',
        discountPercentage: 0,
        image: '',
        category: 'Đồ uống thanh nhiệt',
        active: true
      });
      toast.success('Thêm sản phẩm thành công!');
    } catch (error) {
      console.error('Lỗi khi thêm:', error);
      toast.error('Có lỗi xảy ra khi thêm sản phẩm!');
    }
  };

  if (loading) {
    return <div className="p-4">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Quản lý Sản phẩm</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Thêm sản phẩm
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Đăng xuất
          </button>
        </div>
      </div>
      <div className="mb-4">
        <select 
          className="border border-gray-300 rounded px-4 py-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Tất cả danh mục</option>
          <option value="Chương trình khuyến mại">Chương trình khuyến mại</option>
          <option value="Sản phẩm nổi bật">Sản phẩm nổi bật</option>
          <option value="Đồ uống thanh nhiệt">Đồ uống thanh nhiệt</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Tên sản phẩm</th>
              <th className="px-4 py-2 border">Giá</th>
              <th className="px-4 py-2 border">Giá gốc</th>
              <th className="px-4 py-2 border">Giảm giá (%)</th>
              <th className="px-4 py-2 border">Danh mục</th>
              <th className="px-4 py-2 border">Hình ảnh</th>
              <th className="px-4 py-2 border">Trạng thái</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 border">{product.id}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.price}</td>
                <td className="px-4 py-2 border">{product.originalPrice}</td>
                <td className="px-4 py-2 border">{product.discountPercentage}</td>
                <td className="px-4 py-2 border">{product.category}</td>
                <td className="px-4 py-2 border">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover" />
                </td>
                <td className="px-4 py-2 border">
                  {product.active ? (
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Không hoạt động  
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Chỉnh sửa */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Chỉnh sửa sản phẩm</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(selectedProduct);
            }}>
              <div className="mb-4">
                <label className="block mb-2">Tên sản phẩm</label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) => setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value
                  })}
                  className="w-full border p-2 rounded"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Giá</label>
                <input
                  type="text"
                  value={selectedProduct.price}
                  onChange={(e) => setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value
                  })}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Giá gốc</label>
                <input
                  type="text"
                  value={selectedProduct.originalPrice}
                  onChange={(e) => setSelectedProduct({
                    ...selectedProduct,
                    originalPrice: e.target.value
                  })}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Phần trăm giảm giá</label>
                <input
                  type="number"
                  value={selectedProduct.discountPercentage}
                  onChange={(e) => setSelectedProduct({
                    ...selectedProduct,
                    discountPercentage: Number(e.target.value)
                  })}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Link hình ảnh</label>
                <input
                  type="text"
                  value={selectedProduct.image}
                  onChange={(e) => setSelectedProduct({
                    ...selectedProduct,
                    image: e.target.value
                  })}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Danh mục</label>
                <select
                  value={selectedProduct.category}
                  onChange={(e) => setSelectedProduct({
                    ...selectedProduct,
                    category: e.target.value
                  })}
                  className="w-full border p-2 rounded"
                >
                  <option value="Chương trình khuyến mại">Chương trình khuyến mại</option>
                  <option value="Sản phẩm nổi bật">Sản phẩm nổi bật</option>
                  <option value="Đồ uống thanh nhiệt">Đồ uống thanh nhiệt</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Trạng thái</label>
                <select
                  value={selectedProduct.active.toString()}
                  onChange={(e) => setSelectedProduct({
                    ...selectedProduct,
                    active: e.target.value === 'true'
                  })}
                  className="w-full border p-2 rounded"
                >
                  <option value="true">Hoạt động</option>
                  <option value="false">Không hoạt động</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xác nhận xóa */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Xác nhận xóa</h3>
            <p>Bạn có chắc chắn muốn xóa sản phẩm "{selectedProduct.name}"?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thêm Modal Thêm sản phẩm */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Thêm sản phẩm mới</h3>
            <form onSubmit={handleAdd}>
              <div className="mb-4">
                <label className="block mb-2">Tên sản phẩm</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    name: e.target.value
                  })}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Giá</label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    price: e.target.value
                  })}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Giá gốc</label>
                <input
                  type="text"
                  value={newProduct.originalPrice}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    originalPrice: e.target.value
                  })}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Phần trăm giảm giá</label>
                <input
                  type="number"
                  value={newProduct.discountPercentage}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    discountPercentage: Number(e.target.value)
                  })}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Link hình ảnh</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    image: e.target.value
                  })}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Danh mục</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    category: e.target.value
                  })}
                  className="w-full border p-2 rounded"
                >
                  <option value="Chương trình khuyến mại">Chương trình khuyến mại</option>
                  <option value="Sản phẩm nổi bật">Sản phẩm nổi bật</option>
                  <option value="Đồ uống thanh nhiệt">Đồ uống thanh nhiệt</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Trạng thái</label>
                <select
                  value={newProduct.active.toString()}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    active: e.target.value === 'true'
                  })}
                  className="w-full border p-2 rounded"
                >
                  <option value="true">Hoạt động</option>
                  <option value="false">Không hoạt động</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage; 