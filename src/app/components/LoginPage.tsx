import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
  onLogin: (email: string, password: string) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { t, isRTL } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      // Handle signup
      console.log('Signup:', { name, email, phone, password });
      onLogin(email, password);
    } else {
      // Handle login
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4 py-8 transition-colors">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-4">
            <span className="text-3xl text-white">🛍️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('home.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isSignup ? t('auth.createAccount') : t('auth.welcomeBack')}
          </p>
        </div>

        {/* Login/Signup Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl p-8 transition-colors">
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                  {t('auth.fullName')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                  placeholder={t('auth.enterName')}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                {t('auth.email')}
              </label>
              <div className="relative">
                <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400 dark:placeholder-gray-500 transition-colors`}
                  placeholder={t('auth.enterEmail')}
                  required
                />
              </div>
            </div>

            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                  {t('auth.phone')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                  placeholder="+965 XXXX XXXX"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                {t('auth.password')}
              </label>
              <div className="relative">
                <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400 dark:placeholder-gray-500 transition-colors`}
                  placeholder={t('auth.enterPassword')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isSignup && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-emerald-600 focus:ring-emerald-500 dark:checked:bg-emerald-600 transition-colors" />
                  <span className="text-gray-600 dark:text-gray-400 transition-colors">{t('auth.rememberMe')}</span>
                </label>
                <button type="button" className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t('auth.forgotPassword')}
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors"
            >
              {isSignup ? t('auth.signUp') : t('auth.signIn')}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700 transition-colors"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">{t('auth.orContinueWith')}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>

              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>
          </div>

          {/* Toggle Sign In/Sign Up */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400 transition-colors">
              {isSignup ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}
            </span>
            {' '}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              {isSignup ? t('auth.signIn') : t('auth.signUp')}
            </button>
          </div>

          {/* Guest Continue */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="w-full mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
          >
            {t('auth.continueAsGuest')}
          </button>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 transition-colors">
          {t('auth.bySigningUp')}{' '}
          <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
            {t('profile.terms')}
          </a>
          {' '}{t('auth.and')}{' '}
          <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
            {t('profile.privacy')}
          </a>
        </p>
      </div>
    </div>
  );
}
