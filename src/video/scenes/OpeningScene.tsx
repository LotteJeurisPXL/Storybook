/**
 * scenes/OpeningScene.tsx
 *
 * Pinned at position 0 by normalizeSceneOrder() in Index.tsx.
 *
 * Handles only the IDLE animation phase (closed → open).
 * The flip-out (opening → content) is handled by StoryBook + PageFlip.
 *
 * Fix log:
 *   • Cover leaf is now (pageW + overhang*2) wide, positioned at
 *     left = "50%" - overhang  so it lines up with the cover background.
 *     transformOrigin = "overhangPx 50%" keeps the pivot on the spine.
 *   • Right PageStack only appears after the cover is fully open
 *     (coverOpenP = 1), matching when StoryBook's OpenBook shell takes over.
 *   • Left page now shows a decorative half-title / first page instead of null.
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import type { SceneContext, ScenePages } from "../StoryBook";

// ─── Timing (fractions of sceneDuration) ─────────────────────────────────────
const T_SLIDE_START = 0.15;
const T_SLIDE_END   = 0.30;
const T_OPEN_START  = 0.30;

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

// ─── CoverFront ───────────────────────────────────────────────────────────────

const CoverFront: React.FC<{
  bookColour: string; accentColour: string;
  w: number; h: number; ro: number;
  title?: string; subtitle?: string;
}> = ({ bookColour, accentColour, w, h, ro, title, subtitle }) => {
  const dark  = darken(bookColour, 0.30);
  const mid   = darken(bookColour, 0.14);
  const light = darken(bookColour, 0.02);
  const outer = rrPath(w, h, ro);
  const pad   = Math.round(w * 0.040);
  const innerPath = rrPath(w - pad*2, h - pad*2, Math.max(2, ro - 4));

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}
      style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="cf-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={dark}/>
          <stop offset="45%"  stopColor={mid}/>
          <stop offset="100%" stopColor={light}/>
        </linearGradient>
        {/* Spine shadow on right side of leaf (where it meets the right page) */}
        <linearGradient id="cf-spine-shadow" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.35)"/>
          <stop offset="15%"  stopColor="rgba(0,0,0,0.0)"/>
        </linearGradient>
      </defs>
      <path d={outer} fill="url(#cf-fill)"/>
      <line x1={ro} y1={2} x2={w-ro} y2={2}
        stroke="rgba(255,255,255,0.10)" strokeWidth="1.5"/>
      {/* Gold spine rule — on the LEFT edge (the spine side) */}
      <line x1={w*0.04} y1={h*0.06} x2={w*0.04} y2={h*0.94}
        stroke="rgba(255,215,100,0.30)" strokeWidth="1.5"/>
      <path d={outer} fill="none" stroke={`${accentColour}45`} strokeWidth="1.5"/>
      <g transform={`translate(${pad},${pad})`}>
        <path d={innerPath} fill="none" stroke={`${accentColour}30`} strokeWidth="1"/>
      </g>
      {/* Corner ornaments */}
      {[[w*0.10,h*0.06],[w*0.90,h*0.06],[w*0.10,h*0.94],[w*0.90,h*0.94]].map(([cx,cy],i) => (
        <g key={i} transform={`translate(${cx},${cy})`}>
          <path d="M-8,0 L0,-8 L8,0 L0,8 Z"
            fill="none" stroke={`${accentColour}50`} strokeWidth="1"/>
          <circle r="2" fill={`${accentColour}60`}/>
        </g>
      ))}
      {/* Diamond emblem */}
      <g transform={`translate(${w*0.5},${h*0.36})`}>
        <path d={`M0,-${h*0.10} L${h*0.07},0 L0,${h*0.10} L-${h*0.07},0 Z`}
          fill="none" stroke={`${accentColour}55`} strokeWidth="1.5"/>
        <path d={`M0,-${h*0.08} L${h*0.056},0 L0,${h*0.08} L-${h*0.056},0 Z`}
          fill={`${accentColour}12`} stroke={`${accentColour}40`} strokeWidth="1"/>
      </g>
      {title && (
        <text x={w*0.5} y={h*0.56} textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize={Math.round(h*0.052)} fontWeight="700"
          fill={`${accentColour}dd`} letterSpacing="1">{title}</text>
      )}
      {subtitle && (
        <text x={w*0.5} y={h*0.65} textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize={Math.round(h*0.030)} fill={`${accentColour}88`}
          letterSpacing="0.5">{subtitle}</text>
      )}
      <line x1={w*0.28} y1={h*0.71} x2={w*0.72} y2={h*0.71}
        stroke={`${accentColour}35`} strokeWidth="0.8"/>
      {/* Right-edge shadow (where cover meets the right page when closed) */}
      <rect x={w-32} y={0} width={32} height={h} fill="url(#cf-spine-shadow)"/>
    </svg>
  );
};


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

