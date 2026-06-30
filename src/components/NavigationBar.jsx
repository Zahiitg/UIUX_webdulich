import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Globe } from 'lucide-react';
import useTravelStore from '../store/useTravelStore';
import { useTranslation } from 'react-i18next';

const navLinks = [
  { to: '/onboarding', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/tours', label: 'Tours' },
  { to: '/promotions', label: 'Promotion Tours' },
  { to: '/contact', label: 'Contact' },
];

export default function NavigationBar() {
  const theme = useTravelStore((state) => state.theme);
  const toggleTheme = useTravelStore((state) => state.toggleTheme);
  const user = useTravelStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language?.startsWith('en') ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800 transition-colors duration-300 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <Link to="/onboarding" className="flex-shrink-0 flex items-center gap-2 no-underline">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <span className="text-xl">🌿</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent leading-tight">
                GiaLai
              </span>
              <span className="text-[10px] text-dark-500 dark:text-slate-400 font-medium leading-tight">
                The sunny side of life
              </span>
            </div>
          </Link>

          {/* Search Bar Section - Desktop */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8">
            <div className="flex w-full max-w-md items-center bg-gray-50 dark:bg-slate-800 rounded-full border border-gray-200 dark:border-slate-700 overflow-hidden focus-within:ring-2 focus-within:ring-primary-500/50 transition-all">
              <span className="pl-4 text-gray-400 dark:text-slate-500">🔍</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('common.search') + "..."} 
                className="w-full bg-transparent px-3 py-2 text-sm text-dark-900 dark:text-white focus:outline-none placeholder-gray-400 dark:placeholder-slate-500"
              />
              <button 
                onClick={handleSearch}
                className="px-5 py-2 bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                {t('common.search')}
              </button>
            </div>
          </div>

          {/* Navigation Links Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {[
              { to: '/onboarding', label: t('nav.home') },
              { to: '/about', label: t('nav.about') },
              { to: '/places', label: t('nav.places') },
              { to: '/tours', label: t('nav.tours') },
              { to: '/promotions', label: t('nav.promotions') },
              { to: '/contact', label: t('nav.contact') },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(link.to)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-dark-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="block h-0.5 mt-0.5 bg-primary-500 rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-2 ml-6 lg:ml-8">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex flex-shrink-0 items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-transparent dark:border-slate-700 text-sm font-bold text-primary-600 dark:text-primary-400"
              title="Change Language"
            >
              {i18n.language?.startsWith('en') ? 'VI' : 'EN'}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex flex-shrink-0 items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-transparent dark:border-slate-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Auth Button / Avatar Dropdown */}
            {user ? (
              <div className="relative group z-[60]">
                <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full bg-primary-100 dark:bg-slate-700 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold overflow-hidden border-2 border-transparent hover:border-primary-500 transition-all">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                  ) : (
                    user.displayName?.charAt(0)?.toUpperCase() || 'U'
                  )}
                </button>
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-dark-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm text-dark-900 dark:text-white font-medium border-b border-dark-100 dark:border-slate-700 mb-2 truncate">
                      {user.displayName || user.email}
                    </div>
                    <button onClick={() => navigate('/profile')} className="w-full text-left px-3 py-2 text-sm text-dark-700 dark:text-slate-300 hover:bg-dark-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      Hồ sơ của tôi
                    </button>
                    <button onClick={() => navigate('/my-bookings')} className="w-full text-left px-3 py-2 text-sm text-dark-700 dark:text-slate-300 hover:bg-dark-50 dark:hover:bg-slate-700 rounded-lg transition-colors mt-1">
                      Lịch sử đặt Tour
                    </button>
                    <button onClick={() => navigate('/wishlist')} className="w-full text-left px-3 py-2 text-sm text-dark-700 dark:text-slate-300 hover:bg-dark-50 dark:hover:bg-slate-700 rounded-lg transition-colors mt-1">
                      Danh sách yêu thích
                    </button>
                    <button onClick={() => {
                      import('firebase/auth').then(({ signOut }) => {
                        import('../config/firebase').then(m => {
                          signOut(m.auth);
                          useTravelStore.getState().logout();
                          navigate('/onboarding');
                        });
                      });
                    }} className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-1">
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="hidden md:flex items-center justify-center h-10 px-4 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-full transition-colors whitespace-nowrap"
              >
                {t('nav.login')}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex flex-shrink-0 items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-transparent dark:border-slate-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-slate-800 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {/* Mobile Search */}
            <div className="md:hidden flex items-center bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden mb-3">
              <span className="pl-3 text-gray-400">🔍</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('common.search') + "..."} 
                className="w-full bg-transparent px-3 py-2.5 text-sm text-dark-900 dark:text-white focus:outline-none placeholder-gray-400 dark:placeholder-slate-500"
              />
              <button 
                onClick={handleSearch}
                className="px-4 py-2.5 bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                🔍
              </button>
            </div>

            {/* Mobile Nav Links */}
            {[
              { to: '/onboarding', label: t('nav.home') },
              { to: '/about', label: t('nav.about') },
              { to: '/places', label: t('nav.places') },
              { to: '/tours', label: t('nav.tours') },
              { to: '/promotions', label: t('nav.promotions') },
              { to: '/contact', label: t('nav.contact') },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border-l-4 border-primary-500'
                    : 'text-dark-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
