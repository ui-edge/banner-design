import { SIZE_DIMS, DISPLAY_SCALE } from "../constants";

const restoreBtn = (label, onClick) => (
  <div key={label}>
    <button
      onClick={onClick}
      style={{
        background:   "#2563eb",
        color:        "white",
        border:       "none",
        borderRadius: 4,
        padding:      "4px 10px",
        cursor:       "pointer",
        fontSize:     11,
      }}
    >
      {label}
    </button>
  </div>
);

/**
 * InfoPanel
 *
 * Displays quick-reference tips and "Restore" buttons for removed elements.
 */
export default function InfoPanel({ state, set }) {
  const { w, h } = SIZE_DIMS[state.size];

  return (
    <div style={{
      maxWidth:     700,
      margin:       "0 auto 40px",
      padding:      "20px 24px",
      background:   "white",
      borderRadius: 8,
      boxShadow:    "0 4px 16px rgba(0,0,0,0.08)",
      fontSize:     12,
      color:        "#475569",
      display:      "grid",
      gridTemplateColumns: "1fr 1fr",
      gap:          "12px 24px",
    }}>
      {/* Title */}
      <div style={{ gridColumn: "1/-1", fontWeight: 700, color: "#1e293b", fontSize: 13, marginBottom: 4 }}>
        🎨 Banner Architect — Production Suite
      </div>

      <div><strong style={{ color: "#1e293b" }}>Current Size:</strong> {w}×{h}px</div>
      <div><strong style={{ color: "#1e293b" }}>Display Scale:</strong> {Math.round(DISPLAY_SCALE * 100)}%</div>

      <div><strong style={{ color: "#1e293b" }}>Background:</strong> Click to upload · drag to reposition</div>
      <div><strong style={{ color: "#1e293b" }}>Logos & QR:</strong> Click to replace · ✕ to remove</div>

      <div><strong style={{ color: "#1e293b" }}>Text:</strong> Click headline / subhead to edit inline</div>
      <div><strong style={{ color: "#1e293b" }}>Export:</strong> Batch Download captures all 5 sizes</div>

      {/* Restore buttons — only shown when element has been removed */}
      {!state.showLogo1 && restoreBtn("Restore Logo 1", () => set("showLogo1", true))}
      {!state.showLogo2 && restoreBtn("Restore Logo 2", () => set("showLogo2", true))}
      {!state.showQr    && restoreBtn("Restore QR Code", () => set("showQr",   true))}
    </div>
  );
}
