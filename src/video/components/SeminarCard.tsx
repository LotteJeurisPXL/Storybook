import React from "react";
import { T } from "../BookPage";

export interface SeminarCardData {
  title: string;
  company: string;
  companyMark: string;
  description: string;
  date: string;
}

interface SeminarCardProps {
  seminar: SeminarCardData;
  accent: string;
}

export const SeminarCard: React.FC<SeminarCardProps> = ({ seminar, accent }) => {
  return (
    <article
      style={{
        border: `1px solid ${accent}2f`,
        background: `linear-gradient(135deg, ${accent}0f 0%, #fffdfa 62%)`,
        borderRadius: 12,
        padding: "12px 13px",
        boxShadow: `0 3px 12px ${accent}12`,
        height: "100%",
        fontSize: "1.1rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <h3
          style={{
            margin: 0,
            color: T.ink,
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "1.2rem",
            lineHeight: 1.22,
          }}
        >
          {seminar.title}
        </h3>

        <span
          style={{
            color: accent,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
            border: `1px solid ${accent}40`,
            borderRadius: 999,
            padding: "2px 8px",
            background: `${accent}12`,
          }}
        >
          {seminar.date}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
        
          <img src={seminar.companyMark} alt={seminar.company} width="50" height="50" />
       

        <p
          style={{
            margin: 0,
            color: accent,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {seminar.company}
        </p>
      </div>

      <p
        style={{
          margin: "9px 0 0",
          color: T.inkMid,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          lineHeight: 1.5,
        }}
      >
        {seminar.description}
      </p>
    </article>
  );
};
