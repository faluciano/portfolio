import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS ignores SVG favicons, so render the icon.svg monogram as a PNG. The
// background is square because iOS applies its own corner mask.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#2563eb",
      }}
    >
      <svg width="180" height="180" viewBox="0 0 64 64" fill="#fff">
        <rect x="14" y="18" width="6" height="28" />
        <rect x="14" y="18" width="17" height="6" />
        <rect x="14" y="29.5" width="14" height="5" />
        <rect x="35" y="18" width="6" height="28" />
        <rect x="35" y="40" width="15" height="6" />
      </svg>
    </div>,
    { ...size },
  );
}
