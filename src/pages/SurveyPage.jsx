import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTravelStore from '../store/useTravelStore';
import { preferenceOptions } from '../data/placesData';

export default function SurveyPage() {
  const navigate = useNavigate();
  const { selectedPreferences, togglePreference } = useTravelStore();
  const canContinue = selectedPreferences.length > 0;

  return (
    <div className="w-full min-h-screen bg-dark-50 dark:bg-slate-900 relative overflow-hidden">
      {/* ── Background Watermark ── */}
      <div className="absolute inset-0 bg-brocade opacity-[0.03] dark:opacity-[0.07] pointer-events-none" />

      {/* ── Top gradient accent bar ── */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 via-accent-400 to-primary-600 relative z-10" />

      <div className="px-5 pt-8 pb-6 relative z-10 w-full max-w-[1600px] mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-dark-400 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 mb-6 group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Quay lại</span>
        </button>

        {/* Header */}
        <div className="opacity-0 animate-fade-in-up">
          <h1 className="section-title text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-accent-600 dark:from-primary-400 dark:to-accent-400">
            Bạn thích gì? <span className="inline-block animate-float">🎯</span>
          </h1>
          <p className="section-subtitle text-sm mt-2 leading-relaxed">
            Chọn các trải nghiệm đặc trưng tại Gia Lai để chúng tôi thiết kế lịch trình cho bạn
          </p>
        </div>

        {/* Selection count badge */}
        <div className="opacity-0 animate-fade-in delay-200 mt-5 mb-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800/50">
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                canContinue ? 'bg-primary-500' : 'bg-dark-300'
              }`}
            />
            <span className="text-xs font-semibold text-primary-700">
              Đã chọn: {selectedPreferences.length}/9
            </span>
          </div>

          {canContinue && (
            <span className="text-xs text-primary-500 font-medium animate-fade-in">
              Tuyệt vời! 🎉
            </span>
          )}
        </div>

        {/* Preference cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {preferenceOptions.map((pref, idx) => {
            const isActive = selectedPreferences.includes(pref.id);
            return (
              <button
                key={pref.id}
                onClick={() => togglePreference(pref.id)}
                className={`opacity-0 animate-scale-in delay-${Math.min(idx + 1, 8) * 100}
                           relative flex flex-col items-start justify-end p-4 rounded-2xl
                           h-32 sm:h-40 overflow-hidden text-left
                           transition-all duration-300 ease-out group
                           focus:outline-none focus:ring-2 focus:ring-primary-400/50
                           active:scale-95
                           ${
                             isActive
                               ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-dark-50 dark:ring-offset-slate-900 shadow-lg scale-[1.02]'
                               : 'shadow-sm hover:shadow-md hover:-translate-y-1'
                           }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={pref.image} 
                    alt={pref.label} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} 
                  />
                  {/* Overlay Gradient for readability */}
                  <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'bg-gradient-to-t from-black/80 via-black/30 to-transparent' : 'bg-gradient-to-t from-black/70 via-black/20 to-black/10 group-hover:from-black/80'}`} />
                </div>

                {/* Check badge */}
                {isActive && (
                  <div className="absolute top-3 right-3 z-20 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center shadow-md animate-bounce-in">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 w-full">
                  <span className="text-2xl mb-1 block drop-shadow-md">{pref.icon}</span>
                  <span className="text-sm font-bold text-white drop-shadow-md tracking-wide">
                    {pref.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bottom sticky CTA ── */}
      <div className="sticky bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-dark-50 via-dark-50 to-dark-50/0 dark:from-slate-900 dark:via-slate-900 z-20">
        <button
          onClick={() => navigate('/trip-info')}
          disabled={!canContinue}
          className="btn-primary w-full py-4 text-base gap-2"
        >
          <span>Tiếp tục</span>
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {!canContinue && (
          <p className="text-center text-xs text-dark-400 mt-2 animate-pulse-soft">
            Hãy chọn ít nhất 1 sở thích để tiếp tục
          </p>
        )}
      </div>
    </div>
  );
}
