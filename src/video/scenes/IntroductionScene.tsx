/**
 * scenes/IntroductionScene.tsx
 *
 * Chapter I introduction spread:
 * Left  → creator profile (name, portrait, interests)
 * Right → reflective career learnings and growth areas
 */

import React from "react";
import { BookPage, StorySection, StoryList, StoryTag, IllustrationBox, T, formatChapterLabel } from "../BookPage";
import type { SceneContext, ScenePages } from "../StoryBook";
import ProfileImage from "../../assets/Lotte.jpeg";

type Lang = "en" | "nl";

const copy: Record<Lang, {
  chapterTitle: string;
  title_left: string;
  title_right: string;
  subtitle_left: string;
  subtitle_right: string;
  creatorHeading: string;
  interestsHeading: string;
  learnHeading: string;
  growthHeading: string;
  traitsHeading: string;
  creatorName: string;
  creatorRole: string;
  creatorBio: string;
  interests: string[];
  learnedAboutSelf: string[];
  improvements: string[];
  traits: string[];
}> = {
  en: {
    chapterTitle: "Introduction",
    title_left: "Introduction",
    title_right: "What I Learned Along The Way",
    subtitle_left: "A quick introduction about who I am.",
    subtitle_right: "Reflections on my journey at PXL.",
    creatorHeading: "About me",
    interestsHeading: "Interests & Curiosity",
    learnHeading: "What I Learned About Myself",
    growthHeading: "How I Worked To Improve",
    traitsHeading: "Core Character Traits",
    creatorName: "Lotte Jeuris",
    creatorRole: "Data Engineer",
    creatorBio:
      "I am energized by turning complex ideas into approachable experiences. I love combining storytelling, design, and code to build things that are both useful and expressive.",
    interests: ["Human-centered design", "Creative coding", "Visual systems", "Learning psychology", "Community building"],
    learnedAboutSelf: [
      "I do my best work when I can connect structure with creativity.",
      "I thrive in collaborative teams where feedback is open and practical.",
      "I stay motivated by meaningful impact, not just delivery speed.",
    ],
    improvements: [
      "Practiced clearer communication under pressure.",
      "Built stronger planning habits for long-running projects.",
      "Learned to balance quality and momentum in decision-making.",
    ],
    traits: ["Curious", "Reliable", "Reflective", "Empathetic", "Resilient"],
  },
  nl: {
    chapterTitle: "Introductie",
    title_left: "Introductie",
    title_right: "Wat Ik Over Mezelf Leerde",
    subtitle_left: "Een korte blik op de maker en het traject achter dit werk.",
    subtitle_right: "Reflecties over mijn reis bij PXL.",
    creatorHeading: "Maker",
    interestsHeading: "Interesses & Nieuwsgierigheid",
    learnHeading: "Wat Ik Over Mezelf Leerde",
    growthHeading: "Waar Ik Gericht Aan Werkte",
    traitsHeading: "Kernkaraktereigenschappen",
    creatorName: "Lotte Jeuris",
    creatorRole: "Data Engineer",
    creatorBio:
      "Ik krijg energie van complexe ideeën vertalen naar heldere ervaringen. Ik combineer graag storytelling, design en code om iets te bouwen dat tegelijk nuttig en expressief is.",
    interests: ["Mensgericht ontwerp", "Creative coding", "Visuele systemen", "Leerpsychologie", "Community building"],
    learnedAboutSelf: [
      "Ik presteer het best wanneer structuur en creativiteit samenkomen.",
      "Ik groei in teams waar feedback open en concreet is.",
      "Ik haal motivatie uit betekenisvolle impact, niet alleen uit snelheid.",
    ],
    improvements: [
      "Duidelijker leren communiceren onder druk.",
      "Sterkere planningsroutines opgebouwd voor lange projecten.",
      "Kwaliteit en tempo beter leren balanceren bij beslissingen.",
    ],
    traits: ["Nieuwsgierig", "Betrouwbaar", "Reflectief", "Empathisch", "Veerkrachtig"],
  },
};

const profilePortraitStyle: React.CSSProperties = {
  width: 130,
  height: 130,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  fontFamily: "'Fraunces', Georgia, serif",
  fontWeight: 600,
  fontSize: 28,
  letterSpacing: "0.03em",
};

export function introduction(lang: Lang, accent: string, context: SceneContext): ScenePages {
  const t = copy[lang];
  const chapter = formatChapterLabel(lang, context.chapterNumber, t.chapterTitle);

  const left = (
    <BookPage
      chapter={chapter}
      title={t.title_left}
      subtitle={t.subtitle_left}
      icon="✧"
      pageNumber={context.leftPageNumber}
      accent={accent}
    >
      <StorySection heading={t.creatorHeading} accent={accent}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12 }}>
          <IllustrationBox accent={accent} height={152}>
            <div
              style={{
                height: "100%",
                display: "grid",
                placeItems: "center",
              }}
            >
            <img src={ProfileImage} alt="Lotte Jeuris" style={{
                ...profilePortraitStyle,
                border: `2px solid ${accent}`,
                background: `linear-gradient(145deg, ${accent}22, #ffffffcc)`,
                color: accent,
            }}
            />
            </div>
          </IllustrationBox>

          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: "0 0 4px",
                color: T.ink,
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'x-large',
              }}
            >
              {t.creatorName}
            </p>
            <p
              style={{
                margin: 0,
                color: accent,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontSize: 'large',
              }}
            >
              {t.creatorRole}
            </p>
          </div>
        </div>

        <p
          style={{
            margin: "8px 0 0",
            color: T.inkMid,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "x-large",
            lineHeight: 1.65,
          }}
        >
          {t.creatorBio}
        </p>
      </StorySection>

      <br />

      <StorySection heading={t.interestsHeading} accent={accent}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {t.interests.map((interest) => (
            <StoryTag key={interest} label={interest} accent={accent} />
          ))}
        </div>
      </StorySection>
    </BookPage>
  );

  const right = (
    <BookPage
      chapter={chapter}
      title={t.title_right}
      subtitle={t.subtitle_right}
      pageNumber={context.rightPageNumber}
      accent={accent}
    >
      <StorySection heading={t.learnHeading} accent={accent}>
        <StoryList items={t.learnedAboutSelf} accent={accent} bullet="✦" />
      </StorySection>

      <StorySection heading={t.growthHeading} accent={accent}>
        <StoryList items={t.improvements} accent={accent} bullet="✦" />
      </StorySection>

      <StorySection heading={t.traitsHeading} accent={accent}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {t.traits.map((trait) => (
            <StoryTag key={trait} label={trait} accent={accent} />
          ))}
        </div>
      </StorySection>
    </BookPage>
  );

  return { left, right };
}
