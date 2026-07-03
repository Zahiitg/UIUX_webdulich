import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Globe, Eye, EyeOff } from 'lucide-react';
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import useTravelStore from '../store/useTravelStore';
import { useTranslation } from 'react-i18next';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useTravelStore((state) => state.setUser);
  const { t } = useTranslation();
  
  const from = location.state?.from?.pathname || "/profile";

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update display name for new user
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
      
      const user = userCredential.user;
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || name,
        photoURL: user.photoURL
      });
      
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        setError(t('auth.invalidCredential'));
      } else if (err.code === 'auth/email-already-in-use') {
        setError(t('auth.emailInUse'));
      } else if (err.code === 'auth/weak-password') {
        setError(t('auth.weakPassword'));
      } else {
        setError(`${t('auth.errorPrefix')} ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });
      
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(`${t('auth.googleError')} ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(t('auth.resetEmailSent'));
      setTimeout(() => setIsForgotPassword(false), 5000);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email') {
        setError(t('auth.userNotFound'));
      } else {
        setError(`${t('auth.errorPrefix')} ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-slate-900 pt-24 pb-12 px-4 flex items-center justify-center transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-primary-50 dark:bg-slate-700/50 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-primary-500/30 mb-4">
            <span className="text-3xl">🌿</span>
          </div>
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
            {isForgotPassword ? t('auth.resetPasswordTitle') : isLogin ? t('auth.loginTitle') : t('auth.registerTitle')}
          </h2>
          <p className="text-dark-500 dark:text-slate-400 text-sm">
            {isForgotPassword 
              ? t('auth.resetPasswordDesc')
              : isLogin 
                ? t('auth.loginDesc') 
                : t('auth.registerDesc')}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-xl">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400 text-sm rounded-xl">
              {message}
            </div>
          )}

          <form onSubmit={isForgotPassword ? handleForgotPassword : handleAuth} className="space-y-5">
            {!isLogin && !isForgotPassword && (
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-slate-300 mb-1">
                  {t('auth.fullName')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dark-400">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-dark-50 dark:bg-slate-900 border border-dark-200 dark:border-slate-700 rounded-xl text-dark-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                    placeholder={t('auth.fullNamePlaceholder')}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-slate-300 mb-1">
                {t('auth.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dark-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-dark-50 dark:bg-slate-900 border border-dark-200 dark:border-slate-700 rounded-xl text-dark-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  placeholder={t('auth.emailPlaceholder')}
                />
              </div>
            </div>

            {!isForgotPassword && (
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-slate-300 mb-1">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dark-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-12 py-3 bg-dark-50 dark:bg-slate-900 border border-dark-200 dark:border-slate-700 rounded-xl text-dark-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-dark-400 hover:text-primary-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {isLogin && (
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setError('');
                        setMessage('');
                      }}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >
                      {t('auth.forgotPassword')}
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isForgotPassword ? t('auth.sendResetEmail') : isLogin ? t('auth.login') : t('auth.register')}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {!isForgotPassword && (
            <>
              <div className="mt-6 flex items-center justify-between">
                <span className="w-1/5 border-b border-dark-200 dark:border-slate-700 lg:w-1/4"></span>
                <span className="text-xs text-center text-dark-400 dark:text-slate-400 uppercase">{t('auth.or')}</span>
                <span className="w-1/5 border-b border-dark-200 dark:border-slate-700 lg:w-1/4"></span>
              </div>

              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="mt-6 w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-slate-800 border border-dark-200 dark:border-slate-700 text-dark-700 dark:text-slate-300 font-medium rounded-xl hover:bg-dark-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Globe className="w-5 h-5" />
                {t('auth.continueWithGoogle')}
              </button>
            </>
          )}

          <div className="mt-8 text-center text-sm text-dark-600 dark:text-slate-400">
            {isForgotPassword ? (
              <button
                onClick={() => {
                  setIsForgotPassword(false);
                  setError('');
                  setMessage('');
                }}
                className="text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                {t('auth.backToLogin')}
              </button>
            ) : (
              <>
                {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                >
                  {isLogin ? t('auth.registerNow') : t('auth.login')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
