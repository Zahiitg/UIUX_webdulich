import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Camera, MessageCircle, MapPin, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const location = useLocation();
  const { t } = useTranslation();
  
  // Các trang không muốn hiển thị footer
  const hiddenRoutes = ['/itinerary', '/chatbot', '/onboarding'];
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-dark-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <span className="text-xl">🌿</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent leading-tight">
                  GiaLai
                </span>
                <span className="text-[10px] text-dark-500 dark:text-slate-400 font-medium leading-tight">
                  The sunny side of life
                </span>
              </div>
            </Link>
            <p className="text-dark-500 dark:text-slate-400 text-sm leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-dark-50 dark:bg-slate-800 flex items-center justify-center text-dark-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-50 dark:bg-slate-800 flex items-center justify-center text-dark-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-50 dark:bg-slate-800 flex items-center justify-center text-dark-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/places" className="text-dark-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('nav.places')}
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-dark-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('nav.tours')}
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-dark-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('nav.promotions')}
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-dark-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('common.search')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-dark-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-dark-500 dark:text-slate-400">
                <MapPin className="w-5 h-5 flex-shrink-0 text-primary-500 mt-0.5" />
                <span>123 Trường Chinh, Pleiku, Gia Lai</span>
              </li>
              <li className="flex items-center gap-3 text-dark-500 dark:text-slate-400">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary-500" />
                <span>0987 654 321</span>
              </li>
              <li className="flex items-center gap-3 text-dark-500 dark:text-slate-400">
                <Mail className="w-5 h-5 flex-shrink-0 text-primary-500" />
                <span>hello@gialaitravel.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-6">Bản Tin</h3>
            <p className="text-dark-500 dark:text-slate-400 text-sm mb-4">
              Đăng ký để nhận thông báo về các tour khuyến mãi mới nhất.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="w-full px-4 py-3 bg-dark-50 dark:bg-slate-800 border border-dark-200 dark:border-slate-700 rounded-xl text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button 
                type="submit"
                className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-dark-500 dark:text-slate-500">
            © {new Date().getFullYear()} GiaLai Travel Guide. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-dark-500 dark:text-slate-500">
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
