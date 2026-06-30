import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import placesData, { preferenceOptions } from '../data/placesData';
import PlaceCard from '../components/PlaceCard';
import { PlaceSkeleton } from '../components/SkeletonLoading';

const SORT_OPTIONS = [
  { key: 'rating', label: 'Đánh giá cao nhất', icon: '⭐' },
  { key: 'priceLow', label: 'Giá thấp nhất', icon: '💰' },
  { key: 'popular', label: 'Phổ biến nhất', icon: '🔥' },
];

const PRICE_OPTIONS = [
  { key: 'all', label: 'Mọi mức giá', icon: '💵' },
  { key: 'free', label: 'Miễn phí', icon: '✨' },
  { key: 'paid', label: 'Có phí', icon: '💳' },
];

export default function PlacesPage() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [activeSort, setActiveSort] = useState('rating');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [activePriceRange, setActivePriceRange] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  
  // Extract unique categories from data
  const categories = useMemo(() => {
    const cats = new Set();
    placesData.forEach((p) => p.category?.forEach((c) => cats.add(c)));
    return ['Tất cả', ...Array.from(cats)];
  }, []);

  // Map category to icon from preferenceOptions
  const getCategoryConfig = (catName) => {
    if (catName === 'Tất cả') return { icon: '📍', color: 'from-primary-500 to-primary-700' };
    const match = preferenceOptions.find(p => p.label === catName);
    if (match) return { icon: match.icon, color: match.color };
    // fallback
    return { icon: '✨', color: 'from-accent-400 to-accent-600' };
  };

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // 400ms loading effect
    return () => clearTimeout(timer);
  }, [activeCategory, activeSort, activePriceRange]);

  // Filtered & sorted places
  const filteredPlaces = useMemo(() => {
    let result = [...placesData];

    // Filter by category
    if (activeCategory !== 'Tất cả') {
      result = result.filter((p) => p.category?.includes(activeCategory));
    }
    
    // Filter by price
    if (activePriceRange !== 'all') {
      if (activePriceRange === 'free') result = result.filter(p => p.price === 0);
      if (activePriceRange === 'paid') result = result.filter(p => p.price > 0);
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
  }, [activeCategory, activeSort, activePriceRange]);

  // Stats
  const totalPlaces = placesData.length;
  const avgRating = (
    placesData.reduce((sum, p) => sum + p.rating, 0) / totalPlaces
  ).toFixed(1);

  const activeSortLabel = SORT_OPTIONS.find((s) => s.key === activeSort)?.label;
  const activePriceLabel = PRICE_OPTIONS.find((s) => s.key === activePriceRange)?.label;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-primary-400/15 dark:bg-primary-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-accent-400/15 dark:bg-accent-500/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
      {/* ============ HERO SECTION ============ */}
      <section className="relative pt-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 dark:from-slate-900 dark:via-primary-950 dark:to-slate-950" />
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent-400/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary-400/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse-soft" />
              Khám phá {totalPlaces}+ điểm đến tuyệt đẹp
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Tọa độ{' '}
              <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                Gia Lai
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-8">
              Từ những danh thắng thiên nhiên hùng vĩ đến các quán cà phê ngắm hoàng hôn cực chill. Tìm ngay điểm đến tiếp theo của bạn!
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
              label: 'Thông tin chi tiết',
              icon: '📚',
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
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const config = getCategoryConfig(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${config.color} text-white shadow-lg shadow-primary-500/25 scale-105`
                        : 'bg-white dark:bg-slate-800 text-dark-600 dark:text-slate-300 border border-dark-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 hover:text-primary-700 dark:hover:text-primary-400'
                    }`}
                  >
                    <span className="text-base">{config.icon}</span>
                    {cat}
                  </button>
                );
              })}
            </div>
            
            {/* Divider line for larger screens */}
            <div className="hidden lg:block w-px h-8 bg-dark-200 dark:bg-slate-700"></div>
            
            {/* Advanced Filters (Price, Sort) */}
            <div className="flex flex-wrap items-center gap-2 lg:flex-shrink-0">
              
              {/* Price Dropdown */}
              <div className="relative flex-shrink-0">
                <button
                  onMouseDown={() => { setShowPriceDropdown(!showPriceDropdown); setShowSortDropdown(false); }}
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
                  onMouseDown={() => { setShowSortDropdown(!showSortDropdown); setShowPriceDropdown(false); }}
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
                  {getCategoryConfig(activeCategory).icon} {activeCategory}
                </span>
              </>
            )}
            {activeCategory === 'Tất cả' && 'địa điểm'}
          </p>
        </div>
      </section>

      {/* ============ PLACES GRID ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PlaceSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        ) : filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredPlaces.map((place, index) => (
              <PlaceCard key={place.id} place={place} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 animate-fade-in bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/50 dark:border-white/10 shadow-xl max-w-2xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-inner">
              <span className="text-5xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-3">
              Không tìm thấy địa điểm
            </h3>
            <p className="text-dark-500 dark:text-slate-400 text-base mb-8">
              Hãy thử chọn danh mục hoặc bộ lọc khác để khám phá thêm nhiều điều thú vị.
            </p>
            <button
              onClick={() => {
                setActiveCategory('Tất cả');
                setActivePriceRange('all');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold transition-colors shadow-lg shadow-primary-500/30"
            >
              Xem tất cả địa điểm
            </button>
          </div>
        )}
      </section>
      </div>
    </div>
  );
}
