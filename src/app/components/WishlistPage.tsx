import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import type { Page } from '../App';
import { useWishlist } from '../contexts/WishlistContext';
import { useLanguage } from '../contexts/LanguageContext';

interface WishlistPageProps {
  onNavigate: (page: Page) => void;
  onAddToCart: (product: any) => void;
  cartCount: number;
}

export function WishlistPage({ onNavigate, onAddToCart, cartCount }: WishlistPageProps) {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { t, isRTL } = useLanguage();

  return (
    <div className="pb-20 md:pb-8 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-700">
              <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
              <span className="font-medium">{t('product.back')}</span>
            </button>
            <h1 className="text-xl font-bold">{t('wishlist.title')} ({wishlistItems.length})</h1>
            <button 
              onClick={() => onNavigate('cart')}
              className="relative"
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
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold mb-2">{t('wishlist.empty')}</h2>
            <p className="text-gray-600 mb-6">{t('wishlist.emptyDesc')}</p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              {t('cart.continueShopping')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>
                </div>
                
                <div className="p-3">
                  <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                  <h4 className="font-medium text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h4>
                  
                  <div className="mb-3">
                    {product.discount ? (
                      <div>
                        <p className="text-xs text-gray-400 line-through">
                          {t('common.kd')} {product.price.toFixed(3)}
                        </p>
                        <p className="font-bold text-emerald-600">
                          {t('common.kd')} {(product.price * (1 - product.discount / 100)).toFixed(3)}
                        </p>
                      </div>
                    ) : (
                      <p className="font-bold text-emerald-600">
                        {t('common.kd')} {product.price.toFixed(3)}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {t('wishlist.addToCart')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
