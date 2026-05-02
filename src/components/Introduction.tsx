export function Introduction() {
  return (
    <section className="intro-section">
      <h1 className="intro-title">
        Compose video,<br />
        <em>in real time.</em>
      </h1>
      <div className="controls-header">
        <h2 className="controls-title">Introduction</h2>
      </div>
      <br />

      <div className="intro-cards">
        <div className="intro-card">
          <div className="card-glyph">◎</div>
          <h3>Welcome</h3>
          <p>
            Welcome to SchoolStories. A showcase of my experiences during my <strong>PXL career</strong>, 
            while studying <strong>Applied Computer Science</strong>. 
            This website was built as part of my creative assignment for I-talent.
          </p>
        </div>
        <div className="intro-card">
          <div className="card-glyph">◈</div>
          <h3>Change the controls</h3>
          <p>
            Underneath this section, is the <strong>controls section</strong>. Here you can change the order of the scenes, 
            the duration of each scene, the colours used in the video and the language. 
          </p>
        </div>
        <div className="intro-card">
          <div className="card-glyph">◇</div>
          <h3>View the video</h3>
          <p>
            The last section of this website is the video section. Here you can preview the video be
            updated in <strong>real time</strong> as you change the controls. 
          </p>
        </div>
      </div>
    </section>
  );
}