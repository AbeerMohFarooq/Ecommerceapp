import React from 'react';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Slider } from '@/app/components/ui/slider';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  priceRange: [number, number]; // [min, max]
  currentPriceRange: [number, number];
  onCategoryChange: (category: string, checked: boolean) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  className?: string;
}

export function FilterSidebar({
  categories,
  selectedCategories,
  priceRange,
  currentPriceRange,
  onCategoryChange,
  onPriceChange,
  onClearFilters,
  className,
}: FilterSidebarProps) {
  const { t, isRTL } = useLanguage();

  // Local state for slider to prevent excessive updates while dragging
  const [localPrice, setLocalPrice] = React.useState(currentPriceRange);

  React.useEffect(() => {
    setLocalPrice(currentPriceRange);
  }, [currentPriceRange]);

  const handleSliderChange = (value: number[]) => {
    setLocalPrice([value[0], value[1]]);
  };

  const handleSliderCommit = (value: number[]) => {
    onPriceChange([value[0], value[1]]);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {t('search.filters')}
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-primary h-auto p-0"
            >
              {t('search.reset')}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Categories Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">
              {t('categories.title')}
            </h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox 
                    id={`cat-${category}`} 
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => 
                      onCategoryChange(category, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`cat-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm text-muted-foreground">
                {t('search.priceRange')}
              </h3>
              <span className="text-xs font-medium">
                {localPrice[0]} - {localPrice[1]} {t('common.kd')}
              </span>
            </div>
            
            <Slider
              defaultValue={[priceRange[0], priceRange[1]]}
              value={[localPrice[0], localPrice[1]]}
              min={priceRange[0]}
              max={priceRange[1]}
              step={1}
              onValueChange={handleSliderChange}
              onValueCommit={handleSliderCommit}
              className="py-4"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{priceRange[0]} {t('common.kd')}</span>
              <span>{priceRange[1]} {t('common.kd')}</span>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}