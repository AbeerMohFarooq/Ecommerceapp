import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface OnboardingPageProps {
  onComplete: () => void;
  onNavigate: (page: Page) => void;
}

const slides = [
  {
    id: 1,
    emoji: '🛍️',
    titleKey: 'onboarding.slide1Title',
    descKey: 'onboarding.slide1Desc',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 2,
    emoji: '💳',
    titleKey: 'onboarding.slide2Title',
    descKey: 'onboarding.slide2Desc',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: 3,
    emoji: '🚚',
    titleKey: 'onboarding.slide3Title',
    descKey: 'onboarding.slide3Desc',
    color: 'from-purple-400 to-pink-500'
  }
];

export function OnboardingPage({ onComplete, onNavigate }: OnboardingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, isRTL } = useLanguage();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col transition-colors">
      {/* Skip Button */}
      <div className="p-4 flex justify-end">
        <button
          onClick={skip}
          className="text-gray-600 dark:text-gray-400 font-medium hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
        >
          {t('onboarding.skip')}
        </button>
      </div>

      {/* Slides */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className={`w-64 h-64 rounded-full bg-gradient-to-br ${slide.color} flex items-center justify-center mb-8 shadow-2xl`}>
          <span className="text-8xl">{slide.emoji}</span>
        </div>

        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white transition-colors">
          {t(slide.titleKey)}
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 text-lg max-w-md mb-8 transition-colors">
          {t(slide.descKey)}
        </p>

        {/* Dots Indicator */}
        <div className="flex items-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-emerald-600' 
                  : 'w-2 bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 font-medium hover:text-gray-800 dark:hover:text-gray-300 disabled:opacity-0 transition-colors ${
            isRTL ? 'flex-row-reverse' : ''
          }`}
        >
          <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          <span>{t('onboarding.back')}</span>
        </button>

        <button
          onClick={nextSlide}
          className={`flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors ${
            isRTL ? 'flex-row-reverse' : ''
          }`}
        >
          <span>
            {currentSlide === slides.length - 1 
              ? t('onboarding.getStarted') 
              : t('onboarding.next')
            }
          </span>
          <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}
