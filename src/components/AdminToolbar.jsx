import { ToolItem, TSelect, TColor, TRange, ActionBtn } from "./ToolbarAtoms";
import { SIZE_OPTIONS } from "../constants";

/**
 * AdminToolbar
 *
 * Fixed top bar containing all banner controls.
 *
 * @param {object} state          - full banner state
 * @param {Function} set          - (key, value) state updater
 * @param {Function} onReset      - resets background position & shadow
 * @param {Function} onDownload   - triggers batch export
 * @param {boolean}  isDownloading
 */
export default function AdminToolbar({ state, set, onDownload, isDownloading }) {
  return (
    <div className="header" style={{
      position:     "fixed",
      top:          0,
      left:         0,
      width:        "100%",
      background:   "#141c2c",
      padding:      "15px 20px",
      display:      "flex",
      gap:          14,
      color:        "white",
      zIndex:       1000,
      alignItems:   "center",
      borderBottom: "2px solid #eaeaea",
      flexWrap:     "wrap",
      boxSizing:    "border-box",
    }}>

      {/* Size selector 
      <ToolItem label="Size">
        <TSelect value={state.size} onChange={(v) => set("size", v)}>
          {SIZE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </TSelect>
      </ToolItem>*/}

      {/* Theme colour */}
      <ToolItem label="Theme">
        <TColor value={state.themeColor} onChange={(v) => set("themeColor", v)} />
      </ToolItem>

      {/* Text colour */}
      <ToolItem label="Text Color">
        <TColor value={state.textColor} onChange={(v) => set("textColor", v)} />
      </ToolItem>

      {/* Text colour */}
      <ToolItem label="Rera Text Color">
        <TColor value={state.textColor2} onChange={(v) => set("textColor2", v)} />
      </ToolItem>

      {/* Logo background colours */}
      <ToolItem label="Logo-1 BG">
        <TColor value={state.logoBg1} onChange={(v) => set("logoBg1", v)} />
      </ToolItem>

      <ToolItem label="Logo-2 BG">
        <TColor value={state.logoBg2} onChange={(v) => set("logoBg2", v)} />
      </ToolItem>

      {/* CTA button theme */}
      <ToolItem label="Button Color">
        <TSelect value={state.btnTheme} onChange={(v) => set("btnTheme", v)}>
          <option value="white">White</option>
          <option value="black">Black</option>
        </TSelect>
      </ToolItem>

      {/* Download current size as PNG */}
      <ActionBtn
        onClick={onDownload}
        disabled={isDownloading}
        style={{ background: "#096e13", marginLeft: "auto" }}
      >
        {isDownloading
          ? "Downloading..."
          : `Download Image (${SIZE_OPTIONS.find(o => o.value === state.size)?.label})`}
      </ActionBtn>
    </div>
  );
}