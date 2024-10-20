import React from 'react';

const AboutPage: React.FC = () => {
  const coffeeTypes = [
    {
      name: 'Cà phê nâu đá',
      description: 'Cà phê nâu đá là biểu tượng của văn hóa cà phê Việt Nam. Được pha từ cà phê đậm đặc, thêm sữa đặc và đá, tạo nên hương vị đậm đà, ngọt ngào và mát lạnh.',
      recipe: 'Công thức: 30ml cà phê đen đậm + 20ml sữa đặc + đá viên',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Cà phê đen',
      description: 'Cà phê đen thuần túy, không pha trộn, là sự lựa chọn của những người yêu thích hương vị mạnh mẽ và đậm đà. Được pha từ hạt cà phê rang xay, giữ nguyên hương vị đặc trưng của cà phê Việt Nam.',
      recipe: 'Công thức: 30-35ml cà phê đen đậm + nước nóng (tùy chọn)',
      image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Cà phê cốt dừa',
      description: 'Sự kết hợp độc đáo giữa cà phê đậm đà và vị béo ngậy của nước cốt dừa tạo nên một hương vị mới lạ. Cà phê cốt dừa mang đến trải nghiệm thú vị cho những ai muốn thử nghiệm hương vị mới.',
      recipe: 'Công thức: 30ml cà phê đen + 30ml nước cốt dừa + 15ml sữa đặc + đá viên',
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Bạc xỉu',
      description: 'Bạc xỉu là sự kết hợp hài hòa giữa cà phê, sữa đặc và sữa tươi. Với hương vị ngọt ngào và béo ngậy, bạc xỉu là lựa chọn tuyệt vời cho những ai thích cà phê nhưng muốn giảm bớt độ đắng.',
      recipe: 'Công thức: 20ml cà phê đen + 60ml sữa đặc + 30ml sữa tươi + đá viên',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Cà phê muối',
      description: 'Cà phê muối là một sáng tạo độc đáo, kết hợp giữa vị đắng của cà phê và vị mặn nhẹ của muối. Hương vị này tạo nên một trải nghiệm thú vị, làm nổi bật hương thơm của cà phê và tạo cảm giác mới lạ cho người thưởng thức.',
      recipe: 'Công thức: 30ml cà phê đen + 10ml sữa đặc + 1/4 muỗng cà phê muối + đá viên',
      image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Giới thiệu về Cà Phê Ngon</h1>
      <p className="mb-8 text-lg">
        Tại Cà Phê Ngon, chúng tôi tự hào mang đến cho bạn những trải nghiệm cà phê đặc biệt và độc đáo. 
        Mỗi loại cà phê của chúng tôi đều được chọn lọc kỹ càng từ những hạt cà phê chất lượng nhất và 
        được pha chế theo công thức riêng biệt để tạo nên hương vị đặc trưng không thể trộn lẫn.
      </p>
      <div className="space-y-8 sm:space-y-12">
        {coffeeTypes.map((coffee, index) => (
          <section key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img className="h-48 w-full object-cover md:w-48" src={coffee.image} alt={coffee.name} />
              </div>
              <div className="p-4 sm:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{coffee.name}</h2>
                <p className="mt-2 text-gray-600">{coffee.description}</p>
                <p className="mt-4 text-sm text-gray-500 font-medium">{coffee.recipe}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
      <div className="mt-12 bg-brown-100 rounded-lg p-4 sm:p-8">
        <h2 className="text-2xl font-semibold mb-4">Quy trình pha chế</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Chọn hạt cà phê chất lượng cao và rang mới</li>
          <li>Xay hạt cà phê ngay trước khi pha để giữ nguyên hương vị</li>
          <li>Sử dụng nước lọc sạch và đun sôi đến nhiệt độ lý tưởng (92-96°C)</li>
          <li>Pha cà phê bằng phương pháp phù hợp (phin, espresso, hoặc pour-over)</li>
          <li>Thêm các thành phần khác theo công thức của từng loại cà phê</li>
          <li>Phục vụ ngay lập tức để đảm bảo hương vị tuyệt vời nhất</li>
        </ol>
      </div>
    </div>
  );
};

export default AboutPage;