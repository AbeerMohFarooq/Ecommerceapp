import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface BreadcrumbsProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  productName?: string;
}

export function Breadcrumbs({ currentPage, onNavigate, productName }: BreadcrumbsProps) {
  const { t, isRTL } = useLanguage();

  const breadcrumbMap: Record<Page, { label: string; parent?: Page }> = {
    'home': { label: t('nav.home') },
    'onboarding': { label: t('nav.home') },
    'login': { label: t('auth.signIn') },
    'search': { label: t('home.search'), parent: 'home' },
    'categories': { label: t('categories.title'), parent: 'home' },
    'product': { label: productName || t('product.details'), parent: 'home' },
    'cart': { label: t('nav.cart'), parent: 'home' },
    'checkout': { label: t('checkout.title'), parent: 'cart' },
    'success': { label: t('success.orderPlaced'), parent: 'checkout' },
    'orders': { label: t('nav.orders'), parent: 'profile' },
    'orderDetail': { label: t('orderDetail.title'), parent: 'orders' },
    'wishlist': { label: t('nav.wishlist'), parent: 'profile' },
    'profile': { label: t('nav.profile'), parent: 'home' },
    'editProfile': { label: t('profile.editProfile'), parent: 'profile' },
    'changePassword': { label: t('settings.changePassword'), parent: 'editProfile' },
    'addresses': { label: t('addresses.title'), parent: 'profile' },
    'addAddress': { label: t('addresses.addNewAddress'), parent: 'addresses' },
    'editAddress': { label: t('addresses.editAddress'), parent: 'addresses' },
    'notifications': { label: t('profile.notifications'), parent: 'profile' },
    'settings': { label: t('settings.title'), parent: 'profile' }
  };

  const getBreadcrumbPath = (page: Page): Array<{ label: string; page: Page }> => {
    const path: Array<{ label: string; page: Page }> = [];
    let currentPageData = breadcrumbMap[page];
    let currentPageKey = page;

    while (currentPageData) {
      path.unshift({ label: currentPageData.label, page: currentPageKey });
      if (currentPageData.parent) {
        currentPageKey = currentPageData.parent;
        currentPageData = breadcrumbMap[currentPageKey];
      } else {
        break;
      }
    }

    return path;
  };

  const breadcrumbPath = getBreadcrumbPath(currentPage);

  // Don't show breadcrumbs on certain pages
  if (['onboarding', 'login', 'home'].includes(currentPage)) {
    return null;
  }

  return (
    <nav className="hidden md:block bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </button>
          </li>

          {breadcrumbPath.map((crumb, index) => {
            const isLast = index === breadcrumbPath.length - 1;
            const Icon = isRTL ? ChevronRight : ChevronRight;

            return (
              <li key={crumb.page} className="flex items-center gap-2">
                <Icon className={`w-4 h-4 text-gray-400 ${isRTL ? 'rotate-180' : ''}`} />
                {isLast ? (
                  <span className="font-medium text-gray-900">{crumb.label}</span>
                ) : (
                  <button
                    onClick={() => onNavigate(crumb.page)}
                    className="text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    {crumb.label}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
