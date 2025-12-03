/**
 * ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ УТИЛИТЫ ДЛЯ ПУТЕЙ К ИЗОБРАЖЕНИЯМ
 * 
 * Эта утилита гарантирует правильные пути к изображениям
 * при деплое на GitHub Pages с base URL "/StyleHub/"
 */

import { getImagePath, getClothingImagePath } from './imagePath';

// Пример 1: Получение пути к изображению из папки images
const imagePath1 = getClothingImagePath('top', 'футболка.png');
// Результат в dev: "/StyleHub/images/top/футболка.png"
// Результат в production: "/StyleHub/images/top/футболка.png"

// Пример 2: Получение пути к любому изображению
const imagePath2 = getImagePath('images/shoes/кроссовки.png');
// Результат: "/StyleHub/images/shoes/кроссовки.png"

// Пример 3: Использование в компоненте React
/*
import { getClothingImagePath } from '@/utils/imagePath';

function ClothingItem({ category, filename }: { category: string; filename: string }) {
  const imageSrc = getClothingImagePath(category, filename);
  
  return <img src={imageSrc} alt={filename} />;
}
*/

// Пример 4: Использование при динамической загрузке изображений
/*
import { getImagePath } from '@/utils/imagePath';

async function loadImages() {
  const categories = ['headwear', 'top', 'bottom', 'shoes'];
  
  for (const category of categories) {
    const response = await fetch(getImagePath(`images/${category}/`));
    // ... обработка
  }
}
*/

// ВАЖНО: 
// - НЕ используйте абсолютные пути типа "/images/..." напрямую
// - ВСЕГДА используйте эти утилиты для путей к изображениям
// - Это гарантирует правильную работу на GitHub Pages

