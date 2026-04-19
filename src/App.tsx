import { useState, useEffect } from "react";
import type { Theme } from "./types";
import { Header } from "./components/Header";
import { Introduction } from "./components/Introduction";
import { VideoSection } from "./components/VideoSection";
import { InputSection } from "./components/InputSection";
import { defaultInputProps, normalizeSceneOrder, type StoryBookInputProps } from "./video/Index";

export default function App() {
  // ── Theme ──────────────────────────────────────────────
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("remotionlab-theme") as Theme) || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("remotionlab-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  // ── Video composition state ────────────────────────────
  const [storyBookProps, setStoryBookProps] = useState<StoryBookInputProps>(defaultInputProps);

  function handleUpdate(patch: Partial<StoryBookInputProps>) {
    setStoryBookProps((prev) => {
      const next = { ...prev, ...patch };

      if (patch.sceneOrder) {
        next.sceneOrder = normalizeSceneOrder(patch.sceneOrder);
      }

      return next;
    });
  }

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Introduction />
        <VideoSection storyBookProps={storyBookProps} />
        <InputSection storyBookProps={storyBookProps} onUpdate={handleUpdate} />
      </main>
      <footer className="site-footer">
        <p>
          Built with{" "}
          <a href="https://www.remotion.dev" target="_blank" rel="noopener noreferrer">
            Remotion
          </a>{" "}
          · React · TypeScript &nbsp;·&nbsp; No frames leave your browser.
        </p>
      </footer>
    </>
  );
}