# CanonPath — WORK_PLAN.md

This document defines the **canonical work plan** for evolving CanonPath from
a curated franchise tracker into an **integrated, local-first watch planner**
for **TV series + movies**, without breaking existing functionality.

This file is the source of truth for scope, sequencing, and design intent.

---

## Guiding Principles (Non-Negotiable)

- Local-first (no required backend)
- One source of truth for watched state
- TV + Movies integrated (not separate modes)
- Existing franchises must not break
- One phase at a time — no skipping ahead
- Planning before coding, coding before polish

If a change violates these, stop and revise the plan.

---

## PHASE 0 — Freeze & Baseline (NOW)

**Goal:** Lock the current working state so we never regress.

### Tasks
- [ ] Verify current app stability:
  - Franchise picker works
  - Order: Release / Chronological works
  - Show filter: All / Watched / Unwatched works
  - Next Up ignores viewMode and always shows next unwatched
  - Progress stats reflect visible list
- [ ] Commit current state
- [ ] Tag commit: `pre-library-integration`

**Exit condition:**  
Refreshing the app preserves state and all existing features behave correctly.

---

## PHASE 1 — Conceptual Foundation (NO CODE)

**Goal:** Lock the mental model and terminology.

### Decisions (Locked)
- Everything is a **Collection**
  - Curated franchises (Marvel, Star Wars)
  - TV series (e.g. Prison Break)
  - Movie collections / watchlists
- Watchable units are **WatchItems**
  - `movie`
  - `episode`
- Episodes are the atomic watched unit
- Season watched state is derived
- Movies + TV supported from day one
- Posters included from day one
- Movies: “Ask once, remember destination”

### Deliverables
- [ ] Written definition of:
  - Collection
  - WatchItem
  - Watched state rules
  - Next Up rules

**Exit condition:**  
The system can be clearly explained without ambiguity.

---

## PHASE 2 — Data & Storage Strategy (NO CODE)

**Goal:** Decide storage and IDs before fetching any data.

### Tasks
- [ ] Storage split:
  - IndexedDB → collections, watch items, episodes
  - localStorage → UI preferences only
- [ ] ID strategy:
  - Movie: `tmdb:movie:<id>`
  - Series: `tmdb:tv:<id>`
  - Episode: `tmdb:tv:<id>:s<season>e<episode>`
- [ ] Duplication rules:
  - Same provider ID = same item
- [ ] Migration plan:
  - Existing franchises become curated Collections

**Exit condition:**  
We know exactly how Prison Break would be stored before writing any fetch logic.

---

## PHASE 3 — Add / Search UX (DESIGN ONLY)

**Goal:** Lock how users add TV shows and movies.

### Tasks
- [ ] Add button placement (global, header)
- [ ] Search behavior (multi-search, debounce)
- [ ] Result row layout:
  - Poster
  - Title
  - Year
  - Type badge (Movie / TV)
- [ ] Add rules:
  - TV → always new Collection
  - Movie → ask destination once, remember
- [ ] Duplicate detection + messaging

**Exit condition:**  
The Add flow can be sketched and matches expected behavior.

---

## PHASE 4 — Series Collection Screen (DESIGN ONLY)

**Goal:** Fully define Option 3 (Season + Episode integration).

### Tasks
- [ ] Default view: Grouped by Season
- [ ] Season row:
  - Episode count
  - Progress
  - Expand / collapse
- [ ] Episode row:
  - Checkbox
  - Episode number + title
  - Watched styling
- [ ] Flat vs Grouped toggle
- [ ] Season-level actions:
  - Mark season watched
  - Reset season
- [ ] Series-level progress calculation

**Exit condition:**  
Every click and toggle behavior is clearly defined.

---

## PHASE 5 — Settings & Ownership (DESIGN ONLY)

**Goal:** Protect the project long-term.

### Tasks
- [ ] TMDb API key handling (user-supplied)
- [ ] Change remembered “Add movie” destination
- [ ] Clear / reset local data
- [ ] Export / import collections (future-proofing)

**Exit condition:**  
The app remains usable across browser resets and API limits.

---

## PHASE 6 — Implementation (CODE — SEQUENTIAL)

**Rule:** Implement one vertical slice at a time.  
No parallel feature work.

### Recommended order
1. Storage abstraction (IndexedDB wrapper)
2. Collection model (read-only)
3. Add/Search (TV only)
4. Series screen (episodes + watched)
5. Next Up integration
6. Movie add flow
7. Migration of existing franchises

Each step must:
- Compile
- Be testable
- Be committed before moving on

---

## PHASE 7 — Polish & Expansion (OPTIONAL)

Only after all previous phases are complete:

- Poster caching
- Mixed collections (movies + episodes)
- Drag-drop custom ordering
- Canon / optional tagging
- Time-based planning (“watch this week”)

---

## How This File Is Used

- This file is referenced before any major change
- Scope changes require updating this file first
- Each new chat/session focuses on **one phase only**
- If things feel unclear, return to this document

---

## Current Status

- Phase 0: ✅ (assumed complete once committed)
- Phase 1: 🔒 Locked
- Phase 2: ⏳ Pending
- Phase 3: ⏳ Pending
- Phase 4: ⏳ Pending
- Phase 5: ⏳ Pending
- Phase 6: ⛔ Not started
