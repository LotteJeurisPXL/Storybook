import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { VideoProps } from "../types";

export const MyVideo: React.FC<VideoProps> = ({
  text,
  color,
  animation,
  showBackground,
}) => {
  const frame = useCurrentFrame();

  // ── Opacity ────────────────────────────────────────────
  // All animations start with a fade-in over the first 20 frames
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // ── Transform per animation style ─────────────────────
  const transform = (() => {
    switch (animation) {
      case "slide":
        return `translateY(${interpolate(frame, [0, 20], [60, 0], { extrapolateRight: "clamp" })}px)`;

      case "bounce":
        // Overshoot then settle
        const bounceY = interpolate(
          frame,
          [0, 10, 16, 20],
          [80, -12, 4, 0],
          { extrapolateRight: "clamp" }
        );
        return `translateY(${bounceY}px)`;

      case "typewriter":
        // No transform — handled via clip below
        return "none";

      case "fade":
      default:
        // Gentle scale-up
        return `scale(${interpolate(frame, [0, 20], [0.85, 1], { extrapolateRight: "clamp" })})`;
    }
  })();

  // ── Typewriter clip ────────────────────────────────────
  // Reveal characters one by one over 2 frames each
  const clipStyle: React.CSSProperties =
    animation === "typewriter"
      ? {
          clipPath: `inset(0 ${interpolate(
            frame,
            [0, text.length * 2],
            [100, 0],
            { extrapolateRight: "clamp" }
          )}% 0 0)`,
        }
      : {};

  // ── Background ─────────────────────────────────────────
  const bgStyle: React.CSSProperties = showBackground
    ? { background: `radial-gradient(ellipse at 60% 40%, #16213e 0%, #0f0f23 60%, #1a1a2e 100%)` }
    : { background: "#000" };

  return (
    <AbsoluteFill
      style={{
        ...bgStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          color,
          fontSize: 72,
          fontWeight: 700,
          opacity,
          transform,
          fontFamily: "sans-serif",
          letterSpacing: "-0.02em",
          ...clipStyle,
        }}
      >
        {text}
      </h1>
    </AbsoluteFill>
  );
};