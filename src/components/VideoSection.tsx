import React from "react";
import { Player } from "@remotion/player";
import { StoryBook } from "../video/StoryBook";
import { defaultInputProps, scenes } from "../video/Index";
import type { VideoProps } from "../types";

type StoryBookInputProps = typeof defaultInputProps;

const VideoComposition: React.FC<StoryBookInputProps> = (props) => (
  <StoryBook {...props} scenes={scenes} />
);

function totalDuration(props: StoryBookInputProps) {
  return props.sceneOrder.length * props.sceneDuration + (props.sceneOrder.length - 1) * props.flipDuration;
}

interface VideoSectionProps {
  videoProps: VideoProps;
}

export function VideoSection({ videoProps }: VideoSectionProps) {
  const storyBookProps: StoryBookInputProps = {
    ...defaultInputProps,
    // Reuse existing UI colour control as the book accent in StoryBook.
    bookColour: videoProps.color,
  };

  return (
    <section className="video-section">
      <div className="video-inner">
        <div className="video-frame">
          <div className="frame-corner tl" />
          <div className="frame-corner tr" />
          <div className="frame-corner bl" />
          <div className="frame-corner br" />

          <Player
            component={VideoComposition as any}
            inputProps={storyBookProps}
            durationInFrames={totalDuration(storyBookProps)}
            compositionWidth={1920}
            compositionHeight={1080}
            fps={30}
            style={{ width: "100%", aspectRatio: "16/9", borderRadius: "inherit" }}
            controls
            loop
          />
        </div>
      </div>
    </section>
  );
}