// ─── OpeningAnimation ─────────────────────────────────────────────────────────

const OpeningAnimation: React.FC<{
  bookColour:    string;
  accentColour:  string;
  title?:        string;
  subtitle?:     string;
  sceneDuration: number;
}> = ({ bookColour, accentColour, title, subtitle, sceneDuration }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const t = Math.min(frame / sceneDuration, 1);

  const slideP = interpolate(t, [T_SLIDE_START, T_SLIDE_END], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const coverOpenP = interpolate(t, [T_OPEN_START, 1.0], [0, 1], {
    easing: Easing.bezier(0.45, 0, 0.35, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // 0° closed → -180° fully open
  const rotY = coverOpenP * -180;

  // Left page and stacks: only appear once the cover is fully open.
  const leftOpacity = interpolate(coverOpenP, [0.98, 1.0], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Right page stack: only after cover is fully open
  const rightStackOpacity = interpolate(coverOpenP, [0.90, 1.0], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const castShadow = interpolate(coverOpenP, [0, 0.4, 0.6, 1], [0, 0.45, 0.45, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── Dimensions ─────────────────────────────────────────────────────────────
  const openBookW  = Math.round(width  * 0.88);
  const openBookH  = Math.round(height * 0.88 * 0.9);
  const pageW      = Math.round(openBookW / 2);

  // Same constants as OpenBook.tsx
  const overhang = Math.round((openBookW / 1920) * 20 * 2.0);
  const pageEdgeW = Math.round((openBookW / 1920) * 22 * 2.0);
  const creaseW = 44;
  const edgeFadeH = 18;

  const bgW = openBookW + overhang * 2;
  const bgH = openBookH + overhang * 2;
  const bgRo = Math.round(bgW * 0.013);

  // Page clip radius
  const pageRo = Math.max(2, bgRo - Math.round(overhang * 0.6));

  // The turning leaf follows the closed-book cover footprint, including overhang.
  const leafW = pageW + overhang * 2;
  const leafH = openBookH + overhang * 2;
  // Corner radius for the leaf — proportional, matching the cover background.
  const leafRo = bgRo;

  // Book X: slides from right-half-centred → open-book left edge
  const endX   = Math.round((width - openBookW) / 2);
  // Closed: left edge of book = screen centre (so right page fills right half)
  const startX = Math.round(width / 2);
  const bookX  = Math.round(interpolate(slideP, [0, 1], [startX, endX], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  }));
  const bookY  = Math.round((height - openBookH) / 2);

  // Cover background colours
  const dark  = darken(bookColour, 0.30);
  const mid   = darken(bookColour, 0.14);
  const light = darken(bookColour, 0.02);
  const bgPath = rrPath(bgW, bgH, bgRo);

  const perspective = openBookW * 2.4;

  // Clip the cover background to the right half when the left page isn't visible
  const bgClip = leftOpacity < 0.01
    ? `inset(0 0 0 50%)`   // clip left half of the book-block-sized bg
    : "none";

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

      {/* ── Book block ── */}
      <div style={{
        position: "absolute",
        left: bookX, top: bookY,
        width: openBookW, height: openBookH,
        perspective, perspectiveOrigin: "50% 50%",
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

        {/* ── Cover background SVG ── */}
        <div style={{
          position: "absolute",
          top: -overhang, left: -overhang,
          width: bgW, height: bgH,
          zIndex: 0,
          clipPath: bgClip,
          pointerEvents: "none",
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

        {/* ── Page surfaces (clipped rect, mirrors OpenBook's book-pages-clip) ── */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: pageRo,
          overflow: "hidden",
          zIndex: 2,
        }}>
          {/* Left parchment — hidden until cover passes 90° */}
          <div style={{
            position: "absolute", left: 0, top: 0,
            width: "50%", height: "100%",
            backgroundColor: "var(--parchment, hsl(38,28%,87%))",
            backgroundImage: "var(--noise, none), var(--ruled-lines, none), linear-gradient(to right, rgba(160,130,90,0.10) 0%, transparent 18%), linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, transparent 6%, transparent 94%, rgba(0,0,0,0.06) 100%)",
            opacity: leftOpacity,
          }}/>

          {/* Right parchment — always visible (the page behind the cover) */}
          <div style={{
            position: "absolute", right: 0, top: 0,
            width: "50%", height: "100%",
            backgroundColor: "var(--parchment, hsl(38,24%,85%))",
            backgroundImage: "var(--noise, none), var(--ruled-lines, none), linear-gradient(to left, rgba(160,130,90,0.10) 0%, transparent 18%), linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, transparent 6%, transparent 94%, rgba(0,0,0,0.06) 100%)",
          }}>
            {castShadow > 0 && (
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 65%)",
                opacity: castShadow, zIndex: 10,
              }}/>
            )}
          </div>
        </div>

        {/* ── Page edge stacks ── */}
        <PageEdgeStack side="left"  w={pageEdgeW} h={openBookH} opacity={leftOpacity}/>
        <PageEdgeStack side="right" w={pageEdgeW} h={openBookH} opacity={rightStackOpacity}/>

        {/* ── Spine crease ── */}
        <div style={{
          position: "absolute", left: "50%", top: 0,
          transform: "translateX(-50%)",
          width: creaseW, height: "100%",
          background: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.10) 28%, rgba(0,0,0,0.22) 46%, rgba(0,0,0,0.22) 54%, rgba(0,0,0,0.10) 72%, transparent 100%)",
          zIndex: 9, opacity: leftOpacity,
        }}/>

        {/* ── Edge fades ── */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0,
          height: edgeFadeH, zIndex: 12,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.12), transparent)"}}/>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
          height: edgeFadeH, zIndex: 12,
          background: "linear-gradient(to top, rgba(0,0,0,0.14), transparent)"}}/>

        {/* ── Turning cover leaf ──────────────────────────────────────────────
         *  Exactly pageW × openBookH, sitting at left:50% (the spine).
         *  Pivot at its own LEFT edge (transformOrigin "0px 50%").
         *  At rotY=0   → leaf lies flat on the RIGHT page (closed).
         *  At rotY=-180 → leaf lies flat on the LEFT  page (open).
         * ─────────────────────────────────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          left: `calc(50% - ${overhang}px)`,
          top: -overhang,
          width: leafW,
          height: leafH,
          transformOrigin: `${overhang}px 50%`,
          transform: `rotateY(${rotY}deg)`,
          transformStyle: "preserve-3d",
          zIndex: 20,
        }}>
          {/* Front face (cover exterior) */}
          <div style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          } as React.CSSProperties}>
            <CoverFront
              bookColour={bookColour} accentColour={accentColour}
              w={leafW} h={leafH} ro={leafRo}
              title={title} subtitle={subtitle}
            />
          </div>
          {/* Back face (parchment endpaper) */}
          <div style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          } as React.CSSProperties}>
          </div>
        </div>

      </div>
    </div>
  );
};

// ─── Scene factory ────────────────────────────────────────────────────────────

export function opening(
  _lang:   "en" | "nl",
  accent:  string,
  context: SceneContext,
): ScenePages {
  return {
    left: null,
    right: (
      <OpeningAnimation
        bookColour={context.bookColour ?? "#1f9e63"}
        accentColour={accent}
        title={context.openingTitle}
        subtitle={context.openingSubtitle}
        sceneDuration={context.sceneDuration ?? 150}
      />
    ),
  };
}