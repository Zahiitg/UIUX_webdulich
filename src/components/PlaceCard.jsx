import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PlaceCard({ place, index = 0 }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'vi';
  
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
            alt={place.name[lang] || place.name}
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
            {place.price === 0 ? t('common.free') : (place.priceNote[lang] || place.priceNote)}
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
          {place.name[lang] || place.name}
        </h3>

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5">
          {(place.category[lang] || place.category)?.slice(0, 3).map((cat) => (
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
          {place.shortDescription[lang] || place.shortDescription}
        </p>

        {/* Address */}
        {place.address && (
          <div className="flex items-center gap-1.5 text-[11px] text-dark-400 dark:text-slate-500">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{place.address[lang] || place.address}</span>
          </div>
        )}

        {/* CTA */}
        <div className="pt-2 mt-auto border-t border-dark-100/50 dark:border-slate-700/50">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-2.5 transition-all duration-300">
            {t('common.viewDetails')}
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
