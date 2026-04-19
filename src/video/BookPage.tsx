/**
 * BookPage.tsx
 *
 * Whimsical storybook page layout and all page sub-components.
 * Styles live in styles/BookPage.css.
 * Only dynamic values (accent colour, icon border/bg, etc.) are inline.
 *
 * Exports:
 *   BookPage          — full page wrapper (header, title block, body, footer)
 *   StorySection      — labelled section with wax-dot and rule
 *   StoryTag          — decorative pill
 *   StoryStat         — metric box with ornamental corners
 *   StoryList         — bullet list with custom glyph
 *   IllustrationBox   — bordered ornate frame
 */

import React from "react";
import "./styles/BookPage.css";

// ─── Design token JS object (mirrors tokens.css, for inline use) ──────────────

export const T = {
  ink:        "#2c2416",
  inkMid:     "#5a4e38",
  inkLight:   "#8a7a5e",
  green:      "#1f9e63",
  gold:       "#b8860b",
};

export function formatChapterLabel(lang: "en" | "nl", chapterNumber: number, title: string) {
  const prefix = lang === "nl" ? "Hoofdstuk" : "Chapter";
  return `${prefix} ${chapterNumber} · ${title}`;
}

// ─── OrnamentDivider ──────────────────────────────────────────────────────────

const OrnamentDivider: React.FC<{ colour?: string }> = ({ colour = T.gold }) => (
  <svg className="ornament-divider" viewBox="0 0 200 16" width={200} height={16}>
    <line x1="0"   y1="8" x2="72"  y2="8" stroke={colour} strokeWidth="0.8" opacity="0.5" />
    <circle cx="84"  cy="8" r="2.5" fill="none" stroke={colour} strokeWidth="1" opacity="0.7" />
    <path d="M96,8 L100,4 L104,8 L100,12 Z" fill={colour} opacity="0.55" />
    <circle cx="116" cy="8" r="2.5" fill="none" stroke={colour} strokeWidth="1" opacity="0.7" />
    <line x1="128" y1="8" x2="200" y2="8" stroke={colour} strokeWidth="0.8" opacity="0.5" />
  </svg>
);

// ─── StorySection ─────────────────────────────────────────────────────────────

export const StorySection: React.FC<{
  heading: string;
  accent?: string;
  children: React.ReactNode;
}> = ({ heading, accent = T.green, children }) => (
  <div className="story-section">
    <div className="story-section__heading-row">
      <div
        className="story-section__dot"
        style={{ background: accent, boxShadow: `0 0 0 2px ${accent}28` }}
      />
      <span className="story-section__label" style={{ color: accent }}>
        {heading}
      </span>
      <div className="story-section__rule" style={{ background: `${accent}30` }} />
    </div>
    <div className="story-section__body">{children}</div>
  </div>
);

// ─── StoryTag ─────────────────────────────────────────────────────────────────

export const StoryTag: React.FC<{ label: string; accent?: string }> = ({
  label,
  accent = T.green,
}) => (
  <span
    className="story-tag"
    style={{
      border: `1px solid ${accent}50`,
      background: `${accent}12`,
      color: accent,
    }}
  >
    {label}
  </span>
);

// ─── StoryStat ────────────────────────────────────────────────────────────────

const CORNERS = [
  { top:    3, left:  3 },
  { top:    3, right: 3 },
  { bottom: 3, left:  3 },
  { bottom: 3, right: 3 },
] as const;

export const StoryStat: React.FC<{
  value: string;
  label: string;
  accent?: string;
}> = ({ value, label, accent = T.green }) => (
  <div
    className="story-stat"
    style={{
      border: `1px solid ${accent}30`,
      background: `linear-gradient(135deg, ${accent}06 0%, transparent 100%)`,
    }}
  >
    {CORNERS.map((pos, i) => (
      <div
        key={i}
        className="story-stat__corner"
        style={{
          ...pos,
          borderColor: `${accent}45`,
          ...("top"    in pos ? { borderTopWidth:    1.5 } : { borderBottomWidth: 1.5 }),
          ...("left"   in pos ? { borderLeftWidth:   1.5 } : { borderRightWidth:  1.5 }),
        }}
      />
    ))}
    <div className="story-stat__value" style={{ color: accent }}>{value}</div>
    <div className="story-stat__label">{label}</div>
  </div>
);

// ─── StoryList ────────────────────────────────────────────────────────────────

export const StoryList: React.FC<{
  items: string[];
  accent?: string;
  bullet?: string;
}> = ({ items, accent = T.green, bullet = "✦" }) => (
  <div>
    {items.map((item, i) => (
      <div
        key={i}
        className="story-list__item"
        style={{ borderBottom: `1px solid ${T.ink}0e` }}
      >
        <span className="story-list__bullet" style={{ color: accent }}>{bullet}</span>
        {item}
      </div>
    ))}
  </div>
);

// ─── IllustrationBox ──────────────────────────────────────────────────────────

export const IllustrationBox: React.FC<{
  children: React.ReactNode;
  accent?: string;
  caption?: string;
  height?: number;
}> = ({ children, accent = T.gold, caption, height = 140 }) => (
  <div className="illustration-box">
    <div
      className="illustration-box__frame"
      style={{
        height,
        border: `1px solid ${accent}40`,
        background: `${accent}08`,
      }}
    >
      <div className="illustration-box__inset-shadow" />
      {children}
    </div>
    {caption && <p className="illustration-box__caption">{caption}</p>}
  </div>
);

// ─── BookPage ─────────────────────────────────────────────────────────────────

export interface BookPageProps {
  title: string;
  chapter?: string;
  subtitle?: string;
  icon?: string;
  pageNumber?: number;
  accent?: string;
  /** Render children in a two-column grid */
  twoColumn?: boolean;
  children?: React.ReactNode;
}

export const BookPage: React.FC<BookPageProps> = ({
  title,
  chapter,
  subtitle,
  icon,
  pageNumber,
  accent = T.green,
  twoColumn = false,
  children,
}) => (
  <div className="book-page">
    {/* Running header */}
    <div className="book-page__header">
      {chapter && (
        <span className="book-page__chapter" style={{ color: `${accent}cc` }}>
          {chapter}
        </span>
      )}
      {icon && (
        <div
          className="book-page__icon"
          style={{
            border: `1px solid ${accent}30`,
            background: `${accent}10`,
          }}
        >
          {icon}
        </div>
      )}
    </div>

    {/* Title block */}
    <div className="book-page__title-block">
      <h1 className="book-page__title">{title}</h1>
      {subtitle && <p className="book-page__subtitle">{subtitle}</p>}
      <div className="book-page__divider">
        <OrnamentDivider colour={accent} />
      </div>
    </div>

    {/* Body */}
    <div className={`book-page__body${twoColumn ? " book-page__body--two-column" : ""}`}>
      {children}
    </div>

    {/* Footer */}
    <div
      className="book-page__footer"
      style={{ borderTop: `1px solid ${T.ink}18` }}
    >
      <OrnamentDivider colour={accent} />
      {pageNumber !== undefined && (
        <span className="book-page__page-number">— {pageNumber} —</span>
      )}
    </div>
  </div>
);