import { ArrowLeft, Package, MapPin, CreditCard, Phone, CheckCircle, Truck, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface OrderDetailPageProps {
  onNavigate: (page: Page) => void;
  cartCount: number;
}

export function OrderDetailPage({ onNavigate, cartCount }: OrderDetailPageProps) {
  const { t, isRTL } = useLanguage();

  const order = {
    id: 'ORD-2024-001',
    date: '2024-02-07',
    status: 'shipping',
    items: [
      {
        id: '1',
        name: 'Luxury Eau De Parfum',
        price: 45.5,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?w=400'
      },
      {
        id: '2',
        name: 'Designer Sunglasses',
        price: 42.5,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1732139637217-56c77369e25c?w=400'
      }
    ],
    subtotal: 130.5,
    total: 130.5,
    paymentMethod: 'KNET',
    address: {
      name: 'Home',
      line1: 'Block 5, Street 52, House 12',
      line2: 'Salmiya, Kuwait',
      phone: '+965 9999 8888'
    },
    tracking: [
      { status: 'placed', label: t('tracking.placed'), time: 'Feb 7, 10:30 AM', completed: true },
      { status: 'confirmed', label: t('tracking.confirmed'), time: 'Feb 7, 10:45 AM', completed: true },
      { status: 'packed', label: t('tracking.packed'), time: 'Feb 7, 2:30 PM', completed: true },
      { status: 'shipped', label: t('tracking.shipped'), time: 'Feb 8, 9:00 AM', completed: true },
      { status: 'delivering', label: t('tracking.delivering'), time: t('tracking.expected'), completed: false },
      { status: 'delivered', label: t('tracking.delivered'), time: '-', completed: false }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 transition-colors">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 md:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('orders')} className="text-gray-700 dark:text-gray-300">
              <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('orderDetail.title')}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{order.id}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-xl p-4 mb-6 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-300">{t('orderDetail.outForDelivery')}</p>
              <p className="text-sm text-blue-700 dark:text-blue-400">{t('orderDetail.expectedToday')}</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('orders')}
            className="w-full mt-3 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {t('orders.trackOrder')}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6 transition-colors">
          <h2 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">{t('orderDetail.tracking')}</h2>

          <div className="space-y-4">
            {order.tracking.map((step, index) => (
              <div key={step.status} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }`}>
                    {step.completed ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                  </div>
                  {index < order.tracking.length - 1 && (
                    <div className={`w-0.5 h-12 ${step.completed ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className={`font-medium ${step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{step.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6 transition-colors">
          <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">{t('checkout.orderItems')} ({order.items.length})</h2>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1 text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('common.qty')}: {item.quantity}</p>
                  <p className="font-semibold text-emerald-600 mt-1">
                    {t('common.kd')} {(item.price * item.quantity).toFixed(3)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t('cart.subtotal')}</span>
              <span className="font-medium text-gray-900 dark:text-white">{t('common.kd')} {order.subtotal.toFixed(3)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t('cart.delivery')}</span>
              <span className="font-medium text-green-600">{t('cart.free')}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="font-bold text-gray-900 dark:text-white">{t('cart.total')}</span>
              <span className="font-bold text-lg text-emerald-600">{t('common.kd')} {order.total.toFixed(3)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6 transition-colors">
          <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">{t('checkout.deliveryAddress')}</h2>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium mb-1 text-gray-900 dark:text-white">{order.address.name}</p>
              <p className="text-gray-700 dark:text-gray-300">{order.address.line1}</p>
              <p className="text-gray-700 dark:text-gray-300">{order.address.line2}</p>
              <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{order.address.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6 transition-colors">
          <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">{t('checkout.paymentMethod')}</h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{order.paymentMethod}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('orderDetail.paidOn')} {order.date}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('settings')}
            className="py-3 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            {t('orderDetail.contactSupport')}
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            {t('orders.orderAgain')}
          </button>
        </div>

        <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {t('orderDetail.needHelp')}{' '}
            <button onClick={() => onNavigate('settings')} className="text-emerald-600 font-medium hover:text-emerald-700">
              {t('orderDetail.contactUs')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
