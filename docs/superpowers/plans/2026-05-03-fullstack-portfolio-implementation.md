# Full-Stack Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page React portfolio with glassmorphism header, hero section, projects grid, and experience timeline using Tailwind CSS and Framer Motion.

**Architecture:** Modular component structure with static content, scroll-triggered animations via Framer Motion hooks, and responsive design via Tailwind breakpoints.

**Tech Stack:** React Router v7, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React

---

## File Structure

**Files to Create:**
- `app/components/Header.tsx` - Sticky glassmorphism navigation
- `app/components/Hero.tsx` - Large typography with reveal animations
- `app/components/Projects.tsx` - Project cards with hover effects
- `app/components/Experience.tsx` - Timeline section
- `app/components/Footer.tsx` - Minimal footer
- `app/components/ScrollProgress.tsx` - Top progress bar indicator
- `app/constants/projects.ts` - Project data TypeScript file

**Files to Modify:**
- `app/root.tsx` - Update to include Playfair Display font
- `app/app.css` - Update theme colors and dark mode
- `app/routes/home.tsx` - Replace Welcome with portfolio components
- `package.json` - Add Framer Motion and Lucide React dependencies

---

## Dependencies Installation

### Task 1: Install Framer Motion and Lucide React

**Files:**
- Modify: `package.json` (dependencies section)

- [ ] **Step 1: Update package.json dependencies**

Add to `dependencies` section:

```json
{
  "dependencies": {
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.453.0"
  }
}
```

- [ ] **Step 2: Install packages**

Run: `npm install`

Expected: Package installation completes without errors

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add framer-motion and lucide-react dependencies"
```

---

## Fonts and Theme Setup

### Task 2: Update Root Layout with Fonts

**Files:**
- Modify: `app/root.tsx`

- [ ] **Step 1: Update LinksFunction to include Playfair Display**

Modify `app/root.tsx` lines 13-24:

```tsx
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@1,900&display=swap",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add app/root.tsx
git commit -m "feat: add Playfair Display font to root layout"
```

---

### Task 3: Update app.css with Theme Variables

**Files:**
- Modify: `app/app.css`

- [ ] **Step 1: Update theme section**

Replace existing `@theme` section with:

```css
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

- [ ] **Step 2: Update body styles**

Replace body section:

```css
html, body {
  background-color: #050505;
  color: #d1d1d1;
  overflow-x: hidden;
  font-family: "Inter", sans-serif;
}

@media (prefers-color-scheme: dark) {
  body {
    color-scheme: dark;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add app/app.css
git commit -m "feat: add theme variables and dark mode styles"
```

---

## Project Data

### Task 4: Create Projects Data Constant

**Files:**
- Create: `app/constants/projects.ts`

- [ ] **Step 1: Create the file with project data**

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  backgroundLabel: string;
  skills: string[];
  link: string;
  linkText: string;
}

