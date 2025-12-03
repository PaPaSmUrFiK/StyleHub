import { useState, useEffect } from 'react';
import { OutfitDisplay } from './OutfitDisplay';
import { ItemSelector } from './ItemSelector';
import { Sparkles } from 'lucide-react';
import { clothingItems, presetOutfits, type ClothingItem } from '../../data/clothingData';

type OutfitBuilderProps = {
  onSaveOutfit: (outfit: any) => void;
  onNavigate: (page: string) => void;
};

export function OutfitBuilder({ onSaveOutfit, onNavigate }: OutfitBuilderProps) {
  const [selectedItems, setSelectedItems] = useState<{
    headwear: ClothingItem | null;
    top: ClothingItem | null;
    bottom: ClothingItem | null;
    shoes: ClothingItem | null;
  }>({
    headwear: null,
    top: null,
    bottom: null,
    shoes: null
  });

  // Load first preset on mount
  useEffect(() => {
    loadPreset(presetOutfits[0]);
  }, []);

  const loadPreset = (preset: typeof presetOutfits[0]) => {
    setSelectedItems({
      headwear: preset.items.headwear
        ? clothingItems.find(item => item.id === preset.items.headwear) || null
        : null,
      top: preset.items.top
        ? clothingItems.find(item => item.id === preset.items.top) || null
        : null,
      bottom: preset.items.bottom
        ? clothingItems.find(item => item.id === preset.items.bottom) || null
        : null,
      shoes: preset.items.shoes
        ? clothingItems.find(item => item.id === preset.items.shoes) || null
        : null,
    });
  };

  const handleSelectItem = (category: keyof typeof selectedItems, item: ClothingItem | null) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: item
    }));
  };

  const handleRandomize = () => {
    const randomPreset = presetOutfits[Math.floor(Math.random() * presetOutfits.length)];
    loadPreset(randomPreset);
  };

  const handleSave = () => {
    const outfit = {
      id: `outfit-${Date.now()}`,
      name: 'Новый образ',
      items: selectedItems,
      date: new Date().toISOString(),
      tags: ['новый']
    };
    onSaveOutfit(outfit);
  };

  const handleShare = () => {
    alert('Функция "Поделиться" будет реализована');
  };

  // Теперь ItemSelector сам загружает изображения из папок
  // items передается для обратной совместимости, но не используется
  const getCategoryItems = (category: 'headwear' | 'top' | 'bottom' | 'shoes') => {
    return clothingItems.filter(item => item.category === category);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      {/* Preset buttons */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-sm text-[#6B7280]">Готовые образы:</span>
        {presetOutfits.map((preset) => (
          <button
            key={preset.id}
            onClick={() => loadPreset(preset)}
            className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#374151] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Main split screen */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 min-h-[calc(100vh-200px)]">
        {/* Left: Outfit Display */}
        <OutfitDisplay
          selectedItems={selectedItems}
          onRandomize={handleRandomize}
          onSave={handleSave}
          onShare={handleShare}
        />

        {/* Right: Item Selectors */}
        <div className="space-y-4">
          <ItemSelector
            category="headwear"
            items={getCategoryItems('headwear')}
            selectedItem={selectedItems.headwear}
            onSelectItem={(item) => handleSelectItem('headwear', item)}
            onShowMore={() => onNavigate('catalog')}
          />

          <ItemSelector
            category="top"
            items={getCategoryItems('top')}
            selectedItem={selectedItems.top}
            onSelectItem={(item) => handleSelectItem('top', item)}
            onShowMore={() => onNavigate('catalog')}
          />

          <ItemSelector
            category="bottom"
            items={getCategoryItems('bottom')}
            selectedItem={selectedItems.bottom}
            onSelectItem={(item) => handleSelectItem('bottom', item)}
            onShowMore={() => onNavigate('catalog')}
          />

          <ItemSelector
            category="shoes"
            items={getCategoryItems('shoes')}
            selectedItem={selectedItems.shoes}
            onSelectItem={(item) => handleSelectItem('shoes', item)}
            onShowMore={() => onNavigate('catalog')}
          />

          {/* AI Recommendations */}
          <button className="w-full py-4 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>Подобрать похожие вещи</span>
          </button>
        </div>
      </div>
    </div>
  );
}
