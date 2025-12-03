/**
 * Утилита для получения правильных путей к изображениям
 * с учетом base URL для GitHub Pages
 */
export function getImagePath(relativePath: string): string {
  // Убираем начальный слеш, если он есть
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  
  // Получаем base URL из Vite (например, "/StyleHub/")
  const baseUrl = import.meta.env.BASE_URL;
  
  // Убираем завершающий слеш из baseUrl, если он есть
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Возвращаем полный путь
  return `${cleanBaseUrl}/${cleanPath}`;
}

/**
 * Получить путь к изображению из папки images
 * @param category - категория (headwear, top, bottom, shoes)
 * @param filename - имя файла
 * @returns полный путь к изображению
 */
export function getClothingImagePath(category: string, filename: string): string {
  return getImagePath(`images/${category}/${filename}`);
}

