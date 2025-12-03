import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Shuffle, Save, Share2 } from 'lucide-react';
import type { ClothingItem } from '../../data/clothingData';

type OutfitDisplayProps = {
  selectedItems: {
    headwear: ClothingItem | null;
    top: ClothingItem | null;
    bottom: ClothingItem | null;
    shoes: ClothingItem | null;
  };
  onRandomize: () => void;
  onSave: () => void;
  onShare: () => void;
};

export function OutfitDisplay({
  selectedItems,
  onRandomize,
  onSave,
  onShare
}: OutfitDisplayProps) {
  return (
    <div className="h-full bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] rounded-2xl p-12 flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[#111827]">Ваш образ</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onRandomize}
            className="flex items-center gap-2 px-4 py-2 bg-white text-[#374151] rounded-lg hover:bg-[#F9FAFB] transition-colors border border-[#E5E7EB]"
          >
            <Shuffle className="w-4 h-4" />
            <span className="text-sm">Случайный</span>
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="text-sm">Сохранить</span>
          </button>
          <button
            onClick={onShare}
            className="p-2 bg-white text-[#374151] rounded-lg hover:bg-[#F9FAFB] transition-colors border border-[#E5E7EB]"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Outfit Display Area */}
      <div className="flex-1 bg-white rounded-xl shadow-lg shadow-black/5 border border-[#E5E7EB] flex items-center justify-center relative overflow-hidden">
        <div className="relative w-full h-full max-w-md mx-auto flex flex-col items-center justify-center p-8">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, #111827 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          {/* Outfit Stack - from bottom to top */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full">
            {/* Headwear */}
            {selectedItems.headwear && (
              <div className="w-48 h-48 relative flex items-center justify-center">
                <ImageWithFallback
                  src={selectedItems.headwear.image}
                  alt={selectedItems.headwear.name}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            )}

            {/* Top */}
            {selectedItems.top && (
              <div className="w-64 h-64 relative flex items-center justify-center -mt-8">
                <ImageWithFallback
                  src={selectedItems.top.image}
                  alt={selectedItems.top.name}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            )}

            {/* Bottom */}
            {selectedItems.bottom && (
              <div className="w-56 h-56 relative flex items-center justify-center -mt-12">
                <ImageWithFallback
                  src={selectedItems.bottom.image}
                  alt={selectedItems.bottom.name}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            )}

            {/* Shoes */}
            {selectedItems.shoes && (
              <div className="w-52 h-52 relative flex items-center justify-center -mt-8">
                <ImageWithFallback
                  src={selectedItems.shoes.image}
                  alt={selectedItems.shoes.name}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            )}
          </div>

          {/* Empty state */}
          {!selectedItems.headwear && !selectedItems.top && !selectedItems.bottom && !selectedItems.shoes && (
            <div className="text-center text-[#9CA3AF]">
              <p>Выберите вещи справа</p>
              <p className="text-sm mt-2">чтобы создать свой образ</p>
            </div>
          )}
        </div>
      </div>

      {/* Item details */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {Object.entries(selectedItems).map(([category, item]) => {
          if (!item) return null;
          return (
            <div key={category} className="bg-white rounded-lg p-3 border border-[#E5E7EB]">
              <div className="text-xs text-[#9CA3AF] uppercase mb-1">
                {category === 'headwear' && 'Головной убор'}
                {category === 'top' && 'Верх'}
                {category === 'bottom' && 'Низ'}
                {category === 'shoes' && 'Обувь'}
              </div>
              <div className="text-sm text-[#111827]">{item.name}</div>
              <div className="text-xs text-[#6B7280]">{item.brand}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
