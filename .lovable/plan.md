

# Snapshot MVP — Implementation Plan

## Design System

**Colors** — Warm earth tones defined as CSS custom properties:
- `--warm-cream`: background (40 33% 97%)
- `--warm-sand`: card backgrounds (38 25% 92%)
- `--warm-terracotta`: primary accent (16 65% 55%)
- `--warm-olive`: secondary accent (85 25% 40%)
- `--warm-charcoal`: text (30 10% 20%)
- `--warm-sage`: muted/subtle (100 15% 75%)

**Typography** — Google Fonts: Lora (serif, headings) + DM Sans (sans, body). Applied via Tailwind `fontFamily` extend.

**Animations** — Custom keyframes for slide-up step transitions, progress bar fill, fade-in for cards.

## File Structure

```
src/
  data/
    mockSchools.ts          # Sample school data with match scores
  types/
    snapshot.ts             # TypeScript types for all form data
  components/
    snapshot/
      ProgressBar.tsx       # 4-step progress indicator with labels
      StepYourMove.tsx      # Step 1: city, country, move date
      StepChildProfile.tsx  # Step 2: name, age, year group, languages, special needs
      StepPreferences.tsx   # Step 3: school type chips, top-3 priorities, toggles
      StepMatches.tsx       # Step 4: ranked school cards with match scores
      SchoolCard.tsx        # Individual school card with expandable application journey
      ChipSelect.tsx        # Reusable chip/tag selector component
  pages/
    Index.tsx               # Landing hero page with CTA → /finder
    Finder.tsx              # Multi-step wizard container
```

## Pages

### Landing Page (`Index.tsx`)
- Full-screen hero with Lora serif headline, warm gradient background
- Subheadline addressing the expat parent pain point
- "Find Your Child's School" CTA button
- 3-column "How it works" section with icons
- Warm, editorial feel — minimal, confident, no clutter

### Finder Wizard (`Finder.tsx`)
Single-page multi-step form managed with React state. No routing between steps — smooth animated transitions.

**Step 1 — Your Move**: Country input, city input, planned move date (month/year picker). Warm illustration or icon.

**Step 2 — Child Profile**: Child's name, date of birth or age, current year group (select), languages spoken (multi-chip), special needs toggle + text area.

**Step 3 — Preferences**: School type chips (Daycare, Nursery, Primary, Secondary, International, Montessori, IB, Local Curriculum). Drag or click to select top 3 priorities from a list (proximity, reputation, language, cost, extracurriculars, etc.). Three toggles: application tracking, document help, timeline building.

**Step 4 — Your Matches**: 4-6 mock school cards ranked by match %. Each card: school name, type badge, location, match score (circular), key highlights. Expandable accordion showing application journey (timeline steps). CTA: "Create your free account to save & track."

## Technical Details

- **State management**: Single `useState` object in `Finder.tsx` holding all form data, passed down to step components via props
- **Step transitions**: CSS `animate-fade-in` with slide-up transform, triggered on step change
- **Progress bar**: Animated width transition with step labels, active step highlighted in terracotta
- **Mock data**: `mockSchools.ts` with ~8 schools across different types, pre-computed match scores based on simple preference matching logic
- **Tailwind config**: Extended with earth tone colors, Lora/DM Sans font families, custom animations
- **index.css**: Updated CSS variables for the warm palette
- **index.html**: Google Fonts link tags for Lora and DM Sans
- **Responsive**: Mobile-first, single column on mobile, centered max-width container on desktop

## Routes
- `/` — Landing page
- `/finder` — Multi-step wizard

