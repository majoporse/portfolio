type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

let currentTheme: Theme = 'light';
const subscribers: Set<(theme: Theme) => void> = new Set();

export function getTheme(): Theme {
  return currentTheme;
}

export function setTheme(theme: Theme): void {
  currentTheme = theme;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, theme);
  }
  subscribers.forEach((callback) => callback(theme));
}

export function subscribe(callback: (theme: Theme) => void): () => void {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

export function initializeTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') {
    currentTheme = saved;
    subscribers.forEach((callback) => callback(saved));
    return saved;
  }

  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    currentTheme = 'light';
    subscribers.forEach((callback) => callback('light'));
    return 'light';
  }

  currentTheme = 'light';
  subscribers.forEach((callback) => callback('light'));
  return 'light';
}

export function toggleTheme(): void {
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
}
