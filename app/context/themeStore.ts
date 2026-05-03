type Theme = 'light' | 'dark';

// Module-level theme state (for SSR compatibility)
let currentTheme: Theme = 'dark';
const subscribers: Set<(theme: Theme) => void> = new Set();

export function getTheme(): Theme {
  return currentTheme;
}

export function setTheme(theme: Theme): void {
  currentTheme = theme;
  localStorage.setItem('portfolio-theme', theme);
  subscribers.forEach((callback) => callback(theme));
}

export function subscribe(callback: (theme: Theme) => void): () => void {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

export function initializeTheme(): Theme {
  // Check localStorage first
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'light' || saved === 'dark') {
    currentTheme = saved;
    subscribers.forEach((callback) => callback(saved));
    return saved;
  }

  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    currentTheme = 'light';
    subscribers.forEach((callback) => callback('light'));
    return 'light';
  }

  currentTheme = 'dark';
  subscribers.forEach((callback) => callback('dark'));
  return 'dark';
}

export function toggleTheme(): void {
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
}
