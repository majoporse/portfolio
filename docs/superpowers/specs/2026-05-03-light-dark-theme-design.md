# Light/Dark Theme Toggle Design Spec

**Date:** 2026-05-03  
**Project:** Mário Hatalčík - Full-Stack Developer Portfolio  
**Status:** Draft  
**Author:** opencode

---

## Overview

Add light/dark theme toggle to the portfolio with dynamic background changes and color-inverted WebGL pattern ("lines").

### Goals
- Toggle between dark and light themes via floating button
- Dynamic background color changes based on theme
- WebGL noise pattern colors invert with theme
- Seamless theme persistence via localStorage

### Success Criteria
1. Fixed floating button with sun/moon icon toggles theme
2. Light theme: white/cream background with subtle gray pattern
3. Dark theme: near-black background with rust accent pattern
4. WebGL pattern colors invert between themes
5. Header and text colors adapt to theme
6. Theme persists across page reloads

---

## Architecture

### Theme Context Pattern
- **Provider:** `ThemeContext` with `ThemeProvider` wrapper in `root.tsx`
- **State:** `theme: 'light' | 'dark'` managed via React context
- **Persistence:** `localStorage` with key `portfolio-theme`
- **Initial:** Check system preference (`prefers-color-scheme`), fallback to 'dark'

### Component Structure
```
app/
├── context/
│   └── ThemeContext.tsx       # Theme provider and hook
├── components/
│   └── ThemeToggle.tsx        # Floating toggle button
├── root.tsx                    # Wrap with ThemeProvider
└── app.css                     # CSS variables for theme
```

---

## Theme Colors

### Dark Theme (Default)
- Background: `#050505` (near-black)
- Pattern Black: `#ffffff` (white)
- Pattern Accent: `#b93d27` (deep rust)
- Text Primary: `#d1d1d1` (light gray)
- Text Secondary: `#555` (dark gray)
- Header Background: `rgba(5, 5, 5, 0.8)`

### Light Theme
- Background: `#f5f5f5` (light gray/cream)
- Pattern Black: `#333333` (dark gray)
- Pattern Accent: `#b93d27` (same rust - remains visible)
- Text Primary: `#1a1a1a` (dark gray)
- Text Secondary: `#555` (medium gray)
- Header Background: `rgba(245, 245, 245, 0.8)`

---

## Component Specifications

### 1. Theme Context (`ThemeContext.tsx`)

**Purpose:** Manage theme state and provide to all components

**Features:**
- React context with `theme` and `setTheme` values
- Initialize from localStorage or system preference
- Persist changes to localStorage
- Provide `useTheme()` hook for consumption

**TypeScript Interface:**
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}
```

**Props:** None

---

### 2. Theme Toggle Button (`ThemeToggle.tsx`)

**Purpose:** Fixed floating button to toggle theme

**Features:**
- Position: Fixed bottom-right, 24px from edges
- Size: 48px × 48px circular button
- Icon: Sun (light mode) / Moon (dark mode)
- Animation: Smooth transition on theme change
- Z-index: 50 (above WebGL, below header)
- Background: Semi-transparent, border for visibility

**Icon Colors:**
- Dark mode button: Yellow sun icon
- Light mode button: Purple moon icon

**Framer Motion:** Subtle hover scale animation

**Props:** None (uses context)

---

### 3. Root Layout (`root.tsx`)

**Changes:**
- Wrap `<Outlet />` with `<ThemeProvider>`
- Add theme class to `<html>` element

**Implementation:**
```tsx
<html lang="en" className={theme}>
  <body>
    <ThemeProvider>
      <WebGLBackground />
      <Outlet />
    </ThemeProvider>
  </body>
</html>
```

---

### 4. WebGL Background (`WebGLBackground.tsx`)

**Changes:**
- Accept theme via context
- Update uniform colors when theme changes
- Remove debug parameter controls

**Color Mapping:**
```typescript
const themeColors = {
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
```

**Shader Uniforms:**
- `u_blackColor`: patternBlack (flips between themes)
- `u_accentColor`: patternAccent (remains rust)
- Background div uses `themeColors[theme].background`

---

### 5. Header (`Header.tsx`)

**Changes:**
- Dynamic background color based on theme
- Dynamic border color based on theme

**Styles:**
```typescript
const headerBg = theme === 'dark' 
  ? 'rgba(5, 5, 5, 0.8)' 
  : 'rgba(245, 245, 245, 0.8)';

const borderColor = theme === 'dark' 
  ? 'rgba(255, 255, 255, 0.05)' 
  : 'rgba(0, 0, 0, 0.05)';
```

---

### 6. CSS Variables (`app.css`)

**New CSS Custom Properties:**
```css
:root {
  --bg-color: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #555;
  --header-bg: rgba(245, 245, 245, 0.8);
}

html.dark {
  --bg-color: #050505;
  --text-primary: #d1d1d1;
  --text-secondary: #555;
  --header-bg: rgba(5, 5, 5, 0.8);
}
```

---

## Implementation Steps

1. **Create Theme Context**
   - Create `app/context/ThemeContext.tsx`
   - Implement `ThemeProvider` and `useTheme` hook
   - Initialize from localStorage or system preference

2. **Create Theme Toggle Button**
   - Create `app/components/ThemeToggle.tsx`
   - Add sun/moon icons (SVG or Lucide React)
   - Position fixed bottom-right

3. **Update Root Layout**
   - Wrap with `ThemeProvider` in `root.tsx`
   - Add theme class to `<html>` element

4. **Update WebGL Background**
   - Add theme context usage
   - Update uniform colors dynamically
   - Remove debug parameter controls

5. **Update Header**
   - Add theme context usage
   - Dynamic background and border colors

6. **Update CSS**
   - Add CSS variables for theme colors
   - Apply theme class to body/html

7. **Test Theme Switching**
   - Toggle between themes
   - Verify WebGL pattern colors invert
   - Verify persistence across reloads
   - Verify system preference detection

---

## Testing Plan

### Manual Testing
1. Click toggle button - theme changes immediately
2. Verify WebGL pattern colors invert correctly
3. Refresh page - theme persists
4. Toggle system dark/light mode - app respects preference on first load
5. Check header background changes with theme
6. Verify text colors are readable in both themes

### Automated Testing
- None specified (UI-heavy feature)

---

## Success Criteria Checklist

- [ ] Theme context created with proper TypeScript types
- [ ] Theme toggle button renders and functions
- [ ] Theme persists in localStorage
- [ ] WebGL background colors update with theme
- [ ] Header background updates with theme
- [ ] Text colors remain readable in both themes
- [ ] System preference respected on first visit
- [ ] Debug controls removed from WebGL component
- [ ] Typecheck passes
- [ ] Lint passes
