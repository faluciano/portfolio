import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Felix Luciano - Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background:
          "linear-gradient(135deg, #0a0f19 0%, #1e293b 50%, #0a0f19 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ecf1ff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Felix Luciano
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#9caad2",
            letterSpacing: "0.05em",
            textTransform: "uppercase" as const,
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            width: 80,
            height: 4,
            background: "#3b82f6",
            borderRadius: 2,
            marginTop: 8,
          }}
        />
        <div
          style={{
            fontSize: 24,
            color: "#64748b",
            marginTop: 16,
          }}
        >
          faluciano.com
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
