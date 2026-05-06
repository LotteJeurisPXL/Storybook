/**
 * PageFlip.tsx
 *
 * 3D page-flip transition that lives inside the RIGHT PageSurface.
 * The LEFT page updates instantaneously at the midpoint of the flip
 * (when the turning leaf is edge-on and nothing is visible).
 *
 * Caller (StoryBook.tsx) is responsible for:
 *   - Showing `outgoing` on the left page before the flip midpoint
 *   - Switching the left page to `incoming` at the midpoint
 *
 * Styles live in styles/PageFlip.css — only transform values that
 * are computed from progress are set inline.
 *
 * ─── Flip speed ───────────────────────────────────────────────
 * Controlled by `flipDuration` in Root.tsx defaultInputProps.
 * Default: 70 frames @ 30 fps ≈ 2.3 seconds.
 * Increase flipDuration for a slower, more dramatic turn.
 * ──────────────────────────────────────────────────────────────
 */

import React from "react";
import { interpolate, Easing } from "remotion";
import "./styles/PageFlip.css";

// ─── Back face of the turning leaf ───────────────────────────────────────────

const BackFace: React.FC = () => (
  <div className="flip-backface">
    {Array.from({ length: 18 }).map((_, i) => (
      <div
        key={i}
        className="flip-backface__line"
        style={{ top: 48 + i * 32 }}
      />
    ))}
  </div>
);

// ─── PageFlip ─────────────────────────────────────────────────────────────────

export interface PageFlipProps {
  /** 0 = outgoing page flat · 1 = incoming page fully revealed */
  progress: number;
  outgoing: React.ReactNode;
  incoming: React.ReactNode;
  pageWidth: number;
  pageHeight: number;
}

export const PageFlip: React.FC<PageFlipProps> = ({
  progress,
  outgoing,
  incoming,
  pageWidth,
}) => {
  // Easing: slow lift → accelerate through arc → gentle settle
  const eased = interpolate(progress, [0, 1], [0, 1], {
    easing: Easing.bezier(0.68, 0, 0.32, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // rotateY: 0° (flat) → -180° (landed on left side)
  const rotateY = eased * -180;

  // Shadow on the incoming page: peaks at midpoint
  const shadowOpacity = interpolate(eased, [0, 0.35, 0.65, 1], [0, 0.36, 0.36, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle vertical compression at mid-arc (page arc effect)
  const liftScale = interpolate(eased, [0, 0.5, 1], [1, 0.985, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Edge sheen just before the leaf crosses 90°
  const sheenOpacity = interpolate(eased, [0, 0.15, 0.45, 0.55, 1], [0, 0, 0.20, 0, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="flip-root"
      style={{
        perspective: pageWidth * 3.5,
        perspectiveOrigin: "left center",
      }}
    >
      {/* Incoming page (static, beneath the turning leaf) */}
      <div className="flip-incoming">
        {incoming}
        <div
          className="flip-sweep-shadow"
          style={{
            background: `linear-gradient(
              to right,
              rgba(0,0,0,${shadowOpacity * 0.9})  0%,
              rgba(0,0,0,${shadowOpacity * 0.5}) 25%,
              transparent 65%
            )`,
          }}
        />
      </div>

      {/* Turning leaf */}
      <div
        className="flip-leaf"
        style={{
          transform: `rotateY(${rotateY}deg) scaleY(${liftScale})`,
        }}
      >
        {/* Front face — outgoing page */}
        <div className="flip-leaf__front">
          {outgoing}
          <div
            className="flip-leaf__sheen"
            style={{
              background: `linear-gradient(to left, rgba(255,255,255,${sheenOpacity}), transparent)`,
            }}
          />
        </div>

        {/* Back face — blank paper reverse */}
        <div className="flip-leaf__back">
          <BackFace />
        </div>
      </div>
    </div>
  );
};