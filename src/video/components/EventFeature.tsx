import React from "react";
import { T, StorySection } from "../BookPage";

export interface EventFeatureData {
  title: string;
  role: string;
  experience: string;
  image: string;
}

interface EventFeatureProps {
  event: EventFeatureData;
  accent: string;
  heading1: string;
}

export const EventFeature: React.FC<EventFeatureProps> = ({ event, accent, heading1 }) => {
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
          {event.experience}
        </p>
      </StorySection>

      <div
        style={{
          width: "70%",
          height: 310,
          borderRadius: 18,
          overflow: "hidden",
          border: `1px solid ${accent}32`,
          background: `linear-gradient(135deg, ${accent}12 0%, #fffdfa 70%)`,
          boxShadow: `0 10px 24px ${accent}10`,
          alignSelf: "center",
        }}
      >
        <img
          src={event.image}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
  );
};
