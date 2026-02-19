import UploadableImage from "./UploadableImage";
import { isHorizontal } from "../utils/helpers";

/**
 * BannerContentArea
 *
 * The right (horizontal) or bottom (vertical) section of the banner containing:
 * - Logo 1, Logo 2, RERA text box
 * - QR code
 * - Headline, subheadline (contentEditable)
 * - CTA button
 */
export default function BannerContentArea({
  state,
  onHeadlineChange,
  onSubheadChange,
  onReraChange,
  onUploadLogo1,
  onUploadLogo2,
  onUploadQr,
  onRemoveLogo1,
  onRemoveLogo2,
  onRemoveQr,
}) {
  const {
    size, themeColor, textColor, textColor2, logoBg1, logoBg2, btnTheme,
    headline, subhead, reraText,
    logo1, logo2, qrImage,
    showLogo1, showLogo2, showQr,
  } = state;

  const horiz   = isHorizontal(size);
  const isMac   = size === "mac-size-3000x340";
  const btnColor = btnTheme === "black" ? "#000000" : "#ffffff";

  // ── Layout styles ──────────────────────────────────────────────────────────
  const wrapStyle = horiz
    ? {
        width:           "50%",
        height:          "100%",
        padding:         isMac ? "0 111px" : "0 90px",
        backgroundColor: themeColor,
        display:         "flex",
        flexDirection:   "column",
        justifyContent:  "center",
        position:        "relative",
        zIndex:          99,
      }
    : {
        width:           "100%",
        height:          156,
        padding:         "10px 0 0 0",
        backgroundColor: themeColor,
        display:         "flex",
        flexDirection:   "column",
        justifyContent:  "center",
        alignItems:      "center",
        position:        "relative",
        zIndex:          9999,
      };

  const innerStyle = horiz
    ? {
        maxWidth:      655,
        alignItems:    "flex-start",
        position:      "relative",
        display:       "flex",
        flexDirection: "column",
        top:           -13,
        ...(isMac ? { transform: "translateX(80px)" } : {}),
      }
    : {
        maxWidth:      643,
        marginTop:     -152,
        position:      "relative",
        display:       "flex",
        flexDirection: "column",
      };

  const topRowStyle = {
    display:       "flex",
    width:         "100%",
    alignItems:    "flex-end",
    marginBottom:  horiz ? 7 : 11,
    justifyContent: horiz ? "flex-start" : "space-between",
  };

  // QR position: absolute in horizontal, inline in vertical
  const qrWrapStyle = horiz
    ? { position: "absolute", right: isMac ? 139 : 119, bottom: -77 }
    : { marginRight: 2 };

  const logoHeight  = horiz ? 72 : 51;
  const headFontSz  = horiz ? 17 : 18;
  const subFontSz   = horiz ? 13 : 14;
  const hideDetails = !horiz; // vertical sizes hide subhead & CTA

  return (
    <div style={wrapStyle}>
      <div style={innerStyle}>

        {/* ── Top row: logos + RERA + QR ─────────────────────────────────── */}
        <div style={topRowStyle}>

          {/* Logo group */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {showLogo1 && (
              <UploadableImage
                src={logo1}
                fallback="https://www.ieplads.com/mailers/2026_ui/99acres/banner-14jan/images/img5.png"
                height={logoHeight}
                bgColor={logoBg1}
                alt="Logo 1"
                onUpload={onUploadLogo1}
                onRemove={onRemoveLogo1}
                wrapStyle={{ marginRight: 15 }}
              />
            )}

            {showLogo2 && (
              <UploadableImage
                src={logo2}
                fallback="https://www.ieplads.com/mailers/2026_ui/99acres/banner-14jan/images/img5.png"
                height={logoHeight}
                bgColor={logoBg2}
                alt="Logo 2"
                onUpload={onUploadLogo2}
                onRemove={onRemoveLogo2}
                wrapStyle={{ marginRight: 15 }}
              />
            )}

            {/* RERA text */}
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onReraChange(e.target.innerText)}
              dangerouslySetInnerHTML={{ __html: reraText.replace(/\n/g, "<br/>") }}
              style={{
                fontSize:    11,
                color:       textColor2,
                borderLeft:  "1px solid #607791",
                paddingLeft: 15,
                lineHeight:  1.4,
                marginLeft:  9,
                outline:     "none",
                whiteSpace:  "pre-wrap",
                fontFamily:  '"Open Sans", sans-serif',
              }}
            />
          </div>

          {/* QR code */}
          {showQr && (
            <UploadableImage
              src={qrImage}
              fallback="https://www.ieplads.com/mailers/2026_ui/99acres/banner-14jan/images/qr.png"
              width={100}
              alt="QR Code"
              onUpload={onUploadQr}
              onRemove={onRemoveQr}
              wrapStyle={qrWrapStyle}
              style={{ padding: 0, borderRadius: 0 }}
            />
          )}
        </div>

        {/* ── Headline + subhead + CTA ───────────────────────────────────── */}
        <div style={{ width: "100%" }}>

          {/* Headline */}
          <div
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => onHeadlineChange(e.currentTarget.innerText)}
            style={{
              fontSize:      headFontSz,
              fontWeight:    700,
              textTransform: "uppercase",
              color:         textColor,
              lineHeight:    1.2,
              width:         524,
              maxHeight:     24,
              outline:       "none",
              whiteSpace:    "nowrap",
              overflow:      "hidden",
              textOverflow:  "ellipsis",
              fontFamily:    '"Open Sans", sans-serif',
            }}
          >
            {headline}
          </div>

          {/* Subhead — hidden on vertical sizes */}
          {!hideDetails && (
            <div
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => onSubheadChange(e.currentTarget.innerText)}
              style={{
                fontSize:   subFontSz,
                color:      textColor,
                marginTop:  4,
                marginBottom: 14,
                lineHeight: 1.3,
                width:      524,
                outline:    "none",
                maxHeight:  36,
                overflow:   "hidden",
                fontFamily: '"Open Sans", sans-serif',
              }}
            >
              {subhead}
            </div>
          )}

          {/* CTA — hidden on vertical sizes */}
          {!hideDetails && (
            <button style={{
              background:  "none",
              height:      36,
              padding:     "0 23px",
              cursor:      "pointer",
              fontWeight:  400,
              display:     "flex",
              alignItems:  "center",
              fontSize:    14,
              border:      `1px solid ${btnColor}`,
              color:       btnColor,
              fontFamily:  '"Open Sans", sans-serif',
              transition:  "all 0.2s",
            }}>
              Explore Now →
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
