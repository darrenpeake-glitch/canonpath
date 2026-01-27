export default function NextUp({ entries, watched }) {
    const next = entries.find((e) => !watched[e.id]);
  
    return (
      <div>
        <h2 className="h2">Next Up</h2>
        {next ? (
          <div className="nextUp">
            <div className="nextTitle">{next.title}</div>
            <div className="muted">
              {next.type} • {next.year}
            </div>
          </div>
        ) : (
          <div className="nextUp">
            <div className="nextTitle">Franchise complete</div>
            <div className="muted">Everything in this list is marked watched.</div>
          </div>
        )}
      </div>
    );
  }
  