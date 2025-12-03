import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Edit, Trash2, Share2, Filter } from 'lucide-react';

type SavedOutfit = {
  id: string;
  name: string;
  items: any;
  date: string;
  tags: string[];
};

type GalleryPageProps = {
  savedOutfits: SavedOutfit[];
  onEditOutfit: (outfit: SavedOutfit) => void;
  onDeleteOutfit: (id: string) => void;
  onShareOutfit: (outfit: SavedOutfit) => void;
};

export function GalleryPage({
  savedOutfits,
  onEditOutfit,
  onDeleteOutfit,
  onShareOutfit
}: GalleryPageProps) {
  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#111827] mb-2">Мои образы</h1>
        <p className="text-[#6B7280]">
          Сохраненные комбинации одежды
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#374151] hover:border-[#2563EB] transition-colors">
          <Filter className="w-4 h-4" />
          Фильтры
        </button>
        <button className="px-4 py-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg text-sm text-[#111827]">
          Все
        </button>
        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#6B7280] hover:bg-[#F9FAFB] transition-colors">
          #casual
        </button>
        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#6B7280] hover:bg-[#F9FAFB] transition-colors">
          #осень
        </button>
        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#6B7280] hover:bg-[#F9FAFB] transition-colors">
          #спорт
        </button>
      </div>

      {/* Grid */}
      {savedOutfits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedOutfits.map((outfit) => (
            <div
              key={outfit.id}
              className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] relative">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center text-[#9CA3AF]">
                    <div className="text-4xl mb-2">👔</div>
                    <div className="text-sm">{outfit.name}</div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEditOutfit(outfit)}
                    className="p-2 bg-white rounded-lg shadow-lg hover:bg-[#F9FAFB] transition-colors"
                  >
                    <Edit className="w-4 h-4 text-[#374151]" />
                  </button>
                  <button
                    onClick={() => onShareOutfit(outfit)}
                    className="p-2 bg-white rounded-lg shadow-lg hover:bg-[#F9FAFB] transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-[#374151]" />
                  </button>
                  <button
                    onClick={() => onDeleteOutfit(outfit.id)}
                    className="p-2 bg-white rounded-lg shadow-lg hover:bg-[#FEE2E2] transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-[#DC2626]" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="text-[#111827] mb-1">{outfit.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  {outfit.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#2563EB] bg-[#EFF6FF] px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-[#9CA3AF]">
                  {new Date(outfit.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">👔</div>
          <h2 className="text-[#111827] mb-2">Пока нет сохраненных образов</h2>
          <p className="text-[#6B7280] mb-6">
            Создайте свой первый образ в конструкторе
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
          >
            Создать образ
          </button>
        </div>
      )}
    </div>
  );
}
