# Project Blog Pages Design

## Overview
Add clickable project cards that navigate to dedicated blog-style pages with magazine/editorial layout, using the existing `projects.ts` as the single data source.

## Data Structure
Extend `app/constants/projects.ts` - the `Project` interface already has `blogContent` and `images` fields.

Images field supports:
- String paths (static images from public/)
- React component references (for styled/shader effects)

## Routing
Add `/projects/:id` route in `app/routes.ts` pointing to a new `app/routes/project.tsx`.

## Project Post Page (`app/routes/project.tsx`)
Magazine/editorial layout:
- Hero section: project title, skills tags, featured image
- Blog content paragraphs interspersed with images
- Framer Motion animations for page entrance and scroll-based reveals
- Back navigation to return to #work section
- Responsive: single column mobile, magazine grid on desktop

## Image Handling
Images array can contain:
- Static image paths
- React components (WebGL/shader effects)

## Animation (Framer Motion)
- Page transition: `AnimatePresence` with slide/fade
- Scroll-triggered animations on images and content
- Staggered children animations for blog paragraphs

## Changes Required
1. Extend `Project` interface if needed for better image support
2. Add `/projects/:id` route in `app/routes.ts`
3. Create `app/routes/project.tsx` with magazine layout
4. Make project cards in `Projects.tsx` clickable (use `useNavigate` or Link)
5. Add Framer Motion animations to project page

## User Decisions
- Expansion method: New route (`/projects/:id`)
- Content layout: Blog + Images with magazine/editorial effects
- Single data source: `projects.ts`
