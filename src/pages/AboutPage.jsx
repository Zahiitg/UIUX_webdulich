import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Target, Code2, Sparkles, Map, MessageSquare, Wallet, Briefcase, Camera, Coffee, Brain } from 'lucide-react';

/* ─── Feature cards data ─── */
const features = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'AI Thông Minh',
    desc: 'Lịch trình được cá nhân hóa bởi Gemini AI, phù hợp sở thích và phong cách du lịch của bạn.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-500/10'
  },
  {
    icon: <Map className="w-8 h-8" />,
    title: 'Dữ Liệu Chính Xác',
    desc: 'Thông tin địa điểm, giá vé luôn cập nhật từ nguồn đáng tin cậy.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10'
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: 'Trợ Lý 24/7',
    desc: 'Chatbot hỗ trợ mọi lúc mọi nơi — gợi ý ăn uống, di chuyển, hoạt động.',
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-500/10'
  },
  {
    icon: <Wallet className="w-8 h-8" />,
    title: 'Tối Ưu Chi Phí',
    desc: 'Tính toán ngân sách thông minh, giúp bạn tận hưởng trọn vẹn mà không lo vượt chi.',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-500/10'
  },
];

/* ─── Team members data ─── */
const team = [
  { avatar: <Code2 className="w-7 h-7" />, name: 'Trương Gia Huy', role: 'Fullstack Developer' },
  { avatar: <Camera className="w-7 h-7" />, name: 'Mai Hoàng Đăng', role: 'UI/UX Designer' },
  { avatar: <Brain className="w-7 h-7" />, name: 'Trần Quốc Thịnh', role: 'AI Engineer' },
  { avatar: <Coffee className="w-7 h-7" />, name: 'Phạm Phương Thảo', role: 'Data Analyst' },
];

