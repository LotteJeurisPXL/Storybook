/**
 * scenes/SeminarsScene.tsx
 *
 * Left  → recent sessions list
 * Right → topic tag cloud + intro text
 */

import React from "react";
import { BookPage, StorySection, StoryTag, StoryList } from "../BookPage";
import type { ScenePages } from "../StoryBook";

const copy = {
  en: {
    chapter:  "Chapter II · Learning",
    title:    "Seminars & Workshops",
    subtitle: "Continuous learning is at the heart of what we do.",
    s1:       "Recent Sessions",
    s2:       "Topics Covered",
    intro:    "Our sessions bring together practitioners and thinkers to explore what's next — in technology, leadership, and craft.",
    sessions: [
      "AI & Ethics in the Workplace",
      "Agile at Scale",
      "Green Software Engineering",
      "Leadership Communication",
      "Design Thinking Intensive",
    ],
    topics: ["Agile", "AI", "Leadership", "Sustainability", "DevOps", "UX", "Data"],
  },
  nl: {
    chapter:  "Hoofdstuk II · Leren",
    title:    "Seminars & Workshops",
    subtitle: "Voortdurend leren staat centraal in wat we doen.",
    s1:       "Recente Sessies",
    s2:       "Behandelde Onderwerpen",
    intro:    "Onze sessies brengen beoefenaars en denkers samen om te verkennen wat er komen gaat — in technologie, leiderschap en vakmanschap.",
    sessions: [
      "AI & Ethiek op de Werkvloer",
      "Agile op Schaal",
      "Groene Software Engineering",
      "Leiderschapscommunicatie",
      "Design Thinking Intensief",
    ],
    topics: ["Agile", "AI", "Leiderschap", "Duurzaamheid", "DevOps", "UX", "Data"],
  },
};

export function seminars(lang: "en" | "nl"): ScenePages {
  const t = copy[lang];

  const left = (
    <BookPage
      chapter={t.chapter}
      title={t.title}
      subtitle={t.subtitle}
      icon="🎓"
      pageNumber={3}
      accent="#6dcfa0"
    >
      <StorySection heading={t.s1} accent="#6dcfa0">
        <StoryList items={t.sessions} accent="#1f9e63" bullet="✦" />
      </StorySection>
    </BookPage>
  );

  const right = (
    <BookPage
      chapter={t.chapter}
      title=" "
      pageNumber={4}
      accent="#1f9e63"
    >
      <StorySection heading={t.s2} accent="#1f9e63">
        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.86rem", color: "#5a4e38", lineHeight: 1.7, marginBottom: 18 }}>
          {t.intro}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {t.topics.map((tag) => <StoryTag key={tag} label={tag} accent="#1f9e63" />)}
        </div>
      </StorySection>
    </BookPage>
  );

  return { left, right };
}