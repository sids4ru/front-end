import React from "react";

const styles = {
  container: {
    height: "500px",
    width: "300px",
    overflowY: "auto",
    border: "1px solid #ccc",
    position: "relative",
  },
  inner: {
    position: "relative",
  },
  row: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "70px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px",
    borderBottom: "1px solid #eee",
    boxSizing: "border-box",
  },
  img: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#f0f0f0",
  },
  placeholder: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#eee",
  },
  name: {
    fontSize: "14px",
  },
};

const LazyImage = ({ src, alt }) => {
  const [visible, setVisible] = React.useState(false);
  const imgRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef}>
      {visible ? (
        <img src={src} alt={alt} style={styles.img} loading="lazy" />
      ) : (
        <div style={styles.placeholder} />
      )}
    </div>
  );
};

export default function VirtualizedList() {
  const itemCount = 10000;
  const itemHeight = 70;
  const viewportHeight = 500;
  const overscan = 5;

  const [scrollTop, setScrollTop] = React.useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    itemCount - 1,
    Math.floor((scrollTop + viewportHeight) / itemHeight) + overscan
  );

  const visibleItems = [];
  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push(i);
  }

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div style={styles.container} onScroll={handleScroll}>
      <div
        style={{
          ...styles.inner,
          height: `${itemCount * itemHeight}px`,
        }}
      >
        {visibleItems.map((index) => {
          const top = index * itemHeight;
          return (
            <div key={index} style={{ ...styles.row, top }}>
              <LazyImage
                src={`https://randomuser.me/api/portraits/men/${index % 100}.jpg`}
                alt={`User ${index + 1}`}
              />
              <span style={styles.name}>User {index + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
