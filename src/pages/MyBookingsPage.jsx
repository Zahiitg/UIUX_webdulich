import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Users, MapPin, ArrowRight, CheckCircle, ArrowLeft, Search } from 'lucide-react';
import useTravelStore from '../store/useTravelStore';

export default function MyBookingsPage() {
  const bookings = useTravelStore((state) => state.bookings);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline mb-4 font-medium">
              <ArrowLeft className="w-4 h-4" /> Về trang chủ
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-dark-900 dark:text-white flex items-center gap-3">
              <Clock className="w-8 h-8 text-primary-500" />
              Lịch sử Đặt Tour
            </h1>
            <p className="text-dark-500 dark:text-slate-400 mt-2">
              Bạn có {bookings.length} tour đã đặt
            </p>
          </div>
          
          {bookings.length > 0 && (
            <Link to="/tours" className="btn-outline">
              <Search className="w-4 h-4 mr-2" />
              Tìm tour mới
            </Link>
          )}
        </div>

        {/* List */}
        {bookings.length > 0 ? (
          <div className="space-y-6 animate-fade-in-up">
            {bookings.map((booking, index) => (
              <div 
                key={booking.id} 
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm hover:shadow-md border border-dark-100 dark:border-slate-800 overflow-hidden transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                    <img 
                      src={booking.image} 
                      alt={booking.tourName} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <CheckCircle className="w-3 h-3" /> Đã thanh toán
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-2/3 p-5 md:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-xs text-dark-400 dark:text-slate-500 font-mono">Mã Đặt: {booking.id}</p>
                        <p className="text-xs text-dark-400 dark:text-slate-500">Đặt ngày: {new Date(booking.createdAt).toLocaleDateString('vi-VN')}</p>
                      </div>
                      
                      <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3 line-clamp-2">
                        {booking.tourName}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-dark-600 dark:text-slate-300">
                          <Calendar className="w-4 h-4 text-primary-500" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-dark-600 dark:text-slate-300">
                          <Users className="w-4 h-4 text-primary-500" />
                          {booking.adults} người lớn, {booking.children} trẻ em
                        </div>
                        <div className="flex items-center gap-2 text-sm text-dark-600 dark:text-slate-300 col-span-2">
                          <MapPin className="w-4 h-4 text-primary-500" />
                          Gia Lai
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-dark-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="font-black text-xl text-primary-600 dark:text-primary-400">
                        {booking.totalPrice.toLocaleString('vi-VN')}đ
                      </div>
                      <Link to={`/tour-detail/${booking.tourId}`} className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 inline-flex items-center gap-1">
                        Xem lại Tour <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-dark-100 dark:border-slate-800 animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-dark-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-12 h-12 text-dark-300 dark:text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-dark-800 dark:text-white mb-2">Chưa có lịch sử đặt tour</h3>
            <p className="text-dark-500 dark:text-slate-400 max-w-md mx-auto mb-8">
              Bạn chưa thực hiện bất kỳ chuyến đi nào cùng chúng tôi. Khám phá Gia Lai ngay hôm nay!
            </p>
            <Link to="/tours" className="btn-primary">
              Tìm Tour ngay
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
