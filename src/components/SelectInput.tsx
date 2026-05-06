import { ControlItem } from "./ControlItem";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  options: SelectOption[];
  hint?: string;
  onChange: (value: string) => void;
}

export function SelectInput({ label, value, options, hint, onChange }: SelectInputProps) {
  const display = options.find((o) => o.value === value)?.label ?? value;

  return (
    <ControlItem label={label} valueDisplay={display} hint={hint}>
      <select
        className="select-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </ControlItem>
  );
}