export function Introduction() {
  return (
    <section className="intro-section">
      <h1 className="intro-title">
        Compose video,<br />
        <em>in real time.</em>
      </h1>
      <div className="intro-cards">
        <div className="intro-card">
          <div className="card-glyph">◎</div>
          <h3>What it does</h3>
          <p>
            RemotionLab lets you build and preview programmatic video compositions
            directly in the browser using{" "}
            <strong>Remotion</strong> — no render queue, no waiting.
          </p>
        </div>
        <div className="intro-card">
          <div className="card-glyph">◈</div>
          <h3>How to use it</h3>
          <p>
            Tweak the controls below the player. Every change updates the
            composition instantly. Adjust text, colours, timing, and more
            to craft your scene.
          </p>
        </div>
        <div className="intro-card">
          <div className="card-glyph">◇</div>
          <h3>How it's built</h3>
          <p>
            Built with <strong>React</strong> +{" "}
            <strong>TypeScript</strong> and the{" "}
            <strong>Remotion Player</strong> component. Compositions are
            pure React — every frame is rendered deterministically from props.
          </p>
        </div>
      </div>
    </section>
  );
}