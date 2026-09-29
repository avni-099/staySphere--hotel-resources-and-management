"use client";

import Link from "next/link";

const facilities = [
  {
    number: "01",
    title: "Swimming Pool",
    category: "RELAX & REFRESH",
    description:
      "Take a refreshing break in our beautifully maintained swimming pool, designed for peaceful mornings and relaxing evenings.",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
    features: ["Temperature Controlled", "Poolside Seating", "Towels Available"],
  },
  {
    number: "02",
    title: "Restaurant & Dining",
    category: "TASTE & DINE",
    description:
      "Enjoy delicious meals and carefully prepared favourites in a comfortable dining environment created for memorable moments.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85",
    features: ["Breakfast", "À La Carte", "Room Dining"],
  },
  {
    number: "03",
    title: "Spa & Wellness",
    category: "RELAX & RECHARGE",
    description:
      "Slow down and take care of yourself with relaxing wellness experiences designed to leave you feeling refreshed.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85",
    features: ["Massage", "Wellness Treatments", "Relaxation Area"],
  },
  {
    number: "04",
    title: "Fitness Center",
    category: "MOVE & ENERGIZE",
    description:
      "Keep your routine going with modern fitness equipment and a comfortable environment for your daily workout.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85",
    features: ["Modern Equipment", "Open Daily", "Personal Space"],
  },
  {
    number: "05",
    title: "24/7 Room Service",
    category: "AT YOUR SERVICE",
    description:
      "Whether you need a late-night meal or something delivered to your room, our team is available whenever you need us.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
    features: ["24/7 Availability", "In-Room Dining", "Quick Service"],
  },
  {
    number: "06",
    title: "Parking",
    category: "EASY ARRIVAL",
    description:
      "Convenient parking facilities make arriving and leaving simple, comfortable and stress-free.",
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1400&q=85",
    features: ["On-Site Parking", "Easy Access", "Guest Parking"],
  },
];

const additionalFacilities = [
  {
    icon: "◉",
    title: "Free Wi-Fi",
    text: "Stay connected throughout the hotel with complimentary high-speed Wi-Fi.",
  },
  {
    icon: "✦",
    title: "Daily Housekeeping",
    text: "Our housekeeping team keeps your room fresh, clean and comfortable.",
  },
  {
    icon: "◈",
    title: "24/7 Reception",
    text: "Our front desk team is available around the clock for assistance.",
  },
  {
    icon: "◇",
    title: "Airport Assistance",
    text: "Travel support and transfer assistance can be arranged for guests.",
  },
  {
    icon: "⌂",
    title: "Business Support",
    text: "Convenient facilities for guests travelling for work or business.",
  },
  {
    icon: "♡",
    title: "Guest Support",
    text: "Our team is always ready to help make your stay more comfortable.",
  },
];

export default function FacilitiesPage() {
  return (
    <main className="facilities-page">
      {/* NAVBAR */}
      <header className="facilities-navbar">
        <div className="facilities-navbar-inner">
          <Link href="/" className="facilities-brand">
            Stay<span>Sphere</span>
          </Link>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/rooms">Rooms</Link>
            <Link href="/facilities" className="active">
              Facilities
            </Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <Link href="/booking" className="facilities-nav-button">
            Book Your Stay
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="facilities-hero">
        <div className="facilities-hero-overlay" />

        <div className="facilities-hero-content">
          <span>STAYSPHERE FACILITIES</span>

          <h1>
            Everything You Need.
            <em>And More.</em>
          </h1>

          <p>
            Thoughtfully designed spaces, modern amenities and
            attentive services created to make every moment of
            your stay comfortable.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="facilities-intro">
        <div className="facilities-intro-container">
          <div>
            <span className="facilities-eyebrow">
              DESIGNED AROUND YOU
            </span>

            <h2>
              Comfort In
              <em>Every Detail.</em>
            </h2>
          </div>

          <div className="facilities-intro-text">
            <p>
              At StaySphere, our facilities are designed to give
              you more than convenience. They are spaces where you
              can relax, recharge, connect and enjoy your time away
              from home.
            </p>

            <p>
              From a refreshing swim to a peaceful meal, everything
              is created with your experience in mind.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED FACILITIES */}
      <section className="facilities-main">
        <div className="facilities-main-heading">
          <span>EXPLORE OUR FACILITIES</span>

          <h2>
            Made For
            <em>Every Moment.</em>
          </h2>
        </div>

        <div className="facilities-list">
          {facilities.map((facility, index) => (
            <article
              className={`facility-feature ${
                index % 2 !== 0 ? "reverse" : ""
              }`}
              key={facility.number}
            >
              <div className="facility-feature-image">
                <img
                  src={facility.image}
                  alt={facility.title}
                />

                <span className="facility-number">
                  {facility.number}
                </span>
              </div>

              <div className="facility-feature-content">
                <span className="facility-category">
                  {facility.category}
                </span>

                <h3>{facility.title}</h3>

                <p>{facility.description}</p>

                <div className="facility-feature-points">
                  {facility.features.map((feature) => (
                    <span key={feature}>
                      <b>✓</b>
                      {feature}
                    </span>
                  ))}
                </div>

                <Link
                  href="/booking"
                  className="facility-feature-link"
                >
                  Experience It
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* QUICK FACILITIES */}
      <section className="additional-facilities">
        <div className="additional-facilities-heading">
          <span>MORE FOR YOUR STAY</span>

          <h2>
            Little Things.
            <em>Big Difference.</em>
          </h2>

          <p>
            Because a comfortable stay is made up of hundreds of
            thoughtful details.
          </p>
        </div>

        <div className="additional-facilities-grid">
          {additionalFacilities.map((facility) => (
            <div
              className="additional-facility-card"
              key={facility.title}
            >
              <div className="additional-facility-icon">
                {facility.icon}
              </div>

              <h3>{facility.title}</h3>

              <p>{facility.text}</p>

              <span className="additional-facility-arrow">
                →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICE BANNER */}
      <section className="facilities-service-banner">
        <div className="facilities-service-overlay" />

        <div className="facilities-service-content">
          <span>YOUR COMFORT COMES FIRST</span>

          <h2>
            Stay Relaxed.
            <em>We'll Handle The Rest.</em>
          </h2>

          <p>
            From the moment you arrive until the moment you leave,
            our team is here to make your StaySphere experience
            effortless.
          </p>

          <Link href="/contact" className="facilities-service-button">
            Talk To Our Team
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="facilities-cta">
        <div className="facilities-cta-content">
          <span>READY TO EXPERIENCE STAYSPHERE?</span>

          <h2>
            Your Perfect Stay
            <em>Starts Here.</em>
          </h2>

          <p>
            Explore our rooms and discover the comfort waiting for you.
          </p>

          <div className="facilities-cta-buttons">
            <Link
              href="/rooms"
              className="facilities-cta-primary"
            >
              Explore Rooms
              <span>→</span>
            </Link>

            <Link
              href="/booking"
              className="facilities-cta-secondary"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="facilities-footer">
        <div>
          <Link href="/" className="facilities-footer-brand">
            Stay<span>Sphere</span>
          </Link>

          <p>
            Comfort. Elegance. Hospitality.
          </p>
        </div>

        <div className="facilities-footer-links">
          <Link href="/">Home</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/about">About</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <p className="facilities-footer-copy">
          © 2026 StaySphere. All rights reserved.
        </p>
      </footer>
    </main>
  );
}