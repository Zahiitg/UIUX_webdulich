import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Users, MapPin, ArrowRight, Download, Home } from 'lucide-react';
import useTravelStore from '../store/useTravelStore';

export default function BookingConfirmationPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const bookings = useTravelStore((state) => state.bookings);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const foundBooking = bookings.find(b => b.id === code);
    if (foundBooking) {
      setBooking(foundBooking);
    } else {
      // Nếu không tìm thấy, quay về trang chủ sau 3 giây
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [code, bookings, navigate]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-dark-500 dark:text-slate-400">Đang tải thông tin đơn đặt tour...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Header */}
        <div className="text-center mb-10 animate-fade-in-down">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-dark-900 dark:text-white mb-4">
            Đặt Tour Thành Công!
          </h1>
          <p className="text-dark-500 dark:text-slate-400 text-lg">
            Cảm ơn bạn đã tin tưởng. Chúng tôi đã gửi email xác nhận chi tiết đến bạn.
          </p>
        </div>

        {/* Booking Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-dark-100 dark:border-slate-800 animate-fade-in-up">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between border-b border-dark-100 dark:border-slate-800 pb-6 mb-6">
              <div>
                <p className="text-sm text-dark-500 dark:text-slate-400 font-medium mb-1">Mã Đặt Tour</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 tracking-wider">{booking.id}</p>
              </div>
              <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold inline-flex items-center gap-2 self-start md:self-auto">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Đã thanh toán
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="w-full md:w-1/3">
                <img 
                  src={booking.image} 
                  alt={booking.tourName} 
                  className="w-full h-48 md:h-full object-cover rounded-2xl shadow-md"
                />
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2 leading-tight">
                    {booking.tourName}
                  </h3>
                  <p className="flex items-center gap-2 text-dark-500 dark:text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" /> Khởi hành từ Gia Lai
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-dark-50 dark:bg-slate-800 p-3 rounded-xl">
                    <p className="text-xs text-dark-400 dark:text-slate-500 mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Ngày đi</p>
                    <p className="font-semibold text-dark-800 dark:text-slate-200">{booking.date}</p>
                  </div>
                  <div className="bg-dark-50 dark:bg-slate-800 p-3 rounded-xl">
                    <p className="text-xs text-dark-400 dark:text-slate-500 mb-1 flex items-center gap-1"><Users className="w-3 h-3"/> Số lượng</p>
                    <p className="font-semibold text-dark-800 dark:text-slate-200">{booking.adults} Lớn, {booking.children} Nhỏ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-dark-50 dark:bg-slate-800 rounded-2xl p-5 mb-8">
              <h4 className="font-bold text-dark-900 dark:text-white mb-4">Thông tin liên hệ</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-dark-500 dark:text-slate-400 mb-1">Họ và tên</p>
                  <p className="font-semibold text-dark-800 dark:text-slate-200">{booking.name}</p>
                </div>
                <div>
                  <p className="text-dark-500 dark:text-slate-400 mb-1">Số điện thoại</p>
                  <p className="font-semibold text-dark-800 dark:text-slate-200">{booking.phone}</p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-end justify-between border-t border-dark-100 dark:border-slate-800 pt-6">
              <span className="text-lg font-medium text-dark-600 dark:text-slate-300">Tổng thanh toán</span>
              <span className="text-3xl font-black text-primary-600 dark:text-primary-400">
                {booking.totalPrice.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="bg-dark-50 dark:bg-slate-800/50 p-6 flex flex-col sm:flex-row gap-4 justify-center border-t border-dark-100 dark:border-slate-800">
            <button className="btn-outline flex-1 md:flex-none justify-center">
              <Download className="w-5 h-5 mr-2" /> Tải hóa đơn
            </button>
            <Link to="/my-bookings" className="btn-primary flex-1 md:flex-none justify-center">
              Lịch sử đặt Tour <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 font-medium transition-colors">
            <Home className="w-5 h-5" /> Về trang chủ
          </Link>
        </div>

      </div>
    </div>
  );
}
