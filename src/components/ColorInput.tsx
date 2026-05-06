import { useState } from "react";
import { ControlItem } from "./ControlItem";

const SWATCHES = [
  { color: "#00d4ff", label: "Cyan" },
  { color: "#00c080", label: "Mint" },
  { color: "#7c3aed", label: "Violet" },
  { color: "#ef4444", label: "Red" },
  { color: "#f59e0b", label: "Amber" },
  { color: "#ec4899", label: "Pink" },
];

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}

export function ColorInput({ label, value, onChange, hint }: ColorInputProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  function handleSwatch(color: string, idx: number) {
    onChange(color);
    setActiveIdx(idx);
  }

  function handlePicker(color: string) {
    onChange(color);
    setActiveIdx(null);
  }

  return (
    <ControlItem label={label} valueDisplay={value} hint={hint}>
      <div className="color-picker-wrap">
        <input
          type="color"
          className="color-picker"
          value={value}
          onChange={(e) => handlePicker(e.target.value)}
        />
        <div className="color-swatches">
          {SWATCHES.map(({ color, label: swatchLabel }, idx) => (
            <button
              key={color}
              className={`swatch${activeIdx === idx ? " active" : ""}`}
              style={{ background: color }}
              title={swatchLabel}
              onClick={() => handleSwatch(color, idx)}
            />
          ))}
        </div>
      </div>
    </ControlItem>
  );
}