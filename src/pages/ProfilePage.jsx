import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Map, Heart, Settings, Bell, Shield, Moon } from 'lucide-react';
import useTravelStore from '../store/useTravelStore';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

export default function ProfilePage() {
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
    <div className="min-h-screen bg-dark-50 dark:bg-slate-900 pt-28 pb-16 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-8">
          Hồ sơ của tôi
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
                <h2 className="text-xl font-bold text-dark-900 dark:text-white">{user.displayName || 'Người dùng'}</h2>
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
                  Thông tin cá nhân
                </button>
                <button onClick={() => navigate('/my-bookings')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-50 dark:hover:bg-slate-700 text-dark-700 dark:text-slate-300 font-medium transition-colors">
                  <Map className="w-5 h-5" />
                  Lịch sử đặt Tour
                </button>
                <button onClick={() => navigate('/wishlist')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-50 dark:hover:bg-slate-700 text-dark-700 dark:text-slate-300 font-medium transition-colors">
                  <Heart className="w-5 h-5 text-red-500" />
                  Tour yêu thích
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                      : 'hover:bg-dark-50 dark:hover:bg-slate-700 text-dark-700 dark:text-slate-300'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Cài đặt tài khoản
                </button>
              </div>

              <div className="pt-6 mt-6 border-t border-dark-200 dark:border-slate-700">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-2 space-y-8 animate-fade-in-up">
            {activeTab === 'personal' ? (
              <>
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-dark-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-6">Thông tin cá nhân</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-dark-500 dark:text-slate-400 mb-2">Họ và tên</label>
                        <div className="text-dark-900 dark:text-white font-medium px-4 py-3 bg-dark-50 dark:bg-slate-900 rounded-xl border border-dark-200 dark:border-slate-700">
                          {user.displayName || 'Chưa cập nhật'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-500 dark:text-slate-400 mb-2">Email</label>
                        <div className="text-dark-900 dark:text-white font-medium px-4 py-3 bg-dark-50 dark:bg-slate-900 rounded-xl border border-dark-200 dark:border-slate-700">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-dark-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white">Chuyến đi gần đây</h3>
                    <button onClick={() => navigate('/my-bookings')} className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">Xem tất cả</button>
                  </div>
                  
                  <div className="text-center py-12 px-4 border-2 border-dashed border-dark-200 dark:border-slate-700 rounded-2xl">
                    <div className="w-16 h-16 mx-auto mb-4 bg-dark-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-dark-400 dark:text-slate-500">
                      <Map className="w-8 h-8" />
                    </div>
                    <h4 className="text-dark-900 dark:text-white font-medium mb-2">Chưa có chuyến đi nào</h4>
                    <p className="text-dark-500 dark:text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                      Bạn chưa đặt tour nào. Khám phá các tour hấp dẫn của GiaLai Travel Guide ngay!
                    </p>
                    <button 
                      onClick={() => navigate('/tours')}
                      className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
                    >
                      Khám phá Tour
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-dark-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-6">Cài đặt tài khoản</h3>
                
                <div className="space-y-6">
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between p-4 bg-dark-50 dark:bg-slate-900 rounded-2xl border border-dark-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <Moon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-dark-900 dark:text-white">Giao diện Tối</h4>
                        <p className="text-sm text-dark-500 dark:text-slate-400">Thay đổi chủ đề màu sắc của ứng dụng</p>
                      </div>
                    </div>
                    <button 
                      onClick={toggleTheme}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-primary-600' : 'bg-dark-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between p-4 bg-dark-50 dark:bg-slate-900 rounded-2xl border border-dark-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-dark-900 dark:text-white">Thông báo Email</h4>
                        <p className="text-sm text-dark-500 dark:text-slate-400">Nhận thông báo về khuyến mãi và tour mới</p>
                      </div>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>

                  {/* Security */}
                  <div className="flex items-center justify-between p-4 bg-dark-50 dark:bg-slate-900 rounded-2xl border border-dark-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-dark-900 dark:text-white">Bảo mật tài khoản</h4>
                        <p className="text-sm text-dark-500 dark:text-slate-400">Đổi mật khẩu hoặc liên kết tài khoản mạng xã hội</p>
                      </div>
                    </div>
                    <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
                      Cập nhật
                    </button>
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
