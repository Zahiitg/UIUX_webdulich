import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useTravelStore from '../store/useTravelStore';

// ─── Helpers ──────────────────────────────────────────────
const formatVND = (amount) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

const getWeatherInsight = (dateString) => {
  if (!dateString) return null;
  
  const dateObj = new Date(dateString);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  // Pseudo-random generator based on date to ensure the same date always gives the same weather
  let seed = month * 31 + day + dateObj.getFullYear();
  const rand = () => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  let tempMin, tempMax, conditions;
  let seasonData;

  if (month >= 11 || month <= 2) {
    seasonData = {
      icon: '🌼', color: 'from-yellow-500 to-amber-600',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/50',
      text: 'text-amber-900 dark:text-amber-200',
      title: 'Mùa khô mát mẻ & Hoa dã quỳ',
      desc: 'Tuyệt vời nhất để săn mây, trekking và ngắm hoa dã quỳ trên núi lửa Chư Đăng Ya.'
    };
    tempMin = 14; tempMax = 24;
    conditions = ['Nắng nhẹ', 'Trời trong xanh', 'Se lạnh', 'Nắng ấm', 'Ít mây'];
  } else if (month >= 3 && month <= 5) {
    seasonData = {
      icon: '☕', color: 'from-orange-400 to-red-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/50',
      text: 'text-orange-900 dark:text-orange-200',
      title: 'Mùa hoa cà phê trắng muốt',
      desc: 'Trời nắng đẹp, rực rỡ sắc trắng và hương thơm ngào ngạt của hoa cà phê.'
    };
    tempMin = 20; tempMax = 32;
    conditions = ['Nắng gắt', 'Trời quang', 'Nóng bức', 'Có mây', 'Nắng oi'];
  } else {
    seasonData = {
      icon: '🌧️', color: 'from-teal-400 to-cyan-500',
      bg: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800/50',
      text: 'text-teal-900 dark:text-teal-200',
      title: 'Mùa mưa hùng vĩ',
      desc: 'Các ngọn thác như Phú Cường sẽ dâng nước cuồn cuộn cực kỳ hoành tráng.'
    };
    tempMin = 20; tempMax = 28;
    conditions = ['Mưa rào', 'Nhiều mây', 'Mưa giông', 'Âm u', 'Có lúc có mưa'];
  }

  const temp = Math.floor(rand() * (tempMax - tempMin + 1)) + tempMin;
  const condition = conditions[Math.floor(rand() * conditions.length)];
  
  let conditionIcon = '⛅';
  if (condition.includes('Mưa') || condition.includes('Âm u')) conditionIcon = '🌧️';
  else if (condition.includes('Nắng') || condition.includes('Nóng')) conditionIcon = '☀️';
  else if (condition.includes('lạnh')) conditionIcon = '❄️';

  return {
    ...seasonData,
    dailyWeather: {
      temp: `${temp}°C`,
      condition: condition,
      icon: conditionIcon
    }
  };
};

