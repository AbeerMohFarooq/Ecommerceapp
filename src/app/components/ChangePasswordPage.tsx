import { ArrowLeft, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface ChangePasswordPageProps {
  onNavigate: (page: Page) => void;
  cartCount: number;
}

export function ChangePasswordPage({ onNavigate, cartCount }: ChangePasswordPageProps) {
  const { t, isRTL } = useLanguage();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordRequirements = [
    { label: t('password.minLength'), met: newPassword.length >= 8 },
    { label: t('password.hasUppercase'), met: /[A-Z]/.test(newPassword) },
    { label: t('password.hasLowercase'), met: /[a-z]/.test(newPassword) },
    { label: t('password.hasNumber'), met: /[0-9]/.test(newPassword) },
    { label: t('password.hasSpecial'), met: /[!@#$%^&*]/.test(newPassword) }
  ];

  const isPasswordValid = passwordRequirements.every(req => req.met);
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPasswordValid && passwordsMatch) {
      console.log('Password changed');
      onNavigate('profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 transition-colors">
      {/* Mobile Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 md:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('editProfile')} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('settings.changePassword')}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Info Card */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-xl p-4 transition-colors">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              {t('password.securityTip')}
            </p>
          </div>

          {/* Password Fields */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4 transition-colors">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('password.currentPassword')} *
              </label>
              <div className="relative">
                <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-600`} />
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors`}
                >
                  {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('password.newPassword')} *
              </label>
              <div className="relative">
                <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-600`} />
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors`}
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('password.confirmPassword')} *
              </label>
              <div className="relative">
                <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-600`} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors`}
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-2">{t('password.noMatch')}</p>
              )}
              {confirmPassword && passwordsMatch && (
                <p className="text-green-600 dark:text-green-400 text-sm mt-2 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  {t('password.match')}
                </p>
              )}
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">{t('password.requirements')}</h3>
            <ul className="space-y-2">
              {passwordRequirements.map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    req.met 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-600'
                  }`}>
                    {req.met && <Check className="w-3 h-3" />}
                  </div>
                  <span className={req.met ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}>
                    {req.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 pt-4 pb-6 -mx-4 px-4 border-t border-gray-200 dark:border-gray-800 space-y-3 transition-colors">
            <button
              type="submit"
              disabled={!isPasswordValid || !passwordsMatch || !currentPassword}
              className="w-full bg-emerald-600 dark:bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-700 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              {t('password.updatePassword')}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('editProfile')}
              className="w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 rounded-xl font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              {t('common.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
