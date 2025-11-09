import React, { useEffect, useState, useRef, useCallback } from "react";

const PAGE_SIZE = 10;
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// simple in-memory cache
const cache = new Map();

async function fetchPosts(page) {
  if (cache.has(page)) {
    return cache.get(page);
  }

  const res = await fetch(`${API_URL}?_limit=${PAGE_SIZE}&_page=${page}`);
  if (!res.ok) throw new Error("Failed to load data");

  const data = await res.json();
  cache.set(page, data);
  return data;
}

export default function InfiniteScroll() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loaderRef = useRef(null);

  const loadMore = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPosts(page);
      setPosts((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  // observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);
    return () => current && observer.unobserve(current);
  }, [loadMore]);

  // initial load
  useEffect(() => {
    loadMore();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Infinite Scroll with Caching</h2>

      {posts.map((post) => (
        <div key={post.id} style={styles.card}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}

      {loading && (
        <div style={styles.loader}>
          <div className="skeleton" style={styles.skeleton}></div>
          <div className="skeleton" style={styles.skeleton}></div>
        </div>
      )}

      {error && (
        <div style={styles.error}>
          <p>Error: {error}</p>
          <button onClick={loadMore}>Retry</button>
        </div>
      )}

      <div ref={loaderRef} style={{ height: 20 }} />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "0 auto",
    padding: 16,
    fontFamily: "sans-serif",
  },
  header: {
    textAlign: "center",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  loader: {
    textAlign: "center",
    padding: 20,
  },
  skeleton: {
    backgroundColor: "#eee",
    height: 50,
    marginBottom: 8,
    borderRadius: 8,
    animation: "pulse 1.5s infinite ease-in-out",
  },
  error: {
    textAlign: "center",
    color: "red",
  },
};
