import { ArrowLeft, MapPin, CreditCard, Wallet, Banknote, Lock } from 'lucide-react';
import { useState } from 'react';
import type { CartItem, Page } from '../App';

interface CheckoutPageProps {
  cartItems: CartItem[];
  cartTotal: number;
  onBack: () => void;
  onComplete: () => void;
  cartCount: number;
  onNavigate: (page: Page) => void;
}

export function CheckoutPage({ cartItems, cartTotal, onBack, onComplete, cartCount, onNavigate }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'knet' | 'card' | 'cash'>('knet');
  const [step, setStep] = useState<'address' | 'payment' | 'confirm'>('address');
  
  const deliveryFee = cartTotal >= 10 ? 0 : 2.000;
  const total = cartTotal + deliveryFee;

  const handlePlaceOrder = () => {
    // Simulate order placement
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="pb-20 md:pb-8 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Mobile Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 md:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-medium">Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Checkout</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[
            { id: 'address', label: 'Address', icon: MapPin },
            { id: 'payment', label: 'Payment', icon: Wallet },
            { id: 'confirm', label: 'Confirm', icon: Lock }
          ].map((s, index) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isCompleted = ['address', 'payment'].indexOf(step) > ['address', 'payment'].indexOf(s.id as 'address' | 'payment');
            
            return (
              <div key={s.id} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    isActive ? 'bg-emerald-600 text-white' :
                    isCompleted ? 'bg-emerald-600 text-white' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-600 dark:text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`h-0.5 flex-1 mx-2 transition-colors ${
                    isCompleted ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 mb-6 md:mb-0">
            {/* Delivery Address */}
            {step === 'address' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
                <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Delivery Address</h2>
                
                {/* Saved Addresses */}
                <div className="space-y-3 mb-4">
                  <button className="w-full p-4 border-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-left transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-medium text-gray-900 dark:text-white">Home</span>
                      </div>
                      <span className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-full">Default</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Block 5, Street 52, House 12</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Salmiya, Kuwait</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">+965 9999 8888</p>
                  </button>

                  <button className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-600 dark:hover:border-emerald-500 rounded-lg text-left transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">Office</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Al-Hamra Tower, Floor 15</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Kuwait City, Kuwait</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">+965 9999 7777</p>
                  </button>
                </div>

                <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-emerald-600 dark:text-emerald-400 font-medium hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors">
                  + Add New Address
                </button>

                <button
                  onClick={() => setStep('payment')}
                  className="w-full mt-6 bg-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Payment Method */}
            {step === 'payment' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
                <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Payment Method</h2>
                
                <div className="space-y-3 mb-6">
                  {/* KNET */}
                  <button
                    onClick={() => setPaymentMethod('knet')}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                      paymentMethod === 'knet' 
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-500' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-600 dark:hover:border-emerald-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'knet' ? 'border-emerald-600 dark:border-emerald-500' : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {paymentMethod === 'knet' && (
                          <div className="w-3 h-3 bg-emerald-600 dark:bg-emerald-500 rounded-full"></div>
                        )}
                      </div>
                      <Wallet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">KNET</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Pay securely with your KNET card</p>
                      </div>
                      <div className="text-2xl">🇰🇼</div>
                    </div>
                  </button>

                  {/* Credit/Debit Card */}
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                      paymentMethod === 'card' 
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-500' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-600 dark:hover:border-emerald-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-emerald-600 dark:border-emerald-500' : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {paymentMethod === 'card' && (
                          <div className="w-3 h-3 bg-emerald-600 dark:bg-emerald-500 rounded-full"></div>
                        )}
                      </div>
                      <CreditCard className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">Credit/Debit Card</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Visa, Mastercard accepted</p>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-xl">💳</span>
                      </div>
                    </div>
                  </button>

                  {/* Cash on Delivery */}
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                      paymentMethod === 'cash' 
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-500' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-600 dark:hover:border-emerald-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'cash' ? 'border-emerald-600 dark:border-emerald-500' : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {paymentMethod === 'cash' && (
                          <div className="w-3 h-3 bg-emerald-600 dark:bg-emerald-500 rounded-full"></div>
                        )}
                      </div>
                      <Banknote className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">Cash on Delivery</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Pay when you receive your order</p>
                      </div>
                      <div className="text-2xl">💵</div>
                    </div>
                  </button>
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6 border border-blue-200 dark:border-blue-800/30 transition-colors">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <p className="text-xs text-blue-700 dark:text-blue-300">Your payment information is encrypted and secure</p>
                </div>

                <button
                  onClick={() => setStep('confirm')}
                  className="w-full bg-emerald-600 dark:bg-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-700 transition-colors"
                >
                  Continue to Confirm
                </button>
              </div>
            )}

            {/* Order Confirmation */}
            {step === 'confirm' && (
              <div className="space-y-4">
                {/* Order Items */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
                  <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Order Items ({cartItems.length})</h2>
                  <div className="space-y-3">
                    {cartItems.map((item) => {
                      const itemPrice = item.discount 
                        ? item.price * (1 - item.discount / 100) 
                        : item.price;
                      
                      return (
                        <div key={item.id} className="flex gap-3">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm line-clamp-1 text-gray-900 dark:text-white">{item.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">KD {(itemPrice * item.quantity).toFixed(3)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Details */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold">Delivery Address</h2>
                    <button
                      onClick={() => setStep('address')}
                      className="text-sm text-emerald-600 font-medium"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Home</p>
                      <p className="text-sm text-gray-700">Block 5, Street 52, House 12</p>
                      <p className="text-sm text-gray-700">Salmiya, Kuwait</p>
                      <p className="text-sm text-gray-600 mt-1">+965 9999 8888</p>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold">Payment Method</h2>
                    <button
                      onClick={() => setStep('payment')}
                      className="text-sm text-emerald-600 font-medium"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    {paymentMethod === 'knet' && (
                      <>
                        <Wallet className="w-5 h-5 text-emerald-600" />
                        <span className="font-medium">KNET</span>
                        <span className="text-2xl ml-auto">🇰🇼</span>
                      </>
                    )}
                    {paymentMethod === 'card' && (
                      <>
                        <CreditCard className="w-5 h-5 text-gray-700" />
                        <span className="font-medium">Credit/Debit Card</span>
                        <span className="text-xl ml-auto">💳</span>
                      </>
                    )}
                    {paymentMethod === 'cash' && (
                      <>
                        <Banknote className="w-5 h-5 text-gray-700" />
                        <span className="font-medium">Cash on Delivery</span>
                        <span className="text-2xl ml-auto">💵</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors"
                >
                  Place Order - KD {total.toFixed(3)}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-24">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Items ({cartItems.length})</span>
                  <span className="font-medium">KD {cartTotal.toFixed(3)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  {deliveryFee === 0 ? (
                    <span className="font-medium text-green-600">FREE</span>
                  ) : (
                    <span className="font-medium">KD {deliveryFee.toFixed(3)}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold">Total</span>
                <span className="font-bold text-xl text-emerald-600">
                  KD {total.toFixed(3)}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-2">Estimated Delivery</p>
                <p className="font-medium">Tomorrow, Feb 9</p>
                <p className="text-xs text-gray-600 mt-1">10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
