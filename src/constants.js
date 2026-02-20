// ─── Size Options ─────────────────────────────────────────────────────────────
export const SIZE_OPTIONS = [
  { label: "3000×340",     value: "size-3000x340" },
  { label: "mac-3000×340", value: "mac-size-3000x340" },
  { label: "2000×436",     value: "size-2000x436" },
  { label: "750×436",      value: "size-750x436" },
  { label: "720×436",      value: "size-720x436" },
];

// ─── Pixel dimensions per size key ────────────────────────────────────────────
export const SIZE_DIMS = {
  "size-3000x340":     { w: 3000, h: 340 },
  "mac-size-3000x340": { w: 3000, h: 340 },
  "size-2000x436":     { w: 2000, h: 436 },
  "size-750x436":      { w: 750,  h: 436 },
  "size-720x436":      { w: 720,  h: 436 },
};

// ─── Display scale for the preview wrapper ────────────────────────────────────
export const DISPLAY_SCALE = 1.0;

// ─── Drag threshold (px) to distinguish drag vs click ─────────────────────────
export const DRAG_THRESHOLD = 5;

// ─── Default banner state ─────────────────────────────────────────────────────
export const DEFAULT_STATE = {
  size:          "size-3000x340",
  themeColor:    "#c6e0e8",
  textColor:     "#ffffff",
  shadowPos:     0,
  logoBg1:       "#ffffff",
  logoBg2:       "#ffffff",
  btnTheme:      "white",
  exportFormat:  "image/webp",
  exportQuality: 1,
  headline:      "Sorrento Rosette | 3BHK & 4BHK Luxurious Flats",
  subhead:       "Bhayli, Vadodara | Vadodara's Tallest Resident | Sample Flat Ready",
  reraText:      "RERA No.: PR/VADODARA/VADODARA\nhttps://maharera.maharashtra.gov.in",
  bgImage:       null,
  logo1:         null,
  logo2:         null,
  qrImage:       null,
  showLogo1:     true,
  showLogo2:     true,
  showQr:        true,
};

// ─── Initial bg-position per size ─────────────────────────────────────────────
export const INITIAL_BG_POSITIONS = {
  "size-3000x340":     { x: 50, y: 50 },
  "mac-size-3000x340": { x: 50, y: 50 },
  "size-2000x436":     { x: 50, y: 50 },
  "size-750x436":      { x: 50, y: 50 },
  "size-720x436":      { x: 50, y: 50 },
};
