/**
 * StoryBook.tsx — timeline orchestrator.
 *
 * Opening scene:
 *   IDLE  → full-frame (no OpenBook shell), OpeningAnimation runs
 *   FLIP-OUT → normal <OpenBook> + <PageFlip>
 *              outgoing = FlatCoverPage (parchment endpaper)
 *              incoming = next scene's right page (content visible from frame 0)
 *              left page switches at midpoint (standard behaviour)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { OpenBook } from "./OpenBook";
import { PageFlip } from "./PageFlip";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScenePages {
  left:  React.ReactNode;
  right: React.ReactNode;
}

export interface SceneContext {
  chapterNumber:    number;
  leftPageNumber:   number;
  rightPageNumber:  number;
  sceneOrder:       string[];
  bookColour?:      string;
  sceneDuration?:   number;
  openingTitle?:    string;
  openingSubtitle?: string;
}

export type SceneFactory = (
  lang:    "en" | "nl",
  accent:  string,
  context: SceneContext,
) => ScenePages;

export interface StoryBookProps {
  sceneOrder:       string[];
  sceneDuration:    number;
  flipDuration:     number;
  bookColour:       string;
  accentColour:     string;
  scenes:           Record<string, SceneFactory>;
  language:         "en" | "nl";
  openingTitle?:    string;
  openingSubtitle?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slotFrames(sceneDuration: number, flipDuration: number) {
  return sceneDuration + flipDuration;
}

// ─── FlatCoverPage ────────────────────────────────────────────────────────────
// The "outgoing" right page when flipping out of the opening scene.
// Represents the parchment endpaper of the open cover lying flat.

const FlatCoverPage: React.FC<{ accentColour: string }> = ({ accentColour }) => (
  <div style={{
    position: "absolute",
    inset: 0,
    backgroundColor: "hsl(38,28%,86%)",
    backgroundImage: "var(--noise, none)",
  }}>
    <div style={{
      position: "absolute", top: 0, left: 0, bottom: 0, width: 32,
      background: `linear-gradient(to right, ${accentColour}18, transparent)`,
    }}/>
  </div>
);

// ─── Progress dots ────────────────────────────────────────────────────────────

const ProgressDots: React.FC<{ count: number; current: number; colour: string }> = ({
  count, current, colour,
}) => (
  <div className="progress-dots">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={`progress-dot ${i === current ? "progress-dot--active" : "progress-dot--inactive"}`}
        style={i === current ? { background: colour, boxShadow: `0 0 8px ${colour}88` } : {}}
      />
    ))}
  </div>
);

// ─── StoryBook ────────────────────────────────────────────────────────────────

export const StoryBook: React.FC<StoryBookProps> = ({
  sceneOrder, sceneDuration, flipDuration,
  bookColour, accentColour, scenes, language,
  openingTitle, openingSubtitle,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const totalScenes = sceneOrder.length;
  const slot = slotFrames(sceneDuration, flipDuration);

  const currentSlot = Math.min(Math.floor(frame / slot), totalScenes - 1);
  const frameInSlot = frame - currentSlot * slot;
  const isLastScene = currentSlot === totalScenes - 1;
  const isFlipping  = !isLastScene && frameInSlot >= sceneDuration;
  const flipFrame   = frameInSlot - sceneDuration;

  const rawProgress  = isFlipping ? Math.min(flipFrame / flipDuration, 1) : 0;
  const flipProgress = interpolate(rawProgress, [0, 1], [0, 1], {
    easing: Easing.bezier(0.68, 0, 0.32, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentKey = sceneOrder[currentSlot] ?? sceneOrder[0];
  const nextKey    = sceneOrder[Math.min(currentSlot + 1, totalScenes - 1)] ?? currentKey;

  const sceneIndexByKey = new Map(sceneOrder.map((key, idx) => [key, idx]));
  const currentSceneIdx = sceneIndexByKey.get(currentKey) ?? currentSlot;
  const nextSceneIdx    = sceneIndexByKey.get(nextKey) ?? Math.min(currentSlot + 1, totalScenes - 1);

  function chapterNumberFor(sceneIdx: number): number {
    if (sceneIdx <= 1) {
      return 1;
    }

    return sceneOrder.slice(0, sceneIdx).filter((key) => key !== "opening").length;
  }

  const extraContext = { bookColour, sceneDuration, openingTitle, openingSubtitle };

  const currentCtx: SceneContext = {
    chapterNumber: chapterNumberFor(currentSceneIdx),
    leftPageNumber:  currentSceneIdx * 2 + 1,
    rightPageNumber: currentSceneIdx * 2 + 2,
    sceneOrder, ...extraContext,
  };

  const nextCtx: SceneContext = {
    chapterNumber: chapterNumberFor(nextSceneIdx),
    leftPageNumber:  nextSceneIdx * 2 + 1,
    rightPageNumber: nextSceneIdx * 2 + 2,
    sceneOrder, ...extraContext,
  };

  const bookW = Math.round(width  * 0.88);
  const pageW = Math.round(bookW  / 2);
  const bookH = Math.round(height * 0.88 * 0.9);

  // ── Opening scene idle: full-frame, no OpenBook shell ───────────────────
  if (currentKey === "opening" && !isFlipping) {
    const openingPages = scenes["opening"]?.(language, accentColour, currentCtx)
      ?? { left: null, right: null };
    return (
      <div style={{ position: "relative", width, height }}>
        {openingPages.right}
      </div>
    );
  }

  // ── Opening scene flip-out: OpenBook shell + PageFlip ───────────────────
  // outgoing = FlatCoverPage (parchment endpaper of open cover)
  // incoming = content scene's right page (visible beneath from the start)
  // left = null until midpoint, then content scene's left page
  if (currentKey === "opening" && isFlipping) {
    const nextPages = scenes[nextKey]?.(language, accentColour, nextCtx)
      ?? { left: null, right: null };

    const leftPage = flipProgress >= 0.5 ? nextPages.left : null;

    const rightPage = (
      <PageFlip
        progress={flipProgress}
        outgoing={<FlatCoverPage accentColour={accentColour} />}
        incoming={nextPages.right}
        pageWidth={pageW}
        pageHeight={bookH}
      />
    );

    return (
      <div style={{ position: "relative", width, height }}>
        <OpenBook bookColour={bookColour} leftPage={leftPage} rightPage={rightPage} />
        <ProgressDots count={totalScenes} current={currentSlot} colour={bookColour} />
      </div>
    );
  }

  // ── All other scenes ─────────────────────────────────────────────────────
  const currentPages = scenes[currentKey]?.(language, accentColour, currentCtx)
    ?? { left: null, right: null };
  const nextPages    = scenes[nextKey]?.(language, accentColour, nextCtx)
    ?? { left: null, right: null };

  const leftPage = isFlipping && flipProgress >= 0.5
    ? nextPages.left
    : currentPages.left;

  const rightPage = isFlipping ? (
    <PageFlip
      progress={flipProgress}
      outgoing={currentPages.right}
      incoming={nextPages.right}
      pageWidth={pageW}
      pageHeight={bookH}
    />
  ) : (
    currentPages.right
  );

  return (
    <div style={{ position: "relative", width, height }}>
      <OpenBook bookColour={bookColour} leftPage={leftPage} rightPage={rightPage} />
      <ProgressDots count={totalScenes} current={currentSlot} colour={bookColour} />
    </div>
  );
};