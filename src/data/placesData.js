const placesData = [
  {
    id: 1,
    name: {
      vi: "Biển Hồ T'Nưng",
      en: "T'Nung Lake (Bien Ho)"
    },
    description: {
      vi: "Biển Hồ T'Nưng (hay còn gọi là Hồ T'Nưng) là hồ nước ngọt tự nhiên lớn nhất Tây Nguyên, nằm cách trung tâm thành phố Pleiku khoảng 7km về phía Bắc. Hồ được hình thành từ miệng núi lửa đã tắt hàng triệu năm, có diện tích mặt nước khoảng 230 ha. Quanh hồ là rừng thông xanh mướt, tạo nên khung cảnh thơ mộng và yên bình. Đây là biểu tượng du lịch của Gia Lai và là địa điểm check-in không thể bỏ qua.",
      en: "T'Nung Lake is the largest natural freshwater lake in the Central Highlands, located about 7km north of Pleiku city center. The lake was formed from an extinct volcanic crater millions of years ago, with a water surface area of about 230 hectares. Surrounding the lake is a lush green pine forest, creating a poetic and peaceful scenery. This is the tourism symbol of Gia Lai and a must-visit check-in spot."
    },
    shortDescription: {
      vi: "Hồ nước ngọt tự nhiên lớn nhất Tây Nguyên, hình thành từ miệng núi lửa.",
      en: "The largest natural freshwater lake in the Central Highlands, formed from a volcanic crater."
    },
    category: {
      vi: ["Thiên nhiên", "Check-in"],
      en: ["Nature", "Check-in"]
    },
    rating: 4.7,
    reviewCount: 2340,
    price: 0,
    priceNote: {
      vi: "Miễn phí",
      en: "Free"
    },
    openTime: "06:00",
    closeTime: "18:00",
    duration: {
      vi: "1-2 giờ",
      en: "1-2 hours"
    },
    address: {
      vi: "Xã Biển Hồ, TP. Pleiku, Gia Lai",
      en: "Bien Ho Commune, Pleiku City, Gia Lai"
    },
    lat: 14.0167,
    lng: 108.0000,
    image: "/images/bien_ho_tnnung_1782505155088.png",
    tags: {
      vi: ["Thiên nhiên", "Miễn phí", "Check-in"],
      en: ["Nature", "Free", "Check-in"]
    },
    highlights: {
      vi: ["Cảnh hoàng hôn tuyệt đẹp", "Rừng thông quanh hồ", "Câu cá thư giãn"],
      en: ["Beautiful sunset view", "Pine forest around the lake", "Relaxing fishing"]
    }
  },
  {
    id: 2,
    name: {
      vi: "Núi lửa Chư Đăng Ya",
      en: "Chu Dang Ya Volcano"
    },
    description: {
      vi: "Núi lửa Chư Đăng Ya nằm ở xã Chư Đăng Ya, huyện Chư Păh, cách TP. Pleiku khoảng 30km. Đây là ngọn núi lửa đã tắt từ hàng triệu năm trước, với miệng núi lửa hình phễu đường kính khoảng 600m. Mùa hoa dã quỳ (tháng 11-12), toàn bộ sườn núi phủ một màu vàng rực rỡ, tạo nên cảnh quan đẹp mê hồn. Từ đỉnh núi có thể ngắm toàn cảnh thung lũng và những buôn làng Tây Nguyên.",
      en: "Chu Dang Ya Volcano is located in Chu Dang Ya commune, Chu Pah district, about 30km from Pleiku City. This is an extinct volcano from millions of years ago, with a funnel-shaped crater about 600m in diameter. During the wild sunflower season (November-December), the entire mountainside is covered in a brilliant yellow, creating a mesmerizing landscape. From the mountain peak, you can see the panoramic view of the valley and Central Highlands villages."
    },
    shortDescription: {
      vi: "Miệng núi lửa triệu năm với thảm hoa dã quỳ vàng rực.",
      en: "A million-year-old volcanic crater with a vibrant yellow wild sunflower carpet."
    },
    category: {
      vi: ["Thiên nhiên", "Trekking", "Check-in"],
      en: ["Nature", "Trekking", "Check-in"]
    },
    rating: 4.8,
    reviewCount: 1890,
    price: 20000,
    priceNote: {
      vi: "20.000đ/người",
      en: "20,000 VND/person"
    },
    openTime: "05:00",
    closeTime: "17:30",
    duration: {
      vi: "2-3 giờ",
      en: "2-3 hours"
    },
    address: {
      vi: "Xã Chư Đăng Ya, H. Chư Păh, Gia Lai",
      en: "Chu Dang Ya Commune, Chu Pah Dist, Gia Lai"
    },
    lat: 14.1050,
    lng: 107.9230,
    image: "/images/chu_dang_ya_volcano_1782505165301.png",
    tags: {
      vi: ["Thiên nhiên", "Trekking", "Hoa dã quỳ"],
      en: ["Nature", "Trekking", "Wild sunflower"]
    },
    highlights: {
      vi: ["Leo núi ngắm bình minh", "Hoa dã quỳ tháng 11", "Panorama Tây Nguyên"],
      en: ["Mountain climbing for sunrise", "Wild sunflowers in November", "Central Highlands panorama"]
    }
  },
  {
    id: 3,
    name: {
      vi: "Thác Phú Cường",
      en: "Phu Cuong Waterfall"
    },
    description: {
      vi: "Thác Phú Cường nằm ở xã Dun, huyện Chư Sê, cách Pleiku khoảng 45km. Thác cao khoảng 45m, nước đổ xuống trắng xóa giữa rừng già nguyên sinh. Vào mùa mưa (tháng 6-10), dòng thác cuồn cuộn hùng vĩ, sương nước bay mịt mù. Khu vực xung quanh thác có nhiều tảng đá lớn, thích hợp cho việc ngồi nghỉ chân và ngắm cảnh. Đây được ví là 'Niagara thu nhỏ' của Tây Nguyên.",
      en: "Phu Cuong Waterfall is located in Dun commune, Chu Se district, about 45km from Pleiku. The waterfall is about 45m high, with water cascading down in white foam amidst the primeval old forest. During the rainy season (June-October), the waterfall is majestic, with mist flying everywhere. The area around the waterfall has many large rocks, suitable for resting and sightseeing. This is considered the 'mini Niagara' of the Central Highlands."
    },
    shortDescription: {
      vi: "Thác nước hùng vĩ cao 45m giữa rừng nguyên sinh.",
      en: "Majestic 45m high waterfall amidst the primeval forest."
    },
    category: {
      vi: ["Thiên nhiên", "Trekking"],
      en: ["Nature", "Trekking"]
    },
    rating: 4.5,
    reviewCount: 980,
    price: 15000,
    priceNote: {
      vi: "15.000đ/người",
      en: "15,000 VND/person"
    },
    openTime: "07:00",
    closeTime: "17:00",
    duration: {
      vi: "1-2 giờ",
      en: "1-2 hours"
    },
    address: {
      vi: "Xã Dun, H. Chư Sê, Gia Lai",
      en: "Dun Commune, Chu Se Dist, Gia Lai"
    },
    lat: 13.7353,
    lng: 108.0575,
    image: "/images/thac_phu_cuong_1782505250630.png",
    tags: {
      vi: ["Thiên nhiên", "Thác nước", "Trekking"],
      en: ["Nature", "Waterfall", "Trekking"]
    },
    highlights: {
      vi: ["Thác hùng vĩ mùa mưa", "Rừng nguyên sinh", "Tắm suối"],
      en: ["Majestic waterfall in rainy season", "Primeval forest", "Stream bathing"]
    }
  },
  {
    id: 4,
    name: {
      vi: "Làng cổ Stơr – Anh hùng Núp",
      en: "Stor Ancient Village – Hero Nup"
    },
    description: {
      vi: "Làng cổ Stơr nằm ở xã Tơ Tung, huyện KBang, nổi tiếng là quê hương của Anh hùng Núp – người anh hùng dân tộc Bahnar trong kháng chiến chống Pháp. Làng vẫn giữ nguyên kiến trúc nhà rông truyền thống, nhà sàn gỗ và nếp sống sinh hoạt cộng đồng lâu đời. Du khách có thể tham quan nhà rông, uống rượu cần, nghe cồng chiêng và tìm hiểu văn hóa bản địa Bahnar.",
      en: "Stor ancient village is located in To Tung commune, KBang district, famous as the hometown of Hero Nup - a Bahnar national hero in the resistance war against the French. The village still preserves its traditional Rong house architecture, wooden stilt houses, and long-standing community lifestyle. Visitors can visit the Rong house, drink Can wine, listen to gongs, and learn about the indigenous Bahnar culture."
    },
    shortDescription: {
      vi: "Làng Bahnar cổ, quê hương Anh hùng Núp với nhà rông truyền thống.",
      en: "Ancient Bahnar village, hometown of Hero Nup with a traditional Rong house."
    },
    category: {
      vi: ["Văn hóa", "Check-in"],
      en: ["Culture", "Check-in"]
    },
    rating: 4.6,
    reviewCount: 760,
    price: 0,
    priceNote: {
      vi: "Miễn phí",
      en: "Free"
    },
    openTime: "07:00",
    closeTime: "17:00",
    duration: {
      vi: "2-3 giờ",
      en: "2-3 hours"
    },
    address: {
      vi: "Xã Tơ Tung, H. KBang, Gia Lai",
      en: "To Tung Commune, KBang Dist, Gia Lai"
    },
    lat: 14.2456,
    lng: 108.5123,
    image: "/images/lang_stor_bahnar_1782505259629.png",
    tags: {
      vi: ["Văn hóa", "Lịch sử", "Cộng đồng"],
      en: ["Culture", "History", "Community"]
    },
    highlights: {
      vi: ["Nhà rông truyền thống", "Uống rượu cần", "Cồng chiêng Tây Nguyên"],
      en: ["Traditional Rong house", "Drinking Can wine", "Central Highlands Gongs"]
    }
  },
  {
    id: 5,
    name: {
      vi: "Đồi chè Biển Hồ",
      en: "Bien Ho Tea Hills"
    },
    description: {
      vi: "Đồi chè Biển Hồ là một trong những đồi chè đẹp nhất Việt Nam, nằm gần Biển Hồ T'Nưng. Những đồi chè xanh ngút ngàn trải dài trên địa hình đồi núi, tạo nên những đường cong mềm mại tuyệt đẹp. Sáng sớm, sương giăng phủ kín đồi chè, tạo nên khung cảnh như thiên đường. Đây là điểm check-in yêu thích của giới trẻ và nhiếp ảnh gia.",
      en: "Bien Ho Tea Hills is one of the most beautiful tea hills in Vietnam, located near T'Nung Lake. The endless green tea hills stretch over the mountainous terrain, creating beautiful soft curves. In the early morning, mist covers the tea hills, creating a heavenly scene. This is a favorite check-in spot for young people and photographers."
    },
    shortDescription: {
      vi: "Đồi chè xanh ngút ngàn, điểm check-in sương mù tuyệt đẹp.",
      en: "Endless green tea hills, a beautiful misty check-in spot."
    },
    category: {
      vi: ["Thiên nhiên", "Check-in", "Cà phê"],
      en: ["Nature", "Check-in", "Coffee"]
    },
    rating: 4.6,
    reviewCount: 1560,
    price: 0,
    priceNote: {
      vi: "Miễn phí",
      en: "Free"
    },
    openTime: "05:00",
    closeTime: "18:00",
    duration: {
      vi: "1-2 giờ",
      en: "1-2 hours"
    },
    address: {
      vi: "Xã Nghĩa Hưng, TP. Pleiku, Gia Lai",
      en: "Nghia Hung Commune, Pleiku City, Gia Lai"
    },
    lat: 14.0234,
    lng: 107.9876,
    image: "/images/doi_che_gia_lai_1782505177095.png",
    tags: {
      vi: ["Check-in", "Nhiếp ảnh", "Miễn phí"],
      en: ["Check-in", "Photography", "Free"]
    },
    highlights: {
      vi: ["Sương sớm đẹp 5-7h sáng", "Đường cong đồi chè", "Gần Biển Hồ"],
      en: ["Beautiful early morning mist 5-7am", "Tea hill curves", "Near T'Nung Lake"]
    }
  },
  {
    "id": 6,
    "name": {
      "vi": "Chùa Minh Thành",
      "en": "Minh Thanh Pagoda"
    },
    "description": {
      "vi": "Ngôi chùa có kiến trúc độc đáo mang phong cách Nhật Bản và Đài Loan tại trung tâm TP. Pleiku.",
      "en": "A pagoda with unique Japanese and Taiwanese architecture in the center of Pleiku City."
    },
    "shortDescription": {
      "vi": "Chùa kiến trúc Nhật Bản độc đáo.",
      "en": "Unique Japanese architecture pagoda."
    },
    "category": {
      "vi": [
        "Văn hóa",
        "Check-in"
      ],
      "en": [
        "Culture",
        "Check-in"
      ]
    },
    "rating": 4.8,
    "reviewCount": 2100,
    "price": 0,
    "priceNote": {
      "vi": "Miễn phí",
      "en": "Free"
    },
    "openTime": "07:00",
    "closeTime": "18:00",
    "duration": {
      "vi": "1-2 giờ",
      "en": "1-2 hours"
    },
    "address": {
      "vi": "TP. Pleiku, Gia Lai",
      "en": "Pleiku City, Gia Lai"
    },
    "lat": 13.9772,
    "lng": 108.0069,
    "image": "/images/chua_minh_thanh_1782505218638.png",
    "tags": {
      "vi": [
        "Tâm linh",
        "Văn hóa",
        "Check-in"
      ],
      "en": [
        "Spiritual",
        "Culture",
        "Check-in"
      ]
    },
    "highlights": {
      "vi": [
        "Kiến trúc Á Đông",
        "Tháp Từ Tôn",
        "Hồ nước thanh bình"
      ],
      "en": [
        "Asian architecture",
        "Tu Ton tower",
        "Peaceful lake"
      ]
    }
  },
  {
    "id": 7,
    "name": {
      "vi": "Hồ Ayun Hạ",
      "en": "Ayun Ha Lake"
    },
    "description": {
      "vi": "Hồ nhân tạo rộng lớn với phong cảnh hữu tình, thích hợp câu cá và dã ngoại.",
      "en": "A large artificial lake with beautiful scenery, suitable for fishing and picnics."
    },
    "shortDescription": {
      "vi": "Hồ sinh thái rộng lớn, yên bình.",
      "en": "Large and peaceful ecological lake."
    },
    "category": {
      "vi": [
        "Thiên nhiên",
        "Nghỉ dưỡng"
      ],
      "en": [
        "Nature",
        "Relaxation"
      ]
    },
    "rating": 4.4,
    "reviewCount": 850,
    "price": 0,
    "priceNote": {
      "vi": "Miễn phí",
      "en": "Free"
    },
    "openTime": "00:00",
    "closeTime": "23:59",
    "duration": {
      "vi": "2-4 giờ",
      "en": "2-4 hours"
    },
    "address": {
      "vi": "H. Chư Sê, Gia Lai",
      "en": "Chu Se Dist, Gia Lai"
    },
    "lat": 13.5833,
    "lng": 108.2333,
    "image": "/images/ho_ayun_ha_1782505317015.png",
    "tags": {
      "vi": [
        "Sinh thái",
        "Câu cá",
        "Gia đình"
      ],
      "en": [
        "Ecological",
        "Fishing",
        "Family"
      ]
    },
    "highlights": {
      "vi": [
        "Cảnh quan tĩnh lặng",
        "Du thuyền trên hồ",
        "Câu cá giải trí"
      ],
      "en": [
        "Quiet landscape",
        "Boating on lake",
        "Fishing"
      ]
    }
  },
  {
    "id": 8,
    "name": {
      "vi": "Vườn Quốc gia Kon Ka Kinh",
      "en": "Kon Ka Kinh National Park"
    },
    "description": {
      "vi": "Khu dự trữ sinh quyển thế giới với thảm thực vật phong phú, thích hợp trekking.",
      "en": "A world biosphere reserve with rich vegetation, suitable for trekking."
    },
    "shortDescription": {
      "vi": "Khu bảo tồn thiên nhiên hùng vĩ, lý tưởng để trekking.",
      "en": "Majestic nature reserve, ideal for trekking."
    },
    "category": {
      "vi": [
        "Thiên nhiên",
        "Trekking"
      ],
      "en": [
        "Nature",
        "Trekking"
      ]
    },
    "rating": 4.7,
    "reviewCount": 520,
    "price": 40000,
    "priceNote": {
      "vi": "40.000đ/người",
      "en": "40,000 VND/person"
    },
    "openTime": "07:00",
    "closeTime": "17:00",
    "duration": {
      "vi": "1-2 ngày",
      "en": "1-2 days"
    },
    "address": {
      "vi": "H. Mang Yang, Gia Lai",
      "en": "Mang Yang Dist, Gia Lai"
    },
    "lat": 14.3,
    "lng": 108.3167,
    "image": "/images/kon_ka_kinh_1782505306871.png",
    "tags": {
      "vi": [
        "Trekking",
        "Rừng nguyên sinh",
        "Động vật hoang dã"
      ],
      "en": [
        "Trekking",
        "Primeval forest",
        "Wildlife"
      ]
    },
    "highlights": {
      "vi": [
        "Leo núi",
        "Khám phá động thực vật",
        "Suối thác hoang sơ"
      ],
      "en": [
        "Mountain climbing",
        "Flora and fauna exploration",
        "Pristine streams"
      ]
    }
  },
  {
    "id": 9,
    "name": {
      "vi": "Nhà thờ Gỗ Kon Tum (Gần Gia Lai)",
      "en": "Wooden Church (Near Gia Lai)"
    },
    "description": {
      "vi": "Kiến trúc nhà thờ hoàn toàn bằng gỗ theo phong cách Roman pha trộn nhà sàn Ba Na.",
      "en": "Church architecture entirely made of wood in Roman style mixed with Ba Na stilt house."
    },
    "shortDescription": {
      "vi": "Nhà thờ gỗ độc đáo hơn 100 năm tuổi.",
      "en": "Unique wooden church over 100 years old."
    },
    "category": {
      "vi": [
        "Văn hóa",
        "Check-in"
      ],
      "en": [
        "Culture",
        "Check-in"
      ]
    },
    "rating": 4.8,
    "reviewCount": 3200,
    "price": 0,
    "priceNote": {
      "vi": "Miễn phí",
      "en": "Free"
    },
    "openTime": "07:00",
    "closeTime": "18:00",
    "duration": {
      "vi": "1-2 giờ",
      "en": "1-2 hours"
    },
    "address": {
      "vi": "TP. Kon Tum",
      "en": "Kon Tum City"
    },
    "lat": 14.3546,
    "lng": 108.0008,
    "image": "/images/nha_tho_go_1782505298118.png",
    "tags": {
      "vi": [
        "Kiến trúc",
        "Lịch sử",
        "Check-in"
      ],
      "en": [
        "Architecture",
        "History",
        "Check-in"
      ]
    },
    "highlights": {
      "vi": [
        "Kiến trúc gỗ trắc",
        "Khuôn viên rộng rãi",
        "Thiết kế hòa quyện"
      ],
      "en": [
        "Rosewood architecture",
        "Spacious campus",
        "Blended design"
      ]
    }
  },
  {
    "id": 10,
    "name": {
      "vi": "Khu du lịch sinh thái Về Nguồn",
      "en": "Ve Nguon Eco Resort"
    },
    "description": {
      "vi": "Không gian xanh mát, thích hợp cho các hoạt động vui chơi gia đình và thưởng thức ẩm thực.",
      "en": "Green space, suitable for family fun activities and enjoying food."
    },
    "shortDescription": {
      "vi": "Khu nghỉ dưỡng sinh thái gia đình.",
      "en": "Family eco-resort."
    },
    "category": {
      "vi": [
        "Nghỉ dưỡng",
        "Gia đình có trẻ em"
      ],
      "en": [
        "Relaxation",
        "Family with kids"
      ]
    },
    "rating": 4.3,
    "reviewCount": 1150,
    "price": 50000,
    "priceNote": {
      "vi": "50.000đ/người",
      "en": "50,000 VND/person"
    },
    "openTime": "08:00",
    "closeTime": "20:00",
    "duration": {
      "vi": "Nửa ngày",
      "en": "Half day"
    },
    "address": {
      "vi": "TP. Pleiku, Gia Lai",
      "en": "Pleiku City, Gia Lai"
    },
    "lat": 14.0011,
    "lng": 107.995,
    "image": "/images/ve_nguon_eco_1782505339435.png",
    "tags": {
      "vi": [
        "Gia đình",
        "Trẻ em",
        "Ẩm thực"
      ],
      "en": [
        "Family",
        "Kids",
        "Food"
      ]
    },
    "highlights": {
      "vi": [
        "Hồ bơi",
        "Nhà hàng",
        "Khu vui chơi trẻ em"
      ],
      "en": [
        "Pool",
        "Restaurant",
        "Kids area"
      ]
    }
  },
  {
    "id": 11,
    "name": {
      "vi": "Điện gió Đắk Đoa",
      "en": "Dak Doa Wind Farm"
    },
    "description": {
      "vi": "Cánh đồng quạt gió khổng lồ đẹp như trời Âu, là điểm check-in hoàng hôn cực chill.",
      "en": "A huge wind farm beautiful like Europe, a chill sunset check-in spot."
    },
    "shortDescription": {
      "vi": "Cánh đồng quạt gió check-in hoàng hôn tuyệt đẹp.",
      "en": "Wind farm for beautiful sunset check-in."
    },
    "category": {
      "vi": [
        "Check-in",
        "Thiên nhiên"
      ],
      "en": [
        "Check-in",
        "Nature"
      ]
    },
    "rating": 4.5,
    "reviewCount": 1800,
    "price": 0,
    "priceNote": {
      "vi": "Miễn phí",
      "en": "Free"
    },
    "openTime": "00:00",
    "closeTime": "23:59",
    "duration": {
      "vi": "1 giờ",
      "en": "1 hour"
    },
    "address": {
      "vi": "H. Đắk Đoa, Gia Lai",
      "en": "Dak Doa Dist, Gia Lai"
    },
    "lat": 14.05,
    "lng": 108.1,
    "image": "/images/wind_farm_gia_lai_1782505268122.png",
    "tags": {
      "vi": [
        "Hoàng hôn",
        "Check-in",
        "Chill"
      ],
      "en": [
        "Sunset",
        "Check-in",
        "Chill"
      ]
    },
    "highlights": {
      "vi": [
        "Tua bin gió khổng lồ",
        "Cánh đồng cỏ",
        "Hoàng hôn lãng mạn"
      ],
      "en": [
        "Giant wind turbines",
        "Grass field",
        "Romantic sunset"
      ]
    }
  },
  {
    "id": 12,
    "name": {
      "vi": "Kỳ Co",
      "en": "Ky Co Beach"
    },
    "description": {
      "vi": "Được mệnh danh là Maldives của Việt Nam với làn nước trong xanh và bãi cát trắng mịn.",
      "en": "Known as the Maldives of Vietnam with clear blue water and white sand."
    },
    "shortDescription": {
      "vi": "Thiên đường biển trong xanh tựa Maldives.",
      "en": "A blue sea paradise like Maldives."
    },
    "category": {
      "vi": [
        "Biển",
        "Nghỉ dưỡng biển"
      ],
      "en": [
        "Beach",
        "Beach Resort"
      ]
    },
    "rating": 4.9,
    "reviewCount": 5500,
    "price": 100000,
    "priceNote": {
      "vi": "100.000đ/vé cổng",
      "en": "100,000 VND/ticket"
    },
    "openTime": "07:00",
    "closeTime": "17:00",
    "duration": {
      "vi": "Nửa ngày",
      "en": "Half day"
    },
    "address": {
      "vi": "Xã Nhơn Lý, Quy Nhơn",
      "en": "Nhon Ly, Quy Nhon"
    },
    "lat": 13.8828,
    "lng": 109.2974,
    "image": "/images/ky_co_beach_1782812243763.png",
    "tags": {
      "vi": [
        "Biển",
        "Sống ảo",
        "San hô"
      ],
      "en": [
        "Beach",
        "Check-in",
        "Coral"
      ]
    },
    "highlights": {
      "vi": [
        "Nước biển trong vắt",
        "Lặn ngắm san hô",
        "Cầu Yến"
      ],
      "en": [
        "Crystal clear water",
        "Coral diving",
        "Yen Bridge"
      ]
    }
  },
  {
    "id": 13,
    "name": {
      "vi": "Eo Gió",
      "en": "Eo Gio"
    },
    "description": {
      "vi": "Eo biển hình cung tuyệt đẹp được bao bọc bởi những rặng núi đá hùng vĩ.",
      "en": "A beautiful bow-shaped strait surrounded by majestic rocky mountains."
    },
    "shortDescription": {
      "vi": "Nơi ngắm hoàng hôn và bình minh đẹp nhất Việt Nam.",
      "en": "The best place to watch sunset and sunrise in Vietnam."
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
    "reviewCount": 4800,
    "price": 25000,
    "priceNote": {
      "vi": "25.000đ/vé",
      "en": "25,000 VND/ticket"
    },
    "openTime": "05:00",
    "closeTime": "18:00",
    "duration": {
      "vi": "1-2 giờ",
      "en": "1-2 hours"
    },
    "address": {
      "vi": "Xã Nhơn Lý, Quy Nhơn",
      "en": "Nhon Ly, Quy Nhon"
    },
    "lat": 13.8998,
    "lng": 109.2842,
    "image": "/images/eo_gio_1782812490073.png",
    "tags": {
      "vi": [
        "Cảnh quan",
        "Check-in",
        "Gió biển"
      ],
      "en": [
        "Landscape",
        "Check-in",
        "Sea breeze"
      ]
    },
    "highlights": {
      "vi": [
        "Con đường ven biển đỏ rực",
        "Vách đá cheo leo",
        "Ống nhòm ngắm cảnh"
      ],
      "en": [
        "Red coastal road",
        "Steep cliffs",
        "Binoculars"
      ]
    }
  },
  {
    "id": 14,
    "name": {
      "vi": "Khu dã ngoại Trung Lương",
      "en": "Trung Luong Camping"
    },
    "description": {
      "vi": "Khu cắm trại ven biển với phong cách lều trại mộc mạc và bãi tắm hoang sơ.",
      "en": "Coastal camping area with rustic tents and pristine beaches."
    },
    "shortDescription": {
      "vi": "Thung lũng cắm trại sát biển lý tưởng.",
      "en": "Ideal seaside camping valley."
    },
    "category": {
      "vi": [
        "Cắm trại ven biển",
        "Check-in"
      ],
      "en": [
        "Beach Camping",
        "Check-in"
      ]
    },
    "rating": 4.5,
    "reviewCount": 2200,
    "price": 40000,
    "priceNote": {
      "vi": "40.000đ/vé",
      "en": "40,000 VND/ticket"
    },
    "openTime": "07:00",
    "closeTime": "22:00",
    "duration": {
      "vi": "Nửa ngày hoặc Qua đêm",
      "en": "Half day or Overnight"
    },
    "address": {
      "vi": "Phù Cát, Quy Nhơn",
      "en": "Phu Cat, Quy Nhon"
    },
    "lat": 13.945,
    "lng": 109.155,
    "image": "/images/trung_luong_camp_1782812263702.png",
    "tags": {
      "vi": [
        "Cắm trại",
        "Chill",
        "Biển"
      ],
      "en": [
        "Camping",
        "Chill",
        "Beach"
      ]
    },
    "highlights": {
      "vi": [
        "Ngủ lều ven biển",
        "Đốt lửa trại",
        "Check-in ghế gỗ"
      ],
      "en": [
        "Sleep in tent",
        "Campfire",
        "Wooden chairs"
      ]
    }
  },
  {
    "id": 15,
    "name": {
      "vi": "Ghềnh Ráng Tiên Sa",
      "en": "Ghenh Rang Tien Sa"
    },
    "description": {
      "vi": "Khu du lịch nổi tiếng với Bãi tắm Hoàng Hậu (Bãi Đá Trứng) và khu mộ thi sĩ Hàn Mặc Tử.",
      "en": "Famous tourist area with Queen Beach (Egg Stone Beach) and Han Mac Tu poet's grave."
    },
    "shortDescription": {
      "vi": "Chiêm ngưỡng Bãi Đá Trứng và viếng mộ Hàn Mặc Tử.",
      "en": "Admire Egg Stone Beach and visit Han Mac Tu's grave."
    },
    "category": {
      "vi": [
        "Biển",
        "Văn hóa"
      ],
      "en": [
        "Beach",
        "Culture"
      ]
    },
    "rating": 4.6,
    "reviewCount": 4100,
    "price": 0,
    "priceNote": {
      "vi": "Miễn phí",
      "en": "Free"
    },
    "openTime": "06:00",
    "closeTime": "21:00",
    "duration": {
      "vi": "1-2 giờ",
      "en": "1-2 hours"
    },
    "address": {
      "vi": "Phường Ghềnh Ráng, Quy Nhơn",
      "en": "Ghenh Rang Ward, Quy Nhon"
    },
    "lat": 13.754,
    "lng": 109.215,
    "image": "/images/ghenh_rang_1782812297133.png",
    "tags": {
      "vi": [
        "Lịch sử",
        "Thi ca",
        "Biển"
      ],
      "en": [
        "History",
        "Poetry",
        "Beach"
      ]
    },
    "highlights": {
      "vi": [
        "Bãi đá trứng khổng lồ",
        "Mộ thi sĩ Hàn Mặc Tử",
        "Đồi Thi Nhân"
      ],
      "en": [
        "Giant egg stones",
        "Han Mac Tu grave",
        "Poet's Hill"
      ]
    }
  },
  {
    "id": 16,
    "name": {
      "vi": "Cù Lao Xanh",
      "en": "Cu Lao Xanh Island"
    },
    "description": {
      "vi": "Hòn ngọc Biển Đông với ngọn hải đăng cổ kính và nhịp sống làng chài yên bình.",
      "en": "The pearl of the East Sea with an ancient lighthouse and a peaceful fishing village."
    },
    "shortDescription": {
      "vi": "Hòn đảo hoang sơ tuyệt đẹp cách xa đất liền.",
      "en": "Beautiful pristine island far from the mainland."
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
    "rating": 4.8,
    "reviewCount": 1500,
    "price": 350000,
    "priceNote": {
      "vi": "Từ 350.000đ/Cano",
      "en": "From 350k/Canoe"
    },
    "openTime": "06:00",
    "closeTime": "17:00",
    "duration": {
      "vi": "1 Ngày",
      "en": "1 Day"
    },
    "address": {
      "vi": "Xã Nhơn Châu, Quy Nhơn",
      "en": "Nhon Chau, Quy Nhon"
    },
    "lat": 13.6167,
    "lng": 109.35,
    "image": "/images/cu_lao_xanh_1782812499387.png",
    "tags": {
      "vi": [
        "Biển đảo",
        "Hải đăng",
        "Hải sản"
      ],
      "en": [
        "Islands",
        "Lighthouse",
        "Seafood"
      ]
    },
    "highlights": {
      "vi": [
        "Ngọn hải đăng 100 tuổi",
        "Cột cờ tổ quốc",
        "San hô tuyệt đẹp"
      ],
      "en": [
        "100-year-old lighthouse",
        "Flagpole",
        "Beautiful coral"
      ]
    }
  },
  {
    "id": 17,
    "name": {
      "vi": "Safari Park FLC",
      "en": "FLC Safari Park"
    },
    "description": {
      "vi": "Công viên động vật hoang dã đầu tiên tại Quy Nhơn với nhiều loài thú quý hiếm.",
      "en": "The first wild animal park in Quy Nhon with many rare species."
    },
    "shortDescription": {
      "vi": "Trải nghiệm thế giới động vật hoang dã lý thú.",
      "en": "Experience an interesting wild animal world."
    },
    "category": {
      "vi": [
        "Vui chơi giải trí",
        "Gia đình có trẻ em"
      ],
      "en": [
        "Entertainment",
        "Family with kids"
      ]
    },
    "rating": 4.5,
    "reviewCount": 3000,
    "price": 100000,
    "priceNote": {
      "vi": "100.000đ/vé",
      "en": "100,000 VND/ticket"
    },
    "openTime": "09:00",
    "closeTime": "17:00",
    "duration": {
      "vi": "2-3 giờ",
      "en": "2-3 hours"
    },
    "address": {
      "vi": "Khu du lịch FLC Nhơn Lý",
      "en": "FLC Nhon Ly Resort"
    },
    "lat": 13.91,
    "lng": 109.28,
    "image": "/images/safari_park_1782812318879.png",
    "tags": {
      "vi": [
        "Động vật",
        "Gia đình",
        "Trẻ em"
      ],
      "en": [
        "Animals",
        "Family",
        "Kids"
      ]
    },
    "highlights": {
      "vi": [
        "Tương tác với thú",
        "Xe điện tham quan",
        "Chụp ảnh với vẹt"
      ],
      "en": [
        "Animal interaction",
        "Electric car tour",
        "Photo with parrots"
      ]
    }
  },
  {
    "id": 18,
    "name": {
      "vi": "Chùa Ông Núi",
      "en": "Ong Nui Temple"
    },
    "description": {
      "vi": "Nơi có tượng Phật ngồi lớn nhất Đông Nam Á hướng ra biển cả bao la.",
      "en": "Home to the largest sitting Buddha statue in Southeast Asia facing the vast sea."
    },
    "shortDescription": {
      "vi": "Tượng Phật khổng lồ linh thiêng tọa lạc trên núi cao.",
      "en": "Sacred giant Buddha statue located on a high mountain."
    },
    "category": {
      "vi": [
        "Văn hóa",
        "Check-in"
      ],
      "en": [
        "Culture",
        "Check-in"
      ]
    },
    "rating": 4.7,
    "reviewCount": 2500,
    "price": 0,
    "priceNote": {
      "vi": "Miễn phí",
      "en": "Free"
    },
    "openTime": "06:00",
    "closeTime": "18:00",
    "duration": {
      "vi": "1-2 giờ",
      "en": "1-2 hours"
    },
    "address": {
      "vi": "Xã Cát Tiến, Phù Cát",
      "en": "Cat Tien, Phu Cat"
    },
    "lat": 13.975,
    "lng": 109.185,
    "image": "/images/ong_nui_temple_1782812307544.png",
    "tags": {
      "vi": [
        "Tâm linh",
        "Kiến trúc",
        "Check-in"
      ],
      "en": [
        "Spiritual",
        "Architecture",
        "Check-in"
      ]
    },
    "highlights": {
      "vi": [
        "Leo 600 bậc thang",
        "Tượng Phật khổng lồ",
        "View ngắm biển từ trên cao"
      ],
      "en": [
        "Climb 600 stairs",
        "Giant Buddha statue",
        "Sea view from above"
      ]
    }
  },
  {
    "id": 19,
    "name": {
      "vi": "Tháp Đôi",
      "en": "Twin Towers"
    },
    "description": {
      "vi": "Hai ngọn tháp Chăm pa cổ kính ngay giữa lòng thành phố Quy Nhơn.",
      "en": "Two ancient Cham towers right in the heart of Quy Nhon city."
    },
    "shortDescription": {
      "vi": "Di tích kiến trúc văn hóa Chăm Pa rực rỡ.",
      "en": "Brilliant Cham Pa cultural architecture relic."
    },
    "category": {
      "vi": [
        "Văn hóa"
      ],
      "en": [
        "Culture"
      ]
    },
    "rating": 4.4,
    "reviewCount": 1900,
    "price": 20000,
    "priceNote": {
      "vi": "20.000đ/vé",
      "en": "20,000 VND/ticket"
    },
    "openTime": "07:00",
    "closeTime": "18:00",
    "duration": {
      "vi": "1 giờ",
      "en": "1 hour"
    },
    "address": {
      "vi": "Đường Trần Hưng Đạo, Quy Nhơn",
      "en": "Tran Hung Dao St, Quy Nhon"
    },
    "lat": 13.785,
    "lng": 109.215,
    "image": "/images/thap_doi_1782812547242.png",
    "tags": {
      "vi": [
        "Lịch sử",
        "Chăm Pa",
        "Kiến trúc"
      ],
      "en": [
        "History",
        "Cham Pa",
        "Architecture"
      ]
    },
    "highlights": {
      "vi": [
        "Kiến trúc gạch nung",
        "Phù điêu thần chim Garuda",
        "Check-in hoài cổ"
      ],
      "en": [
        "Baked brick architecture",
        "Garuda bird relief",
        "Nostalgic check-in"
      ]
    }
  }
];

export const preferenceOptions = [
  { id: 'nature', label: { vi: 'Thiên nhiên & Phong cảnh', en: 'Nature & Landscape' }, icon: '🌿', image: '/images/bien_ho_tnnung_1782505155088.png' },
  { id: 'culture', label: { vi: 'Văn hóa & Lịch sử', en: 'Culture & History' }, icon: '🏛️', image: '/images/chua_minh_thanh_1782505218638.png' },
  { id: 'adventure', label: { vi: 'Khám phá & Mạo hiểm', en: 'Adventure & Exploration' }, icon: '🏕️', image: '/images/chu_dang_ya_volcano_1782505165301.png' },
  { id: 'food', label: { vi: 'Ẩm thực địa phương', en: 'Local Cuisine' }, icon: '🍜', image: '/images/pleiku_food_street_1782505210206.png' },
  { id: 'relax', label: { vi: 'Nghỉ dưỡng & Chụp ảnh', en: 'Relaxation & Photography' }, icon: '📸', image: '/images/doi_che_gia_lai_1782505177095.png' },
  { id: 'family', label: { vi: 'Gia đình & Trẻ em', en: 'Family & Kids' }, icon: '👨‍👩‍👧‍👦', image: '/images/safari_park_1782812318879.png' },
  { id: 'camping', label: { vi: 'Cắm trại & Dã ngoại', en: 'Camping & Picnic' }, icon: '⛺', image: '/images/trung_luong_camp_1782812263702.png' },
  { id: 'checkin', label: { vi: 'Sống ảo & Giới trẻ', en: 'Trendy & Check-in' }, icon: '✨', image: '/images/wind_farm_gia_lai_1782505268122.png' },
  { id: 'spiritual', label: { vi: 'Tâm linh & Bình yên', en: 'Spiritual & Peaceful' }, icon: '🧘', image: '/images/ong_nui_temple_1782812307544.png' }
];

export default placesData;
