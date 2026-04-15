/**
 * scenes/AchievementsScene.tsx
 *
 * Left  → key metrics stats
 * Right → awards & recognition list
 */

import React from "react";
import { BookPage, StorySection, StoryStat, StoryList } from "../BookPage";
import type { ScenePages } from "../StoryBook";

const copy = {
  en: {
    chapter:  "Chapter IV · Impact",
    title:    "Achievements",
    subtitle: "Milestones that define our journey.",
    s1:       "Key Metrics",
    s2:       "Awards & Recognition",
    statA:    "Projects",
    statB:    "Satisfaction",
    statC:    "Awards",
    awards:   [
      "Best Digital Transformation — 2025",
      "Innovation Award — 2024",
      "Top Employer — 2023",
      "Sustainability Prize — 2023",
    ],
  },
  nl: {
    chapter:  "Hoofdstuk IV · Impact",
    title:    "Prestaties",
    subtitle: "Mijlpalen die onze reis definiëren.",
    s1:       "Kernstatistieken",
    s2:       "Prijzen & Erkenning",
    statA:    "Projecten",
    statB:    "Tevredenheid",
    statC:    "Prijzen",
    awards:   [
      "Beste Digitale Transformatie — 2025",
      "Innovatieprijs — 2024",
      "Beste Werkgever — 2023",
      "Duurzaamheidsprijs — 2023",
    ],
  },
};

export function achievements(lang: "en" | "nl"): ScenePages {
  const t = copy[lang];

  const left = (
    <BookPage
      chapter={t.chapter}
      title={t.title}
      subtitle={t.subtitle}
      icon="🏆"
      pageNumber={7}
      accent="#177d4d"
    >
      <StorySection heading={t.s1} accent="#177d4d">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <StoryStat value="32"  label={t.statA} accent="#177d4d" />
          <StoryStat value="99%" label={t.statB} accent="#1f9e63" />
          <StoryStat value="4"   label={t.statC} accent="#3bb87e" />
        </div>
      </StorySection>
    </BookPage>
  );

  const right = (
    <BookPage
      chapter={t.chapter}
      title=" "
      pageNumber={8}
      accent="#1f9e63"
    >
      <StorySection heading={t.s2} accent="#1f9e63">
        <StoryList items={t.awards} accent="#b8860b" bullet="🏅" />
      </StorySection>
    </BookPage>
  );

  return { left, right };
}