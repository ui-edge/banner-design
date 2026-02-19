import { useState, useRef, useCallback } from "react";

// ── Components ────────────────────────────────────────────────────────────────
import AdminToolbar  from "./components/AdminToolbar";
import BannerPreview from "./components/BannerPreview";
import InfoPanel     from "./components/InfoPanel";

// ── Hooks ─────────────────────────────────────────────────────────────────────
import { useBannerDrag } from "./hooks/useBannerDrag";
import { useFileUpload } from "./hooks/useFileUpload";

// ── Data ──────────────────────────────────────────────────────────────────────
import { DEFAULT_STATE, SIZE_OPTIONS, SIZE_DIMS } from "./constants";

/**
 * App
 *
 * Root component. Owns all banner state and wires together the toolbar,
 * preview, drag, and upload interactions.
 *
 * State shape (see constants.js → DEFAULT_STATE):
 *   size, themeColor, textColor, shadowPos,
 *   logoBg1, logoBg2, btnTheme,
 *   exportFormat, exportQuality,
 *   headline, subhead, reraText,
 *   bgImage, logo1, logo2, qrImage,
 *   showLogo1, showLogo2, showQr
 */
export default function App() {
  // ── Banner state ─────────────────────────────────────────────────────────
  const [state, setState] = useState(DEFAULT_STATE);

  /** Patch a single key in the state object */
  const set = useCallback((key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  // ── File upload hook ──────────────────────────────────────────────────────
  const handleUploaded = useCallback((target, dataUrl) => {
    const keyMap = { bg: "bgImage", logo1: "logo1", logo2: "logo2", qr: "qrImage" };
    const key = keyMap[target];
    if (key) set(key, dataUrl);
  }, [set]);

  const { triggerUpload, FileInput } = useFileUpload(handleUploaded);

  // ── Background drag hook ──────────────────────────────────────────────────
  const { bgPos, handleMouseDown, resetPos } = useBannerDrag(
    state.size,
    () => triggerUpload("bg")   // click-through → open file picker
  );

  // ── Banner canvas ref (for future html2canvas export) ─────────────────────
  const canvasRef = useRef(null);

  // ── Toolbar actions ───────────────────────────────────────────────────────
  const [isDownloading, setIsDownloading] = useState(false);

  const handleReset = useCallback(() => {
    resetPos();
    set("shadowPos", 0);
  }, [resetPos, set]);

  const handleBatchDownload = useCallback(async () => {
    setIsDownloading(true);
    try {
      // Dynamically inject html2canvas from CDN if not already loaded
      if (typeof window.html2canvas === "undefined") {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      const canvas = await window.html2canvas(canvasRef.current, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `banner_${state.size}.png`;
      link.href = canvas.toDataURL("image/png", state.exportQuality);
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Check console for details.");
    } finally {
      setIsDownloading(false);
    }
  }, [state.size, state.exportQuality]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, background: "#f1f5f9", minHeight: "100vh" }}>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap');`}</style>

      {/* Fixed top toolbar */}
      <AdminToolbar
        state={state}
        set={set}
        onReset={handleReset}
        onDownload={handleBatchDownload}
        isDownloading={isDownloading}
      />

      {/* Scaled banner preview */}
      <BannerPreview
        state={state}
        bgPos={bgPos}
        canvasRef={canvasRef}
        onBgMouseDown={handleMouseDown}
        onHeadlineChange={(v) => set("headline", v)}
        onSubheadChange={(v)  => set("subhead", v)}
        onReraChange={(v)     => set("reraText", v)}
        onUploadLogo1={() => triggerUpload("logo1")}
        onUploadLogo2={() => triggerUpload("logo2")}
        onUploadQr={()    => triggerUpload("qr")}
        onUploadBg={()    => triggerUpload("bg")}
        onRemoveLogo1={() => set("showLogo1", false)}
        onRemoveLogo2={() => set("showLogo2", false)}
        onRemoveQr={()    => set("showQr",    false)}
      />

      {/* Hints + restore buttons */}
      <InfoPanel state={state} set={set} />

      {/* Hidden file input managed by useFileUpload */}
      {FileInput}
    </div>
  );
}
