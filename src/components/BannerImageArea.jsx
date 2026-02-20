import { isHorizontal } from "../utils/helpers";

/**
 * BannerImageArea
 *
 * Renders the photo half (or top strip) of the banner:
 * - Draggable background image
 * - Gradient overlay that blends into the content colour
 *
 * Props:
 *   size        {string}   - active size key
 *   bgImage     {string|null}
 *   bgPos       {{ x: number, y: number }}
 *   themeColor  {string}
 *   onMouseDown {Function} - forwarded to the bg div for drag tracking
 *   onClickBg   {Function} - called when user wants to replace the bg image
 */
export default function BannerImageArea({
  size,
  bgImage,
  bgPos,
  themeColor,
  onMouseDown,
  onClickBg,
}) {
  const horiz = isHorizontal(size);

  const containerStyle = horiz
    ? { width: "50%", height: "100%", position: "relative", background: "#c6e0e8", overflow: "hidden" }
    : { width: "100%", height: 287, position: "relative", background: "none", top: 1, overflow: "hidden" };

  const gradientStyle = horiz
    ? {
        position:      "absolute",
        width:         200,
        height:        "100%",
        right:         -1,
        top:           0,
        background:    `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${themeColor} 80%, ${themeColor} 100%)`,
        pointerEvents: "none",
        zIndex:        5,
      }
    : {
        position:      "absolute",
        width:         "100%",
        height:        100,
        bottom:        -1,
        left:          0,
        background:    `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${themeColor} 80%, ${themeColor} 100%)`,
        pointerEvents: "none",
        zIndex:        5,
      };

  return (
    <div style={containerStyle}>
      {/* Draggable / clickable background */}
      <div
        onMouseDown={onMouseDown}
        onClick={!bgImage ? onClickBg : undefined}
        title={bgImage ? "Drag to reposition · click to change" : "Click to upload background image"}
        style={{
          width:              "100%",
          height:             "100%",
          backgroundImage:    bgImage
            ? `url('${bgImage}')`
            : `url('https://www.ieplads.com/mailers/2026_ui/99acres/banner-14jan/images/property.png')`,
          
          backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
          backgroundRepeat:   "no-repeat",
          cursor:             "move",
        }}
      />

      {/* Colour blend gradient */}
      <div style={gradientStyle} />
    </div>
  );
}
