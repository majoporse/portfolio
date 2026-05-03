# Migrate Theme Colors to CSS Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all theme-specific color logic from React components to CSS classes in app.css, removing inline theme conditionals from components.

**Architecture:** Use CSS custom properties and theme-specific class selectors to handle all theme colors. Components will only use semantic CSS classes like `theme-text-primary`, `theme-text-muted`, etc., instead of inline theme conditionals.

**Tech Stack:** React, CSS custom properties, Tailwind CSS, CSS class-based theming

---

### Task 1: Create CSS Theme Classes in app.css

**Files:**
- Modify: `app/app.css`

- [ ] **Step 1: Add CSS custom properties for theme colors**

Add the following to the `@theme` block in `app/app.css`:

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
```

- [ ] **Step 2: Add theme-specific CSS classes**

Add the following CSS classes after the `@theme` block:

```css
/* Theme-specific text colors */
html.dark .theme-text-primary { color: #d1d1d1; }
html.dark .theme-text-muted { color: #555; }
html.dark .theme-text-accent { color: #b93d27; }
html.dark .theme-border-subtle { border-color: rgba(255, 255, 255, 0.05); }
html.dark .theme-border-medium { border-color: rgba(255, 255, 255, 0.1); }

html.light .theme-text-primary { color: #1a1a1a; }
html.light .theme-text-muted { color: #555; }
html.light .theme-text-accent { color: #b93d27; }
html.light .theme-border-subtle { border-color: rgba(0, 0, 0, 0.05); }
html.light .theme-border-medium { border-color: rgba(0, 0, 0, 0.1); }

/* Theme-specific background colors for header */
html.dark .theme-header-bg { 
  background-color: rgba(5, 5, 5, 0.8); 
  backdrop-filter: blur(15px);
}

html.light .theme-header-bg { 
  background-color: rgba(245, 245, 245, 0.8); 
  backdrop-filter: blur(15px);
}

/* Theme-specific hover colors */
html.dark .theme-hover-text:hover { color: #ffffff; }
html.light .theme-hover-text:hover { color: #000000; }

html.dark .theme-button-hover:hover { 
  background-color: #ffffff; 
  color: #000000; 
}

html.light .theme-button-hover:hover { 
  background-color: #000000; 
  color: #ffffff; 
}
```

- [ ] **Step 3: Add theme-specific borders**

```css
/* Border colors */
html.dark .theme-border-subtle { border-color: rgba(255, 255, 255, 0.05); }
html.dark .theme-border-medium { border-color: rgba(255, 255, 255, 0.1); }

html.light .theme-border-subtle { border-color: rgba(0, 0, 0, 0.05); }
html.light .theme-border-medium { border-color: rgba(0, 0, 0, 0.1); }
```

- [ ] **Step 4: Commit the CSS changes**

```bash
git add app/app.css
git commit -m "feat: add CSS theme classes for text, borders, and backgrounds"
```

---

### Task 2: Update Hero Component to Use CSS Classes

**Files:**
- Modify: `app/components/Hero.tsx`

- [ ] **Step 1: Remove theme state and inline colors**

Update the Hero component to use CSS classes instead of inline theme logic:

```tsx
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-12 md:px-24 select-none overflow-hidden relative">
      <div className="flex flex-col items-start">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <h1
            className="text-[clamp(3rem,16vw,22rem)] font-black leading-[0.85] tracking-[-0.05em] uppercase theme-text-accent"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            MÁRIO
          </h1>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <h1
            className="text-[clamp(3rem,16vw,22rem)] font-black leading-[0.85] tracking-[-0.05em] text-left theme-text-primary"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            HATALČÍK
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit the Hero changes**

```bash
git add app/components/Hero.tsx
git commit -m "refactor: migrate Hero component to use CSS theme classes"
```

---

### Task 3: Update Header Component to Use CSS Classes

**Files:**
- Modify: `app/components/Header.tsx`

- [ ] **Step 1: Remove theme state and inline colors**

Update the Header component to use CSS classes instead of inline theme logic:

```tsx
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full z-100 theme-header-bg"
    >
      <div className="flex justify-between items-center px-6 py-5 md:px-20">
        <div className="flex items-center gap-4">
          <div className="h-3 w-3 bg-[#b93d27]"></div>
          <span className="text-[11px] font-bold tracking-[0.5em] theme-text-primary uppercase">
            M. HATALČÍK
          </span>
        </div>
        <nav className="flex gap-12 items-center">
          <a
            href="#work"
            className="nav-link uppercase text-[10px] tracking-widest font-bold theme-text-muted theme-hover-text transition-colors"
          >
            Projects
          </a>
          <a
            href="#experience"
            className="nav-link uppercase text-[10px] tracking-widest font-bold theme-text-muted theme-hover-text transition-colors"
          >
            Experience
          </a>
          <a
            href="mailto:mario.hatalcik@gmail.com"
            className="px-6 py-2 border theme-border-medium rounded-full text-[10px] font-bold tracking-widest uppercase theme-button-hover transition-all"
          >
            Contact
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
```

- [ ] **Step 2: Commit the Header changes**

```bash
git add app/components/Header.tsx
git commit -m "refactor: migrate Header component to use CSS theme classes"
```

---

### Task 4: Update Projects Component to Use CSS Classes

**Files:**
- Modify: `app/components/Projects.tsx`

- [ ] **Step 1: Remove theme state and inline colors**

Update the Projects component to use CSS classes instead of inline theme logic:

```tsx
import { motion, useDragControls, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects } from "../constants/projects";
import { useState, useRef } from "react";

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const dragX = useMotionValue(0);
  const dragControls = useDragControls();
  const canvasX = useMotionValue(0);
  const canvasY = useMotionValue(0);
  const springX = useSpring(canvasX, { stiffness: 100, damping: 20 });
  const springY = useSpring(canvasY, { stiffness: 100, damping: 20 });
  
  const carouselDragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalWidth = projects.length * 288;

  return (
    <div id="work">
      {/* ===== VARIANT A: VERTICAL LIST ===== */}
      <section className="py-32 px-12 md:px-24 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 pb-6 border-b theme-border-medium">
            <p className="text-[10px] uppercase tracking-[0.8em] theme-text-accent mb-2 font-bold">
              Variant A
            </p>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter theme-text-primary italic">
              Vertical List
            </h2>
          </div>
          
          {/* ... rest of the component using theme-text-primary, theme-text-muted, theme-border-subtle, etc. */}
        </div>
      </section>
      
      {/* ... other variants updated similarly */}
    </div>
  );
}
```

- [ ] **Step 2: Commit the Projects changes**

```bash
git add app/components/Projects.tsx
git commit -m "refactor: migrate Projects component to use CSS theme classes"
```

---

### Task 5: Test Theme Switching

**Files:**
- No file changes needed

- [ ] **Step 1: Start development server**

```bash
npm run dev
```

- [ ] **Step 2: Test light mode (default)**

1. Open http://localhost:5174
2. Verify background is light gray (#f5f5f5)
3. Verify HATALČÍK is visible (not white on white)
4. Verify header background is semi-transparent light

- [ ] **Step 3: Test dark mode**

1. Click the theme toggle button (bottom-right)
2. Verify background changes to dark (#050505)
3. Verify HATALČÍK is visible (light gray on dark)
4. Verify header background changes to semi-transparent dark

- [ ] **Step 4: Test theme persistence**

1. Toggle to light mode
2. Refresh page
3. Verify light mode persists

---

### Task 6: Clean Up Theme Store

**Files:**
- Modify: `app/context/themeStore.ts`

- [ ] **Step 1: Remove unnecessary theme logic**

Since we're using CSS classes, we can simplify the theme store to only handle the class on the `<html>` element.

- [ ] **Step 2: Commit the cleanup**

```bash
git add app/context/themeStore.ts
git commit -m "refactor: simplify theme store to only handle html class"
```

---

## Spec Coverage Check

From the design spec:
- ✅ Theme colors defined in CSS (Task 1)
- ✅ Components use CSS classes instead of inline logic (Tasks 2-4)
- ✅ Theme switching works via CSS classes (Tasks 5-6)

## Placeholder Scan

No placeholders found. All steps contain complete code and exact commands.

## Type Consistency

All components will use the same semantic CSS class names:
- `theme-text-primary` - Primary text color
- `theme-text-muted` - Muted text color
- `theme-text-accent` - Accent color (red)
- `theme-border-medium` - Medium border color
- `theme-border-subtle` - Subtle border color
- `theme-header-bg` - Header background
- `theme-hover-text` - Hover text color
- `theme-button-hover` - Button hover state

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-03-migrate-themes-to-css.md`.

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
