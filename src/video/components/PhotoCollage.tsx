/**
 * components/PhotoCollage.tsx
 *
 * Reusable asymmetric photo collage.
 *
 * Usage:
 *   <PhotoCollage images={myImages} accent={accent} />
 *   <PhotoCollage images={myImages} accent={accent} layout="grid" />
 *   <PhotoCollage images={myImages} accent={accent} layout="hero-left" gap={12} />
 *
 * ── Layouts ───────────────────────────────────────────────────────────────────
 *
 *  "hero-left"  (default, 3–5 images)
 *   ┌──────────┬───────┐
 *   │          │   2   │
 *   │    1     ├───────┤
 *   │  (tall)  │   3   │
 *   ├────┬─────┴───────┤
 *   │ 4  │      5      │
 *   └────┴─────────────┘
 *
 *  "hero-top"  (3–5 images)
 *   ┌──────────────────┐
 *   │        1         │
 *   ├────┬────┬────┬───┤
 *   │ 2  │ 3  │ 4  │ 5 │
 *   └────┴────┴────┴───┘
 *
 *  "mosaic"  (5–7 images)
 *   ┌──────┬──────┬──────┐
 *   │  1   │  2   │  3   │
 *   ├──────┴──┬───┴──────┤
 *   │    4    │    5     │
 *   ├─────────┴──┬───────┤
 *   │     6      │   7   │
 *   └────────────┴───────┘
 *
 *  "grid"  (any count — fills a uniform grid)
 *   ┌────┬────┬────┐
 *   │ 1  │ 2  │ 3  │
 *   ├────┼────┼────┤
 *   │ 4  │ 5  │ 6  │
 *   └────┴────┴────┘
 *
 *  "landscape-portrait"  (best for 8–10 images)
 *   ┌────┬─────────┬─────────┐
 *   │ 1  │    2    │    3    │
 *   │    ├─────────┼─────────┤
 *   │    │    4    │    5    │
 *   ├────┴────────┼┴─────────┤
 *   │      6      │    7     │
 *   └─────────────┴──────────┘
 *   (1 is portrait, others are mostly landscape)
 */

import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CollageImage {
  src: string;
  alt: string;
}

export type CollageLayout = "hero-left" | "hero-top" | "mosaic" | "grid" | "landscape-portrait";

export interface PhotoCollageProps {
  images: CollageImage[];
  accent?: string;
  layout?: CollageLayout;
  gap?: number;
  borderRadius?: number;
}

// ─── Internal image tile ──────────────────────────────────────────────────────

const Tile: React.FC<{
  image: CollageImage;
  accent: string;
  borderRadius: number;
  style?: React.CSSProperties;
}> = ({ image, accent, borderRadius, style }) => (
  <div
    style={{
      overflow: "hidden",
      borderRadius,
      border: `2px solid ${accent}30`,
      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
      minHeight: 0, // required for grid children to shrink properly
      ...style,
    }}
  >
    <img
      src={image.src}
      alt={image.alt}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </div>
);

// ─── Layout renderers ─────────────────────────────────────────────────────────

const HeroLeft: React.FC<{ images: CollageImage[]; accent: string; gap: number; borderRadius: number }> = ({
  images, accent, gap, borderRadius,
}) => {
  const [i1, i2, i3, i4, i5] = images;
  const hasBottom = images.length >= 4;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 0.75fr",
      gridTemplateRows: hasBottom ? "1.4fr 1fr 1fr" : "1fr 1fr",
      gap,
      boxSizing: "border-box",
    }}>
      <Tile image={i1} accent={accent} borderRadius={borderRadius}
        style={{ gridColumn: "1", gridRow: `1 / ${hasBottom ? 3 : 2}` }} />
      {i2 && <Tile image={i2} accent={accent} borderRadius={borderRadius}
        style={{ gridColumn: "2", gridRow: "1" }} />}
      {i3 && <Tile image={i3} accent={accent} borderRadius={borderRadius}
        style={{ gridColumn: "2", gridRow: "2" }} />}
      {hasBottom && i4 && <Tile image={i4} accent={accent} borderRadius={borderRadius}
        style={{ gridColumn: "1", gridRow: "3" }} />}
      {hasBottom && i5 && <Tile image={i5} accent={accent} borderRadius={borderRadius}
        style={{ gridColumn: "2", gridRow: "3" }} />}
    </div>
  );
};

