import { User, MapPin, Package, Bell, Settings, HelpCircle, LogOut, ChevronRight, ShoppingBag, Home } from 'lucide-react';
import type { Page } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

interface MobileMenuSheetProps {
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  onClose: () => void;
}

export function MobileMenuSheet({ isLoggedIn, onNavigate, onLogout, onClose }: MobileMenuSheetProps) {
  const { t } = useLanguage();

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col h-full justify-center items-center p-8 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6">
            <User className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('auth.welcomeGuest')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{t('auth.guestDesc')}</p>
        <button
            onClick={() => handleNavigate('login')}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
            {t('auth.signInSignUp')}
        </button>
      </div>
    );
  }

  const menuItems = [
    { icon: Home, label: t('nav.home'), page: 'home' as Page },
    { icon: ShoppingBag, label: t('nav.categories'), page: 'categories' as Page },
    { icon: User, label: t('profile.editProfile'), page: 'editProfile' as Page },
    { icon: Package, label: t('nav.orders'), page: 'orders' as Page },
    { icon: MapPin, label: t('addresses.title'), page: 'addresses' as Page },
    { icon: Bell, label: t('profile.notifications'), page: 'notifications' as Page },
    { icon: Settings, label: t('settings.title'), page: 'settings' as Page },
    { icon: HelpCircle, label: t('profile.helpSupport'), page: 'settings' as Page },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Sarah Ahmed</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">sarah.ahmed@email.com</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleNavigate(item.page)}
                className="w-full flex items-center justify-between gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {t('profile.logout')}
        </button>
      </div>
    </div>
  );
}
