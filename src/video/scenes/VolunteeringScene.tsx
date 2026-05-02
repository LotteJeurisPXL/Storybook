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
import SmartICTImage from "../../assets/Smart_ICT.jpeg";
import CoderDojoImage from "../../assets/WarmsteDojo.jpg";

type Lang = "en" | "nl";

interface VolunteeringCopy {
  chapterTitle: string;
  heading1: string;
  firstEvent: EventFeatureData;
  secondEvent: EventFeatureData;
}

const copy: Record<Lang, VolunteeringCopy> = {
  en: {
    chapterTitle: "Volunteering",
    heading1: "My experience",
    firstEvent: {
      title: "Smart ICT",
      role: "Scientific volunteer",
      experience:
        "I developed the backend and database infrastructure for the Buzzwatch project. An AI project that " +
        "uses citizen data to map the distribution of pollinator plants, thereby helping beekeepers " + 
        "find the ideal location for their beehives." ,
      image: SmartICTImage,
    },
    secondEvent: {
      title: "CoderDojo",
      role: "Coach at Coderdojo Genk",
      experience:
        "I help children learn to code by creating fun games together." +
        "I love seeing how children grow in their skills and confidence as they learn to code." +
        "They're also always very creative in the projects they make.",
      image: CoderDojoImage,
    },
  },
  nl: {
    chapterTitle: "Vrijwilligerswerk",
    heading1: "Mijn ervaring",
    firstEvent: {
      title: "Smart ICT",
      role: "Wetenschappelijke vrijwilliger ",
      experience:
        "Ik maakte de backend en database infrastructuur voor het Buzzwatch project. Een AI project dat " +
        "m.b.v. burgers de hoeveelheid bestuivingsplanten in kaart kan brengen om zo imkers te ondersteunen voor het " + 
        "vinden van de ideale plek voor hun bijenkasten." ,
      image: SmartICTImage,
    },
    secondEvent: {
      title: "CoderDojo",
      role: "Coach bij Coderdojo Genk",
      experience:
        "Ik help kinderen leren programmeren door samen leuke spelletjes te maken. " +
        "Ik hou ervan om te zien hoe kinderen groeien in hun vaardigheden en zelfvertrouwen terwijl ze leren coderen. " +
        "Ze zijn ook heel creatief in de projecten die ze maken.",
      image: CoderDojoImage,
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