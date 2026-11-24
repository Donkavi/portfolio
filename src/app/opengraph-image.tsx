import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/data/portfolio";

export const alt = `${profile.displayName.first} ${profile.displayName.last} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(
    join(process.cwd(), "public/images/profile/portrait-cutout.png"),
    "base64",
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0b",
          color: "#f3efe7",
          position: "relative",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 40,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(200,240,74,0.35), rgba(200,240,74,0) 70%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#8d8a83" }}>
            PORTFOLIO — SRI LANKA
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95 }}>
              {profile.displayName.first}
            </div>
            <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95, color: "#c9c5bc" }}>
              {profile.displayName.last}
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: "#c8f04a" }}>
              {profile.title}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8d8a83" }}>
            Full-stack · AI agents & RAG · {profile.company}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${portrait}`}
          alt=""
          height={600}
          style={{ position: "absolute", right: 90, bottom: -40, height: 640 }}
        />
      </div>
    ),
    size,
  );
}
