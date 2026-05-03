import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTheme, setTheme, toggleTheme as toggleThemeStore, subscribe, initializeTheme } from './themeStore';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getTheme());

  useEffect(() => {
    // Initialize theme on client
    const initialTheme = initializeTheme();
    setThemeState(initialTheme);

    // Subscribe to changes
    const unsubscribe = subscribe(setThemeState);

    return unsubscribe;
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
