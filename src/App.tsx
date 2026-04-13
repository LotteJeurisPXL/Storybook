import { useState, useEffect } from "react";
import type { VideoProps, Theme } from "./types";
import { Header } from "./components/Header";
import { Introduction } from "./components/Introduction";
import { VideoSection } from "./components/VideoSection";
import { InputSection } from "./components/InputSection";

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
  const [videoProps, setVideoProps] = useState<VideoProps>({
    text: "Hello, Remotion!",
    color: "#00d4ff",
    durationInFrames: 90,
    fps: 30,
    animation: "fade",
    showBackground: true,
  });

  function handleUpdate(patch: Partial<VideoProps>) {
    setVideoProps((prev) => ({ ...prev, ...patch }));
  }

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Introduction />
        <VideoSection videoProps={videoProps} />
        <InputSection videoProps={videoProps} onUpdate={handleUpdate} />
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