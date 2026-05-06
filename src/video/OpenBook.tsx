/**
 * OpenBook.tsx
 *
 * Renders the physical open storybook shell.
 *
 * Layer order (back → front):
 *   1. CoverBackground — coloured hardcover SVG, positioned with negative offsets
 *                        so it extends beyond the page block on all sides (z-index 0)
 *   2. book-pages-clip — parchment page surfaces clipped to their rect (z-index 2)
 *   3. PageStack       — stacked page-edge strips at left/right (z-index 8)
 *   4. SpineCrease     — centre fold shadow on the pages (z-index 9)
 *   5. book-edge-fade  — top/bottom darkening on the pages (z-index 12)
 *
 * Styles live in styles/OpenBook.css — only dynamic values are set inline.
 */

import React from "react";
import { useVideoConfig } from "remotion";
import "./styles/OpenBook.css";

// ─── Layout constants ─────────────────────────────────────────────────────────

/** How far the cover extends beyond the page block on each side (px at 1920w) */
const COVER_OVERHANG  = 20;
/** Cover border thickness in px at 1920 width */
const COVER_THICKNESS = 18;
/** Page-stack strip width in px at 1920 width */
const PAGE_STACK_W = 22;
/** Spine crease band width in px */
const CREASE_W = 44;
/** Edge fade overlay height in px */
const EDGE_FADE_H = 18;

// ─── Colour utility ───────────────────────────────────────────────────────────

function darken(hex: string, amount: number): string {
  try {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, ((n >> 16) & 0xff) * (1 - amount));
    const g = Math.max(0, ((n >> 8)  & 0xff) * (1 - amount));
    const b = Math.max(0, (n & 0xff) * (1 - amount));
    return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  } catch {
    return hex;
  }
}

// ─── CoverBackground ─────────────────────────────────────────────────────────

/**
 * Full hardcover rendered as a single SVG *behind* the pages.
 * Positioned with negative top/left equal to `overhang` so it protrudes
 * beyond the page block on all four sides — pages look inset inside the cover.
 */
const CoverBackground: React.FC<{
  colour:  string;
  coverW:  number;
  coverH:  number;
  overhang: number;
  ro:      number;
}> = ({ colour, coverW, coverH, overhang, ro }) => {
  const dark  = darken(colour, 0.30);
  const mid   = darken(colour, 0.14);
  const light = darken(colour, 0.02);

  const outerPath =
    `M ${ro},0 H ${coverW - ro} Q ${coverW},0 ${coverW},${ro} ` +
    `V ${coverH - ro} Q ${coverW},${coverH} ${coverW - ro},${coverH} ` +
    `H ${ro} Q 0,${coverH} 0,${coverH - ro} ` +
    `V ${ro} Q 0,0 ${ro},0 Z`;

  return (
    <svg
      style={{
        position: "absolute",
        top: -overhang,
        left: -overhang,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "visible",
      }}
      width={coverW}
      height={coverH}
      viewBox={`0 0 ${coverW} ${coverH}`}
    >
      <defs>
        <linearGradient id="cover-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={dark}  />
          <stop offset="45%"  stopColor={mid}   />
          <stop offset="100%" stopColor={light} />
        </linearGradient>
        <linearGradient id="cover-spine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(0,0,0,0)"    />
          <stop offset="32%"  stopColor="rgba(0,0,0,0.20)" />
          <stop offset="50%"  stopColor="rgba(0,0,0,0.40)" />
          <stop offset="68%"  stopColor="rgba(0,0,0,0.20)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)"    />
        </linearGradient>
      </defs>

      {/* Cover face */}
      <path d={outerPath} fill="url(#cover-fill)" />

      {/* Top-edge highlight */}
      <line
        x1={ro} y1={2}
        x2={coverW - ro} y2={2}
        stroke="rgba(255,255,255,0.10)" strokeWidth="1.5"
      />

      {/* Gold inner rule on the spine (left) side */}
      <line
        x1={coverW * 0.04} y1={coverH * 0.06}
        x2={coverW * 0.04} y2={coverH * 0.94}
        stroke="rgba(255,215,100,0.25)" strokeWidth="1.5"
      />

      {/* Spine fold shadow */}
      <rect
        x={coverW / 2 - CREASE_W}
        y={0}
        width={CREASE_W * 2}
        height={coverH}
        fill="url(#cover-spine)"
        opacity="0.9"
      />
    </svg>
  );
};

// ─── PageStack ────────────────────────────────────────────────────────────────

