import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Promotional Deals Data ──────────────────────────────
const PROMO_DEALS = [
  {
    id: 1,
    name: 'Tour Biển Hồ Hoàng Hôn',
    discount: 20,
    price: 599000,
    originalPrice: 749000,
    duration: '1 ngày',
    image: '/images/bien_ho_tnnung_1782505155088.png',
    highlights: [
      'Ngắm hoàng hôn tuyệt đẹp bên Biển Hồ',
      'Hướng dẫn viên địa phương chuyên nghiệp',
      'Bao gồm bữa tối đặc sản Tây Nguyên',
      'Đưa đón tận nơi lưu trú',
    ],
    tag: 'Phổ biến',
  },
  {
    id: 2,
    name: 'Combo Trekking Chư Đăng Ya + Thác Phú Cường',
    discount: 15,
    price: 899000,
    originalPrice: 1058000,
    duration: '2 ngày',
    image: '/images/chu_dang_ya_volcano_1782505165301.png',
    highlights: [
      'Chinh phục miệng núi lửa triệu năm',
      'Tắm thác Phú Cường hùng vĩ',
      'Cắm trại dưới bầu trời sao',
      '1 đêm nghỉ homestay bản địa',
    ],
    tag: 'Mạo hiểm',
  },
  {
    id: 3,
    name: 'Tour Văn Hóa Tây Nguyên',
    discount: 30,
    price: 1299000,
    originalPrice: 1856000,
    duration: '3 ngày',
    image: '/images/lang_stor_bahnar_1782505259629.png',
    highlights: [
      'Tham quan làng Bahnar & Jrai truyền thống',
      'Thưởng thức đêm cồng chiêng UNESCO',
      'Học dệt thổ cẩm cùng nghệ nhân',
      'Trọn gói ăn ở – đi lại',
    ],
    tag: 'Bán chạy nhất',
  },
  {
    id: 4,
    name: 'Đêm Cồng Chiêng Trọn Gói',
    discount: 25,
    price: 450000,
    originalPrice: 600000,
    duration: '1 buổi tối',
    image: '/images/lang_stor_bahnar_1782505259629.png',
    highlights: [
      'Biểu diễn cồng chiêng đích thực',
      'Tiệc rượu cần & thịt nướng',
      'Múa xoang cùng đồng bào',
      'Quà lưu niệm thổ cẩm tặng kèm',
    ],
    tag: 'Đặc sắc',
  },
  {
    id: 5,
    name: 'Tour Cà Phê Pleiku',
    discount: 10,
    price: 350000,
    originalPrice: 389000,
    duration: 'Nửa ngày',
    image: '/images/doi_che_gia_lai_1782505177095.png',
    highlights: [
      'Tham quan vườn cà phê bạt ngàn',
      'Rang – xay – pha cà phê thủ công',
      'Thưởng thức phở khô Gia Lai nổi tiếng',
      'Mang về 200g cà phê đặc sản',
    ],
    tag: 'Giá tốt',
  },
  {
    id: 6,
    name: 'Trọn Gói Khám Phá Gia Lai 5N4Đ',
    discount: 35,
    price: 3999000,
    originalPrice: 6152000,
    duration: '5 ngày',
    image: '/images/bien_ho_tnnung_1782505155088.png',
    highlights: [
      'Tất cả điểm nổi bật trong 1 hành trình',
      'Khách sạn 3 sao + homestay',
      'Vé máy bay khứ hồi (tùy chọn)',
      'Bảo hiểm du lịch & HDV suốt tuyến',
    ],
    tag: 'Siêu tiết kiệm',
  },
];

// ─── Helpers ──────────────────────────────────────────────
const formatVND = (amount) =>
  new Intl.NumberFormat('vi-VN').format(amount) + 'đ';

// ─── Countdown Timer Hook ─────────────────────────────────
function useCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return { hours, minutes, secs, isExpired: seconds <= 0 };
}

// ─── Countdown Digit Box ──────────────────────────────────
function CountdownBox({ value, label }) {
  const display = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-dark-900 to-dark-800 dark:from-slate-800 dark:to-slate-900 border border-amber-500/30 shadow-lg shadow-amber-500/10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent" />
        <span className="text-3xl sm:text-4xl font-black text-amber-400 tabular-nums tracking-tight relative z-10">
          {display}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-dark-400 dark:text-slate-400 mt-2 font-semibold">
        {label}
      </span>
    </div>
  );
}

