/**
 * scenes/InternshipScene.tsx
 *
 * Chapter III · Internationalization  (same chapter as BIP)
 *
 * Left  → Title "Internship", what the internship was, personal experience
 * Right → Photo collage of the internship
 *
 * Factory signature:
 *   export function internship(lang: "en" | "nl", accent: string): ScenePages
 */

import React from "react";
import { BookPage, StorySection, formatChapterLabel } from "../BookPage";
import type { SceneContext, ScenePages } from "../StoryBook";
import { PhotoCollage, type CollageImage } from "../components/PhotoCollage";

// ─── Internship image manifest ────────────────────────────────────────────────
// Update src values to match your actual filenames inside assets/internship/

const INTERNSHIP_IMAGES: CollageImage[] = [
  { src: "assets/internship/photo1.jpg", alt: "First day at the office" },
  { src: "assets/internship/photo2.jpg", alt: "Working on a project" },
  { src: "assets/internship/photo3.jpg", alt: "Team meeting" },
  { src: "assets/internship/photo4.jpg", alt: "Company event" },
  { src: "assets/internship/photo5.jpg", alt: "Final presentation" },
];

// ─── Copy ─────────────────────────────────────────────────────────────────────

type Lang = "en" | "nl";

interface InternshipCopy {
  chapterTitle: string;
  title: string;
  subtitle: string;
  whatLabel: string;
  whatText: string;
  experienceLabel: string;
  experienceText: string;
}

const copy: Record<Lang, InternshipCopy> = {
  en: {
    chapterTitle: "Internship",
    title: "Internship",
    subtitle: "A professional placement abroad that put theory into practice.",
    whatLabel: "What was the internship?",
    whatText:
      "The internship was a full-time professional placement at [Company], based in [City, Country], lasting [X months]. As part of the [Team/Department] team, I contributed to real client-facing projects, working alongside experienced professionals in an international environment. The role covered [key responsibilities — e.g. software development, data analysis, UX design], with a strong emphasis on [highlight — e.g. cross-team collaboration, agile workflows, client communication]. The placement was arranged through [programme/university partnership] and formed a compulsory part of the degree curriculum.",
    experienceLabel: "My Experience",
    experienceText:
      "The internship turned out to be the most hands-on and growth-intensive period of my studies. From the first week I was given real responsibility — [brief example of meaningful task or project] — which forced me to close the gap between academic knowledge and professional practice fast. Working in a foreign country added another layer: navigating a new culture, a different pace, and daily conversations in [language] sharpened skills I hadn't expected to develop. By the end, I left with a finished deliverable I'm proud of, a clearer sense of the direction I want to take, and a network of colleagues I genuinely learned from.",
  },
  nl: {
    chapterTitle: "Stage",
    title: "Stage",
    subtitle: "Een buitenlandse stage die theorie in de praktijk omzette.",
    whatLabel: "Wat hield de stage in?",
    whatText:
      "De stage was een voltijdse professionele plaatsing bij [Bedrijf], gevestigd in [Stad, Land], met een duur van [X maanden]. Als onderdeel van het team [Team/Afdeling] werkte ik mee aan echte klantgerichte projecten, naast ervaren professionals in een internationale omgeving. De rol omvatte [kernverantwoordelijkheden — bv. softwareontwikkeling, data-analyse, UX-design], met een sterke nadruk op [aandachtspunt — bv. samenwerking over teams heen, agile werkwijzen, klantcommunicatie]. De plaatsing werd geregeld via [programma/universiteitpartnerschap] en maakte een verplicht onderdeel uit van het leerplan.",
    experienceLabel: "Mijn Ervaring",
    experienceText:
      "De stage bleek de meest hands-on en intensieve groeiperiode van mijn opleiding. Vanaf de eerste week kreeg ik echte verantwoordelijkheid — [korte omschrijving van een betekenisvolle taak of project] — wat me dwong de kloof tussen academische kennis en professionele praktijk snel te dichten. Werken in het buitenland voegde een extra dimensie toe: een nieuwe cultuur navigeren, een ander werkritme, en dagelijkse gesprekken in het [taal] scherpten vaardigheden aan die ik niet had verwacht te ontwikkelen. Op het einde verliet ik de stage met een afgewerkt resultaat waar ik trots op ben, een duidelijker beeld van de richting die ik wil uitgaan, en een netwerk van collega's waar ik écht iets van heb geleerd.",
  },
};

// ─── Scene factory ────────────────────────────────────────────────────────────

export function internship(lang: "en" | "nl", accent: string, context: SceneContext): ScenePages {
  const t = copy[lang];
  const chapter = formatChapterLabel(lang, context.chapterNumber, t.chapterTitle);

  const left = (
    <BookPage
      chapter={chapter}
      title={t.title}
      subtitle={t.subtitle}
      icon="💼"
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
      <PhotoCollage images={INTERNSHIP_IMAGES} accent={accent} layout="hero-left" />
    </BookPage>
  );

  return { left, right };
}