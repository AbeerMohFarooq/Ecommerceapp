import { useState } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, X, Star, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Product, Page } from '../App';

interface SearchPageProps {
  onNavigate: (page: Page) => void;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartCount: number;
  products: Product[];
}

export function SearchPage({ onNavigate, onViewProduct, onAddToCart, cartCount, products }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<'popular' | 'priceLow' | 'priceHigh' | 'rating'>('popular');
  const { t, isRTL } = useLanguage();

  // Filter and search products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'priceLow':
        return a.price - b.price;
      case 'priceHigh':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  const categories = ['all', 'Fashion', 'Beauty', 'Electronics', 'Jewelry', 'Perfumes', 'Food'];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => onNavigate('home')} className="text-gray-700">
              <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <div className="flex-1 relative">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('home.search')}
                className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-lg border-2 transition-colors ${
                showFilters ? 'border-emerald-600 bg-emerald-50 text-emerald-600' : 'border-gray-200 text-gray-700'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? t('orders.all') : category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h3 className="font-semibold mb-4">{t('search.filters')}</h3>
            
            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search.priceRange')}: {t('common.kd')} {priceRange[0]} - {t('common.kd')} {priceRange[1]}
              </label>
              <div className="flex gap-4">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Sort By */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search.sortBy')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'popular', label: t('search.popular') },
                  { value: 'priceLow', label: t('search.priceLowHigh') },
                  { value: 'priceHigh', label: t('search.priceHighLow') },
                  { value: 'rating', label: t('search.topRated') }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      sortBy === option.value
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply/Reset */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 200]);
                  setSortBy('popular');
                }}
                className="flex-1 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                {t('search.reset')}
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
              >
                {t('search.apply')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            {sortedProducts.length} {t('search.results')}
          </p>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">{t('search.noResults')}</h3>
            <p className="text-gray-600 mb-6">{t('search.tryDifferent')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
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
                    <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                    <h4 className="font-medium text-sm mb-2 line-clamp-2 text-left">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                    
                    <div className="mb-2">
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
                  </div>
                </button>
                
                <div className="px-3 pb-3">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {t('home.addToCart')}
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
