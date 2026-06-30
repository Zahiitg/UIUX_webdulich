const toursData = [
  {
    id: 1,
    name: "Khám Phá Gia Lai Huyền Thoại",
    duration: "2 Ngày 1 Đêm",
    durationValue: 2,
    price: 1500000,
    priceNote: "1.500.000đ/người",
    category: ["Thiên nhiên", "Văn hóa"],
    rating: 4.8,
    reviewCount: 342,
    image: "/images/bien_ho_tnnung_1782505155088.png",
    shortDescription: "Chuyến đi 2 ngày 1 đêm khám phá Biển Hồ T'Nưng, Chư Đăng Ya và trải nghiệm văn hóa cồng chiêng.",
    description: "Khám phá vùng đất bazan đỏ Gia Lai với các địa danh nổi tiếng nhất. Thưởng thức không khí trong lành tại Biển Hồ T'Nưng, chinh phục núi lửa Chư Đăng Ya và hòa mình vào đêm hội cồng chiêng Tây Nguyên. Tour trọn gói bao gồm xe đưa đón, khách sạn 3 sao, ăn uống các bữa và hướng dẫn viên nhiệt tình.",
    highlights: [
      "Ngắm hoàng hôn tại Biển Hồ T'Nưng",
      "Chinh phục miệng núi lửa Chư Đăng Ya",
      "Giao lưu cồng chiêng với đồng bào Bahnar",
      "Thưởng thức đặc sản phở khô Gia Lai"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pleiku - Biển Hồ - Cồng Chiêng",
        activities: [
          { time: "08:00", description: "Xe đón khách tại sân bay/khách sạn Pleiku." },
          { time: "09:00", description: "Tham quan Biển Hồ T'Nưng - 'Đôi mắt Pleiku'." },
          { time: "12:00", description: "Ăn trưa đặc sản phở khô Gia Lai." },
          { time: "15:00", description: "Thăm Chùa Minh Thành với kiến trúc Á Đông tuyệt đẹp." },
          { time: "18:00", description: "Ăn tối cơm lam gà nướng và tham gia giao lưu cồng chiêng." }
        ]
      },
      {
        day: 2,
        title: "Chư Đăng Ya - Mua sắm",
        activities: [
          { time: "07:30", description: "Ăn sáng tại khách sạn." },
          { time: "08:30", description: "Khởi hành đi núi lửa Chư Đăng Ya." },
          { time: "12:00", description: "Ăn trưa, nghỉ ngơi." },
          { time: "14:00", description: "Mua sắm đặc sản: Cà phê, bò một nắng, mật ong rừng." },
          { time: "16:00", description: "Tiễn khách ra sân bay. Kết thúc tour." }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Nguyễn Văn A", rating: 5, date: "15/06/2026", comment: "Tour tổ chức rất chuyên nghiệp, hướng dẫn viên nhiệt tình. Cảnh Biển Hồ cực kỳ đẹp." },
      { id: 2, user: "Trần Thị B", rating: 4.5, date: "02/05/2026", comment: "Đồ ăn ngon, đặc biệt là món gà nướng cơm lam. Sẽ giới thiệu cho bạn bè." }
    ]
  },
  {
    id: 2,
    name: "Trekking Vườn Quốc Gia Kon Ka Kinh",
    duration: "3 Ngày 2 Đêm",
    durationValue: 3,
    price: 3200000,
    priceNote: "3.200.000đ/người",
    category: ["Thiên nhiên", "Trekking", "Cắm trại"],
    rating: 4.9,
    reviewCount: 156,
    image: "/images/kon_ka_kinh_1782505306871.png",
    shortDescription: "Hành trình thử thách bản thân với đỉnh núi 1.748m và cắm trại giữa rừng nguyên sinh.",
    description: "Dành cho những người yêu thích mạo hiểm và thiên nhiên hoang dã. Chuyến trekking 3 ngày 2 đêm tại Vườn quốc gia Kon Ka Kinh sẽ đưa bạn xuyên qua những khu rừng nguyên sinh, chiêm ngưỡng hệ sinh thái đa dạng và chinh phục đỉnh núi cao 1.748m. Cắm trại, đốt lửa và ngắm sao đêm giữa rừng già là trải nghiệm khó quên.",
    highlights: [
      "Chinh phục đỉnh Kon Ka Kinh 1.748m",
      "Khám phá thảm thực vật rừng nguyên sinh",
      "Cắm trại và BBQ lửa trại giữa rừng",
      "Cơ hội ngắm loài Voọc chà vá chân xám quý hiếm"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pleiku - Cửa rừng Kon Ka Kinh",
        activities: [
          { time: "07:00", description: "Đón khách, kiểm tra đồ đạc và phổ biến nội quy." },
          { time: "10:00", description: "Đến bìa rừng, bắt đầu hành trình trekking." },
          { time: "12:30", description: "Ăn trưa picnic bên suối." },
          { time: "16:30", description: "Đến bãi cắm trại 1. Hạ trại, nấu ăn." },
          { time: "19:00", description: "Ăn tối BBQ, nghỉ ngơi." }
        ]
      },
      {
        day: 2,
        title: "Chinh phục đỉnh - Cắm trại bãi 2",
        activities: [
          { time: "06:30", description: "Ăn sáng, nhâm nhi cà phê." },
          { time: "08:00", description: "Trekking lên đỉnh Kon Ka Kinh." },
          { time: "11:30", description: "Check-in đỉnh 1.748m, ăn trưa." },
          { time: "14:00", description: "Di chuyển xuống bãi cắm trại 2." },
          { time: "17:00", description: "Hạ trại, chuẩn bị bữa tối." }
        ]
      },
      {
        day: 3,
        title: "Trở về - Kết thúc",
        activities: [
          { time: "07:00", description: "Ăn sáng, dọn dẹp bãi trại." },
          { time: "08:30", description: "Trekking đoạn đường về xuyên rừng tre." },
          { time: "13:00", description: "Ra khỏi cửa rừng, ăn trưa tại nhà hàng địa phương." },
          { time: "16:00", description: "Về lại Pleiku. Kết thúc hành trình." }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Lê Văn C", rating: 5, date: "20/04/2026", comment: "Cảnh rừng rất hùng vĩ. Đội ngũ porter hỗ trợ nhiệt tình, đồ ăn nấu giữa rừng mà rất ngon." },
      { id: 2, user: "Phạm D", rating: 5, date: "10/03/2026", comment: "Trải nghiệm đáng nhớ nhất của tôi. Vừa sức, không quá mệt nhưng cần chuẩn bị giày tốt." }
    ]
  },
  {
    id: 3,
    name: "Food Tour: Khám Phá Ẩm Thực Phố Núi",
    duration: "Trong Ngày",
    durationValue: 1,
    price: 650000,
    priceNote: "650.000đ/người",
    category: ["Ẩm thực", "Cà phê"],
    rating: 4.7,
    reviewCount: 520,
    image: "/images/pleiku_food_street_1782505210206.png",
    shortDescription: "Càn quét các món ngon nổi tiếng nhất Pleiku trong 1 ngày duy nhất.",
    description: "Một ngày trọn vẹn dành cho các tâm hồn ăn uống. Bạn sẽ được thưởng thức từ Phở khô Gia Lai chuẩn vị 2 tô, cà phê muối đặc trưng, cho đến các món ăn tối đậm chất đại ngàn như bò một nắng, lẩu lá rừng. Hướng dẫn viên bản địa sẽ đưa bạn vào những quán ăn ngon nhất, rẻ nhất mà chỉ người dân địa phương mới biết.",
    highlights: [
      "Thưởng thức Phở Khô 2 tô chính gốc",
      "Check-in quán cà phê đẹp nhất Pleiku",
      "Nếm thử đặc sản Bò một nắng chấm muối kiến vàng",
      "Khám phá chợ đêm Pleiku"
    ],
    itinerary: [
      {
        day: 1,
        title: "Càn Quét Phố Núi",
        activities: [
          { time: "08:00", description: "Ăn sáng Phở khô Gia Lai (Quán Ngọc Sơn hoặc Quán Hồng)." },
          { time: "09:30", description: "Thưởng thức cà phê muối tại quán view đồi thông." },
          { time: "12:00", description: "Ăn trưa với Gà nướng cơm lam." },
          { time: "15:00", description: "Ăn vặt: Bún cua thối (món độc lạ, tùy khẩu vị) hoặc chè bà dũ." },
          { time: "18:00", description: "Ăn tối: Lẩu lá rừng và bò một nắng." },
          { time: "20:00", description: "Dạo chợ đêm Pleiku." }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Hoàng T", rating: 4, date: "12/05/2026", comment: "Ăn no căng bụng luôn. Cà phê muối ở đây ngon thật sự." },
      { id: 2, user: "Đinh K", rating: 5, date: "08/02/2026", comment: "Bún cua thối hơi nặng mùi nhưng ăn quen thì rất cuốn. Lẩu lá rừng ngon." }
    ]
  },
  {
    id: 4,
    name: "Nghỉ Dưỡng Cắm Trại Hồ Ayun Hạ",
    duration: "2 Ngày 1 Đêm",
    durationValue: 2,
    price: 1200000,
    priceNote: "1.200.000đ/người",
    category: ["Thiên nhiên", "Cắm trại", "Nghỉ dưỡng"],
    rating: 4.5,
    reviewCount: 215,
    image: "/images/ho_ayun_ha_1782505317015.png",
    shortDescription: "Thư giãn cuối tuần, cắm trại lều Glamping sang chảnh bên bờ hồ yên bình.",
    description: "Rời xa sự xô bồ của thành phố, đến với không gian yên ả tĩnh lặng của Hồ Ayun Hạ. Tour nghỉ dưỡng cắm trại dạng Glamping mang đến cho bạn trải nghiệm gần gũi thiên nhiên nhưng vẫn đảm bảo tiện nghi. Chèo SUP trên hồ, câu cá, BBQ tối và ngắm bầu trời đầy sao là những hoạt động lý tưởng cho gia đình hoặc cặp đôi.",
    highlights: [
      "Ngủ lều Glamping cao cấp, tiện nghi",
      "Chèo SUP trên mặt hồ tĩnh lặng",
      "Tiệc BBQ nướng ngoài trời",
      "Tự do câu cá và ngắm sao đêm"
    ],
    itinerary: [
      {
        day: 1,
        title: "Đón khách - Setup Camp - BBQ",
        activities: [
          { time: "14:00", description: "Xe đón tại Pleiku, di chuyển đi Hồ Ayun Hạ." },
          { time: "15:30", description: "Đến nơi, nhận lều Glamping và nghỉ ngơi." },
          { time: "16:00", description: "Tham gia các hoạt động: Chèo SUP, bơi lội hoặc câu cá." },
          { time: "18:30", description: "Tiệc BBQ hải sản và thịt nướng bên bờ hồ." },
          { time: "20:30", description: "Đốt lửa trại, ngắm sao và thưởng thức đồ uống." }
        ]
      },
      {
        day: 2,
        title: "Bình minh trên hồ - Trở về",
        activities: [
          { time: "06:00", description: "Thức dậy sớm đón bình minh, chụp ảnh." },
          { time: "07:30", description: "Ăn sáng nhẹ, uống cà phê." },
          { time: "09:00", description: "Tự do dạo chơi hoặc thư giãn tại lều." },
          { time: "11:00", description: "Dọn đồ, thu dọn lều." },
          { time: "11:30", description: "Xe đưa về lại Pleiku. Tạm biệt." }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Gia đình chị H", rating: 5, date: "10/06/2026", comment: "Lều rất sạch sẽ, nệm êm. Bữa tối BBQ chuẩn bị rất chu đáo và nhiều đồ ăn." },
      { id: 2, user: "Tuấn Anh", rating: 4, date: "25/03/2026", comment: "Chỗ này chill thực sự. Đáng tiền để đi xả stress cuối tuần." }
    ]
  },
  {
    id: 5,
    name: "Thác Phú Cường & Làng Cổ Stơr",
    duration: "Trong Ngày",
    durationValue: 1,
    price: 850000,
    priceNote: "850.000đ/người",
    category: ["Thiên nhiên", "Văn hóa", "Check-in"],
    rating: 4.6,
    reviewCount: 412,
    image: "/images/thac_phu_cuong_1782505250630.png",
    shortDescription: "Kết hợp tham quan thác nước hùng vĩ nhất Gia Lai và làng văn hóa lịch sử.",
    description: "Một hành trình kết hợp hài hòa giữa vẻ đẹp thiên nhiên hùng vĩ của Thác Phú Cường và những giá trị lịch sử, văn hóa sâu sắc tại làng cổ Stơr. Bạn sẽ được chiêm ngưỡng dòng thác cuồn cuộn đổ từ độ cao 45m và tìm hiểu về cuộc đời Anh hùng Núp, tham quan nhà rông truyền thống của người Bahnar.",
    highlights: [
      "Check-in Thác Phú Cường hùng vĩ",
      "Tìm hiểu lịch sử tại Làng kháng chiến Stơr",
      "Thăm nhà Rông truyền thống",
      "Thưởng thức rượu cần bản địa"
    ],
    itinerary: [
      {
        day: 1,
        title: "Khám Phá Thiên Nhiên & Lịch Sử",
        activities: [
          { time: "07:30", description: "Khởi hành từ TP. Pleiku." },
          { time: "08:30", description: "Đến Thác Phú Cường, đi dạo dưới tán rừng, chụp ảnh bên thác nước." },
          { time: "11:30", description: "Ăn trưa tại nhà hàng địa phương." },
          { time: "13:30", description: "Di chuyển đến làng cổ Stơr." },
          { time: "14:30", description: "Tham quan nhà lưu niệm Anh hùng Núp, nhà rông." },
          { time: "16:00", description: "Giao lưu nhẹ với người dân, thử rượu cần." },
          { time: "17:30", description: "Lên xe trở về Pleiku." }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Cô Mai", rating: 4.5, date: "05/01/2026", comment: "Chuyến đi rất ý nghĩa cho những ai thích tìm hiểu lịch sử. Thác nước to và đẹp." },
      { id: 2, user: "Long NV", rating: 4, date: "18/12/2025", comment: "Lịch trình hợp lý, đi không bị mệt. Rượu cần uống khá êm." }
    ]
  }
];

export const CATEGORY_CONFIG = {
  'Tất cả': { icon: '🗺️', gradient: 'from-primary-500 to-primary-700' },
  'Thiên nhiên': { icon: '🌿', gradient: 'from-green-500 to-emerald-600' },
  'Văn hóa': { icon: '🏛️', gradient: 'from-purple-500 to-indigo-600' },
  'Ẩm thực': { icon: '🍜', gradient: 'from-orange-500 to-red-500' },
  'Check-in': { icon: '📸', gradient: 'from-pink-500 to-rose-500' },
  'Trekking': { icon: '🥾', gradient: 'from-amber-500 to-orange-600' },
  'Cắm trại': { icon: '⛺', gradient: 'from-teal-400 to-cyan-600' },
  'Nghỉ dưỡng': { icon: '🏖️', gradient: 'from-sky-400 to-blue-500' },
  'Cà phê': { icon: '☕', gradient: 'from-yellow-700 to-amber-900' },
};

export default toursData;
