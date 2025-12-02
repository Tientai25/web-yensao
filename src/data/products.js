import sp1 from '../assets/images/sp1.jpg'
import sp2 from '../assets/images/sp2.jpg'
import sp3 from '../assets/images/sp3.jpg'
import sp4 from '../assets/images/sp4.jpg'
import sp5 from '../assets/images/sp5.jpg'

export const products = [
  {
    id: 1,
    name: 'Yến Sào Huyết 100% Tự Nhiên',
    category: 'blood-nest',
    price: 2500000,
    originalPrice: 3000000,
    image: sp1,
    rating: 4.8,
    reviews: 124,
    description: 'Yến sào huyết cao cấp, được chọn lọc kỹ lưỡng từ những tổ yến tốt nhất',
    benefits: ['Bổ máu', 'Tăng sức đề kháng', 'Làm đẹp da'],
    inStock: true,
    article: {
      title: 'Yến Sào Huyết - Món Quà Quý Giá Từ Thiên Nhiên',
      content: [
        'Yến sào huyết là loại yến sào quý hiếm và có giá trị dinh dưỡng cao nhất trong các loại yến sào. Màu đỏ đặc trưng của yến huyết được tạo nên từ quá trình phản ứng tự nhiên giữa nước bọt của chim yến với các khoáng chất trong hang động.',
        'Yến sào huyết chứa hàm lượng protein cao (khoảng 50-60%), 18 loại axit amin thiết yếu, và nhiều khoáng chất quan trọng như canxi, sắt, kẽm. Đặc biệt, yến huyết có hàm lượng sắt cao hơn các loại yến khác, giúp bổ máu hiệu quả.',
        'Sử dụng yến sào huyết thường xuyên giúp tăng cường hệ miễn dịch, cải thiện tuần hoàn máu, làm chậm quá trình lão hóa, và đặc biệt tốt cho phụ nữ mang thai, người thiếu máu, và người mới ốm dậy.',
        'Sản phẩm của chúng tôi được khai thác từ các hang động tự nhiên tại Khánh Hòa, đảm bảo 100% nguyên chất, không pha trộn, không chất bảo quản. Mỗi tổ yến đều được kiểm tra kỹ lưỡng trước khi đến tay khách hàng.'
      ]
    }
  },
  {
    id: 2,
    name: 'Yến Sào Trắng Premium',
    category: 'white-nest',
    price: 1800000,
    originalPrice: 2200000,
    image: sp2,
    rating: 4.9,
    reviews: 87,
    description: 'Yến sào trắng tinh khôi, chất lượng thượng hạng, ít tạp chất',
    benefits: ['Hỗ trợ hô hấp', 'Làm mịn da', 'Kháng khuẩn tự nhiên'],
    inStock: true,
    article: {
      title: 'Yến Sào Trắng Premium - Tinh Túy Từ Biển Cả',
      content: [
        'Yến sào trắng Premium là sản phẩm được tuyển chọn từ những tổ yến có chất lượng tốt nhất, màu trắng tinh khôi, ít tạp chất. Đây là loại yến sào phổ biến và được ưa chuộng nhất nhờ giá trị dinh dưỡng cao và giá cả hợp lý.',
        'Với hàm lượng protein dồi dào và 18 loại axit amin, yến sào trắng giúp bồi bổ sức khỏe toàn diện. Đặc biệt, sản phẩm chứa Threonine - một axit amin quan trọng giúp hỗ trợ hệ hô hấp, rất tốt cho người bị ho, viêm phế quản.',
        'Yến sào trắng còn được biết đến với khả năng làm đẹp da tự nhiên nhờ chứa Glycine và Collagen. Sử dụng đều đặn giúp da mịn màng, giảm nếp nhăn, và tăng độ đàn hồi cho làn da.',
        'Sản phẩm được chế biến theo quy trình khép kín, đảm bảo vệ sinh an toàn thực phẩm. Mỗi lô hàng đều được kiểm nghiệm chất lượng trước khi xuất xưởng.'
      ]
    }
  },
  {
    id: 3,
    name: 'Yến Sào Vàng Quý Hiếm',
    category: 'gold-nest',
    price: 3200000,
    originalPrice: 4000000,
    image: sp3,
    rating: 5.0,
    reviews: 45,
    description: 'Yến sào vàng quý hiếm, tác dụng tuyệt vời, số lượng có hạn',
    benefits: ['Kích thích làn da', 'Phục hồi sinh lực', 'Chống lão hóa mạnh mẽ'],
    inStock: true,
    article: {
      title: 'Yến Sào Vàng - Báu Vật Từ Thiên Nhiên',
      content: [
        'Yến sào vàng là loại yến sào cực kỳ quý hiếm, chỉ chiếm khoảng 5-10% tổng sản lượng yến sào trên thị trường. Màu vàng đặc trưng được hình thành từ quá trình lên men tự nhiên trong môi trường hang động đặc biệt, tạo nên giá trị dinh dưỡng vượt trội.',
        'Yến sào vàng chứa hàm lượng cao các chất chống oxy hóa tự nhiên, giúp chống lão hóa hiệu quả. Sản phẩm đặc biệt phù hợp cho người cao tuổi, người cần phục hồi sức khỏe sau bệnh, và những người quan tâm đến việc duy trì vẻ đẹp thanh xuân.',
        'Với thành phần giàu Collagen và Elastin, yến sào vàng giúp kích thích sản sinh tế bào da mới, làm mờ vết thâm, và cải thiện độ đàn hồi của da. Nhiều khách hàng đã phản hồi tích cực về hiệu quả làm đẹp sau 2-3 tuần sử dụng.',
        'Do tính quý hiếm và quy trình khai thác phức tạp, yến sào vàng có số lượng hạn chế. Chúng tôi cam kết chỉ cung cấp sản phẩm chính hãng, có nguồn gốc rõ ràng, đảm bảo chất lượng tốt nhất cho khách hàng.'
      ]
    }
  },
  {
    id: 4,
    name: 'Tổ Yến Sào Nguyên Chất',
    category: 'whole-nest',
    price: 5000000,
    originalPrice: 6500000,
    image: sp4,
    rating: 5.0,
    reviews: 28,
    description: 'Tổ yến sào nguyên chất hoàn chỉnh, chất lượng cao nhất',
    benefits: ['Toàn diện các lợi ích', 'Chứng minh độ tin cậy', 'Có thể sử dụng dài hạn'],
    inStock: true,
    article: {
      title: 'Tổ Yến Sào Nguyên Chất - Sự Hoàn Hảo Từ Thiên Nhiên',
      content: [
        'Tổ yến sào nguyên chất là sản phẩm cao cấp nhất, được giữ nguyên hình dạng ban đầu của tổ yến, không qua bất kỳ quá trình chế biến hay tách lọc nào. Mỗi tổ yến đều được chọn lọc kỹ lưỡng từ những hang động tự nhiên tốt nhất.',
        'Sản phẩm này mang lại giá trị dinh dưỡng toàn diện nhất vì giữ nguyên được tất cả các thành phần tự nhiên của yến sào. Tổ yến nguyên chất chứa đầy đủ protein, axit amin, khoáng chất, và các yếu tố vi lượng cần thiết cho cơ thể.',
        'Tổ yến nguyên chất rất phù hợp để làm quà tặng cao cấp cho người thân, đối tác, hoặc sử dụng trong các dịp đặc biệt. Sản phẩm có thể bảo quản lâu dài trong điều kiện khô ráo, thoáng mát.',
        'Chúng tôi cam kết mỗi tổ yến đều được kiểm tra chất lượng nghiêm ngặt, đảm bảo không có tạp chất, không bị ẩm mốc, và có nguồn gốc xuất xứ rõ ràng. Sản phẩm đi kèm với giấy chứng nhận chất lượng và hướng dẫn sử dụng chi tiết.'
      ]
    }
  },
  {
    id: 5,
    name: 'Yến Sào Lá Sơn',
    category: 'leaf-nest',
    price: 1200000,
    originalPrice: 1500000,
    image: sp5,
    rating: 4.7,
    reviews: 56,
    description: 'Yến sào lá sơn, giá hợp lý, chất lượng đảm bảo',
    benefits: ['Chi phí kinh tế', 'Chất lượng ổn định', 'Dễ sử dụng'],
    inStock: true,
    article: {
      title: 'Yến Sào Lá Sơn - Lựa Chọn Thông Minh Cho Mọi Gia Đình',
      content: [
        'Yến sào lá sơn là sản phẩm được nhiều gia đình Việt Nam lựa chọn nhờ giá cả hợp lý nhưng vẫn đảm bảo chất lượng dinh dưỡng cao. Sản phẩm được chế biến từ những tổ yến chất lượng tốt, phù hợp với ngân sách của đại đa số người tiêu dùng.',
        'Mặc dù có giá thành thấp hơn so với các loại yến sào cao cấp khác, yến sào lá sơn vẫn chứa đầy đủ các thành phần dinh dưỡng cần thiết như protein, axit amin, và khoáng chất. Sản phẩm rất phù hợp để sử dụng hàng ngày, giúp duy trì sức khỏe tốt cho cả gia đình.',
        'Yến sào lá sơn dễ chế biến, có thể nấu chè, nấu súp, hoặc chưng với đường phèn. Sản phẩm được đóng gói tiện lợi, dễ bảo quản, và có hạn sử dụng lâu dài.',
        'Chúng tôi cam kết chất lượng sản phẩm luôn ổn định, không vì giá cả mà giảm chất lượng. Mỗi lô hàng đều được kiểm tra kỹ lưỡng để đảm bảo an toàn vệ sinh thực phẩm và giá trị dinh dưỡng.'
      ]
    }
  },
  {
    id: 6,
    name: 'Yến Sào Siêu Cao Cấp VIP',
    category: 'vip-nest',
    price: 8000000,
    originalPrice: 10000000,
    image: sp1,
    rating: 5.0,
    reviews: 15,
    description: 'Yến sào VIP, dành riêng cho khách hàng quý hiếm, sản xuất hạn chế',
    benefits: ['Nguyên chất 100%', 'Độ ưu tú cao nhất', 'Là quà tặng lý tưởng'],
    inStock: false,
    article: {
      title: 'Yến Sào VIP - Đỉnh Cao Của Sự Hoàn Hảo',
      content: [
        'Yến sào VIP là dòng sản phẩm cao cấp nhất của chúng tôi, được tuyển chọn từ những tổ yến đẹp nhất, chất lượng tốt nhất, chỉ chiếm khoảng 1-2% tổng sản lượng. Mỗi tổ yến VIP đều được chọn lọc thủ công bởi các chuyên gia giàu kinh nghiệm.',
        'Sản phẩm này được khai thác từ các hang động tự nhiên tại Khánh Hòa - nơi có điều kiện khí hậu và địa chất lý tưởng nhất cho chim yến sinh sống. Quy trình khai thác và chế biến được thực hiện hoàn toàn thủ công, đảm bảo giữ nguyên được tất cả giá trị dinh dưỡng.',
        'Yến sào VIP không chỉ có giá trị dinh dưỡng cao nhất mà còn là biểu tượng của sự sang trọng và đẳng cấp. Sản phẩm thường được chọn làm quà tặng trong các dịp đặc biệt, hoặc sử dụng bởi những khách hàng có yêu cầu cao về chất lượng.',
        'Do tính quý hiếm và quy trình sản xuất đặc biệt, yến sào VIP có số lượng rất hạn chế. Chúng tôi chỉ sản xuất theo đơn đặt hàng và cam kết mỗi sản phẩm đều được đóng gói sang trọng, kèm theo giấy chứng nhận chất lượng và nguồn gốc xuất xứ.'
      ]
    }
  },
];

