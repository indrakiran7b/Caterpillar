import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "CaterPillar — Turn your scrap into cash.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F6F6F3",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: -0.5,
          }}
        >
          <span style={{ color: "#111111" }}>Cater</span>
          <span style={{ color: "#1B7A45" }}>Pillar</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2.4,
              color: "#111111",
              maxWidth: 820,
            }}
          >
            Turn your scrap into cash.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#5F5F5A",
              maxWidth: 640,
              lineHeight: 1.4,
            }}
          >
            Doorstep pickup. Transparent weighing. Payment after collection.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
