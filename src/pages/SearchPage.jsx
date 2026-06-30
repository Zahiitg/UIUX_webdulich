import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import placesData from '../data/placesData';
import toursData from '../data/toursData';
import PlaceCard from '../components/PlaceCard';

// ─── Empty State ─────────────────────────────────────────
function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-primary-800/30 flex items-center justify-center">
          <span className="text-5xl">🔍</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/40 flex items-center justify-center">
          <span className="text-lg">😕</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-dark-800 dark:text-slate-200 mb-2">
        Không tìm thấy kết quả
      </h3>
      <p className="text-sm text-dark-500 dark:text-slate-400 text-center max-w-sm mb-2">
        Không có mục nào phù hợp với từ khóa{' '}
        <span className="font-semibold text-primary-600 dark:text-primary-400">"{query}"</span>
      </p>
    </div>
  );
}

// ─── Utility ───────────────────────────────────────────────
function removeVietnameseTones(str) {
  if (!str) return '';
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  return str;
}

// ─── Search Page ─────────────────────────────────────────
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const normalizedQuery = removeVietnameseTones(query.toLowerCase().trim());

  const [activeTab, setActiveTab] = useState('places');
  const [isLoading, setIsLoading] = useState(false);

  // Escape Regex utility
  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const searchRegex = new RegExp('\\b' + escapeRegExp(normalizedQuery), 'i');

  // Filter logic
  const filteredPlaces = normalizedQuery
    ? placesData.filter((place) => {
        const searchIn = removeVietnameseTones([
          place.name, place.shortDescription, place.address,
          ...(place.category || []), ...(place.tags || [])
        ].join(' ').toLowerCase());
        return searchRegex.test(searchIn);
      })
    : [];

  const filteredTours = normalizedQuery
    ? toursData.filter((tour) => {
        const searchIn = removeVietnameseTones([
          tour.name, tour.shortDescription, tour.address, tour.duration,
          ...(tour.category || []), ...(tour.highlights || [])
        ].join(' ').toLowerCase());
        return searchRegex.test(searchIn);
      })
    : [];

  // Debounce loading effect when query or tab changes
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [query, activeTab]);

  return (
    <div className="page-container pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* ──── Header ──── */}
      <div className="mb-6 animate-fade-in">
        <div className="flex items-center gap-2 text-xs text-dark-400 dark:text-slate-500 mb-4">
          <Link to="/" className="hover:text-primary-500 transition-colors duration-200">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-dark-600 dark:text-slate-300">Tìm kiếm</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-dark-900 dark:text-slate-100 leading-tight mb-6">
          {query ? (
            <>Kết quả tìm kiếm cho: <span className="text-gradient">"{query}"</span></>
          ) : (
            'Tìm kiếm'
          )}
        </h1>

        {query && (
          <div className="flex gap-4 border-b border-dark-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('places')}
              className={`pb-3 text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'places'
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'text-dark-500 dark:text-slate-400 hover:text-dark-800 dark:hover:text-slate-200'
              }`}
            >
              Địa điểm ({filteredPlaces.length})
            </button>
            <button
              onClick={() => setActiveTab('tours')}
              className={`pb-3 text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'tours'
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'text-dark-500 dark:text-slate-400 hover:text-dark-800 dark:hover:text-slate-200'
              }`}
            >
              Tour ({filteredTours.length})
            </button>
          </div>
        )}
      </div>

      {/* ──── Results / Empty State ──── */}
      {!query ? (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/30 flex items-center justify-center mb-5">
            <span className="text-4xl">🗺️</span>
          </div>
          <h3 className="text-lg font-bold text-dark-800 dark:text-slate-200 mb-2">Khám phá Gia Lai</h3>
          <p className="text-sm text-dark-500 dark:text-slate-400 text-center max-w-sm">
            Nhập từ khóa vào thanh tìm kiếm để khám phá các địa điểm và tour du lịch tuyệt vời tại Gia Lai
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            activeTab === 'places' ? <PlaceSkeleton key={i} /> : <TourSkeleton key={i} />
          ))}
        </div>
      ) : activeTab === 'places' && filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6">
          {filteredPlaces.map((place, idx) => (
            <PlaceCard key={place.id} place={place} index={idx} />
          ))}
        </div>
      ) : activeTab === 'tours' && filteredTours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6">
          {filteredTours.map((tour, idx) => (
            <TourCard key={tour.id} place={tour} index={idx} />
          ))}
        </div>
      ) : (
        <EmptyState query={query} />
      )}

      {/* Decorative */}
      <div className="fixed top-32 -right-32 w-72 h-72 rounded-full bg-primary-400/5 dark:bg-primary-400/[0.03] blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 -left-24 w-60 h-60 rounded-full bg-accent-400/5 dark:bg-accent-400/[0.03] blur-3xl pointer-events-none" />
    </div>
  );
}
