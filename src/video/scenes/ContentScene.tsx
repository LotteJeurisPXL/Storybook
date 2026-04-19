import React from "react";
import { BookPage, StorySection, formatChapterLabel } from "../BookPage";
import type { SceneContext, ScenePages } from "../StoryBook";

type Lang = "en" | "nl";

const copy = {
  en: {
    chapterTitle: "Contents",
    title: "Contents",
    subtitle: "Overview of the storybook chapters",
    heading: "Chapters",
  },
  nl: {
    chapterTitle: "Inhoud",
    title: "Inhoud",
    subtitle: "Overzicht van de hoofdstukken",
    heading: "Hoofdstukken",
  },
} as const;

function labelFromKey(key: string): string {
  return key
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function content(lang: Lang, accent: string, context: SceneContext): ScenePages {
  const t = copy[lang];
  const chapter = formatChapterLabel(lang, context.chapterNumber, t.chapterTitle);

  const orderedScenes = context.sceneOrder.filter((key) => key !== "content");

  const left = <></>;

  const right = (
    <BookPage
      chapter={chapter}
      title={t.title}
      subtitle={t.subtitle}
      icon="☰"
      pageNumber={context.rightPageNumber}
      accent={accent}
    >
      <StorySection heading={t.heading} accent={accent}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {orderedScenes.map((key, index) => (
            <div
              key={key}
              style={{
                display: "grid",
                gridTemplateColumns: "36px minmax(0, 1fr)",
                gap: 10,
                alignItems: "center",
                padding: "7px 0",
                borderBottom: "1px solid #2c241610",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.76rem",
                  color: accent,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.9rem",
                  color: "#5a4e38",
                }}
              >
                {labelFromKey(key)}
              </span>
            </div>
          ))}
        </div>
      </StorySection>
    </BookPage>
  );

  return { left, right };
}