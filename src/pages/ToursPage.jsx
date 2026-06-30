import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import toursData, { CATEGORY_CONFIG } from '../data/toursData';
import useTravelStore from '../store/useTravelStore';

// Category config with icons and gradient colors
// Category config with icons and gradient colors are imported from toursData.js

const SORT_OPTIONS = [
  { key: 'rating', label: 'Đánh giá cao nhất', icon: '⭐' },
  { key: 'priceLow', label: 'Giá thấp nhất', icon: '💰' },
  { key: 'popular', label: 'Phổ biến nhất', icon: '🔥' },
];

const DURATION_OPTIONS = [
  { key: 'all', label: 'Mọi thời gian', icon: '⏳' },
  { key: '1', label: 'Trong ngày', icon: '☀️' },
  { key: '2', label: '2 Ngày 1 Đêm', icon: '🏕️' },
  { key: '3+', label: 'Từ 3 Ngày trở lên', icon: '🎒' },
];

const PRICE_OPTIONS = [
  { key: 'all', label: 'Mọi mức giá', icon: '💵' },
  { key: 'low', label: 'Dưới 1 triệu', icon: '🔖' },
  { key: 'mid', label: '1 - 2 triệu', icon: '💳' },
  { key: 'high', label: 'Trên 2 triệu', icon: '💎' },
];

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

