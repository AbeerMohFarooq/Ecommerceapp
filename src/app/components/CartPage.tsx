import { ArrowLeft, Trash2, Plus, Minus, Tag } from 'lucide-react';
import type { CartItem, Page } from '../App';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onBack: () => void;
  onCheckout: () => void;
  cartTotal: number;
  cartCount: number;
  onNavigate: (page: Page) => void;
}

export function CartPage({ 
  cartItems, 
  onUpdateQuantity, 
  onRemove, 
  onBack, 
  onCheckout,
  cartTotal,
  cartCount,
  onNavigate 
}: CartPageProps) {
  const deliveryFee = cartTotal >= 10 ? 0 : 2.000;
  const total = cartTotal + deliveryFee;

  return (
    <div className="pb-20 md:pb-8 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-700">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-medium">Back</span>
            </button>
            <h1 className="text-xl font-bold">Shopping Cart ({cartCount})</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <button
              onClick={onBack}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4 mb-6 md:mb-0">
              {cartItems.map((item) => {
                const itemPrice = item.discount 
                  ? item.price * (1 - item.discount / 100) 
                  : item.price;
                const itemTotal = itemPrice * item.quantity;

                return (
                  <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h3>
                            <p className="text-xs text-gray-500">{item.category}</p>
                          </div>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="ml-2 text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white rounded transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white rounded transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            {item.discount && (
                              <p className="text-xs text-gray-400 line-through">
                                KD {(item.price * item.quantity).toFixed(3)}
                              </p>
                            )}
                            <p className="font-bold text-emerald-600">
                              KD {itemTotal.toFixed(3)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-24">
                <h2 className="font-bold text-lg mb-4">Order Summary</h2>
                
                {/* Promo Code */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">KD {cartTotal.toFixed(3)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    {deliveryFee === 0 ? (
                      <span className="font-medium text-green-600">FREE</span>
                    ) : (
                      <span className="font-medium">KD {deliveryFee.toFixed(3)}</span>
                    )}
                  </div>
                  {deliveryFee === 0 && (
                    <div className="bg-green-50 text-green-700 text-xs p-2 rounded-lg">
                      🎉 You've qualified for free delivery!
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-emerald-600">
                    KD {total.toFixed(3)}
                  </span>
                </div>
                
                <button
                  onClick={onCheckout}
                  className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={onBack}
                  className="w-full mt-3 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Continue Shopping
                </button>

                <div className="mt-6 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Secure checkout with KNET</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Free returns within 14 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Authentic products only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
