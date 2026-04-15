/**
 * scenes/CertificationsScene.tsx
 *
 * Each scene returns { left, right } — two independent BookPage nodes,
 * one for each page of the open spread.
 *
 * Left  → credential tag cloud + stat boxes
 * Right → active certifications table
 */

import React from "react";
import { BookPage, StorySection, StoryTag, StoryStat } from "../BookPage";
import type { ScenePages } from "../StoryBook";

const copy = {
  en: {
    chapter:  "Chapter I · Credentials",
    title:    "Certifications",
    subtitle: "Verified expertise, recognised worldwide.",
    s1:       "Core Qualifications",
    s2:       "Active Certifications",
    statA:    "Certifications",
    statB:    "Countries",
    tags:     ["ISO 9001", "PMP", "AWS", "Scrum Master", "GDPR"],
    certs:    [
      ["AWS Solutions Architect", "2026"],
      ["PMP",                     "2025"],
      ["Scrum Master",            "2025"],
      ["GDPR Practitioner",       "2024"],
    ],
  },
  nl: {
    chapter:  "Hoofdstuk I · Diploma's",
    title:    "Certificeringen",
    subtitle: "Bewezen expertise, wereldwijd erkend.",
    s1:       "Kernkwalificaties",
    s2:       "Actieve Certificaten",
    statA:    "Certificaten",
    statB:    "Landen",
    tags:     ["ISO 9001", "PMP", "AWS", "Scrum Master", "GDPR"],
    certs:    [
      ["AWS Solutions Architect", "2026"],
      ["PMP",                     "2025"],
      ["Scrum Master",            "2025"],
      ["GDPR Practitioner",       "2024"],
    ],
  },
};

export function certifications(lang: "en" | "nl"): ScenePages {
  const t = copy[lang];

  const left = (
    <BookPage
      chapter={t.chapter}
      title={t.title}
      subtitle={t.subtitle}
      icon="🏅"
      pageNumber={1}
      accent="#1f9e63"
    >
      <StorySection heading={t.s1} accent="#1f9e63">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {t.tags.map((tag) => <StoryTag key={tag} label={tag} accent="#1f9e63" />)}
        </div>
      </StorySection>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <StoryStat value="14" label={t.statA} accent="#1f9e63" />
        <StoryStat value="6"  label={t.statB} accent="#177d4d" />
      </div>
    </BookPage>
  );

  const right = (
    <BookPage
      chapter={t.chapter}
      title="Test 1, 2, 3" 
      subtitle={t.subtitle}
      pageNumber={2}
      accent="#3bb87e"
    >
      <StorySection heading={t.s2} accent="#3bb87e">
        {t.certs.map(([name, year]) => (
          <div
            key={name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "7px 0",
              borderBottom: "1px solid #2c241610",
              fontSize: "0.86rem",
              color: "#5a4e38",
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
          >
            <span>{name}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.74rem", color: "#1f9e63" }}>
              {year}
            </span>
          </div>
        ))}
      </StorySection>
    </BookPage>
  );

  return { left, right };
}