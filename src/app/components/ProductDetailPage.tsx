import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import type { Product, Page } from '../App';
import { useWishlist } from '../contexts/WishlistContext';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  cartCount: number;
  onNavigate: (page: Page) => void;
}

export function ProductDetailPage({ product, onBack, onAddToCart, cartCount, onNavigate }: ProductDetailPageProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { t, isRTL } = useLanguage();
  const inWishlist = isInWishlist(product.id);

  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="pb-20 md:pb-8 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Mobile Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 md:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
              <span className="font-medium">{t('product.back')}</span>
            </button>
            <button 
              onClick={() => onNavigate('cart')}
              className="relative"
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
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          {/* Product Image */}
          <div className="mb-6 md:mb-0">
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden transition-colors">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full`}>
                  -{product.discount}% OFF
                </div>
              )}
              <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex flex-col gap-2`}>
                <button 
                  onClick={handleWishlistToggle}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                </button>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Additional Images */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-transparent hover:border-emerald-500 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={`${product.name} ${i}`}
                    className="w-full h-full object-cover opacity-60 hover:opacity-100"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-2 transition-colors">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                {product.discount ? (
                  <>
                    <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 transition-colors">
                      {t('common.kd')} {finalPrice.toFixed(3)}
                    </span>
                    <span className="text-xl text-gray-400 dark:text-gray-500 line-through transition-colors">
                      {t('common.kd')} {product.price.toFixed(3)}
                    </span>
                    <span className="text-sm font-medium text-red-500 dark:text-red-400 transition-colors">
                      Save {t('common.kd')} {(product.price - finalPrice).toFixed(3)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 transition-colors">
                    {t('common.kd')} {product.price.toFixed(3)}
                  </span>
                )}
              </div>

              {product.inStock ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium mb-6 transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {t('product.inStock')}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-medium mb-6 transition-colors">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  {t('product.outOfStock')}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 transition-colors">{t('product.description')}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">{product.description}</p>
            </div>

            {/* Features */}
            <div className="mb-6 grid grid-cols-1 gap-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors">
                <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 transition-colors" />
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white transition-colors">{t('product.freeDelivery')}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors">{t('home.ordersOver')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors">
                <RotateCcw className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 transition-colors" />
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white transition-colors">{t('product.returns')}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors">{t('product.easyReturn')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors">
                <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 transition-colors" />
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white transition-colors">{t('product.securePayment')}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors">{t('product.knetAccepted')}</p>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {product.inStock ? t('product.addToCart') : t('product.outOfStock')}
            </button>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-12">
          <h3 className="font-semibold text-xl mb-6 text-gray-900 dark:text-white transition-colors">{t('product.reviews')}</h3>
          
          <div className="space-y-4">
            {[
              { name: 'Sarah Ahmed', rating: 5, comment: 'Excellent product! Exactly as described. Fast delivery too.', date: '2 days ago' },
              { name: 'Mohammed Ali', rating: 5, comment: 'High quality and great value for money. Highly recommended!', date: '1 week ago' },
              { name: 'Fatima Hassan', rating: 4, comment: 'Good product, but delivery took longer than expected.', date: '2 weeks ago' }
            ].map((review, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white transition-colors">{review.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}