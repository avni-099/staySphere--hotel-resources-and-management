import Link from "next/link";

export default function BookingCTA() {
  return (
    <section className="booking-cta-section">
      <div className="booking-cta-background"></div>
      <div className="booking-cta-overlay"></div>

      <div className="booking-cta-content">
        <span className="booking-cta-eyebrow">
          YOUR PERFECT STAY AWAITS
        </span>

        <h2>
          Make Your Stay
          <span>Worth Remembering.</span>
        </h2>

        <p>
          Discover beautiful rooms, thoughtful hospitality and
          memorable experiences at StaySphere.
        </p>

        <div className="booking-cta-actions">
          <Link
            href="/rooms"
            className="booking-cta-primary"
          >
            Explore Rooms
            <span>→</span>
          </Link>

          <Link
            href="/booking"
            className="booking-cta-secondary"
          >
            Book Your Stay
          </Link>
        </div>
      </div>

      <div className="booking-cta-decoration booking-cta-decoration-left">
        ✦
      </div>

      <div className="booking-cta-decoration booking-cta-decoration-right">
        ✦
      </div>
    </section>
  );
}