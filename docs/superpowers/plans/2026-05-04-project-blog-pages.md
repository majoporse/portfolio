# Project Blog Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add clickable project cards that navigate to dedicated blog-style pages with magazine/editorial layout.

**Architecture:** Extend the React Router v7 setup with a dynamic `/projects/:id` route that renders a new `project.tsx` route module. The existing `projects.ts` data file serves as the single data source. Project cards become clickable links using React Router's `Link` component.

**Tech Stack:** React Router v7, Framer Motion, Tailwind CSS, TypeScript

---

### Task 1: Add Dynamic Route for Project Pages

**Files:**
- Modify: `app/routes.ts`

- [ ] **Step 1: Add the dynamic route**

```typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects/:id", "routes/project.tsx"),
] satisfies RouteConfig;
```

- [ ] **Step 2: Verify the route compiles**

Run: `cd /home/majoporse/Projects/portfolio && npm run typecheck`
Expected: No errors (may show error about missing project.tsx - that's fine)

- [ ] **Step 3: Commit**

```bash
git add app/routes.ts
git commit -m "feat: add dynamic /projects/:id route"
```

---

### Task 2: Create Project Route Module

**Files:**
- Create: `app/routes/project.tsx`

- [ ] **Step 1: Create the project route with meta and loader**

```typescript
import type { Route } from "./+types/project";
import { useLoaderData, Link } from "react-router";
import { projects } from "../constants/projects";
import { motion } from "framer-motion";
import { useEffect } from "react";

export function meta({ data }: Route.MetaArgs) {
  if (!data?.project) {
    return [
      { title: "Project Not Found | Mário Hatalčík" },
    ];
  }
  return [
    { title: `${data.project.title} | Mário Hatalčík` },
    { name: "description", content: data.project.description },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }
  return { project };
}

export default function Project() {
  const { project } = useLoaderData<typeof loader>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen theme-bg-primary"
    >
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 theme-text-muted hover:theme-text-primary transition-colors text-sm font-medium tracking-wide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto px-6 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex gap-3 mb-6 flex-wrap">
            {project.skills.map((skill) => (
              <span key={skill} className="text-[10px] theme-text-accent uppercase tracking-[0.15em] font-semibold">
                {skill}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold theme-text-primary mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl theme-text-muted leading-relaxed">
            {project.description}
          </p>
        </motion.div>
      </header>

      {/* Featured Image Placeholder */}
      {project.images && project.images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto px-6 mb-16"
        >
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center theme-border-medium border">
            <span className="theme-text-muted text-sm uppercase tracking-wider">Featured Image</span>
          </div>
        </motion.div>
      )}

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        {project.blogContent?.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-lg leading-relaxed theme-text-primary mb-8"
          >
            {paragraph}
          </motion.p>
        ))}

        {/* Project Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t theme-border-medium"
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] font-black tracking-[0.4em] uppercase theme-text-primary border-b-2 theme-border-accent pb-1 theme-hover-text-accent transition-colors"
          >
            {project.linkText} →
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 2: Verify the route compiles**

Run: `cd /home/majoporse/Projects/portfolio && npm run typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/routes/project.tsx
git commit -m "feat: create project blog page with magazine layout"
```

---

### Task 3: Make Project Cards Clickable

**Files:**
- Modify: `app/components/Projects.tsx`

- [ ] **Step 1: Import Link and update project card to be clickable**

```tsx
import { motion, useMotionValue } from "framer-motion";
import { projects } from "../constants/projects";
import { useRef, useState, useEffect } from 'react';
import { SectionHeader } from "./SectionHeader";
import { Link } from "react-router";

export function Projects() {
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const maxDrag = Math.min(0, containerWidth - contentWidth);
        setConstraints({ left: maxDrag, right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <div id="work">
      {/* ===== STRIPE CAROUSEL ===== */}
      <section className="min-h-[80vh] relative overflow-hidden flex flex-col justify-center">
        <SectionHeader subtitle="My favourite" title="Projects"/>
        <div className="my-6">
        </div>

        <div ref={containerRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing py-24 theme-bg-primary">
          <motion.div
            ref={contentRef}
            className="flex gap-8 px-12"
            style={{ x: dragX }}
            drag="x"
            dragConstraints={constraints}
            dragElastic={0.05}
          >
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="flex-shrink-0 w-[400px] md:w-[500px] block"
              >
                <div className="theme-border-medium rounded-2xl py-5 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <div className="flex gap-3 mb-4 flex-wrap px-5">
                    {project.skills.map((skill) => (
                      <span key={skill} className="text-[10px] theme-text-accent uppercase tracking-[0.15em]">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <h3 className={`text-3xl md:text-4xl font-bold theme-text-primary mb-4 px-5`}>
                    {project.title}
                  </h3>
                  <p className={`theme-text-muted text-base leading-relaxed mb-6 flex-grow px-5`}>
                    {project.description}
                  </p>
                  <div className="px-5">
                    <span className={`inline-block text-[10px] font-black tracking-[0.4em] uppercase theme-text-primary border-b-2 theme-border-accent pb-1 theme-hover-text-accent transition-colors`}>
                      View Project →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /home/majoporse/Projects/portfolio && npm run typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/components/Projects.tsx
git commit -m "feat: make project cards clickable with Link to project page"
```

---

### Task 4: Add ScrollReveal Animation to Blog Content

**Files:**
- Modify: `app/routes/project.tsx`

- [ ] **Step 1: Enhance animations with staggered children**

No code changes needed - the `whileInView` with staggered delays in Task 2 already implements this. Verify the current implementation works correctly.

- [ ] **Step 2: Test the animation**

Run: `cd /home/majoporse/Projects/portfolio && npm run dev`
Expected: Visit http://localhost:5173/projects/singsync and verify:
- Page fades in on load
- Blog paragraphs appear one by one on scroll
- Back link works and returns to home page with #work hash

- [ ] **Step 3: Commit (if any tweaks needed)**

```bash
git add app/routes/project.tsx
git commit -m "feat: enhance project page with scroll-reveal animations"
```

---

### Task 5: Add 404 Page for Invalid Project IDs

**Files:**
- Modify: `app/routes/project.tsx` (already throws 404 in loader)

- [ ] **Step 1: Verify the error boundary works**

The ErrorBoundary in `app/root.tsx` already handles 404s. Test by visiting `/projects/nonexistent`.

- [ ] **Step 2: Verify everything works**

Run: `cd /home/majoporse/Projects/portfolio && npm run dev`
Expected: 
- `/projects/singsync` - shows project page
- `/projects/nonexistent` - shows 404 error page
- Click project card - navigates to project page
- Click "Back to Projects" - returns to home with #work section visible

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Single data source (`projects.ts`) - Task 2 uses `projects` array
- ✅ New route `/projects/:id` - Task 1 adds dynamic route
- ✅ Magazine/editorial layout - Task 2 creates hero, content, images sections
- ✅ Framer Motion animations - Task 2 and 4 implement page transitions and scroll reveals
- ✅ Clickable project cards - Task 3 wraps cards in `Link` component
- ✅ Back navigation - Task 2 includes back link to `/#work`

**No placeholders:** All code blocks contain complete, copy-pasteable code.

**Type consistency:** `Project` interface from `projects.ts` is used throughout. Route params use `params.id` consistently.
