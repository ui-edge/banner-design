import { forwardRef } from "react";
import BannerImageArea   from "./BannerImageArea";
import BannerContentArea from "./BannerContentArea";
import { SIZE_DIMS, DISPLAY_SCALE } from "../constants";
import { isHorizontal }             from "../utils/helpers";

/**
 * BannerCanvas
 *
 * Renders the banner at its true pixel dimensions, then scales it down via CSS
 * transform so it fits inside the preview viewport.
 *
 * Forwarded ref lands on the outermost banner div (useful for html2canvas).
 */
const BannerCanvas = forwardRef(function BannerCanvas(
  {
    state,
    bgPos,
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
  },
  ref
) {
  const { size, shadowPos } = state;
  const horiz = isHorizontal(size);
  const dims  = SIZE_DIMS[size];
  const shadowH = horiz ? 110 : 160;

  return (
    <div
      ref={ref}
      style={{
        width:           dims.w,
        height:          dims.h,
        display:         "flex",
        flexDirection:   horiz ? "row" : "column",
        position:        "relative",
        background:      "#fff",
        overflow:        "hidden",
        transformOrigin: "top left",
        transform:       `scale(${DISPLAY_SCALE})`,
        flexShrink:      0,
      }}
    >
      {/* Shadow overlay (transparent placeholder — swap for real shadow.png) */}
      <div
        style={{
          position:      "absolute",
          top:           shadowPos,
          left:          0,
          width:         "100%",
          height:        shadowH,
          pointerEvents: "none",
          zIndex:        999,
          background:    "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      />

      {/* Background photo + gradient */}
      <BannerImageArea
        size={size}
        bgImage={state.bgImage}
        bgPos={bgPos}
        themeColor={state.themeColor}
        onMouseDown={onBgMouseDown}
        onClickBg={onUploadBg}
      />

      {/* Logos, text, CTA */}
      <BannerContentArea
        state={state}
        onHeadlineChange={onHeadlineChange}
        onSubheadChange={onSubheadChange}
        onReraChange={onReraChange}
        onUploadLogo1={onUploadLogo1}
        onUploadLogo2={onUploadLogo2}
        onUploadQr={onUploadQr}
        onRemoveLogo1={onRemoveLogo1}
        onRemoveLogo2={onRemoveLogo2}
        onRemoveQr={onRemoveQr}
      />
    </div>
  );
});

export default BannerCanvas;