const PageStack: React.FC<{
  side: "left" | "right";
  width: number;
  height: number;
}> = ({ side, width, height }) => {
  const layers = 7;
  return (
    <div
      className={`page-stack page-stack--${side}`}
      style={{ width, height: height - 4 }}
    >
      {Array.from({ length: layers }).map((_, i) => {
        const pct = i / (layers - 1);
        const lightness = 91 - pct * 5;
        return (
          <div
            key={i}
            className="page-stack__layer"
            style={{
              width: width / layers,
              ...(side === "left"
                ? { left: i * (width / layers) }
                : { right: i * (width / layers) }),
              background: `hsl(38, 22%, ${lightness}%)`,
            }}
          />
        );
      })}
      <div className="page-stack__shadow" />
    </div>
  );
};

// ─── SpineCrease ──────────────────────────────────────────────────────────────

const SpineCrease: React.FC<{ height: number }> = ({ height }) => (
  <div className="spine-crease" style={{ width: CREASE_W, height }}>
    <div className="spine-crease__line" />
  </div>
);

// ─── PageSurface ──────────────────────────────────────────────────────────────

export const PageSurface: React.FC<{
  side: "left" | "right";
  children?: React.ReactNode;
}> = ({ side, children }) => (
  <div className={`page-surface page-surface--${side}`}>
    {/* Clipped parchment background — texture stays within the page bounds */}
    <div className="page-surface__bg" />
    {/*
     * Content layer: overflow:visible so the flip leaf can arc
     * past the page edge and over the cover during a turn.
     * The inner .page-surface__fill creates an absolute containing block
     * so BookPage's inset:0 always resolves from the surface top-left,
     * regardless of PageFlip's flip-root positioning.
     */}
    <div style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <div className="page-surface__fill">
        {children}
      </div>
    </div>
  </div>
);

// ─── OpenBook ─────────────────────────────────────────────────────────────────

export interface OpenBookProps {
  bookColour: string;
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
  /** Scale factor for the book within the video frame (default 0.88) */
  scale?: number;
}

export const OpenBook: React.FC<OpenBookProps> = ({
  bookColour,
  leftPage,
  rightPage,
  scale = 0.88,
}) => {
  const { width, height } = useVideoConfig();

  const bookW = Math.round(width  * scale);
  const bookH = Math.round(height * scale * 0.9);

  const overhang = Math.round((bookW / 1920) * COVER_OVERHANG * 2.0);
  const coverThickness = Math.round((bookW / 1920) * COVER_THICKNESS * 2.5);
  const pageStackW = Math.round((bookW / 1920) * PAGE_STACK_W * 2.0);

  const coverW = bookW + overhang * 2;
  const coverH = bookH + overhang * 2;

  // Corner radius — proportional to cover width
  const ro = Math.round(coverW * 0.013);
  // Page clip radius is slightly tighter (pages sit inset inside the cover)
  const pageRo = Math.max(2, ro - Math.round(overhang * 0.6));

  return (
    <div
      className="book-scene"
      style={{
        width,
        height,
        background: "radial-gradient(ellipse at 50% 60%, #2e2416 0%, #1a1208 100%)",
      }}
    >
      {/* Table glow */}
      <div
        className="book-table-glow"
        style={{
          bottom: height * 0.04,
          width: coverW * 0.9,
          height: 60,
          background: bookColour,
        }}
      />

      {/*
       * book-block is sized to the *page* area (not the cover).
       * The CoverBackground SVG uses negative top/left to protrude by `overhang`
       * on all sides — making the cover visible around the pages.
       * overflow:visible on book-block lets the cover SVG paint outside it.
       */}
      <div
        className="book-block"
        style={{
          width:  bookW,
          height: bookH,
          ["--cover-thickness" as any]: `${coverThickness}px`,
        }}
      >
        {/* Drop shadow */}
        <div
          className="book-drop-shadow"
          style={{
            top: bookH * 0.95,
            left: bookW * 0.04,
            width:  bookW * 0.92,
            height: bookH * 0.10,
          }}
        />

        {/* ── Back layer: hardcover ── */}
        <CoverBackground
          colour={bookColour}
          coverW={coverW}
          coverH={coverH}
          overhang={overhang}
          ro={ro}
        />

        {/* ── Middle layer: page surfaces ── */}
        <div
          className="book-pages-clip"
          style={{ borderRadius: `${pageRo}px` }}
        >
          <PageSurface side="left">{leftPage}</PageSurface>
          <PageSurface side="right">{rightPage}</PageSurface>
        </div>

        {/* ── Front layers: page details ── */}
        <PageStack side="left"  width={pageStackW} height={bookH} />
        <PageStack side="right" width={pageStackW} height={bookH} />
        <SpineCrease height={bookH} />
        <div className="book-edge-fade book-edge-fade--top"    style={{ height: EDGE_FADE_H }} />
        <div className="book-edge-fade book-edge-fade--bottom" style={{ height: EDGE_FADE_H }} />
      </div>
    </div>
  );
};