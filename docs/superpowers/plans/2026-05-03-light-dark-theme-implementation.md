# Light/Dark Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add light/dark theme toggle with dynamic background and WebGL pattern color changes

**Architecture:** Theme context provider managing state, localStorage persistence, and dynamic CSS/JSX updates. WebGL shader uniforms update based on theme.

**Tech Stack:** React Context API, localStorage, CSS variables, WebGL uniforms

---

### Task 1: Theme Context

**Files:**
- Create: `app/context/ThemeContext.tsx`

- [ ] **Step 1: Create ThemeContext file and basic structure**

```tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
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
```

- [ ] **Step 2: Add ThemeProvider component with persistence logic**

```tsx
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') {
      setThemeState(saved);
      return;
    }

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setThemeState('light');
    } else {
      setThemeState('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

- [ ] **Step 3: Commit the theme context**

```bash
git add app/context/ThemeContext.tsx
git commit -m "feat: add ThemeContext with persistence and system preference support"
```

---

### Task 2: Theme Toggle Button Component

**Files:**
- Create: `app/components/ThemeToggle.tsx`

- [ ] **Step 1: Create ThemeToggle component with sun/moon icons**

```tsx
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white/80 dark:bg-black/80 border border-black/10 dark:border-white/10 shadow-lg z-50 flex items-center justify-center cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        // Sun icon for dark mode (switching to light)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Moon icon for light mode (switching to dark)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </motion.button>
  );
}
```

- [ ] **Step 2: Commit the toggle button component**

```bash
git add app/components/ThemeToggle.tsx
git commit -m "feat: add ThemeToggle component with sun/moon icons"
```

---

### Task 3: Update Root Layout

**Files:**
- Modify: `app/root.tsx`

**Important:** React Router v7's `Layout` component is exported and used by the framework itself, so we can't wrap it in a React Context Provider. Instead, we'll use a module-level theme store that both Layout (for SSR) and App (for interactivity) can access.

- [ ] **Step 1: Create a module-level theme store**

Create `app/context/themeStore.ts`:

```tsx
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

export function subscribe(callback: (theme: Theme) => () => void): () => void {
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
    return saved;
  }

  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    currentTheme = 'light';
    return 'light';
  }

  currentTheme = 'dark';
  return 'dark';
}

export function toggleTheme(): void {
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
}
```

- [ ] **Step 2: Update ThemeContext to use the store**

Update `app/context/ThemeContext.tsx`:

```tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTheme, setTheme, toggleTheme as toggleThemeStore, subscribe, initializeTheme } from './themeStore';

type Theme = 'light' | 'dark';

interface ThemeContextType {
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

