import React, { createContext, useContext, useState, useEffect } from 'react';

export type DesignTheme = 'classic' | 'glass' | 'editorial';

interface ThemeContextType {
  theme: DesignTheme;
  setTheme: (theme: DesignTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'classic',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<DesignTheme>(() => {
    return (localStorage.getItem('mediamap_theme') as DesignTheme) || 'classic';
  });

  useEffect(() => {
    localStorage.setItem('mediamap_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
