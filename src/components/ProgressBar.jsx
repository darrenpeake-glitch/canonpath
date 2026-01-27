export default function ProgressBar({ entries, watched }) {
    const total = entries.length;
    const complete = entries.filter((e) => watched[e.id]).length;
    const pct = total === 0 ? 0 : Math.round((complete / total) * 100);
  
    return (
      <div>
        <h2 className="h2">Progress</h2>
        <div className="progressRow">
          <div className="progressTrack" aria-label={`Progress ${pct}%`}>
            <div className="progressFill" style={{ width: `${pct}%` }} />
          </div>
          <div className="progressText">
            {complete}/{total} ({pct}%)
          </div>
        </div>
      </div>
    );
  }
  