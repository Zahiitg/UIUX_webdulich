import React from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Feature cards data ─── */
const features = [
  {
    emoji: '🤖',
    title: 'AI Thông Minh',
    desc: 'Lịch trình được cá nhân hóa bởi Gemini AI, phù hợp sở thích và phong cách du lịch của bạn.',
  },
  {
    emoji: '🗺️',
    title: 'Dữ Liệu Chính Xác',
    desc: 'Thông tin địa điểm, giá vé luôn cập nhật từ nguồn đáng tin cậy.',
  },
  {
    emoji: '💬',
    title: 'Trợ Lý 24/7',
    desc: 'Chatbot hỗ trợ mọi lúc mọi nơi — gợi ý ăn uống, di chuyển, hoạt động.',
  },
  {
    emoji: '💰',
    title: 'Tối Ưu Chi Phí',
    desc: 'Tính toán ngân sách thông minh, giúp bạn tận hưởng trọn vẹn mà không lo vượt chi.',
  },
];

/* ─── Team members data ─── */
const team = [
  { avatar: '👨‍💻', name: 'Trương Gia Huy', role: 'Fullstack Developer' },
  { avatar: '🎨', name: 'Mai Hoàng Đăng', role: 'UI/UX Designer' },
  { avatar: '🤖', name: 'Trần Quốc Thịnh', role: 'AI Engineer' },
  { avatar: '📊', name: 'Phạm Phương Thảo', role: 'Data Analyst' },
];