export default function TripInfoPage() {
  const navigate = useNavigate();
  const { tripInfo, setTripInfo } = useTravelStore();

  const [startDate, setStartDate] = useState(tripInfo.startDate || '');
  const [endDate, setEndDate] = useState(tripInfo.endDate || '');
  const [numPeople, setNumPeople] = useState(tripInfo.numPeople || 2);
  const [budget, setBudget] = useState(tripInfo.budget || 5_000_000);
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const budgetPercent = useMemo(
    () => ((budget - 1_000_000) / (20_000_000 - 1_000_000)) * 100,
    [budget]
  );

  function validate() {
    const errs = {};
    if (!startDate) errs.startDate = 'Vui lòng chọn ngày đi';
    if (!endDate) errs.endDate = 'Vui lòng chọn ngày về';
    if (startDate && endDate && endDate <= startDate)
      errs.endDate = 'Ngày về phải sau ngày đi';
    if (numPeople < 1) errs.numPeople = 'Ít nhất 1 người';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    const budgetLabel = formatVND(budget);
    setTripInfo({
      destination: 'Gia Lai',
      startDate,
      endDate,
      numPeople,
      budget,
      budgetLabel,
    });
    navigate('/itinerary');
  }

  return (
    <div className="w-full min-h-screen bg-dark-50 dark:bg-slate-900 flex flex-col md:flex-row relative overflow-hidden">
      
      {/* ── Desktop Left Panel (Image) ── */}
      <div className="hidden md:flex w-1/2 relative bg-primary-900 flex-col justify-end p-12">
        <img 
          src="/images/lang_stor_bahnar_1782505259629.png" 
          alt="Gia Lai" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
        
        <div className="relative z-10 animate-fade-in-up">
          <span className="inline-block px-3 py-1 bg-accent-500/20 text-accent-400 border border-accent-500/30 rounded-full text-sm font-bold tracking-wider mb-4 backdrop-blur-sm">
            BƯỚC 2
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Gia Lai <br/>đang vẫy gọi!
          </h2>
          <p className="text-white/80 text-lg max-w-md">
            Chỉ cần cung cấp vài thông tin cơ bản, AI của chúng tôi sẽ thiết kế một lịch trình độc bản dành riêng cho bạn.
          </p>
        </div>
      </div>

      {/* ── Form Container (Right on Desktop) ── */}
      <div className="w-full md:w-1/2 flex flex-col relative h-screen overflow-y-auto custom-scrollbar">
        {/* Background Watermark */}
        <div className="absolute inset-0 bg-brocade opacity-[0.03] dark:opacity-[0.07] pointer-events-none" />

        {/* Top gradient accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 via-accent-400 to-primary-600 relative z-10 flex-shrink-0" />

        <div className="px-6 sm:px-10 pt-8 pb-32 relative z-10 flex-1">
        {/* Back button */}
        <button
          onClick={() => navigate('/survey')}
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
            Thông tin chuyến đi{' '}
            <span className="inline-block animate-float">✈️</span>
          </h1>
          <p className="section-subtitle text-sm mt-2 leading-relaxed">
            Điền thông tin để AI tạo lịch trình khám phá đại ngàn hoàn hảo cho bạn
          </p>
        </div>

        {/* ── Step indicator ── */}
        <div className="opacity-0 animate-fade-in delay-100 flex items-center gap-2 mt-6 mb-6">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  s <= 2
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                    : 'bg-dark-200 dark:bg-slate-700 text-dark-400 dark:text-slate-400'
                }`}
              >
                {s <= 1 ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s
                )}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                    s < 2 ? 'bg-primary-500' : 'bg-dark-200 dark:bg-slate-700'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Form cards ── */}
        <div className="flex flex-col gap-4">
          {/* 1. Destination (read-only) */}
          <div className="opacity-0 animate-fade-in-up delay-100 card p-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-dark-400 dark:text-slate-400 uppercase tracking-wider mb-2">
              <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Điểm đến
            </label>
            <div className="input-field bg-primary-50/50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800/50 text-primary-700 dark:text-primary-300 font-semibold flex items-center gap-2 cursor-default">
              <span>🌄</span>
              <span>Gia Lai</span>
              <span className="ml-auto text-xs text-primary-400 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/50 px-2 py-0.5 rounded-full">
                Tây Nguyên
              </span>
            </div>
          </div>

          {/* 2 & 3. Date pickers */}
          <div className="opacity-0 animate-fade-in-up delay-200 grid grid-cols-2 gap-3">
            {/* Start date */}
            <div className="card p-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-dark-400 dark:text-slate-400 uppercase tracking-wider mb-2">
                <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Ngày đi
              </label>
              <input
                type="date"
                value={startDate}
                min={today}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setErrors((prev) => ({ ...prev, startDate: undefined }));
                }}
                className={`input-field text-sm ${
                  errors.startDate ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : ''
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1.5 animate-fade-in">{errors.startDate}</p>
              )}
            </div>

            {/* End date */}
            <div className="card p-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-dark-400 dark:text-slate-400 uppercase tracking-wider mb-2">
                <svg className="w-4 h-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Ngày về
              </label>
              <input
                type="date"
                value={endDate}
                min={startDate || today}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setErrors((prev) => ({ ...prev, endDate: undefined }));
                }}
                className={`input-field text-sm ${
                  errors.endDate ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : ''
                }`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-xs mt-1.5 animate-fade-in">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Smart Weather Insight Widget */}
          {startDate && (
            <div className="animate-fade-in-up">
              {(() => {
                const insight = getWeatherInsight(startDate);
                if (!insight) return null;
                return (
                  <div className={`mt-4 rounded-xl border p-4 ${insight.bg} animate-fade-in-up transition-colors duration-500 shadow-sm`}>
                    <div className="flex items-center gap-4">
                      {/* Real weather badge */}
                      <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm border border-white/50 dark:border-slate-700/50 min-w-[76px]">
                        <span className="text-3xl mb-1 drop-shadow-md">{insight.dailyWeather.icon}</span>
                        <span className="font-black text-xl text-dark-800 dark:text-slate-100 leading-none tracking-tighter">{insight.dailyWeather.temp}</span>
                        <span className="text-[10px] font-bold text-dark-500 dark:text-slate-400 text-center uppercase tracking-wider mt-1">{insight.dailyWeather.condition}</span>
                      </div>

                      {/* Seasonal Insight */}
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-sm drop-shadow-sm">{insight.icon}</span>
                          <h4 className={`font-bold text-sm uppercase tracking-wider ${insight.text}`}>
                            {insight.title}
                          </h4>
                        </div>
                        <p className={`text-[13px] leading-relaxed ${insight.text} opacity-90 font-medium`}>
                          {insight.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 4. Number of people */}
          <div className="opacity-0 animate-fade-in-up delay-300 card p-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-dark-400 dark:text-slate-400 uppercase tracking-wider mb-3">
              <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Số người
            </label>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setNumPeople((p) => Math.max(1, p - 1))}
                className="w-12 h-12 rounded-xl bg-dark-100 dark:bg-slate-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 
                           text-dark-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 
                           flex items-center justify-center text-xl font-bold
                           transition-all duration-200 active:scale-90
                           disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={numPeople <= 1}
              >
                −
              </button>

              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-dark-800 dark:text-slate-100">{numPeople}</span>
                <span className="text-xs text-dark-400 dark:text-slate-400 mt-0.5">
                  {numPeople === 1 ? 'người' : 'người'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setNumPeople((p) => Math.min(20, p + 1))}
                className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 
                           text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 
                           flex items-center justify-center text-xl font-bold
                           transition-all duration-200 active:scale-90
                           disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={numPeople >= 20}
              >
                +
              </button>
            </div>
            {errors.numPeople && (
              <p className="text-red-500 text-xs mt-1.5 text-center animate-fade-in">{errors.numPeople}</p>
            )}
          </div>

          {/* 5. Budget slider */}
          <div className="opacity-0 animate-fade-in-up delay-400 card p-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-dark-400 dark:text-slate-400 uppercase tracking-wider mb-1">
              <svg className="w-4 h-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ngân sách
            </label>

            {/* Budget display */}
            <div className="flex items-baseline justify-center gap-1 my-3">
              <span className="text-3xl font-extrabold text-gradient">
                {formatVND(budget)}
              </span>
            </div>

            {/* Slider */}
            <div className="relative mt-2 mb-1">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-dark-200 dark:bg-slate-700" />
              {/* Active track fill */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-400"
                style={{ width: `${budgetPercent}%` }}
              />
              <input
                type="range"
                min={1_000_000}
                max={20_000_000}
                step={500_000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="relative z-10 w-full h-2 appearance-none bg-transparent cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-6
                           [&::-webkit-slider-thumb]:h-6
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:bg-white
                           [&::-webkit-slider-thumb]:border-4
                           [&::-webkit-slider-thumb]:border-primary-500
                           [&::-webkit-slider-thumb]:shadow-lg
                           [&::-webkit-slider-thumb]:shadow-primary-500/30
                           [&::-webkit-slider-thumb]:transition-all
                           [&::-webkit-slider-thumb]:duration-200
                           [&::-webkit-slider-thumb]:hover:scale-110
                           [&::-moz-range-thumb]:w-6
                           [&::-moz-range-thumb]:h-6
                           [&::-moz-range-thumb]:rounded-full
                           [&::-moz-range-thumb]:bg-white
                           [&::-moz-range-thumb]:border-4
                           [&::-moz-range-thumb]:border-primary-500
                           [&::-moz-range-thumb]:shadow-lg"
              />
            </div>

            {/* Min/Max labels */}
            <div className="flex justify-between text-[10px] text-dark-400 dark:text-slate-400 font-medium mt-1">
              <span>1 triệu</span>
              <span>20 triệu</span>
            </div>

            {/* Budget tier */}
            <div className="flex justify-center mt-3">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 ${
                  budget <= 3_000_000
                    ? 'bg-emerald-100 text-emerald-700'
                    : budget <= 8_000_000
                    ? 'bg-sky-100 text-sky-700'
                    : budget <= 14_000_000
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {budget <= 3_000_000
                  ? '💚 Tiết kiệm'
                  : budget <= 8_000_000
                  ? '💙 Thoải mái'
                  : budget <= 14_000_000
                  ? '💛 Cao cấp'
                  : '❤️ Sang trọng'}
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* ── Bottom sticky CTA ── */}
      <div className="absolute md:w-1/2 bottom-0 right-0 left-0 md:left-auto px-6 sm:px-10 py-5 bg-gradient-to-t from-dark-50 via-dark-50 to-dark-50/0 dark:from-slate-900 dark:via-slate-900 z-20 border-t border-dark-100/50 dark:border-slate-800/50">
        <button
          onClick={handleSubmit}
          className="btn-primary w-full py-4 text-base gap-2
                     bg-gradient-to-r from-primary-500 to-accent-500
                     shadow-lg shadow-primary-600/25
                     hover:shadow-xl hover:shadow-accent-500/25"
        >
          <span>✨</span>
          <span>Tạo lịch trình AI</span>
        </button>
      </div>
    </div>
  );
}
