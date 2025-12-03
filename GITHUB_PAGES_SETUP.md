# Настройка для GitHub Pages

## Проблема
При деплое на GitHub Pages с `base: "/StyleHub/"` пути к изображениям и assets должны учитывать этот префикс.

## Решение

### 1. Конфигурация Vite
В `vite.config.ts` установлен `base: "/StyleHub/"` - это правильно.

### 2. Пути к изображениям
Все пути к изображениям теперь используют утилиту `getClothingImagePath()` из `src/utils/imagePath.ts`, которая автоматически добавляет префикс `/StyleHub/`.

### 3. Важные моменты

#### ✅ Что исправлено:
- `src/utils/loadClothingImages.ts` - теперь использует `getClothingImagePath()` для правильных путей
- `src/utils/imagePath.ts` - утилита для формирования путей с учетом base URL

#### ⚠️ Что нужно проверить:
1. **Пересоберите проект** после изменений:
   ```bash
   npm run build
   ```

2. **Проверьте `build/index.html`** - пути к assets должны начинаться с `/StyleHub/`:
   ```html
   <script type="module" crossorigin src="/StyleHub/assets/index-XXX.js"></script>
   <link rel="stylesheet" crossorigin href="/StyleHub/assets/index-XXX.css">
   ```

3. **Проверьте структуру build папки**:
   ```
   build/
   ├── assets/          # JS и CSS файлы
   ├── images/          # Изображения из public/images
   │   ├── headwear/
   │   ├── top/
   │   ├── bottom/
   │   └── shoes/
   └── index.html
   ```

### 4. Деплой на GitHub Pages

После сборки:
```bash
npm run build
npm run deploy
```

Или вручную:
```bash
git add build
git commit -m "Deploy to GitHub Pages"
git push origin main
```

Затем в настройках репозитория GitHub:
- Settings → Pages
- Source: Deploy from a branch
- Branch: `gh-pages` (или ваша ветка с build)

### 5. Проверка работы

После деплоя проверьте:
1. Откройте `https://PaPaSmUrFiK.github.io/StyleHub/`
2. Откройте DevTools (F12) → Network
3. Проверьте, что все запросы к изображениям идут на `/StyleHub/images/...`
4. Проверьте, что нет ошибок 404

### 6. Если изображения не загружаются

1. Проверьте консоль браузера на ошибки 404
2. Убедитесь, что в `build/images/` есть все изображения
3. Проверьте, что пути в коде используют `getClothingImagePath()`
4. Убедитесь, что `base: "/StyleHub/"` установлен в `vite.config.ts`

## Технические детали

### Как работает base URL в Vite:
- В dev режиме: `base: "/StyleHub/"` не влияет на локальный сервер
- В production: все пути автоматически получают префикс `/StyleHub/`
- `import.meta.env.BASE_URL` содержит значение base URL

### Пути к изображениям:
- **Неправильно**: `/images/top/футболка.png` (не работает на GitHub Pages)
- **Правильно**: `/StyleHub/images/top/футболка.png` (через `getClothingImagePath()`)

