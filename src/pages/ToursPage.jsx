import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import toursData, { CATEGORY_CONFIG } from '../data/toursData';
import useTravelStore from '../store/useTravelStore';
import TourCard from '../components/TourCard';
import { TourSkeleton } from '../components/SkeletonLoading';
import TourCompareModal from '../components/TourCompareModal';
import { List, Map as MapIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MapView = lazy(() => import('../components/MapView'));
const ITEMS_PER_PAGE = 9;

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

export default function ToursPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [activeSort, setActiveSort] = useState('rating');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [activeDuration, setActiveDuration] = useState('all');
  const [activePriceRange, setActivePriceRange] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'vi';
  
  const compareList = useTravelStore((state) => state.compareList);

  // Extract unique categories from data
  const categories = useMemo(() => {
    const cats = new Set();
    toursData.forEach((p) => {
      const pCats = p.category[lang] || p.category.vi || p.category;
      if (Array.isArray(pCats)) pCats.forEach((c) => cats.add(c));
    });
    return [t('toursPage.filters.all', 'Tất cả'), ...Array.from(cats)];
  }, [lang, t]);

  // Reset active category when language changes to avoid mismatch
  useEffect(() => {
    setActiveCategory(t('toursPage.filters.all', 'Tất cả'));
  }, [lang, t]);

  // Filter categories to only the ones in our config (matching required list)
  const filterCategories = useMemo(() => {
    return categories;
  }, [categories]);

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms loading effect for better skeleton demonstration
    return () => clearTimeout(timer);
  }, [activeCategory, activeSort, activeDuration, activePriceRange]);

  // Filtered & sorted places
  const filteredPlaces = useMemo(() => {
    let result = [...toursData];

    // Filter by category
    if (activeCategory !== t('toursPage.filters.all', 'Tất cả')) {
      result = result.filter((p) => {
        const pCats = p.category[lang] || p.category.vi || p.category;
        return Array.isArray(pCats) && pCats.includes(activeCategory);
      });
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
    <>
      <SEO 
        title="Danh sách Tour Khám phá" 
        description="Khám phá các tour du lịch đa dạng tại Gia Lai: từ thiên nhiên hoang sơ đến văn hóa bản địa đặc sắc." 
      />
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse-soft" />
              {t('toursPage.hero.explore', { count: totalPlaces })}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              {t('toursPage.hero.title')}
            </h1>
            <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-8">
              {t('toursPage.hero.subtitle')}
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
              label: t('toursPage.stats.destinations'),
              icon: '📍',
              color: 'from-primary-500 to-emerald-500',
            },
            {
              value: `${avgRating} ⭐`,
              label: t('toursPage.stats.avgRating'),
              icon: '🏆',
              color: 'from-accent-500 to-orange-500',
            },
            {
              value: '100%',
              label: t('toursPage.stats.freeAi'),
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
              {filterCategories.map((cat, i) => {
                const isActive = activeCategory === cat;
                const origCat = i === 0 ? 'Tất cả' : (Object.keys(CATEGORY_CONFIG).find(key => 
                  key === cat || CATEGORY_CONFIG[key] === cat
                ) || cat);
                const config = CATEGORY_CONFIG[origCat] || { icon: '📍', gradient: 'from-primary-500 to-primary-700' };
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg shadow-primary-500/25 scale-105`
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

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-dark-100 dark:bg-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-dark-500 dark:text-slate-400 hover:text-dark-700'
              }`}
            >
              <List size={14} /> Danh sách
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'map'
                  ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-dark-500 dark:text-slate-400 hover:text-dark-700'
              }`}
            >
              <MapIcon size={14} /> Bản đồ
            </button>
          </div>
        </div>
      </section>

      {/* ============ TOURS GRID / MAP ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {viewMode === 'map' ? (
          <Suspense fallback={
            <div className="w-full h-[500px] rounded-2xl bg-dark-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
              <p className="text-dark-400 dark:text-slate-500 text-sm">Đang tải bản đồ...</p>
            </div>
          }>
            <div className="h-[500px] lg:h-[600px]">
              <MapView
                items={filteredPlaces}
                type="tour"
                onItemClick={(item) => navigate(`/tour-detail/${item.id}`)}
              />
            </div>
          </Suspense>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TourSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        ) : filteredPlaces.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredPlaces.slice(0, visibleCount).map((place, index) => (
                <TourCard key={place.id} place={place} index={index} />
              ))}
            </div>
            {/* Load More */}
            {visibleCount < filteredPlaces.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 border-2 border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 font-bold text-sm rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all shadow-sm hover:shadow-md"
                >
                  Xem thêm ({filteredPlaces.length - visibleCount} còn lại)
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 animate-fade-in bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/50 dark:border-white/10 shadow-xl max-w-2xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-inner">
              <span className="text-5xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-3">
              Không tìm thấy tour
            </h3>
            <p className="text-dark-500 dark:text-slate-400 text-base mb-8">
              Hãy thử chọn danh mục hoặc bộ lọc khác để khám phá thêm nhiều tour thú vị.
            </p>
            <button
              onClick={() => {
                setActiveCategory('Tất cả');
                setActiveDuration('all');
                setActivePriceRange('all');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold transition-colors shadow-lg shadow-primary-500/30"
            >
              Xem tất cả tour
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

      {/* Floating Compare Button */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-fade-in-up">
          <button 
            onClick={() => setShowCompareModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-2xl font-bold transition-all"
          >
            <span>📊</span>
            So sánh ({compareList.length})
          </button>
        </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && (
        <TourCompareModal onClose={() => setShowCompareModal(false)} />
      )}
    </div>
    </>
  );
}

