import React from "react";
import { Player } from "@remotion/player";
import { StoryBook } from "../video/StoryBook";
import { scenes, type StoryBookInputProps } from "../video/Index";

const VideoComposition: React.FC<StoryBookInputProps> = (props) => (
  <StoryBook {...props} scenes={scenes} />
);

function totalDuration(props: StoryBookInputProps) {
  return props.sceneOrder.length * props.sceneDuration + (props.sceneOrder.length - 1) * props.flipDuration;
}

interface VideoSectionProps {
  storyBookProps: StoryBookInputProps;
}

export function VideoSection({ storyBookProps }: VideoSectionProps) {
  return (
    <section className="video-section">
      <div className="controls-header">
        <h2 className="controls-title">Video</h2>
        <hr />
      </div>
      <br />
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