import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ProfilePage } from './components/ProfilePage';
import { OrdersPage } from './components/OrdersPage';
import { WishlistPage } from './components/WishlistPage';
import { LoginPage } from './components/LoginPage';
import { OnboardingPage } from './components/OnboardingPage';
import { SearchPage } from './components/SearchPage';
import { OrderDetailPage } from './components/OrderDetailPage';
import { NotificationsPage } from './components/NotificationsPage';
import { SettingsPage } from './components/SettingsPage';
import { OrderSuccessPage } from './components/OrderSuccessPage';
import { EditProfilePage } from './components/EditProfilePage';
import { ChangePasswordPage } from './components/ChangePasswordPage';
import { AddressesPage } from './components/AddressesPage';
import { AddAddressPage } from './components/AddAddressPage';
import { CategoriesPage } from './components/CategoriesPage';
import { Navigation } from './components/Navigation';
import { DesktopHeader } from './components/DesktopHeader';
import { Breadcrumbs } from './components/Breadcrumbs';
import { LiveChat } from './components/LiveChat';
import { LanguageProvider } from './contexts/LanguageContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { productApi } from './services/productApi';

export type Page = 'onboarding' | 'login' | 'home' | 'search' | 'categories' | 'product' | 'cart' | 'checkout' | 'profile' | 'editProfile' | 'changePassword' | 'addresses' | 'addAddress' | 'editAddress' | 'orders' | 'orderDetail' | 'wishlist' | 'notifications' | 'settings' | 'success';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('onboarding');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [editingAddress, setEditingAddress] = useState<any>(null);

  // Load products on mount
  useState(() => {
    productApi.getAllProducts().then(setProducts);
  });

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setCartCount(cartCount + 1);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    const oldItem = cartItems.find(item => item.id === productId);
    const quantityDiff = quantity - (oldItem?.quantity || 0);
    
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
    setCartCount(cartCount + quantityDiff);
  };

  const removeFromCart = (productId: string) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      setCartCount(cartCount - item.quantity);
    }
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleOnboardingComplete = () => {
    setCurrentPage('login');
  };

  const handleCheckoutComplete = () => {
    const newOrderNumber = `ORD-${Date.now()}`;
    setOrderNumber(newOrderNumber);
    setCartItems([]);
    setCartCount(0);
    setCurrentPage('success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCartItems([]);
    setCartCount(0);
    setCurrentPage('login');
  };

  const cartTotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.discount 
      ? item.price * (1 - item.discount / 100) 
      : item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
          {/* Desktop Header - Show on all pages except onboarding, login, success */}
          {!['onboarding', 'login', 'success'].includes(currentPage) && (
            <>
              <DesktopHeader
                currentPage={currentPage}
                onNavigate={navigateToPage}
                cartCount={cartCount}
                onLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
              <Breadcrumbs
                currentPage={currentPage}
                onNavigate={navigateToPage}
                productName={selectedProduct?.name}
              />
            </>
          )}

          {currentPage === 'onboarding' && (
            <OnboardingPage 
              onComplete={handleOnboardingComplete}
              onNavigate={navigateToPage}
            />
          )}

          {currentPage === 'login' && (
            <LoginPage 
              onLogin={handleLogin}
              onNavigate={navigateToPage}
            />
          )}

          {currentPage === 'home' && (
            <HomePage 
              onViewProduct={viewProduct}
              onAddToCart={addToCart}
              cartCount={cartCount}
              onNavigate={navigateToPage}
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
          )}

          {currentPage === 'search' && (
            <SearchPage
              onNavigate={navigateToPage}
              onViewProduct={viewProduct}
              onAddToCart={addToCart}
              cartCount={cartCount}
              products={products}
            />
          )}
          
          {currentPage === 'product' && selectedProduct && (
            <ProductDetailPage 
              product={selectedProduct}
              onBack={() => setCurrentPage('home')}
              onAddToCart={addToCart}
              cartCount={cartCount}
              onNavigate={navigateToPage}
            />
          )}
          
          {currentPage === 'cart' && (
            <CartPage 
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onBack={() => setCurrentPage('home')}
              onCheckout={() => setCurrentPage('checkout')}
              cartTotal={cartTotal}
              cartCount={cartCount}
              onNavigate={navigateToPage}
            />
          )}
          
          {currentPage === 'checkout' && (
            <CheckoutPage 
              cartItems={cartItems}
              cartTotal={cartTotal}
              onBack={() => setCurrentPage('cart')}
              onComplete={handleCheckoutComplete}
              cartCount={cartCount}
              onNavigate={navigateToPage}
            />
          )}

          {currentPage === 'success' && (
            <OrderSuccessPage
              onNavigate={navigateToPage}
              orderNumber={orderNumber}
            />
          )}
          
          {currentPage === 'profile' && (
            <ProfilePage 
              onNavigate={navigateToPage}
              cartCount={cartCount}
              onLogout={handleLogout}
            />
          )}
          
          {currentPage === 'orders' && (
            <OrdersPage 
              onNavigate={navigateToPage}
              cartCount={cartCount}
            />
          )}

          {currentPage === 'orderDetail' && (
            <OrderDetailPage
              onNavigate={navigateToPage}
              cartCount={cartCount}
            />
          )}

          {currentPage === 'wishlist' && (
            <WishlistPage 
              onNavigate={navigateToPage}
              onAddToCart={addToCart}
              cartCount={cartCount}
            />
          )}

          {currentPage === 'notifications' && (
            <NotificationsPage
              onNavigate={navigateToPage}
              cartCount={cartCount}
            />
          )}

          {currentPage === 'settings' && (
            <SettingsPage
              onNavigate={navigateToPage}
              cartCount={cartCount}
            />
          )}

          {currentPage === 'editProfile' && (
            <EditProfilePage
              onNavigate={navigateToPage}
              cartCount={cartCount}
            />
          )}

          {currentPage === 'changePassword' && (
            <ChangePasswordPage
              onNavigate={navigateToPage}
              cartCount={cartCount}
            />
          )}

          {currentPage === 'addresses' && (
            <AddressesPage
              onNavigate={navigateToPage}
              onEditAddress={setEditingAddress}
              cartCount={cartCount}
            />
          )}

          {currentPage === 'addAddress' && (
            <AddAddressPage
              onNavigate={navigateToPage}
              cartCount={cartCount}
              editAddress={editingAddress}
            />
          )}

          {currentPage === 'categories' && (
            <CategoriesPage
              onNavigate={navigateToPage}
              onViewProduct={viewProduct}
              cartCount={cartCount}
              products={products}
            />
          )}

          {!['onboarding', 'login', 'success'].includes(currentPage) && (
            <>
              <Navigation 
                currentPage={currentPage}
                onNavigate={navigateToPage}
                cartCount={cartCount}
              />
              <LiveChat />
            </>
          )}
        </div>
        </WishlistProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}