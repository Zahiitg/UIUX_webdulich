import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const FacebookIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const InstagramIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const TwitterIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const contactInfo = [
  {
    icon: <MapPin className="w-6 h-6" />,
    label: 'Địa chỉ',
    value: '123 Trần Phú, TP. Pleiku, Gia Lai',
    sub: 'Văn phòng trung tâm',
  },
  {
    icon: <Phone className="w-6 h-6" />,
    label: 'Hotline',
    value: '0123 456 789',
    sub: 'Hỗ trợ từ 8h - 22h hàng ngày',
  },
  {
    icon: <Mail className="w-6 h-6" />,
    label: 'Email',
    value: 'hello@gialai-guide.vn',
    sub: 'Phản hồi trong 24h',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    label: 'Giờ làm việc',
    value: 'Thứ 2 - CN: 8:00 - 22:00',
    sub: 'Nghỉ các ngày Lễ/Tết',
  },
];

const subjectOptions = [
  { value: '', label: 'Chọn chủ đề...' },
  { value: 'tour', label: 'Hỗ trợ đặt tour' },
  { value: 'feedback', label: 'Góp ý dịch vụ' },
  { value: 'business', label: 'Hợp tác kinh doanh' },
  { value: 'other', label: 'Khác' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
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
    toast.success('Gửi thành công! Chúng tôi sẽ phản hồi trong 24h.');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wide mb-6">
            <Mail className="w-4 h-4" /> TRUNG TÂM HỖ TRỢ
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-dark-900 dark:text-white mb-6 leading-tight">
            Liên hệ với <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Gia Lai Travel</span>
          </h1>
          <p className="text-lg text-dark-500 dark:text-slate-400">
            Dù bạn cần tư vấn lịch trình, hỗ trợ đặt phòng hay có bất kỳ thắc mắc nào, đội ngũ của chúng tôi luôn sẵn lòng lắng nghe và giải đáp.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* Contact Information (Left Column) */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-8">Thông tin liên hệ</h3>
              
              <div className="space-y-8">
                {contactInfo.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-5 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-emerald-500 group-hover:text-white shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark-400 dark:text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-base font-bold text-dark-900 dark:text-white">{item.value}</p>
                      {item.sub && <p className="text-sm text-dark-500 dark:text-slate-400 mt-1">{item.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm font-bold text-dark-900 dark:text-white mb-4">Kết nối với chúng tôi</p>
                <div className="flex gap-4">
                  {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
                    <button key={i} className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-dark-600 dark:text-slate-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 dark:border-white/10 h-full">
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">Gửi tin nhắn</h3>
              <p className="text-dark-500 dark:text-slate-400 mb-8">Chúng tôi sẽ phản hồi lại bạn sớm nhất có thể.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-700 dark:text-slate-300 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange} 
                      className={`w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border ${errors.name ? 'border-red-400 focus:ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'} outline-none focus:ring-4 transition-all duration-300 dark:text-white placeholder:text-slate-400`}
                      placeholder="Nguyễn Văn A"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-700 dark:text-slate-300 mb-2">Email <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      name="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      className={`w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border ${errors.email ? 'border-red-400 focus:ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'} outline-none focus:ring-4 transition-all duration-300 dark:text-white placeholder:text-slate-400`}
                      placeholder="email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone Input */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-700 dark:text-slate-300 mb-2">Số điện thoại</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={form.phone} 
                      onChange={handleChange} 
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20 outline-none focus:ring-4 transition-all duration-300 dark:text-white placeholder:text-slate-400"
                      placeholder="0912 345 678"
                    />
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-700 dark:text-slate-300 mb-2">Chủ đề <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select 
                        name="subject" 
                        value={form.subject} 
                        onChange={handleChange} 
                        className={`w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border ${errors.subject ? 'border-red-400 focus:ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'} outline-none focus:ring-4 transition-all duration-300 dark:text-white appearance-none cursor-pointer ${!form.subject && 'text-slate-400'}`}
                      >
                        {subjectOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                    {errors.subject && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.subject}</p>}
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-semibold text-dark-700 dark:text-slate-300 mb-2">Nội dung tin nhắn <span className="text-red-500">*</span></label>
                  <textarea 
                    name="message" 
                    value={form.message} 
                    onChange={handleChange} 
                    rows={5}
                    className={`w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border ${errors.message ? 'border-red-400 focus:ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'} outline-none focus:ring-4 transition-all duration-300 dark:text-white resize-none placeholder:text-slate-400`}
                    placeholder="Nhập nội dung bạn muốn gửi..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-[0.98]">
                  <Send className="w-5 h-5" />
                  Gửi tin nhắn ngay
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Map Section */}
        <div className="mt-16 pb-16 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-xl border border-slate-100 dark:border-slate-800">
            <div className="h-96 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124316.59104033095!2d107.91572528773952!3d13.985959124434255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316c1f83bb516b0b%3A0x67db236683dc1ea2!2sPleiku%2C%20Gia%20Lai%2C%20Vietnam!5e0!3m2!1sen!2s!4v1701234567890!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
