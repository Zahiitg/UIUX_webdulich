import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-dark-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-full animate-ping opacity-75"></div>
          <div className="relative w-full h-full bg-white dark:bg-slate-800 rounded-full shadow-xl flex items-center justify-center border border-dark-100 dark:border-slate-700">
            <Compass className="w-16 h-16 text-primary-500 animate-[spin_3s_linear_infinite]" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-6xl md:text-8xl font-black text-dark-900 dark:text-white mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-dark-800 dark:text-slate-200 mb-4">
          Ôi không! Bạn đi lạc rồi
        </h2>
        <p className="text-dark-500 dark:text-slate-400 max-w-md mx-auto mb-10">
          Địa điểm bạn đang tìm kiếm có thể đã bị đổi tên, xóa đi hoặc hiện tại không có sẵn. Đừng lo, hãy để chúng tôi dẫn bạn về lại.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/onboarding"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-primary-500/25 hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            Về Trang Chủ
          </Link>
          <Link 
            to="/search"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-dark-50 dark:hover:bg-slate-700 text-dark-700 dark:text-slate-300 font-medium rounded-xl border border-dark-200 dark:border-slate-700 transition-all hover:-translate-y-0.5"
          >
            <Search className="w-5 h-5" />
            Tìm Kiếm Lại
          </Link>
        </div>
      </div>
    </div>
  );
}
