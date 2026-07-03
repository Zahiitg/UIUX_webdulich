import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle, Calendar, Bot, CreditCard, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTravelStore from '../store/useTravelStore';

const ICON_MAP = {
  booking: { icon: Calendar, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  payment: { icon: CreditCard, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  ai: { icon: Bot, color: 'text-violet-500 bg-violet-50 dark:bg-violet-900/20' },
  place: { icon: MapPin, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  system: { icon: CheckCircle, color: 'text-primary-500 bg-primary-50 dark:bg-primary-900/20' },
};

const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    type: 'ai',
    title: 'AI đã tạo xong lịch trình',
    message: 'Lịch trình 3 ngày 2 đêm khám phá Gia Lai đã sẵn sàng cho bạn.',
    time: '5 phút trước',
    read: false,
    link: '/itinerary',
  },
  {
    id: 2,
    type: 'booking',
    title: 'Xác nhận đặt tour thành công',
    message: 'Tour Trekking Vườn Quốc Gia Kon Ka Kinh đã được đặt thành công.',
    time: '2 giờ trước',
    read: false,
    link: '/my-bookings',
  },
  {
    id: 3,
    type: 'payment',
    title: 'Thanh toán thành công',
    message: 'Bạn đã thanh toán 5.166.000đ qua VNPay.',
    time: '2 giờ trước',
    read: true,
    link: '/my-bookings',
  },
  {
    id: 4,
    type: 'place',
    title: 'Điểm đến mới: Kỳ Co - Quy Nhơn',
    message: 'Khám phá bãi biển hoang sơ đẹp nhất miền Trung, vừa được thêm vào hệ thống.',
    time: '1 ngày trước',
    read: true,
    link: '/places',
  },
  {
    id: 5,
    type: 'system',
    title: 'Chào mừng bạn đến GiaLai Guide!',
    message: 'Hãy bắt đầu bằng việc khảo sát sở thích để nhận gợi ý tour phù hợp.',
    time: '3 ngày trước',
    read: true,
    link: '/survey',
  },
];

export default function NotificationDropdown() {
  const navigate = useNavigate();
  const user = useTravelStore((state) => state.user);
  const notificationsStore = useTravelStore((state) => state.notifications);
  const setNotifications = useTravelStore((state) => state.setNotifications);
  
  // Initialize with sample data if empty (for demo purposes)
  useEffect(() => {
    if (notificationsStore.length === 0) {
      setNotifications(SAMPLE_NOTIFICATIONS);
    }
  }, []);

  const notifications = notificationsStore.length > 0 ? notificationsStore : SAMPLE_NOTIFICATIONS;

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const removeNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleClick = (notification) => {
    markRead(notification.id);
    setOpen(false);
    if (notification.link) {
      navigate(notification.link);
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex flex-shrink-0 items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-transparent dark:border-slate-700"
        aria-label="Thông báo"
      >
        <Bell className="w-[18px] h-[18px] text-dark-600 dark:text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-bounce-in">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-dark-100 dark:border-slate-700 z-[60] animate-fade-in-down overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-dark-100 dark:border-slate-700">
            <h3 className="font-bold text-dark-900 dark:text-white text-sm">Thông báo</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-primary-600 dark:text-primary-400 font-medium hover:underline"
              >
                Đánh dấu đã đọc
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[400px] overflow-y-auto divide-y divide-dark-50 dark:divide-slate-700/50">
            {notifications.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <Bell className="w-8 h-8 text-dark-200 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-dark-400 dark:text-slate-500">Chưa có thông báo nào</p>
              </div>
            ) : (
              notifications.map((n) => {
                const iconConfig = ICON_MAP[n.type] || ICON_MAP.system;
                const IconComponent = iconConfig.icon;

                return (
                  <div
                    key={n.id}
                    onClick={() => handleClick(n)}
                    className={`flex items-start gap-3 px-5 py-3.5 cursor-pointer hover:bg-dark-50 dark:hover:bg-slate-700/50 transition-colors group relative ${
                      !n.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                    }`}
                  >
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${iconConfig.color}`}>
                      <IconComponent className="w-[18px] h-[18px]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-semibold truncate ${!n.read ? 'text-dark-900 dark:text-white' : 'text-dark-700 dark:text-slate-300'}`}>
                          {n.title}
                        </p>
                        {!n.read && (
                          <span className="w-2 h-2 bg-primary-500 rounded-full shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-dark-500 dark:text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                      <p className="text-[11px] text-dark-400 dark:text-slate-500 mt-1">{n.time}</p>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={(e) => removeNotification(n.id, e)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full hover:bg-dark-100 dark:hover:bg-slate-600 flex items-center justify-center shrink-0 mt-1"
                    >
                      <X className="w-3.5 h-3.5 text-dark-400 dark:text-slate-500" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-5 py-3 border-t border-dark-100 dark:border-slate-700 text-center">
              <button
                onClick={() => { setOpen(false); }}
                className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                Xem tất cả thông báo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
