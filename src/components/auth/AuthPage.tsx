import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type AuthPageProps = {
  onLogin: (email: string, password: string) => void;
};

export function AuthPage({ onLogin }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(formData.email, formData.password);
    } else {
      // Register logic
      onLogin(formData.email, formData.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F4F6] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">S</span>
            </div>
          </div>
          <h1 className="text-[#111827] mb-2">StyleHub</h1>
          <p className="text-[#6B7280] text-sm">
            {isLogin ? 'Добро пожаловать!' : 'Создайте свой стильный профиль'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-[#E5E7EB] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-[#374151] text-sm mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                  placeholder="Ваше имя"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-[#374151] text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-[#374151] text-sm mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {!isLogin && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        formData.password.length >= i * 2
                          ? 'bg-[#2563EB]'
                          : 'bg-[#E5E7EB]'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-[#374151] text-sm mb-2">
                  Подтвердите пароль
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            {!isLogin && (
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 text-[#2563EB] border-[#E5E7EB] rounded focus:ring-[#2563EB]"
                  required
                />
                <span className="text-sm text-[#6B7280]">
                  Я согласен с{' '}
                  <a href="#" className="text-[#2563EB] hover:underline">
                    условиями использования
                  </a>{' '}
                  и{' '}
                  <a href="#" className="text-[#2563EB] hover:underline">
                    политикой конфиденциальности
                  </a>
                </span>
              </label>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#2563EB] border-[#E5E7EB] rounded focus:ring-[#2563EB]"
                  />
                  <span className="text-[#6B7280]">Запомнить меня</span>
                </label>
                <a href="#" className="text-[#2563EB] hover:underline">
                  Забыли пароль?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
            >
              {isLogin ? 'Войти' : 'Создать аккаунт'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-[#6B7280]"
            >
              {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
              <span className="text-[#2563EB] hover:underline">
                {isLogin ? 'Создать аккаунт' : 'Войти'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
