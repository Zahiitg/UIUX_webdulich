import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import useTravelStore from './store/useTravelStore';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTopButton from './components/ScrollToTopButton';
import CompareFloatingBar from './components/CompareFloatingBar';
import CompareModal from './components/CompareModal';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Lazy load pages for performance
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));
const SurveyPage = lazy(() => import('./pages/SurveyPage'));
const TripInfoPage = lazy(() => import('./pages/TripInfoPage'));
const ItineraryPage = lazy(() => import('./pages/ItineraryPage'));
const ChatbotPage = lazy(() => import('./pages/ChatbotPage'));
const PlaceDetailPage = lazy(() => import('./pages/PlaceDetailPage'));
const TourDetailPage = lazy(() => import('./pages/TourDetailPage'));
const PlacesPage = lazy(() => import('./pages/PlacesPage'));
const ToursPage = lazy(() => import('./pages/ToursPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const PromotionPage = lazy(() => import('./pages/PromotionPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage'));
const MyBookingsPage = lazy(() => import('./pages/MyBookingsPage'));

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
  const setUser = useTravelStore((state) => state.setUser);

  // Restore user session on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <HelmetProvider>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          className: 'dark:bg-slate-800 dark:text-white',
          duration: 3000,
        }}
      />
      <NavigationBar />
      <ScrollToTopButton />
      <CompareFloatingBar />
      <CompareModal />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          
          {/* Main App Routes */}
          <Route path="/trip-info" element={<TripInfoPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/place-detail/:id" element={<PlaceDetailPage />} />
          <Route path="/tour-detail/:id" element={<TourDetailPage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/promotions" element={<PromotionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/booking-confirmation/:code" element={<BookingConfirmationPage />} />
          
          {/* Protected Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
      </HelmetProvider>
    </Router>
  );
}

export default App;
