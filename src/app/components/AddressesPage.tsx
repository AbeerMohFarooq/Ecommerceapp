import { ArrowLeft, MapPin, Plus, Edit2, Trash2, Home, Briefcase, Star } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface Address {
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
  isDefault: boolean;
}

interface AddressesPageProps {
  onNavigate: (page: Page) => void;
  onEditAddress: (address: Address) => void;
  cartCount: number;
}

export function AddressesPage({ onNavigate, onEditAddress, cartCount }: AddressesPageProps) {
  const { t, isRTL } = useLanguage();
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

  const setDefaultAddress = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

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
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => onNavigate('profile')} className="text-gray-700">
                <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
              <div>
                <h1 className="text-xl font-bold">{t('addresses.title')}</h1>
                <p className="text-sm text-gray-600">{addresses.length} {t('addresses.saved')}</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('addAddress')}
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
            <h2 className="text-2xl font-bold mb-2">{t('addresses.empty')}</h2>
            <p className="text-gray-600 mb-6">{t('addresses.emptyDesc')}</p>
            <button
              onClick={() => onNavigate('addAddress')}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t('addresses.addFirst')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => {
              const Icon = getIcon(address.label);
              
              return (
                <div
                  key={address.id}
                  className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{address.label}</h3>
                        {address.isDefault && (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                            <Star className="w-3 h-3 fill-emerald-600" />
                            {t('addresses.default')}
                          </span>
                        )}
                      </div>
                      
                      <p className="font-medium text-gray-900 mb-1">{address.name}</p>
                      <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                      
                      <div className="text-sm text-gray-700 space-y-0.5">
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
                          <p className="text-gray-600 italic">{address.additionalDirections}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(address.id)}
                        className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        {t('addresses.setDefault')}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onEditAddress(address);
                        onNavigate('editAddress');
                      }}
                      className="flex-1 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      {t('common.edit')}
                    </button>
                    {!address.isDefault && (
                      <button
                        onClick={() => deleteAddress(address.id)}
                        className="py-2 px-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
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

        {/* Info Card */}
        {addresses.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-2">{t('addresses.deliveryInfo')}</h4>
            <ul className="text-sm text-blue-800 space-y-1">
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
