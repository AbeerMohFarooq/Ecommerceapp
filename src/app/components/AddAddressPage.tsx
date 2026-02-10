import { ArrowLeft, MapPin, Save, Home, Briefcase, User } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface AddAddressPageProps {
  onNavigate: (page: Page) => void;
  cartCount: number;
  editAddress?: any;
}

const kuwaitGovernorates = [
  'Capital',
  'Hawalli', 
  'Farwaniya',
  'Mubarak Al-Kabeer',
  'Ahmadi',
  'Jahra'
];

const areasByGovernorate: { [key: string]: string[] } = {
  'Capital': ['Kuwait City', 'Dasman', 'Sharq', 'Mirqab', 'Dasma', 'Kaifan', 'Mansouriya', 'Qadsiya', 'Yarmouk'],
  'Hawalli': ['Salmiya', 'Hawally', 'Jabriya', 'Bayan', 'Mishref', 'Salwa', 'Rumaithiya', 'Shaab'],
  'Farwaniya': ['Farwaniya', 'Jleeb Al-Shuyoukh', 'Khaitan', 'Ferdous', 'Andalous', 'Riggae', 'Rabiya'],
  'Mubarak Al-Kabeer': ['Sabah Al-Salem', 'Fnaitees', 'Adan', 'Qurain', 'Qusour', 'Messila', 'Sabhan'],
  'Ahmadi': ['Ahmadi', 'Fahaheel', 'Fintas', 'Mahboula', 'Mangaf', 'Abu Halifa', 'Sabahiya', 'Wafra'],
  'Jahra': ['Jahra', 'Sulaibiya', 'Qasr', 'Oyoun', 'Nasseem', 'Amghara', 'Taima']
};

export function AddAddressPage({ onNavigate, cartCount, editAddress }: AddAddressPageProps) {
  const { t, isRTL } = useLanguage();
  const isEdit = !!editAddress;

  const [formData, setFormData] = useState({
    label: editAddress?.label || '',
    name: editAddress?.name || '',
    phone: editAddress?.phone || '',
    governorate: editAddress?.governorate || '',
    area: editAddress?.area || '',
    block: editAddress?.block || '',
    street: editAddress?.street || '',
    avenue: editAddress?.avenue || '',
    building: editAddress?.building || '',
    floor: editAddress?.floor || '',
    apartment: editAddress?.apartment || '',
    additionalDirections: editAddress?.additionalDirections || '',
    paciNumber: editAddress?.paciNumber || ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Reset area when governorate changes
    if (field === 'governorate') {
      setFormData(prev => ({ ...prev, area: '' }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.label) newErrors.label = t('addresses.errors.labelRequired');
    if (!formData.name) newErrors.name = t('addresses.errors.nameRequired');
    if (!formData.phone) newErrors.phone = t('addresses.errors.phoneRequired');
    if (!formData.governorate) newErrors.governorate = t('addresses.errors.governorateRequired');
    if (!formData.area) newErrors.area = t('addresses.errors.areaRequired');
    if (!formData.block) newErrors.block = t('addresses.errors.blockRequired');
    if (!formData.street) newErrors.street = t('addresses.errors.streetRequired');
    if (!formData.building) newErrors.building = t('addresses.errors.buildingRequired');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Address saved:', formData);
      onNavigate('addresses');
    }
  };

  const labelIcons = [
    { value: 'Home', icon: Home, label: t('common.home') },
    { value: 'Office', icon: Briefcase, label: t('common.office') },
    { value: 'Other', icon: MapPin, label: t('addresses.other') }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 transition-colors">
      {/* Mobile Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 md:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('addresses')} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {isEdit ? t('addresses.editAddress') : t('addresses.addNewAddress')}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address Label */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">{t('addresses.addressLabel')}</h3>
            <div className="grid grid-cols-3 gap-3">
              {labelIcons.map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleChange('label', value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.label === value
                      ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${
                    formData.label === value 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`} />
                  <p className={`text-sm font-medium ${
                    formData.label === value 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {label}
                  </p>
                </button>
              ))}
            </div>
            {errors.label && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{errors.label}</p>}
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4 transition-colors">
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">{t('addresses.contactInfo')}</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('addresses.fullName')} *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.name ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder={t('addresses.enterName')}
              />
              {errors.name && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('auth.phone')} *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.phone ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="+965 XXXX XXXX"
              />
              {errors.phone && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Address Details - Kuwait Specific */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4 transition-colors">
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">{t('addresses.addressDetails')}</h3>
            
            {/* Governorate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('addresses.governorate')} *
              </label>
              <select
                value={formData.governorate}
                onChange={(e) => handleChange('governorate', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.governorate ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">{t('addresses.selectGovernorate')}</option>
                {kuwaitGovernorates.map(gov => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
              {errors.governorate && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.governorate}</p>}
            </div>

            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('addresses.area')} *
              </label>
              <select
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                disabled={!formData.governorate}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:opacity-50 ${
                  errors.area ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">{t('addresses.selectArea')}</option>
                {formData.governorate && areasByGovernorate[formData.governorate]?.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              {errors.area && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.area}</p>}
            </div>

            {/* Block, Street, Avenue */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('addresses.block')} *
                </label>
                <input
                  type="text"
                  value={formData.block}
                  onChange={(e) => handleChange('block', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.block ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="5"
                />
                {errors.block && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.block}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('addresses.street')} *
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleChange('street', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.street ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="52"
                />
                {errors.street && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.street}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('addresses.avenue')}
                </label>
                <input
                  type="text"
                  value={formData.avenue}
                  onChange={(e) => handleChange('avenue', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="3"
                />
              </div>
            </div>

            {/* Building */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('addresses.building')} *
              </label>
              <input
                type="text"
                value={formData.building}
                onChange={(e) => handleChange('building', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.building ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder={t('addresses.buildingPlaceholder')}
              />
              {errors.building && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.building}</p>}
            </div>

            {/* Floor & Apartment */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('addresses.floor')}
                </label>
                <input
                  type="text"
                  value={formData.floor}
                  onChange={(e) => handleChange('floor', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('addresses.apartment')}
                </label>
                <input
                  type="text"
                  value={formData.apartment}
                  onChange={(e) => handleChange('apartment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="4"
                />
              </div>
            </div>

            {/* Additional Directions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('addresses.additionalDirections')}
              </label>
              <textarea
                value={formData.additionalDirections}
                onChange={(e) => handleChange('additionalDirections', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder={t('addresses.directionsPlaceholder')}
              />
            </div>

            {/* PACI Number (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('addresses.paciNumber')} ({t('addresses.optional')})
              </label>
              <input
                type="text"
                value={formData.paciNumber}
                onChange={(e) => handleChange('paciNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="XXXXXXXXXXXX"
              />
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{t('addresses.paciHelp')}</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 pt-4 pb-6 -mx-4 px-4 border-t border-gray-200 dark:border-gray-800 transition-colors">
            <button
              type="submit"
              className="w-full bg-emerald-600 dark:bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isEdit ? t('addresses.updateAddress') : t('addresses.saveAddress')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
