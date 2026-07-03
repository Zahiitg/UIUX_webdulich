import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useTravelStore from '../store/useTravelStore';

export default function ProtectedRoute({ children }) {
  const user = useTravelStore((state) => state.user);
  const isAuthLoading = useTravelStore((state) => state.isAuthLoading);
  const location = useLocation();

  if (isAuthLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-dark-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    // Chuyển hướng về auth và lưu lại đường dẫn định truy cập
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}
