import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Calendar, Users, MapPin, CheckCircle, ArrowLeft, Search, QrCode, XCircle, RefreshCw } from 'lucide-react';
import useTravelStore from '../store/useTravelStore';
import toast from 'react-hot-toast';

export default function MyBookingsPage() {
  const bookings = useTravelStore((state) => state.bookings);
  const location = useLocation();
  
  const isFromProfile = location.state?.from === '/profile';
  const backUrl = isFromProfile ? '/profile' : '/';
  const backText = isFromProfile ? 'Quay lại Hồ sơ' : 'Về trang chủ';
  
  // State for Modal
  const [modalState, setModalState] = useState({ isOpen: false, type: '', bookingId: null });
  const [reason, setReason] = useState('');

  const handleOpenModal = (type, bookingId) => {
    setModalState({ isOpen: true, type, bookingId });
    setReason('');
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: '', bookingId: null });
  };

  const handleSubmitAction = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error('Vui lòng nhập lý do');
      return;
    }
    
    // Giả lập gửi yêu cầu
    toast.success(`Đã gửi yêu cầu ${modalState.type === 'cancel' ? 'hủy tour' : 'đổi ngày'} thành công. Chúng tôi sẽ liên hệ sớm!`);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <Link to={backUrl} className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline mb-4 font-medium">
              <ArrowLeft className="w-4 h-4" /> {backText}
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
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm hover:shadow-md border border-dark-100 dark:border-slate-800 overflow-hidden transition-all duration-300 flex flex-col md:flex-row"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
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
                <div className="w-full md:w-2/3 flex flex-col">
                  {/* Top info and QR */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col sm:flex-row gap-4 justify-between border-b border-dashed border-dark-200 dark:border-slate-700">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-xs text-dark-400 dark:text-slate-500 font-mono">Mã Đặt: <span className="font-bold text-primary-600 dark:text-primary-400">{booking.id}</span></p>
                        <p className="text-xs text-dark-400 dark:text-slate-500">Đặt ngày: {new Date(booking.createdAt).toLocaleDateString('vi-VN')}</p>
                      </div>
                      
                      <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3 line-clamp-2">
                        {booking.tourName}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-3 mb-2">
                        <div className="flex items-center gap-2 text-sm text-dark-600 dark:text-slate-300">
                          <Calendar className="w-4 h-4 text-primary-500" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-dark-600 dark:text-slate-300">
                          <Users className="w-4 h-4 text-primary-500" />
                          {booking.adults} NL, {booking.children} TE
                        </div>
                        <div className="flex items-center gap-2 text-sm text-dark-600 dark:text-slate-300 col-span-2">
                          <MapPin className="w-4 h-4 text-primary-500" />
                          Gia Lai - Quy Nhơn
                        </div>
                      </div>
                    </div>

                    {/* QR Code pseudo-ticket */}
                    <div className="hidden sm:flex flex-col items-center justify-center p-3 bg-dark-50 dark:bg-slate-800 rounded-xl border border-dark-100 dark:border-slate-700 min-w-[120px]">
                      <QrCode className="w-16 h-16 text-dark-800 dark:text-slate-200 mb-2" />
                      <span className="text-[10px] uppercase font-bold text-dark-500 dark:text-slate-400 tracking-wider">E-Ticket</span>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="p-4 bg-dark-50/50 dark:bg-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button 
                        onClick={() => handleOpenModal('reschedule', booking.id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" /> Đổi ngày
                      </button>
                      <button 
                        onClick={() => handleOpenModal('cancel', booking.id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 transition-colors"
                      >
                        <XCircle className="w-4 h-4" /> Hủy tour
                      </button>
                    </div>
                    
                    <div className="text-right w-full sm:w-auto">
                      <p className="text-xs text-dark-500 dark:text-slate-400 mb-0.5">Tổng tiền đã thanh toán</p>
                      <div className="font-black text-xl text-primary-600 dark:text-primary-400">
                        {booking.totalPrice.toLocaleString('vi-VN')}đ
                      </div>
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

      {/* Action Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-dark-400 hover:text-dark-800 dark:hover:text-white z-10 transition-colors">
              ✕
            </button>
            <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4">
              {modalState.type === 'cancel' ? 'Yêu cầu Hủy Tour' : 'Yêu cầu Đổi Ngày'}
            </h3>
            <p className="text-sm text-dark-600 dark:text-slate-300 mb-4">
              Mã booking: <span className="font-bold text-primary-600">{modalState.bookingId}</span>
            </p>
            <form onSubmit={handleSubmitAction}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 dark:text-slate-300">
                  {modalState.type === 'cancel' ? 'Lý do hủy tour *' : 'Lý do đổi ngày & Ngày muốn đổi *'}
                </label>
                <textarea 
                  required
                  rows="4"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Vui lòng nhập chi tiết yêu cầu của bạn..."
                  className="w-full bg-dark-50 dark:bg-slate-800 border border-dark-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                ></textarea>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={handleCloseModal} className="flex-1 py-3 rounded-xl bg-dark-100 hover:bg-dark-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-dark-700 dark:text-slate-300 font-semibold transition-colors">
                  Đóng
                </button>
                <button type="submit" className={`flex-1 py-3 rounded-xl font-semibold text-white transition-colors ${modalState.type === 'cancel' ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30' : 'bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/30'}`}>
                  Gửi yêu cầu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
