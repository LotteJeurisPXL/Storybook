/**
 * scenes/SeminarsScene.tsx
 *
 * Left  → first-year seminars
 * Right → second-year seminars
 */

import { BookPage, formatChapterLabel } from "../BookPage";
import type { SceneContext, ScenePages } from "../StoryBook";
import { SeminarCard, type SeminarCardData } from "../components/SeminarCard";
import TobaniaLogo from "../../assets/Tobania.png"
import InetumRealdolmenLogo from "../../assets/inetum.png"
import ToreonLogo from "../../assets/Toreon.png"
import UncannyLogo from "../../assets/Uncanny.png"
import IBMLogo from "../../assets/IBM.png"
import RefleqtLogo from "../../assets/Refleqt.jpeg"
import EasiLogo from "../../assets/Easi.png"
import SarahSwaenepoel from "../../assets/SarahSwaenepoel.jpeg"

type Lang = "en" | "nl";

interface SeminarCopy {
  chapterTitle: string;
  year2Label: string;
  year3Label: string;
  year1Seminars: SeminarCardData[];
  year2Seminars: SeminarCardData[];
}

const copy: Record<Lang, SeminarCopy> = {
  en: {
    chapterTitle: "Seminars",
    year2Label: "Year 2 Seminars",
    year3Label: "Year 3 Seminars",
    year1Seminars: [
      {
        title: "Visuele generatieve AI ",
        company: " Uncanny",
        companyMark: UncannyLogo,
        description: "I don't think I will use much of what I learned from this seminar. I wish we had more of an opportunity to try things out ourselves.",
        date: "12 Mar 2024",
      },
      {
        title: "Ethical hacking",
        company: "Toreon",
        companyMark: ToreonLogo,
        description: "I think this was a very good seminar. It was useful and we got a lot of hands-on experience. I think it would've been better if they taught us some techniques to solve at least the first few problems.",
        date: "19 Mar 2024",
      },
      {
        title: "Rapid app development",
        company: "Inetum-Realdolmen",
        companyMark: InetumRealdolmenLogo,
        description: "This was a very interesting seminar. I didn't have any experience with low-code development. They gave some great usecases for when it can be useful.",
        date: "26 Mar 2024",
      },
      {
        title: "AI Wizards",
        company: "Tobania",
        companyMark: TobaniaLogo,
        description: "To be honest this seminar wasn't very memorable for me. I liked the discussion about ethics & security.",
        date: "16 Apr 2024",
      },
    ],
    year2Seminars: [
      {
        title: "Quantum ML",
        company: "IBM",
        companyMark: IBMLogo,
        description: "One of the most interesting seminars. There weren't many that focussed on AI, but this one was just enough new information to be really engaging and exciting, while also still being understandable.",
        date: "05 Nov 2025",
      },
      {
        title: "Een bedrijf in bijberoep",
        company: "Sarah Swaenepoel",
        companyMark: SarahSwaenepoel,
        description: "I loved this seminar. It was very informative. It was nice to get some tips before we graduated, even for those who didn't want to start a business themselves.",
        date: "24 Nov 2025",
      },
      {
        title: "Postman AI",
        company: " Refleqt",
        companyMark: RefleqtLogo,
        description: "I didn't really learn a lot from this seminar. Most of us already had a lot of experience with Postman. The section about AI, we could have learned from a 10 minute video.",
        date: "26 Nov 2025",
      },
      {
        title: "Datawarehousing in Microsoft Fabric",
        company: "Easi",
        companyMark: EasiLogo,
        description: 
          "I love data engineering & was exited to learn about Microsoft Fabric, " +
          "but the seminar was more a showcase of the product than an explanation on how to use it.",
        date: "31 Dec 2025",
      },
    ],
  },
  nl: {
    chapterTitle: "Seminars",
    year2Label: "Seminars Jaar 2",
    year3Label: "Seminars Jaar 3",
    year1Seminars: [
      {
        title: "Visuele generatieve AI ",
        company: " Uncanny",
        companyMark: UncannyLogo,
        description: "Ik denk niet dat ik veel van wat ik tijdens dit seminarie heb geleerd, zal gebruiken. Ik had graag gezien dat we meer de kans hadden gekregen om dingen zelf uit te proberen.",
        date: "12 Mar 2024",
      },
      {
        title: "Ethical hacking",
        company: "Toreon",
        companyMark: ToreonLogo,
        description: "Ik denk dat dit een zeer goede seminarie was. Het was nuttig en we kregen veel hands-on ervaring. Ik dacht dat het beter zou zijn geweest als ze ons enkele technieken hadden geleerd om de eerste paar problemen op te lossen.",
        date: "19 Mar 2024",
      },
      {
        title: "Rapid app development",
        company: "Inetum-Realdolmen",
        companyMark: InetumRealdolmenLogo,
        description: "Dit was een heel interessant seminarie. Ik had nog geen ervaring met low-code-ontwikkeling. Ze gaven een aantal mooie voorbeelden van situaties waarin het nuttig kan zijn.",
        date: "26 Mar 2024",
      },
      {
        title: "AI Wizards",
        company: "Tobania",
        companyMark: TobaniaLogo,
        description: "Eerlijk gezegd vond ik dit seminarie niet echt memorabel. Ik vond de discussie over ethiek en veiligheid wel interessant.",
        date: "16 Apr 2024",
      },
    ],
    year2Seminars: [
      {
        title: "Quantum ML",
        company: "IBM",
        companyMark: IBMLogo,
        description: "Een van de interessantste seminaries. Er waren weinig AI specifieke seminaries, maar dit seminarie bood precies genoeg nieuwe informatie om echt interessant te zijn, terwijl het tegelijkertijd begrijpelijk bleef.",
        date: "05 Nov 2025",
      },
      {
        title: "Een bedrijf in bijberoep",
        company: "Sarah Swaenepoel",
        companyMark: SarahSwaenepoel,
        description: "Ik vond dit seminarie geweldig. Het was heel leerzaam. Het was fijn om nog wat tips te krijgen voordat we afstudeerden, zelfs voor degenen die zelf geen bedrijf wilden beginnen.",
        date: "24 Nov 2025",
      },
      {
        title: "Postman AI",
        company: " Refleqt",
        companyMark: RefleqtLogo,
        description: "Ik heb niet echt veel opgestoken van dit seminarie. De meesten van ons hadden al veel ervaring met Postman. Het gedeelte over AI hadden we net zo goed uit een filmpje van 10 minuten kunnen leren.",
        date: "26 Nov 2025",
      },
      {
        title: "Datawarehousing Microsoft Fabric",
        company: "Easi",
        companyMark: EasiLogo,
        description: 
          "Ik ben dol op data-engineering en keek ernaar uit om meer te leren over Microsoft Fabric," +
          "maar het seminarie was meer een productpresentatie dan een uitleg over hoe je het moet gebruiken.",
        date: "31 Dec 2025",
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
      title={t.year2Label}
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
      title={t.year3Label}
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