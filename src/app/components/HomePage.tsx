import { useState } from 'react';
import { Search, ShoppingCart, Menu, Star, Tag } from 'lucide-react';
import type { Product, Page } from '../App';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { MobileMenuSheet } from './MobileMenuSheet';

interface HomePageProps {
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartCount: number;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Luxury Eau De Parfum',
    price: 45.500,
    image: 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc3MDQ0NTE4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Perfumes',
    description: 'Premium French perfume with notes of jasmine and sandalwood. Long-lasting fragrance for special occasions.',
    rating: 4.8,
    reviews: 127,
    inStock: true,
    discount: 15
  },
  {
    id: '2',
    name: 'Gold Pearl Necklace',
    price: 89.900,
    image: 'https://images.unsplash.com/photo-1611012756377-05e2e4269fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamV3ZWxyeSUyMG5lY2tsYWNlfGVufDF8fHx8MTc3MDUyNjAzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Jewelry',
    description: '18K gold necklace with natural pearls. Elegant design perfect for weddings and formal events.',
    rating: 4.9,
    reviews: 85,
    inStock: true
  },
  {
    id: '3',
    name: 'Designer Leather Handbag',
    price: 125.000,
    image: 'https://images.unsplash.com/photo-1758171692659-024183c2c272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWclMjBsdXh1cnl8ZW58MXx8fHwxNzcwNDk0NDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Fashion',
    description: 'Premium Italian leather handbag with gold hardware. Spacious interior with multiple compartments.',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    discount: 20
  },
  {
    id: '4',
    name: 'Swiss Automatic Watch',
    price: 199.000,
    image: 'https://images.unsplash.com/photo-1760163180940-eecde9eda36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YXRjaCUyMGVsZWdhbnR8ZW58MXx8fHwxNzcwNDcxNTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Watches',
    description: 'Swiss-made automatic watch with sapphire crystal and leather strap. Water-resistant up to 50m.',
    rating: 5.0,
    reviews: 156,
    inStock: true
  },
  {
    id: '5',
    name: 'Premium Skincare Set',
    price: 34.750,
    image: 'https://images.unsplash.com/photo-1643168343279-3f93c2e592ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNvc21ldGljc3xlbnwxfHx8fDE3NzA1NDc1MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Beauty',
    description: 'Complete skincare routine with natural ingredients. Includes cleanser, toner, serum, and moisturizer.',
    rating: 4.6,
    reviews: 342,
    inStock: true,
    discount: 10
  },
  {
    id: '6',
    name: 'Designer Sunglasses',
    price: 42.500,
    image: 'https://images.unsplash.com/photo-1732139637217-56c77369e25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzA0NDQ2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Accessories',
    description: 'UV400 protection polarized sunglasses. Lightweight frame with premium lenses.',
    rating: 4.5,
    reviews: 98,
    inStock: true
  },
  {
    id: '7',
    name: 'Premium Arabic Sweets Box',
    price: 18.500,
    image: 'https://images.unsplash.com/photo-1595353611262-ff0489f4969a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBzd2VldHMlMjBkZXNzZXJ0fGVufDF8fHx8MTc3MDU0NzUxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Food',
    description: 'Assorted premium Arabic sweets and baklava. Perfect for gifting during celebrations.',
    rating: 4.8,
    reviews: 445,
    inStock: true
  },
  {
    id: '8',
    name: 'Wireless Noise-Canceling Headphones',
    price: 68.900,
    image: 'https://images.unsplash.com/photo-1723961617032-ef69c454cb31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NzA0MzA1MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Electronics',
    description: 'Premium wireless headphones with active noise cancellation. 30-hour battery life.',
    rating: 4.9,
    reviews: 567,
    inStock: true,
    discount: 25
  }
];

const categories = [
  { name: 'Fashion', icon: '👗', color: 'bg-pink-100' },
  { name: 'Beauty', icon: '💄', color: 'bg-purple-100' },
  { name: 'Electronics', icon: '📱', color: 'bg-blue-100' },
  { name: 'Jewelry', icon: '💎', color: 'bg-yellow-100' },
  { name: 'Perfumes', icon: '🌸', color: 'bg-rose-100' },
  { name: 'Food', icon: '🍰', color: 'bg-orange-100' }
];

export function HomePage({ onViewProduct, onAddToCart, cartCount, onNavigate, onLogout, isLoggedIn }: HomePageProps) {
  const { t, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <Menu className="w-6 h-6 text-gray-700" />
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
                <ShoppingCart className="w-6 h-6 text-gray-700" />
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
              className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer`}
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
                onClick={() => onNavigate('categories')}
                className={`${category.color} rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform active:scale-95`}
                title={`Browse ${category.name}`}
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="text-sm font-medium text-gray-700">{t(`category.${category.name.toLowerCase()}`)}</span>
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
            {products.map((product) => (
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