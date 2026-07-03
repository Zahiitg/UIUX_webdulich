const toursData = [
  {
    id: 1,
    name: {
      vi: "Khám Phá Gia Lai Huyền Thoại",
      en: "Explore Legendary Gia Lai"
    },
    duration: {
      vi: "2 Ngày 1 Đêm",
      en: "2 Days 1 Night"
    },
    durationValue: 2,
    price: 1500000,
    priceNote: {
      vi: "1.500.000đ/người",
      en: "1,500,000 VND/person"
    },
    category: {
      vi: ["Thiên nhiên", "Văn hóa"],
      en: ["Nature", "Culture"]
    },
    rating: 4.8,
    reviewCount: 342,
    image: "/images/bien_ho_tnnung_1782505155088.png",
    shortDescription: {
      vi: "Chuyến đi 2 ngày 1 đêm khám phá Biển Hồ T'Nưng, Chư Đăng Ya và trải nghiệm văn hóa cồng chiêng.",
      en: "A 2-day, 1-night trip exploring T'Nung Lake, Chu Dang Ya, and experiencing Gong culture."
    },
    description: {
      vi: "Khám phá vùng đất bazan đỏ Gia Lai với các địa danh nổi tiếng nhất. Thưởng thức không khí trong lành tại Biển Hồ T'Nưng, chinh phục núi lửa Chư Đăng Ya và hòa mình vào đêm hội cồng chiêng Tây Nguyên. Tour trọn gói bao gồm xe đưa đón, khách sạn 3 sao, ăn uống các bữa và hướng dẫn viên nhiệt tình.",
      en: "Explore the red basalt land of Gia Lai with its most famous landmarks. Enjoy the fresh air at T'Nung Lake, conquer the Chu Dang Ya volcano, and immerse yourself in the Central Highlands Gong festival night. The all-inclusive tour includes transportation, a 3-star hotel, all meals, and an enthusiastic guide."
    },
    highlights: {
      vi: [
        "Ngắm hoàng hôn tại Biển Hồ T'Nưng",
        "Chinh phục miệng núi lửa Chư Đăng Ya",
        "Giao lưu cồng chiêng với đồng bào Bahnar",
        "Thưởng thức đặc sản phở khô Gia Lai"
      ],
      en: [
        "Watch the sunset at T'Nung Lake",
        "Conquer the crater of Chu Dang Ya volcano",
        "Interact with Bahnar people's Gong culture",
        "Enjoy Gia Lai's dry pho specialty"
      ]
    },
    itinerary: {
      vi: [
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
      en: [
        {
          day: 1,
          title: "Pleiku - T'Nung Lake - Gong Culture",
          activities: [
            { time: "08:00", description: "Pick up guests at Pleiku airport/hotel." },
            { time: "09:00", description: "Visit T'Nung Lake - 'The Eyes of Pleiku'." },
            { time: "12:00", description: "Lunch with Gia Lai dry pho specialty." },
            { time: "15:00", description: "Visit Minh Thanh Pagoda with beautiful Asian architecture." },
            { time: "18:00", description: "Dinner with bamboo-tube rice and grilled chicken, and join the Gong cultural exchange." }
          ]
        },
        {
          day: 2,
          title: "Chu Dang Ya - Shopping",
          activities: [
            { time: "07:30", description: "Breakfast at the hotel." },
            { time: "08:30", description: "Depart for Chu Dang Ya volcano." },
            { time: "12:00", description: "Lunch and rest." },
            { time: "14:00", description: "Shop for specialties: Coffee, sun-dried beef, wild honey." },
            { time: "16:00", description: "Transfer guests to the airport. End of tour." }
          ]
        }
      ]
    },
    reviews: [
      { id: 1, user: "Nguyễn Văn A", rating: 5, date: "15/06/2026", comment: "Tour tổ chức rất chuyên nghiệp, hướng dẫn viên nhiệt tình. Cảnh Biển Hồ cực kỳ đẹp." },
      { id: 2, user: "Trần Thị B", rating: 4.5, date: "02/05/2026", comment: "Đồ ăn ngon, đặc biệt là món gà nướng cơm lam. Sẽ giới thiệu cho bạn bè." }
    ]
  },
  {
    id: 2,
    name: {
      vi: "Trekking Vườn Quốc Gia Kon Ka Kinh",
      en: "Trekking Kon Ka Kinh National Park"
    },
    duration: {
      vi: "3 Ngày 2 Đêm",
      en: "3 Days 2 Nights"
    },
    durationValue: 3,
    price: 3200000,
    priceNote: {
      vi: "3.200.000đ/người",
      en: "3,200,000 VND/person"
    },
    category: {
      vi: ["Thiên nhiên", "Trekking", "Cắm trại"],
      en: ["Nature", "Trekking", "Camping"]
    },
    rating: 4.9,
    reviewCount: 156,
    image: "/images/kon_ka_kinh_1782505306871.png",
    shortDescription: {
      vi: "Thử thách bản thân với cung đường trekking xuyên rừng nguyên sinh, cắm trại qua đêm và ngắm bình minh trên đỉnh núi.",
      en: "Challenge yourself with a trekking route through primeval forests, camp overnight, and watch the sunrise from the mountain peak."
    },
    description: {
      vi: "Hành trình dành cho những người yêu thích mạo hiểm và thiên nhiên hoang dã. Vườn Quốc Gia Kon Ka Kinh được mệnh danh là 'Nóc nhà của Gia Lai'. Bạn sẽ được băng qua những con suối trong vắt, khám phá hệ động thực vật phong phú, và trải nghiệm cắm trại giữa rừng sâu.",
      en: "A journey for adventure and wildlife lovers. Kon Ka Kinh National Park is known as the 'Roof of Gia Lai'. You will cross crystal-clear streams, explore rich flora and fauna, and experience camping deep in the forest."
    },
    highlights: {
      vi: [
        "Trekking xuyên rừng nguyên sinh",
        "Cắm trại và tiệc BBQ giữa rừng",
        "Ngắm bình minh trên đỉnh Kon Ka Kinh",
        "Tắm suối tự nhiên"
      ],
      en: [
        "Trekking through primeval forests",
        "Camping and BBQ party in the forest",
        "Watching the sunrise on Kon Ka Kinh peak",
        "Bathing in natural streams"
      ]
    },
    itinerary: {
      vi: [
        {
          day: 1,
          title: "Pleiku - Cửa rừng Kon Ka Kinh",
          activities: [
            { time: "07:00", description: "Tập trung tại Pleiku, phổ biến nội quy an toàn." },
            { time: "09:00", description: "Bắt đầu trekking từ cửa rừng." },
            { time: "12:00", description: "Ăn trưa dã chiến dọc đường." },
            { time: "16:00", description: "Đến bãi cắm trại, dựng lều, tắm suối." },
            { time: "18:30", description: "Tiệc BBQ nướng thịt, giao lưu quanh lửa trại." }
          ]
        },
        {
          day: 2,
          title: "Chinh phục đỉnh núi",
          activities: [
            { time: "05:00", description: "Dậy sớm trekking lên đỉnh ngắm bình minh." },
            { time: "08:00", description: "Ăn sáng tại đỉnh núi, chụp ảnh." },
            { time: "10:00", description: "Bắt đầu hành trình xuống núi theo đường khác." },
            { time: "17:00", description: "Ra khỏi rừng, xe đón về Pleiku." }
          ]
        }
      ],
      en: [
        {
          day: 1,
          title: "Pleiku - Kon Ka Kinh Forest Entrance",
          activities: [
            { time: "07:00", description: "Gather in Pleiku, safety briefing." },
            { time: "09:00", description: "Start trekking from the forest entrance." },
            { time: "12:00", description: "Field lunch along the way." },
            { time: "16:00", description: "Arrive at the campsite, pitch tents, stream bathing." },
            { time: "18:30", description: "BBQ party, mingle around the campfire." }
          ]
        },
        {
          day: 2,
          title: "Conquering the Peak",
          activities: [
            { time: "05:00", description: "Wake up early, trek to the peak for sunrise." },
            { time: "08:00", description: "Breakfast at the peak, take photos." },
            { time: "10:00", description: "Start descending via a different route." },
            { time: "17:00", description: "Exit the forest, transfer back to Pleiku." }
          ]
        }
      ]
    },
    reviews: [
      { id: 1, user: "Lê C", rating: 5, date: "10/05/2026", comment: "Cung đường khá thử thách nhưng rất xứng đáng. Hướng dẫn viên và porter rất chu đáo." }
    ]
  },
  {
    id: 3,
    name: {
      vi: "Khám Phá Văn Hóa Cà Phê Gia Lai",
      en: "Discover Gia Lai Coffee Culture"
    },
    duration: {
      vi: "1 Ngày",
      en: "1 Day"
    },
    durationValue: 1,
    price: 850000,
    priceNote: {
      vi: "850.000đ/người",
      en: "850,000 VND/person"
    },
    category: {
      vi: ["Văn hóa", "Ẩm thực", "Cà phê"],
      en: ["Culture", "Food", "Coffee"]
    },
    rating: 4.7,
    reviewCount: 215,
    image: "/images/doi_che_gia_lai_1782505177095.png",
    shortDescription: {
      vi: "Trải nghiệm một ngày làm nông dân trồng cà phê, tự tay rang xay và thưởng thức ly cà phê đậm vị Tây Nguyên.",
      en: "Experience a day as a coffee farmer, roast your own beans, and enjoy a rich cup of Central Highlands coffee."
    },
    description: {
      vi: "Gia Lai nổi tiếng với những rẫy cà phê bạt ngàn. Trong tour này, bạn sẽ được đưa đến các đồn điền cà phê lâu đời, tìm hiểu quy trình trồng trọt, thu hoạch, chế biến. Đặc biệt, bạn sẽ được tự tay thực hiện công đoạn rang, xay và pha chế một ly cà phê chuẩn vị để thưởng thức giữa không gian đồi chè, đồn điền xanh mướt.",
      en: "Gia Lai is famous for its endless coffee plantations. In this tour, you will visit old coffee estates, learn about the cultivation, harvesting, and processing procedures. Especially, you will hand-roast, grind, and brew a perfect cup of coffee to enjoy amidst the lush green tea hills and plantations."
    },
    highlights: {
      vi: [
        "Thăm đồn điền cà phê và đồi chè Biển Hồ",
        "Trải nghiệm hái cà phê (vào mùa vụ)",
        "Học cách rang xay và pha chế cà phê thủ công",
        "Thưởng thức cà phê giữa thiên nhiên"
      ],
      en: [
        "Visit coffee plantations and Bien Ho tea hills",
        "Experience coffee picking (in season)",
        "Learn manual coffee roasting and brewing",
        "Enjoy coffee amidst nature"
      ]
    },
    itinerary: {
      vi: [
        {
          day: 1,
          title: "Đồi Chè - Đồn Điền Cà Phê",
          activities: [
            { time: "08:00", description: "Đón khách, di chuyển đến Đồi chè Biển Hồ." },
            { time: "09:30", description: "Tham quan đồn điền cà phê cổ, nghe kể chuyện lịch sử." },
            { time: "11:30", description: "Ăn trưa tại nông trại." },
            { time: "13:30", description: "Tham gia workshop: Phân biệt các loại hạt, tự tay rang xay cà phê." },
            { time: "16:00", description: "Thưởng thức thành quả, mua sắm quà lưu niệm." }
          ]
        }
      ],
      en: [
        {
          day: 1,
          title: "Tea Hills - Coffee Plantation",
          activities: [
            { time: "08:00", description: "Pick up guests, transfer to Bien Ho Tea Hills." },
            { time: "09:30", description: "Visit an ancient coffee plantation, listen to historical stories." },
            { time: "11:30", description: "Lunch at the farm." },
            { time: "13:30", description: "Join a workshop: Distinguish beans, hand-roast coffee." },
            { time: "16:00", description: "Enjoy the fruits of your labor, shop for souvenirs." }
          ]
        }
      ]
    },
    reviews: [
      { id: 1, user: "Phạm D", rating: 5, date: "20/04/2026", comment: "Rất thú vị! Lần đầu tiên biết quy trình làm ra một ly cà phê kỳ công như thế nào." }
    ]
  },
  {
    "id": 2,
    "name": {
      "vi": "Khám Phá Thiên Đường Đảo Cù Lao Xanh",
      "en": "Explore Cu Lao Xanh Island Paradise"
    },
    "duration": {
      "vi": "1 Ngày",
      "en": "1 Day"
    },
    "durationValue": 1,
    "price": 750000,
    "priceNote": {
      "vi": "750.000đ/người",
      "en": "750,000 VND/person"
    },
    "category": {
      "vi": [
        "Khám phá đảo",
        "Lặn ngắm san hô"
      ],
      "en": [
        "Island Exploration",
        "Coral Diving"
      ]
    },
    "rating": 4.9,
    "reviewCount": 842,
    "image": "/images/cu_lao_xanh_1782812499387.png",
    "shortDescription": {
      "vi": "Hành trình ra khơi khám phá hòn ngọc thanh bình Cù Lao Xanh.",
      "en": "A journey to sea to explore the peaceful pearl Cu Lao Xanh."
    },
    "description": {
      "vi": "Trải nghiệm đi cano cao tốc ra đảo, lặn ngắm san hô, thưởng thức hải sản tươi sống và check-in ngọn hải đăng trăm tuổi.",
      "en": "Experience riding a speedboat to the island, diving to see coral, enjoying fresh seafood and checking in at the hundred-year-old lighthouse."
    },
    "highlights": {
      "vi": [
        "Đi cano cao tốc",
        "Lặn ngắm san hô",
        "Hải đăng cổ"
      ],
      "en": [
        "Speedboat ride",
        "Coral diving",
        "Ancient lighthouse"
      ]
    },
    "itinerary": {
      "vi": [
        {
          "day": 1,
          "title": "Quy Nhơn - Cù Lao Xanh",
          "activities": [
            {
              "time": "07:30",
              "description": "Đón khách ra bến tàu."
            }
          ]
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Quy Nhon - Cu Lao Xanh",
          "activities": [
            {
              "time": "07:30",
              "description": "Pick up guests to the pier."
            }
          ]
        }
      ]
    },
    "reviews": []
  },
  {
    "id": 3,
    "name": {
      "vi": "Kỳ Co - Eo Gió Trọn Gói",
      "en": "Ky Co - Eo Gio All-inclusive"
    },
    "duration": {
      "vi": "1 Ngày",
      "en": "1 Day"
    },
    "durationValue": 1,
    "price": 650000,
    "priceNote": {
      "vi": "650.000đ/người",
      "en": "650,000 VND/person"
    },
    "category": {
      "vi": [
        "Biển",
        "Check-in"
      ],
      "en": [
        "Beach",
        "Check-in"
      ]
    },
    "rating": 4.8,
    "reviewCount": 1250,
    "image": "/images/ky_co_beach_1782812243763.png",
    "shortDescription": {
      "vi": "Tour phổ biến nhất Quy Nhơn khám phá 'Maldives Việt Nam'.",
      "en": "The most popular tour in Quy Nhon to explore 'Maldives of Vietnam'."
    },
    "description": {
      "vi": "Tour tham quan Kỳ Co - Eo Gió với cano, bữa trưa hải sản 7 món và xe đưa đón tận nơi.",
      "en": "Ky Co - Eo Gio tour with canoe, 7-course seafood lunch and door-to-door transfer."
    },
    "highlights": {
      "vi": [
        "Check-in Kỳ Co",
        "Ăn hải sản",
        "Ngắm cảnh Eo Gió"
      ],
      "en": [
        "Check-in Ky Co",
        "Eat seafood",
        "Sightseeing at Eo Gio"
      ]
    },
    "itinerary": {
      "vi": [
        {
          "day": 1,
          "title": "Kỳ Co - Eo Gió",
          "activities": [
            {
              "time": "08:00",
              "description": "Bắt đầu tour."
            }
          ]
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Ky Co - Eo Gio",
          "activities": [
            {
              "time": "08:00",
              "description": "Start the tour."
            }
          ]
        }
      ]
    },
    "reviews": []
  },
  {
    "id": 4,
    "name": {
      "vi": "Trekking Vườn Quốc Gia Kon Ka Kinh",
      "en": "Trekking Kon Ka Kinh National Park"
    },
    "duration": {
      "vi": "2 Ngày 1 Đêm",
      "en": "2 Days 1 Night"
    },
    "durationValue": 2,
    "price": 1800000,
    "priceNote": {
      "vi": "1.800.000đ/người",
      "en": "1,800,000 VND/person"
    },
    "category": {
      "vi": [
        "Trekking",
        "Cắm trại"
      ],
      "en": [
        "Trekking",
        "Camping"
      ]
    },
    "rating": 4.7,
    "reviewCount": 310,
    "image": "/images/kon_ka_kinh_1782505306871.png",
    "shortDescription": {
      "vi": "Thử thách giới hạn bản thân với cung đường trekking rừng nhiệt đới.",
      "en": "Challenge your limits with a tropical forest trekking route."
    },
    "description": {
      "vi": "Hành trình băng rừng, vượt suối, cắm trại qua đêm giữa rừng già Kon Ka Kinh hùng vĩ.",
      "en": "A journey through the forest, crossing streams, and camping overnight in the majestic Kon Ka Kinh old forest."
    },
    "highlights": {
      "vi": [
        "Băng rừng nguyên sinh",
        "Cắm trại lửa hồng",
        "Khám phá thiên nhiên"
      ],
      "en": [
        "Trek primeval forest",
        "Campfire",
        "Discover nature"
      ]
    },
    "itinerary": {
      "vi": [
        {
          "day": 1,
          "title": "Bắt đầu Trekking",
          "activities": [
            {
              "time": "07:00",
              "description": "Xuất phát."
            }
          ]
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Start Trekking",
          "activities": [
            {
              "time": "07:00",
              "description": "Depart."
            }
          ]
        }
      ]
    },
    "reviews": []
  },
  {
    "id": 5,
    "name": {
      "vi": "Camping Thung Lũng Trung Lương",
      "en": "Camping at Trung Luong Valley"
    },
    "duration": {
      "vi": "2 Ngày 1 Đêm",
      "en": "2 Days 1 Night"
    },
    "durationValue": 2,
    "price": 850000,
    "priceNote": {
      "vi": "850.000đ/người",
      "en": "850,000 VND/person"
    },
    "category": {
      "vi": [
        "Cắm trại ven biển",
        "Nghỉ dưỡng"
      ],
      "en": [
        "Beach Camping",
        "Relaxation"
      ]
    },
    "rating": 4.6,
    "reviewCount": 620,
    "image": "/images/trung_luong_camp_1782812263702.png",
    "shortDescription": {
      "vi": "Ngủ lều ven biển, BBQ hải sản và tiệc lửa trại.",
      "en": "Sleep in a tent by the sea, seafood BBQ and campfire party."
    },
    "description": {
      "vi": "Trải nghiệm cắm trại cực chill tại thung lũng Trung Lương với mọi trang thiết bị được chuẩn bị sẵn.",
      "en": "A very chill camping experience at Trung Luong valley with all equipment prepared."
    },
    "highlights": {
      "vi": [
        "BBQ tối",
        "Ngắm sao biển",
        "Check-in sống ảo"
      ],
      "en": [
        "Dinner BBQ",
        "Stargazing",
        "Check-in photos"
      ]
    },
    "itinerary": {
      "vi": [
        {
          "day": 1,
          "title": "Cắm trại đêm",
          "activities": [
            {
              "time": "15:00",
              "description": "Nhận lều."
            }
          ]
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Night camping",
          "activities": [
            {
              "time": "15:00",
              "description": "Check-in tent."
            }
          ]
        }
      ]
    },
    "reviews": []
  },
  {
    "id": 6,
    "name": {
      "vi": "City Tour Gia Lai - Hương Vị Phố Núi",
      "en": "Gia Lai City Tour - Mountain Flavors"
    },
    "duration": {
      "vi": "1 Ngày",
      "en": "1 Day"
    },
    "durationValue": 1,
    "price": 450000,
    "priceNote": {
      "vi": "450.000đ/người",
      "en": "450,000 VND/person"
    },
    "category": {
      "vi": [
        "Ẩm thực",
        "Check-in"
      ],
      "en": [
        "Food",
        "Check-in"
      ]
    },
    "rating": 4.8,
    "reviewCount": 1100,
    "image": "/images/pleiku_food_street_1782505210206.png",
    "shortDescription": {
      "vi": "Khám phá ẩm thực đường phố và các quán cà phê độc đáo tại Pleiku.",
      "en": "Explore street food and unique cafes in Pleiku."
    },
    "description": {
      "vi": "Thưởng thức Phở Khô Gia Lai, cà phê view đồi núi, thăm Chùa Minh Thành.",
      "en": "Enjoy Gia Lai Dry Pho, mountain view coffee, visit Minh Thanh Pagoda."
    },
    "highlights": {
      "vi": [
        "Ăn sập Pleiku",
        "Cà phê view xịn",
        "Chùa Minh Thành"
      ],
      "en": [
        "Eat around Pleiku",
        "Great view coffee",
        "Minh Thanh Pagoda"
      ]
    },
    "itinerary": {
      "vi": [
        {
          "day": 1,
          "title": "Food Tour",
          "activities": [
            {
              "time": "08:00",
              "description": "Ăn sáng Phở Khô."
            }
          ]
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Food Tour",
          "activities": [
            {
              "time": "08:00",
              "description": "Breakfast Dry Pho."
            }
          ]
        }
      ]
    },
    "reviews": []
  },
  {
    "id": 7,
    "name": {
      "vi": "Gia Lai - Mùa Hoa Dã Quỳ Chư Đăng Ya",
      "en": "Gia Lai - Chu Dang Ya Wild Sunflower Season"
    },
    "duration": {
      "vi": "1 Ngày",
      "en": "1 Day"
    },
    "durationValue": 1,
    "price": 550000,
    "priceNote": {
      "vi": "550.000đ/người",
      "en": "550,000 VND/person"
    },
    "category": {
      "vi": [
        "Thiên nhiên",
        "Check-in"
      ],
      "en": [
        "Nature",
        "Check-in"
      ]
    },
    "rating": 4.9,
    "reviewCount": 2300,
    "image": "/images/chu_dang_ya_volcano_1782505165301.png",
    "shortDescription": {
      "vi": "Đắm chìm trong sắc vàng rực rỡ của hoa dã quỳ trên sườn núi lửa.",
      "en": "Immerse in the brilliant yellow of wild sunflowers on the volcano slopes."
    },
    "description": {
      "vi": "Tour theo mùa (Tháng 10 - 11). Tham quan lễ hội hoa dã quỳ tại Chư Đăng Ya và check-in hàng thông trăm tuổi.",
      "en": "Seasonal tour (Oct - Nov). Visit the wild sunflower festival at Chu Dang Ya and check-in the century-old pine row."
    },
    "highlights": {
      "vi": [
        "Lễ hội hoa dã quỳ",
        "Hàng thông trăm tuổi",
        "Chụp ảnh nghệ thuật"
      ],
      "en": [
        "Wild sunflower festival",
        "Century-old pine row",
        "Art photography"
      ]
    },
    "itinerary": {
      "vi": [
        {
          "day": 1,
          "title": "Ngắm Hoa Dã Quỳ",
          "activities": [
            {
              "time": "08:00",
              "description": "Đến Chư Đăng Ya."
            }
          ]
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Watch Wild Sunflowers",
          "activities": [
            {
              "time": "08:00",
              "description": "Arrive at Chu Dang Ya."
            }
          ]
        }
      ]
    },
    "reviews": []
  }
];

export const CATEGORY_CONFIG = {
  'Tất cả': { icon: '📍', gradient: 'from-primary-500 to-primary-700' },
  'Biển': { icon: '🌊', gradient: 'from-blue-500 to-cyan-600' },
  'Hải sản': { icon: '🦀', gradient: 'from-red-500 to-rose-600' },
  'Lặn ngắm san hô': { icon: '🤿', gradient: 'from-cyan-400 to-blue-500' },
  'Khám phá đảo': { icon: '🏝️', gradient: 'from-emerald-400 to-teal-500' },
  'Nghỉ dưỡng biển': { icon: '🏖️', gradient: 'from-sky-400 to-blue-600' },
  'Vui chơi giải trí': { icon: '🎡', gradient: 'from-fuchsia-400 to-purple-500' },
  'Cắm trại ven biển': { icon: '⛺', gradient: 'from-cyan-500 to-teal-500' },
  'Thiên nhiên': { icon: '🌿', gradient: 'from-green-500 to-emerald-600' },
  'Văn hóa': { icon: '🏛️', gradient: 'from-purple-500 to-indigo-600' },
  'Ẩm thực': { icon: '🍜', gradient: 'from-orange-500 to-red-500' },
  'Check-in': { icon: '📸', gradient: 'from-pink-500 to-rose-500' },
  'Trekking': { icon: '🥾', gradient: 'from-amber-500 to-orange-600' },
  'Cắm trại': { icon: '⛺', gradient: 'from-teal-400 to-cyan-600' },
  'Nghỉ dưỡng': { icon: '🏖️', gradient: 'from-sky-400 to-blue-500' },
  'Cà phê': { icon: '☕', gradient: 'from-yellow-700 to-amber-900' },
  'Gia đình có trẻ em': { icon: '👨‍👩‍👧‍👦', gradient: 'from-lime-400 to-green-500' },
};

export default toursData;
