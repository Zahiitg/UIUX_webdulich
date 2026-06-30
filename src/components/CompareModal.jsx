import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTravelStore from '../store/useTravelStore';
import { X, CheckCircle2, Clock, Star, MapPin } from 'lucide-react';
import toursData from '../data/toursData';

export default function CompareModal() {
  const isCompareModalOpen = useTravelStore((state) => state.isCompareModalOpen);
  const setCompareModalOpen = useTravelStore((state) => state.setCompareModalOpen);
  const compareList = useTravelStore((state) => state.compareList);
  const toggleCompare = useTravelStore((state) => state.toggleCompare);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setCompareModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setCompareModalOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isCompareModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCompareModalOpen]);

  if (!isCompareModalOpen) return null;

  const comparedTours = compareList.map(id => toursData.find(t => t.id === id)).filter(Boolean);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 print:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setCompareModalOpen(false)}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
            So sánh Tours
            <span className="text-sm font-medium px-2.5 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full">
              {compareList.length}/3
            </span>
          </h2>
          <button 
            onClick={() => setCompareModalOpen(false)}
            className="w-10 h-10 rounded-full bg-dark-50 dark:bg-slate-800 flex items-center justify-center text-dark-500 hover:text-dark-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-5 custom-scrollbar">
          {comparedTours.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-dark-400 dark:text-slate-500 py-12">
              <p>Chưa có tour nào để so sánh.</p>
            </div>
          ) : (
            <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-6 min-w-max md:min-w-0 pb-4">
              {comparedTours.map(tour => (
                <div key={tour.id} className="w-[300px] md:w-auto flex flex-col gap-4 border border-dark-200 dark:border-slate-700 rounded-2xl p-4 bg-dark-50/50 dark:bg-slate-800/30 relative">
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => {
                      toggleCompare(tour.id);
                      if (comparedTours.length <= 1) setCompareModalOpen(false);
                    }}
                    title="Xóa khỏi so sánh"
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Image & Title */}
                  <div className="space-y-3">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-sm">
                      <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-lg text-dark-900 dark:text-white leading-tight line-clamp-2" title={tour.name}>
                      {tour.name}
                    </h3>
                  </div>

                  <hr className="border-dark-200 dark:border-slate-700" />

                  {/* Key Stats */}
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-dark-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-1">Giá</span>
                      <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                        {tour.price === 0 ? 'Miễn phí' : tour.priceNote}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-dark-700 dark:text-slate-300">
                      <Clock className="w-4 h-4 text-dark-400 dark:text-slate-500" />
                      <span className="font-medium">{tour.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 text-dark-700 dark:text-slate-300">
                      <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
                      <span className="font-bold">{tour.rating}</span>
                      <span className="text-sm text-dark-400 dark:text-slate-500">({tour.reviewCount})</span>
                    </div>
                  </div>

                  <hr className="border-dark-200 dark:border-slate-700" />

                  {/* Highlights */}
                  <div className="flex-1">
                    <span className="text-xs text-dark-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Điểm nổi bật</span>
                    <ul className="space-y-2 mb-4">
                      {tour.highlights.slice(0, 4).map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-dark-600 dark:text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Category */}
                    <span className="text-xs text-dark-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-2 block mt-4">Thể loại</span>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tour.category.map((cat, idx) => (
                        <span key={idx} className="px-2 py-1 bg-dark-100 dark:bg-slate-700 text-dark-600 dark:text-slate-300 rounded-lg text-xs font-medium">
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Short Description */}
                    <span className="text-xs text-dark-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-2 block mt-4">Tổng quan</span>
                    <p className="text-sm text-dark-600 dark:text-slate-400 mb-4 line-clamp-3" title={tour.shortDescription}>
                      {tour.shortDescription}
                    </p>

                    {/* Itinerary Summary */}
                    <span className="text-xs text-dark-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-2 block mt-4">Lịch trình tóm tắt</span>
                    <ul className="space-y-1">
                      {tour.itinerary.map((day, idx) => (
                        <li key={idx} className="text-sm text-dark-600 dark:text-slate-400 flex items-start gap-2">
                          <span className="font-bold text-primary-500 flex-shrink-0">N{day.day}:</span>
                          <span className="line-clamp-1" title={day.title}>{day.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action */}
                  <div className="mt-4 pt-4 border-t border-dark-200 dark:border-slate-700">
                    <Link 
                      to={`/tour-detail/${tour.id}`}
                      onClick={() => setCompareModalOpen(false)}
                      className="w-full block text-center py-2.5 rounded-xl bg-dark-900 dark:bg-slate-700 hover:bg-black dark:hover:bg-slate-600 text-white font-medium transition-colors"
                    >
                      Xem chi tiết tour
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
