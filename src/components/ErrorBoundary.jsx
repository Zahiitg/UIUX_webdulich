import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

class ErrorBoundaryInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { t } = this.props;
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100 dark:border-slate-700 animate-fade-in-up">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10" />
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {t('common.errorTitle')}
            </h1>
            
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
              {t('common.errorDesc')}
            </p>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:-translate-y-0.5"
            >
              <RotateCcw className="w-5 h-5" />
              {t('common.reloadPage')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default function ErrorBoundary(props) {
  const { t } = useTranslation();
  return <ErrorBoundaryInner t={t} {...props} />;
}
