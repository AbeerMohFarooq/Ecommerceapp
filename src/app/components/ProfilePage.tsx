import { User, MapPin, CreditCard, Bell, Globe, HelpCircle, LogOut, ChevronRight, Edit } from 'lucide-react';
import type { Page } from '../App';

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
  cartCount: number;
  onLogout?: () => void;
}

export function ProfilePage({ onNavigate, cartCount, onLogout }: ProfilePageProps) {
  const menuItems = [
    {
      icon: User,
      label: 'Personal Information',
      description: 'Update your details',
      onClick: () => onNavigate('editProfile')
    },
    {
      icon: MapPin,
      label: 'Saved Addresses',
      description: '2 addresses saved',
      onClick: () => onNavigate('addresses')
    },
    {
      icon: CreditCard,
      label: 'Payment Methods',
      description: 'Manage your cards',
      onClick: () => onNavigate('settings')
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Order updates & offers',
      onClick: () => onNavigate('notifications')
    },
    {
      icon: Globe,
      label: 'Language',
      description: 'English',
      onClick: () => onNavigate('settings')
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'FAQs and contact',
      onClick: () => onNavigate('settings')
    }
  ];

  return (
    <div className="pb-20 md:pb-8 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 md:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Profile</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* User Info Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-700 dark:to-teal-700 rounded-2xl p-6 text-white mb-6 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <User className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Sarah Ahmed</h2>
              <p className="text-sm opacity-90">sarah.ahmed@email.com</p>
              <p className="text-sm opacity-90">+965 9999 8888</p>
            </div>
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
              <Edit className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs opacity-75">Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">850</p>
              <p className="text-xs opacity-75">Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs opacity-75">Wishlist</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6 transition-colors">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                }`}
              >
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Membership Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Premium Membership</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get exclusive benefits</p>
            </div>
            <div className="text-3xl">👑</div>
          </div>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-emerald-600 dark:text-emerald-400">✓</span>
              Free delivery on all orders
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-emerald-600 dark:text-emerald-400">✓</span>
              Early access to sales
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-emerald-600 dark:text-emerald-400">✓</span>
              Exclusive discounts up to 30%
            </li>
          </ul>
          <button className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-amber-500 hover:to-amber-700 dark:from-amber-600 dark:to-amber-700 dark:hover:from-amber-500 dark:hover:to-amber-600 transition-colors">
            Upgrade to Premium - KD 5/month
          </button>
        </div>

        {/* App Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6 transition-colors">
          <div className="grid grid-cols-2 gap-4 text-center">
            <button className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Terms of Service</p>
            </button>
            <button className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Privacy Policy</p>
            </button>
            <button className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">About Us</p>
            </button>
            <button className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Rate App</p>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 py-4 rounded-xl font-semibold border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors" onClick={onLogout}>
          <LogOut className="w-5 h-5" />
          Logout
        </button>

        {/* App Version */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 transition-colors">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}
