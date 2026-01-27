export default function FranchisePicker({ franchises, selectedId, onSelect }) {
    return (
      <div>
        <label className="label">
          Franchise
          <select
            className="select"
            value={selectedId}
            onChange={(e) => onSelect(e.target.value)}
          >
            {franchises.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
  