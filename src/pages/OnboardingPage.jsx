import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: '📍', title: 'Điểm đến đa dạng', desc: 'Từ đại ngàn hùng vĩ đến biển xanh' },
  { icon: '📸', title: 'Trải nghiệm trọn vẹn', desc: 'Văn hóa - Ẩm thực - Con người' },
  { icon: '⭐', title: 'Dịch vụ chất lượng', desc: 'Uy tín - An toàn - Tiện lợi' },
  { icon: '🤖', title: 'Trợ lý AI thông minh', desc: 'Lên lịch trình trong 5 giây' },
];

const polaroids = [
  { src: '/images/chu_dang_ya_volcano_1782505165301.png', title: 'Chư Đăng Ya', rotation: '-rotate-12', z: 'z-10', translate: '-translate-x-32 -translate-y-12' },
  { src: '/images/bien_ho_tnnung_1782505155088.png', title: 'Biển Hồ', rotation: '-rotate-6', z: 'z-20', translate: '-translate-x-16 translate-y-0' },
  { src: '/images/ky_co_beach_1782812243763.png', title: 'Kỳ Co', rotation: 'rotate-2', z: 'z-30', translate: 'translate-x-0 translate-y-8' },
  { src: '/images/hon_kho_island_1782812253597.png', title: 'Hòn Khô', rotation: 'rotate-6', z: 'z-20', translate: 'translate-x-16 -translate-y-4' },
  { src: '/images/eo_gio_1782812490073.png', title: 'Eo Gió', rotation: 'rotate-12', z: 'z-10', translate: 'translate-x-32 translate-y-6' },
];

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen flex items-center overflow-hidden pt-16">
      {/* Import Google Font for Script Text */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
          .font-script { font-family: 'Dancing Script', cursive; }
        `}
      </style>

      {/* ── Background Image with Overlay ── */}
      <div 
        className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/gialai_hero_landscape.png")' }}
      />
      
      {/* Gradients to ensure text readability */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent transition-colors duration-500" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-white/60 via-transparent to-transparent dark:from-slate-950/60 transition-colors duration-500" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-soft -z-10" />

      {/* ── Main Content Container (Optimized for 1920x1080) ── */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h2 className="opacity-0 animate-fade-in-up font-script text-5xl md:text-6xl xl:text-7xl text-primary-600 dark:text-primary-400 mb-2 xl:mb-4 drop-shadow-sm">
              Khám phá
            </h2>
            <h1 className="opacity-0 animate-fade-in-up delay-100 text-6xl md:text-7xl lg:text-8xl xl:text-[140px] font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none mb-6 xl:mb-10 drop-shadow-lg">
              TOUR GIA LAI
            </h1>
            <p className="opacity-0 animate-fade-in-up delay-200 text-xl md:text-2xl xl:text-3xl text-slate-700 dark:text-slate-300 font-medium mb-10 xl:mb-16 flex items-center gap-3">
              Trải nghiệm tuyệt vời <span className="w-8 xl:w-12 h-px bg-slate-400 dark:bg-slate-600"></span> Khám phá Việt Nam
            </p>

            {/* Features Grid */}
            <div className="opacity-0 animate-fade-in-up delay-300 grid grid-cols-2 gap-x-6 xl:gap-x-12 gap-y-8 xl:gap-y-12 mb-12 xl:mb-20 w-full max-w-3xl">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-4 xl:gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 xl:w-16 xl:h-16 rounded-full bg-white dark:bg-slate-800 border-2 border-primary-500 flex items-center justify-center text-xl xl:text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base xl:text-xl text-slate-900 dark:text-white mb-1 xl:mb-2 uppercase tracking-wide">
                      {f.title}
                    </h3>
                    <p className="text-xs md:text-sm xl:text-base text-slate-500 dark:text-slate-400">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/survey')}
              className="opacity-0 animate-fade-in-up delay-500 group relative inline-flex items-center justify-center gap-3 px-8 py-4 xl:px-12 xl:py-6 bg-slate-900 dark:bg-primary-600 text-white font-bold text-lg xl:text-2xl rounded-full overflow-hidden shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white text-slate-900 transition-colors">
                  ➔
                </span>
                KHÁM PHÁ NGAY
              </span>
            </button>
          </div>

          {/* Right Column: Polaroids */}
          <div className="lg:col-span-5 relative h-[400px] sm:h-[500px] xl:h-[700px] w-full hidden sm:flex items-center justify-center mt-10 lg:mt-0 opacity-0 animate-fade-in delay-700">
            {polaroids.map((p, index) => (
              <div 
                key={index}
                className={`absolute ${p.z} ${p.rotation} ${p.translate} transition-transform duration-500 hover:z-50 hover:scale-110 hover:rotate-0 cursor-pointer`}
              >
                <div className="bg-white p-3 pb-8 md:p-4 md:pb-12 xl:p-6 xl:pb-16 rounded-lg shadow-2xl border border-gray-100">
                  <div className="w-32 h-32 md:w-48 md:h-48 xl:w-64 xl:h-64 overflow-hidden rounded">
                    <img 
                      src={p.src} 
                      alt={p.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1540202404-b71180fb2b9d?w=400&q=80";
                      }}
                    />
                  </div>
                  <p className="text-center font-script text-lg md:text-xl xl:text-3xl text-gray-800 mt-2 md:mt-4 xl:mt-6 absolute bottom-2 md:bottom-3 xl:bottom-4 w-full left-0">
                    {p.title}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Decorative Paper Airplane */}
            <div className="absolute top-0 right-10 xl:right-20 text-4xl xl:text-6xl animate-bounce-slow text-primary-500 opacity-80">
              ✈️
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
