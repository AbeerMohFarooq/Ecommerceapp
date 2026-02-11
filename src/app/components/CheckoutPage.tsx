import { ArrowLeft, MapPin, CreditCard, Wallet, Banknote, Lock } from 'lucide-react';
import { useState } from 'react';
import type { Address, CartItem, Page } from '../App';

interface CheckoutPageProps {
  cartItems: CartItem[];
  cartTotal: number;
  addresses: Address[];
  onBack: () => void;
  onComplete: () => void;
  cartCount: number;
  onNavigate: (page: Page) => void;
}

export function CheckoutPage({ cartItems, cartTotal, addresses, onBack, onComplete, cartCount, onNavigate }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'knet' | 'card' | 'cash'>('knet');
  const [step, setStep] = useState<'address' | 'payment' | 'confirm'>('address');
  const [selectedAddressId, setSelectedAddressId] = useState<string>(() => addresses.find(addr => addr.isDefault)?.id || addresses[0]?.id || '');

  const deliveryFee = cartTotal >= 10 ? 0 : 2.0;
  const total = cartTotal + deliveryFee;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const estimatedDelivery = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).format(tomorrow);

  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId) || addresses[0];

  const handlePlaceOrder = () => {
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pb-20 md:pb-8 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your cart is empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add items to your cart before checking out.</p>
          <button
            onClick={() => onNavigate('cart')}
            className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-8 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 md:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-medium">Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Checkout</h1>
            <div className="w-8" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
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
                    isActive || isCompleted ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-600 dark:text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`h-0.5 flex-1 mx-2 transition-colors ${isCompleted ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-2 mb-6 md:mb-0">
            {step === 'address' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
                <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Delivery Address</h2>

                {addresses.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No saved addresses found.</p>
                  </div>
                ) : (
                  <div className="space-y-3 mb-4">
                    {addresses.map(address => {
                      const isSelected = address.id === selectedAddressId;
                      return (
                        <button
                          key={address.id}
                          onClick={() => setSelectedAddressId(address.id)}
                          className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-emerald-600 dark:hover:border-emerald-500'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <MapPin className={`w-4 h-4 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400'}`} />
                              <span className="font-medium text-gray-900 dark:text-white">{address.label}</span>
                            </div>
                            {address.isDefault && (
                              <span className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-full">Default</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Block {address.block}, Street {address.street}, {address.building}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{address.area}, {address.governorate}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{address.phone}</p>
                        </button>
                      );
                    })}
                  </div>
                )}

                <button
                  onClick={() => onNavigate('addAddress')}
                  className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-emerald-600 dark:text-emerald-400 font-medium hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors"
                >
                  + Add New Address
                </button>

                <button
                  disabled={!selectedAddress}
                  onClick={() => setStep('payment')}
                  className="w-full mt-6 bg-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
                <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Payment Method</h2>

                <div className="space-y-3 mb-6">
                  {[
                    {
                      key: 'knet' as const,
                      title: 'KNET',
                      description: 'Pay securely with your KNET card',
                      icon: Wallet,
                      iconClass: 'text-emerald-600 dark:text-emerald-400',
                      badge: '🇰🇼'
                    },
                    {
                      key: 'card' as const,
                      title: 'Credit/Debit Card',
                      description: 'Visa, Mastercard accepted',
                      icon: CreditCard,
                      iconClass: 'text-gray-700 dark:text-gray-400',
                      badge: '💳'
                    },
                    {
                      key: 'cash' as const,
                      title: 'Cash on Delivery',
                      description: 'Pay when you receive your order',
                      icon: Banknote,
                      iconClass: 'text-gray-700 dark:text-gray-400',
                      badge: '💵'
                    }
                  ].map(option => {
                    const Icon = option.icon;
                    const selected = paymentMethod === option.key;
                    return (
                      <button
                        key={option.key}
                        onClick={() => setPaymentMethod(option.key)}
                        className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                          selected
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-500'
                            : 'border-gray-200 dark:border-gray-700 hover:border-emerald-600 dark:hover:border-emerald-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selected ? 'border-emerald-600 dark:border-emerald-500' : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {selected && <div className="w-3 h-3 bg-emerald-600 dark:bg-emerald-500 rounded-full" />}
                          </div>
                          <Icon className={`w-5 h-5 ${option.iconClass}`} />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">{option.title}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{option.description}</p>
                          </div>
                          <div className="text-2xl">{option.badge}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6 border border-blue-200 dark:border-blue-800/30 transition-colors">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <p className="text-xs text-blue-700 dark:text-blue-300">Your payment information is encrypted and secure</p>
                </div>

                <button
                  onClick={() => setStep('confirm')}
                  className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Continue to Confirm
                </button>
              </div>
            )}

            {step === 'confirm' && (
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
                  <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Order Items ({cartItems.length})</h2>
                  <div className="space-y-3">
                    {cartItems.map(item => {
                      const itemPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
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
                            <p className="font-medium text-sm text-gray-900 dark:text-white">KD {(itemPrice * item.quantity).toFixed(3)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold text-gray-900 dark:text-white">Delivery Address</h2>
                    <button onClick={() => setStep('address')} className="text-sm text-emerald-600 font-medium">
                      Change
                    </button>
                  </div>
                  {selectedAddress ? (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedAddress.label}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Block {selectedAddress.block}, Street {selectedAddress.street}, {selectedAddress.building}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{selectedAddress.area}, {selectedAddress.governorate}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedAddress.phone}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">No address selected</p>
                  )}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold text-gray-900 dark:text-white">Payment Method</h2>
                    <button onClick={() => setStep('payment')} className="text-sm text-emerald-600 font-medium">
                      Change
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    {paymentMethod === 'knet' && (
                      <>
                        <Wallet className="w-5 h-5 text-emerald-600" />
                        <span className="font-medium text-gray-900 dark:text-white">KNET</span>
                        <span className="text-2xl ml-auto">🇰🇼</span>
                      </>
                    )}
                    {paymentMethod === 'card' && (
                      <>
                        <CreditCard className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">Credit/Debit Card</span>
                        <span className="text-xl ml-auto">💳</span>
                      </>
                    )}
                    {paymentMethod === 'cash' && (
                      <>
                        <Banknote className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">Cash on Delivery</span>
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

          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-24 transition-colors">
              <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Order Summary</h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Items ({cartItems.length})</span>
                  <span className="font-medium text-gray-900 dark:text-white">KD {cartTotal.toFixed(3)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                  {deliveryFee === 0 ? (
                    <span className="font-medium text-green-600">FREE</span>
                  ) : (
                    <span className="font-medium text-gray-900 dark:text-white">KD {deliveryFee.toFixed(3)}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-900 dark:text-white">Total</span>
                <span className="font-bold text-xl text-emerald-600">KD {total.toFixed(3)}</span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Estimated Delivery</p>
                <p className="font-medium text-gray-900 dark:text-white">{estimatedDelivery}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
