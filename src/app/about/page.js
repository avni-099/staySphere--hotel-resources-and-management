"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* NAVBAR */}
      <header className="about-navbar">
        <div className="about-navbar-inner">
          <Link href="/" className="about-brand">
            Stay<span>Sphere</span>
          </Link>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/rooms">Rooms</Link>
            <Link href="/facilities">Facilities</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/about" className="active">
              About
            </Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <Link href="/booking" className="about-nav-button">
            Book Your Stay
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-overlay" />

        <div className="about-hero-content">
          <span>WELCOME TO STAYSPHERE</span>

          <h1>
            More Than a Stay.
            <em>A Feeling.</em>
          </h1>

          <p>
            A thoughtfully designed hotel experience where comfort,
            elegance and genuine hospitality come together.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="about-intro">
        <div className="about-intro-container">
          <div className="about-intro-image">
            <img
              src="/images/about-hotel.jpg"
              alt="StaySphere Hotel"
            />

            <div className="about-image-badge">
              <strong>10+</strong>
              <span>Years of<br />Hospitality</span>
            </div>
          </div>

          <div className="about-intro-content">
            <span className="about-eyebrow">
              OUR STORY
            </span>

            <h2>
              Hospitality
              <em>With Heart.</em>
            </h2>

            <p>
              StaySphere was created with a simple idea — a hotel
              should feel more than just a place to sleep.
            </p>

            <p>
              From the moment you arrive, every detail is designed
              to make your stay comfortable, peaceful and memorable.
              From thoughtfully designed rooms to attentive service,
              we believe that true hospitality is found in the small
              things.
            </p>

            <p>
              Whether you are travelling for business, planning a
              family getaway or simply looking for a peaceful escape,
              StaySphere gives you a place to slow down, relax and
              feel at home.
            </p>

            <Link href="/rooms" className="about-primary-button">
              Explore Our Rooms
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="about-philosophy">
        <div className="about-philosophy-container">
          <div className="about-philosophy-heading">
            <span>OUR PHILOSOPHY</span>

            <h2>
              Simple Things.
              <br />
              <em>Beautifully Done.</em>
            </h2>
          </div>

          <div className="about-philosophy-text">
            <p>
              We believe luxury is not always about extravagance.
              Sometimes it is a perfectly prepared room, a warm
              welcome, a quiet morning and someone who remembers
              exactly how you like your coffee.
            </p>

            <p>
              Every part of the StaySphere experience is created
              around comfort, convenience and thoughtful hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="about-stats-container">
          <div className="about-stat">
            <strong>10+</strong>
            <span>Years of Experience</span>
          </div>

          <div className="about-stat">
            <strong>15+</strong>
            <span>Beautiful Rooms</span>
          </div>

          <div className="about-stat">
            <strong>25K+</strong>
            <span>Happy Guests</span>
          </div>

          <div className="about-stat">
            <strong>4.9</strong>
            <span>Average Guest Rating</span>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="about-values-heading">
          <span>WHAT MATTERS TO US</span>

          <h2>
            The StaySphere
            <em>Difference.</em>
          </h2>

          <p>
            Thoughtful hospitality is at the heart of everything we do.
          </p>
        </div>

        <div className="about-values-grid">
          <div className="about-value-card">
            <div className="about-value-number">01</div>

            <div className="about-value-icon">✦</div>

            <h3>Genuine Hospitality</h3>

            <p>
              Warm welcomes, attentive service and a team that truly
              cares about your experience.
            </p>
          </div>

          <div className="about-value-card">
            <div className="about-value-number">02</div>

            <div className="about-value-icon">◇</div>

            <h3>Thoughtful Comfort</h3>

            <p>
              From premium bedding to carefully selected amenities,
              every detail is designed around your comfort.
            </p>
          </div>

          <div className="about-value-card">
            <div className="about-value-number">03</div>

            <div className="about-value-icon">⌂</div>

            <h3>A Sense of Home</h3>

            <p>
              Elegant spaces with a welcoming atmosphere where you
              can relax, recharge and feel at ease.
            </p>
          </div>

          <div className="about-value-card">
            <div className="about-value-number">04</div>

            <div className="about-value-icon">∞</div>

            <h3>Memorable Moments</h3>

            <p>
              We aim to create experiences that stay with you long
              after you leave.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="about-experience">
        <div className="about-experience-container">
          <div className="about-experience-content">
            <span>THE STAYSPHERE EXPERIENCE</span>

            <h2>
              Your Comfort.
              <br />
              <em>Our Priority.</em>
            </h2>

            <p>
              Whether it is your first visit or your tenth, our goal
              remains the same — to make every StaySphere stay
              effortless and enjoyable.
            </p>

            <div className="about-experience-list">
              <div>
                <span>✓</span>
                <p>Comfortable and thoughtfully designed rooms</p>
              </div>

              <div>
                <span>✓</span>
                <p>Friendly and attentive hospitality</p>
              </div>

              <div>
                <span>✓</span>
                <p>Modern facilities and convenient services</p>
              </div>

              <div>
                <span>✓</span>
                <p>A peaceful environment for every kind of traveller</p>
              </div>
            </div>

            <Link href="/facilities" className="about-outline-button">
              Explore Facilities
              <span>→</span>
            </Link>
          </div>

          <div className="about-experience-image">
            <img
              src="/images/gallery-lobby.jpg"
              alt="StaySphere hotel lobby"
            />

            <div className="about-experience-card">
              <span>STAYSPHERE</span>
              <strong>
                Stay
                <em>Beautifully.</em>
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-content">
          <span>YOUR NEXT ESCAPE</span>

          <h2>
            Come In As A Guest.
            <br />
            <em>Leave With Memories.</em>
          </h2>

          <p>
            Discover comfortable rooms, thoughtful hospitality and
            an experience designed around you.
          </p>

          <div className="about-cta-buttons">
            <Link href="/rooms" className="about-cta-primary">
              Explore Rooms
              <span>→</span>
            </Link>

            <Link href="/booking" className="about-cta-secondary">
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="about-footer">
        <div>
          <Link href="/" className="about-footer-brand">
            Stay<span>Sphere</span>
          </Link>

          <p>
            Comfort. Elegance. Hospitality.
          </p>
        </div>

        <div className="about-footer-links">
          <Link href="/">Home</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/facilities">Facilities</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <p className="about-footer-copy">
          © 2026 StaySphere. All rights reserved.
        </p>
      </footer>
    </main>
  );
}