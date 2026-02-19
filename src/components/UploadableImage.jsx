/**
 * UploadableImage
 *
 * Renders an <img> that the user can click to replace via file picker.
 * Hovering (or always-visible on touch) shows a red × button to remove it.
 *
 * Props:
 *   src         {string}   - image src (data URL or remote URL)
 *   fallback    {string}   - shown when src is null
 *   width       {number}
 *   height      {number}
 *   bgColor     {string}   - background colour behind the image
 *   alt         {string}
 *   onUpload    {Function} - called when user wants to replace the image
 *   onRemove    {Function} - called when user clicks ×
 *   style       {object}   - extra style for the <img>
 *   wrapStyle   {object}   - extra style for the wrapper div
 */
export default function UploadableImage({
  src,
  fallback,
  width,
  height,
  bgColor = "transparent",
  alt = "",
  onUpload,
  onRemove,
  style = {},
  wrapStyle = {},
}) {
  return (
    <div style={{
      position:      "relative",
      display:       "inline-block",
      verticalAlign: "middle",
      ...wrapStyle,
    }}>
      <img
        src={src || fallback}
        width={width}
        height={height}
        alt={alt}
        onClick={onUpload}
        title="Click to replace"
        style={{
          backgroundColor: bgColor,
          padding:         5,
          borderRadius:    4,
          cursor:          "pointer",
          display:         "block",
          ...style,
        }}
      />

      {/* Remove button */}
      {onRemove && (
        <div
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          title="Remove"
          style={{
            position:       "absolute",
            top:            -8,
            right:          -8,
            background:     "#ef4444",
            color:          "white",
            borderRadius:   "50%",
            width:          18,
            height:         18,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            fontSize:       12,
            cursor:         "pointer",
            fontWeight:     "bold",
            zIndex:         100,
            lineHeight:     1,
            userSelect:     "none",
          }}
        >
          ×
        </div>
      )}
    </div>
  );
}
