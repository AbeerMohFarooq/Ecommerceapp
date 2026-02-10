import { ArrowLeft, Search, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page, Product } from '../App';

interface CategoriesPageProps {
  onNavigate: (page: Page) => void;
  onViewProduct: (product: Product) => void;
  cartCount: number;
  products: Product[];
  selectedCategory?: string;
}

const categories = [
  { name: 'Fashion', icon: '👗', color: 'from-pink-400 to-rose-500' },
  { name: 'Beauty', icon: '💄', color: 'from-purple-400 to-pink-500' },
  { name: 'Electronics', icon: '📱', color: 'from-blue-400 to-cyan-500' },
  { name: 'Jewelry', icon: '💎', color: 'from-amber-400 to-yellow-500' },
  { name: 'Perfumes', icon: '🌸', color: 'from-violet-400 to-purple-500' },
  { name: 'Food', icon: '🍰', color: 'from-orange-400 to-red-500' },
  { name: 'Watches', icon: '⌚', color: 'from-slate-400 to-gray-500' },
  { name: 'Accessories', icon: '👜', color: 'from-teal-400 to-emerald-500' }
];

export function CategoriesPage({ onNavigate, onViewProduct, cartCount, products, selectedCategory }: CategoriesPageProps) {
  const { t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(selectedCategory || 'Fashion');

  const categoryProducts = products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button onClick={() => onNavigate('home')} className="text-gray-700">
                <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
              <h1 className="text-xl font-bold">{t('categories.title')}</h1>
            </div>
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

      <div className="flex h-[calc(100vh-80px)]">
        {/* Categories Sidebar */}
        <div className="w-28 md:w-40 bg-white border-r border-gray-200 overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`w-full p-4 flex flex-col items-center gap-2 transition-colors ${
                activeCategory === category.name
                  ? 'bg-emerald-50 border-r-4 border-emerald-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-lg`}>
                {category.icon}
              </div>
              <span className={`text-xs font-medium text-center ${
                activeCategory === category.name ? 'text-emerald-600' : 'text-gray-700'
              }`}>
                {t(`category.${category.name.toLowerCase()}`)}
              </span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              {t(`category.${activeCategory.toLowerCase()}`)} ({categoryProducts.length})
            </h2>

            {categoryProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-bold mb-2">{t('categories.noProducts')}</h3>
                <p className="text-gray-600">{t('categories.comingSoon')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categoryProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => onViewProduct(product)}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow text-left"
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
                      <h4 className="font-medium text-sm mb-2 line-clamp-2">
                        {product.name}
                      </h4>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-xs text-gray-600">
                          ⭐ {product.rating}
                        </span>
                      </div>
                      
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
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}