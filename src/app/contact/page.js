"use client";

import Link from "next/link";
import { useState } from "react";

const contactDetails = [
  {
    icon: "⌖",
    title: "Visit Us",
    lines: ["StaySphere Hotel", "Jaipur, Rajasthan, India"],
  },
  {
    icon: "☎",
    title: "Call Us",
    lines: ["+91 98765 43210", "Available 24/7"],
  },
  {
    icon: "✉",
    title: "Email Us",
    lines: ["hello@staysphere.com", "We reply within 24 hours"],
  },
  {
    icon: "◷",
    title: "Reception",
    lines: ["Open 24 Hours", "Every day of the week"],
  },
];

const faqs = [
  {
    question: "What time is check-in and check-out?",
    answer:
      "Standard check-in starts at 2:00 PM and check-out is at 11:00 AM. Early check-in or late check-out can be requested depending on availability.",
  },
  {
    question: "Does StaySphere offer airport transfers?",
    answer:
      "Yes. Airport transfer assistance can be arranged for guests. Please contact our team before arrival to discuss your requirements.",
  },
  {
    question: "Is Wi-Fi available throughout the hotel?",
    answer:
      "Yes. Complimentary Wi-Fi is available across guest rooms and common hotel areas.",
  },
  {
    question: "Can I request a special room arrangement?",
    answer:
      "Yes. You can mention your preferences while making a booking or contact our team before arrival.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">
      {/* NAVBAR */}
      <header className="contact-navbar">
        <div className="contact-navbar-inner">
          <Link href="/" className="contact-brand">
            Stay<span>Sphere</span>
          </Link>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/rooms">Rooms</Link>
            <Link href="/facilities">Facilities</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/about">About</Link>
            <Link href="/contact" className="active">
              Contact
            </Link>
          </nav>

          <Link href="/booking" className="contact-nav-button">
            Book Your Stay
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-overlay" />

        <div className="contact-hero-content">
          <span>GET IN TOUCH</span>

          <h1>
            We're Here
            <em>For You.</em>
          </h1>

          <p>
            Have a question, special request or simply want to
            know more about StaySphere? Our team would love to hear
            from you.
          </p>
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section className="contact-details-section">
        <div className="contact-details-container">
          {contactDetails.map((item) => (
            <div className="contact-detail-card" key={item.title}>
              <div className="contact-detail-icon">
                {item.icon}
              </div>

              <div>
                <span>{item.title}</span>

                {item.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + LOCATION */}
      <section className="contact-main">
        <div className="contact-main-container">
          {/* FORM */}
          <div className="contact-form-wrapper">
            <span className="contact-eyebrow">
              SEND US A MESSAGE
            </span>

            <h2>
              Let's Start
              <em>A Conversation.</em>
            </h2>

            <p className="contact-form-intro">
              Fill in the form below and our team will get back to
              you as soon as possible.
            </p>

            {submitted && (
              <div className="contact-success">
                <div>✓</div>

                <div>
                  <strong>Message Sent Successfully</strong>
                  <p>
                    Thank you for contacting StaySphere. Our team
                    will get back to you shortly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="name">
                    Full Name <span>*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="email">
                    Email Address <span>*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="subject">
                    Subject <span>*</span>
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">
                      Booking Enquiry
                    </option>
                    <option value="rooms">
                      Room Information
                    </option>
                    <option value="facilities">
                      Facilities
                    </option>
                    <option value="special-request">
                      Special Request
                    </option>
                    <option value="feedback">
                      Feedback
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="message">
                  Your Message <span>*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit-button"
              >
                Send Message
                <span>→</span>
              </button>
            </form>
          </div>

          {/* LOCATION */}
          <div className="contact-location">
            <div className="contact-location-map">
              <div className="contact-map-grid" />

              <div className="contact-map-marker">
                <span>Stay</span>
                <strong>Sphere</strong>
              </div>

              <div className="contact-map-label">
                <span>STAYSPHERE HOTEL</span>
                <strong>Jaipur, Rajasthan</strong>
              </div>
            </div>

            <div className="contact-location-info">
              <span>OUR LOCATION</span>

              <h3>
                Easy To Find.
                <em>Easy To Reach.</em>
              </h3>

              <p>
                StaySphere is located in Jaipur, Rajasthan, with
                convenient access to the city's major attractions,
                shopping areas and transportation hubs.
              </p>

              <div className="contact-location-points">
                <div>
                  <span>⌖</span>
                  <p>
                    Jaipur, Rajasthan
                    <br />
                    India
                  </p>
                </div>

                <div>
                  <span>☎</span>
                  <p>
                    +91 98765 43210
                    <br />
                    24/7 Guest Support
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Jaipur%2C%20Rajasthan%2C%20India"
                target="_blank"
                rel="noreferrer"
                className="contact-map-link"
              >
                Open In Google Maps
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq">
        <div className="contact-faq-heading">
          <span>COMMON QUESTIONS</span>

          <h2>
            Before You
            <em>Reach Out.</em>
          </h2>

          <p>
            Here are answers to some of the questions our guests
            ask most often.
          </p>
        </div>

        <div className="contact-faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`contact-faq-item ${
                openFaq === index ? "open" : ""
              }`}
              key={faq.question}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenFaq(
                    openFaq === index ? -1 : index
                  )
                }
              >
                <span>{faq.question}</span>
                <strong>
                  {openFaq === index ? "−" : "+"}
                </strong>
              </button>

              <div className="contact-faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUPPORT BANNER */}
      <section className="contact-support">
        <div className="contact-support-overlay" />

        <div className="contact-support-content">
          <span>NEED HELP RIGHT NOW?</span>

          <h2>
            Our Team Is
            <em>Always Available.</em>
          </h2>

          <p>
            For urgent assistance, reservations or anything you
            need during your stay, our guest support team is here
            24/7.
          </p>

          <div className="contact-support-buttons">
            <a
              href="tel:+919876543210"
              className="contact-support-primary"
            >
              Call Us
              <span>→</span>
            </a>

            <a
              href="mailto:hello@staysphere.com"
              className="contact-support-secondary"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="contact-cta">
        <div className="contact-cta-content">
          <span>READY TO STAY?</span>

          <h2>
            Let's Make Your
            <em>Stay Special.</em>
          </h2>

          <p>
            Explore our rooms and discover a StaySphere experience
            designed around you.
          </p>

          <Link href="/rooms" className="contact-cta-button">
            Explore Rooms
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="contact-footer">
        <div>
          <Link href="/" className="contact-footer-brand">
            Stay<span>Sphere</span>
          </Link>

          <p>
            Comfort. Elegance. Hospitality.
          </p>
        </div>

        <div className="contact-footer-links">
          <Link href="/">Home</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/facilities">Facilities</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/about">About</Link>
        </div>

        <p className="contact-footer-copy">
          © 2026 StaySphere. All rights reserved.
        </p>
      </footer>
    </main>
  );
}