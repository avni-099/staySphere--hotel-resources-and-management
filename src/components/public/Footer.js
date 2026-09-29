import Link from "next/link";

export default function Footer() {
  return (
    <footer className="stay-footer">
      <div className="stay-footer-main">

        <div className="stay-footer-brand">
          <Link href="/" className="stay-footer-logo">
            Stay<span>Sphere</span>
          </Link>

          <p>
            A beautiful place to stay, relax and create
            unforgettable experiences.
          </p>

          <div className="stay-footer-socials">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Twitter">X</a>
          </div>
        </div>

        <div className="stay-footer-column">
          <h3>Explore</h3>

          <Link href="/">Home</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/facilities">Facilities</Link>
          <Link href="/gallery">Gallery</Link>
        </div>

        <div className="stay-footer-column">
          <h3>StaySphere</h3>

          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
          <Link href="/rooms">Book Your Stay</Link>
        </div>

        <div className="stay-footer-column stay-footer-contact">
          <h3>Contact</h3>

          <p>
            Jaipur, Rajasthan,
            <br />
            India
          </p>

          <a href="tel:+919876543210">
            +91 98765 43210
          </a>

          <a href="mailto:hello@staysphere.com">
            hello@staysphere.com
          </a>

          <span>Guest Support — 24/7</span>
        </div>

      </div>

      <div className="stay-footer-bottom">
        <p>
          © 2026 StaySphere. All rights reserved.
        </p>

        <div>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}