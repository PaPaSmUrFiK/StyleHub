import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ChevronRight, X } from 'lucide-react';
import type { ClothingItem } from '../../data/clothingData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { loadClothingImages, getAvailableImages, createEmptyItem, type ClothingImage } from '../../utils/loadClothingImages';

type ItemSelectorProps = {
  category: 'headwear' | 'top' | 'bottom' | 'shoes';
  items: ClothingItem[];
  selectedItem: ClothingItem | null;
  onSelectItem: (item: ClothingItem | null) => void;
  onShowMore: () => void;
};

const categoryLabels = {
  headwear: 'Головной убор',
  top: 'Верх',
  bottom: 'Низ',
  shoes: 'Обувь'
};

export function ItemSelector({
  category,
  items,
  selectedItem,
  onSelectItem,
  onShowMore
}: ItemSelectorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Загружаем изображения из папок
  const folderImages = loadClothingImages(category);
  
  // Берем первые 3 изображения из папки + пустую карточку
  // Всегда показываем пустую карточку первой
  const defaultImages = [
    createEmptyItem(category),
    ...folderImages.slice(0, 3)
  ];
  
  // Остальные изображения для диалога (если есть больше 3)
  const remainingImages = folderImages.slice(3);
  
  // Преобразуем ClothingImage в ClothingItem для совместимости
  const convertToClothingItem = (img: ClothingImage): ClothingItem => ({
    id: img.id,
    name: img.name,
    brand: img.brand || 'StyleHub',
    category: img.category,
    image: img.image,
    price: img.price || 0,
    colors: img.colors || ['#000000'],
    rating: 4.5
  });

  const handleSelectItem = (item: ClothingImage | null) => {
    if (!item || item.id.includes('empty')) {
      onSelectItem(null);
    } else {
      onSelectItem(convertToClothingItem(item));
    }
  };

  const handleShowMore = () => {
    if (remainingImages.length > 0) {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#111827] text-sm">{categoryLabels[category]}</h3>
          {remainingImages.length > 0 && (
            <button
              onClick={handleShowMore}
              className="text-xs text-[#2563EB] hover:underline flex items-center gap-1"
            >
              Еще варианты ({remainingImages.length})
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Horizontal scrollable items - по умолчанию 3 картинки + пустая */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {defaultImages.map((item) => {
            const isSelected = selectedItem?.id === item.id || 
              (!selectedItem && item.id.includes('empty'));
            const isEmpty = item.id.includes('empty');
            
            return (
              <button
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className={`flex-shrink-0 w-24 rounded-lg border-2 transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-[#2563EB] bg-[#EFF6FF]'
                    : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB]'
                }`}
              >
                <div className={`aspect-square rounded-t-md overflow-hidden flex items-center justify-center ${isEmpty ? 'bg-[#F9FAFB]' : 'bg-transparent'}`}>
                  {isEmpty ? (
                    <div className="text-[#9CA3AF] text-xs text-center p-2">
                      <X className="w-6 h-6 mx-auto mb-1" />
                      <span>Нет</span>
                    </div>
                  ) : (
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-2">
                  <div className="text-xs text-[#111827] truncate">{item.name}</div>
                  {!isEmpty && (
                    <div className="text-xs text-[#6B7280] truncate">{item.brand || 'StyleHub'}</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Color palette */}
        {selectedItem && selectedItem.colors && selectedItem.colors.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
            <div className="text-xs text-[#6B7280] mb-2">Цвета:</div>
            <div className="flex gap-2">
              {selectedItem.colors.map((color, index) => (
                <button
                  key={index}
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dialog для выбора из всех остальных изображений */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Выберите {categoryLabels[category].toLowerCase()}</DialogTitle>
            <DialogDescription>
              Выберите из {remainingImages.length} доступных вариантов
            </DialogDescription>
          </DialogHeader>
          
          {remainingImages.length === 0 ? (
            <div className="text-center py-8 text-[#6B7280]">
              <p>Нет дополнительных вариантов</p>
              <p className="text-sm mt-2">Добавьте изображения в папку public/images/{category}/</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 mt-4">
              {remainingImages.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleSelectItem(item);
                    setIsDialogOpen(false);
                  }}
                  className={`rounded-lg border-2 transition-all hover:shadow-md ${
                    isSelected
                      ? 'border-[#2563EB] bg-[#EFF6FF]'
                      : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB]'
                  }`}
                >
                  <div className="aspect-square bg-transparent rounded-t-md overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <div className="text-xs text-[#111827] truncate">{item.name}</div>
                    <div className="text-xs text-[#6B7280] truncate">{item.brand || 'StyleHub'}</div>
                  </div>
                </button>
              );
            })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