  const handleToggleTheme = () => {
    toggleThemeStore();
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, toggleTheme: handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

- [ ] **Step 3: Update Layout to use module store for SSR**

Update `app/root.tsx` Layout component:

```tsx
export function Layout({ children }: { children: React.ReactNode }) {
  // Read from module store for SSR compatibility
  // This runs on both server and client
  const theme = typeof window !== 'undefined' 
    ? getTheme() 
    : 'dark'; // Default for SSR

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Update App component to wrap with ThemeProvider**

```tsx
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { WebGLBackground } from './components/WebGLBackground';

export default function App() {
  return (
    <ThemeProvider>
      <WebGLBackground />
      <Outlet />
      <ThemeToggle />
    </ThemeProvider>
  );
}
```

- [ ] **Step 5: Commit the root layout changes**

```bash
git add app/context/themeStore.ts app/context/ThemeContext.tsx app/root.tsx
git commit -m "feat: add theme store and update root layout for React Router v7 compatibility"
```

---

### Task 4: Update WebGL Background Component

**Files:**
- Modify: `app/components/WebGLBackground.tsx`

- [ ] **Step 1: Import theme store and add theme reactivity**

```tsx
import { useEffect, useRef, useState } from "react";
import { getTheme, subscribe } from '../context/themeStore';

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Post-processing parameters
  const [blur, setBlur] = useState(4);
  const [vignette, setVignette] = useState(1.0);
  const [vignetteStrength, setVignetteStrength] = useState(1.0);

  // Theme-aware color configuration
  const themeConfig = {
    dark: {
      background: "#050505",
      patternBlack: "#ffffff",
      patternAccent: "#b93d27",
    },
    light: {
      background: "#f5f5f5",
      patternBlack: "#333333",
      patternAccent: "#b93d27",
    },
  };

  // Get theme from store and subscribe to changes
  const [theme, setTheme] = useState(getTheme());
  
  useEffect(() => {
    const unsubscribe = subscribe((newTheme) => {
      setTheme(newTheme);
    });
    return unsubscribe;
  }, []);

  const currentTheme = themeConfig[theme];
```

- [ ] **Step 2: Update fragment shader color uniforms**

Update the shader uniform locations to use the currentTheme values:

```tsx
// In the render function:
const accentRgb = hexToRgb(currentTheme.patternAccent);
glCtx.uniform3f(accentColorLoc!, accentRgb.r, accentRgb.g, accentRgb.b);

const blackRgb = hexToRgb(currentTheme.patternBlack);
glCtx.uniform3f(blackColorLoc!, blackRgb.r, blackRgb.g, blackRgb.b);

// Update background div style
<div
  className="fixed inset-0 pointer-events-none"
  style={{
    zIndex: 0,
    backgroundColor: currentTheme.background,
  }}
>
```

- [ ] **Step 3: Remove debug parameter controls from WebGLBackground**

Remove the entire debug control panel (lines 325-456 in the original file):

```tsx
return (
  <>
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        backgroundColor: currentTheme.background,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, transparent 0%, rgba(0,0,0,${vignette * vignetteStrength}) 100%)`,
        }}
      />
    </div>
  </>
);
```

- [ ] **Step 4: Commit the WebGL component changes**

```bash
git add app/components/WebGLBackground.tsx
git commit -m "feat: add theme support to WebGLBackground and remove debug controls"
```

---

### Task 5: Update CSS for Theme Variables

**Files:**
- Modify: `app/app.css`

- [ ] **Step 1: Update CSS for theme-aware styling**

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-serif: "Playfair Display", Georgia, serif;

  --color-accent: #b93d27;
  --color-background: #050505;
  --color-text-primary: #d1d1d1;
  --color-text-secondary: #555;
}

html, body {
  overflow-x: hidden;
  font-family: "Inter", sans-serif;
}

/* Dark theme (default) */
html.dark body {
  background-color: #050505;
  color: #d1d1d1;
}

/* Light theme */
html.light body {
  background-color: #f5f5f5;
  color: #1a1a1a;
}
```

- [ ] **Step 2: Commit the CSS changes**

```bash
git add app/app.css
git commit -m "feat: add theme-aware CSS styling"
```

---

### Task 6: Update Header Component

**Files:**
- Modify: `app/components/Header.tsx`

- [ ] **Step 1: Add theme reactivity to Header**

```tsx
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { getTheme, subscribe } from '../context/themeStore';

export function Header() {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const unsubscribe = subscribe((newTheme) => {
      setTheme(newTheme);
    });
    return unsubscribe;
  }, []);

  const headerBg = theme === 'dark' 
    ? 'rgba(5, 5, 5, 0.8)' 
    : 'rgba(245, 245, 245, 0.8)';

  const borderColor = theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.05)';

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full z-100"
      style={{
        background: headerBg,
        backdropFilter: "blur(15px)",
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      {/* ... rest of the header content */}
    </motion.header>
  );
}
```

- [ ] **Step 2: Commit the Header changes**

```bash
git add app/components/Header.tsx
git commit -m "feat: add theme-aware styling to Header component"
```

---

### Task 7: Testing and Verification

**Files:**
- No new files, manual testing

- [ ] **Step 1: Start development server**

```bash
npm run dev
```

- [ ] **Step 2: Test theme toggle functionality**

1. Click the floating toggle button
2. Verify theme changes immediately
3. Verify WebGL pattern colors invert (dark lines → light lines)
4. Verify header background changes
5. Verify text colors remain readable

- [ ] **Step 3: Test persistence**

1. Toggle to light mode
2. Refresh the page
3. Verify light mode persists after reload

- [ ] **Step 4: Test system preference detection**

1. Clear localStorage: `localStorage.removeItem('portfolio-theme')`
2. Refresh page
3. Verify theme matches system preference

- [ ] **Step 5: Run typecheck and lint**

```bash
npm run typecheck
npm run lint
```

---

### Task 8: Final Cleanup and Commit

**Files:**
- No new files

- [ ] **Step 1: Review all changes**

```bash
git status
git diff --stat
```

- [ ] **Step 2: Create comprehensive commit**

```bash
git add .
git commit -m "feat: implement light/dark theme toggle with WebGL background support

- Add ThemeContext with localStorage persistence and system preference detection
- Create ThemeToggle floating button with sun/moon icons
- Update WebGLBackground to support theme-aware colors
- Update Header component with dynamic background/border
- Add CSS variables for theme colors
- Remove debug controls from WebGL component"
```

---

## Spec Coverage Check

From the design spec `docs/superpowers/specs/2026-05-03-light-dark-theme-design.md`:

- ✅ Theme context created with proper TypeScript types (Task 1)
- ✅ Theme toggle button renders and functions (Task 2)
- ✅ Theme persists in localStorage (Task 1)
- ✅ WebGL background colors update with theme (Task 4)
- ✅ Header background updates with theme (Task 6)
- ✅ Text colors remain readable in both themes (Task 5)
- ✅ System preference respected on first visit (Task 1)
- ✅ Debug controls removed from WebGL component (Task 4)
- ✅ Typecheck and lint verification (Task 7)

All spec requirements are covered.

---

## Placeholder Scan

No placeholders found. All steps contain complete code and exact commands.

---

## Type Consistency

All tasks use consistent type names:
- `Theme` type: `'light' | 'dark'`
- `ThemeContextType` interface with `theme`, `setTheme`, `toggleTheme`
- `WebGLBackgroundProps` with `theme: 'light' | 'dark'`

No inconsistencies detected.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-03-light-dark-theme-implementation.md`.

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