/* ─── Tech stack data ─── */
const techStack = [
  {
    name: 'React',
    icon: '⚛️',
    color: 'from-cyan-400 to-blue-500',
    tagColor: 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/20',
  },
  {
    name: 'Gemini AI',
    icon: '✨',
    color: 'from-violet-400 to-purple-600',
    tagColor: 'bg-violet-500/10 text-violet-500 dark:text-violet-400 border-violet-500/20',
  },
  {
    name: 'TailwindCSS',
    icon: '🎨',
    color: 'from-teal-400 to-emerald-500',
    tagColor: 'bg-teal-500/10 text-teal-500 dark:text-teal-400 border-teal-500/20',
  },
  {
    name: 'Firebase',
    icon: '🔥',
    color: 'from-amber-400 to-orange-500',
    tagColor: 'bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20',
  }
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Decor (Fixed so it stays while scrolling) */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-emerald-400/15 dark:bg-emerald-500/15 rounded-full blur-[120px]" />
         <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-cyan-400/15 dark:bg-cyan-500/15 rounded-full blur-[120px]" />
         <div className="absolute top-[60%] left-[30%] w-[400px] h-[400px] bg-purple-400/15 dark:bg-purple-500/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* ════════════════════════════════════════════
            HERO SECTION
            ════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 md:pb-28 overflow-hidden rounded-b-[3rem] sm:rounded-b-[5rem] mx-2 sm:mx-4 bg-gradient-to-br from-emerald-600 via-emerald-700 to-cyan-800 shadow-2xl">
          {/* Decorative orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/30 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-cyan-400/30 rounded-full blur-3xl animate-pulse-soft" />

          {/* Brocade pattern overlay */}
          <div className="absolute inset-0 bg-brocade opacity-[0.06] mix-blend-overlay" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            {/* Brand icon */}
            <div className="opacity-0 animate-fade-in inline-flex mb-8">
              <div className="w-24 h-24 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                <Target className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="opacity-0 animate-fade-in-up text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Về Chúng Tôi
            </h1>

            {/* Subtitle */}
            <p className="opacity-0 animate-fade-in-up delay-200 mt-6 text-lg sm:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
              GiaLai Guide — Người bạn đồng hành du lịch Gia Lai thông minh, mang đến trải nghiệm đột phá với sức mạnh của AI.
            </p>

            {/* Decorative divider */}
            <div className="opacity-0 animate-fade-in delay-300 flex items-center justify-center gap-4 mt-10">
              <span className="block w-16 h-px bg-white/20" />
              <span className="text-emerald-300 text-sm animate-pulse-soft">✦</span>
              <span className="block w-16 h-px bg-white/20" />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            MISSION SECTION
            ════════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 -mt-16">
          <div className="opacity-0 animate-fade-in-up delay-300 bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-2xl border border-white/50 dark:border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-dark-900 dark:text-white">
                Sứ Mệnh
              </h2>
            </div>

            <p className="text-dark-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
              GiaLai Guide ra đời với khát vọng đưa công nghệ AI tiên tiến vào
              trải nghiệm du lịch, giúp du khách khám phá trọn vẹn vẻ đẹp hoang
              sơ và văn hóa đặc sắc của vùng đất Gia Lai — Tây Nguyên. Chúng tôi
              tin rằng mỗi chuyến đi đều xứng đáng được lên kế hoạch hoàn hảo,
              từ lịch trình thông minh, gợi ý phù hợp sở thích, đến tối ưu chi
              phí — tất cả chỉ trong vài bước đơn giản.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Tây Nguyên', 'Trí tuệ nhân tạo (AI)', 'Du lịch thông minh', 'Văn hóa địa phương'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-5 py-2 rounded-xl text-sm font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            FEATURES SECTION
            ════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="opacity-0 animate-fade-in-up text-3xl md:text-4xl font-black text-dark-900 dark:text-white">
              Giá Trị Cốt Lõi
            </h2>
            <p className="opacity-0 animate-fade-in-up delay-100 mt-4 text-dark-500 dark:text-slate-400 text-lg">
              Mọi thứ bạn cần cho một chuyến đi hoàn hảo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`opacity-0 animate-fade-in-up delay-${(i + 1) * 100}
                  group bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 
                  hover:-translate-y-2 hover:shadow-2xl hover:bg-white dark:hover:bg-white/10
                  border border-white/50 dark:border-white/10
                  transition-all duration-500 cursor-default`}
              >
                {/* Icon container */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg`}>
                  {f.icon}
                </div>

                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
                  {f.title}
                </h3>
                <p className="text-dark-500 dark:text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════
            TEAM SECTION
            ════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="text-center mb-16">
            <h2 className="opacity-0 animate-fade-in-up text-3xl md:text-4xl font-black text-dark-900 dark:text-white">
              Đội Ngũ Phát Triển
            </h2>
            <p className="opacity-0 animate-fade-in-up delay-100 mt-4 text-dark-500 dark:text-slate-400 text-lg">
              Những người đứng sau GiaLai Guide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`opacity-0 animate-fade-in-up delay-${(i + 1) * 100}
                  group bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 text-center
                  hover:-translate-y-2 hover:shadow-xl hover:bg-white dark:hover:bg-white/10
                  border border-white/50 dark:border-white/10
                  transition-all duration-500`}
              >
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-100 dark:bg-slate-800 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-md">
                  {member.avatar}
                </div>

                <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════
            TECHNOLOGY STACK SECTION
            ════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="text-center mb-16">
            <h2 className="opacity-0 animate-fade-in-up text-3xl md:text-4xl font-black text-dark-900 dark:text-white">
              Công Nghệ Sử Dụng
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {techStack.map((tech, i) => (
              <div
                key={tech.name}
                className={`opacity-0 animate-fade-in-up delay-${(i + 1) * 100}
                  bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[2rem] px-8 py-6 text-center min-w-[180px]
                  border border-white/50 dark:border-white/10 hover:bg-white dark:hover:bg-white/10
                  hover:-translate-y-2 hover:shadow-xl
                  transition-all duration-500 group`}
              >
                {/* Icon with gradient glow */}
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                >
                  {tech.icon}
                </div>

                <span
                  className={`inline-block px-4 py-1.5 rounded-xl text-sm font-bold border ${tech.tagColor}`}
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════
            CTA SECTION
            ════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-cyan-800 shadow-2xl py-20">
            <div className="absolute inset-0 bg-brocade opacity-[0.06] mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                Sẵn sàng khám phá
                <br />
                <span className="text-emerald-200">Gia Lai</span> cùng AI?
              </h2>
              <p className="text-white/80 text-lg md:text-xl mb-10">
                Chỉ mất vài phút để tạo lịch trình du lịch hoàn hảo cho riêng bạn.
              </p>

              <button
                onClick={() => navigate('/survey')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-emerald-900 bg-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Bắt đầu chuyến đi ngay
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </button>

              <p className="mt-10 text-xs text-white/50 font-semibold tracking-widest uppercase">
                Powered by Gemini AI · Made with ❤️ in Gia Lai
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
