/**
 * StoryBook.tsx
 *
 * Top-level Remotion component — timeline orchestrator.
 *
 * ── Left page timing fix ──────────────────────────────────────
 * During a page flip the LEFT page must switch from the outgoing
 * scene to the incoming scene at EXACTLY the midpoint (progress=0.5),
 * when the turning leaf is edge-on and nothing is visible.
 * Before the midpoint → left shows currentScene.
 * After  the midpoint → left shows nextScene.
 * ──────────────────────────────────────────────────────────────
 *
 * ── Left / right independent content ─────────────────────────
 * Each scene factory now returns { left, right } — two ReactNodes.
 * Use the BookPage component on each side independently, or render
 * any content you like on either half.
 * ──────────────────────────────────────────────────────────────
 *
 * ── Flip speed ────────────────────────────────────────────────
 * Set flipDuration in Root.tsx defaultInputProps.
 * Default: 70 frames @ 30 fps ≈ 2.3 s.
 * Higher = slower / more dramatic. Lower = snappier.
 * ──────────────────────────────────────────────────────────────
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { OpenBook } from "./OpenBook";
import { PageFlip } from "./PageFlip";

// ─── Types ────────────────────────────────────────────────────────────────────

/** What each scene must return — separate content for left and right page */
export interface ScenePages {
  left:  React.ReactNode;
  right: React.ReactNode;
}

export interface SceneContext {
  chapterNumber: number;
  leftPageNumber: number;
  rightPageNumber: number;
  sceneOrder: string[];
}

export type SceneFactory = (
  lang: "en" | "nl",
  accent: string,
  context: SceneContext,
) => ScenePages;

export interface StoryBookProps {
  sceneOrder:    string[];
  sceneDuration: number;
  /** Duration of the page-flip animation in frames.
   *  Adjust here or override via inputProps from the webapp.
   *  Default 70 frames @ 30 fps ≈ 2.3 seconds. */
  flipDuration:  number;
  bookColour:    string;
  accentColour:  string;
  scenes:        Record<string, SceneFactory>;
  language:      "en" | "nl";
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slotFrames(sceneDuration: number, flipDuration: number) {
  return sceneDuration + flipDuration;
}

// ─── Progress dots ────────────────────────────────────────────────────────────

const ProgressDots: React.FC<{
  count: number;
  current: number;
  colour: string;
}> = ({ count, current, colour }) => (
  <div className="progress-dots">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={`progress-dot ${i === current ? "progress-dot--active" : "progress-dot--inactive"}`}
        style={
          i === current
            ? { background: colour, boxShadow: `0 0 8px ${colour}88` }
            : {}
        }
      />
    ))}
  </div>
);

// ─── StoryBook ────────────────────────────────────────────────────────────────

export const StoryBook: React.FC<StoryBookProps> = ({
  sceneOrder,
  sceneDuration,
  flipDuration,
  bookColour,
  accentColour,
  scenes,
  language,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const totalScenes = sceneOrder.length;
  const slot = slotFrames(sceneDuration, flipDuration);

  const currentSlot  = Math.min(Math.floor(frame / slot), totalScenes - 1);
  const frameInSlot  = frame - currentSlot * slot;
  const isLastScene  = currentSlot === totalScenes - 1;
  const isFlipping   = !isLastScene && frameInSlot >= sceneDuration;
  const flipFrame    = frameInSlot - sceneDuration;

  const rawProgress = isFlipping ? Math.min(flipFrame / flipDuration, 1) : 0;

  // Eased progress — tweak the bezier to change the feel of the flip
  const flipProgress = interpolate(rawProgress, [0, 1], [0, 1], {
    easing: Easing.bezier(0.68, 0, 0.32, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentKey = sceneOrder[currentSlot] ?? sceneOrder[0];
  const nextKey    = sceneOrder[Math.min(currentSlot + 1, totalScenes - 1)] ?? currentKey;

  const sceneIndexByKey = new Map(sceneOrder.map((key, index) => [key, index]));
  const currentSceneIndex = sceneIndexByKey.get(currentKey) ?? currentSlot;
  const nextSceneIndex = sceneIndexByKey.get(nextKey) ?? Math.min(currentSlot + 1, totalScenes - 1);

  const currentSceneContext = {
    chapterNumber: currentSceneIndex + 1,
    leftPageNumber: currentSceneIndex * 2 + 1,
    rightPageNumber: currentSceneIndex * 2 + 2,
    sceneOrder,
  };

  const nextSceneContext = {
    chapterNumber: nextSceneIndex + 1,
    leftPageNumber: nextSceneIndex * 2 + 1,
    rightPageNumber: nextSceneIndex * 2 + 2,
    sceneOrder,
  };

  const currentPages = scenes[currentKey]?.(language, accentColour, currentSceneContext) ?? { left: null, right: null };
  const nextPages    = scenes[nextKey]?.(language, accentColour, nextSceneContext)    ?? { left: null, right: null };

  // ── Left page timing ─────────────────────────────────────────────────────
  // Switch at midpoint (progress >= 0.5) so the update is hidden behind the
  // edge-on turning leaf where nothing is visible.
  const leftPage = isFlipping && flipProgress >= 0.5
    ? nextPages.left
    : currentPages.left;

  // ── Right page ───────────────────────────────────────────────────────────
  const bookW = Math.round(width * 0.88);
  const pageW = Math.round(bookW / 2);
  const bookH = Math.round(height * 0.88 * 0.9);

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