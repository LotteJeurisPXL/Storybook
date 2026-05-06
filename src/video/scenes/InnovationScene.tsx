/**
 * scenes/InnovationScene.tsx
 *
 * Chapter IV · Innovation
 * Left  → first innovation event
 * Right → second innovation event
 */

import { BookPage, formatChapterLabel } from "../BookPage";
import type { SceneContext, ScenePages } from "../StoryBook";
import { EventFeature, type EventFeatureData } from "../components/EventFeature";
import HackTheFutureImage from "../../assets/Hackaton.jpg";
import DDDImage from "../../assets/DomainDrivenDesign.jpg";

type Lang = "en" | "nl";

interface InnovationCopy {
  chapterTitle: string;
  heading1: string;
  firstEvent: EventFeatureData;
  secondEvent: EventFeatureData;
}

const copy: Record<Lang, InnovationCopy> = {
  en: {
    chapterTitle: "Innovation",
    heading1: "My experience",
    firstEvent: {
      title: "Hack the Future",
      role: "Cronos hackathon",
      experience:
        "I really liked the assignment we got for this hackathon. I might even try and improve that project " +
        "in my own time. Just for fun. Unfortunately, we struggled a lot with getting the technology to work. " +
        "I got a chance to improve during my internship.",
      image: HackTheFutureImage,
    },
    secondEvent: {
      title: "Domain Driven Design",
      role: "Innovation route",
      experience:
        "I'm glad I chose this innovation route. DDD is something I don't have a lot of experience with, but I understand its importance. " +
        "I struggled a lot more in the last sessions, because my knowledge & expertise in C# and Java is a lot less than those who studied AON.",
      image: DDDImage,
    },
  },
  nl: {
    chapterTitle: "Innovatie",
    heading1: "Mijn ervaring",
    firstEvent: {
      title: "Hack the Future",
      role: "Cronos hackathon",
      experience:
        "Ik vond de opdracht die we voor deze hackathon kregen echt leuk. Misschien ga ik dat project zelfs wel verder uitwerken" +
        "in mijn vrije tijd. Gewoon voor de lol. Helaas hadden we veel moeite om de technologie aan de praat te krijgen." +
        "Tijdens mijn stage heb ik de kans gekregen om mezelf dezelfde code te verbeteren.",
      image: HackTheFutureImage,
    },
    secondEvent: {
      title: "Domain Driven Design",
      role: "Innovatieroute",
      experience:
        "Ik ben blij dat ik voor deze innovatieroute heb gekozen. Ik heb nog niet veel ervaring met DDD, maar ik begrijp wel hoe belangrijk het is. " +
        "Ik had het tijdens de laatste sessies een stuk moeilijker, omdat mijn kennis en ervaring met C# en Java een stuk minder is dan die van degenen die AON hebben gevolgd.",
      image: DDDImage,
    },
  },
};

export function innovation(lang: Lang, accent: string, context: SceneContext): ScenePages {
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
        <EventFeature heading1={t.heading1} event={t.firstEvent} accent={accent} />
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
        <EventFeature heading1={t.heading1} event={t.secondEvent} accent={accent} />
    </BookPage>
  );

  return { left, right };
}