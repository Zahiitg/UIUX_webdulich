import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useTravelStore from '../store/useTravelStore';

export default function ProtectedRoute({ children }) {
  const user = useTravelStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    // Chuyển hướng về login và lưu lại đường dẫn định truy cập
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
