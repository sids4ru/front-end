import React, { useEffect, useRef, useState } from "react";

const ITEM_HEIGHT = 150;
const VISIBLE_COUNT = 8;

function VirtualizedList({ items }) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const endIndex = Math.min(startIndex + VISIBLE_COUNT, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  const totalHeight = items.length * ITEM_HEIGHT;
  const offsetY = startIndex * ITEM_HEIGHT;

  return (
    <div
      ref={containerRef}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
      style={{
        height: VISIBLE_COUNT * ITEM_HEIGHT,
        overflowY: "auto",
        border: "1px solid #ccc",
      }}
    >
      <div style={{ position: "relative", height: totalHeight }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: "absolute",
            width: "100%",
          }}
        >
          {visibleItems.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ListItem({ item }) {
  const imgRef = useRef();
  const [visible, setVisible] = useState(false);

  // Lazy load image
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      style={{
        height: ITEM_HEIGHT - 10,
        margin: "5px 0",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        padding: "8px",
        background: "#fafafa",
      }}
    >
      {visible ? (
        <img
          src={`https://picsum.photos/id/${item.id}/120/80`}
          alt=""
          style={{ borderRadius: 4, marginRight: 10 }}
        />
      ) : (
        <div
          style={{
            width: 120,
            height: 80,
            background: "#ddd",
            marginRight: 10,
            borderRadius: 4,
          }}
        />
      )}
      <div>
        <strong>{item.title}</strong>
        <p style={{ margin: 0, fontSize: 12, color: "#555" }}>
          Item #{item.id}
        </p>
      </div>
    </div>
  );
}

export default function ImageList() {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    title: `Photo ${i + 1}`,
  }));

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h3>🪄 Virtualized List with Lazy Image Loading</h3>
      <VirtualizedList items={items} />
    </div>
  );
}
