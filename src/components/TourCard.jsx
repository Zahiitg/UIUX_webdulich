import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useTravelStore from '../store/useTravelStore';
import { CATEGORY_CONFIG } from '../data/toursData';
import { useTranslation } from 'react-i18next';

// Star rating component
function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${
            i < fullStars
              ? 'text-accent-400'
              : i === fullStars && hasHalf
              ? 'text-accent-300'
              : 'text-dark-300 dark:text-slate-600'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TourCard({ place, index }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'vi';
  
  const [imgError, setImgError] = useState(false);
  
  const wishlist = useTravelStore((state) => state.wishlist);
  const toggleWishlist = useTravelStore((state) => state.toggleWishlist);
  const isWishlisted = wishlist.includes(place.id);

  const compareList = useTravelStore((state) => state.compareList);
  const toggleCompare = useTravelStore((state) => state.toggleCompare);
  const isCompared = compareList.includes(place.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(place.id);
  };

  const handleCompare = (e) => {
    e.preventDefault();
    if (!isCompared && compareList.length >= 3) {
      toast.error('Chỉ được so sánh tối đa 3 tour!');
      return;
    }
    toggleCompare(place.id);
    if (!isCompared) {
      toast.success('Đã thêm vào danh sách so sánh');
    } else {
      toast.success('Đã xóa khỏi danh sách so sánh', { icon: '🗑️' });
    }
  };

  return (
    <Link
      to={`/tour-detail/${place.id}`}
      className="group block animate-fade-in-up"
      style={{ animationDelay: `${(index || 0) * 80}ms`, animationFillMode: 'both' }}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-card hover:shadow-float hover:-translate-y-2 transition-all duration-500 ease-out">

        {/* Image */}
        <div className="relative h-52 sm:h-56 overflow-hidden">
          {imgError ? (
            <div className={`w-full h-full bg-gradient-to-br from-primary-500/80 to-accent-500/80 flex items-center justify-center`}>
              <span className="text-5xl opacity-80">🏞️</span>
            </div>
          ) : (
            <img
              src={place.image}
              alt={place.name[lang] || place.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Price badge */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={handleCompare}
              title="So sánh"
              className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-110 transition-transform"
            >
              <svg className={`w-4 h-4 ${isCompared ? 'text-blue-500' : 'text-dark-500 dark:text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
            <button
              onClick={handleWishlist}
              title="Yêu thích"
              className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-110 transition-transform"
            >
              <svg className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-dark-500 dark:text-slate-400'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isWishlisted ? 0 : 2} fill={isWishlisted ? "currentColor" : "none"}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <span className={`hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-lg ${
              place.price === 0
                ? 'bg-primary-500/90 text-white'
                : 'bg-white/90 dark:bg-slate-800/90 text-primary-600 dark:text-primary-400'
            }`}>
              {place.price === 0 ? t('common.free') : (place.priceNote[lang] || place.priceNote)}
            </span>
          </div>

          {/* Duration badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium bg-black/40 backdrop-blur-md text-white/90">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {place.duration[lang] || place.duration}
            </span>
          </div>

          {/* Name on image */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-bold text-white leading-tight drop-shadow-lg line-clamp-2">
              {place.name[lang] || place.name}
            </h3>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 space-y-3">
          {/* Rating row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StarRating rating={place.rating} />
              <span className="text-sm font-semibold text-dark-800 dark:text-slate-200">
                {place.rating}
              </span>
              <span className="text-xs text-dark-400 dark:text-slate-500">
                ({place.reviewCount.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US')} {t('common.reviews', 'đánh giá')})
              </span>
            </div>
          </div>

          {/* Short description */}
          <p className="text-sm text-dark-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {place.shortDescription[lang] || place.shortDescription}
          </p>

          {/* Category tags */}
          <div className="flex flex-wrap gap-1.5">
            {(place.category[lang] || place.category).slice(0, 3).map((cat, i) => {
              const origCat = place.category.vi ? place.category.vi[i] : cat;
              return (
              <span
                key={cat}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-700/30"
              >
                {CATEGORY_CONFIG[origCat]?.icon || '📍'} {cat}
              </span>
            )})}
          </div>

          {/* Address */}
          {place.address && (
            <div className="flex items-center gap-1.5 text-xs text-dark-400 dark:text-slate-500">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{place.address[lang] || place.address}</span>
            </div>
          )}

          {/* View detail CTA */}
          <div className="pt-1">
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all duration-300">
              Xem chi tiết
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
