import React from 'react';
import { useTheme, DesignTheme } from '../../context/ThemeContext';
import { Palette, Sparkles, Newspaper } from 'lucide-react';

interface Props {
  className?: string;
}

const ThemeSwitcher: React.FC<Props> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();

  const themes: { id: DesignTheme; label: string; icon: React.ReactNode }[] = [
    { id: 'classic', label: 'Классика', icon: <Palette className="h-3.5 w-3.5" /> },
    { id: 'glass', label: 'Glass', icon: <Sparkles className="h-3.5 w-3.5" /> },
    { id: 'editorial', label: 'Журнал', icon: <Newspaper className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className={`flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200/80 ${className}`}>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
            theme === t.id
              ? 'bg-white text-navy shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          title={`Тема: ${t.label}`}
        >
          {t.icon}
          <span className="hidden sm:inline">{t.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
