/**
 * scenes/OpeningScene.tsx
 *
 * Pinned at position 0 by normalizeSceneOrder() in Index.tsx.
 *
 * The book starts already open with blank pages — no slide or cover-flip
 * animation. StoryBook + PageFlip handle the first real page turn.
 */

import React from "react";
import { useVideoConfig } from "remotion";
import type { SceneContext, ScenePages } from "../StoryBook";
import PXLLogo from "../../assets/PXL.png";

// ─── Utilities ────────────────────────────────────────────────────────────────

function darken(hex: string, amount: number): string {
  try {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, ((n >> 16) & 0xff) * (1 - amount));
    const g = Math.max(0, ((n >> 8)  & 0xff) * (1 - amount));
    const b = Math.max(0, (n         & 0xff) * (1 - amount));
    return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  } catch { return hex; }
}

function rrPath(w: number, h: number, r: number): string {
  return `M ${r},0 H ${w-r} Q ${w},0 ${w},${r} V ${h-r} Q ${w},${h} ${w-r},${h} H ${r} Q 0,${h} 0,${h-r} V ${r} Q 0,0 ${r},0 Z`;
}


// ─── PageEdgeStack ────────────────────────────────────────────────────────────

const PageEdgeStack: React.FC<{
  side: "left" | "right";
  w: number; h: number;
  opacity?: number;
}> = ({ side, w, h, opacity = 1 }) => (
  <div style={{
    position: "absolute",
    ...(side === "left" ? { left: 0 } : { right: 0 }),
    top: 2, width: w, height: h - 4,
    opacity, overflow: "hidden", zIndex: 8,
  }}>
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", top: 0,
        ...(side === "left"
          ? { right: i * (w / 7) }
          : { left:  i * (w / 7) }),
        width: w / 7, height: "100%",
        background: `hsl(38, 22%, ${91 - (i/6)*5}%)`,
      }}/>
    ))}
    <div style={{
      position: "absolute", inset: 0,
      background: side === "left"
        ? "linear-gradient(to right, rgba(0,0,0,0.18), transparent)"
        : "linear-gradient(to left,  rgba(0,0,0,0.18), transparent)",
    }}/>
  </div>
);

// ─── StaticOpenBook ───────────────────────────────────────────────────────────
// Renders the book already open with blank parchment pages. No animation.

