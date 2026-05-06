import type { Theme } from "../types";

interface DarkModeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function DarkModeToggle({ theme, onToggle }: DarkModeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="toggle-track">
        <span className="toggle-icon sun">☀︎</span>
        <span className="toggle-icon moon">☽</span>
        <span className="toggle-thumb" />
      </span>
    </button>
  );
}