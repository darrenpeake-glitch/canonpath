# CanonPath — ARCHITECTURE.md (Short)

CanonPath is a **local-first watch planner**. It supports **Collections** that can represent:
- curated franchises (Marvel, Star Wars)
- TV series (all seasons/episodes)
- movie watchlists or mixed collections (future)

No backend is required for core usage.

---

## Core Concepts

### Collection
A “container” the user watches through.

Examples:
- Marvel (curated)
- Star Wars (curated)
- Prison Break (auto-generated TV series)
- My Watchlist (user-created)

Each Collection has:
- a type (curated / tv / custom)
- an order mode set (release / chronological / custom)
- a list (or generator) of WatchItems

### WatchItem
An atomic watchable unit:
- `movie`
- `episode`

Watched state is tracked at the WatchItem level.

---

## Single Source of Truth: Watched State

- Watched state is keyed by **WatchItem ID**
- Episodes are atomic; season watched is derived (all episodes watched)

Examples:
- Movie: `tmdb:movie:603`
- Series: `tmdb:tv:2288`
- Episode: `tmdb:tv:2288:s1e1`

---

## Data Providers

Primary provider: **TMDb**
- search (movie + tv)
- details (movie)
- series → seasons → episodes (tv)
- posters
- optional IMDb ID for linking out

IMDb is link-out only (not a dependency).

---

## Storage (Local-First)

- **IndexedDB**: collections, watch items, episodes, metadata
- **localStorage**: UI preferences only (selected collection, order mode, view mode)

This avoids localStorage limits for large TV catalogs.

---

## Rendering Pipeline (High Level)

1. **Select collection**
2. Resolve items:
   - curated: from bundled JSON
   - tv/custom: from IndexedDB (or generated from metadata)
3. Apply user controls:
   - order mode (release/chronological/custom)
   - show filter (all/watched/unwatched)
   - search filter
4. Compute:
   - progress stats (from visible list)
   - Next Up (first unwatched in order; ignores show filter)

---

## Next Up Rule (Canonical)

Next Up is always:
> first unwatched WatchItem in the current collection’s order

It ignores “Show: Watched/Unwatched” UI filters to stay useful.

---

## Migration Strategy (Existing Franchises)

Existing `franchises.json` entries remain valid:
- treated as curated Collections
- watched map continues to work (until migrated to WatchItem IDs)

Migration is incremental: no breaking changes.

---
