/**
 * Root.tsx  —  Remotion composition entry point
 *
 * Wires together:
 *   • StoryBook orchestrator
 *   • Scene registry  (one import per scene file in scenes/)
 *   • Live-editable inputProps pushed from the webapp
 *
 * ── Adding a new scene ────────────────────────────────────────
 * 1. Create  scenes/MyScene.tsx  and export a function:
 *      export function myScene(lang: "en" | "nl"): ScenePages { … }
 * 2. Import it here and register it in the `scenes` object.
 * 3. Add the key to defaultInputProps.sceneOrder.
 * ──────────────────────────────────────────────────────────────
 *
 * ── Live-editable inputProps ──────────────────────────────────
 *   sceneOrder    string[]     Order of scene keys (drag-to-reorder in webapp)
 *   sceneDuration number       Frames each scene is visible  (150 = 5 s @ 30fps)
 *   flipDuration  number       Frames the page-flip takes    (70  ≈ 2.3 s @ 30fps)
 *                              ↑ Increase for a slower, more dramatic page turn
 *   bookColour    string       CSS colour — cover border, progress dots
 *   language      "en" | "nl" Passed into every scene factory
 * ──────────────────────────────────────────────────────────────
 */

import React from "react";
import { Composition } from "remotion";

import { StoryBook } from "./StoryBook";
import type { StoryBookProps } from "./StoryBook";

// ── Scene imports ─────────────────────────────────────────────────────────────
import { certifications } from "./scenes/CertificationScene";
import { seminars }       from "./scenes/SeminarsScene";
import { community }      from "./scenes/CommunityScene";
import { achievements }   from "./scenes/AchievementsScene";

// ── Scene registry ────────────────────────────────────────────────────────────

export const scenes: StoryBookProps["scenes"] = {
  certifications,
  seminars,
  community,
  achievements,
};

// ── Default input props (override from webapp) ────────────────────────────────

export const defaultInputProps = {
  sceneOrder:    ["certifications", "seminars", "community", "achievements"] as string[],
  sceneDuration: 150,   // frames visible per scene   (150 @ 30fps = 5 s)
  flipDuration:  200,    // frames for the page flip   (70  @ 30fps ≈ 2.3 s) ← adjust here
  bookColour:    "#1f9e63",
  language:      "en" as "en" | "nl",
};

// ── Derived total duration ────────────────────────────────────────────────────

function totalDuration(props: typeof defaultInputProps): number {
  const { sceneOrder, sceneDuration, flipDuration } = props;
  // The last scene has no flip-out, so subtract one flipDuration
  return sceneOrder.length * sceneDuration + (sceneOrder.length - 1) * flipDuration;
}

// ── Thin wrapper so calculateMetadata can pass live props through ─────────────

const StoryBookComposition: React.FC<typeof defaultInputProps> = (props) => (
  <StoryBook
    sceneOrder={props.sceneOrder}
    sceneDuration={props.sceneDuration}
    flipDuration={props.flipDuration}
    bookColour={props.bookColour}
    scenes={scenes}
    language={props.language}
  />
);

// ── Remotion root ─────────────────────────────────────────────────────────────

export const RemotionRoot: React.FC = () => (
  <Composition
    id="StoryBook"
    component={StoryBookComposition}
    durationInFrames={totalDuration(defaultInputProps)}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={defaultInputProps}
    calculateMetadata={({ props }) => ({
      durationInFrames: totalDuration(props as typeof defaultInputProps),
    })}
  />
);