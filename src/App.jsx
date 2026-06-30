import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import useTravelStore from './store/useTravelStore';
import NavigationBar from './components/NavigationBar';

// Lazy load pages for performance
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));
const SurveyPage = lazy(() => import('./pages/SurveyPage'));
const TripInfoPage = lazy(() => import('./pages/TripInfoPage'));
const ItineraryPage = lazy(() => import('./pages/ItineraryPage'));
const ChatbotPage = lazy(() => import('./pages/ChatbotPage'));
const PlaceDetailPage = lazy(() => import('./pages/PlaceDetailPage'));
const TourDetailPage = lazy(() => import('./pages/TourDetailPage'));
const ToursPage = lazy(() => import('./pages/ToursPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const PromotionPage = lazy(() => import('./pages/PromotionPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Loading fallback
function PageLoader() {
  return (
    <div className="page-container flex items-center justify-center h-screen bg-dark-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 animate-pulse-soft">
          <span className="text-3xl">🌿</span>
        </div>
        <p className="text-dark-500 dark:text-slate-400 text-sm font-medium">Đang tải...</p>
      </div>
    </div>
  );
}



function App() {
  return (
    <Router>
      <NavigationBar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/trip-info" element={<TripInfoPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/place-detail/:id" element={<PlaceDetailPage />} />
          <Route path="/tour-detail/:id" element={<TourDetailPage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/promotions" element={<PromotionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