const HeroTop: React.FC<{ images: CollageImage[]; accent: string; gap: number; borderRadius: number }> = ({
  images, accent, gap, borderRadius,
}) => {
  const [hero, ...rest] = images;
  const cols = Math.max(rest.length, 1);

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "grid",
      gridTemplateRows: "1.5fr 1fr",
      gap,
      boxSizing: "border-box",
    }}>
      <Tile image={hero} accent={accent} borderRadius={borderRadius}
        style={{ gridRow: "1" }} />
      <div style={{
        gridRow: "2",
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap,
      }}>
        {rest.map((img, i) => (
          <Tile key={i} image={img} accent={accent} borderRadius={borderRadius} />
        ))}
      </div>
    </div>
  );
};

const Mosaic: React.FC<{ images: CollageImage[]; accent: string; gap: number; borderRadius: number }> = ({
  images, accent, gap, borderRadius,
}) => {
  const [i1, i2, i3, i4, i5, i6, i7] = images;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr",
      gap,
      boxSizing: "border-box",
    }}>
      {/* Row 1 — three equal columns */}
      {i1 && <Tile image={i1} accent={accent} borderRadius={borderRadius}
        style={{ gridColumn: "1", gridRow: "1" }} />}
      {i2 && <Tile image={i2} accent={accent} borderRadius={borderRadius}
        style={{ gridColumn: "2", gridRow: "1" }} />}
      {i3 && <Tile image={i3} accent={accent} borderRadius={borderRadius}
        style={{ gridColumn: "3", gridRow: "1" }} />}
      {/* Row 2 — two wider tiles */}
      {i4 && <Tile image={i4} accent={accent} borderRadius={borderRadius}
        style={{ gridColumn: "1 / 3", gridRow: "2" }} />}
      {i5 && <Tile image={i5} accent={accent} borderRadius={borderRadius}
        style={{ gridColumn: "3", gridRow: "2" }} />}
      {/* Row 3 — wide + narrow */}
      {i6 && <Tile image={i6} accent={accent} borderRadius={borderRadius}
        style={{ gridColumn: "1 / 3", gridRow: "3" }} />}
      {i7 && <Tile image={i7} accent={accent} borderRadius={borderRadius}
        style={{ gridColumn: "3", gridRow: "3" }} />}
    </div>
  );
};

const Grid: React.FC<{ images: CollageImage[]; accent: string; gap: number; borderRadius: number }> = ({
  images, accent, gap, borderRadius,
}) => {
  const cols = Math.ceil(Math.sqrt(images.length));

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridAutoRows: "1fr",
      gap,
      boxSizing: "border-box",
    }}>
      {images.map((img, i) => (
        <Tile key={i} image={img} accent={accent} borderRadius={borderRadius} />
      ))}
    </div>
  );
};

const LandscapePortrait: React.FC<{ images: CollageImage[]; accent: string; gap: number; borderRadius: number }> = ({
  images, accent, gap, borderRadius,
}) => {
  // Primary composition follows the documented 1-7 sketch.
  const slots: React.CSSProperties[] = [
    { gridColumn: "1", gridRow: "1 / 3" },
    { gridColumn: "2 / 4", gridRow: "1" },
    { gridColumn: "4 / 6", gridRow: "1" },
    { gridColumn: "2 / 4", gridRow: "2" },
    { gridColumn: "4 / 6", gridRow: "2" },
    { gridColumn: "1 / 3", gridRow: "3" },
    { gridColumn: "3 / 6", gridRow: "3" },
  ];

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "grid",
      gridTemplateColumns: "1.8fr 1fr 1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr",
      gap,
      boxSizing: "border-box",
    }}>
      {images.slice(0, 7).map((img, i) => (
        <Tile
          key={i}
          image={img}
          accent={accent}
          borderRadius={borderRadius}
          style={slots[i]}
        />
      ))}
    </div>
  );
};

// ─── Public component ─────────────────────────────────────────────────────────

export const PhotoCollage: React.FC<PhotoCollageProps> = ({
  images,
  accent = "#1f9e63",
  layout = "hero-left",
  gap = 8,
  borderRadius = 6,
}) => {
  if (!images || images.length === 0) return null;

  const props = { images, accent, gap, borderRadius };

  switch (layout) {
    case "hero-top":  return <HeroTop  {...props} />;
    case "mosaic":    return <Mosaic   {...props} />;
    case "grid":      return <Grid     {...props} />;
    case "landscape-portrait": return <LandscapePortrait {...props} />;
    case "hero-left":
    default:          return <HeroLeft {...props} />;
  }
};