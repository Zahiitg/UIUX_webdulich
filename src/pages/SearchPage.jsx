import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import placesData from '../data/placesData';

// ─── Star Rating ─────────────────────────────────────────
function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 text-sm">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`f-${i}`} className="text-amber-400">★</span>
      ))}
      {hasHalf && <span className="text-amber-400">★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`e-${i}`} className="text-dark-200 dark:text-slate-600">★</span>
      ))}
    </div>
  );
}

// ─── Place Card ──────────────────────────────────────────
function PlaceCard({ place, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/place-detail/${place.id}`}
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl
        bg-white/70 dark:bg-slate-800/70 backdrop-blur-md
        border border-white/10
        hover:border-primary-400/50 dark:hover:border-primary-400/40
        hover:shadow-2xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/5
        hover:scale-[1.02]
        transition-all duration-500 ease-out
        animate-fade-in-up
      `}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      {/* ── Image ── */}
      <div className="relative h-48 overflow-hidden">
        {imgError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-600 to-accent-500 flex items-center justify-center">
            <span className="text-5xl opacity-60">🏞️</span>
          </div>
        ) : (
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm text-primary-700 dark:text-primary-300 shadow-lg">
            {place.price === 0 ? '✨ Miễn phí' : place.priceNote}
          </span>
        </div>

        {/* Rating badge on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
          <span className="text-amber-400 text-xs">★</span>
          <span className="text-white text-xs font-bold">{place.rating}</span>
          <span className="text-white/60 text-xs">({place.reviewCount})</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Name */}
        <h3 className="text-base font-bold text-dark-900 dark:text-slate-100 leading-snug line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
          {place.name}
        </h3>

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5">
          {place.category.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 border border-primary-100 dark:border-primary-800/40"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Short description */}
        <p className="text-xs text-dark-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
          {place.shortDescription}
        </p>

        {/* Address */}
        <div className="flex items-center gap-1.5 text-[11px] text-dark-400 dark:text-slate-500">
          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">{place.address}</span>
        </div>

        {/* CTA */}
        <div className="pt-2 mt-auto border-t border-dark-100/50 dark:border-slate-700/50">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-2.5 transition-all duration-300">
            Xem chi tiết
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Empty State ─────────────────────────────────────────
function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
      {/* Illustration */}
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
        Không có địa điểm nào phù hợp với từ khóa{' '}
        <span className="font-semibold text-primary-600 dark:text-primary-400">"{query}"</span>
      </p>
      <p className="text-xs text-dark-400 dark:text-slate-500 text-center max-w-xs">
        Hãy thử tìm kiếm với từ khóa khác, ví dụ: "thác nước", "văn hóa", hoặc "Pleiku"
      </p>

      {/* Suggestion chips */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {['Thiên nhiên', 'Văn hóa', 'Ẩm thực', 'Check-in'].map((suggestion) => (
          <Link
            key={suggestion}
            to={`/search?q=${encodeURIComponent(suggestion)}`}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800/40 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors duration-200"
          >
            {suggestion}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Search Page ─────────────────────────────────────────
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const normalizedQuery = query.toLowerCase().trim();

  // Filter places by matching against multiple fields
  const filteredPlaces = normalizedQuery
    ? placesData.filter((place) => {
        const searchIn = [
          place.name,
          place.shortDescription,
          place.address,
          ...(place.category || []),
          ...(place.tags || []),
        ]
          .join(' ')
          .toLowerCase();

        return searchIn.includes(normalizedQuery);
      })
    : [];

  const resultCount = filteredPlaces.length;

  return (
    <div className="page-container pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* ──── Header ──── */}
      <div className="mb-8 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-dark-400 dark:text-slate-500 mb-4">
          <Link to="/" className="hover:text-primary-500 transition-colors duration-200">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-dark-600 dark:text-slate-300">Tìm kiếm</span>
        </div>

        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-dark-900 dark:text-slate-100 leading-tight">
              {query ? (
                <>
                  Kết quả tìm kiếm cho:{' '}
                  <span className="text-gradient">"{query}"</span>
                </>
              ) : (
                'Tìm kiếm địa điểm'
              )}
            </h1>
          </div>

          {query && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 whitespace-nowrap self-start sm:self-auto mb-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {resultCount} kết quả
            </span>
          )}
        </div>
      </div>

      {/* ──── Results / Empty State ──── */}
      {query && resultCount === 0 ? (
        <EmptyState query={query} />
      ) : query && resultCount > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredPlaces.map((place, idx) => (
            <PlaceCard key={place.id} place={place} index={idx} />
          ))}
        </div>
      ) : (
        /* No query provided */
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/30 flex items-center justify-center mb-5">
            <span className="text-4xl">🗺️</span>
          </div>
          <h3 className="text-lg font-bold text-dark-800 dark:text-slate-200 mb-2">
            Khám phá Gia Lai
          </h3>
          <p className="text-sm text-dark-500 dark:text-slate-400 text-center max-w-sm">
            Nhập từ khóa vào thanh tìm kiếm để khám phá các địa điểm du lịch tuyệt vời tại Gia Lai
          </p>
        </div>
      )}

      {/* ──── Decorative background elements ──── */}
      <div className="fixed top-32 -right-32 w-72 h-72 rounded-full bg-primary-400/5 dark:bg-primary-400/[0.03] blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 -left-24 w-60 h-60 rounded-full bg-accent-400/5 dark:bg-accent-400/[0.03] blur-3xl pointer-events-none" />
    </div>
  );
}
