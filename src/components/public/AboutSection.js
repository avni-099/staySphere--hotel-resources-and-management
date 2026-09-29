export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">

        {/* Image */}
        <div className="about-image-wrapper">
          <img
            src="/images/about-hotel.jpg"
            alt="StaySphere hotel interior"
            className="about-image"
          />

          <div className="about-image-frame"></div>

          <div className="about-image-label">
            STAYSPHERE
            <span>EST. 2026</span>
          </div>
        </div>

        {/* Content */}
        <div className="about-content">

          <span className="about-eyebrow">
            ABOUT STAYSPHERE
          </span>

          <h2>
            A Place To
            <span>Stay & Experience.</span>
          </h2>

          <p className="about-main-text">
            StaySphere is designed for travelers who appreciate
            comfort, thoughtful hospitality and beautiful surroundings.
            Every detail is created to make your stay feel effortless
            and memorable.
          </p>

          <p className="about-secondary-text">
            From elegantly designed rooms to relaxing spaces and
            attentive service, we bring together everything you need
            for a comfortable hotel experience.
          </p>

          {/* Stats */}
          <div className="about-stats">

            <div className="about-stat">
              <strong>15+</strong>
              <span>Beautiful Rooms</span>
            </div>

            <div className="about-stat">
              <strong>24/7</strong>
              <span>Guest Service</span>
            </div>

            <div className="about-stat">
              <strong>4.9</strong>
              <span>Guest Rating</span>
            </div>

          </div>

          <a href="/about" className="about-button">
            Discover Our Story
            <span>→</span>
          </a>

        </div>

      </div>
    </section>
  );
}