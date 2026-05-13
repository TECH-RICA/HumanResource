import './Table.css';

export default function Table({ columns, data, emptyMessage = 'No data found', onRowClick }) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} className="table-empty">{emptyMessage}</td></tr>
          ) : (
            data.map((row, i) => (
              <tr key={row.id || i} onClick={() => onRowClick?.(row)} style={onRowClick ? { cursor: 'pointer' } : undefined}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