// Tour card with glassmorphism
function TourCard({ place, index }) {
  const [imgError, setImgError] = useState(false);
  const wishlist = useTravelStore((state) => state.wishlist);
  const toggleWishlist = useTravelStore((state) => state.toggleWishlist);
  const isWishlisted = wishlist.includes(place.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(place.id);
  };

  return (
    <Link
      to={`/tour-detail/${place.id}`}
      className="group block animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
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
              alt={place.name}
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
              onClick={handleWishlist}
              className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-110 transition-transform"
            >
              <svg className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-dark-500 dark:text-slate-400'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isWishlisted ? 0 : 2} fill={isWishlisted ? "currentColor" : "none"}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-lg ${
              place.price === 0
                ? 'bg-primary-500/90 text-white'
                : 'bg-white/90 dark:bg-slate-800/90 text-primary-600 dark:text-primary-400'
            }`}>
              {place.price === 0 ? '✨ Miễn phí' : place.priceNote}
            </span>
          </div>

          {/* Duration badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium bg-black/40 backdrop-blur-md text-white/90">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {place.duration}
            </span>
          </div>

          {/* Name on image */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-bold text-white leading-tight drop-shadow-lg line-clamp-2">
              {place.name}
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
                ({place.reviewCount.toLocaleString('vi-VN')} đánh giá)
              </span>
            </div>
          </div>

          {/* Short description */}
          <p className="text-sm text-dark-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {place.shortDescription}
          </p>

          {/* Category tags */}
          <div className="flex flex-wrap gap-1.5">
            {place.category.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-700/30"
              >
                {CATEGORY_CONFIG[cat]?.icon || '📍'} {cat}
              </span>
            ))}
          </div>

          {/* Address */}
          <div className="flex items-center gap-1.5 text-xs text-dark-400 dark:text-slate-500">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{place.address}</span>
          </div>

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

export default function ToursPage() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [activeSort, setActiveSort] = useState('rating');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [activeDuration, setActiveDuration] = useState('all');
  const [activePriceRange, setActivePriceRange] = useState('all');

  // Extract unique categories from data
  const categories = useMemo(() => {
    const cats = new Set();
    toursData.forEach((p) => p.category.forEach((c) => cats.add(c)));
    return ['Tất cả', ...Array.from(cats)];
  }, []);

  // Filter categories to only the ones in our config (matching required list)
  const filterCategories = useMemo(() => {
    return Object.keys(CATEGORY_CONFIG).filter(
      (cat) => cat === 'Tất cả' || categories.includes(cat)
    );
  }, [categories]);

  // Filtered & sorted places
  const filteredPlaces = useMemo(() => {
    let result = [...toursData];

    // Filter by category
    if (activeCategory !== 'Tất cả') {
      result = result.filter((p) => p.category.includes(activeCategory));
    }
    
    // Filter by duration
    if (activeDuration !== 'all') {
      if (activeDuration === '1') result = result.filter(p => p.durationValue === 1);
      if (activeDuration === '2') result = result.filter(p => p.durationValue === 2);
      if (activeDuration === '3+') result = result.filter(p => p.durationValue >= 3);
    }
    
    // Filter by price
    if (activePriceRange !== 'all') {
      if (activePriceRange === 'low') result = result.filter(p => p.price < 1000000);
      if (activePriceRange === 'mid') result = result.filter(p => p.price >= 1000000 && p.price <= 2000000);
      if (activePriceRange === 'high') result = result.filter(p => p.price > 2000000);
    }

    // Sort
    switch (activeSort) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, activeSort, activeDuration, activePriceRange]);

  // Stats
  const totalPlaces = toursData.length;
  const avgRating = (
    toursData.reduce((sum, p) => sum + p.rating, 0) / totalPlaces
  ).toFixed(1);

  const activeSortLabel = SORT_OPTIONS.find((s) => s.key === activeSort)?.label;
  const activeDurationLabel = DURATION_OPTIONS.find((s) => s.key === activeDuration)?.label;
  const activePriceLabel = PRICE_OPTIONS.find((s) => s.key === activePriceRange)?.label;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* ============ HERO SECTION ============ */}
      <section className="relative pt-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 dark:from-slate-900 dark:via-primary-950 dark:to-slate-950" />
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent-400/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary-400/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse-soft" />
              Khám phá {totalPlaces}+ điểm đến hấp dẫn
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Khám Phá{' '}
              <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                Gia Lai
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-8">
              Vùng đất bazan đỏ với những thác nước hùng vĩ, đồi chè bạt ngàn,
              văn hóa cồng chiêng Tây Nguyên và ẩm thực phố núi đặc sắc.
            </p>

            {/* Scroll hint */}
            <div className="animate-float">
              <svg className="w-6 h-6 mx-auto text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 32C840 40 960 48 1080 44C1200 40 1320 24 1380 16L1440 8V80H0Z"
              className="fill-slate-50 dark:fill-slate-950"
            />
          </svg>
        </div>
      </section>

      {/* ============ STATISTICS BAR ============ */}
      <section className="relative -mt-2 z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              value: `${totalPlaces}+`,
              label: 'Điểm đến',
              icon: '📍',
              color: 'from-primary-500 to-emerald-500',
            },
            {
              value: `${avgRating} ⭐`,
              label: 'Đánh giá TB',
              icon: '🏆',
              color: 'from-accent-500 to-orange-500',
            },
            {
              value: '100%',
              label: 'Miễn phí tư vấn AI',
              icon: '🤖',
              color: 'from-purple-500 to-pink-500',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-4 sm:p-5 text-center hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 100 + 200}ms`, animationFillMode: 'both' }}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-xl sm:text-2xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-dark-500 dark:text-slate-400 font-medium mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FILTER & SORT BAR ============ */}
      <section className="sticky top-16 z-30 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-white/10 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category filters */}
            <div className="flex gap-2 overflow-x-auto pb-1 flex-1 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {filterCategories.map((cat) => {
                const isActive = activeCategory === cat;
                const config = CATEGORY_CONFIG[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${config?.gradient || 'from-primary-500 to-primary-700'} text-white shadow-lg shadow-primary-500/25 scale-105`
                        : 'bg-white dark:bg-slate-800 text-dark-600 dark:text-slate-300 border border-dark-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 hover:text-primary-700 dark:hover:text-primary-400'
                    }`}
                  >
                    <span className="text-base">{config?.icon || '📍'}</span>
                    {cat}
                  </button>
                );
              })}
            </div>
            
            {/* Divider line for larger screens */}
            <div className="hidden lg:block w-px h-8 bg-dark-200 dark:bg-slate-700"></div>
            
            {/* Advanced Filters (Duration, Price, Sort) */}
            <div className="flex flex-wrap items-center gap-2 lg:flex-shrink-0">
              {/* Duration Dropdown */}
              <div className="relative flex-shrink-0">
                <button
                  onMouseDown={() => { setShowDurationDropdown(!showDurationDropdown); setShowPriceDropdown(false); setShowSortDropdown(false); }}
                  onBlur={() => setTimeout(() => setShowDurationDropdown(false), 150)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-dark-200 dark:border-slate-700 text-sm font-medium text-dark-700 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
                >
                  <span className="text-base hidden sm:inline">{DURATION_OPTIONS.find(o => o.key === activeDuration)?.icon}</span>
                  {activeDurationLabel}
                  <svg className={`w-4 h-4 text-dark-400 transition-transform duration-200 ${showDurationDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showDurationDropdown && (
                  <div className="absolute left-0 lg:right-0 lg:left-auto top-full mt-2 w-56 rounded-xl glass shadow-float border border-white/20 dark:border-slate-700 py-1 animate-fade-in-down z-50">
                    {DURATION_OPTIONS.map((opt) => (
                      <button
                        key={opt.key}
                        onMouseDown={() => { setActiveDuration(opt.key); setShowDurationDropdown(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 ${
                          activeDuration === opt.key ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold' : 'text-dark-600 dark:text-slate-300 hover:bg-dark-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-base">{opt.icon}</span> {opt.label}
                        {activeDuration === opt.key && <svg className="w-4 h-4 ml-auto text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Dropdown */}
              <div className="relative flex-shrink-0">
                <button
                  onMouseDown={() => { setShowPriceDropdown(!showPriceDropdown); setShowDurationDropdown(false); setShowSortDropdown(false); }}
                  onBlur={() => setTimeout(() => setShowPriceDropdown(false), 150)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-dark-200 dark:border-slate-700 text-sm font-medium text-dark-700 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
                >
                  <span className="text-base hidden sm:inline">{PRICE_OPTIONS.find(o => o.key === activePriceRange)?.icon}</span>
                  {activePriceLabel}
                  <svg className={`w-4 h-4 text-dark-400 transition-transform duration-200 ${showPriceDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showPriceDropdown && (
                  <div className="absolute left-0 lg:right-0 lg:left-auto top-full mt-2 w-52 rounded-xl glass shadow-float border border-white/20 dark:border-slate-700 py-1 animate-fade-in-down z-50">
                    {PRICE_OPTIONS.map((opt) => (
                      <button
                        key={opt.key}
                        onMouseDown={() => { setActivePriceRange(opt.key); setShowPriceDropdown(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 ${
                          activePriceRange === opt.key ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold' : 'text-dark-600 dark:text-slate-300 hover:bg-dark-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-base">{opt.icon}</span> {opt.label}
                        {activePriceRange === opt.key && <svg className="w-4 h-4 ml-auto text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort dropdown */}
              <div className="relative flex-shrink-0">
                <button
                  onMouseDown={() => { setShowSortDropdown(!showSortDropdown); setShowDurationDropdown(false); setShowPriceDropdown(false); }}
                  onBlur={() => setTimeout(() => setShowSortDropdown(false), 150)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-dark-200 dark:border-slate-700 text-sm font-medium text-dark-700 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
                >
                  <svg className="w-4 h-4 text-dark-400 hidden sm:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  {activeSortLabel}
                  <svg className={`w-4 h-4 text-dark-400 transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl glass shadow-float border border-white/20 dark:border-slate-700 py-1 animate-fade-in-down z-50">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.key}
                        onMouseDown={() => { setActiveSort(opt.key); setShowSortDropdown(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 ${
                          activeSort === opt.key ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold' : 'text-dark-600 dark:text-slate-300 hover:bg-dark-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-base">{opt.icon}</span>
                        {opt.label}
                        {activeSort === opt.key && (
                          <svg className="w-4 h-4 ml-auto text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RESULTS HEADER ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-dark-500 dark:text-slate-400">
            Hiển thị{' '}
            <span className="font-bold text-dark-800 dark:text-slate-200">
              {filteredPlaces.length}
            </span>{' '}
            {activeCategory !== 'Tất cả' && (
              <>
                kết quả cho{' '}
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  {CATEGORY_CONFIG[activeCategory]?.icon} {activeCategory}
                </span>
              </>
            )}
            {activeCategory === 'Tất cả' && 'địa điểm'}
          </p>
        </div>
      </section>

      {/* ============ PLACES GRID ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredPlaces.map((place, index) => (
              <TourCard key={place.id} place={place} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-dark-100 dark:bg-slate-800 flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-lg font-bold text-dark-800 dark:text-slate-200 mb-2">
              Không tìm thấy địa điểm
            </h3>
            <p className="text-dark-500 dark:text-slate-400 text-sm">
              Hãy thử chọn danh mục khác để khám phá thêm.
            </p>
            <button
              onClick={() => setActiveCategory('Tất cả')}
              className="btn-primary mt-4 text-sm"
            >
              Xem tất cả địa điểm
            </button>
          </div>
        )}
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTR2LTJoNHptMC0zMHYyaC00VjRoNHptMCAxMHYyaC00di0yaDR6bTAgMTB2MmgtNHYtMmg0em0tMjAgMjB2MmgtNHYtMmg0em0wLTMwdjJoLTRWNGg0em0wIDEwdjJoLTR2LTJoNHptMCAxMHYyaC00di0yaDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
          <div className="relative px-6 sm:px-12 py-10 sm:py-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Cần tư vấn lịch trình? 🌟
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-6 text-sm sm:text-base">
              AI Travel Assistant sẽ giúp bạn lên kế hoạch hoàn hảo cho chuyến đi Gia Lai,
              phù hợp với sở thích và ngân sách của bạn.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/chatbot"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-primary-700 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="text-lg">🤖</span>
                Chat với AI
              </Link>
              <Link
                to="/survey"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="text-lg">📝</span>
                Tạo lịch trình
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
