import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Search } from 'lucide-react';
import useTravelStore from '../store/useTravelStore';
import toursData from '../data/toursData';
import TourCard from '../components/TourCard';

export default function WishlistPage() {
  const wishlistIds = useTravelStore((state) => state.wishlist);

  const wishlistTours = useMemo(() => {
    return toursData.filter(tour => wishlistIds.includes(tour.id));
  }, [wishlistIds]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline mb-4 font-medium">
              <ArrowLeft className="w-4 h-4" /> Về trang chủ
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-dark-900 dark:text-white flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              Danh sách yêu thích
            </h1>
            <p className="text-dark-500 dark:text-slate-400 mt-2">
              Bạn đang lưu {wishlistTours.length} địa điểm
            </p>
          </div>
          
          {wishlistTours.length > 0 && (
            <Link to="/tours" className="btn-outline">
              <Search className="w-4 h-4 mr-2" />
              Khám phá thêm
            </Link>
          )}
        </div>

        {/* Content */}
        {wishlistTours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {wishlistTours.map((tour, index) => (
              <TourCard key={tour.id} place={tour} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-dark-100 dark:border-slate-800 animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-red-300 dark:text-red-500/50" />
            </div>
            <h3 className="text-xl font-bold text-dark-800 dark:text-white mb-2">Chưa có mục nào yêu thích</h3>
            <p className="text-dark-500 dark:text-slate-400 max-w-md mx-auto mb-8">
              Hãy lưu lại những điểm đến bạn ấn tượng để dễ dàng lên kế hoạch cho chuyến đi sắp tới nhé!
            </p>
            <Link to="/tours" className="btn-primary">
              Khám phá các điểm đến
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
