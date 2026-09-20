import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            lineHeight: 1.05,
          }}
        >
          <span style={{ color: "#F6F6F3", fontSize: 30, fontWeight: 600 }}>Cater</span>
          <span style={{ color: "#3CB371", fontSize: 30, fontWeight: 600 }}>Pillar</span>
        </div>
      </div>
    ),
    size,
  );
}
