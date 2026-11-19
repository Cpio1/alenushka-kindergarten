import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "«Алёнушка» бөбекжай-балабақшасы — Өрікті ауылы";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const dir = path.join(process.cwd(), "src/app/_og");
  const [comfortaa, nunito] = await Promise.all([
    readFile(path.join(dir, "Comfortaa-700.ttf")),
    readFile(path.join(dir, "Nunito-700.ttf")),
  ]);
  const petals = ["#ffd9e5", "#ffe47a", "#bdeed8", "#dccbff", "#c5eafb", "#ffd9e5", "#ffe47a", "#bdeed8"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(160deg, #ecf8fe 0%, #fffdf9 55%, #fff1f5 100%)",
          padding: "0 80px",
          fontFamily: "Nunito",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 760 }}>
          <div style={{ display: "flex", alignSelf: "flex-start", background: "#fff", borderRadius: 999, padding: "10px 24px", fontSize: 28, color: "#c9412b" }}>
            Бөбекжай-балабақша · Өрікті ауылы
          </div>
          <div style={{ display: "flex", fontFamily: "Comfortaa", fontSize: 92, color: "#c9412b", marginTop: 28 }}>«Алёнушка»</div>
          <div style={{ display: "flex", fontFamily: "Nunito", fontSize: 46, color: "#30334b", marginTop: 8 }}>бақытты балалық шақ әлемі!</div>
          <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
            {[
              ["5 топ", "#ffd9e5", "#a3304f"],
              ["2 жастан", "#ffe47a", "#6b4d00"],
              ["KZ · RU", "#bdeed8", "#1f6e50"],
              ["07:30–18:00", "#dccbff", "#4f3699"],
            ].map(([label, bg, fg]) => (
              <div key={label} style={{ display: "flex", background: bg, color: fg, borderRadius: 999, padding: "10px 24px", fontSize: 30 }}>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", position: "absolute", right: 110, top: 165, width: 300, height: 300 }}>
          {petals.map((c, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 110,
                top: 0,
                width: 80,
                height: 120,
                borderRadius: 999,
                background: c,
                transformOrigin: "40px 150px",
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
          <div style={{ position: "absolute", left: 80, top: 80, width: 140, height: 140, borderRadius: 999, background: "#ff846f", display: "flex" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Comfortaa", data: comfortaa, weight: 700, style: "normal" },
        { name: "Nunito", data: nunito, weight: 700, style: "normal" },
      ],
    },
  );
}
