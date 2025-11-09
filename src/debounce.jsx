import React, { useState, useEffect, useRef } from "react";

// --- Custom hook for debouncing any fast-changing value ---
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// --- Simple fake search API ---
async function fetchSuggestions(query, signal) {
  if (!query) return [];
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users?q=${query}`,
    { signal }
  );
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  // return only first 5
  return data.slice(0, 5).map((u) => u.name);
}

// --- Main component ---
function Debounce() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    // cancel any ongoing request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    async function search() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSuggestions(debouncedQuery, controller.signal);
        setResults(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    search();

    // cleanup
    return () => controller.abort();
  }, [debouncedQuery]);

  const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div style={styles.container}>
      <h3>🔍 Debounced Search with Suggestions</h3>

      <input
        style={styles.input}
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p style={styles.info}>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && results.length > 0 && (
        <ul style={styles.dropdown}>
          {results.map((r, idx) => (
            <li key={idx} style={styles.item}>
              {highlightMatch(r, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "100px auto",
    fontFamily: "sans-serif",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  dropdown: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    border: "1px solid #ddd",
    borderRadius: 4,
    backgroundColor: "#fff",
    position: "absolute",
    width: "100%",
    top: 48,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 10,
  },
  item: {
    padding: "8px 10px",
    cursor: "pointer",
  },
  info: {
    marginTop: 8,
    color: "#555",
  },
};

export default Debounce;
