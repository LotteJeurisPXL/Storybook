import React from "react";
import { T, StorySection } from "../BookPage";

export interface EventFeatureData {
  title: string;
  role: string;
  description: string;
  experience: string;
  image: string;
  imageAlt: string;
}

interface EventFeatureProps {
  event: EventFeatureData;
  accent: string;
  heading1: string;
  heading2: string;
}

export const EventFeature: React.FC<EventFeatureProps> = ({ event, accent, heading1, heading2 }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <StorySection heading={heading1} accent={accent}>
        <p
          style={{
            margin: 0,
            color: T.inkMid,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            lineHeight: 1.72,
          }}
        >
          {event.description}
        </p>
      </StorySection>

      <StorySection heading={heading2} accent={accent}>
        <p
          style={{
            margin: 0,
            color: T.inkMid,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            lineHeight: 1.72,
          }}
        >
          {event.experience}
        </p>
      </StorySection>

      <div
        style={{
          width: "80%",
          height: 310,
          borderRadius: 18,
          overflow: "hidden",
          border: `1px solid ${accent}32`,
          background: `linear-gradient(135deg, ${accent}12 0%, #fffdfa 70%)`,
          boxShadow: `0 10px 24px ${accent}10`,
        }}
      >
        <img
          src={event.image}
          alt={event.imageAlt}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
  );
};
