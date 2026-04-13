import { ControlItem } from "./ControlItem";

interface NumberInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  hint?: string;
  onChange: (value: number) => void;
}

export function NumberInput({
  label,
  value,
  min = 0,
  max = 9999,
  step = 1,
  unit = "",
  hint,
  onChange,
}: NumberInputProps) {
  function clamp(v: number) {
    return Math.max(min, Math.min(max, v));
  }

  return (
    <ControlItem label={label} valueDisplay={`${value}${unit}`} hint={hint}>
      <div className="number-input-wrap">
        <button
          className="num-btn"
          onClick={() => onChange(clamp(value - step))}
          aria-label="Decrease"
        >
          −
        </button>
        <input
          type="number"
          className="number-input"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(clamp(Number(e.target.value)))}
        />
        <button
          className="num-btn"
          onClick={() => onChange(clamp(value + step))}
          aria-label="Increase"
        >
          +
        </button>
      </div>
    </ControlItem>
  );
}