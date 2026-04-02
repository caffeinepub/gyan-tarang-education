# Gyan Tarang Education & Technology

## Current State
App is running v12 with Cosmic Dark + Neon Cyan/Green theme:
- Dark space background (deep black/dark blue)
- Neon cyan/green glowing accents
- Twinkling starfield animation (StarfieldBackground component)
- Dark navbar, dark cards, dark footer
- All 22+ pages, Admin Panel, Gyan Mitra AI, 5 Advanced AI pages, Gamification system

## Requested Changes (Diff)

### Add
- Vibrant multicolor rainbow accents: pink, purple, blue, green, orange used across different sections/components
- Bright colorful gradient backgrounds on hero sections (white + multicolor gradients)
- Colorful card borders/accent lines per category (AI features = purple, NCERT = green, Competitive = orange, etc.)
- Colorful animated floating shapes/bubbles replacing starfield (soft pastel colored circles in background)

### Modify
- Background: dark space → clean white/light gray (#f8fafc or white)
- Navbar: dark/neon → white with colorful gradient logo area and rainbow underline
- Footer: dark → light white/gray with colorful accent
- All card backgrounds: dark → white with colorful border accents
- All text: neon/white-on-dark → dark text (#1e293b) on light backgrounds
- Buttons: neon glow → bright colorful gradients (pink-to-purple, blue-to-cyan, orange-to-yellow)
- StarfieldBackground: replace with LightBubbleBackground (soft floating colored circles)
- Hero sections: dark gradient → white/light with vibrant multicolor gradient accents
- index.css CSS variables: update all dark theme variables to light bright theme
- tailwind.config.js: update color palette to bright multicolor

### Remove
- Starfield/space/dark CSS classes and variables
- Neon glow effects (box-shadow: neon cyan/green)
- Dark background colors everywhere

## Implementation Plan
1. Update index.css - replace all dark/neon CSS variables with light bright multicolor palette
2. Update tailwind.config.js - add bright multicolor color tokens
3. Replace StarfieldBackground.tsx with LightBubbleBackground.tsx (animated soft colored floating circles)
4. Update Navbar.tsx - white background, colorful logo area, rainbow gradient accents
5. Update Footer.tsx - white/light background, colorful accents
6. Update LandingPage.tsx - white background, multicolor gradient hero, colorful feature cards
7. Update DashboardPage.tsx - white background, colorful stat cards
8. Update all AI pages (AIStudyPlannerPage, AIQuizGeneratorPage, AIPerformancePage, AICareerPage, AISummarizerPage) - light theme
9. Update all other pages (NCERTPage, VideoLecturesPage, NotesPage, MockTestsPage, etc.) - light theme
10. Ensure all text is dark (#1e293b) on light backgrounds for readability
