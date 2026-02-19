import BannerCanvas   from "./BannerCanvas";
import { SIZE_DIMS, DISPLAY_SCALE } from "../constants";

/**
 * BannerPreview
 *
 * Centers the scaled BannerCanvas inside a shadow-boxed container whose
 * dimensions match the post-scale pixel size.
 */
export default function BannerPreview({
  state,
  bgPos,
  canvasRef,
  onBgMouseDown,
  onHeadlineChange,
  onSubheadChange,
  onReraChange,
  onUploadLogo1,
  onUploadLogo2,
  onUploadQr,
  onUploadBg,
  onRemoveLogo1,
  onRemoveLogo2,
  onRemoveQr,
}) {
  const dims = SIZE_DIMS[state.size];
  const previewW = dims.w * DISPLAY_SCALE;
  const previewH = dims.h * DISPLAY_SCALE;

  return (
    <div className="bannerPannel" style={{
      marginTop:      60,
      padding:        "40px 20px",
      display:        "flex",
      justifyContent: "center",
      alignItems:     "flex-start",
      overflowX:      "auto",
    }}>
      {/* Outer shell — exact scaled size, clips the transform */}
      <div style={{
        boxShadow:   "0 25px 50px -12px rgba(0,0,0,0.25)",
        width:       previewW,
        height:      previewH,
        position:    "relative",
        overflow:    "hidden",
        background:  "#fff",
        flexShrink:  0,
        transition:  "width 0.35s ease, height 0.35s ease",
      }}>
        {/* Canvas sits at (0,0) and transforms to fill the shell */}
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <BannerCanvas
            ref={canvasRef}
            state={state}
            bgPos={bgPos}
            onBgMouseDown={onBgMouseDown}
            onHeadlineChange={onHeadlineChange}
            onSubheadChange={onSubheadChange}
            onReraChange={onReraChange}
            onUploadLogo1={onUploadLogo1}
            onUploadLogo2={onUploadLogo2}
            onUploadQr={onUploadQr}
            onUploadBg={onUploadBg}
            onRemoveLogo1={onRemoveLogo1}
            onRemoveLogo2={onRemoveLogo2}
            onRemoveQr={onRemoveQr}
          />
        </div>
      </div>
    </div>
  );
}
