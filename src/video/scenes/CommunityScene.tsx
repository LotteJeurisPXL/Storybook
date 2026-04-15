/**
 * scenes/CommunityScene.tsx
 *
 * Left  → network reach stats
 * Right → initiatives list
 */

import React from "react";
import { BookPage, StorySection, StoryStat, StoryList } from "../BookPage";
import type { ScenePages } from "../StoryBook";

const copy = {
  en: {
    chapter:     "Chapter III · People",
    title:       "Community",
    subtitle:    "Building connections that outlast any project.",
    s1:          "Network Reach",
    s2:          "Initiatives",
    statA:       "Members",
    statB:       "Events / yr",
    statC:       "Cities",
    initiatives: [
      "Open-source mentoring programme",
      "Monthly professional meetups",
      "Annual innovation hackathon",
      "Peer study circles",
      "Open office hours for newcomers",
    ],
  },
  nl: {
    chapter:     "Hoofdstuk III · Mensen",
    title:       "Community",
    subtitle:    "Verbindingen bouwen die elk project overleven.",
    s1:          "Netwerk Bereik",
    s2:          "Initiatieven",
    statA:       "Leden",
    statB:       "Events / jaar",
    statC:       "Steden",
    initiatives: [
      "Open-source mentoringprogramma",
      "Maandelijkse professionele meetups",
      "Jaarlijkse innovatiehackathon",
      "Peer studigroepen",
      "Open spreekuren voor nieuwelingen",
    ],
  },
};

export function community(lang: "en" | "nl"): ScenePages {
  const t = copy[lang];

  const left = (
    <BookPage
      chapter={t.chapter}
      title={t.title}
      subtitle={t.subtitle}
      icon="🌿"
      pageNumber={5}
      accent="#3bb87e"
    >
      <StorySection heading={t.s1} accent="#3bb87e">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <StoryStat value="2.4k" label={t.statA} accent="#3bb87e" />
          <StoryStat value="18"   label={t.statB} accent="#177d4d" />
          <StoryStat value="9"    label={t.statC} accent="#1f9e63" />
        </div>
      </StorySection>
    </BookPage>
  );

  const right = (
    <BookPage
      chapter={t.chapter}
      title=" "
      pageNumber={6}
      accent="#1f9e63"
    >
      <StorySection heading={t.s2} accent="#1f9e63">
        <StoryList items={t.initiatives} accent="#3bb87e" bullet="◆" />
      </StorySection>
    </BookPage>
  );

  return { left, right };
}