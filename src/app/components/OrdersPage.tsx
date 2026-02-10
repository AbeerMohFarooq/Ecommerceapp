import { Package, Clock, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import type { Page } from '../App';

interface OrdersPageProps {
  onNavigate: (page: Page) => void;
  cartCount: number;
}

const orders = [
  {
    id: 'ORD-2024-001',
    date: '2024-02-07',
    status: 'delivered',
    items: 3,
    total: 89.500,
    deliveryDate: 'Feb 8, 2024',
    image: 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc3MDQ0NTE4OHww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-02-06',
    status: 'shipping',
    items: 2,
    total: 145.000,
    deliveryDate: 'Feb 9, 2024',
    image: 'https://images.unsplash.com/photo-1758171692659-024183c2c272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWclMjBsdXh1cnl8ZW58MXx8fHwxNzcwNDk0NDc3fDA&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 'ORD-2024-003',
    date: '2024-02-05',
    status: 'processing',
    items: 1,
    total: 199.000,
    deliveryDate: 'Feb 10, 2024',
    image: 'https://images.unsplash.com/photo-1760163180940-eecde9eda36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YXRjaCUyMGVsZWdhbnR8ZW58MXx8fHwxNzcwNDcxNTY0fDA&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 'ORD-2024-004',
    date: '2024-01-28',
    status: 'cancelled',
    items: 2,
    total: 65.750,
    deliveryDate: '-',
    image: 'https://images.unsplash.com/photo-1643168343279-3f93c2e592ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNvc21ldGljc3xlbnwxfHx8fDE3NzA1NDc1MTV8MA&ixlib=rb-4.1.0&q=80&w=400'
  }
];

const statusConfig = {
  delivered: {
    label: 'Delivered',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  shipping: {
    label: 'Out for Delivery',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  processing: {
    label: 'Processing',
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  }
};

export function OrdersPage({ onNavigate, cartCount }: OrdersPageProps) {
  return (
    <div className="pb-20 md:pb-8 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Mobile Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 md:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Orders</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Order Status Filters */}
        <div className="flex gap-2 overflow-x-auto mb-6 pb-2 scrollbar-hide">
          {['All', 'Processing', 'Shipping', 'Delivered', 'Cancelled'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                filter === 'All'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 dark:hover:bg-emerald-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-600 dark:hover:border-emerald-500'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">No orders yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start shopping to see your orders here!</p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all"
                >
                  <div className="p-4">
                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-lg text-gray-900 dark:text-white">{order.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.date}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${status.bgColor} dark:bg-opacity-20 ${status.borderColor} border dark:border-opacity-40`}>
                        <StatusIcon className={`w-4 h-4 ${status.color} dark:opacity-90`} />
                        <span className={`text-sm font-medium ${status.color} dark:text-opacity-90`}>
                          {status.label}
                        </span>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="flex gap-4 mb-3">
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={order.image}
                          alt="Order item"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {order.items} {order.items === 1 ? 'item' : 'items'}
                        </p>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">
                          KD {order.total.toFixed(3)}
                        </p>
                        {order.status !== 'cancelled' && (
                          <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">
                            Expected: {order.deliveryDate}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Tracking Progress (for active orders) */}
                    {(order.status === 'processing' || order.status === 'shipping') && (
                      <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Order Progress</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {order.status === 'processing' ? '50%' : '75%'}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all"
                            style={{
                              width: order.status === 'processing' ? '50%' : '75%'
                            }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-center gap-2">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      {order.status === 'delivered' && (
                        <button className="flex-1 py-2.5 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors">
                          Order Again
                        </button>
                      )}
                      {order.status === 'shipping' && (
                        <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-600 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">📞</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-sm text-gray-900 dark:text-white">Contact Support</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">We're here to help</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-600 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">❓</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-sm text-gray-900 dark:text-white">FAQs</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Common questions</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
