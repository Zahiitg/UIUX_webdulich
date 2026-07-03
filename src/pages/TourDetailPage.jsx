import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import toursData from '../data/toursData';
import useTravelStore from '../store/useTravelStore';
import Breadcrumb from '../components/Breadcrumb';
import ShareMenu from '../components/ShareMenu';
import ReviewSection from '../components/ReviewSection';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'vi';

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);

  if (!tour) {
    return (
      <div className="page-container flex flex-col items-center justify-center min-h-screen px-4">
        <h2 className="text-2xl font-bold mb-4">{t('tourDetail.notFound')}</h2>
        <button onClick={() => navigate(-1)} className="btn-primary">{t('tourDetail.back')}</button>
      </div>
    );
  }

  const faqs = t('tourDetail.faqs', { returnObjects: true }) || [];

  return (
    <>
      <SEO 
        title={tour.name[lang] || tour.name} 
        description={`${tour.name[lang] || tour.name} - ${tour.duration[lang] || tour.duration}`}
        image={tour.image}
      />
      <div className="page-container min-h-screen bg-white dark:bg-slate-900 pb-28">
      {/* ──── Hero Section ──── */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.name[lang] || tour.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.src = FALLBACK_IMAGES[tour.id % 2]; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors">
          <span className="text-white">←</span>
        </button>

        <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
          <ShareMenu title={`${t('tourDetail.exploreTour')} ${tour.name[lang] || tour.name}`} />
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
            {(tour.category[lang] || tour.category).slice(0,3).map(cat => (
              <span key={cat} className="px-2.5 py-1 bg-primary-500 text-white rounded-full text-xs font-semibold">{cat}</span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-lg">{tour.name[lang] || tour.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-white/90 text-sm">
            <span className="flex items-center gap-1"><StarRating rating={tour.rating} /> {tour.rating}</span>
            <span>•</span>
            <span>{tour.duration[lang] || tour.duration}</span>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 -mt-4 relative z-10 max-w-4xl mx-auto">
        <div className="pt-8 pb-4">
          <Breadcrumb items={[
            { label: 'Tours', path: '/tours' },
            { label: tour.name[lang] || tour.name }
          ]} />
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-5 mb-6 border border-dark-100 dark:border-slate-700">
          <p className="text-dark-600 dark:text-slate-300 text-sm leading-relaxed">{tour.description[lang] || tour.description}</p>
        </div>

        {/* Highlights */}
        <h2 className="section-title text-lg mb-4 flex items-center gap-2 dark:text-white">
          <span className="w-1 h-6 bg-accent-500 rounded-full" />
          {t('tourDetail.highlights')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {(tour.highlights[lang] || tour.highlights.vi || tour.highlights).map((hl, i) => (
            <div key={i} className="flex items-start gap-3 bg-primary-50/50 dark:bg-slate-800 rounded-xl p-3">
              <span className="text-primary-500">✨</span>
              <span className="text-sm font-medium text-dark-800 dark:text-slate-200">{hl}</span>
            </div>
          ))}
        </div>

        {/* Itinerary */}
        <h2 className="section-title text-lg mb-4 flex items-center gap-2 dark:text-white">
          <span className="w-1 h-6 bg-green-500 rounded-full" />
          {t('tourDetail.itinerary')}
        </h2>
        <div className="space-y-6 mb-10">
          {(tour.itinerary[lang] || tour.itinerary.vi || tour.itinerary).map((day, idx) => (
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

        {/* ──── FAQ Accordion ──── */}
        <h2 className="section-title text-lg mb-4 flex items-center gap-2 dark:text-white">
          <span className="w-1 h-6 bg-violet-500 rounded-full" />
          {t('tourDetail.faq')}
        </h2>
        <div className="space-y-2 mb-10">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-dark-100 dark:border-slate-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-dark-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="text-sm font-semibold text-dark-800 dark:text-white">{faq.q}</span>
                <svg className={`w-4 h-4 text-dark-400 dark:text-slate-500 transition-transform duration-200 shrink-0 ml-2 ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="px-4 pb-4 text-sm text-dark-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ──── Reviews (New Component) ──── */}
        <ReviewSection itemId={tour.id} itemType="tour" rating={tour.rating} reviewCount={tour.reviews?.length || 120} />
      </div>

      {/* ──── Sticky Bottom Bar ──── */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-dark-100 dark:border-slate-800 px-4 py-3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-dark-500 dark:text-slate-400 font-medium">{t('tourDetail.priceFrom')}</p>
            <p className="text-xl font-extrabold text-primary-600 dark:text-primary-400">{tour.price.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US')}đ</p>
          </div>
          <button onClick={() => navigate(`/checkout/${tour.id}`)} className="btn-primary px-8 shadow-lg shadow-primary-500/30">
            {t('tourDetail.bookNow')}
          </button>
        </div>
      </div>
    </div>
  );
}
