import { Home, ShoppingBag, ShoppingCart, User, Heart } from 'lucide-react';
import type { Page } from '../App';
import { useWishlist } from '../contexts/WishlistContext';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
}

export function Navigation({ currentPage, onNavigate, cartCount }: NavigationProps) {
  const { wishlistCount } = useWishlist();
  const { t } = useLanguage();

  const navItems = [
    { id: 'home' as Page, icon: Home, label: t('nav.home') },
    { id: 'wishlist' as Page, icon: Heart, label: t('profile.wishlist'), badge: wishlistCount },
    { id: 'cart' as Page, icon: ShoppingCart, label: t('nav.cart'), badge: cartCount },
    { id: 'profile' as Page, icon: User, label: t('nav.profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden z-50 transition-colors">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${item.id === 'wishlist' && wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}