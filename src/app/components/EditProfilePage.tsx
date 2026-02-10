import { ArrowLeft, Camera, Save, User, Mail, Phone, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface EditProfilePageProps {
  onNavigate: (page: Page) => void;
  cartCount: number;
}

export function EditProfilePage({ onNavigate, cartCount }: EditProfilePageProps) {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Ahmed',
    email: 'sarah.ahmed@email.com',
    phone: '+965 9999 8888',
    dateOfBirth: '1995-05-15',
    gender: 'female'
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    onNavigate('profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('profile')} className="text-gray-700">
              <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <h1 className="text-xl font-bold">{t('profile.editProfile')}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-bold mb-4">{t('profile.profilePhoto')}</h3>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="font-medium mb-1">{t('profile.uploadPhoto')}</p>
                <p className="text-sm text-gray-600">{t('profile.photoRequirements')}</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
            <h3 className="font-bold mb-4">{t('profile.personalInfo')}</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.firstName')} *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.lastName')} *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email')} *
              </label>
              <div className="relative">
                <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.phone')} *
              </label>
              <div className="relative">
                <Phone className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.dateOfBirth')}
              </label>
              <div className="relative">
                <Calendar className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.gender')}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'male', label: t('profile.male') },
                  { value: 'female', label: t('profile.female') },
                  { value: 'other', label: t('profile.preferNotToSay') }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('gender', option.value)}
                    className={`py-3 px-4 rounded-lg border-2 transition-all ${
                      formData.gender === option.value
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Password Change Link */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <button
              type="button"
              onClick={() => onNavigate('changePassword')}
              className="w-full flex items-center justify-between text-left"
            >
              <div>
                <p className="font-medium">{t('settings.changePassword')}</p>
                <p className="text-sm text-gray-600">{t('profile.passwordDesc')}</p>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-gray-50 pt-4 pb-6 -mx-4 px-4 border-t border-gray-200 space-y-3">
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {t('profile.saveChanges')}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="w-full bg-white text-gray-700 py-4 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {t('common.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
