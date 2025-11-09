import React, { useState, useMemo } from "react";

export default function SearchTable() {
  const names = [
    "Alice", "Bob", "Charlie", "David", "Eve",
    "Frank", "Grace", "Hank", "Ivy", "Jack",
    "Kathy", "Leo", "Mona", "Nina", "Oscar",
  ];

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h3>📋 Simple React Table (1 Column)</h3>
      <Table data={names} />
    </div>
  );
}

function Table({ data, pageSize = 5 }) {
  const [filter, setFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  // 1️⃣ Filter
  const filtered = useMemo(() => {
    return data.filter((name) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  // 2️⃣ Sort
  const sorted = useMemo(() => {
    const sortedData = [...filtered].sort((a, b) =>
      sortAsc ? a.localeCompare(b) : b.localeCompare(a)
    );
    return sortedData;
  }, [filtered, sortAsc]);

  // 3️⃣ Pagination
  const totalPages = Math.ceil(sorted.length / pageSize);
  const visibleData = sorted.slice((page - 1) * pageSize, page * pageSize);

  // 4️⃣ Handlers
  const toggleSort = () => setSortAsc((prev) => !prev);

  return (
    <div style={styles.wrapper}>
      <div style={styles.controls}>
        <input
          placeholder="Filter names..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          style={styles.input}
        />
        <button onClick={toggleSort} style={styles.button}>
          Sort {sortAsc ? "▲" : "▼"}
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
          </tr>
        </thead>
        <tbody>
          {visibleData.length ? (
            visibleData.map((name, i) => (
              <tr key={i}>
                <td style={styles.td}>{name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={styles.empty}>No results</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ◀ Prev
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || totalPages === 0}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

// --- Minimal styles ---
const styles = {
  wrapper: { border: "1px solid #ccc", padding: 12, borderRadius: 6 },
  controls: { display: "flex", gap: 8, marginBottom: 10 },
  input: { flex: 1, padding: 6, borderRadius: 4, border: "1px solid #ccc" },
  button: {
    padding: "6px 10px",
    border: "1px solid #aaa",
    borderRadius: 4,
    background: "#f5f5f5",
    cursor: "pointer",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: 8,
    background: "#f0f0f0",
    borderBottom: "1px solid #ccc",
  },
  td: { padding: 8, borderBottom: "1px solid #eee" },
  empty: { textAlign: "center", padding: 20, color: "#777" },
  pagination: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
