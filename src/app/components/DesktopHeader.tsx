import { Search, ShoppingCart, User, Heart, Package, Settings, LogOut, Menu, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface DesktopHeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  onLogout: () => void;
  isLoggedIn: boolean;
}

export function DesktopHeader({ currentPage, onNavigate, cartCount, onLogout, isLoggedIn }: DesktopHeaderProps) {
  const { t, isRTL, toggleLanguage, language } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  const categories = [
    { name: 'Fashion', icon: '👗' },
    { name: 'Beauty', icon: '💄' },
    { name: 'Electronics', icon: '📱' },
    { name: 'Jewelry', icon: '💎' },
    { name: 'Perfumes', icon: '🌸' },
    { name: 'Food', icon: '🍰' }
  ];

  return (
    <header className="hidden md:block bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span>📞 +965 2222 3333</span>
              <span>📧 support@kuwaitstore.com</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 hover:text-emerald-100 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
              <span>{t('header.freeShipping')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🛍️</span>
            </div>
            <div className="text-left">
              <h1 className="font-bold text-xl text-gray-900">Kuwait Store</h1>
              <p className="text-xs text-gray-600">{t('header.tagline')}</p>
            </div>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
              <input
                type="text"
                placeholder={t('home.search')}
                onClick={() => onNavigate('search')}
                readOnly
                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer hover:border-emerald-300 transition-colors`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="flex flex-col items-center gap-1 hover:text-emerald-600 transition-colors group"
            >
              <Heart className="w-6 h-6 group-hover:fill-emerald-600" />
              <span className="text-xs font-medium">{t('nav.wishlist')}</span>
            </button>

            {/* Cart */}
            <button
              onClick={() => onNavigate('cart')}
              className="flex flex-col items-center gap-1 hover:text-emerald-600 transition-colors relative group"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{t('nav.cart')}</span>
            </button>

            {/* User Menu */}
            <div className="relative">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs text-gray-600">{t('header.hello')}</p>
                      <p className="text-sm font-semibold">Sarah</p>
                    </div>
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserMenu(false)}
                      />
                      <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50`}>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-semibold text-gray-900">Sarah Ahmed</p>
                          <p className="text-sm text-gray-600">sarah.ahmed@email.com</p>
                        </div>

                        <button
                          onClick={() => {
                            onNavigate('profile');
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <User className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">{t('nav.profile')}</span>
                        </button>

                        <button
                          onClick={() => {
                            onNavigate('orders');
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <Package className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">{t('nav.orders')}</span>
                        </button>

                        <button
                          onClick={() => {
                            onNavigate('wishlist');
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <Heart className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">{t('nav.wishlist')}</span>
                        </button>

                        <button
                          onClick={() => {
                            onNavigate('settings');
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <Settings className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">{t('settings.title')}</span>
                        </button>

                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={() => {
                              onLogout();
                              setShowUserMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left text-red-600"
                          >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">{t('profile.logout')}</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <button
                  onClick={() => onNavigate('login')}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  {t('auth.signIn')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto py-3">
            <div className="relative">
              <button
                onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
                onMouseEnter={() => setShowCategoriesMenu(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                <Menu className="w-5 h-5" />
                <span>{t('categories.title')}</span>
              </button>

              {/* Categories Dropdown */}
              {showCategoriesMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowCategoriesMenu(false)}
                  />
                  <div
                    className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50`}
                    onMouseLeave={() => setShowCategoriesMenu(false)}
                  >
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => {
                          onNavigate('categories');
                          setShowCategoriesMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className="text-2xl">{category.icon}</span>
                        <span className="font-medium">{t(`category.${category.name.toLowerCase()}`)}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onNavigate('categories')}
                className="flex items-center gap-2 px-3 py-1 hover:text-emerald-600 transition-colors whitespace-nowrap"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium text-sm">{t(`category.${category.name.toLowerCase()}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
