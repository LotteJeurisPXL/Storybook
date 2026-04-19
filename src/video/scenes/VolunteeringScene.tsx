/**
 * scenes/VolunteeringScene.tsx
 *
 * Chapter IV · Volunteering
 * Left  → first volunteering event
 * Right → second volunteering event
 */

import { BookPage, formatChapterLabel } from "../BookPage";
import type { SceneContext, ScenePages } from "../StoryBook";
import { EventFeature, type EventFeatureData } from "../components/EventFeature";
import EventImage from "../../assets/logo.png";

type Lang = "en" | "nl";

interface VolunteeringCopy {
  chapterTitle: string;
  firstLabel: string;
  secondLabel: string;
  firstEvent: EventFeatureData;
  secondEvent: EventFeatureData;
}

const copy: Record<Lang, VolunteeringCopy> = {
  en: {
    chapterTitle: "Volunteering",
    heading1: "Description",
    heading2: "Experience",
    firstEvent: {
      title: "Community Tech Day",
      role: "Hands-on digital support for local organisations",
      description:
        "A volunteer event focused on helping non-profits with small digital tasks, content updates, and practical advice on improving their online presence.",
      experience:
        "It showed me how valuable patient communication is when people need quick support, and how small improvements can make a large difference for local teams.",
      image: EventImage,
      imageAlt: "Community Tech Day event image",
    },
    secondEvent: {
      title: "Open Workshop Evening",
      role: "Supporting students through guided project sessions",
      description:
        "An evening event where volunteers helped students work through project questions, feedback rounds, and technical blockers in a relaxed workshop setting.",
      experience:
        "The experience strengthened my confidence in guiding others and reminded me that clear structure and calm encouragement help people move forward faster.",
      image: EventImage,
      imageAlt: "Open Workshop Evening event image",
    },
  },
  nl: {
    chapterTitle: "Vrijwilligerswerk",
    heading1: "Samenvatting",
    heading2: "Ervaring",
    firstEvent: {
      title: "Community Tech Day",
      role: "Digitale ondersteuning voor lokale organisaties",
      description:
        "Een vrijwilligersmoment waarbij we non-profits hielpen met kleine digitale taken, content-updates en praktisch advies om hun online aanwezigheid te verbeteren.",
      experience:
        "Ik merkte hoe waardevol geduldige communicatie is wanneer mensen snelle hulp nodig hebben, en hoe kleine verbeteringen een groot verschil kunnen maken voor lokale teams.",
      image: EventImage,
      imageAlt: "Afbeelding van Community Tech Day",
    },
    secondEvent: {
      title: "Open Workshop Avond",
      role: "Studenten ondersteunen tijdens begeleide projectsessies",
      description:
        "Een avondevent waar vrijwilligers studenten hielpen met projectvragen, feedbackrondes en technische blockers in een ontspannen workshopsetting.",
      experience:
        "Die ervaring gaf me meer vertrouwen in het begeleiden van anderen en herinnerde me eraan dat duidelijke structuur en rustige aanmoediging mensen sneller vooruit helpen.",
      image: EventImage,
      imageAlt: "Afbeelding van Open Workshop Avond",
    },
  },
};

export function volunteering(lang: Lang, accent: string, context: SceneContext): ScenePages {
  const t = copy[lang];
  const chapter = formatChapterLabel(lang, context.chapterNumber, t.chapterTitle);

  const left = (
    <BookPage
      chapter={chapter}
      title={t.firstEvent.title}
      subtitle={t.firstEvent.role}
      icon="✿"
      pageNumber={context.leftPageNumber}
      accent={accent}
    >
        <EventFeature heading1={t.heading1} heading2={t.heading2} event={t.firstEvent} accent={accent} />
    </BookPage>
  );

  const right = (
    <BookPage
      chapter={chapter}
      title={t.secondEvent.title}
      subtitle={t.secondEvent.role}
      pageNumber={context.rightPageNumber}
      accent={accent}
    >
        <EventFeature heading1={t.heading1} heading2={t.heading2} event={t.secondEvent} accent={accent} />
    </BookPage>
  );

  return { left, right };
}