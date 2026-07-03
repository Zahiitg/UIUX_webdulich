const fs = require('fs');

const morePlaces = [
  {
    id: 6,
    name: { vi: "Chùa Minh Thành", en: "Minh Thanh Pagoda" },
    description: {
      vi: "Ngôi chùa có kiến trúc độc đáo mang phong cách Nhật Bản và Đài Loan tại trung tâm TP. Pleiku.",
      en: "A pagoda with unique Japanese and Taiwanese architecture in the center of Pleiku City."
    },
    shortDescription: { vi: "Chùa kiến trúc Nhật Bản độc đáo.", en: "Unique Japanese architecture pagoda." },
    category: { vi: ["Văn hóa", "Check-in"], en: ["Culture", "Check-in"] },
    rating: 4.8, reviewCount: 2100, price: 0, priceNote: { vi: "Miễn phí", en: "Free" },
    openTime: "07:00", closeTime: "18:00", duration: { vi: "1-2 giờ", en: "1-2 hours" },
    address: { vi: "TP. Pleiku, Gia Lai", en: "Pleiku City, Gia Lai" },
    lat: 13.9772, lng: 108.0069,
    image: "/images/chua_minh_thanh_1782505218638.png",
    tags: { vi: ["Tâm linh", "Văn hóa", "Check-in"], en: ["Spiritual", "Culture", "Check-in"] },
    highlights: { vi: ["Kiến trúc Á Đông", "Tháp Từ Tôn", "Hồ nước thanh bình"], en: ["Asian architecture", "Tu Ton tower", "Peaceful lake"] }
  },
  {
    id: 7,
    name: { vi: "Hồ Ayun Hạ", en: "Ayun Ha Lake" },
    description: { vi: "Hồ nhân tạo rộng lớn với phong cảnh hữu tình, thích hợp câu cá và dã ngoại.", en: "A large artificial lake with beautiful scenery, suitable for fishing and picnics." },
    shortDescription: { vi: "Hồ sinh thái rộng lớn, yên bình.", en: "Large and peaceful ecological lake." },
    category: { vi: ["Thiên nhiên", "Nghỉ dưỡng"], en: ["Nature", "Relaxation"] },
    rating: 4.4, reviewCount: 850, price: 0, priceNote: { vi: "Miễn phí", en: "Free" },
    openTime: "00:00", closeTime: "23:59", duration: { vi: "2-4 giờ", en: "2-4 hours" },
    address: { vi: "H. Chư Sê, Gia Lai", en: "Chu Se Dist, Gia Lai" },
    lat: 13.5833, lng: 108.2333,
    image: "/images/ho_ayun_ha_1782505317015.png",
    tags: { vi: ["Sinh thái", "Câu cá", "Gia đình"], en: ["Ecological", "Fishing", "Family"] },
    highlights: { vi: ["Cảnh quan tĩnh lặng", "Du thuyền trên hồ", "Câu cá giải trí"], en: ["Quiet landscape", "Boating on lake", "Fishing"] }
  },
  {
    id: 8,
    name: { vi: "Vườn Quốc gia Kon Ka Kinh", en: "Kon Ka Kinh National Park" },
    description: { vi: "Khu dự trữ sinh quyển thế giới với thảm thực vật phong phú, thích hợp trekking.", en: "A world biosphere reserve with rich vegetation, suitable for trekking." },
    shortDescription: { vi: "Khu bảo tồn thiên nhiên hùng vĩ, lý tưởng để trekking.", en: "Majestic nature reserve, ideal for trekking." },
    category: { vi: ["Thiên nhiên", "Trekking"], en: ["Nature", "Trekking"] },
    rating: 4.7, reviewCount: 520, price: 40000, priceNote: { vi: "40.000đ/người", en: "40,000 VND/person" },
    openTime: "07:00", closeTime: "17:00", duration: { vi: "1-2 ngày", en: "1-2 days" },
    address: { vi: "H. Mang Yang, Gia Lai", en: "Mang Yang Dist, Gia Lai" },
    lat: 14.3000, lng: 108.3167,
    image: "/images/kon_ka_kinh_1782505306871.png",
    tags: { vi: ["Trekking", "Rừng nguyên sinh", "Động vật hoang dã"], en: ["Trekking", "Primeval forest", "Wildlife"] },
    highlights: { vi: ["Leo núi", "Khám phá động thực vật", "Suối thác hoang sơ"], en: ["Mountain climbing", "Flora and fauna exploration", "Pristine streams"] }
  },
  {
    id: 9,
    name: { vi: "Nhà thờ Gỗ Kon Tum (Gần Gia Lai)", en: "Wooden Church (Near Gia Lai)" },
    description: { vi: "Kiến trúc nhà thờ hoàn toàn bằng gỗ theo phong cách Roman pha trộn nhà sàn Ba Na.", en: "Church architecture entirely made of wood in Roman style mixed with Ba Na stilt house." },
    shortDescription: { vi: "Nhà thờ gỗ độc đáo hơn 100 năm tuổi.", en: "Unique wooden church over 100 years old." },
    category: { vi: ["Văn hóa", "Check-in"], en: ["Culture", "Check-in"] },
    rating: 4.8, reviewCount: 3200, price: 0, priceNote: { vi: "Miễn phí", en: "Free" },
    openTime: "07:00", closeTime: "18:00", duration: { vi: "1-2 giờ", en: "1-2 hours" },
    address: { vi: "TP. Kon Tum", en: "Kon Tum City" },
    lat: 14.3546, lng: 108.0008,
    image: "/images/nha_tho_go_1782505298118.png",
    tags: { vi: ["Kiến trúc", "Lịch sử", "Check-in"], en: ["Architecture", "History", "Check-in"] },
    highlights: { vi: ["Kiến trúc gỗ trắc", "Khuôn viên rộng rãi", "Thiết kế hòa quyện"], en: ["Rosewood architecture", "Spacious campus", "Blended design"] }
  },
  {
    id: 10,
    name: { vi: "Khu du lịch sinh thái Về Nguồn", en: "Ve Nguon Eco Resort" },
    description: { vi: "Không gian xanh mát, thích hợp cho các hoạt động vui chơi gia đình và thưởng thức ẩm thực.", en: "Green space, suitable for family fun activities and enjoying food." },
    shortDescription: { vi: "Khu nghỉ dưỡng sinh thái gia đình.", en: "Family eco-resort." },
    category: { vi: ["Nghỉ dưỡng", "Gia đình có trẻ em"], en: ["Relaxation", "Family with kids"] },
    rating: 4.3, reviewCount: 1150, price: 50000, priceNote: { vi: "50.000đ/người", en: "50,000 VND/person" },
    openTime: "08:00", closeTime: "20:00", duration: { vi: "Nửa ngày", en: "Half day" },
    address: { vi: "TP. Pleiku, Gia Lai", en: "Pleiku City, Gia Lai" },
    lat: 14.0011, lng: 107.9950,
    image: "/images/ve_nguon_eco_1782505339435.png",
    tags: { vi: ["Gia đình", "Trẻ em", "Ẩm thực"], en: ["Family", "Kids", "Food"] },
    highlights: { vi: ["Hồ bơi", "Nhà hàng", "Khu vui chơi trẻ em"], en: ["Pool", "Restaurant", "Kids area"] }
  },
  {
    id: 11,
    name: { vi: "Điện gió Đắk Đoa", en: "Dak Doa Wind Farm" },
    description: { vi: "Cánh đồng quạt gió khổng lồ đẹp như trời Âu, là điểm check-in hoàng hôn cực chill.", en: "A huge wind farm beautiful like Europe, a chill sunset check-in spot." },
    shortDescription: { vi: "Cánh đồng quạt gió check-in hoàng hôn tuyệt đẹp.", en: "Wind farm for beautiful sunset check-in." },
    category: { vi: ["Check-in", "Thiên nhiên"], en: ["Check-in", "Nature"] },
    rating: 4.5, reviewCount: 1800, price: 0, priceNote: { vi: "Miễn phí", en: "Free" },
    openTime: "00:00", closeTime: "23:59", duration: { vi: "1 giờ", en: "1 hour" },
    address: { vi: "H. Đắk Đoa, Gia Lai", en: "Dak Doa Dist, Gia Lai" },
    lat: 14.0500, lng: 108.1000,
    image: "/images/wind_farm_gia_lai_1782505268122.png",
    tags: { vi: ["Hoàng hôn", "Check-in", "Chill"], en: ["Sunset", "Check-in", "Chill"] },
    highlights: { vi: ["Tua bin gió khổng lồ", "Cánh đồng cỏ", "Hoàng hôn lãng mạn"], en: ["Giant wind turbines", "Grass field", "Romantic sunset"] }
  },
  {
    id: 12,
    name: { vi: "Kỳ Co", en: "Ky Co Beach" },
    description: { vi: "Được mệnh danh là Maldives của Việt Nam với làn nước trong xanh và bãi cát trắng mịn.", en: "Known as the Maldives of Vietnam with clear blue water and white sand." },
    shortDescription: { vi: "Thiên đường biển trong xanh tựa Maldives.", en: "A blue sea paradise like Maldives." },
    category: { vi: ["Biển", "Nghỉ dưỡng biển"], en: ["Beach", "Beach Resort"] },
    rating: 4.9, reviewCount: 5500, price: 100000, priceNote: { vi: "100.000đ/vé cổng", en: "100,000 VND/ticket" },
    openTime: "07:00", closeTime: "17:00", duration: { vi: "Nửa ngày", en: "Half day" },
    address: { vi: "Xã Nhơn Lý, Quy Nhơn", en: "Nhon Ly, Quy Nhon" },
    lat: 13.8828, lng: 109.2974,
    image: "/images/ky_co_beach_1782812243763.png",
    tags: { vi: ["Biển", "Sống ảo", "San hô"], en: ["Beach", "Check-in", "Coral"] },
    highlights: { vi: ["Nước biển trong vắt", "Lặn ngắm san hô", "Cầu Yến"], en: ["Crystal clear water", "Coral diving", "Yen Bridge"] }
  },
  {
    id: 13,
    name: { vi: "Eo Gió", en: "Eo Gio" },
    description: { vi: "Eo biển hình cung tuyệt đẹp được bao bọc bởi những rặng núi đá hùng vĩ.", en: "A beautiful bow-shaped strait surrounded by majestic rocky mountains." },
    shortDescription: { vi: "Nơi ngắm hoàng hôn và bình minh đẹp nhất Việt Nam.", en: "The best place to watch sunset and sunrise in Vietnam." },
    category: { vi: ["Biển", "Check-in"], en: ["Beach", "Check-in"] },
    rating: 4.8, reviewCount: 4800, price: 25000, priceNote: { vi: "25.000đ/vé", en: "25,000 VND/ticket" },
    openTime: "05:00", closeTime: "18:00", duration: { vi: "1-2 giờ", en: "1-2 hours" },
    address: { vi: "Xã Nhơn Lý, Quy Nhơn", en: "Nhon Ly, Quy Nhon" },
    lat: 13.8998, lng: 109.2842,
    image: "/images/eo_gio_1782812490073.png",
    tags: { vi: ["Cảnh quan", "Check-in", "Gió biển"], en: ["Landscape", "Check-in", "Sea breeze"] },
    highlights: { vi: ["Con đường ven biển đỏ rực", "Vách đá cheo leo", "Ống nhòm ngắm cảnh"], en: ["Red coastal road", "Steep cliffs", "Binoculars"] }
  },
  {
    id: 14,
    name: { vi: "Khu dã ngoại Trung Lương", en: "Trung Luong Camping" },
    description: { vi: "Khu cắm trại ven biển với phong cách lều trại mộc mạc và bãi tắm hoang sơ.", en: "Coastal camping area with rustic tents and pristine beaches." },
    shortDescription: { vi: "Thung lũng cắm trại sát biển lý tưởng.", en: "Ideal seaside camping valley." },
    category: { vi: ["Cắm trại ven biển", "Check-in"], en: ["Beach Camping", "Check-in"] },
    rating: 4.5, reviewCount: 2200, price: 40000, priceNote: { vi: "40.000đ/vé", en: "40,000 VND/ticket" },
    openTime: "07:00", closeTime: "22:00", duration: { vi: "Nửa ngày hoặc Qua đêm", en: "Half day or Overnight" },
    address: { vi: "Phù Cát, Quy Nhơn", en: "Phu Cat, Quy Nhon" },
    lat: 13.9450, lng: 109.1550,
    image: "/images/trung_luong_camp_1782812263702.png",
    tags: { vi: ["Cắm trại", "Chill", "Biển"], en: ["Camping", "Chill", "Beach"] },
    highlights: { vi: ["Ngủ lều ven biển", "Đốt lửa trại", "Check-in ghế gỗ"], en: ["Sleep in tent", "Campfire", "Wooden chairs"] }
  },
  {
    id: 15,
    name: { vi: "Ghềnh Ráng Tiên Sa", en: "Ghenh Rang Tien Sa" },
    description: { vi: "Khu du lịch nổi tiếng với Bãi tắm Hoàng Hậu (Bãi Đá Trứng) và khu mộ thi sĩ Hàn Mặc Tử.", en: "Famous tourist area with Queen Beach (Egg Stone Beach) and Han Mac Tu poet's grave." },
    shortDescription: { vi: "Chiêm ngưỡng Bãi Đá Trứng và viếng mộ Hàn Mặc Tử.", en: "Admire Egg Stone Beach and visit Han Mac Tu's grave." },
    category: { vi: ["Biển", "Văn hóa"], en: ["Beach", "Culture"] },
    rating: 4.6, reviewCount: 4100, price: 0, priceNote: { vi: "Miễn phí", en: "Free" },
    openTime: "06:00", closeTime: "21:00", duration: { vi: "1-2 giờ", en: "1-2 hours" },
    address: { vi: "Phường Ghềnh Ráng, Quy Nhơn", en: "Ghenh Rang Ward, Quy Nhon" },
    lat: 13.7540, lng: 109.2150,
    image: "/images/ghenh_rang_1782812297133.png",
    tags: { vi: ["Lịch sử", "Thi ca", "Biển"], en: ["History", "Poetry", "Beach"] },
    highlights: { vi: ["Bãi đá trứng khổng lồ", "Mộ thi sĩ Hàn Mặc Tử", "Đồi Thi Nhân"], en: ["Giant egg stones", "Han Mac Tu grave", "Poet's Hill"] }
  },
  {
    id: 16,
    name: { vi: "Cù Lao Xanh", en: "Cu Lao Xanh Island" },
    description: { vi: "Hòn ngọc Biển Đông với ngọn hải đăng cổ kính và nhịp sống làng chài yên bình.", en: "The pearl of the East Sea with an ancient lighthouse and a peaceful fishing village." },
    shortDescription: { vi: "Hòn đảo hoang sơ tuyệt đẹp cách xa đất liền.", en: "Beautiful pristine island far from the mainland." },
    category: { vi: ["Khám phá đảo", "Lặn ngắm san hô"], en: ["Island Exploration", "Coral Diving"] },
    rating: 4.8, reviewCount: 1500, price: 350000, priceNote: { vi: "Từ 350.000đ/Cano", en: "From 350k/Canoe" },
    openTime: "06:00", closeTime: "17:00", duration: { vi: "1 Ngày", en: "1 Day" },
    address: { vi: "Xã Nhơn Châu, Quy Nhơn", en: "Nhon Chau, Quy Nhon" },
    lat: 13.6167, lng: 109.3500,
    image: "/images/cu_lao_xanh_1782812499387.png",
    tags: { vi: ["Biển đảo", "Hải đăng", "Hải sản"], en: ["Islands", "Lighthouse", "Seafood"] },
    highlights: { vi: ["Ngọn hải đăng 100 tuổi", "Cột cờ tổ quốc", "San hô tuyệt đẹp"], en: ["100-year-old lighthouse", "Flagpole", "Beautiful coral"] }
  },
  {
    id: 17,
    name: { vi: "Safari Park FLC", en: "FLC Safari Park" },
    description: { vi: "Công viên động vật hoang dã đầu tiên tại Quy Nhơn với nhiều loài thú quý hiếm.", en: "The first wild animal park in Quy Nhon with many rare species." },
    shortDescription: { vi: "Trải nghiệm thế giới động vật hoang dã lý thú.", en: "Experience an interesting wild animal world." },
    category: { vi: ["Vui chơi giải trí", "Gia đình có trẻ em"], en: ["Entertainment", "Family with kids"] },
    rating: 4.5, reviewCount: 3000, price: 100000, priceNote: { vi: "100.000đ/vé", en: "100,000 VND/ticket" },
    openTime: "09:00", closeTime: "17:00", duration: { vi: "2-3 giờ", en: "2-3 hours" },
    address: { vi: "Khu du lịch FLC Nhơn Lý", en: "FLC Nhon Ly Resort" },
    lat: 13.9100, lng: 109.2800,
    image: "/images/safari_park_1782812318879.png",
    tags: { vi: ["Động vật", "Gia đình", "Trẻ em"], en: ["Animals", "Family", "Kids"] },
    highlights: { vi: ["Tương tác với thú", "Xe điện tham quan", "Chụp ảnh với vẹt"], en: ["Animal interaction", "Electric car tour", "Photo with parrots"] }
  },
  {
    id: 18,
    name: { vi: "Chùa Ông Núi", en: "Ong Nui Temple" },
    description: { vi: "Nơi có tượng Phật ngồi lớn nhất Đông Nam Á hướng ra biển cả bao la.", en: "Home to the largest sitting Buddha statue in Southeast Asia facing the vast sea." },
    shortDescription: { vi: "Tượng Phật khổng lồ linh thiêng tọa lạc trên núi cao.", en: "Sacred giant Buddha statue located on a high mountain." },
    category: { vi: ["Văn hóa", "Check-in"], en: ["Culture", "Check-in"] },
    rating: 4.7, reviewCount: 2500, price: 0, priceNote: { vi: "Miễn phí", en: "Free" },
    openTime: "06:00", closeTime: "18:00", duration: { vi: "1-2 giờ", en: "1-2 hours" },
    address: { vi: "Xã Cát Tiến, Phù Cát", en: "Cat Tien, Phu Cat" },
    lat: 13.9750, lng: 109.1850,
    image: "/images/ong_nui_temple_1782812307544.png",
    tags: { vi: ["Tâm linh", "Kiến trúc", "Check-in"], en: ["Spiritual", "Architecture", "Check-in"] },
    highlights: { vi: ["Leo 600 bậc thang", "Tượng Phật khổng lồ", "View ngắm biển từ trên cao"], en: ["Climb 600 stairs", "Giant Buddha statue", "Sea view from above"] }
  },
  {
    id: 19,
    name: { vi: "Tháp Đôi", en: "Twin Towers" },
    description: { vi: "Hai ngọn tháp Chăm pa cổ kính ngay giữa lòng thành phố Quy Nhơn.", en: "Two ancient Cham towers right in the heart of Quy Nhon city." },
    shortDescription: { vi: "Di tích kiến trúc văn hóa Chăm Pa rực rỡ.", en: "Brilliant Cham Pa cultural architecture relic." },
    category: { vi: ["Văn hóa"], en: ["Culture"] },
    rating: 4.4, reviewCount: 1900, price: 20000, priceNote: { vi: "20.000đ/vé", en: "20,000 VND/ticket" },
    openTime: "07:00", closeTime: "18:00", duration: { vi: "1 giờ", en: "1 hour" },
    address: { vi: "Đường Trần Hưng Đạo, Quy Nhơn", en: "Tran Hung Dao St, Quy Nhon" },
    lat: 13.7850, lng: 109.2150,
    image: "/images/thap_doi_1782812547242.png",
    tags: { vi: ["Lịch sử", "Chăm Pa", "Kiến trúc"], en: ["History", "Cham Pa", "Architecture"] },
    highlights: { vi: ["Kiến trúc gạch nung", "Phù điêu thần chim Garuda", "Check-in hoài cổ"], en: ["Baked brick architecture", "Garuda bird relief", "Nostalgic check-in"] }
  }
];

