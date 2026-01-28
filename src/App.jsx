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

function orderKey(franchiseId) {
  return `canonpath.order.${franchiseId}`;
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
  const [orderMode, setOrderMode] = useState("release");


useEffect(() => {
  // load watched per-franchise
  const raw = localStorage.getItem(storageKey(selected.id));
  setWatched(raw ? JSON.parse(raw) : {});

  // load order mode per-franchise
  const rawOrder = localStorage.getItem(orderKey(selected.id));
  const allowed = selected.orderModes ?? ["release"];
  const next =
    rawOrder && allowed.includes(rawOrder)
      ? rawOrder
      : (allowed[0] ?? "release");
  setOrderMode(next);
}, [selected.id, selected.orderModes]);
useEffect(() => {
  localStorage.setItem(orderKey(selected.id), orderMode);
}, [selected.id, orderMode]);

  useEffect(() => {
    localStorage.setItem(storageKey(selected.id), JSON.stringify(watched));
  }, [selected.id, watched]);

  function toggleWatched(entryId) {
    setWatched((prev) => ({ ...prev, [entryId]: !prev[entryId] }));
  }

  const orderedEntries = useMemo(() => {
  const entries = selected.entries ?? [];
  const orders = selected.orders ?? {};
  const ids = orders[orderMode];

  if (!Array.isArray(ids) || ids.length === 0) return entries;

  const byId = new Map(entries.map((e) => [e.id, e]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}, [selected, orderMode]);


  const filteredEntries = useMemo(() => {
  const q = query.trim().toLowerCase();
  if (!q) return orderedEntries;

  return orderedEntries.filter((e) => {
    const hay = `${e.title} ${e.year} ${e.type}`.toLowerCase();
    return hay.includes(q);
  });
}, [orderedEntries, query]);

  
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
<div className="orderRow">
  <div className="muted" style={{ marginBottom: 6 }}>
    Order
  </div>

  <div className="segmented">
    <button
      type="button"
      className={orderMode === "release" ? "segActive" : "seg"}
      onClick={() => setOrderMode("release")}
    >
      Release
    </button>

    <button
      type="button"
      className={orderMode === "chronological" ? "segActive" : "seg"}
      onClick={() => setOrderMode("chronological")}
    >
      Chronological
    </button>
  </div>
</div>

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
            entries={filteredEntries} watched={watched} />
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
