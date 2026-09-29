"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero-section">

      {/* Background Image */}
      <div className="hero-background"></div>

      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">

        <p className="hero-small-text">
          WELCOME TO STAYSPHERE
        </p>

        <h1>
          Stay. Relax.
          <span>Experience.</span>
        </h1>

        <p className="hero-description">
          Discover a beautiful stay where comfort,
          elegance and unforgettable experiences
          come together.
        </p>

        <div className="hero-buttons">

          <Link
            href="/rooms"
            className="hero-primary-button"
          >
            Explore Rooms
            <span>→</span>
          </Link>

          <Link
            href="/rooms"
            className="hero-secondary-button"
          >
            Book Your Stay
          </Link>

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="hero-scroll">

        <span className="scroll-line"></span>

        <span className="scroll-text">
          SCROLL TO EXPLORE
        </span>

      </div>

    </section>
  );
}