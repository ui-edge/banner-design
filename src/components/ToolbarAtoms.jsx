// ─── Shared base style for toolbar inputs ────────────────────────────────────
export const inputStyle = {
  background:   "#334155",
  color:        "white",
  border:       0,
  padding:      "4px 6px",
  borderRadius: 4,
  fontSize:     11,
  outline:      "none",
};

// ─── ToolbarLabel ─────────────────────────────────────────────────────────────
export function ToolbarLabel({ children }) {
  return (
    <span style={{
      fontSize:      10,
      fontWeight:    700,
      color:         "#94a3b8",
      letterSpacing: 1,
      textTransform: "uppercase",
    }}>
      {children}
    </span>
  );
}

// ─── ToolItem ─────────────────────────────────────────────────────────────────
/** Wraps a label + control pair in a flex row */
export function ToolItem({ label, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <ToolbarLabel>{label}</ToolbarLabel>
      {children}
    </div>
  );
}

// ─── TSelect ──────────────────────────────────────────────────────────────────
export function TSelect({ value, onChange, children, style }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...inputStyle, ...style }}
    >
      {children}
    </select>
  );
}

// ─── TColor ───────────────────────────────────────────────────────────────────
export function TColor({ value, onChange }) {
  return (
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...inputStyle, width: 40, height: 28, padding: 2, cursor: "pointer" }}
    />
  );
}

// ─── TRange ───────────────────────────────────────────────────────────────────
export function TRange({ value, onChange, min, max, step }) {
  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step ?? 1}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ ...inputStyle, padding: 0, width: 80, cursor: "pointer" }}
    />
  );
}

// ─── ActionBtn ────────────────────────────────────────────────────────────────
export function ActionBtn({ onClick, children, style, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        border:        "none",
        borderRadius:  4,
        color:         "white",
        fontSize:      10,
        height:        28,
        cursor:        disabled ? "not-allowed" : "pointer",
        padding:       "0 12px",
        fontWeight:    700,
        textTransform: "uppercase",
        opacity:       disabled ? 0.6 : 1,
        transition:    "opacity 0.2s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
