import { useState } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, X, Star, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Product, Page } from '../App';
import { FilterSidebar } from './FilterSidebar';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface SearchPageProps {
  onNavigate: (page: Page) => void;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartCount: number;
  products: Product[];
}

export function SearchPage({ onNavigate, onViewProduct, onAddToCart, cartCount, products }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<'popular' | 'priceLow' | 'priceHigh' | 'rating'>('popular');
  const { t, isRTL } = useLanguage();

  const categories = ['Fashion', 'Beauty', 'Electronics', 'Jewelry', 'Perfumes', 'Food'];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSortBy('popular');
  };

  // Filter and search products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 transition-colors">
      {/* Mobile Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 md:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => onNavigate('home')} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <div className="flex-1 relative">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('home.search')}
                className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors`}
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors`}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden shrink-0">
                  <SlidersHorizontal className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? 'right' : 'left'} className="w-[300px] sm:w-[400px] overflow-y-auto">
                <FilterSidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  priceRange={[0, 200]}
                  currentPriceRange={priceRange}
                  onCategoryChange={handleCategoryChange}
                  onPriceChange={setPriceRange}
                  onClearFilters={clearFilters}
                  className="mt-4"
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              priceRange={[0, 200]}
              currentPriceRange={priceRange}
              onCategoryChange={handleCategoryChange}
              onPriceChange={setPriceRange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort & Results Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <p className="text-gray-600 dark:text-gray-400 transition-colors">
                {sortedProducts.length} {t('search.results')}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap transition-colors">{t('search.sortBy')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm border border-gray-300 dark:border-gray-700 rounded-md focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-1.5 pl-3 pr-8 transition-colors"
                >
                  <option value="popular">{t('search.popular')}</option>
                  <option value="priceLow">{t('search.priceLowHigh')}</option>
                  <option value="priceHigh">{t('search.priceHighLow')}</option>
                  <option value="rating">{t('search.topRated')}</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('search.noResults')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors">{t('search.tryDifferent')}</p>
                <Button onClick={clearFilters} variant="outline">
                  {t('search.reset')}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-xl transition-all flex flex-col"
                  >
                    <button
                      onClick={() => onViewProduct(product)}
                      className="w-full flex-1"
                    >
                      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 transition-colors">
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
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 transition-colors">{product.category}</p>
                        <h4 className="font-medium text-sm mb-2 line-clamp-2 text-left text-gray-900 dark:text-white transition-colors">
                          {product.name}
                        </h4>
                        
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600 dark:text-gray-400 transition-colors">
                            {product.rating}
                          </span>
                        </div>
                        
                        <div className="mb-2">
                          {product.discount ? (
                            <div>
                              <p className="text-xs text-gray-400 dark:text-gray-500 line-through transition-colors">
                                {t('common.kd')} {product.price.toFixed(3)}
                              </p>
                              <p className="font-bold text-emerald-600 dark:text-emerald-400 transition-colors">
                                {t('common.kd')} {(product.price * (1 - product.discount / 100)).toFixed(3)}
                              </p>
                            </div>
                          ) : (
                            <p className="font-bold text-emerald-600 dark:text-emerald-400 transition-colors">
                              {t('common.kd')} {product.price.toFixed(3)}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                    
                    <div className="px-3 pb-3 mt-auto">
                      <button
                        onClick={() => onAddToCart(product)}
                        className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
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
      </div>
    </div>
  );
}
