/**
 * Index.tsx  —  Remotion composition entry point
 *
 * "opening" is always first and "content" always second — enforced by
 * normalizeSceneOrder(). They cannot be reordered in the webapp.
 */

import React from "react";
import { Composition } from "remotion";
import type { AnyZodObject } from "remotion";

import { StoryBook } from "./StoryBook";
import type { SceneFactory } from "./StoryBook";

import { opening }               from "./scenes/OpeningScene";
import { content }               from "./scenes/ContentScene";
import { introduction }          from "./scenes/IntroductionScene";
import { seminars }              from "./scenes/SeminarsScene";
import { internationalization }  from "./scenes/InternationalizationScene";
import { volunteering }          from "./scenes/VolunteeringScene";
import { innovation }            from "./scenes/InnovationScene";

// ── Scene registry ────────────────────────────────────────────────────────────

export const sceneDefinitions = [
  { key: "opening",              label: "Opening",              fixed: true  },
  { key: "content",              label: "Contents",             fixed: true  },
  { key: "introduction",         label: "Introduction",         fixed: false },
  { key: "seminars",             label: "Seminars",             fixed: false },
  { key: "innovation",           label: "Innovation",           fixed: false },
  { key: "internationalization", label: "Internationalization", fixed: false },
  { key: "volunteering",         label: "Volunteering",         fixed: false },
] as const;

export type SceneKey = (typeof sceneDefinitions)[number]["key"];

export const sceneOrderOptions = sceneDefinitions
  .filter((d) => !d.fixed)
  .map(({ key, label }) => ({ value: key, label }));

/** Kept for backwards-compatibility with InputSection and other webapp components. */
export const CONTENT_SCENE_KEY = "content" as const;

/** Keys that are always pinned to the front and cannot be reordered. */
export const OPENING_SCENE_KEY = "opening" as const;

/** Ensures "opening" and "content" are always positions 0 and 1. */
export function normalizeSceneOrder(order: SceneKey[]): SceneKey[] {
  const fixed: SceneKey[] = [OPENING_SCENE_KEY, CONTENT_SCENE_KEY];
  const rest = order.filter((k) => !fixed.includes(k));
  return [...fixed, ...rest];
}

export const scenes: Record<SceneKey, SceneFactory> = {
  opening,
  content,
  introduction,
  seminars,
  internationalization,
  volunteering,
  innovation,
};

// ── Input props ───────────────────────────────────────────────────────────────

export interface StoryBookInputProps extends Record<string, unknown> {
  sceneOrder:       SceneKey[];
  sceneDuration:    number;
  flipDuration:     number;
  /**
   * Duration of the opening scene in frames.
   * Keep this short (e.g. 30 = 1 s) since the book is already open —
   * it just needs enough time for StoryBook to cross-fade into the first
   * real page flip. Defaults to 30.
   */
  openingDuration:  number;
  bookColour:       string;
  accentColour:     string;
  language:         "en" | "nl";
  /** Title shown on the closed book cover */
  openingTitle:     string;
  /** Subtitle / author line on the cover */
  openingSubtitle:  string;
}

export const defaultInputProps: StoryBookInputProps = {
  sceneOrder:      normalizeSceneOrder(sceneDefinitions.map(({ key }) => key)),
  sceneDuration:   150,
  flipDuration:    200,
  openingDuration: 30,
  bookColour:      "#1f9e63",
  accentColour:    "#b8860b",
  language:        "en",
  openingTitle:    "My Storybook",
  openingSubtitle: "",
};

// ── Derived total duration ────────────────────────────────────────────────────

function totalDuration(props: StoryBookInputProps): number {
  const { sceneOrder, sceneDuration, flipDuration, openingDuration } = props;
  // The opening scene uses openingDuration; all others use sceneDuration.
  const contentScenes = sceneOrder.length - 1;
  return openingDuration + contentScenes * sceneDuration + (sceneOrder.length - 1) * flipDuration;
}

// ── Composition wrapper ───────────────────────────────────────────────────────

const StoryBookComposition: React.FC<StoryBookInputProps> = (props) => (
  <StoryBook
    sceneOrder={props.sceneOrder}
    sceneDuration={props.sceneDuration}
    flipDuration={props.flipDuration}
    bookColour={props.bookColour}
    accentColour={props.accentColour}
    scenes={scenes}
    language={props.language}
    openingTitle={props.openingTitle}
    openingSubtitle={props.openingSubtitle}
  />
);

// ── Remotion root ─────────────────────────────────────────────────────────────

export const RemotionRoot: React.FC = () => (
  <Composition<AnyZodObject, StoryBookInputProps>
    id="StoryBook"
    component={StoryBookComposition}
    durationInFrames={totalDuration(defaultInputProps)}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={defaultInputProps}
    calculateMetadata={({ props }) => ({
      durationInFrames: totalDuration(props),
    })}
  />
);