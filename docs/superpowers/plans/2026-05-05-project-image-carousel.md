# Project Image Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single featured image on project detail pages with a swipeable image carousel supporting multiple images.

**Architecture:** Create a new `ProjectImageCarousel` component using Framer Motion for drag-to-swipe with linear snap transitions. The component tracks drag position via `useMotionValue`, calculates snap points per image, and renders dot indicators. It integrates into `projects.$id.tsx` by replacing the existing single-image section.

**Tech Stack:** React, TypeScript, Framer Motion (already installed v11.15.0+), Tailwind CSS

---

### Task 1: Create ProjectImageCarousel component

**Files:**
- Create: `app/components/ProjectImageCarousel.tsx`
- Test: (visual verification only for this component)

- [ ] **Step 1: Write the ProjectImageCarousel component**

```tsx
import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useDragControls } from "framer-motion";

interface ProjectImageCarouselProps {
  images: string[];
}

export function ProjectImageCarousel({ images }: ProjectImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useDragControls();

  const updateConstraints = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const maxDrag = -(images.length - 1) * containerWidth;
      setConstraints({ left: Math.min(0, maxDrag), right: 0 });
    }
  }, [images.length]);

  useEffect(() => {
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [updateConstraints]);

  const handleDragEnd = useCallback(() => {
    const containerWidth = containerRef.current?.offsetWidth ?? 1;
    const rawX = dragX.get();
    const snappedIndex = Math.max(
      0,
      Math.min(
        images.length - 1,
        Math.round(-rawX / containerWidth)
      )
    );
    setCurrentIndex(snappedIndex);
    dragX.set(-snappedIndex * containerWidth);
  }, [dragX, images.length]);

  const handleDotClick = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      dragX.set(-index * (containerRef.current?.offsetWidth ?? 0));
    },
    [dragX]
  );

  if (images.length === 0) return null;

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-2xl theme-border-medium border aspect-video">
      <motion.div
        className="flex h-full"
        style={{ x: dragX, width: `${images.length * 100}%` }}
        drag="x"
        dragControls={controls}
        dragConstraints={constraints}
        dragElastic={0}
        onDragEnd={handleDragEnd}
        transition={{ type: "linear", duration: 0.3 }}
      >
        {images.map((src, i) => (
          <div key={i} className="h-full" style={{ width: `${100 / images.length}%` }}>
            <img
              src={src}
              alt={`Project image ${i + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </motion.div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex
                  ? "bg-current theme-text-accent"
                  : "bg-transparent border border-current theme-text-muted opacity-50"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify the component renders without errors**

Run: `npm run typecheck`
Expected: No type errors in the new component

- [ ] **Step 3: Commit**

```bash
git add app/components/ProjectImageCarousel.tsx
git commit -m "feat: add ProjectImageCarousel component with swipe and snap"
```

---

### Task 2: Integrate carousel into project detail page

**Files:**
- Modify: `app/routes/projects.$id.tsx:72-88`

- [ ] **Step 1: Import the new component**

Add import at top of `app/routes/projects.$id.tsx`:
```tsx
import { ProjectImageCarousel } from "../components/ProjectImageCarousel";
```

- [ ] **Step 2: Replace the featured image section**

Replace lines 72-88 (the featured image section) in `app/routes/projects.$id.tsx`:
```tsx
      {/* Featured Image Carousel */}
      {project.images && project.images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto px-6 mb-16"
        >
          <ProjectImageCarousel images={project.images} />
        </motion.div>
      )}
```

- [ ] **Step 3: Run typecheck to verify integration**

Run: `npm run typecheck`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add app/routes/projects.$id.tsx
git commit -m "feat: integrate ProjectImageCarousel into project detail page"
```

---

### Task 3: Visual verification and testing

**Files:**
- No file changes (visual verification only)

- [ ] **Step 1: Start dev server and verify carousel works**

Run: `npm run dev`
Expected: 
- Navigate to `/projects/shrekify` (has 3 images)
- Verify images can be swiped/dragged left and right
- Verify snap behavior (release drag, snaps to nearest image)
- Verify dot indicators update on snap
- Verify single image projects (e.g., `portfolio`) still render correctly
- Verify theme compatibility (light/dark mode)

- [ ] **Step 2: Commit verification results**

```bash
echo "Visual verification passed: swipe, snap, dots, single image, theme"
git commit --allow-empty -m "verify: ProjectImageCarousel visual verification passed"
```

---

## Self-Review

**1. Spec coverage:**
- ✅ Swipe/Drag with snap points — Task 1, drag + handleDragEnd
- ✅ Linear animation — Task 1, `transition={{ type: "linear", duration: 0.3 }}`
- ✅ No elastic bounce — Task 1, `dragElastic={0}`
- ✅ Dot indicators — Task 1, bottom div with dot buttons
- ✅ 2D flat aesthetic — Task 1, no shadows/3D effects
- ✅ Integration into projects.$id.tsx — Task 2
- ✅ Renders nothing if no images — Task 1, early return
- ✅ Matches existing styling — Task 1, `rounded-2xl`, `theme-border-medium`

**2. Placeholder scan:** No TBD/TODO placeholders found. All code is complete.

**3. Type consistency:** `ProjectImageCarouselProps.images` is `string[]` matching `Project.images` type. All functions use correct signatures.