// ─── Discount Ribbon ──────────────────────────────────────
function DiscountRibbon({ discount }) {
  return (
    <div className="absolute -top-1 -right-1 z-20">
      <div className="relative">
        <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white font-black text-sm sm:text-base px-4 py-1.5 rounded-bl-xl rounded-tr-xl shadow-lg shadow-red-500/40">
          -{discount}%
        </div>
        <div className="absolute top-full right-0 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-rose-800" />
      </div>
    </div>
  );
}

// ─── Deal Tag Badge ───────────────────────────────────────
function DealTag({ tag }) {
  const colors = {
    'Phổ biến': 'from-blue-500 to-cyan-500',
    'Mạo hiểm': 'from-emerald-500 to-teal-500',
    'Bán chạy nhất': 'from-amber-500 to-orange-500',
    'Đặc sắc': 'from-purple-500 to-pink-500',
    'Giá tốt': 'from-green-500 to-emerald-500',
    'Siêu tiết kiệm': 'from-red-500 to-amber-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${colors[tag] || 'from-gray-500 to-gray-600'} shadow-md`}
    >
      {tag}
    </span>
  );
}

// ─── Deal Card ────────────────────────────────────────────
function DealCard({ deal, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`group relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-white/20 dark:border-slate-700/30 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Ribbon */}
      <DiscountRibbon discount={deal.discount} />

      {/* Image Section */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={deal.image}
          alt={deal.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          onError={(e) => {
            e.target.src = '/images/bien_ho_tnnung_1782505155088.png';
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-semibold">
            🕐 {deal.duration}
          </span>
        </div>

        {/* Tag */}
        <div className="absolute top-3 left-3">
          <DealTag tag={deal.tag} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6">
        {/* Deal Name */}
        <h3 className="text-lg sm:text-xl font-bold text-dark-900 dark:text-white mb-3 leading-snug line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
          {deal.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-end gap-3 mb-4">
          <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            {formatVND(deal.price)}
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-dark-400 dark:text-slate-500 line-through">
              {formatVND(deal.originalPrice)}
            </span>
            <span className="text-[10px] text-dark-400 dark:text-slate-500 font-medium">/người</span>
          </div>
        </div>

        {/* Savings */}
        <div className="mb-4 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 inline-block">
          <span className="text-xs font-bold text-green-600 dark:text-green-400">
            💰 Tiết kiệm {formatVND(deal.originalPrice - deal.price)}
          </span>
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-5">
          {deal.highlights.map((hl, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-dark-600 dark:text-slate-300">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">✓</span>
              <span>{hl}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={() => navigate(`/tour-detail/${deal.id <= 5 ? deal.id : 1}?promoPrice=${deal.price}`)}
          className="w-full py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
        >
          🔥 Đặt ngay
        </button>
      </div>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { icon: '👥', value: '2,847', label: 'Khách đã đặt' },
    { icon: '⭐', value: '4.9/5', label: 'Đánh giá' },
    { icon: '🎯', value: '99%', label: 'Hài lòng' },
    { icon: '🔒', value: '100%', label: 'Hoàn tiền' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-slate-700/30 rounded-2xl p-4 text-center hover:bg-white/80 dark:hover:bg-slate-900/80 transition-all duration-300"
        >
          <span className="text-2xl mb-1 block">{stat.icon}</span>
          <span className="text-xl font-black text-dark-900 dark:text-white block">{stat.value}</span>
          <span className="text-[11px] text-dark-400 dark:text-slate-400 font-medium uppercase tracking-wider">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Newsletter CTA ───────────────────────────────────────
function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  }, [email]);

  return (
    <section className="mt-16 mb-8 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
      <div className="relative bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20 backdrop-blur-md border border-amber-500/20 dark:border-amber-700/30 rounded-3xl p-8 sm:p-10 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative z-10">
          <span className="text-4xl mb-3 block">📩</span>
          <h3 className="text-2xl sm:text-3xl font-black text-dark-900 dark:text-white mb-2">
            Đừng bỏ lỡ ưu đãi!
          </h3>
          <p className="text-dark-500 dark:text-slate-400 mb-6 max-w-lg mx-auto text-sm sm:text-base">
            Đăng ký nhận thông báo về các chương trình khuyến mãi mới nhất từ Gia Lai Travel
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/30 text-green-600 dark:text-green-400 font-semibold">
              ✅ Đăng ký thành công! Chúng tôi sẽ gửi ưu đãi cho bạn.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/30 dark:border-slate-600/30 backdrop-blur-md text-dark-900 dark:text-white placeholder:text-dark-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm whitespace-nowrap"
              >
                Đăng ký ngay
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// ─── Main Page Component ──────────────────────────────────
// ═══════════════════════════════════════════════════════════
export default function PromotionPage() {
  // 7 hours countdown (fake promo timer)
  const { hours, minutes, secs, isExpired } = useCountdown(7 * 3600 + 23 * 60 + 45);
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { key: 'all', label: 'Tất cả', icon: '🔥' },
    { key: 'day', label: '1 ngày', icon: '☀️' },
    { key: 'multi', label: 'Nhiều ngày', icon: '🗓️' },
    { key: 'hot', label: 'Giảm ≥25%', icon: '💎' },
  ];

  const filteredDeals = PROMO_DEALS.filter((deal) => {
    if (filter === 'all') return true;
    if (filter === 'day') return deal.duration === '1 ngày' || deal.duration === 'Nửa ngày' || deal.duration === '1 buổi tối';
    if (filter === 'multi') return deal.duration !== '1 ngày' && deal.duration !== 'Nửa ngày' && deal.duration !== '1 buổi tối';
    if (filter === 'hot') return deal.discount >= 25;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30 dark:from-dark-950 dark:via-slate-950 dark:to-dark-950 pt-24 pb-12">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden mb-8">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-400/20 dark:bg-amber-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-10 right-1/4 w-56 h-56 bg-orange-400/20 dark:bg-orange-500/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-red-400/10 dark:bg-red-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Flash deal badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 dark:bg-red-900/30 border border-red-500/20 dark:border-red-700/30 mb-6 animate-fade-in">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-red-600 dark:text-red-400 text-sm font-bold uppercase tracking-wider">
              Flash Sale đang diễn ra
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 animate-fade-in-up">
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              🔥 Ưu Đãi Đặc Biệt
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-dark-500 dark:text-slate-400 max-w-2xl mx-auto mb-8 animate-fade-in-up font-medium" style={{ animationDelay: '100ms' }}>
            Khám phá Gia Lai với giá ưu đãi không thể tốt hơn!
          </p>

          {/* ── Countdown Timer ── */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <p className="text-sm sm:text-base font-semibold text-dark-600 dark:text-slate-300 mb-4 uppercase tracking-wider">
              {isExpired ? '⏰ Ưu đãi đã kết thúc!' : '⏰ Ưu đãi kết thúc sau'}
            </p>

            {!isExpired && (
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
                <CountdownBox value={hours} label="Giờ" />
                <span className="text-3xl font-black text-amber-500 animate-pulse mt-[-20px]">:</span>
                <CountdownBox value={minutes} label="Phút" />
                <span className="text-3xl font-black text-amber-500 animate-pulse mt-[-20px]">:</span>
                <CountdownBox value={secs} label="Giây" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Stats Bar */}
        <StatsBar />

        {/* ── Filter Tabs ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key)}
              className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                filter === opt.key
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-slate-700/30 text-dark-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-900/80'
              }`}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>

        {/* ── Deal Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDeals.map((deal, index) => (
            <DealCard key={deal.id} deal={deal} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {filteredDeals.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
              Không có ưu đãi phù hợp
            </h3>
            <p className="text-dark-500 dark:text-slate-400 mb-4">
              Thử chọn bộ lọc khác để tìm deal phù hợp với bạn
            </p>
            <button
              onClick={() => setFilter('all')}
              className="px-6 py-3 rounded-2xl font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all duration-300"
            >
              Xem tất cả ưu đãi
            </button>
          </div>
        )}

        {/* ── Terms Notice ── */}
        <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="inline-flex items-start gap-2 px-5 py-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/20 dark:border-slate-700/20">
            <span className="text-amber-500 mt-0.5">ℹ️</span>
            <p className="text-xs text-dark-400 dark:text-slate-500 text-left max-w-lg">
              Giá ưu đãi chỉ áp dụng cho đặt chỗ trực tuyến trong thời gian khuyến mãi. 
              Số lượng có hạn, áp dụng đến khi hết suất. Điều kiện & điều khoản được áp dụng.
            </p>
          </div>
        </div>

        {/* ── Newsletter ── */}
        <NewsletterCTA />
      </div>
    </div>
  );
}
