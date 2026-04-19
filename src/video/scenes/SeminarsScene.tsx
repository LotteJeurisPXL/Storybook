/**
 * scenes/SeminarsScene.tsx
 *
 * Left  → first-year seminars
 * Right → second-year seminars
 */

import { BookPage, formatChapterLabel } from "../BookPage";
import type { SceneContext, ScenePages } from "../StoryBook";
import { SeminarCard, type SeminarCardData } from "../components/SeminarCard";

type Lang = "en" | "nl";

interface SeminarCopy {
  chapterTitle: string;
  title: string;
  subtitle: string;
  year1Label: string;
  year2Label: string;
  year1Seminars: SeminarCardData[];
  year2Seminars: SeminarCardData[];
}

const copy: Record<Lang, SeminarCopy> = {
  en: {
    chapterTitle: "Seminars",
    subtitle: "A year-by-year overview of the sessions that shaped my growth.",
    year1Label: "Year 1 Seminars",
    year2Label: "Year 2 Seminars",
    year1Seminars: [
      {
        title: "Data Foundations for Product Teams",
        company: "Capgemini",
        companyMark: "CG",
        description: "A practical primer on data pipelines, governance, and business alignment.",
        date: "Oct 2023",
      },
      {
        title: "Agile Collaboration in Hybrid Teams",
        company: "Delaware",
        companyMark: "DE",
        description: "How cross-functional teams keep momentum through clear roles and rituals.",
        date: "Dec 2023",
      },
      {
        title: "Designing with Accessibility First",
        company: "iO",
        companyMark: "iO",
        description: "Concrete design and development tactics for more inclusive digital products.",
        date: "Feb 2024",
      },
      {
        title: "Cloud Patterns for Modern Apps",
        company: "Cegeka",
        companyMark: "CE",
        description: "From monolith to microservices, with examples of resilient deployment setups.",
        date: "Apr 2024",
      },
    ],
    year2Seminars: [
      {
        title: "Data Engineering at Scale",
        company: "AE",
        companyMark: "AE",
        description: "ETL architecture choices and monitoring patterns for long-term maintainability.",
        date: "Sep 2024",
      },
      {
        title: "Responsible AI in Real Products",
        company: "ML6",
        companyMark: "M6",
        description: "Balancing performance, explainability, and user trust in AI-enabled systems.",
        date: "Nov 2024",
      },
      {
        title: "Security by Design Workshop",
        company: "NVISO",
        companyMark: "NV",
        description: "Threat modeling techniques and secure coding habits for daily engineering work.",
        date: "Jan 2025",
      },
      {
        title: "Leadership Through Feedback",
        company: "Cronos",
        companyMark: "CR",
        description: "Building a growth culture through constructive peer feedback and clear ownership.",
        date: "Mar 2025",
      },
    ],
  },
  nl: {
    chapterTitle: "Seminars",
    subtitle: "Een overzicht per jaar van de sessies die mijn groei mee bepaalden.",
    year1Label: "Seminars Jaar 1",
    year2Label: "Seminars Jaar 2",
    year1Seminars: [
      {
        title: "Datafundamenten voor Productteams",
        company: "Capgemini",
        companyMark: "CG",
        description: "Een praktische introductie in datapipelines, governance en businessafstemming.",
        date: "okt 2023",
      },
      {
        title: "Agile Samenwerking in Hybride Teams",
        company: "Delaware",
        companyMark: "DE",
        description: "Hoe cross-functionele teams vaart houden met duidelijke rollen en ritmes.",
        date: "dec 2023",
      },
      {
        title: "Toegankelijk Ontwerpen Vanaf De Start",
        company: "iO",
        companyMark: "iO",
        description: "Concreet ontwerp- en ontwikkeladvies voor inclusieve digitale producten.",
        date: "feb 2024",
      },
      {
        title: "Cloudpatronen voor Moderne Apps",
        company: "Cegeka",
        companyMark: "CE",
        description: "Van monoliet naar microservices met voorbeelden van veerkrachtige deploys.",
        date: "apr 2024",
      },
    ],
    year2Seminars: [
      {
        title: "Data Engineering op Schaal",
        company: "AE",
        companyMark: "AE",
        description: "ETL-architectuurkeuzes en monitoringpatronen voor langdurig onderhoud.",
        date: "sep 2024",
      },
      {
        title: "Verantwoorde AI in Echte Producten",
        company: "ML6",
        companyMark: "M6",
        description: "Balans tussen performantie, uitlegbaarheid en gebruikersvertrouwen.",
        date: "nov 2024",
      },
      {
        title: "Security by Design Workshop",
        company: "NVISO",
        companyMark: "NV",
        description: "Threat modeling en veilige coding-gewoontes voor dagelijks werk.",
        date: "jan 2025",
      },
      {
        title: "Leiderschap via Feedback",
        company: "Cronos",
        companyMark: "CR",
        description: "Een groeicultuur bouwen met constructieve feedback en duidelijke ownership.",
        date: "mrt 2025",
      },
    ],
  },
};

export function seminars(lang: "en" | "nl", accent: string, context: SceneContext): ScenePages {
  const t = copy[lang];
  const chapter = formatChapterLabel(lang, context.chapterNumber, t.chapterTitle);

  const left = (
    <BookPage
      chapter={chapter}
      title={t.year1Label}
      subtitle={t.subtitle}
      icon="🎓"
      pageNumber={context.leftPageNumber}
      accent={accent}
    >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 10,
            alignItems: "stretch",
          }}
        >
          {t.year1Seminars.map((seminar) => (
            <SeminarCard
              key={`${seminar.title}-${seminar.date}`}
              seminar={seminar}
              accent={accent}
            />
          ))}
        </div>
    </BookPage>
  );

  const right = (
    <BookPage
      chapter={chapter}
      title={t.year2Label}
      subtitle={t.subtitle}
      pageNumber={context.rightPageNumber}
      accent={accent}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 10,
          alignItems: "stretch",
        }}
      >
        {t.year2Seminars.map((seminar) => (
          <SeminarCard
            key={`${seminar.title}-${seminar.date}`}
            seminar={seminar}
            accent={accent}
          />
        ))}
      </div>
    </BookPage>
  );

  return { left, right };
}