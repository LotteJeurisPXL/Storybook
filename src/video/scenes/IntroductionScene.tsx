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
  creatorHeading: string;
  interestsHeading: string;
  learnHeading: string;
  traitsHeading: string;
  creatorName: string;
  creatorRole: string;
  creatorBio: string;
  interests: string[];
  learnedAboutSelf: string[];
  traits: string[];
}> = {
  en: {
    chapterTitle: "Introduction",
    title_left: "Biography",
    title_right: "More About Me",
    creatorHeading: "About me",
    interestsHeading: "Interests & Curiosity",
    learnHeading: "What I Learned About Myself",
    traitsHeading: "Core Character Traits",
    creatorName: "Lotte Jeuris",
    creatorRole: "Data Engineer",
    creatorBio:
      "I started out with a Full stack developers' degree, obtained at SyntraPXL. Currently I am expanding " +
      "my knowledge with a professional bachelor in Applied Computer Science at PXL. I have a strong " +
      "interest in Big Data & Artificial Intelligence. In my spare time, I volunteer at CoderDojo to help " +
      "children learn to code. I am socially engaged, critical, detail-oriented and eager to learn",
    interests: ["Data engineering", "Data analysis", "Artificial Intelligence"],
    learnedAboutSelf: [
      "I perform best when structure and creativity come together.",
      "I thrive in teams where feedback is open and specific.",
      "I draw motivation from making a meaningful impact, not just from speed.",
    ],
    traits: ["Analytical", "Reliable", "Detail-oriented", "Teamwork", "Curious", "Independent", "Helpful"],
  },
  nl: {
    chapterTitle: "Introductie",
    title_left: "Biografie",
    title_right: "Meer over mezelf",
    creatorHeading: "Maker",
    interestsHeading: "Interesses & Nieuwsgierigheid",
    learnHeading: "Wat Ik Over Mezelf Leerde",
    traitsHeading: "Kernkaraktereigenschappen",
    creatorName: "Lotte Jeuris",
    creatorRole: "Data Engineer",
    creatorBio:
     "Ik ben gestart met een Full stack developer diploma, behaald bij SyntraPXL.  Momenteel vervolledig ik mijn kennis via " +
      "een professionele bachelor Toegepaste Informatica aan de PXL. Ik heb een sterke interesse in Big Data & AI." +
      "In mijn vrije tijd ben ik vrijwilliger bij CoderDojo waar ik kinderen help leren programmeren. " +
      "Ik ben sociaal-geëngageerd, kritisch, detailgericht en leergierig.",
    interests: ["Data engineering", "Data analyse", "Artificiële Intelligentie"],
    learnedAboutSelf: [
      "Ik presteer het best wanneer structuur en creativiteit samenkomen.",
      "Ik groei in teams waar feedback open en concreet is.",
      "Ik haal motivatie uit betekenisvolle impact, niet alleen uit snelheid.",
    ],
    traits: ["Analytisch", "Betrouwbaar", "Detailgericht", "Teamwork", "Nieuwsgierig", "Zelfstandig", "Behulpzaam"],
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
    </BookPage>
  );

  const right = (
    <BookPage
      chapter={chapter}
      title={t.title_right}
      pageNumber={context.rightPageNumber}
      accent={accent}
    >

      <StorySection heading={t.interestsHeading} accent={accent}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {t.interests.map((interest) => (
            <StoryTag key={interest} label={interest} accent={accent} />
          ))}
        </div>
      </StorySection>

      <StorySection heading={t.learnHeading} accent={accent}>
        <StoryList items={t.learnedAboutSelf} accent={accent} bullet="✦" />
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
