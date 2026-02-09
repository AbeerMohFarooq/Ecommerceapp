import { ArrowLeft, Bell, Package, Tag, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface NotificationsPageProps {
  onNavigate: (page: Page) => void;
  cartCount: number;
}

interface Notification {
  id: string;
  type: 'order' | 'offer' | 'review';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: 'package' | 'tag' | 'star';
}

export function NotificationsPage({ onNavigate, cartCount }: NotificationsPageProps) {
  const { t, isRTL } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: t('notifications.orderDelivered'),
      message: t('notifications.orderDeliveredMsg'),
      time: '2 hours ago',
      read: false,
      icon: 'package'
    },
    {
      id: '2',
      type: 'offer',
      title: t('notifications.specialOffer'),
      message: t('notifications.specialOfferMsg'),
      time: '5 hours ago',
      read: false,
      icon: 'tag'
    },
    {
      id: '3',
      type: 'review',
      title: t('notifications.rateProduct'),
      message: t('notifications.rateProductMsg'),
      time: '1 day ago',
      read: true,
      icon: 'star'
    },
    {
      id: '4',
      type: 'order',
      title: t('notifications.orderShipped'),
      message: t('notifications.orderShippedMsg'),
      time: '2 days ago',
      read: true,
      icon: 'package'
    },
    {
      id: '5',
      type: 'offer',
      title: t('notifications.flashSale'),
      message: t('notifications.flashSaleMsg'),
      time: '3 days ago',
      read: true,
      icon: 'tag'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'package':
        return Package;
      case 'tag':
        return Tag;
      case 'star':
        return Star;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 text-blue-600';
      case 'offer':
        return 'bg-orange-100 text-orange-600';
      case 'review':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button onClick={() => onNavigate('profile')} className="text-gray-700">
                <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
              <div>
                <h1 className="text-xl font-bold">{t('profile.notifications')}</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600">
                    {unreadCount} {t('notifications.unread')}
                  </p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-emerald-600 font-medium hover:text-emerald-700"
              >
                {t('notifications.markAllRead')}
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔔</div>
            <h2 className="text-2xl font-bold mb-2">{t('notifications.empty')}</h2>
            <p className="text-gray-600">{t('notifications.emptyDesc')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.icon);
              
              return (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`bg-white rounded-xl p-4 border transition-all cursor-pointer ${
                    notification.read 
                      ? 'border-gray-200' 
                      : 'border-emerald-200 bg-emerald-50/30'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-semibold ${notification.read ? 'text-gray-900' : 'text-emerald-900'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Notification Settings */}
        {notifications.length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-bold text-lg mb-4">{t('notifications.settings')}</h3>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t('notifications.orderUpdates')}</p>
                  <p className="text-sm text-gray-600">{t('notifications.orderUpdatesDesc')}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t('notifications.promotions')}</p>
                  <p className="text-sm text-gray-600">{t('notifications.promotionsDesc')}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t('notifications.newArrivals')}</p>
                  <p className="text-sm text-gray-600">{t('notifications.newArrivalsDesc')}</p>
                </div>
                <input type="checkbox" className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
