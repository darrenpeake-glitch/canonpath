export default function WatchList({ entries, watched, onToggle }) {
    return (
      <div>
        <h2 className="h2">Watch Order</h2>
        <ul className="list">
          {entries.map((item, idx) => (
            <li key={item.id} className="listItem">
              <label className="checkboxRow">
                <input
                  type="checkbox"
                  checked={!!watched[item.id]}
                  onChange={() => onToggle(item.id)}
                />
                <span className={watched[item.id] ? "watched" : ""}>
                  {idx + 1}. {item.title} <span className="muted">({item.year})</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  