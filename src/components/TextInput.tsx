import { ControlItem } from "./ControlItem";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
}

export function TextInput({ label, value, onChange, placeholder, hint }: TextInputProps) {
  return (
    <ControlItem label={label} hint={hint}>
      <input
        type="text"
        className="text-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </ControlItem>
  );
}