import { TextInput } from "./TextInput";
import { SliderInput } from "./SliderInput";
import { ColorInput } from "./ColorInput";
import { NumberInput } from "./NumberInput";
import { SelectInput } from "./SelectInput";
import { ToggleInput } from "./ToggleInput";
import type { VideoProps, AnimationStyle } from "../types";

const ANIMATION_OPTIONS = [
  { value: "fade", label: "Fade In" },
  { value: "slide", label: "Slide Up" },
  { value: "bounce", label: "Bounce" },
  { value: "typewriter", label: "Typewriter" },
];

interface InputSectionProps {
  videoProps: VideoProps;
  onUpdate: (patch: Partial<VideoProps>) => void;
}

export function InputSection({ videoProps, onUpdate }: InputSectionProps) {
  const { text, color, durationInFrames, fps, animation, showBackground } = videoProps;
  const durationSeconds = (durationInFrames / fps).toFixed(1);

  function handleReset() {
    onUpdate({
      text: "Hello, Remotion!",
      color: "#00d4ff",
      durationInFrames: 90,
      fps: 30,
      animation: "fade",
      showBackground: true,
    });
  }

  return (
    <section className="controls-section">
      <div className="controls-inner">
        <div className="controls-header">
          <h2 className="controls-title">Composition Controls</h2>
          <button className="btn-reset" onClick={handleReset}>
            ↺ Reset all
          </button>
        </div>

        {/* Group 1 — Text & Content */}
        <div className="control-group">
          <h3 className="group-label">
            <span className="group-dot" /> Text &amp; Content
          </h3>
          <div className="control-grid">
            <TextInput
              label="Display Text"
              value={text}
              onChange={(v) => onUpdate({ text: v })}
              placeholder="Enter your text…"
              hint="Shown in the video composition"
            />

            <SelectInput
              label="Animation Style"
              value={animation}
              options={ANIMATION_OPTIONS}
              hint="How the text enters the scene"
              onChange={(v) => onUpdate({ animation: v as AnimationStyle })}
            />
          </div>
        </div>

        {/* Group 2 — Colour & Style */}
        <div className="control-group">
          <h3 className="group-label">
            <span className="group-dot" /> Colour &amp; Style
          </h3>
          <div className="control-grid">
            <ColorInput
              label="Accent Colour"
              value={color}
              onChange={(v) => onUpdate({ color: v })}
              hint="Primary colour used in the composition"
            />

            <ToggleInput
              label="Show Background"
              value={showBackground}
              hint="Toggle the gradient background layer"
              onChange={(v) => onUpdate({ showBackground: v })}
            />
          </div>
        </div>

        {/* Group 3 — Timing */}
        <div className="control-group">
          <h3 className="group-label">
            <span className="group-dot" /> Timing
          </h3>
          <div className="control-grid">
            <SliderInput
              label="Duration"
              value={durationInFrames}
              min={30}
              max={300}
              step={1}
              unit=" fr"
              tickLabels={["30fr", "165fr", "300fr"]}
              onChange={(v) => onUpdate({ durationInFrames: v })}
              hint={`${durationSeconds}s at ${fps} fps`}
            />
            <NumberInput
              label="Frame Rate"
              value={fps}
              min={12}
              max={60}
              step={1}
              unit=" fps"
              hint="12–60 fps"
              onChange={(v) => onUpdate({ fps: v })}
            />
          </div>
        </div>
      </div>
    </section>
  );
}