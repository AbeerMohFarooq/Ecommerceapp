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
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Categories Sidebar */}
        <aside className="w-full md:w-48 lg:w-56 flex-shrink-0 bg-white md:sticky md:top-[174px] md:h-[calc(100vh-174px)] overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200">
          <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex-1 md:w-full p-4 flex flex-col items-center gap-2 transition-colors ${
                  activeCategory === category.name
                    ? 'bg-emerald-50 border-b-4 md:border-b-0 md:border-r-4 border-emerald-600'
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
        </aside>

        {/* Products Grid */}
        <main className="flex-1 p-4 md:p-6 min-h-[calc(100vh-250px)]">
          <div className="max-w-6xl">
            <h2 className="text-2xl font-bold mb-4">
              {t(`category.${activeCategory.toLowerCase()}`)} ({categoryProducts.length})
            </h2>

            {categoryProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-bold mb-2">{t('categories.noProducts')}</h3>
                <p className="text-gray-600">{t('categories.comingSoon')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
        </main>
      </div>
    </div>
  );
}