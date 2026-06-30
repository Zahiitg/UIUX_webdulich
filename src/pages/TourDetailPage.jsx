import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import toursData from '../data/toursData';
import useTravelStore from '../store/useTravelStore';
import Breadcrumb from '../components/Breadcrumb';
import ShareMenu from '../components/ShareMenu';

const FALLBACK_IMAGES = [
  "/images/lang_stor_bahnar_1782505259629.png",
  "/images/doi_che_gia_lai_1782505177095.png",
];

function StarRating({ rating, size = 'md' }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  const sizeClass = size === 'lg' ? 'text-lg' : 'text-sm';

  return (
    <div className={`flex items-center gap-0.5 ${sizeClass}`}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-amber-400">★</span>
      ))}
      {hasHalf && <span className="text-amber-400">★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-dark-200">★</span>
      ))}
    </div>
  );
}

export default function TourDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const promoPriceParam = searchParams.get('promoPrice');

  const baseTour = toursData.find((t) => t.id === Number(id));
  const tour = baseTour ? { ...baseTour, price: promoPriceParam ? parseInt(promoPriceParam) : baseTour.price } : null;

  const wishlist = useTravelStore((state) => state.wishlist);
  const toggleWishlist = useTravelStore((state) => state.toggleWishlist);
  const isWishlisted = wishlist.includes(tour?.id);

  // Booking Modal State
  const [showBooking, setShowBooking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const addBooking = useTravelStore(state => state.addBooking);
  
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    date: '',
    adults: 1,
    children: 0,
  });

  // Review State
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    if (tour) setReviews(tour.reviews || []);
  }, [tour]);

  if (!tour) {
    return (
      <div className="page-container flex flex-col items-center justify-center min-h-screen px-4">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy Tour</h2>
        <button onClick={() => navigate(-1)} className="btn-primary">← Quay lại</button>
      </div>
    );
  }

  // Tiền tính tự động
  const totalPrice = (bookingData.adults * tour.price) + (bookingData.children * tour.price * 0.7);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Giả lập thanh toán
    setTimeout(() => {
      setIsProcessing(false);
      
      // Tạo mã booking ngẫu nhiên
      const code = 'GL-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      
      // Lưu vào store
      addBooking({
        id: code,
        tourId: tour.id,
        tourName: tour.name,
        image: tour.image,
        ...bookingData,
        totalPrice,
        status: 'completed',
        createdAt: new Date().toISOString()
      });

      setShowBooking(false);
      
      // Chuyển hướng
      navigate(`/booking-confirmation/${code}`);
    }, 1500);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    const reviewObj = {
      id: Date.now(),
      user: "Khách",
      rating: newReview.rating,
      date: new Date().toLocaleDateString('vi-VN'),
      comment: newReview.comment
    };
    setReviews([reviewObj, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="page-container min-h-screen bg-white dark:bg-slate-900 pb-28">
      {/* ──── Hero Section ──── */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.src = FALLBACK_IMAGES[tour.id % 2]; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors">
          <span className="text-white">←</span>
        </button>

        <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
          <ShareMenu title={`Khám phá tour: ${tour.name}`} />
          <button 
            onClick={() => toggleWishlist(tour.id)} 
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
            title="Yêu thích"
          >
            <svg className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-white'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isWishlisted ? 0 : 2} fill={isWishlisted ? "currentColor" : "none"}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-5 z-10">
          <div className="flex gap-2 mb-3">
            {tour.category.slice(0,3).map(cat => (
              <span key={cat} className="px-2.5 py-1 bg-primary-500 text-white rounded-full text-xs font-semibold">{cat}</span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-lg">{tour.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-white/90 text-sm">
            <span className="flex items-center gap-1"><StarRating rating={tour.rating} /> {tour.rating}</span>
            <span>•</span>
            <span>{tour.duration}</span>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 -mt-4 relative z-10 max-w-4xl mx-auto">
        <div className="pt-8 pb-4">
          <Breadcrumb items={[
            { label: 'Tours', path: '/tours' },
            { label: tour.name }
          ]} />
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-5 mb-6 border border-dark-100 dark:border-slate-700">
          <p className="text-dark-600 dark:text-slate-300 text-sm leading-relaxed">{tour.description}</p>
        </div>

        {/* Highlights */}
        <h2 className="section-title text-lg mb-4 flex items-center gap-2 dark:text-white">
          <span className="w-1 h-6 bg-accent-500 rounded-full" />
          Điểm nổi bật
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {tour.highlights.map((hl, i) => (
            <div key={i} className="flex items-start gap-3 bg-primary-50/50 dark:bg-slate-800 rounded-xl p-3">
              <span className="text-primary-500">✨</span>
              <span className="text-sm font-medium text-dark-800 dark:text-slate-200">{hl}</span>
            </div>
          ))}
        </div>

        {/* Itinerary */}
        <h2 className="section-title text-lg mb-4 flex items-center gap-2 dark:text-white">
          <span className="w-1 h-6 bg-green-500 rounded-full" />
          Lịch trình chi tiết
        </h2>
        <div className="space-y-6 mb-10">
          {tour.itinerary.map((day, idx) => (
            <div key={idx} className="border-l-2 border-primary-200 dark:border-slate-700 ml-3 pl-5 relative">
              <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 font-bold text-xs flex items-center justify-center border-2 border-white dark:border-slate-900">
                {day.day}
              </span>
              <h3 className="font-bold text-dark-800 dark:text-slate-100 mb-3">{day.title}</h3>
              <div className="space-y-3">
                {day.activities.map((act, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="font-semibold text-primary-600 dark:text-primary-400 min-w-[45px]">{act.time}</span>
                    <span className="text-dark-600 dark:text-slate-300">{act.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <h2 className="section-title text-lg mb-4 flex items-center gap-2 dark:text-white">
          <span className="w-1 h-6 bg-amber-500 rounded-full" />
          Đánh giá từ khách hàng
        </h2>
        
        {/* Add Review Form */}
        <div className="bg-dark-50 dark:bg-slate-800 rounded-xl p-4 mb-6">
          <h4 className="font-semibold mb-3 dark:text-white text-sm">Viết đánh giá của bạn</h4>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <div className="flex gap-2">
              {[1,2,3,4,5].map(star => (
                <button key={star} type="button" onClick={() => setNewReview({...newReview, rating: star})} className="text-2xl focus:outline-none">
                  {star <= newReview.rating ? <span className="text-amber-400">★</span> : <span className="text-dark-200">★</span>}
                </button>
              ))}
            </div>
            <textarea 
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              placeholder="Chia sẻ trải nghiệm của bạn..."
              className="w-full bg-white dark:bg-slate-900 border border-dark-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-primary-500 dark:text-white"
              rows="3"
            />
            <button type="submit" className="btn-primary py-2 px-6 text-sm">Gửi đánh giá</button>
          </form>
        </div>

        {/* Review List */}
        <div className="space-y-4">
          {reviews.map(rev => (
            <div key={rev.id} className="bg-white dark:bg-slate-800 border border-dark-100 dark:border-slate-700 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm dark:text-white">{rev.user}</span>
                <span className="text-xs text-dark-400">{rev.date}</span>
              </div>
              <StarRating rating={rev.rating} />
              <p className="text-sm text-dark-600 dark:text-slate-300 mt-2">{rev.comment}</p>
            </div>
          ))}
        </div>

      </div>

      {/* ──── Sticky Bottom Bar ──── */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-dark-100 dark:border-slate-800 px-4 py-3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-dark-500 dark:text-slate-400 font-medium">Giá từ</p>
            <p className="text-xl font-extrabold text-primary-600 dark:text-primary-400">{tour.price.toLocaleString('vi-VN')}đ</p>
          </div>
          <button onClick={() => setShowBooking(true)} className="btn-primary px-8 shadow-lg shadow-primary-500/30">
            Đặt Tour Ngay
          </button>
        </div>
      </div>

      {/* ──── Booking Modal ──── */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
            <button onClick={() => !isProcessing && setShowBooking(false)} className="absolute top-4 right-4 text-dark-400 hover:text-dark-800 dark:hover:text-white z-10">
              ✕
            </button>
            
              <form onSubmit={handleBookingSubmit} className="p-6">
                <h3 className="text-xl font-bold mb-6 dark:text-white">Thông tin Đặt Tour</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-slate-300">Ngày khởi hành</label>
                    <input required type="date" value={bookingData.date} onChange={e=>setBookingData({...bookingData, date: e.target.value})} className="w-full bg-dark-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1 dark:text-slate-300">Người lớn</label>
                      <input type="number" min="1" value={bookingData.adults} onChange={e=>setBookingData({...bookingData, adults: parseInt(e.target.value)||1})} className="w-full bg-dark-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1 dark:text-slate-300">Trẻ em (Giảm 30%)</label>
                      <input type="number" min="0" value={bookingData.children} onChange={e=>setBookingData({...bookingData, children: parseInt(e.target.value)||0})} className="w-full bg-dark-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-primary-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-slate-300">Họ và tên</label>
                    <input required type="text" placeholder="Nhập họ tên" value={bookingData.name} onChange={e=>setBookingData({...bookingData, name: e.target.value})} className="w-full bg-dark-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-slate-300">Số điện thoại</label>
                    <input required type="tel" placeholder="Nhập SĐT" value={bookingData.phone} onChange={e=>setBookingData({...bookingData, phone: e.target.value})} className="w-full bg-dark-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-dark-100 dark:border-slate-800 flex justify-between items-end mb-6">
                  <span className="text-sm font-medium text-dark-500 dark:text-slate-400">Tổng cộng</span>
                  <span className="text-2xl font-black text-primary-600 dark:text-primary-400">{totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>

                <button disabled={isProcessing} type="submit" className="w-full btn-primary py-4 text-base relative">
                  {isProcessing ? (
                     <span className="animate-pulse">Đang xử lý thanh toán...</span>
                  ) : (
                    "Thanh toán an toàn"
                  )}
                </button>
                <p className="text-center text-xs text-dark-400 mt-3">* Sau này sẽ tích hợp VNPay/MoMo tại đây</p>
              </form>
          </div>
        </div>
      )}
    </div>
  );
}
