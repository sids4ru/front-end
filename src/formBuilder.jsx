import React, { useState } from "react";

export default function FormBuilder() {
  const formSchema = [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email" },
    { name: "age", label: "Age", type: "number" },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: ["Admin", "Editor", "Viewer"],
    },
    { name: "subscribe", label: "Subscribe", type: "checkbox" },
  ];

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h3>🧱 Dynamic Form Builder</h3>
      <DynamicForm schema={formSchema} />
    </div>
  );
}

function DynamicForm({ schema }) {
  const initialValues = schema.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});

  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(values);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {schema.map((field) => (
        <div key={field.name} style={styles.field}>
          <label style={styles.label}>
            {field.label}
            {field.required && <span style={styles.required}>*</span>}
          </label>

          {field.type === "select" ? (
            <select
              value={values[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              style={styles.input}
            >
              <option value="">Select...</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            <input
              type="checkbox"
              checked={values[field.name]}
              onChange={(e) => handleChange(field.name, e.target.checked)}
            />
          ) : (
            <input
              type={field.type}
              value={values[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              style={styles.input}
            />
          )}
        </div>
      ))}

      <button type="submit" style={styles.button}>
        Submit
      </button>

      {submitted && (
        <pre style={styles.result}>{JSON.stringify(submitted, null, 2)}</pre>
      )}
    </form>
  );
}

// --- Styles ---
const styles = {
  form: { maxWidth: 400, display: "flex", flexDirection: "column", gap: 12 },
  field: { display: "flex", flexDirection: "column" },
  label: { fontWeight: "bold", marginBottom: 4 },
  input: { padding: 6, borderRadius: 4, border: "1px solid #ccc" },
  button: {
    marginTop: 12,
    padding: 8,
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  required: { color: "red", marginLeft: 4 },
  result: {
    marginTop: 16,
    background: "#f9f9f9",
    padding: 12,
    borderRadius: 4,
  },
};
