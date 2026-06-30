import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  vi: {
    translation: {
      "nav": {
        "home": "Trang chủ",
        "tours": "Tours",
        "places": "Địa điểm",
        "promotions": "Khuyến mãi",
        "about": "Về chúng tôi",
        "contact": "Liên hệ",
        "login": "Đăng nhập",
        "profile": "Hồ sơ"
      },
      "footer": {
        "desc": "Nền tảng du lịch thông minh, mang đến trải nghiệm khám phá Gia Lai tuyệt vời nhất với sự hỗ trợ của AI.",
        "quickLinks": "Liên kết nhanh",
        "contact": "Liên hệ"
      },
      "common": {
        "search": "Tìm kiếm",
        "viewDetails": "Xem chi tiết",
        "bookNow": "Đặt ngay",
        "free": "Miễn phí"
      }
    }
  },
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "tours": "Tours",
        "places": "Places",
        "promotions": "Promotions",
        "about": "About Us",
        "contact": "Contact",
        "login": "Login",
        "profile": "Profile"
      },
      "footer": {
        "desc": "Smart travel platform, bringing the best Gia Lai exploration experience with the support of AI.",
        "quickLinks": "Quick Links",
        "contact": "Contact"
      },
      "common": {
        "search": "Search",
        "viewDetails": "View Details",
        "bookNow": "Book Now",
        "free": "Free"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
