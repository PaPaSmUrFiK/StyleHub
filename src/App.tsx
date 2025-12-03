import { useState } from 'react';
import { Header } from './components/layout/Header';
import { AuthPage } from './components/auth/AuthPage';
import { OutfitBuilder } from './components/outfit-builder/OutfitBuilder';
import { GalleryPage } from './components/gallery/GalleryPage';
import { CatalogPage } from './components/catalog/CatalogPage';
import type { ClothingItem } from './data/clothingData';

type User = {
  name: string;
  email: string;
} | null;

type SavedOutfit = {
  id: string;
  name: string;
  items: any;
  date: string;
  tags: string[];
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'auth' | 'home' | 'gallery' | 'catalog'>('auth');
  const [user, setUser] = useState<User>(null);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);

  const handleLogin = (email: string, password: string) => {
    // Mock login
    setUser({
      name: email.split('@')[0],
      email: email
    });
    setCurrentPage('home');
  };

  const handleSaveOutfit = (outfit: SavedOutfit) => {
    setSavedOutfits(prev => [...prev, outfit]);
    alert('Образ сохранен!');
  };

  const handleEditOutfit = (outfit: SavedOutfit) => {
    // In a real app, this would load the outfit in the builder
    setCurrentPage('home');
    alert('Редактирование образа...');
  };

  const handleDeleteOutfit = (id: string) => {
    if (confirm('Удалить этот образ?')) {
      setSavedOutfits(prev => prev.filter(o => o.id !== id));
    }
  };

  const handleShareOutfit = (outfit: SavedOutfit) => {
    alert('Поделиться образом: ' + outfit.name);
  };

  const handleAddToOutfit = (item: ClothingItem) => {
    setCurrentPage('home');
    alert(`Добавлен: ${item.name} от ${item.brand}`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {currentPage === 'auth' ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <>
          <Header
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            user={user}
          />

          {currentPage === 'home' && (
            <OutfitBuilder
              onSaveOutfit={handleSaveOutfit}
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'gallery' && (
            <GalleryPage
              savedOutfits={savedOutfits}
              onEditOutfit={handleEditOutfit}
              onDeleteOutfit={handleDeleteOutfit}
              onShareOutfit={handleShareOutfit}
            />
          )}

          {currentPage === 'catalog' && (
            <CatalogPage onAddToOutfit={handleAddToOutfit} />
          )}
        </>
      )}
    </div>
  );
}
