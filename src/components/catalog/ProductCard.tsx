import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Star, Plus } from 'lucide-react';
import type { ClothingItem } from '../../data/clothingData';

type ProductCardProps = {
  item: ClothingItem;
  onAddToOutfit: (item: ClothingItem) => void;
  onViewDetails: (item: ClothingItem) => void;
};

export function ProductCard({ item, onAddToOutfit, onViewDetails }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-all group">
      {/* Image */}
      <button
        onClick={() => onViewDetails(item)}
        className="w-full aspect-[3/4] bg-transparent overflow-hidden relative"
      >
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity"></div>
      </button>

      {/* Details */}
      <div className="p-4">
        {/* Brand */}
        <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-1">
          {item.brand}
        </div>

        {/* Name */}
        <h3 className="text-[#111827] mb-2 line-clamp-2">{item.name}</h3>

        {/* Colors */}
        <div className="flex gap-1.5 mb-3">
          {item.colors.slice(0, 4).map((color, index) => (
            <button
              key={index}
              className="w-5 h-5 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          {item.colors.length > 4 && (
            <div className="w-5 h-5 rounded-full border-2 border-[#E5E7EB] bg-white flex items-center justify-center text-[10px] text-[#6B7280]">
              +{item.colors.length - 4}
            </div>
          )}
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-[#111827]">${item.price}</div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
            <span className="text-sm text-[#6B7280]">{item.rating}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onAddToOutfit(item)}
          className="w-full py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Добавить в образ</span>
        </button>
      </div>
    </div>
  );
}
