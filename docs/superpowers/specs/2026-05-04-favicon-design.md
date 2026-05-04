# Favicon Design: Minimalist "M" Initial

## Overview
Replace the existing favicon with a minimalist design featuring the initial "M" (for Mario) in a clean monospace font, suitable for a developer portfolio.

## Visual Design
- **Character**: Uppercase "M" (initial)
- **Font**: JetBrains Mono Bold (already loaded via Google Fonts in root.tsx)
- **Color**: Dark gray (#2D3748) on transparent background
- **Style**: Minimalist, clean, readable at small sizes

## Technical Implementation

### Files to Create
1. `public/favicon.svg` — Primary favicon for modern browsers (scalable vector)
2. `public/favicon.ico` — Legacy fallback (replaces existing file), containing 16×16, 32×32, 48×48, 64×64px sizes

### Code Changes
- **`app/root.tsx`**: Update the `links` function to add explicit favicon links:
  - Add `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`
  - Add `<link rel="alternate icon" href="/favicon.ico">`

## Browser Support
- Modern browsers: Use SVG favicon
- Legacy browsers: Fall back to ICO file
- Works on both light and dark browser tabs (transparent background)

## Success Criteria
- Favicon displays correctly in browser tab
- "M" is legible at 16×16px
- Works in both light and dark mode
- No console errors related to favicon loading