export const projects: Project[] = [
  {
    id: "singsync",
    title: "SingSync",
    description: "Orchestrating AI-driven vocal separation and real-time lyric synchronization.",
    backgroundLabel: "SINGSYNC",
    skills: ["Microservices", "Python", "K8s"],
    link: "#",
    linkText: "View System Design",
  },
  {
    id: "textinator",
    title: "TextinatorX",
    description: "Distributed OCR engine handling high-concurrency image processing through event-sourcing.",
    backgroundLabel: "TEXTINATOR",
    skills: ["Kafka", "C# .NET", "SignalR"],
    link: "#",
    linkText: "Explore GitHub",
  },
  {
    id: "juiceworld",
    title: "JuiceWorld",
    description: "Full-stack E-commerce platform with layered architecture and optimized cloud data caching.",
    backgroundLabel: "JUICEWORLD",
    skills: ["ASP.NET MVC", "PostgreSQL"],
    link: "#",
    linkText: "Case Study",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add app/constants/projects.ts
git commit -m "feat: add project data constants"
```

---

## Component Implementation

### Task 5: Build Header Component

**Files:**
- Create: `app/components/Header.tsx`

- [ ] **Step 1: Create Header.tsx with glassmorphism**

```tsx
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full z-100"
      style={{
        background: "rgba(5, 5, 5, 0.8)",
        backdropFilter: "blur(15px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <div className="flex justify-between items-center px-6 py-5 md:px-20">
        <div className="flex items-center gap-4">
          <div className="h-3 w-3 bg-[#b93d27]"></div>
          <span className="text-[11px] font-bold tracking-[0.5em] text-white uppercase">
            M. HATALČÍK
          </span>
        </div>
        <nav className="flex gap-12 items-center">
          <a
            href="#work"
            className="nav-link uppercase text-[10px] tracking-widest font-bold text-neutral-500 hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#experience"
            className="nav-link uppercase text-[10px] tracking-widest font-bold text-neutral-500 hover:text-white transition-colors"
          >
            Experience
          </a>
          <a
            href="mailto:mario.hatalcik@gmail.com"
            className="px-6 py-2 border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
          >
            Contact
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Header.tsx
git commit -m "feat: add Header component with glassmorphism"
```

---

### Task 6: Build Hero Component

**Files:**
- Create: `app/components/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx with reveal animations**

```tsx
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="h-[80vh] flex flex-col justify-center items-start px-6 md:px-20 select-none overflow-hidden relative">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h1
          className="text-[clamp(3rem,16vw,22rem)] font-black leading-[0.85] tracking-[-0.05em] uppercase text-[#b93d27]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          MÁRIO
        </h1>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="w-full"
      >
        <h1
          className="text-[clamp(3rem,16vw,22rem)] font-black leading-[0.85] tracking-[-0.05em] text-right w-full text-[#555]"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
        >
          HATALČÍK
        </h1>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Hero.tsx
git commit -m "feat: add Hero component with reveal animations"
```

---

### Task 7: Build Projects Component

**Files:**
- Create: `app/components/Projects.tsx`

- [ ] **Step 1: Create Projects.tsx with grid and hover effects**

```tsx
import { motion } from "framer-motion";
import { projects } from "../constants/projects";

export function Projects() {
  return (
    <section id="work" className="py-20 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        <div className="mb-20">
          <p className="text-[10px] uppercase tracking-[0.6em] text-neutral-600 mb-4 font-bold">
            Selected Work
          </p>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white italic">
            Projects.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative aspect-video bg-[#0f0f0f] rounded-lg border border-white/5 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ fontSize: "12vw", fontWeight: 900, color: "rgba(255,255,255,0.02)", whiteSpace: "nowrap" }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.backgroundLabel}
                </motion.div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end z-10">
                <div className="flex gap-3 mb-6 flex-wrap">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-3 py-1 bg-[#b93d27]/10 border border-[#b93d27]/20 text-[#b93d27] uppercase tracking-wider font-bold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {project.title}
                </h3>
                <p className="text-neutral-400 max-w-xl text-lg mb-8 leading-relaxed">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="w-fit text-[11px] font-black tracking-[0.3em] uppercase text-white border-b-2 border-[#b93d27] pb-1 hover:text-[#b93d27] transition-colors"
                >
                  {project.linkText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Projects.tsx
git commit -m "feat: add Projects component with grid layout and hover effects"
```

---

### Task 8: Build Experience Component

**Files:**
- Create: `app/components/Experience.tsx`

- [ ] **Step 1: Create Experience.tsx with timeline and scroll reveal**

```tsx
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const experiences = [
  {
    year: "2025",
    title: "RationAl",
    role: "Pipeline Maintainer",
  },
  {
    year: "2025",
    title: "PuxDesign",
    role: "Full-stack Developer",
  },
  {
    year: "2024",
    title: "Tricentis",
    role: "QA Automation",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-40 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold italic text-white mb-16">
          Timeline
        </h2>
        <div className="space-y-12 border-l border-white/5 pl-8">
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ year, title, role }: { year: string; title: string; role: string }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <span className="text-[10px] font-bold text-[#b93d27] tracking-widest">
        {year}
      </span>
      <h3 className="text-2xl font-bold text-white mt-2">
        {title} / {role}
      </h3>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Experience.tsx
git commit -m "feat: add Experience component with timeline and scroll reveal"
```

---

### Task 9: Build Footer Component

**Files:**
- Create: `app/components/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

```tsx
export function Footer() {
  return (
    <footer className="py-20 text-center border-t border-white/5">
      <p className="text-[9px] uppercase tracking-[1em] text-neutral-800">
        Mário Hatalčík &copy; 2024
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 10: Build ScrollProgress Component

**Files:**
- Create: `app/components/ScrollProgress.tsx`

- [ ] **Step 1: Create ScrollProgress.tsx**

```tsx
import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-[2px] bg-[#b93d27] z-[101]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/ScrollProgress.tsx
git commit -m "feat: add ScrollProgress component"
```

---

## Route Integration

### Task 11: Update Home Route

**Files:**
- Modify: `app/routes/home.tsx`

- [ ] **Step 1: Replace Welcome with portfolio components**

Replace `app/routes/home.tsx` entirely:

```tsx
import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";
import { Experience } from "../components/Experience";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ScrollProgress";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mário Hatalčík | Full-stack Developer" },
    { name: "description", content: "Full-stack developer portfolio showcasing projects and experience" },
  ];
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/routes/home.tsx
git commit -m "feat: integrate portfolio components into home route"
```

---

## Testing and Verification

### Task 12: Run Typecheck and Build

**Files:**
- No file changes

- [ ] **Step 1: Run typecheck**

Run: `npm run typecheck`

Expected: No TypeScript errors

- [ ] **Step 2: Run build**

Run: `npm run build`

Expected: Build completes successfully

- [ ] **Step 3: Commit verification results**

```bash
git commit -m "chore: verify typecheck and build pass"
```

---

## Final Checklist

- [ ] Headers with glassmorphism and sticky positioning
- [ ] Hero section with split-text typography and reveal animations
- [ ] Projects section with grid layout and hover effects
- [ ] Experience timeline with scroll-triggered reveals
- [ ] Scroll progress indicator at top
- [ ] Mobile-responsive layout
- [ ] All components integrated into home route
- [ ] Typecheck passes
- [ ] Build passes
