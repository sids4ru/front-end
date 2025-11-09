# React Practice Challenges

📚 **[Start with the Foundation Guide](./fundamentals/foundation.md)** - A comprehensive 4-day interview preparation guide for senior frontend engineers covering JavaScript fundamentals, React advanced concepts, and system design.


This repository contains advanced React challenges designed to test various aspects of React development, from component composition to performance optimization.

## Challenges

### 1. Dynamic Form Builder (Complex State Management + Controlled Components)

**Challenge:**
Build a Dynamic Form Generator that takes a JSON schema as input and renders a corresponding form.

**Example Input:**
```json
[
  { "label": "Name", "type": "text", "required": true },
  { "label": "Age", "type": "number" },
  { "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"] }
]
```

**Requirements:**
- Render inputs dynamically
- Handle validation and controlled inputs
- Display a summary on submit
- Should use React Hooks or state management (Context/Zustand/Redux)

**What it tests:**
- Deep understanding of React component composition, controlled inputs, and dynamic rendering
- Clean architecture and reusability

---

### 2. Infinite Scroll with Caching (Performance + API Handling)

**Challenge:**
Implement an infinite scroll component fetching data from an API (e.g., https://jsonplaceholder.typicode.com/posts) that:
- Loads more data as the user scrolls
- Caches previously loaded pages
- Shows loading skeletons
- Handles API errors gracefully

**What it tests:**
- Knowledge of useEffect, intersection observers, memoization, and custom hooks
- Understanding of performance optimization and network efficiency

---

### 3. Debounced Search with Suggestions (Custom Hooks + Async State)

**Challenge:**
Create a search bar that fetches results after the user stops typing for 500ms (debouncing).

**Requirements:**
- Show a dropdown of search suggestions
- Highlight the matching text in results
- Cancel in-flight requests if the user types again

**What it tests:**
- Mastery of debounce implementation, async data fetching, and race condition handling
- Custom hooks like useDebounce or useAsync

---

### 4. React Table with Sorting, Filtering, and Pagination (Reusable Components)

**Challenge:**
Implement a table component that:
- Takes data and column definitions as props
- Supports client-side sorting, filtering, and pagination
- Keeps track of the sort/filter state

**Example API:**
```jsx
<Table
  data={users}
  columns={[
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", filterable: true }
  ]}
/>
```

**What it tests:**
- Component composition and state lifting
- Ability to design reusable, generic UI components

---

### 5. Virtualized List with Lazy Image Loading (Performance Optimization)

**Challenge:**
Build a large list (e.g., 10,000 items) of user cards with images:
- Only render visible items (virtualization)
- Lazy-load images
- Smooth scrolling performance

**What it tests:**
- Deep understanding of React reconciliation, virtualization concepts (like react-window or react-virtualized)
- Ability to optimize rendering and memory use for scale

---

### 🔍 Bonus (System Design Style React Challenge)

**Challenge:**
Design the frontend architecture for a mini "Spotify Web Player" or "Trello Board".

Discuss folder structure, data flow, caching strategy, lazy loading, and testability.
May include implementing one core component (e.g., draggable cards, or playlist player).

**What it tests:**
- Senior-level architectural thinking and tradeoff reasoning

---

## Setup Information

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
