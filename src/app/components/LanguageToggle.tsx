import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
    >
      <Globe className="w-4 h-4 text-gray-600" />
      <span className="text-gray-700">{language === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
}
