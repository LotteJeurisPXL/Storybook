import type { ReactNode } from "react";

interface ControlItemProps {
  label: string;
  valueDisplay?: string;
  hint?: string;
  children: ReactNode;
}

/** Generic shell for every control: label row + value badge + slotted input + optional hint */
export function ControlItem({ label, valueDisplay, hint, children }: ControlItemProps) {
  return (
    <div className="control-item">
      <div className="control-header">
        <span className="control-label">{label}</span>
        {valueDisplay !== undefined && (
          <span className="control-value">{valueDisplay}</span>
        )}
      </div>
      {children}
      {hint && <p className="control-hint">{hint}</p>}
    </div>
  );
}