/* ─── Tech stack data ─── */
const techStack = [
  {
    name: 'React',
    icon: '⚛️',
    color: 'from-cyan-400 to-blue-500',
    tagColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  {
    name: 'Gemini AI',
    icon: '✨',
    color: 'from-violet-400 to-purple-600',
    tagColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  },
  {
    name: 'TailwindCSS',
    icon: '🎨',
    color: 'from-teal-400 to-emerald-500',
    tagColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      {/* ════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pb-28">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/15 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-primary-400/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        {/* Brocade pattern overlay */}
        <div className="absolute inset-0 bg-brocade opacity-[0.04] mix-blend-overlay" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Brand icon */}
          <div className="opacity-0 animate-fade-in inline-flex mb-6">
            <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
              <span className="text-4xl">🌿</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="opacity-0 animate-fade-in-up text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Về Chúng Tôi
          </h1>

          {/* Subtitle */}
          <p className="opacity-0 animate-fade-in-up delay-200 mt-4 text-lg sm:text-xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
            GiaLai Guide — Người bạn đồng hành du lịch Gia Lai
          </p>

          {/* Decorative divider */}
          <div className="opacity-0 animate-fade-in delay-300 flex items-center justify-center gap-3 mt-8">
            <span className="block w-12 h-px bg-white/20" />
            <span className="text-accent-400 text-sm animate-pulse-soft">✦</span>
            <span className="block w-12 h-px bg-white/20" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MISSION SECTION
          ════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 -mt-12">
        <div className="opacity-0 animate-fade-in-up delay-300 glass rounded-3xl p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-dark-900 dark:text-slate-100">
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

          <div className="mt-6 flex flex-wrap gap-3">
            {['Tây Nguyên', 'AI', 'Du lịch thông minh', 'Văn hóa'].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FEATURES SECTION — 2×2 grid
          ════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="opacity-0 animate-fade-in-up text-2xl md:text-3xl font-bold text-dark-900 dark:text-slate-100">
            Tính Năng Nổi Bật
          </h2>
          <p className="opacity-0 animate-fade-in-up delay-100 mt-2 text-dark-500 dark:text-slate-400 text-base">
            Mọi thứ bạn cần cho một chuyến đi hoàn hảo
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`opacity-0 animate-fade-in-up delay-${(i + 1) * 100}
                group glass rounded-2xl p-6 
                hover:-translate-y-1 hover:shadow-xl 
                transition-all duration-300 cursor-default`}
            >
              {/* Icon container */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 dark:from-primary-500/10 dark:to-accent-500/10 border border-primary-500/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {f.emoji}
              </div>

              <h3 className="text-lg font-bold text-dark-900 dark:text-slate-100 mb-1">
                {f.title}
              </h3>
              <p className="text-sm text-dark-500 dark:text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TEAM SECTION
          ════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="opacity-0 animate-fade-in-up text-2xl md:text-3xl font-bold text-dark-900 dark:text-slate-100">
            Đội Ngũ Phát Triển
          </h2>
          <p className="opacity-0 animate-fade-in-up delay-100 mt-2 text-dark-500 dark:text-slate-400 text-base">
            Những người đứng sau GiaLai Guide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`opacity-0 animate-fade-in-up delay-${(i + 1) * 100}
                group glass rounded-2xl p-6 text-left
                hover:-translate-y-1 hover:shadow-xl 
                transition-all duration-300`}
            >
              {/* Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400/20 to-accent-400/20 dark:from-primary-500/10 dark:to-accent-500/10 border-2 border-white/30 dark:border-white/10 flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {member.avatar}
              </div>

              <h3 className="text-lg font-bold text-dark-900 dark:text-slate-100 mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-dark-500 dark:text-slate-400 leading-relaxed">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TECHNOLOGY STACK SECTION
          ════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="opacity-0 animate-fade-in-up text-2xl md:text-3xl font-bold text-dark-900 dark:text-slate-100">
            Công Nghệ Sử Dụng
          </h2>
          <p className="opacity-0 animate-fade-in-up delay-100 mt-2 text-dark-500 dark:text-slate-400 text-base">
            Nền tảng công nghệ hiện đại, mạnh mẽ
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5">
          {techStack.map((tech, i) => (
            <div
              key={tech.name}
              className={`opacity-0 animate-fade-in-up delay-${(i + 1) * 100}
                glass rounded-2xl px-8 py-6 text-center min-w-[160px]
                hover:-translate-y-1 hover:shadow-xl
                transition-all duration-300 group`}
            >
              {/* Icon with gradient glow */}
              <div
                className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-3xl mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {tech.icon}
              </div>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${tech.tagColor}`}
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
      <section className="relative overflow-hidden py-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900" />
        <div className="absolute inset-0 bg-brocade opacity-[0.04] mix-blend-overlay" />

        {/* Orbs */}
        <div className="absolute top-6 right-16 w-40 h-40 bg-accent-500/15 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-6 left-16 w-48 h-48 bg-primary-400/15 rounded-full blur-3xl animate-pulse-soft" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="opacity-0 animate-fade-in-up text-3xl md:text-4xl font-bold text-white leading-tight">
            Sẵn sàng khám phá
            <br />
            <span className="text-accent-400">Gia Lai</span> cùng AI?
          </h2>
          <p className="opacity-0 animate-fade-in-up delay-100 mt-4 text-white/60 text-base md:text-lg max-w-lg mx-auto">
            Chỉ mất vài phút để tạo lịch trình du lịch hoàn hảo cho riêng bạn.
          </p>

          <button
            onClick={() => navigate('/survey')}
            className="opacity-0 animate-fade-in-up delay-200 mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-2xl 
                       font-bold text-base tracking-wide text-white
                       bg-gradient-to-r from-accent-500 to-orange-500
                       shadow-lg shadow-accent-600/30 border border-accent-400/50
                       hover:shadow-xl hover:shadow-accent-500/40 hover:-translate-y-0.5
                       active:scale-[0.98]
                       transition-all duration-300 ease-out"
          >
            Bắt đầu chuyến đi ngay
            <span className="text-lg">✨</span>
          </button>

          <p className="opacity-0 animate-fade-in delay-300 mt-8 text-[11px] text-white/30 tracking-wider uppercase">
            Powered by Gemini AI · Made with ❤️ in Gia Lai
          </p>
        </div>
      </section>
    </div>
  );
}
