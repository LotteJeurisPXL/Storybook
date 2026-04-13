import { ControlItem } from "./ControlItem";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  tickLabels?: [string, string, string];
  onChange: (value: number) => void;
  hint?: string;
  hueGradient?: boolean;
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  tickLabels,
  onChange,
  hint,
  hueGradient = false,
}: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;

  const trackStyle = hueGradient
    ? {
        background:
          "linear-gradient(to right, hsl(0,80%,55%), hsl(60,80%,55%), hsl(120,80%,55%), hsl(180,80%,55%), hsl(240,80%,55%), hsl(300,80%,55%), hsl(360,80%,55%))",
      }
    : {
        background: `linear-gradient(to right, var(--accent) ${pct}%, var(--bg-overlay) ${pct}%)`,
      };

  return (
    <ControlItem label={label} valueDisplay={`${value}${unit}`} hint={hint}>
      <div className={`slider-wrap${hueGradient ? " slider-wrap--hue" : ""}`}>
        <input
          type="range"
          className="control-slider"
          min={min}
          max={max}
          step={step}
          value={value}
          style={trackStyle}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
      {tickLabels && (
        <div className="slider-ticks">
          <span>{tickLabels[0]}</span>
          <span>{tickLabels[1]}</span>
          <span>{tickLabels[2]}</span>
        </div>
      )}
    </ControlItem>
  );
}