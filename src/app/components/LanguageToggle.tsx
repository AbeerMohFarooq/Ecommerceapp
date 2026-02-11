import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
    >
      <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      <span className="text-gray-700 dark:text-gray-200">{language === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
}
