import { ArrowLeft, MapPin, Plus, Edit2, Trash2, Home, Briefcase, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Address, Page } from '../App';

interface AddressesPageProps {
  onNavigate: (page: Page) => void;
  addresses: Address[];
  onAddAddress: () => void;
  onEditAddress: (address: Address) => void;
  onDeleteAddress: (id: string) => void;
  onSetDefaultAddress: (id: string) => void;
  cartCount: number;
}

export function AddressesPage({
  onNavigate,
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefaultAddress,
  cartCount
}: AddressesPageProps) {
  const { t, isRTL } = useLanguage();

  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'home':
        return Home;
      case 'office':
        return Briefcase;
      default:
        return MapPin;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 transition-colors">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 md:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => onNavigate('profile')} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('addresses.title')}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{addresses.length} {t('addresses.saved')}</p>
              </div>
            </div>
            <button
              onClick={onAddAddress}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">{t('addresses.addNew')}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {addresses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📍</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{t('addresses.empty')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t('addresses.emptyDesc')}</p>
            <button
              onClick={onAddAddress}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t('addresses.addFirst')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map(address => {
              const Icon = getIcon(address.label);
              return (
                <div
                  key={address.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{address.label}</h3>
                        {address.isDefault && (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium px-2 py-1 rounded-full">
                            <Star className="w-3 h-3 fill-emerald-600 dark:fill-emerald-400" />
                            {t('addresses.default')}
                          </span>
                        )}
                      </div>

                      <p className="font-medium text-gray-900 dark:text-white mb-1">{address.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{address.phone}</p>

                      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-0.5">
                        <p>
                          {t('addresses.block')} {address.block}, {t('addresses.street')} {address.street}
                          {address.avenue && `, ${t('addresses.avenue')} ${address.avenue}`}
                        </p>
                        <p>
                          {t('addresses.building')} {address.building}
                          {address.floor && `, ${t('addresses.floor')} ${address.floor}`}
                          {address.apartment && `, ${t('addresses.apartment')} ${address.apartment}`}
                        </p>
                        <p className="font-medium">{address.area}, {address.governorate}</p>
                        {address.additionalDirections && (
                          <p className="text-gray-600 dark:text-gray-500 italic">{address.additionalDirections}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => onSetDefaultAddress(address.id)}
                        className="flex-1 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        {t('addresses.setDefault')}
                      </button>
                    )}
                    <button
                      onClick={() => onEditAddress(address)}
                      className="flex-1 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      {t('common.edit')}
                    </button>
                    {!address.isDefault && (
                      <button
                        onClick={() => onDeleteAddress(address.id)}
                        className="py-2 px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {addresses.length > 0 && (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-xl p-4 transition-colors">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">{t('addresses.deliveryInfo')}</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• {t('addresses.deliveryInfo1')}</li>
              <li>• {t('addresses.deliveryInfo2')}</li>
              <li>• {t('addresses.deliveryInfo3')}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