const StaticOpenBook: React.FC<{ bookColour: string }> = ({ bookColour }) => {
  const { width, height } = useVideoConfig();

  const openBookW = Math.round(width  * 0.88);
  const openBookH = Math.round(height * 0.88 * 0.9);

  const overhang  = Math.round((openBookW / 1920) * 20 * 2.0);
  const pageEdgeW = Math.round((openBookW / 1920) * 22 * 2.0);
  const creaseW   = 44;
  const edgeFadeH = 18;

  const bgW  = openBookW + overhang * 2;
  const bgH  = openBookH + overhang * 2;
  const bgRo = Math.round(bgW * 0.013);
  const pageRo = Math.max(2, bgRo - Math.round(overhang * 0.6));

  const bgPath = rrPath(bgW, bgH, bgRo);

  const dark  = darken(bookColour, 0.30);
  const mid   = darken(bookColour, 0.14);
  const light = darken(bookColour, 0.02);

  const bookX = Math.round((width  - openBookW) / 2);
  const bookY = Math.round((height - openBookH) / 2);

  const title : string = "I-talent";
  const author : string = "Lotte Jeuris";

  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse at 50% 60%, #2e2416 0%, #1a1208 100%)",
      overflow: "hidden",
    }}>
      {/* Table glow */}
      <div style={{
        position: "absolute",
        bottom: height * 0.04,
        left: bookX + openBookW * 0.05,
        width: openBookW * 0.9,
        height: 60,
        background: bookColour,
        filter: "blur(28px)", opacity: 0.35, borderRadius: "50%",
      }}/>

      {/* Book block */}
      <div style={{
        position: "absolute",
        left: bookX, top: bookY,
        width: openBookW, height: openBookH,
        overflow: "visible",
      }}>
        {/* Drop shadow */}
        <div style={{
          position: "absolute",
          top: openBookH * 0.97, left: openBookW * 0.04,
          width: openBookW * 0.92, height: openBookH * 0.10,
          background: "rgba(0,0,0,0.55)",
          filter: "blur(18px)", borderRadius: "50%",
        }}/>

        {/* Cover background SVG */}
        <div style={{
          position: "absolute",
          top: -overhang, left: -overhang,
          width: bgW, height: bgH,
          zIndex: 0, pointerEvents: "none",
        }}>
          <svg width={bgW} height={bgH} viewBox={`0 0 ${bgW} ${bgH}`}
            style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="ob-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor={dark}/>
                <stop offset="45%"  stopColor={mid}/>
                <stop offset="100%" stopColor={light}/>
              </linearGradient>
              <linearGradient id="ob-spine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="rgba(0,0,0,0)"/>
                <stop offset="32%"  stopColor="rgba(0,0,0,0.20)"/>
                <stop offset="50%"  stopColor="rgba(0,0,0,0.40)"/>
                <stop offset="68%"  stopColor="rgba(0,0,0,0.20)"/>
                <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
              </linearGradient>
            </defs>
            <path d={bgPath} fill="url(#ob-bg)"/>
            <line x1={bgRo} y1={2} x2={bgW-bgRo} y2={2}
              stroke="rgba(255,255,255,0.10)" strokeWidth="1.5"/>
            <line x1={bgW*0.04} y1={bgH*0.06} x2={bgW*0.04} y2={bgH*0.94}
              stroke="rgba(255,215,100,0.25)" strokeWidth="1.5"/>
            <rect x={bgW/2 - creaseW} y={0} width={creaseW*2} height={bgH}
              fill="url(#ob-spine)" opacity="0.9"/>
          </svg>
        </div>

        {/* Page surfaces — both pages fully visible, blank */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: pageRo,
          overflow: "hidden",
          zIndex: 2,
        }}>
          {/* Left parchment */}
          <div style={{
            position: "absolute", left: 0, top: 0,
            width: "50%", height: "100%",
            backgroundColor: "var(--parchment, hsl(38,28%,87%))",
            backgroundImage: "var(--noise, none), linear-gradient(to right, rgba(160,130,90,0.10) 0%, transparent 18%), linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, transparent 6%, transparent 94%, rgba(0,0,0,0.06) 100%)",
          }}/>
          {/* Right parchment with cover content */}
          <div style={{
            position: "absolute", right: 0, top: 0,
            width: "50%", height: "100%",
            backgroundColor: "var(--parchment, hsl(38,24%,85%))",
            backgroundImage: "var(--noise, none), linear-gradient(to left, rgba(160,130,90,0.10) 0%, transparent 18%), linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, transparent 6%, transparent 94%, rgba(0,0,0,0.06) 100%)",
          }} className="opening-cover-page">
            <div className="opening-cover-content">
              <img src={PXLLogo} alt="Logo" className="opening-cover-logo" />

              <h1 className="opening-cover-title">{title}</h1>

              <p className="opening-cover-author">by {author}</p>
            </div>
          </div>
        </div>

        {/* Page edge stacks */}
        <PageEdgeStack side="left"  w={pageEdgeW} h={openBookH}/>
        <PageEdgeStack side="right" w={pageEdgeW} h={openBookH}/>

        {/* Spine crease */}
        <div style={{
          position: "absolute", left: "50%", top: 0,
          transform: "translateX(-50%)",
          width: creaseW, height: "100%",
          background: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.10) 28%, rgba(0,0,0,0.22) 46%, rgba(0,0,0,0.22) 54%, rgba(0,0,0,0.10) 72%, transparent 100%)",
          zIndex: 9,
        }}/>

        {/* Edge fades */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0,
          height: edgeFadeH, zIndex: 12,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.12), transparent)"}}/>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
          height: edgeFadeH, zIndex: 12,
          background: "linear-gradient(to top, rgba(0,0,0,0.14), transparent)"}}/>
      </div>
    </div>
  );
};

// ─── Scene factory ────────────────────────────────────────────────────────────

export function opening(
  _lang:   "en" | "nl",
  _accent: string,
  context: SceneContext,
): ScenePages {
  return {
    left: null,
    right: (
      <StaticOpenBook
        bookColour={context.bookColour ?? "#1f9e63"}
      />
    ),
  };
}