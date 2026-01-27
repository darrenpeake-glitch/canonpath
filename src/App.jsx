import { useEffect, useMemo, useState } from "react";
import data from "./data/franchises.json";
import FranchisePicker from "./components/FranchisePicker";
import ProgressBar from "./components/ProgressBar";
import NextUp from "./components/NextUp";
import WatchList from "./components/WatchList";
import "./styles/app.css";

function storageKey(franchiseId) {
  return `canonpath.watched.${franchiseId}`;
}

export default function App() {
  const franchises = data.franchises;
  const [selectedId, setSelectedId] = useState(franchises[0].id);
 


  const selected = useMemo(
    () => franchises.find((f) => f.id === selectedId) ?? franchises[0],
    [franchises, selectedId]
  );

  const [watched, setWatched] = useState({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(storageKey(selected.id));
    setWatched(raw ? JSON.parse(raw) : {});
  }, [selected.id]);

  useEffect(() => {
    localStorage.setItem(storageKey(selected.id), JSON.stringify(watched));
  }, [selected.id, watched]);

  function toggleWatched(entryId) {
    setWatched((prev) => ({ ...prev, [entryId]: !prev[entryId] }));
  }

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return selected.entries;
  
    return selected.entries.filter((e) => {
      const hay = `${e.title} ${e.year} ${e.type}`.toLowerCase();
      return hay.includes(q);
    });
  }, [selected.entries, query]);
  
  function markAll(value) {
    const next = {};
    for (const e of selected.entries) next[e.id] = value;
    setWatched(next);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>CanonPath</h1>
        <p className="muted">Pick a franchise. Track progress. Hit “Next Up”.</p>
      </header>

      <section className="card">
        <FranchisePicker
          franchises={franchises}
          selectedId={selected.id}
          onSelect={setSelectedId}
        />
        <div className="searchRow">
  <label className="label">
    Search
    <input
      className="input"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Type a title… (Khan, Endgame, Hope)"
    />
  </label>
</div>

<div className="searchRow">
  <label className="label">
    Search
    <input
      className="input"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Type a title... (e.g. Khan, Endgame, Hope)"
    />
  </label>
</div>

      </section>

      <section className="grid">
        <div className="card">
          <ProgressBar entries={selected.entries} watched={watched} />
          <div className="actions">
            <button onClick={() => markAll(true)}>Mark all watched</button>
            <button onClick={() => markAll(false)} className="secondary">
              Reset
            </button>
          </div>
        </div>

        <div className="card">
          <NextUp 
            entries={filteredEntries}
            watched={watched} />
        </div>
      </section>

      <section className="card">
        <WatchList
          entries={filteredEntries}
          watched={watched}
          onToggle={toggleWatched}
        />
      </section>

      <footer className="footer muted">
        Local-first. No login. Your progress stays in this browser.
      </footer>
    </div>
  );
}
