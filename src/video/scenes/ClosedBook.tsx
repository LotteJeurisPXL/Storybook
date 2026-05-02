/**
 * ClosedBook.tsx
 *
 * Renders a closed hardcover book as pure SVG/divs — matching exactly
 * the cover appearance from OpenBook.tsx (same gradients, spine crease,
 * gold rule, page-edge stack).
 *
 * Used by OpeningScene for the "book starts closed" state.
 */

import React from "react";
import { useVideoConfig } from "remotion";

// ─── Colour utility (same as OpenBook.tsx) ────────────────────────────────────

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

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ClosedBookProps {
  /** Cover colour — same prop as OpenBook's bookColour */
  bookColour: string;
  /** Accent colour for inner decorations */
  accentColour: string;
  /** Title printed on the cover */
  title?: string;
  /** Subtitle / author line */
  subtitle?: string;
  /** Scale factor (default 0.88, same as OpenBook) */
  scale?: number;
}

// ─── ClosedBook ───────────────────────────────────────────────────────────────

export const ClosedBook: React.FC<ClosedBookProps> = ({
  bookColour,
  accentColour,
  title = "",
  subtitle = "",
  scale = 0.88,
}) => {
  const { width, height } = useVideoConfig();

  // Book dimensions — proportional to the open-book layout so the transition is seamless
  // The open book is (width * scale) wide × (height * scale * 0.9) tall.
  // The closed book is half that width (one page) plus spine.
  const openBookW = Math.round(width  * scale);
  const openBookH = Math.round(height * scale * 0.9);

  // Closed book is roughly half the open-book width + a little spine depth
  const bookW = Math.round(openBookW * 0.52);
  const bookH = openBookH;

  // Cover overhang / thickness — same ratios as OpenBook.tsx
  const overhang       = Math.round((openBookW / 1920) * 20 * 2.0);
  const coverThickness = Math.round((openBookW / 1920) * 18 * 2.5);
  const pageEdgeW      = Math.round((openBookW / 1920) * 22 * 2.0);
  const spineW         = coverThickness * 2;          // visible spine on the left

  const coverW = bookW + overhang * 2;
  const coverH = bookH + overhang * 2;
  const ro     = Math.round(coverW * 0.013);

  // Colours — mirrors CoverBackground in OpenBook.tsx
  const dark  = darken(bookColour, 0.30);
  const mid   = darken(bookColour, 0.14);
  const light = darken(bookColour, 0.02);

  const outerPath =
    `M ${ro},0 H ${coverW - ro} Q ${coverW},0 ${coverW},${ro} ` +
    `V ${coverH - ro} Q ${coverW},${coverH} ${coverW - ro},${coverH} ` +
    `H ${ro} Q 0,${coverH} 0,${coverH - ro} ` +
    `V ${ro} Q 0,0 ${ro},0 Z`;

  // Page-edge layers (right side — the "fore-edge" of the closed book)
  const pageLayers = 9;

  // Unique gradient IDs (avoid collisions with OpenBook SVG IDs)
  const fillId  = "closed-cover-fill";
  const spineId = "closed-cover-spine";
  const shadowId = "closed-drop-shadow";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at 50% 60%, #2e2416 0%, #1a1208 100%)",
      }}
    >
      {/* Table glow — same as OpenBook */}
      <div
        style={{
          position: "absolute",
          bottom: height * 0.04,
          left: "50%",
          transform: "translateX(-50%)",
          width: coverW * 0.9,
          height: 60,
          background: bookColour,
          filter: "blur(28px)",
          opacity: 0.35,
          borderRadius: "50%",
        }}
      />

      {/* ── Book block ── */}
      <div
        style={{
          position: "relative",
          width:  bookW,
          height: bookH,
          overflow: "visible",
        }}
      >
        {/* Drop shadow */}
        <div
          style={{
            position: "absolute",
            top:    bookH * 0.97,
            left:   bookW * 0.05,
            width:  bookW * 0.90,
            height: bookH * 0.08,
            background: "rgba(0,0,0,0.55)",
            filter: "blur(18px)",
            borderRadius: "50%",
          }}
        />

        {/* ── Cover SVG ── */}
        <svg
          style={{
            position: "absolute",
            top:  -overhang,
            left: -overhang,
            overflow: "visible",
            zIndex: 0,
          }}
          width={coverW}
          height={coverH}
          viewBox={`0 0 ${coverW} ${coverH}`}
        >
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor={dark}  />
              <stop offset="45%"  stopColor={mid}   />
              <stop offset="100%" stopColor={light} />
            </linearGradient>

            {/* Spine shadow — heavier on the left (spine side) */}
            <linearGradient id={spineId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(0,0,0,0.55)" />
              <stop offset="12%"  stopColor="rgba(0,0,0,0.35)" />
              <stop offset="25%"  stopColor="rgba(0,0,0,0.12)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)"    />
            </linearGradient>

            <radialGradient id={shadowId} cx="50%" cy="100%" r="50%">
              <stop offset="0%"   stopColor="rgba(0,0,0,0.6)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)"   />
            </radialGradient>
          </defs>

          {/* Cover face */}
          <path d={outerPath} fill={`url(#${fillId})`} />

          {/* Top-edge highlight */}
          <line
            x1={ro} y1={2}
            x2={coverW - ro} y2={2}
            stroke="rgba(255,255,255,0.10)" strokeWidth="1.5"
          />

          {/* Spine fold shadow (left side for a closed book) */}
          <rect
            x={0} y={0}
            width={coverW * 0.28}
            height={coverH}
            fill={`url(#${spineId})`}
          />

          {/* Outer border rule */}
          <path
            d={outerPath}
            fill="none"
            stroke={`${accentColour}45`}
            strokeWidth="1.5"
          />

          {/* Inner decorative frame */}
          {(() => {
            const pad = coverThickness * 1.6;
            const fx = pad; const fy = pad;
            const fw = coverW - pad * 2; const fh = coverH - pad * 2;
            const fr = Math.max(2, ro - 4);
            const framePath =
              `M ${fx + fr},${fy} H ${fx + fw - fr} Q ${fx + fw},${fy} ${fx + fw},${fy + fr} ` +
              `V ${fy + fh - fr} Q ${fx + fw},${fy + fh} ${fx + fw - fr},${fy + fh} ` +
              `H ${fx + fr} Q ${fx},${fy + fh} ${fx},${fy + fh - fr} ` +
              `V ${fy + fr} Q ${fx},${fy} ${fx + fr},${fy} Z`;
            return (
              <path
                d={framePath}
                fill="none"
                stroke={`${accentColour}30`}
                strokeWidth="1"
              />
            );
          })()}

          {/* Gold spine rule */}
          <line
            x1={coverW * 0.06} y1={coverH * 0.06}
            x2={coverW * 0.06} y2={coverH * 0.94}
            stroke="rgba(255,215,100,0.30)" strokeWidth="1.5"
          />

          {/* Corner ornaments */}
          {[
            [coverW * 0.12, coverH * 0.07],
            [coverW * 0.88, coverH * 0.07],
            [coverW * 0.12, coverH * 0.93],
            [coverW * 0.88, coverH * 0.93],
          ].map(([cx, cy], i) => (
            <g key={i} transform={`translate(${cx},${cy})`}>
              <path
                d="M-8,0 L0,-8 L8,0 L0,8 Z"
                fill="none"
                stroke={`${accentColour}50`}
                strokeWidth="1"
              />
              <circle r="2" fill={`${accentColour}60`} />
            </g>
          ))}

          {/* Central emblem — diamond with initials */}
          <g transform={`translate(${coverW * 0.5},${coverH * 0.38})`}>
            <path
              d={`M0,-${coverH * 0.10} L${coverH * 0.07},0 L0,${coverH * 0.10} L-${coverH * 0.07},0 Z`}
              fill="none"
              stroke={`${accentColour}55`}
              strokeWidth="1.5"
            />
            <path
              d={`M0,-${coverH * 0.08} L${coverH * 0.056},0 L0,${coverH * 0.08} L-${coverH * 0.056},0 Z`}
              fill={`${accentColour}12`}
              stroke={`${accentColour}40`}
              strokeWidth="1"
            />
          </g>

          {/* Title text on cover */}
          {title && (
            <text
              x={coverW * 0.5}
              y={coverH * 0.58}
              textAnchor="middle"
              fontFamily="'Playfair Display', Georgia, serif"
              fontSize={Math.round(coverH * 0.048)}
              fontWeight="700"
              fill={`${accentColour}dd`}
              letterSpacing="1"
            >
              {title}
            </text>
          )}

          {/* Subtitle */}
          {subtitle && (
            <text
              x={coverW * 0.5}
              y={coverH * 0.66}
              textAnchor="middle"
              fontFamily="'DM Sans', system-ui, sans-serif"
              fontSize={Math.round(coverH * 0.028)}
              fontWeight="400"
              fill={`${accentColour}88`}
              letterSpacing="0.5"
            >
              {subtitle}
            </text>
          )}

          {/* Horizontal rule below subtitle */}
          <line
            x1={coverW * 0.3} y1={coverH * 0.72}
            x2={coverW * 0.7} y2={coverH * 0.72}
            stroke={`${accentColour}35`} strokeWidth="0.8"
          />
        </svg>

        {/* ── Page-edge stack (right / fore-edge side) ── */}
        <div
          style={{
            position: "absolute",
            right:  -pageEdgeW * 0.3,
            top:    2,
            width:  pageEdgeW,
            height: bookH - 4,
            zIndex: 8,
            overflow: "hidden",
          }}
        >
          {Array.from({ length: pageLayers }).map((_, i) => {
            const pct = i / (pageLayers - 1);
            const lightness = 91 - pct * 5;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: 0,
                  left: i * (pageEdgeW / pageLayers),
                  width: pageEdgeW / pageLayers,
                  height: "100%",
                  background: `hsl(38, 22%, ${lightness}%)`,
                }}
              />
            );
          })}
          {/* Shadow on page edge */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>

        {/* Edge fades top & bottom */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 18,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 100%)",
            zIndex: 12,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: 18,
            background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 100%)",
            zIndex: 12,
          }}
        />
      </div>
    </div>
  );
};