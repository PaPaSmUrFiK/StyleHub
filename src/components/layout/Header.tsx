import { Search, Bell, User, Menu } from 'lucide-react';

type HeaderProps = {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  user?: { name: string; avatar?: string } | null;
};

export function Header({ currentPage = 'home', onNavigate, user }: HeaderProps) {
  return (
    <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate?.('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-lg flex items-center justify-center">
                <span className="text-white">S</span>
              </div>
              <span className="text-[#111827] tracking-tight">StyleHub</span>
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => onNavigate?.('home')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'home'
                    ? 'bg-[#F3F4F6] text-[#111827]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => onNavigate?.('gallery')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'gallery'
                    ? 'bg-[#F3F4F6] text-[#111827]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
                }`}
              >
                Мои образы
              </button>
              <button
                onClick={() => onNavigate?.('catalog')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'catalog'
                    ? 'bg-[#F3F4F6] text-[#111827]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
                }`}
              >
                Каталог
              </button>
            </nav>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors">
              <Search className="w-5 h-5 text-[#6B7280]" />
            </button>
            <button className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-[#6B7280]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full"></span>
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-3 border-l border-[#E5E7EB]">
                <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">{user.name[0]}</span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => onNavigate?.('auth')}
                className="ml-3 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
              >
                Войти
              </button>
            )}

            <button className="md:hidden p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors">
              <Menu className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
