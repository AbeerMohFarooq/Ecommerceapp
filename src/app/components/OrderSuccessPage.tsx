import { CheckCircle, Home, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface OrderSuccessPageProps {
  onNavigate: (page: Page) => void;
  orderNumber: string;
}

export function OrderSuccessPage({ onNavigate, orderNumber }: OrderSuccessPageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center px-4 transition-colors">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-600 dark:bg-emerald-600 rounded-full mb-6 animate-bounce shadow-lg dark:shadow-emerald-600/20">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {t('success.orderPlaced')}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {t('success.thankYou')}
          </p>
          
          <div className="inline-block bg-white dark:bg-gray-800 px-6 py-3 rounded-full border-2 border-emerald-600 dark:border-emerald-500 transition-colors">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('success.orderNumber')}</p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{orderNumber}</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl dark:shadow-2xl mb-6 border border-gray-100 dark:border-gray-700 transition-colors">
          <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">{t('success.whatNext')}</h2>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{t('success.step1')}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('success.step1Desc')}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{t('success.step2')}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('success.step2Desc')}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{t('success.step3')}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('success.step3Desc')}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800/30 transition-colors">
            <p className="text-sm text-emerald-800 dark:text-emerald-300 text-center">
              📧 {t('success.emailSent')}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => onNavigate('orders')}
            className="w-full bg-emerald-600 dark:bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            {t('success.trackOrder')}
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-gray-300 dark:border-gray-700 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            {t('success.continueShopping')}
          </button>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('success.needHelp')}{' '}
            <button className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
              {t('success.contactSupport')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
