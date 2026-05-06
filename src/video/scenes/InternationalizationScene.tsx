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

import { BookPage, StorySection, formatChapterLabel } from "../BookPage";
import type { SceneContext, ScenePages } from "../StoryBook";
import { PhotoCollage, type CollageImage } from "../components/PhotoCollage";

/* Images */
import bipTeamImage from "../../assets/BIP_Team.jpg";
import bipWorkshopImage from "../../assets/BIP_Workshop.jpg";
import bipKaraokeImage from "../../assets/BIP - Karaoke.jpg";
import bipExplorationImage from "../../assets/BIP_Exploration.jpg";
import bipGroupImage from "../../assets/BIP_Group.jpg";
import bipMaastrichtImage from "../../assets/BIP_Maastricht.jpg";
import bipCaves from "../../assets/BIP_Caves.jpg";
// ─── BIP image manifest ───────────────────────────────────────────────────────
// Update src values to match your actual filenames inside assets/bip/

const BIP_IMAGES: CollageImage[] = [
  { src: bipCaves, alt: "BIP team at the opening session" },
  { src: bipWorkshopImage, alt: "Workshop in progress" },
  { src: bipKaraokeImage, alt: "Karaoke on the boat" },
  { src: bipMaastrichtImage, alt: "Maastricht city view" },
  { src: bipTeamImage, alt: "Final day group photo" },
  { src: bipExplorationImage, alt: "City exploration" },
  { src: bipGroupImage, alt: "BIP team at the opening session" },
];

type Lang = "en" | "nl";

interface InternationalisationCopy {
  chapterTitle: string;
  left_title: string;
  right_title: string;
  whatLabel: string;
  whatText: string;
  experienceLabel: string;
  experienceText: string;
}

const copy: Record<Lang, InternationalisationCopy> = {
  en: {
    chapterTitle: "Internationalization",
    left_title: "Blended Intensive Program",
    right_title: "Memorable Moments",
    whatLabel: "What is BIP?",
    whatText:
      "The Blended Intensive Program (BIP) is an intensive, week-long collaborative programme jointly organised by partner universities across Europe. \n" +
      "This BIP took place in Belgium at PXL. We were joinedby students from students from TH Rosenheim (Germany) & Algebra University (Croatia). ",
    experienceLabel: "My Experience",
    experienceText:
      "I'm really glad I participated in the BIP. I learned a lot about working in an international team, and it was a great opportunity to meet people from different cultures and backgrounds. The assignment was challenging. We didn't have a topic until Thursday. However, we managed to still win the competiton",
  },
  nl: {
    chapterTitle: "Internationalisering",
    left_title: "Blended Intensive Program",
    right_title: "Memorabele Momenten",
    whatLabel: "Wat is BIP?",
    whatText:
      "De BIP (Blended Intensive Program) is een week intensief samenwerken met studenten, gezamenlijk georganiseerd door partneruniversiteiten uit heel Europa. " +
      "Deze BIP vond plaats in België, bij PXL. We wekte samen met studenten van TH Rosenheim (Duitsland) en Algebra University (Kroatië).",
    experienceLabel: "Mijn Ervaring",
    experienceText:
      "Ik ben heel blij dat ik heb meegedaan aan de BIP. Ik heb veel geleerd over het werken in een internationaal team, en het was een geweldige kans om mensen met verschillende culturen en achtergronden te ontmoeten. " +
      "De opdracht was een uitdaging. We wisten pas donderdag wat ons onderwerp was. Toch zijn we erin geslaagd om de wedstrijd te winnen",
  },
};

export function internationalization(lang: "en" | "nl", accent: string, context: SceneContext): ScenePages {
  const t = copy[lang];
  const chapter = formatChapterLabel(lang, context.chapterNumber, t.chapterTitle);

  const left = (
    <BookPage
      chapter={chapter}
      title={t.left_title}
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
      title={t.right_title}
      pageNumber={context.rightPageNumber}
      accent={accent}
    >
      <PhotoCollage images={BIP_IMAGES} accent={accent} layout="landscape-portrait" />
    </BookPage>
  );

  return { left, right };
}