export const features = [
  {
    id: 1,
    icon: '🏆',
    title: '100% Tự Nhiên',
    description: 'Yến sào nguyên chất không pha trộn hóa chất, bảo vệ sức khỏe gia đình bạn',
  },
  {
    id: 2,
    icon: '🚚',
    title: 'Giao Hàng Toàn Quốc',
    description: 'Miễn phí giao hàng cho đơn từ 1 triệu đồng, đóng gói an toàn',
  },
  {
    id: 3,
    icon: '🛡️',
    title: 'Bảo Hành Chất Lượng',
    description: 'Đảm bảo 100% chính hãng, nếu không hài lòng hoàn tiền trong 30 ngày',
  },
  {
    id: 4,
    icon: '💬',
    title: 'Hỗ Trợ 24/7',
    description: 'Đội ngũ chuyên viên sẵn sàng tư vấn và hỗ trợ bạn mọi lúc',
  },
  {
    id: 5,
    icon: '⭐',
    title: 'Đánh Giá Cao',
    description: 'Hơn 1000+ khách hàng hài lòng, đánh giá 4.8/5 sao trên toàn nền tảng',
  },
  {
    id: 6,
    icon: '🎁',
    title: 'Chương Trình Khuyến Mãi',
    description: 'Giảm giá hằng tháng, quà tặng khi mua lô, tích điểm quà lại',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Chị Liên - Hà Nội',
    image: '/images/avatar-1.jpg',
    rating: 5,
    content: 'Yến sào rất tốt, da mình cảm thấy mịn màng và sáng hơn sau 2 tuần sử dụng. Giao hàng nhanh, đóng gói chắc chắn!',
    date: '15/11/2024',
  },
  {
    id: 2,
    name: 'Anh Tuấn - TP.HCM',
    image: '/images/avatar-2.jpg',
    rating: 5,
    content: 'Chất lượng hàng tuyệt vời, giá hợp lý, tư vấn viên rất nhiệt tình. Sẽ tiếp tục ủng hộ bạn!',
    date: '12/11/2024',
  },
  {
    id: 3,
    name: 'Chị Hương - Đà Nẵng',
    image: '/images/avatar-3.jpg',
    rating: 5,
    content: 'Tôi mua yến sào làm quà tặng cho mẹ, mẹ rất vui lòng. Sẽ order thêm cho cả gia đình!',
    date: '08/11/2024',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'Yến sào thích hợp cho ai?',
    answer: 'Yến sào thích hợp cho tất cả mọi người, đặc biệt là phụ nữ, trẻ em, người già, người bị suy nhập, người bệnh hồi phục. Nó giúp tăng cường sức đề kháng, làm đẹp da, hỗ trợ sức khỏe toàn diện.',
  },
  {
    id: 2,
    question: 'Cách sử dụng yến sào đúng cách?',
    answer: 'Ngâm yến sào trong nước sạch từ 30-60 phút, sau đó xấp xỉ 2-3 lần cho nước trong. Đun nước sôi, cho yến vào, nấu ở lửa vừa trong 20-30 phút. Thêm đường, mật ong hoặc bất kỳ gia vị yêu thích.',
  },
  {
    id: 3,
    question: 'Làm sao biết yến sào chính hãng?',
    answer: 'Yến sào chính hãng có mùi hơi cư, không có mùi quá nồng, có thể dãn nở 3-4 lần khi ngâm. Khi nấu sẽ tạo thành một chút nhầy, có vị ngọt nhẹ tự nhiên.',
  },
  {
    id: 4,
    question: 'Giá yến sào ở cơ sở tại sao lại rẻ?',
    answer: 'Chúng tôi bán trực tiếp từ nguồn, không qua trung gian nên giá rẻ hơn. Chúng tôi cũng có chương trình khuyến mãi thường xuyên để giúp khách hàng tiết kiệm.',
  },
  {
    id: 5,
    question: 'Bao lâu thì thấy kết quả?',
    answer: 'Tùy thuộc vào tình trạng sức khỏe của mỗi người. Thường thì sau 2-4 tuần sử dụng đều đặn, bạn sẽ thấy kết quả như da mịn hơn, vẻ mặt sáng hơn, sức khỏe cải thiện.',
  },
];
