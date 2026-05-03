# Full-Stack Developer Portfolio Design Spec

**Date:** 2026-05-03  
**Project:** Mário Hatalčík - Full-Stack Developer Portfolio  
**Status:** Draft  
**Author:** opencode

---

## Overview

Port the existing HTML/CSS/MotionJS portfolio prototype to a React (Vite/TypeScript) single-page application using Tailwind CSS and Framer Motion.

### Goals
- Clean single-page experience without carousel
- Professional dark theme with glassmorphism effects
- Smooth scroll-triggered animations
- Mobile-responsive design

### Success Criteria
1. Header with glassmorphism and sticky positioning
2. Hero section with split-text typography and reveal animations
3. Projects section with grid layout and hover effects
4. Experience timeline with scroll-triggered reveals
5. Scroll progress indicator at top
6. Mobile-responsive layout

---

## Architecture

### Tech Stack
- **Framework:** React Router v7 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Inter, Playfair Display (via Google Fonts)

### Directory Structure
```
app/
├── components/
│   ├── Header.tsx          # Sticky glassmorphism navigation
│   ├── Hero.tsx            # Large typography with reveal-up animations
│   ├── Projects.tsx        # Project cards with hover effects
│   ├── Experience.tsx      # Timeline section
│   └── Footer.tsx          # Minimal footer
│
├── constants/
│   └── projects.ts         # Project data (TypeScript)
│
├── routes/
│   └── home.tsx            # Main SPA route
│
├── root.tsx                # Layout, fonts, meta, ErrorBoundary
└── app.css                 # Tailwind imports, theme variables
```

---

## Component Specifications

### 1. Header (`Header.tsx`)

**Purpose:** Sticky navigation with glassmorphism effect

**Features:**
- Position: fixed, top: 0, full width, z-index: 100
- Background: rgba(5,5,5,0.8) with backdrop-blur(15px)
- Border: 1px solid rgba(255,255,255,0.05) (thin white/5)
- Flex layout: space-between, centered items
- Left: Logo dot + "M. HATALČÍK" text
- Right: Nav links (Projects, Experience) + Contact button
- Contact button: Pill shape, white border, hover black/white swap

**Props:** None (static header)

**Framer Motion:** Initial slide-down animation on load

---

### 2. Hero (`Hero.tsx`)

**Purpose:** Large split-text typography with reveal animations

