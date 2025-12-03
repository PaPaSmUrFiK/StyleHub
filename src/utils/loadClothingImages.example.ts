/**
 * ПРИМЕР: Как правильно загружать изображения одежды
 * с учетом base URL для GitHub Pages
 */

import { getClothingImagePath } from './imagePath';

// Пример функции для загрузки списка изображений из категории
export async function loadClothingImagesExample(category: string): Promise<string[]> {
  // Список файлов для каждой категории (можно получать динамически)
  const imageFiles: Record<string, string[]> = {
    headwear: ['кепка-no-bg-preview (carve.photos).png'],
    top: [
      'кофта-no-bg-preview (carve.photos).png',
      'свитер-no-bg-preview (carve.photos).png',
      'футболка-no-bg-preview (carve.photos) (1).png',
    ],
    bottom: [
      'брюки-no-bg-preview (carve.photos).png',
      'джинсы 2-no-bg-preview (carve.photos).png',
      'джинсы-no-bg-preview (carve.photos).png',
    ],
    shoes: [
      'розовые_кроссовки_no_bg_preview_carve_photos.png',
      'туфли черные-no-bg-preview (carve.photos) (1).png',
      'черные кроссовки-no-bg-preview (carve.photos).png',
    ],
  };

  const files = imageFiles[category] || [];
  
  // Возвращаем пути с правильным base URL
  return files.map(filename => getClothingImagePath(category, filename));
}

// Пример использования в компоненте:
/*
import { loadClothingImagesExample } from '@/utils/loadClothingImages.example';

function MyComponent() {
  const [images, setImages] = useState<string[]>([]);
  
  useEffect(() => {
    loadClothingImagesExample('top').then(setImages);
  }, []);
  
  return (
    <div>
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Item ${index}`} />
      ))}
    </div>
  );
}
*/

