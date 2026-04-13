export type AnimationStyle = "fade" | "slide" | "bounce" | "typewriter";

export interface VideoProps {
  text: string;
  color: string;
  durationInFrames: number;
  fps: number;
  animation: AnimationStyle;
  showBackground: boolean;
}

export type Theme = "light" | "dark";