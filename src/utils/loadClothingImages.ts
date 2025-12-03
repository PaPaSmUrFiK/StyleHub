// Утилита для автоматической загрузки изображений из папок
import { getClothingImagePath } from './imagePath';

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
  // В Vite файлы из public доступны напрямую через /images/... (без /public)
  // Но для правильной работы с base URL используем утилиту getClothingImagePath
  try {
    // Пробуем загрузить через glob
    // Путь должен быть относительно корня проекта, но без /public
    // Vite автоматически обрабатывает файлы из public
    const imageModules = import.meta.glob('/public/images/*/*.{jpg,jpeg,png,webp,svg}', { 
      eager: true,
      as: 'url'
    });

    // Фильтруем изображения по категории
    Object.entries(imageModules).forEach(([path, url]) => {
      if (path.includes(`/${category}/`)) {
        // Извлекаем имя файла из пути
        const pathParts = path.split('/');
        const fullFileName = pathParts[pathParts.length - 1];
        const fileName = fullFileName.replace(/\.[^/.]+$/, '');
        
        // Используем утилиту для правильного пути с учетом base URL
        // Это гарантирует работу на GitHub Pages с base: "/StyleHub/"
        const publicUrl = getClothingImagePath(category, fullFileName);
        
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

