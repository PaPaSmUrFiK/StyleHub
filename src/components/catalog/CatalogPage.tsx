import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { X } from 'lucide-react';
import { clothingItems, type ClothingItem } from '../../data/clothingData';

type CatalogPageProps = {
  onAddToOutfit: (item: ClothingItem) => void;
};

const brands = ['Nike', 'Adidas', 'Levi\'s', 'Uniqlo', 'Carhartt', 'AllSaints', 'Converse', 'New Era', 'The North Face'];
const colors = [
  { name: 'Черный', value: '#000000' },
  { name: 'Белый', value: '#FFFFFF' },
  { name: 'Серый', value: '#6B7280' },
  { name: 'Синий', value: '#2563EB' },
  { name: 'Красный', value: '#DC2626' },
  { name: 'Коричневый', value: '#78350F' }
];

export function CatalogPage({ onAddToOutfit }: CatalogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

  const filteredItems = clothingItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) return false;
    if (selectedColors.length > 0) {
      const hasColor = selectedColors.some(color => item.colors.includes(color));
      if (!hasColor) return false;
    }
    if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
    return true;
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="text-[#111827] mb-3">Категория</h3>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'Все товары' },
                  { value: 'headwear', label: 'Головные уборы' },
                  { value: 'top', label: 'Верхняя одежда' },
                  { value: 'bottom', label: 'Брюки' },
                  { value: 'shoes', label: 'Обувь' }
                ].map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                      selectedCategory === cat.value
                        ? 'bg-[#EFF6FF] text-[#2563EB]'
                        : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB]">
              <h3 className="text-[#111827] mb-3">Бренд</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 text-[#2563EB] border-[#D1D5DB] rounded focus:ring-[#2563EB]"
                    />
                    <span className="text-sm text-[#6B7280] group-hover:text-[#111827]">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB]">
              <h3 className="text-[#111827] mb-3">Цвет</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color.value}
                    onClick={() => toggleColor(color.value)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColors.includes(color.value)
                        ? 'border-[#2563EB] scale-110'
                        : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB]">
              <h3 className="text-[#111827] mb-3">Цена</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-[#6B7280]">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {(selectedBrands.length > 0 || selectedColors.length > 0 || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedColors([]);
                  setSelectedCategory('all');
                  setPriceRange([0, 500]);
                }}
                className="w-full py-2 text-sm text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg transition-colors"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-[#111827]">Каталог</h1>
            <div className="text-sm text-[#6B7280]">
              {filteredItems.length} {filteredItems.length === 1 ? 'товар' : 'товаров'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <ProductCard
                key={item.id}
                item={item}
                onAddToOutfit={onAddToOutfit}
                onViewDetails={setSelectedItem}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 flex items-center justify-between">
              <h2 className="text-[#111827]">{selectedItem.name}</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-2 gap-8">
              <div className="aspect-[3/4] bg-transparent rounded-xl overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-2">
                  {selectedItem.brand}
                </div>
                <h3 className="text-[#111827] mb-4">{selectedItem.name}</h3>
                <div className="text-2xl text-[#111827] mb-4">${selectedItem.price}</div>

                <div className="mb-6">
                  <div className="text-sm text-[#6B7280] mb-2">Доступные цвета:</div>
                  <div className="flex gap-2">
                    {selectedItem.colors.map((color, index) => (
                      <button
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-[#6B7280] mb-6">
                  {selectedItem.description || 'Высококачественный продукт от ' + selectedItem.brand}
                </p>

                <button
                  onClick={() => {
                    onAddToOutfit(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="w-full py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
                >
                  Добавить в образ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
