import { ControlItem } from "./ControlItem";

interface ToggleInputProps {
  label: string;
  value: boolean;
  hint?: string;
  onChange: (value: boolean) => void;
}

export function ToggleInput({ label, value, hint, onChange }: ToggleInputProps) {
  return (
    <ControlItem label={label} hint={hint}>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="switch-track">
          <span className="switch-thumb" />
        </span>
        <span className="switch-label-text">{value ? "On" : "Off"}</span>
      </label>
    </ControlItem>
  );
}