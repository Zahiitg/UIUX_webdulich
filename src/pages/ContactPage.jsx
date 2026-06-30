import React, { useState } from 'react';

const contactInfo = [
  {
    icon: '📍',
    label: 'Địa chỉ',
    value: '123 Trần Phú, TP. Pleiku, Gia Lai',
    sub: null,
  },
  {
    icon: '📞',
    label: 'Hotline',
    value: '0123 456 789',
    sub: 'Hỗ trợ từ 8h - 22h hàng ngày',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'hello@gialai-guide.vn',
    sub: null,
  },
  {
    icon: '⏰',
    label: 'Giờ làm việc',
    value: 'Thứ 2 - CN: 8:00 - 22:00',
    sub: null,
  },
];

const subjectOptions = [
  { value: '', label: 'Chọn chủ đề...' },
  { value: 'tour', label: 'Hỗ trợ đặt tour' },
  { value: 'feedback', label: 'Góp ý dịch vụ' },
  { value: 'business', label: 'Hợp tác kinh doanh' },
  { value: 'other', label: 'Khác' },
];

const socialLinks = [
  { icon: '📘', label: 'Facebook' },
  { icon: '📸', label: 'Instagram' },
  { icon: '🎵', label: 'TikTok' },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên';
    if (!form.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!form.subject) newErrors.subject = 'Vui lòng chọn chủ đề';
    if (!form.message.trim()) newErrors.message = 'Vui lòng nhập nội dung';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setErrors({});
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      {/* ── Success Toast ── */}
      <div
        className={`fixed top-20 right-4 z-50 transition-all duration-500 ease-out ${
          submitted
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="glass flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border border-green-300/30 dark:border-green-500/20">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-semibold text-dark-800 dark:text-slate-100 text-sm">
              Gửi thành công!
            </p>
            <p className="text-dark-500 dark:text-slate-400 text-xs">
              Cảm ơn bạn! Chúng tôi sẽ phản hồi trong 24h.
            </p>
          </div>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />

        {/* Decorative orbs */}
        <div className="absolute top-12 left-8 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-4 right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="opacity-0 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-lg">💌</span>
              <span className="text-white/90 text-sm font-medium">
                Liên hệ
              </span>
            </div>
          </div>

          <h1 className="opacity-0 animate-fade-in-up text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Liên Hệ Với Chúng Tôi
          </h1>

          <p className="opacity-0 animate-fade-in-up delay-100 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="relative -mt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── LEFT: Contact Form ── */}
          <div className="lg:col-span-3 opacity-0 animate-fade-in-up delay-200">
            <div className="glass rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-dark-900 dark:text-slate-100">
                  Gửi tin nhắn cho chúng tôi
                </h2>
                <p className="text-dark-500 dark:text-slate-400 text-sm mt-1">
                  Điền thông tin bên dưới, chúng tôi sẽ liên hệ sớm nhất.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-slate-300 mb-1.5">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      className={`input-field ${
                        errors.name
                          ? '!border-red-400 focus:!ring-red-500/10 focus:!border-red-500'
                          : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-slate-300 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className={`input-field ${
                        errors.email
                          ? '!border-red-400 focus:!ring-red-500/10 focus:!border-red-500'
                          : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Subject row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-slate-300 mb-1.5">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="0912 345 678"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-slate-300 mb-1.5">
                      Chủ đề <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`input-field appearance-none cursor-pointer ${
                        !form.subject
                          ? 'text-dark-400 dark:text-slate-500'
                          : ''
                      } ${
                        errors.subject
                          ? '!border-red-400 focus:!ring-red-500/10 focus:!border-red-500'
                          : ''
                      }`}
                    >
                      {subjectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-slate-300 mb-1.5">
                    Nội dung tin nhắn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Nhập nội dung bạn muốn gửi..."
                    className={`input-field resize-none ${
                      errors.message
                        ? '!border-red-400 focus:!ring-red-500/10 focus:!border-red-500'
                        : ''
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button type="submit" className="btn-primary w-full text-base">
                  <span className="mr-2">✈️</span>
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>

          {/* ── RIGHT: Contact Info ── */}
          <div className="lg:col-span-2 space-y-5 opacity-0 animate-fade-in-up delay-300">
            {/* Info cards */}
            {contactInfo.map((item, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-5 flex items-start gap-4 group hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-dark-800 dark:text-slate-100 font-semibold text-sm">
                    {item.value}
                  </p>
                  {item.sub && (
                    <p className="text-dark-400 dark:text-slate-500 text-xs mt-0.5">
                      {item.sub}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Social media card */}
            <div className="glass rounded-2xl p-5">
              <p className="text-sm font-semibold text-dark-800 dark:text-slate-200 mb-3">
                Kết nối với chúng tôi
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 group"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                    <span className="text-xs font-medium text-dark-600 dark:text-slate-300">
                      {social.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="glass rounded-2xl p-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-gradient">24h</p>
                  <p className="text-xs text-dark-500 dark:text-slate-400 mt-0.5">
                    Phản hồi nhanh
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-gradient">100%</p>
                  <p className="text-xs text-dark-500 dark:text-slate-400 mt-0.5">
                    Hài lòng
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-gradient">5K+</p>
                  <p className="text-xs text-dark-500 dark:text-slate-400 mt-0.5">
                    Du khách tin dùng
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-gradient">50+</p>
                  <p className="text-xs text-dark-500 dark:text-slate-400 mt-0.5">
                    Điểm đến hấp dẫn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Map Placeholder ── */}
        <div className="mt-12 opacity-0 animate-fade-in-up delay-400">
          <div className="glass rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-bold text-dark-900 dark:text-slate-100 mb-1">
                📍 Vị trí của chúng tôi
              </h3>
              <p className="text-sm text-dark-500 dark:text-slate-400">
                123 Trần Phú, TP. Pleiku, Gia Lai
              </p>
            </div>
            <div className="relative h-64 sm:h-80 bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50 dark:from-primary-900/30 dark:via-slate-800 dark:to-accent-900/20 flex items-center justify-center">
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-10 dark:opacity-5"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              {/* Pin and text */}
              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 dark:bg-primary-500/30 mb-4 animate-bounce">
                  <span className="text-4xl">📌</span>
                </div>
                <p className="text-dark-600 dark:text-slate-300 font-medium text-sm">
                  Bản đồ sẽ hiển thị tại đây
                </p>
                <p className="text-dark-400 dark:text-slate-500 text-xs mt-1">
                  Tích hợp Google Maps / Leaflet
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-0 animate-fade-in-up delay-500">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-500" />
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>
          <div className="relative z-10 px-6 sm:px-10 py-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Sẵn sàng khám phá Gia Lai?
            </h3>
            <p className="text-white/80 max-w-lg mx-auto mb-6 text-sm sm:text-base">
              Để AI giúp bạn lên kế hoạch chuyến đi hoàn hảo — miễn phí và cá
              nhân hóa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-2xl hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] transition-all duration-300">
                🗺️ Tạo lịch trình AI
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/25 hover:bg-white/25 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
                💬 Chat với trợ lý
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
