/**
 * scenes/BIPScene.tsx
 *
 * Chapter III · Internationalization
 *
 * Left  → Title "BIP", what the event is, personal experience
 * Right → Photo collage of the BIP trip
 *
 * Follows the same factory signature as all other scenes:
 *   export function bip(lang: "en" | "nl", accent: string): ScenePages
 */

import React from "react";
import { BookPage, StorySection, formatChapterLabel } from "../BookPage";
import type { SceneContext, ScenePages } from "../StoryBook";
import { PhotoCollage, type CollageImage } from "../components/PhotoCollage";

// ─── BIP image manifest ───────────────────────────────────────────────────────
// Update src values to match your actual filenames inside assets/bip/

const BIP_IMAGES: CollageImage[] = [
  { src: "assets/bip/photo1.jpg", alt: "BIP team at the opening session" },
  { src: "assets/bip/photo2.jpg", alt: "Workshop in progress" },
  { src: "assets/bip/photo3.jpg", alt: "Team brainstorming" },
  { src: "assets/bip/photo4.jpg", alt: "City exploration" },
  { src: "assets/bip/photo5.jpg", alt: "Final pitch presentation" },
];

type Lang = "en" | "nl";

interface InternationalisationCopy {
  chapterTitle: string;
  title: string;
  subtitle: string;
  whatLabel: string;
  whatText: string;
  experienceLabel: string;
  experienceText: string;
}

const copy: Record<Lang, InternationalisationCopy> = {
  en: {
    chapterTitle: "Internationalization",
    title: "BIP",
    subtitle: "Business Integration Project — an international semester exchange.",
    whatLabel: "What is BIP?",
    whatText:
      "The Business Integration Project (BIP) is an intensive, week-long collaborative programme jointly organised by partner universities across Europe. Students from different countries and disciplines form mixed teams to tackle a real-world business challenge set by an industry partner. Working in English, teams go through the full cycle of problem analysis, ideation, prototyping, and final pitch — all within five days. The programme is hosted at a rotating partner institution each edition, bringing together typically 80–120 students from 6 to 10 different countries.",
    experienceLabel: "My Experience",
    experienceText:
      "Joining the BIP was one of the most energising weeks of my studies. Beyond the project itself, it was the cultural mix that made it unforgettable: late-night strategy sessions with teammates from Portugal, Spain, and Germany pushed me to articulate ideas clearly across language barriers and adapt quickly to very different working styles. The final pitch landed us in the top three, but the bigger takeaway was discovering how much you can build — and how fast — when a team is fully committed and genuinely curious about each other's perspectives.",
  },
  nl: {
    chapterTitle: "Internationalisering",
    title: "BIP",
    subtitle: "Business Integration Project — een internationale semesteruitwisseling.",
    whatLabel: "Wat is BIP?",
    whatText:
      "Het Business Integration Project (BIP) is een intensief, week lang samenwerkingsprogramma dat gezamenlijk wordt georganiseerd door partneruniversiteiten uit heel Europa. Studenten uit verschillende landen en disciplines vormen gemengde teams om een reële bedrijfsuitdaging van een industriepartner aan te pakken. Werkend in het Engels doorlopen teams de volledige cyclus van probleemanalyse, ideevorming, prototyping en een eindpitch — allemaal binnen vijf dagen. Het programma wordt elke editie gehost bij een roulerende partnerinstelling en brengt doorgaans 80 tot 120 studenten uit 6 tot 10 verschillende landen samen.",
    experienceLabel: "Mijn Ervaring",
    experienceText:
      "De BIP was een van de meest energieke weken van mijn studies. Naast het project zelf was het de culturele mix die het onvergetelijk maakte: late strategiesessies met teamgenoten uit Portugal, Spanje en Duitsland duwden me om ideeën helder te verwoorden over taalbarrières heen en snel te schakelen naar heel andere werkmethodes. De eindpitch bracht ons in de top drie, maar de grootste les was te ontdekken hoeveel je kunt bouwen — en hoe snel — als een team volledig geëngageerd is en oprecht nieuwsgierig naar elkaars perspectieven.",
  },
};

export function internationalization(lang: "en" | "nl", accent: string, context: SceneContext): ScenePages {
  const t = copy[lang];
  const chapter = formatChapterLabel(lang, context.chapterNumber, t.chapterTitle);

  const left = (
    <BookPage
      chapter={chapter}
      title={t.title}
      subtitle={t.subtitle}
      icon="✈️"
      pageNumber={context.leftPageNumber}
      accent={accent}
    >
      <StorySection heading={t.whatLabel} accent={accent}>
        <p
          style={{
            lineHeight: 1.75,
            color: "#2c2416",
            margin: 0,
          }}
        >
          {t.whatText}
        </p>
      </StorySection>

      <StorySection heading={t.experienceLabel} accent={accent}>
        <p
          style={{
            lineHeight: 1.75,
            color: "#2c2416",
            margin: 0,
          }}
        >
          {t.experienceText}
        </p>
      </StorySection>
    </BookPage>
  );

  const right = (
    <BookPage
      chapter={chapter}
      title={t.title}
      pageNumber={context.rightPageNumber}
      accent={accent}
    >
      <PhotoCollage images={BIP_IMAGES} accent={accent} layout="hero-left" />
    </BookPage>
  );

  return { left, right };
}