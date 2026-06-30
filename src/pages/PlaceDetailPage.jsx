import { useParams, useNavigate } from 'react-router-dom';
import placesData from '../data/placesData';
import Breadcrumb from '../components/Breadcrumb';
import ShareMenu from '../components/ShareMenu';

const FALLBACK_IMAGES = [
  "/images/lang_stor_bahnar_1782505259629.png", // Lake
  "/images/doi_che_gia_lai_1782505177095.png", // Mountain
  "/images/bien_ho_tnnung_1782505155088.png", // Village
  "/images/chu_dang_ya_volcano_1782505165301.png", // Tea hill
];

// ─── Star Rating Component ───────────────────────────────
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

// ─── Info Cell Component ─────────────────────────────────
function InfoCell({ icon, label, value }) {
  return (
    <div className="bg-dark-50 dark:bg-slate-800 rounded-2xl p-4 flex flex-col items-center text-center gap-1.5 transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/30 group">
      <span className="text-2xl mb-0.5 group-hover:scale-110 transition-transform duration-200">{icon}</span>
      <span className="text-[10px] uppercase tracking-wider text-dark-400 dark:text-slate-400 font-bold">{label}</span>
      <span className="text-sm font-bold text-dark-800 dark:text-slate-100 leading-tight">{value}</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function PlaceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = placesData.find((p) => p.id === Number(id));

  // ── Not found ──
  if (!place) {
    return (
      <div className="page-container flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center animate-fade-in-up">
          <span className="text-6xl mb-4 block">🔍</span>
          <h2 className="text-2xl font-bold text-dark-900 mb-2">Không tìm thấy</h2>
          <p className="text-dark-500 mb-6">Địa điểm bạn tìm không tồn tại hoặc đã bị xóa.</p>
          <button onClick={() => navigate(-1)} className="btn-primary">
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div className="page-container min-h-screen bg-white dark:bg-slate-900 pb-28">
      {/* ──── Hero Section with Real Image ──── */}
      <div className="relative h-80 overflow-hidden">
        {/* Background image */}
        <img 
          src={place.image} 
          alt={place.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_IMAGES[place.id % FALLBACK_IMAGES.length];
          }}
        />
        {/* Fallback gradient (hidden by default, shown on image error) */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-600 to-primary-400"
          style={{ display: 'none' }}
        />

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        {/* Pattern dots overlay */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center hover:bg-black/50 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Share button */}
        <div className="absolute top-4 right-4 z-20">
          <ShareMenu title={`Khám phá: ${place.name}`} />
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 inset-x-0 p-5 z-10">
          {/* Category badges */}
          <div className="flex gap-2 mb-3 animate-fade-in">
            {place.category.slice(0, 3).map((cat) => (
              <span key={cat} className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[11px] font-semibold text-white border border-white/20">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-extrabold text-white leading-tight drop-shadow-lg animate-fade-in-up">
            {place.name}
          </h1>
          <p className="text-white/80 text-sm mt-1.5 flex items-center gap-1.5 animate-fade-in-up delay-100">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {place.address}
          </p>
        </div>
      </div>

      {/* ──── Content ──── */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="pt-8 pb-4">
          <Breadcrumb items={[
            { label: 'Tìm kiếm', path: '/search' },
            { label: place.name }
          ]} />
        </div>

        {/* Rating card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-4 mb-4 animate-fade-in-up delay-100 border border-transparent dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                <span className="text-xl font-extrabold text-amber-600 dark:text-amber-500">{place.rating}</span>
              </div>
              <div>
                <StarRating rating={place.rating} size="lg" />
                <p className="text-xs text-dark-400 dark:text-slate-400 mt-0.5">
                  {place.reviewCount.toLocaleString('vi-VN')} đánh giá
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                place.rating >= 4.7
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : place.rating >= 4.3
                  ? 'bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400'
                  : 'bg-dark-100 dark:bg-slate-700 text-dark-600 dark:text-slate-300'
              }`}>
                {place.rating >= 4.7 ? 'Tuyệt vời' : place.rating >= 4.3 ? 'Rất tốt' : 'Tốt'}
              </span>
            </div>
          </div>
        </div>

        {/* Short description card */}
        <div className="bg-primary-50/50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/50 rounded-2xl p-4 mb-4 animate-fade-in-up delay-200">
          <p className="text-sm text-primary-800 dark:text-primary-200 font-medium leading-relaxed italic">
            "{place.shortDescription}"
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 animate-fade-in-up delay-300">
          <InfoCell
            icon="🕐"
            label="Giờ mở cửa"
            value={`${place.openTime} - ${place.closeTime}`}
          />
          <InfoCell
            icon="🎫"
            label="Giá vé"
            value={place.priceNote}
          />
          <InfoCell
            icon="⏱️"
            label="Thời gian"
            value={place.duration}
          />
        </div>

        {/* Description */}
        <div className="mb-6 animate-fade-in-up delay-400">
          <h2 className="section-title text-lg mb-3 flex items-center gap-2 dark:text-white">
            <span className="w-1 h-6 bg-primary-500 rounded-full" />
            Mô tả
          </h2>
          <p className="text-dark-600 dark:text-slate-300 text-sm leading-relaxed">
            {place.description}
          </p>
        </div>

        {/* Highlights */}
        {place.highlights && place.highlights.length > 0 && (
          <div className="mb-6 animate-fade-in-up delay-500">
            <h2 className="section-title text-lg mb-3 flex items-center gap-2 dark:text-white">
              <span className="w-1 h-6 bg-accent-500 rounded-full" />
              Điểm nổi bật
            </h2>
            <div className="space-y-2.5">
              {place.highlights.map((hl, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-dark-50 dark:bg-slate-800/80 rounded-xl px-4 py-3 group hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors duration-200"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-dark-700 dark:text-slate-300 font-medium group-hover:text-primary-800 dark:group-hover:text-primary-300 transition-colors">
                    {hl}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mb-6 animate-fade-in-up delay-500">
          <h2 className="section-title text-lg mb-3 flex items-center gap-2 dark:text-white">
            <span className="w-1 h-6 bg-earth-400 rounded-full" />
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {place.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold border border-primary-100 dark:border-primary-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ──── Sticky Bottom Bar ──── */}
      <div className="fixed bottom-0 inset-x-0 z-40">
        <div className="max-w-md mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-dark-100 dark:border-slate-800 px-4 py-3.5">
          <div className="flex gap-3">
            <button
              onClick={handleDirections}
              className="flex-1 btn-secondary py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Chỉ đường
            </button>
            <button className="flex-1 btn-accent py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Thêm vào lịch trình
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
