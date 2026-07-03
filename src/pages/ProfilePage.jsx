import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, User, Map, Heart, ShieldCheck, Bell, Shield, Moon, 
  Globe, Lock, CreditCard, MapPin, Activity, Search, Bot, Download, Trash2, ChevronRight 
} from 'lucide-react';
import useTravelStore from '../store/useTravelStore';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function ProfilePage() {
  const { i18n } = useTranslation();
  const user = useTravelStore((state) => state.user);
  const theme = useTravelStore((state) => state.theme);
  const toggleTheme = useTravelStore((state) => state.toggleTheme);
  const logoutStore = useTravelStore((state) => state.logout);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('personal');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logoutStore();
      navigate('/onboarding');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  if (!user) return null;

  return (
    <>
      <SEO title={t('profile.pageTitle')} description={t('profile.pageDesc')} />
      <div className="min-h-screen bg-dark-50 dark:bg-slate-900 pt-28 pb-16 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-8">
          {t('profile.title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-dark-200 dark:border-slate-700">
              <div className="flex flex-col items-center text-center pb-6 border-b border-dark-200 dark:border-slate-700">
                <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-slate-700 flex items-center justify-center text-primary-600 dark:text-primary-400 text-3xl font-bold mb-4 overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                  ) : (
                    user.displayName?.charAt(0)?.toUpperCase() || <User className="w-10 h-10" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-dark-900 dark:text-white">{user.displayName || t('profile.defaultUser')}</h2>
                <p className="text-dark-500 dark:text-slate-400 text-sm mt-1">{user.email}</p>
              </div>

              <div className="pt-6 space-y-2">
                <button 
                  onClick={() => setActiveTab('personal')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeTab === 'personal' 
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                      : 'hover:bg-dark-50 dark:hover:bg-slate-700 text-dark-700 dark:text-slate-300'
                  }`}
                >
                  <User className="w-5 h-5" />
                  {t('profile.personalInfo')}
                </button>
                <button onClick={() => navigate('/my-bookings', { state: { from: '/profile' } })} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-50 dark:hover:bg-slate-700 text-dark-700 dark:text-slate-300 font-medium transition-colors">
                  <Map className="w-5 h-5" />
                  {t('profile.bookingHistory')}
                </button>
                <button onClick={() => navigate('/wishlist', { state: { from: '/profile' } })} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-50 dark:hover:bg-slate-700 text-dark-700 dark:text-slate-300 font-medium transition-colors">
                  <Heart className="w-5 h-5 text-red-500" />
                  {t('profile.wishlist')}
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                      : 'hover:bg-dark-50 dark:hover:bg-slate-700 text-dark-700 dark:text-slate-300'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                  {t('profile.settingsPrivacy')}
                </button>
              </div>

              <div className="pt-6 mt-6 border-t border-dark-200 dark:border-slate-700">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  {t('profile.logout')}
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-2 space-y-8 animate-fade-in-up">
            {activeTab === 'personal' ? (
              <>
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-dark-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-6">{t('profile.personalInfo')}</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-dark-500 dark:text-slate-400 mb-2">{t('profile.fullName')}</label>
                        <div className="text-dark-900 dark:text-white font-medium px-4 py-3 bg-dark-50 dark:bg-slate-900 rounded-xl border border-dark-200 dark:border-slate-700">
                          {user.displayName || t('profile.notUpdated')}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-500 dark:text-slate-400 mb-2">{t('profile.email')}</label>
                        <div className="text-dark-900 dark:text-white font-medium px-4 py-3 bg-dark-50 dark:bg-slate-900 rounded-xl border border-dark-200 dark:border-slate-700">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-dark-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white">{t('profile.recentTrips')}</h3>
                    <button onClick={() => navigate('/my-bookings', { state: { from: '/profile' } })} className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">{t('profile.viewAll')}</button>
                  </div>
                  
                  <div className="text-center py-12 px-4 border-2 border-dashed border-dark-200 dark:border-slate-700 rounded-2xl">
                    <div className="w-16 h-16 mx-auto mb-4 bg-dark-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-dark-400 dark:text-slate-500">
                      <Map className="w-8 h-8" />
                    </div>
                    <h4 className="text-dark-900 dark:text-white font-medium mb-2">{t('profile.noTripsTitle')}</h4>
                    <p className="text-dark-500 dark:text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                      {t('profile.noTripsDesc')}
                    </p>
                    <button 
                      onClick={() => navigate('/tours')}
                      className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
                    >
                      {t('profile.exploreTours')}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-dark-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-6">{t('profile.settingsPrivacy')}</h3>
                
                <div className="space-y-8">
                  {/* Nhóm 1: Cài đặt chung */}
                  <div>
                    <h4 className="text-sm font-bold text-dark-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t('profile.generalSettings')}</h4>
                    <div className="space-y-3">
                      {/* Giao diện Tối */}
                      <div className="flex items-center justify-between p-4 bg-dark-50 dark:bg-slate-900 rounded-2xl border border-dark-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-900/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
                            <Moon className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-medium text-dark-900 dark:text-white">{t('profile.darkMode')}</h5>
                            <p className="text-sm text-dark-500 dark:text-slate-400">{t('profile.darkModeDesc')}</p>
                          </div>
                        </div>
                        <button 
                          onClick={toggleTheme}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-primary-600' : 'bg-dark-300'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>

                      {/* Ngôn ngữ */}
                      <div className="flex items-center justify-between p-4 bg-dark-50 dark:bg-slate-900 rounded-2xl border border-dark-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-900/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
                            <Globe className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-medium text-dark-900 dark:text-white">{t('profile.language')}</h5>
                            <p className="text-sm text-dark-500 dark:text-slate-400">{t('profile.languageDesc')}</p>
                          </div>
                        </div>
                        <div className="flex bg-dark-100 dark:bg-slate-800 rounded-lg p-1">
                          <button
                            onClick={() => i18n.changeLanguage('vi')}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                              i18n.language === 'vi' 
                                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                                : 'text-dark-500 dark:text-slate-400 hover:text-dark-900 dark:hover:text-white'
                            }`}
                          >
                            VI
                          </button>
                          <button
                            onClick={() => i18n.changeLanguage('en')}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                              i18n.language === 'en' 
                                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                                : 'text-dark-500 dark:text-slate-400 hover:text-dark-900 dark:hover:text-white'
                            }`}
                          >
                            EN
                          </button>
                        </div>
                      </div>

                      {/* Thông báo Email */}
                      <div className="flex items-center justify-between p-4 bg-dark-50 dark:bg-slate-900 rounded-2xl border border-dark-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-900/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <Bell className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-medium text-dark-900 dark:text-white">{t('profile.emailNotifications')}</h5>
                            <p className="text-sm text-dark-500 dark:text-slate-400">{t('profile.emailNotificationsDesc')}</p>
                          </div>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Nhóm 2: Bảo mật & Quyền riêng tư */}
                  <div>
                    <h4 className="text-sm font-bold text-dark-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t('profile.securityPrivacy')}</h4>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 bg-dark-50 dark:bg-slate-900 rounded-2xl border border-dark-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-900/50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                            <Lock className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h5 className="font-medium text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{t('profile.changePassword')}</h5>
                            <p className="text-sm text-dark-500 dark:text-slate-400">{t('profile.changePasswordDesc')}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-dark-400 dark:text-slate-500" />
                      </button>

                      <button className="w-full flex items-center justify-between p-4 bg-dark-50 dark:bg-slate-900 rounded-2xl border border-dark-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-900/50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h5 className="font-medium text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{t('profile.paymentManagement')}</h5>
                            <p className="text-sm text-dark-500 dark:text-slate-400">{t('profile.paymentManagementDesc')}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-dark-400 dark:text-slate-500" />
                      </button>

                      <div className="flex items-center justify-between p-4 bg-dark-50 dark:bg-slate-900 rounded-2xl border border-dark-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-900/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-medium text-dark-900 dark:text-white">{t('profile.locationServices')}</h5>
                            <p className="text-sm text-dark-500 dark:text-slate-400">{t('profile.locationServicesDesc')}</p>
                          </div>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Nhóm 3: Nhật ký hoạt động */}
                  <div>
                    <h4 className="text-sm font-bold text-dark-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t('profile.activityLog')}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button className="flex items-center gap-4 p-4 bg-dark-50 dark:bg-slate-900 rounded-2xl border border-dark-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-900/50 transition-colors group text-left">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Search className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="font-medium text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{t('profile.searchHistory')}</h5>
                          <p className="text-xs text-dark-500 dark:text-slate-400 mt-0.5">{t('profile.searchHistoryDesc')}</p>
                        </div>
                      </button>

                      <button className="flex items-center gap-4 p-4 bg-dark-50 dark:bg-slate-900 rounded-2xl border border-dark-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-900/50 transition-colors group text-left">
                        <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="font-medium text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{t('profile.aiItineraries')}</h5>
                          <p className="text-xs text-dark-500 dark:text-slate-400 mt-0.5">{t('profile.aiItinerariesDesc')}</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Nhóm 4: Quản lý dữ liệu */}
                  <div>
                    <h4 className="text-sm font-bold text-dark-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t('profile.dataManagement')}</h4>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 bg-dark-50 dark:bg-slate-900 rounded-2xl border border-dark-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-900/50 transition-colors group text-left">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                            <Download className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-medium text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{t('profile.downloadData')}</h5>
                            <p className="text-sm text-dark-500 dark:text-slate-400">{t('profile.downloadDataDesc')}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-dark-400 dark:text-slate-500" />
                      </button>

                      <button className="w-full flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-left group">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-red-500 dark:text-red-400 shadow-sm border border-red-100 dark:border-slate-700">
                          <Trash2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="font-medium text-red-600 dark:text-red-400">{t('profile.deleteAccount')}</h5>
                          <p className="text-sm text-red-500/80 dark:text-red-400/80">{t('profile.deleteAccountDesc')}</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