**Features:**
- Full viewport height (min-h-screen)
- Flex column layout, left-aligned
- Two text lines:
  - Line 1: "MÁRIO" (uppercase, large, deep rust #b93d27)
  - Line 2: "HATALČÍK" (Playfair Display italic, right-aligned, dark gray)
- Typography:
  - Font-size: clamp(3rem, 16vw, 22rem)
  - Line-height: 0.85
  - Letter-spacing: -0.05em
- Animation: Reveal-up from below
  - Initial: { y: 100, opacity: 0 }
  - Animate: { y: 0, opacity: 1 }
  - Stagger: Line 2 delays 0.2s

**Props:** None (static content)

---

### 3. Projects (`Projects.tsx`)

**Purpose:** Display project portfolio with hover effects

**Data Source:** `app/constants/projects.ts`

**Project Structure (TypeScript):**
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  backgroundLabel: string;
  skills: string[];
  link: string;
}
```

**Sample Data:**
- SingSync: AI Karaoke, Python, K8s
- TextinatorX: OCR, C#, Kafka
- JuiceWorld: E-Commerce, .NET MVC

**Layout:**
- Grid: 1 column on mobile, 2-3 columns on larger screens
- Cards: Dark background, subtle border, rounded
- Visual: Large background label (12vw, rgba(255,255,255,0.02))
- Overlay: Gradient at bottom for text visibility

**Hover Effects:**
- Card: Scale up slightly (transform: scale(1.02))
- Background label: Scale up more for spotlight effect
- Smooth transitions (0.3s ease)

**Framer Motion:**
- `whileHover` for scale effects
- `transition` for smooth animation

**Props:** None (static projects grid)

---

### 4. Experience (`Experience.tsx`)

**Purpose:** Timeline section with scroll-triggered reveals

**Features:**
- Left border timeline
- Entries with year (accent color), title (white), company
- Animation: Fade in from left when scrolled into view
- Use `useInView` hook for trigger

**Props:** None (static content)

**Sample Content:**
- 2025: RationAl / Pipeline Maintainer
- 2025: PuxDesign / Full-stack Developer
- 2024: Tricentis / QA Automation

---

### 5. Footer (`Footer.tsx`)

**Purpose:** Minimal footer with copyright

**Features:**
- Border-top: 1px solid rgba(255,255,255,0.05)
- Centered text
- Small copyright notice

---

### 6. Scroll Progress Indicator

**Purpose:** Horizontal progress bar at top of viewport

**Features:**
- Position: Fixed top, full width, height: 2px
- Background: Deep rust (#b93d27)
- Width: Based on scroll progress (0-100%)
- Z-index: 101 (above header)
- Use `useScroll` from Framer Motion

---

## Animation Strategy

### Framer Motion Hooks
- `useInView` - Trigger section reveals when scrolled into view
- `useScroll` - Calculate scroll progress for progress bar
- `useSpring` - Smooth transitions for hover effects (optional)

### Key Animations
1. **Hero text reveal:**
   ```tsx
   <motion.div
     initial={{ y: 100, opacity: 0 }}
     animate={{ y: 0, opacity: 1 }}
     transition={{ duration: 1.2, delay: 0.2 }}
   >
   ```

2. **Section reveals:**
   ```tsx
   const { ref, inView } = useInView({ threshold: 0.1 })
   <motion.div
     ref={ref}
     initial={{ opacity: 0, y: 40 }}
     animate={inView ? { opacity: 1, y: 0 } : {}}
     transition={{ duration: 0.8 }}
   >
   ```

3. **Scroll progress:**
   ```tsx
   const { scrollYProgress } = useScroll()
   <motion.div
     style={{ scaleX: scrollYProgress }}
   />
   ```

---

## Styling & Design Tokens

### Colors
- Background: #050505 (near-black)
- Text primary: #d1d1d1 (light gray)
- Text secondary: #555 (dark gray)
- Accent: #b93d27 (Deep Rust)
- Border: rgba(255,255,255,0.05)

### Fonts
- Sans: Inter (400, 600, 700, 900)
- Serif italic: Playfair Display (900 italic)

### Glassmorphism
- Header background: rgba(5,5,5,0.8)
- Backdrop blur: 15px
- Border: 1px solid rgba(255,255,255,0.05)

---

## Responsive Design

### Breakpoints
- Mobile: < 768px (default Tailwind)
- Tablet: 768px+ (md:)
- Desktop: 1024px+ (lg:)

### Mobile Adjustments
- Hero text: Smaller clamp values (2rem to 12vw)
- Projects grid: Single column
- Header: Compact padding
- Timeline: Left padding adjusted

---

## Technical Requirements

### Package Dependencies (to add)
```
framer-motion@^11.x
lucide-react@^0.x
```

### TypeScript Types
- Project interface in `app/constants/projects.ts`
- No component props needed (static content)

### Code Standards
- No comments (per guidelines)
- Tailwind utility classes only
- Framer Motion for all animations
- TypeScript strict mode

---

## Implementation Order

1. Install dependencies (Framer Motion, Lucide React)
2. Update `app.css` with theme and fonts
3. Create `app/constants/projects.ts`
4. Build `Header.tsx`
5. Build `Hero.tsx`
6. Build `Projects.tsx`
7. Build `Experience.tsx`
8. Build `Footer.tsx`
9. Update `app/routes/home.tsx` with all components
10. Add scroll progress indicator
11. Test mobile responsiveness
12. Run lint/typecheck

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Framer Motion not installed | Add to package.json first |
| Fonts not loading | Verify Google Fonts URLs in root.tsx |
| Mobile layout breaking | Test with browser devtools early |
| Scroll progress performance | Use transform for width (GPU accelerated) |

---

## Success Criteria Checklist

- [ ] Header: Sticky, glassmorphism, correct layout
- [ ] Hero: Large text, reveal animation, split alignment
- [ ] Projects: Grid layout, hover effects, correct data
- [ ] Experience: Timeline, scroll reveal, correct content
- [ ] Footer: Minimal, border-top
- [ ] Scroll progress: Fixed top, tracks scroll position
- [ ] Mobile: Responsive, single column projects
- [ ] Animations: Framer Motion working, no CSS transitions
- [ ] Typecheck: Passes `npm run typecheck`
- [ ] Lint: Passes (if available)