let content = fs.readFileSync('src/data/placesData.js', 'utf8');
content = content.replace('export const preferenceOptions', ',' + JSON.stringify(morePlaces, null, 2).slice(1, -1) + '];\n\nexport const preferenceOptions');
fs.writeFileSync('src/data/placesData.js', content);

const moreTours = [
  {
    id: 2,
    name: { vi: "Khám Phá Thiên Đường Đảo Cù Lao Xanh", en: "Explore Cu Lao Xanh Island Paradise" },
    duration: { vi: "1 Ngày", en: "1 Day" }, durationValue: 1,
    price: 750000, priceNote: { vi: "750.000đ/người", en: "750,000 VND/person" },
    category: { vi: ["Khám phá đảo", "Lặn ngắm san hô"], en: ["Island Exploration", "Coral Diving"] },
    rating: 4.9, reviewCount: 842, image: "/images/cu_lao_xanh_1782812499387.png",
    shortDescription: { vi: "Hành trình ra khơi khám phá hòn ngọc thanh bình Cù Lao Xanh.", en: "A journey to sea to explore the peaceful pearl Cu Lao Xanh." },
    description: { vi: "Trải nghiệm đi cano cao tốc ra đảo, lặn ngắm san hô, thưởng thức hải sản tươi sống và check-in ngọn hải đăng trăm tuổi.", en: "Experience riding a speedboat to the island, diving to see coral, enjoying fresh seafood and checking in at the hundred-year-old lighthouse." },
    highlights: { vi: ["Đi cano cao tốc", "Lặn ngắm san hô", "Hải đăng cổ"], en: ["Speedboat ride", "Coral diving", "Ancient lighthouse"] },
    itinerary: { vi: [{day: 1, title: "Quy Nhơn - Cù Lao Xanh", activities: [{time: "07:30", description: "Đón khách ra bến tàu."}]}], en: [{day: 1, title: "Quy Nhon - Cu Lao Xanh", activities: [{time: "07:30", description: "Pick up guests to the pier."}]}] },
    reviews: []
  },
  {
    id: 3,
    name: { vi: "Kỳ Co - Eo Gió Trọn Gói", en: "Ky Co - Eo Gio All-inclusive" },
    duration: { vi: "1 Ngày", en: "1 Day" }, durationValue: 1,
    price: 650000, priceNote: { vi: "650.000đ/người", en: "650,000 VND/person" },
    category: { vi: ["Biển", "Check-in"], en: ["Beach", "Check-in"] },
    rating: 4.8, reviewCount: 1250, image: "/images/ky_co_beach_1782812243763.png",
    shortDescription: { vi: "Tour phổ biến nhất Quy Nhơn khám phá 'Maldives Việt Nam'.", en: "The most popular tour in Quy Nhon to explore 'Maldives of Vietnam'." },
    description: { vi: "Tour tham quan Kỳ Co - Eo Gió với cano, bữa trưa hải sản 7 món và xe đưa đón tận nơi.", en: "Ky Co - Eo Gio tour with canoe, 7-course seafood lunch and door-to-door transfer." },
    highlights: { vi: ["Check-in Kỳ Co", "Ăn hải sản", "Ngắm cảnh Eo Gió"], en: ["Check-in Ky Co", "Eat seafood", "Sightseeing at Eo Gio"] },
    itinerary: { vi: [{day: 1, title: "Kỳ Co - Eo Gió", activities: [{time: "08:00", description: "Bắt đầu tour."}]}], en: [{day: 1, title: "Ky Co - Eo Gio", activities: [{time: "08:00", description: "Start the tour."}]}] },
    reviews: []
  },
  {
    id: 4,
    name: { vi: "Trekking Vườn Quốc Gia Kon Ka Kinh", en: "Trekking Kon Ka Kinh National Park" },
    duration: { vi: "2 Ngày 1 Đêm", en: "2 Days 1 Night" }, durationValue: 2,
    price: 1800000, priceNote: { vi: "1.800.000đ/người", en: "1,800,000 VND/person" },
    category: { vi: ["Trekking", "Cắm trại"], en: ["Trekking", "Camping"] },
    rating: 4.7, reviewCount: 310, image: "/images/kon_ka_kinh_1782505306871.png",
    shortDescription: { vi: "Thử thách giới hạn bản thân với cung đường trekking rừng nhiệt đới.", en: "Challenge your limits with a tropical forest trekking route." },
    description: { vi: "Hành trình băng rừng, vượt suối, cắm trại qua đêm giữa rừng già Kon Ka Kinh hùng vĩ.", en: "A journey through the forest, crossing streams, and camping overnight in the majestic Kon Ka Kinh old forest." },
    highlights: { vi: ["Băng rừng nguyên sinh", "Cắm trại lửa hồng", "Khám phá thiên nhiên"], en: ["Trek primeval forest", "Campfire", "Discover nature"] },
    itinerary: { vi: [{day: 1, title: "Bắt đầu Trekking", activities: [{time: "07:00", description: "Xuất phát."}]}], en: [{day: 1, title: "Start Trekking", activities: [{time: "07:00", description: "Depart."}]}] },
    reviews: []
  },
  {
    id: 5,
    name: { vi: "Camping Thung Lũng Trung Lương", en: "Camping at Trung Luong Valley" },
    duration: { vi: "2 Ngày 1 Đêm", en: "2 Days 1 Night" }, durationValue: 2,
    price: 850000, priceNote: { vi: "850.000đ/người", en: "850,000 VND/person" },
    category: { vi: ["Cắm trại ven biển", "Nghỉ dưỡng"], en: ["Beach Camping", "Relaxation"] },
    rating: 4.6, reviewCount: 620, image: "/images/trung_luong_camp_1782812263702.png",
    shortDescription: { vi: "Ngủ lều ven biển, BBQ hải sản và tiệc lửa trại.", en: "Sleep in a tent by the sea, seafood BBQ and campfire party." },
    description: { vi: "Trải nghiệm cắm trại cực chill tại thung lũng Trung Lương với mọi trang thiết bị được chuẩn bị sẵn.", en: "A very chill camping experience at Trung Luong valley with all equipment prepared." },
    highlights: { vi: ["BBQ tối", "Ngắm sao biển", "Check-in sống ảo"], en: ["Dinner BBQ", "Stargazing", "Check-in photos"] },
    itinerary: { vi: [{day: 1, title: "Cắm trại đêm", activities: [{time: "15:00", description: "Nhận lều."}]}], en: [{day: 1, title: "Night camping", activities: [{time: "15:00", description: "Check-in tent."}]}] },
    reviews: []
  },
  {
    id: 6,
    name: { vi: "City Tour Gia Lai - Hương Vị Phố Núi", en: "Gia Lai City Tour - Mountain Flavors" },
    duration: { vi: "1 Ngày", en: "1 Day" }, durationValue: 1,
    price: 450000, priceNote: { vi: "450.000đ/người", en: "450,000 VND/person" },
    category: { vi: ["Ẩm thực", "Check-in"], en: ["Food", "Check-in"] },
    rating: 4.8, reviewCount: 1100, image: "/images/pleiku_food_street_1782505210206.png",
    shortDescription: { vi: "Khám phá ẩm thực đường phố và các quán cà phê độc đáo tại Pleiku.", en: "Explore street food and unique cafes in Pleiku." },
    description: { vi: "Thưởng thức Phở Khô Gia Lai, cà phê view đồi núi, thăm Chùa Minh Thành.", en: "Enjoy Gia Lai Dry Pho, mountain view coffee, visit Minh Thanh Pagoda." },
    highlights: { vi: ["Ăn sập Pleiku", "Cà phê view xịn", "Chùa Minh Thành"], en: ["Eat around Pleiku", "Great view coffee", "Minh Thanh Pagoda"] },
    itinerary: { vi: [{day: 1, title: "Food Tour", activities: [{time: "08:00", description: "Ăn sáng Phở Khô."}]}], en: [{day: 1, title: "Food Tour", activities: [{time: "08:00", description: "Breakfast Dry Pho."}]}] },
    reviews: []
  },
  {
    id: 7,
    name: { vi: "Gia Lai - Mùa Hoa Dã Quỳ Chư Đăng Ya", en: "Gia Lai - Chu Dang Ya Wild Sunflower Season" },
    duration: { vi: "1 Ngày", en: "1 Day" }, durationValue: 1,
    price: 550000, priceNote: { vi: "550.000đ/người", en: "550,000 VND/person" },
    category: { vi: ["Thiên nhiên", "Check-in"], en: ["Nature", "Check-in"] },
    rating: 4.9, reviewCount: 2300, image: "/images/chu_dang_ya_volcano_1782505165301.png",
    shortDescription: { vi: "Đắm chìm trong sắc vàng rực rỡ của hoa dã quỳ trên sườn núi lửa.", en: "Immerse in the brilliant yellow of wild sunflowers on the volcano slopes." },
    description: { vi: "Tour theo mùa (Tháng 10 - 11). Tham quan lễ hội hoa dã quỳ tại Chư Đăng Ya và check-in hàng thông trăm tuổi.", en: "Seasonal tour (Oct - Nov). Visit the wild sunflower festival at Chu Dang Ya and check-in the century-old pine row." },
    highlights: { vi: ["Lễ hội hoa dã quỳ", "Hàng thông trăm tuổi", "Chụp ảnh nghệ thuật"], en: ["Wild sunflower festival", "Century-old pine row", "Art photography"] },
    itinerary: { vi: [{day: 1, title: "Ngắm Hoa Dã Quỳ", activities: [{time: "08:00", description: "Đến Chư Đăng Ya."}]}], en: [{day: 1, title: "Watch Wild Sunflowers", activities: [{time: "08:00", description: "Arrive at Chu Dang Ya."}]}] },
    reviews: []
  }
];

let contentTours = fs.readFileSync('src/data/toursData.js', 'utf8');
contentTours = contentTours.replace('export const CATEGORY_CONFIG', ',' + JSON.stringify(moreTours, null, 2).slice(1, -1) + '];\n\nexport const CATEGORY_CONFIG');
fs.writeFileSync('src/data/toursData.js', contentTours);
