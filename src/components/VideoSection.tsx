import React from "react";
import { Player } from "@remotion/player";
import { MyVideo } from "../video/MyVideo";
import type { VideoProps } from "../types";

const VideoComposition: React.FC<VideoProps> = (props) => <MyVideo {...props} />;

interface VideoSectionProps {
  videoProps: VideoProps;
}

export function VideoSection({ videoProps }: VideoSectionProps) {
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
            inputProps={videoProps}
            durationInFrames={videoProps.durationInFrames}
            compositionWidth={1280}
            compositionHeight={720}
            fps={videoProps.fps}
            style={{ width: "100%", aspectRatio: "16/9", borderRadius: "inherit" }}
            controls
            loop
          />
        </div>
      </div>
    </section>
  );
}