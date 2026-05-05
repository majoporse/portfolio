# Project Image Carousel - Design Spec

## Overview

Replace the single featured image on project detail pages with a swipeable image carousel that supports multiple images per project.

## Background

Currently, `app/routes/projects.$id.tsx` displays only the first image from `project.images[0]`. The `Project` interface already supports an `images: string[]` array, and multiple projects (e.g., shrekify) have multiple images defined. The carousel will unlock this existing data.

## Component Design

### `ProjectImageCarousel`

**File**: `app/components/ProjectImageCarousel.tsx`

**Props**:
```ts
interface ProjectImageCarouselProps {
  images: string[];
}
```

**Behavior**:
- Horizontal drag (`drag="x"`) with snap points at each image boundary
- Snap points calculated as: `-currentIndex * containerWidth`
- Linear animation (`type: "linear", duration: 0.3`) for snap transitions — matches the flat 2D aesthetic
- Drag constraints: left bound = `-(images.length - 1) * containerWidth`, right bound = `0`
- No elastic bounce (`dragElastic: 0`) to maintain the 2D flat look
- State: `const [currentIndex, setCurrentIndex] = useState(0)`
- On drag end: snap to nearest image using `Math.round(dragX / containerWidth)`

**Visual Style**:
- Container: `aspect-video`, `rounded-2xl`, `theme-border-medium` border — matches existing featured image styling
- Images: `object-cover`, fill container, inherit border radius
- No shadows, no 3D effects — consistent with 2D flat aesthetic
- Dot indicators: centered at bottom of container
  - Active dot: `theme-text-accent` (filled)
  - Inactive dots: `theme-text-muted` (transparent fill, solid border)
  - Dots sized at `w-2 h-2` (8px), gap of `gap-1.5`

**Framer Motion Usage**:
- `useMotionValue` for tracking drag X position
- `motion.div` for the draggable container
- `animate` prop on individual images for opacity transitions (optional enhancement)

## Integration

**File**: `app/routes/projects.$id.tsx`

Replace the current featured image section (lines 72-88):
```tsx
{project.images && project.images.length > 0 && (
  <ProjectImageCarousel images={project.images} />
)}
```

Remove the old single-image markup entirely.

## Data

No changes to `app/constants/projects.ts`. The `images: string[]` field already exists and contains data for projects like shrekify (3 images).

## Error Handling

- If `images` is empty or undefined, the carousel renders nothing (same as current behavior)
- If an image fails to load, it shows the `aspect-video` gradient placeholder (reuses existing `bg-gradient-to-br` fallback)

## Testing Approach

- Visual verification in browser for:
  - Single image (should still render, no drag needed)
  - Multiple images (drag/swipe between them)
  - Snap behavior (release drag, should snap to nearest image)
  - Dot indicator updates on snap
  - Theme compatibility (light/dark)
