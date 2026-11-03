import { ImageResponse } from "next/og";

export const alt = "Success Qube – AI, software and web technology company in Sikar, Rajasthan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#0b1b3f 0%,#1d3fa8 60%,#7c3aed 100%)", color: "#fff" }}>
        <div style={{ display: "flex", fontSize: 34, opacity: 0.85 }}>Success Qube</div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, marginTop: 24, lineHeight: 1.1, maxWidth: 900 }}>Building smarter digital experiences with AI &amp; technology</div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 36, opacity: 0.85 }}>Sikar, Rajasthan, India</div>
      </div>
    ),
    size
  );
}
