import { ArrowLeft, Globe, Bell, Lock, Shield, HelpCircle, Mail, MessageSquare, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import type { Page } from '../App';

interface SettingsPageProps {
  onNavigate: (page: Page) => void;
  cartCount: number;
}

export function SettingsPage({ onNavigate, cartCount }: SettingsPageProps) {
  const { t, isRTL, language, toggleLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 transition-colors">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 md:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('profile')} className="text-gray-700 dark:text-gray-300">
              <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('settings.title')}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">{t('settings.general')}</h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">{t('profile.language')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'English' : 'العربية'}</p>
                </div>
              </div>
              <span className="text-gray-400 dark:text-gray-500">›</span>
            </button>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  {isDarkMode ? <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" /> : <Sun className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t('settings.darkMode')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.darkModeDesc')}</p>
                </div>
              </div>
              <button
                onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
                className={`relative w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <div className={`absolute top-0.5 ${isRTL ? (isDarkMode ? 'right-0.5' : 'right-6') : (isDarkMode ? 'left-6' : 'left-0.5')} w-5 h-5 bg-white rounded-full transition-all`} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">{t('profile.notifications')}</h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t('settings.pushNotifications')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.pushNotificationsDesc')}</p>
                </div>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${pushNotifications ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <div className={`absolute top-0.5 ${isRTL ? (pushNotifications ? 'right-0.5' : 'right-6') : (pushNotifications ? 'left-6' : 'left-0.5')} w-5 h-5 bg-white rounded-full transition-all`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t('settings.emailNotifications')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.emailNotificationsDesc')}</p>
                </div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${emailNotifications ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <div className={`absolute top-0.5 ${isRTL ? (emailNotifications ? 'right-0.5' : 'right-6') : (emailNotifications ? 'left-6' : 'left-0.5')} w-5 h-5 bg-white rounded-full transition-all`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t('settings.smsNotifications')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.smsNotificationsDesc')}</p>
                </div>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${smsNotifications ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <div className={`absolute top-0.5 ${isRTL ? (smsNotifications ? 'right-0.5' : 'right-6') : (smsNotifications ? 'left-6' : 'left-0.5')} w-5 h-5 bg-white rounded-full transition-all`} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">{t('settings.security')}</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <button onClick={() => onNavigate('changePassword')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">{t('settings.changePassword')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.changePasswordDesc')}</p>
                </div>
              </div>
              <span className="text-gray-400 dark:text-gray-500">›</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">{t('settings.twoFactor')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.twoFactorDesc')}</p>
                </div>
              </div>
              <span className="text-gray-400 dark:text-gray-500">›</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">{t('profile.helpSupport')}</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="font-medium text-gray-900 dark:text-white">{t('settings.faq')}</p>
              </div>
              <span className="text-gray-400 dark:text-gray-500">›</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <p className="font-medium text-gray-900 dark:text-white">{t('settings.contactSupport')}</p>
              </div>
              <span className="text-gray-400 dark:text-gray-500">›</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <p className="font-medium text-gray-900 dark:text-white">{t('profile.terms')}</p>
              <span className="text-gray-400 dark:text-gray-500">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <p className="font-medium text-gray-900 dark:text-white">{t('profile.privacy')}</p>
              <span className="text-gray-400 dark:text-gray-500">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <p className="font-medium text-gray-900 dark:text-white">{t('profile.about')}</p>
              <span className="text-gray-400 dark:text-gray-500">›</span>
            </button>
            <div className="p-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('profile.version')} 1.0.0</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">© 2024 Kuwait Store. All rights reserved.</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-3 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
          {t('settings.deleteAccount')}
        </button>
      </div>
    </div>
  );
}
