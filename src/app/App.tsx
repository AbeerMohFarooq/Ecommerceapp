import { useEffect, useState } from 'react';
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

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  governorate: string;
  area: string;
  block: string;
  street: string;
  building: string;
  floor?: string;
  apartment?: string;
  avenue?: string;
  additionalDirections?: string;
  paciNumber?: string;
  isDefault: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('onboarding');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productReturnPage, setProductReturnPage] = useState<Page>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      name: 'Sarah Ahmed',
      phone: '+965 9999 8888',
      governorate: 'Hawalli',
      area: 'Salmiya',
      block: '5',
      street: '52',
      building: '12',
      floor: '2',
      apartment: '4',
      avenue: '3',
      additionalDirections: 'Near Laila Gallery, white building',
      isDefault: true
    },
    {
      id: '2',
      label: 'Office',
      name: 'Sarah Ahmed',
      phone: '+965 9999 8888',
      governorate: 'Capital',
      area: 'Kuwait City',
      block: '3',
      street: '15',
      building: 'Tower A',
      floor: '12',
      apartment: '1205',
      isDefault: false
    }
  ]);

  // Load products on mount
  useEffect(() => {
    productApi.getAllProducts().then(setProducts);
  }, []);

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

  const viewProduct = (product: Product, returnPage: Page) => {
    setSelectedProduct(product);
    setProductReturnPage(returnPage);
    setCurrentPage('product');
  };

  const navigateToPage = (page: Page) => {
    if (page !== 'categories') {
      setSelectedCategory(undefined);
    }
    if (page === 'addAddress') {
      setEditingAddress(null);
    }
    setCurrentPage(page);
  };

  const navigateToCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('categories');
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

  const saveAddress = (addressData: Omit<Address, 'id'> & { id?: string }) => {
    if (addressData.id) {
      setAddresses(prev =>
        prev.map(addr => {
          if (addr.id !== addressData.id) {
            return addressData.isDefault ? { ...addr, isDefault: false } : addr;
          }
          return { ...addressData, id: addressData.id };
        })
      );
    } else {
      setAddresses(prev => {
        const isFirstAddress = prev.length === 0;
        const newAddress: Address = {
          ...addressData,
          id: `addr-${Date.now()}`,
          isDefault: isFirstAddress ? true : addressData.isDefault
        };
        return [
          ...prev.map(addr => (newAddress.isDefault ? { ...addr, isDefault: false } : addr)),
          newAddress
        ];
      });
    }
    setEditingAddress(null);
    setCurrentPage('addresses');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: addr.id === id })));
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => {
      const nextAddresses = prev.filter(addr => addr.id !== id);
      if (nextAddresses.length === 0) {
        return nextAddresses;
      }
      if (!nextAddresses.some(addr => addr.isDefault)) {
        nextAddresses[0] = { ...nextAddresses[0], isDefault: true };
      }
      return nextAddresses;
    });
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
              products={products}
              onViewProduct={(product) => viewProduct(product, 'home')}
              onViewCategory={navigateToCategory}
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
              onViewProduct={(product) => viewProduct(product, 'search')}
              onAddToCart={addToCart}
              cartCount={cartCount}
              products={products}
            />
          )}
          
          {currentPage === 'product' && selectedProduct && (
            <ProductDetailPage 
              product={selectedProduct}
              onBack={() => setCurrentPage(productReturnPage)}
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
              addresses={addresses}
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
              addresses={addresses}
              onAddAddress={() => {
                setEditingAddress(null);
                setCurrentPage('addAddress');
              }}
              onEditAddress={(address) => {
                setEditingAddress(address);
                setCurrentPage('editAddress');
              }}
              onDeleteAddress={deleteAddress}
              onSetDefaultAddress={setDefaultAddress}
              cartCount={cartCount}
            />
          )}

          {(currentPage === 'addAddress' || currentPage === 'editAddress') && (
            <AddAddressPage
              onNavigate={navigateToPage}
              onSaveAddress={saveAddress}
              cartCount={cartCount}
              editAddress={currentPage === 'editAddress' ? editingAddress : null}
            />
          )}

          {currentPage === 'categories' && (
            <CategoriesPage
              onNavigate={navigateToPage}
              onViewProduct={(product) => viewProduct(product, 'categories')}
              cartCount={cartCount}
              products={products}
              selectedCategory={selectedCategory}
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
