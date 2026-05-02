import { SliderInput } from "./SliderInput";
import { ColorInput } from "./ColorInput";
import { SelectInput } from "./SelectInput";
import { defaultInputProps, normalizeSceneOrder, sceneDefinitions, type SceneKey, type StoryBookInputProps } from "../video/Index";

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "nl", label: "Nederlands" },
];

const FIXED_SCENE_KEYS: ReadonlySet<SceneKey> = new Set(
  sceneDefinitions.filter((scene) => scene.fixed).map((scene) => scene.key as SceneKey),
);

interface InputSectionProps {
  storyBookProps: StoryBookInputProps;
  onUpdate: (patch: Partial<StoryBookInputProps>) => void;
}

function moveScene(order: SceneKey[], index: number, direction: -1 | 1) {
  if (index === 0) {
    return order;
  }

  if (FIXED_SCENE_KEYS.has(order[index])) {
    return order;
  }

  const nextIndex = index + direction;

  if (nextIndex <= 0 || nextIndex >= order.length) {
    return order;
  }

  const nextOrder = [...order];
  [nextOrder[index], nextOrder[nextIndex]] = [nextOrder[nextIndex], nextOrder[index]];
  return normalizeSceneOrder(nextOrder);
}

export function InputSection({ storyBookProps, onUpdate }: InputSectionProps) {
  const { sceneOrder, sceneDuration, bookColour, accentColour, language } = storyBookProps;
  const durationSeconds = (sceneDuration / 30).toFixed(1);

  const sceneLabels = new Map(sceneDefinitions.map((scene) => [scene.key, scene.label]));

  function handleReset() {
    onUpdate({
      ...defaultInputProps,
    });
  }

  return (
    <section className="controls-section">
      <div className="controls-inner">
        <div className="controls-header">
          <h2 className="controls-title">Controls</h2>
          <button className="btn-reset" onClick={handleReset}>
            ↺ Reset all
          </button>
        </div>

        {/* Group 1 — Scene order */}
        <div className="control-group">
          <h3 className="group-label">
            <span className="group-dot" /> Scene Order
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sceneOrder.map((sceneKey, index) => {
              const label = sceneLabels.get(sceneKey) ?? sceneKey;
              const isFixedScene = FIXED_SCENE_KEYS.has(sceneKey);
              const canMoveUp = !isFixedScene && index > 1;
              const canMoveDown = !isFixedScene && index < sceneOrder.length - 1;

              return (
                <div
                  key={sceneKey}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: "10px 12px",
                    background: "var(--bg-base)",
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 999,
                      display: "grid",
                      placeItems: "center",
                      background: "var(--accent-light)",
                      color: "var(--accent-dark)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      className="num-btn"
                      aria-label={`Move ${sceneKey} up`}
                      disabled={!canMoveUp}
                      onClick={() => onUpdate({ sceneOrder: moveScene(sceneOrder, index, -1) })}
                      style={{ opacity: canMoveUp ? 1 : 0.35, cursor: canMoveUp ? "pointer" : "not-allowed" }}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="num-btn"
                      aria-label={`Move ${sceneKey} down`}
                      disabled={!canMoveDown}
                      onClick={() => onUpdate({ sceneOrder: moveScene(sceneOrder, index, 1) })}
                      style={{ opacity: canMoveDown ? 1 : 0.35, cursor: canMoveDown ? "pointer" : "not-allowed" }}
                    >
                      ↓
                    </button>
                  </div>
                </div>
              );
            })}
            <p className="control-hint">Reordering changes chapter and page numbers automatically.</p>
          </div>
        </div>

        {/* Group 2 — Colour & Style */}
        <div className="control-group">
          <h3 className="group-label">
            <span className="group-dot" /> Colour &amp; Style
          </h3>
          <div className="control-grid">
            <ColorInput
              label="Book Cover Colour"
              value={bookColour}
              onChange={(v) => onUpdate({ bookColour: v })}
              hint="Controls the hardcover, table glow, and progress dots"
            />

            <ColorInput
              label="Page Accent Colour"
              value={accentColour}
              onChange={(v) => onUpdate({ accentColour: v })}
              hint="Used throughout the page content and scene styling"
            />

            <SelectInput
              label="Language"
              value={language}
              options={LANGUAGE_OPTIONS}
              hint="Switch the scene copy between English and Dutch"
              onChange={(v) => onUpdate({ language: v as StoryBookInputProps["language"] })}
            />

            <SliderInput
              label="Scene Length"
              value={sceneDuration}
              min={60}
              max={300}
              step={1}
              unit=" fr"
              tickLabels={["60fr", "180fr", "300fr"]}
              onChange={(v) => onUpdate({ sceneDuration: v })}
              hint={`${durationSeconds}s visible per scene at 30 fps`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}