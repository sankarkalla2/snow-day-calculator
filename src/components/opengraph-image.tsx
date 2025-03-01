import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Snow Day Calculator";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom, #1e40af, #3b82f6)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "80px",
            color: "white",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Snow Day Calculator
        </h1>
        <p
          style={{
            fontSize: "40px",
            color: "white",
            textAlign: "center",
          }}
        >
          Predict School Closures with Confidence
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
