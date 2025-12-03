// Утилита для автоматической загрузки изображений из папок

export type ClothingImage = {
  id: string;
  image: string;
  name: string;
  category: 'headwear' | 'top' | 'bottom' | 'shoes';
  brand?: string;
  price?: number;
  colors?: string[];
};

// Кэш для загруженных изображений
let imageCache: Map<string, ClothingImage[]> = new Map();

// Функция для загрузки всех изображений из папки категории
// В Vite файлы из public доступны через /images/... при запуске
export function loadClothingImages(category: 'headwear' | 'top' | 'bottom' | 'shoes'): ClothingImage[] {
  // Проверяем кэш
  if (imageCache.has(category)) {
    return imageCache.get(category)!;
  }

  const images: ClothingImage[] = [];
  
  // Используем import.meta.glob для динамической загрузки изображений
  // В Vite путь должен быть относительно корня проекта
  // Для файлов из public используем путь без /public, так как Vite копирует их в корень
  try {
    // Пробуем загрузить через glob (работает на этапе сборки)
    // Путь должен быть относительно src или использовать абсолютный путь от корня
    const imageModules = import.meta.glob('/public/images/*/*.{jpg,jpeg,png,webp,svg}', { 
      eager: true,
      as: 'url'
    });

    // Фильтруем изображения по категории
    Object.entries(imageModules).forEach(([path, url]) => {
      if (path.includes(`/${category}/`)) {
        const fileName = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'item';
        const fileExtension = path.match(/\.(jpg|jpeg|png|webp|svg)$/i)?.[0] || '.jpg';
        
        // В Vite файлы из public доступны через /images/...
        // URL от glob может быть разным, поэтому используем прямой путь
        const publicUrl = `/images/${category}/${fileName}${fileExtension}`;
        
        images.push({
          id: `${category}-${fileName}`,
          image: publicUrl,
          name: fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          category,
          brand: 'StyleHub',
          price: 0,
          colors: ['#000000']
        });
      }
    });
  } catch (error) {
    console.warn(`Не удалось загрузить изображения для категории ${category}:`, error);
  }

  // Если изображений нет, возвращаем пустой массив
  // Пользователь может добавить изображения в папки public/images/{category}/
  const sortedImages = images.sort((a, b) => a.name.localeCompare(b.name));
  imageCache.set(category, sortedImages);
  return sortedImages;
}

// Функция для получения всех изображений всех категорий
export function loadAllClothingImages(): ClothingImage[] {
  const categories: Array<'headwear' | 'top' | 'bottom' | 'shoes'> = ['headwear', 'top', 'bottom', 'shoes'];
  return categories.flatMap(category => loadClothingImages(category));
}

// Функция для получения изображений категории, исключая уже выбранные
export function getAvailableImages(
  category: 'headwear' | 'top' | 'bottom' | 'shoes',
  selectedImages: ClothingImage[]
): ClothingImage[] {
  const allImages = loadClothingImages(category);
  const selectedIds = new Set(selectedImages.map(img => img.id));
  return allImages.filter(img => !selectedIds.has(img.id));
}

// Создает пустой элемент для "не показывать ничего"
export function createEmptyItem(category: 'headwear' | 'top' | 'bottom' | 'shoes'): ClothingImage {
  return {
    id: `${category}-empty`,
    image: '',
    name: 'Не показывать',
    category,
    brand: '',
    price: 0,
    colors: []
  };
}

