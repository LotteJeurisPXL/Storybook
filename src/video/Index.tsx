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
 *      export function myScene(lang: "en" | "nl", accent: string): ScenePages { … }
 * 2. Import it here and register it in the `scenes` object.
 * 3. Add the key to defaultInputProps.sceneOrder.
 * ──────────────────────────────────────────────────────────────
 *
 * ── Live-editable inputProps ──────────────────────────────────
 *   sceneOrder    string[]     Order of scene keys (drag-to-reorder in webapp)
 *   sceneDuration number       Frames each scene is visible  (150 = 5 s @ 30fps)
 *   flipDuration  number       Frames the page-flip takes    (70  ≈ 2.3 s @ 30fps)
 *                              ↑ Increase for a slower, more dramatic page turn
 *   bookColour    string       CSS colour — cover, progress dots
 *   accentColour  string       CSS colour — page accents and scene styling
 *   language      "en" | "nl" Passed into every scene factory
 * ──────────────────────────────────────────────────────────────
 */

import React from "react";
import { Composition } from "remotion";

import { StoryBook } from "./StoryBook";
import type { SceneFactory } from "./StoryBook";

// ── Scene imports ─────────────────────────────────────────────────────────────
import { content } from "./scenes/ContentScene";
import { introduction } from "./scenes/IntroductionScene";
import {seminars} from "./scenes/SeminarsScene";
import { internationalization } from "./scenes/InternationalizationScene";
import { volunteering } from "./scenes/VolunteeringScene";
import {internship} from "./scenes/InternshipScene";
import { innovation } from "./scenes/InnovationScene";

// ── Scene registry ────────────────────────────────────────────────────────────

export const sceneDefinitions = [
  { key: "content", label: "Contents" },
  { key: "introduction", label: "Introduction" },
  { key: "seminars", label: "Seminars" },
  { key: "internationalization", label: "Internationalization" },
  { key: "volunteering", label: "Volunteering" },
  { key: "internship", label: "Internship" },
  { key: "innovation", label: "Innovation" },
] as const;

export type SceneKey = (typeof sceneDefinitions)[number]["key"];

export const sceneOrderOptions = sceneDefinitions.map(({ key, label }) => ({
  value: key,
  label,
}));

export const CONTENT_SCENE_KEY = "content" as const;

export function normalizeSceneOrder(order: SceneKey[]): SceneKey[] {
  const filtered = order.filter((key) => key !== CONTENT_SCENE_KEY);
  return [CONTENT_SCENE_KEY, ...filtered] as SceneKey[];
}

export const scenes: Record<SceneKey, SceneFactory> = {
  content,
  introduction,
  seminars,
  internationalization,
  volunteering,
  internship,
  innovation
};

// ── Default input props (override from webapp) ────────────────────────────────

export interface StoryBookInputProps {
  sceneOrder: SceneKey[];
  sceneDuration: number;
  flipDuration: number;
  bookColour: string;
  accentColour: string;
  language: "en" | "nl";
}

export const defaultInputProps: StoryBookInputProps = {
  sceneOrder:    normalizeSceneOrder(sceneDefinitions.map(({ key }) => key)),
  sceneDuration: 150,   // frames visible per scene   (150 @ 30fps = 5 s)
  flipDuration:  200,    // frames for the page flip   (70  @ 30fps ≈ 2.3 s) ← adjust here
  bookColour:    "#1f9e63",
  accentColour:  "#b8860b",
  language:      "en" as "en" | "nl",
};

// ── Derived total duration ────────────────────────────────────────────────────

function totalDuration(props: StoryBookInputProps): number {
  const { sceneOrder, sceneDuration, flipDuration } = props;
  // The last scene has no flip-out, so subtract one flipDuration
  return sceneOrder.length * sceneDuration + (sceneOrder.length - 1) * flipDuration;
}

// ── Thin wrapper so calculateMetadata can pass live props through ─────────────

const StoryBookComposition: React.FC<StoryBookInputProps> = (props) => (
  <StoryBook
    sceneOrder={props.sceneOrder}
    sceneDuration={props.sceneDuration}
    flipDuration={props.flipDuration}
    bookColour={props.bookColour}
    accentColour={props.accentColour}
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
      durationInFrames: totalDuration(props as StoryBookInputProps),
    })}
  />
);