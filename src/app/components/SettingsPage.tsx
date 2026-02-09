import { ArrowLeft, Globe, Bell, Lock, Shield, HelpCircle, Mail, MessageSquare, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface SettingsPageProps {
  onNavigate: (page: Page) => void;
  cartCount: number;
}

export function SettingsPage({ onNavigate, cartCount }: SettingsPageProps) {
  const { t, isRTL, language, toggleLanguage } = useLanguage();
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('profile')} className="text-gray-700">
              <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <h1 className="text-xl font-bold">{t('settings.title')}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-lg">{t('settings.general')}</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{t('profile.language')}</p>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'English' : 'العربية'}
                  </p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </button>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  {darkMode ? <Moon className="w-5 h-5 text-purple-600" /> : <Sun className="w-5 h-5 text-purple-600" />}
                </div>
                <div>
                  <p className="font-medium">{t('settings.darkMode')}</p>
                  <p className="text-sm text-gray-600">{t('settings.darkModeDesc')}</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-0.5 ${isRTL ? (darkMode ? 'right-0.5' : 'right-6') : (darkMode ? 'left-6' : 'left-0.5')} w-5 h-5 bg-white rounded-full transition-all`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-lg">{t('profile.notifications')}</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{t('settings.pushNotifications')}</p>
                  <p className="text-sm text-gray-600">{t('settings.pushNotificationsDesc')}</p>
                </div>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  pushNotifications ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-0.5 ${isRTL ? (pushNotifications ? 'right-0.5' : 'right-6') : (pushNotifications ? 'left-6' : 'left-0.5')} w-5 h-5 bg-white rounded-full transition-all`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">{t('settings.emailNotifications')}</p>
                  <p className="text-sm text-gray-600">{t('settings.emailNotificationsDesc')}</p>
                </div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  emailNotifications ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-0.5 ${isRTL ? (emailNotifications ? 'right-0.5' : 'right-6') : (emailNotifications ? 'left-6' : 'left-0.5')} w-5 h-5 bg-white rounded-full transition-all`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">{t('settings.smsNotifications')}</p>
                  <p className="text-sm text-gray-600">{t('settings.smsNotificationsDesc')}</p>
                </div>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  smsNotifications ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-0.5 ${isRTL ? (smsNotifications ? 'right-0.5' : 'right-6') : (smsNotifications ? 'left-6' : 'left-0.5')} w-5 h-5 bg-white rounded-full transition-all`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-lg">{t('settings.security')}</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{t('settings.changePassword')}</p>
                  <p className="text-sm text-gray-600">{t('settings.changePasswordDesc')}</p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{t('settings.twoFactor')}</p>
                  <p className="text-sm text-gray-600">{t('settings.twoFactorDesc')}</p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-lg">{t('profile.helpSupport')}</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="font-medium">{t('settings.faq')}</p>
              </div>
              <span className="text-gray-400">›</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-teal-600" />
                </div>
                <p className="font-medium">{t('settings.contactSupport')}</p>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <p className="font-medium">{t('profile.terms')}</p>
              <span className="text-gray-400">›</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <p className="font-medium">{t('profile.privacy')}</p>
              <span className="text-gray-400">›</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <p className="font-medium">{t('profile.about')}</p>
              <span className="text-gray-400">›</span>
            </button>

            <div className="p-4 text-center">
              <p className="text-sm text-gray-600">
                {t('profile.version')} 1.0.0
              </p>
              <p className="text-xs text-gray-500 mt-1">
                © 2024 Kuwait Store. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Delete Account */}
        <button className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-medium hover:bg-red-100 transition-colors">
          {t('settings.deleteAccount')}
        </button>
      </div>
    </div>
  );
}
