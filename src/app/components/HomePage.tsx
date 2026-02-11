import { useState } from 'react';
import { Search, ShoppingCart, Menu, Star, Tag } from 'lucide-react';
import type { Product, Page } from '../App';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { MobileMenuSheet } from './MobileMenuSheet';

interface HomePageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onViewCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  cartCount: number;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

const categories = [
  { name: 'Fashion', icon: '👗', color: 'bg-pink-100' },
  { name: 'Beauty', icon: '💄', color: 'bg-purple-100' },
  { name: 'Electronics', icon: '📱', color: 'bg-blue-100' },
  { name: 'Jewelry', icon: '💎', color: 'bg-yellow-100' },
  { name: 'Perfumes', icon: '🌸', color: 'bg-rose-100' },
  { name: 'Food', icon: '🍰', color: 'bg-orange-100' }
];

export function HomePage({
  products,
  onViewProduct,
  onViewCategory,
  onAddToCart,
  cartCount,
  onNavigate,
  onLogout,
  isLoggedIn
}: HomePageProps) {
  const { t, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="pb-20 md:pb-8">
      {/* Mobile Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 md:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <button className="md:hidden">
                    <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </button>
                </SheetTrigger>
                <SheetContent side={isRTL ? 'right' : 'left'} className="p-0 w-[300px] sm:w-[350px]">
                  <MobileMenuSheet 
                    isLoggedIn={isLoggedIn}
                    onNavigate={onNavigate} 
                    onLogout={onLogout} 
                    onClose={() => setIsMenuOpen(false)} 
                  />
                </SheetContent>
              </Sheet>
              <h1 className="text-2xl font-bold text-emerald-600">{t('home.title')}</h1>
            </div>
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <button 
                onClick={() => onNavigate('cart')}
                className="relative md:flex hidden"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
              <input
                type="text"
                placeholder={t('home.search')}
                onClick={() => onNavigate('search')}
                readOnly
                className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-colors`}
              />
            </div>
          </div>
      </header>

      <div className="max-w-7xl mx-auto px-4">
        {/* Promotional Banner */}
        <div className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">{t('home.specialOffer')}</p>
              <h2 className="text-2xl font-bold mb-2">{t('home.upTo')}</h2>
              <p className="text-sm opacity-90">{t('home.selectedItems')}</p>
            </div>
            <Tag className="w-16 h-16 opacity-20" />
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">{t('home.shopCategory')}</h3>
            <button 
              onClick={() => onNavigate('categories')}
              className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors"
            >
              {t('home.seeAll')}
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onViewCategory(category.name)}
                className={`${category.color} rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform active:scale-95`}
                title={`Browse ${category.name}`}
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t(`category.${category.name.toLowerCase()}`)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">{t('home.featured')}</h3>
            <button 
              onClick={() => onNavigate('categories')}
              className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors"
            >
              {t('home.seeAll')}
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-xl transition-shadow dark:hover:border-gray-600"
              >
                <button
                  onClick={() => onViewProduct(product)}
                  className="w-full"
                >
                  <div className="relative aspect-square bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.discount && (
                      <div className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full`}>
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</p>
                    <h4 className="font-medium text-sm mb-2 line-clamp-2 text-left text-gray-900 dark:text-white">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        {product.discount ? (
                          <div>
                            <p className="text-xs text-gray-400 dark:text-gray-500 line-through">
                              {t('common.kd')} {product.price.toFixed(3)}
                            </p>
                            <p className="font-bold text-emerald-600 dark:text-emerald-400">
                              {t('common.kd')} {(product.price * (1 - product.discount / 100)).toFixed(3)}
                            </p>
                          </div>
                        ) : (
                          <p className="font-bold text-emerald-600 dark:text-emerald-400">
                            {t('common.kd')} {product.price.toFixed(3)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
                
                <div className="px-3 pb-3">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    {t('home.addToCart')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🚚</div>
            <h4 className="font-medium text-sm mb-1">{t('home.freeDelivery')}</h4>
            <p className="text-xs text-gray-500">{t('home.ordersOver')}</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">💳</div>
            <h4 className="font-medium text-sm mb-1">{t('home.knetPayment')}</h4>
            <p className="text-xs text-gray-500">{t('home.secureCheckout')}</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">↩️</div>
            <h4 className="font-medium text-sm mb-1">{t('home.easyReturns')}</h4>
            <p className="text-xs text-gray-500">{t('home.returnPolicy')}</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">⭐</div>
            <h4 className="font-medium text-sm mb-1">{t('home.topQuality')}</h4>
            <p className="text-xs text-gray-500">{t('home.verifiedProducts')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
