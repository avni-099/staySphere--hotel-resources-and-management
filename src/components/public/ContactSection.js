"use client";

import { useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className="contact-section">
      <div className="contact-container">

        <div className="contact-info">

          <span className="contact-eyebrow">
            GET IN TOUCH
          </span>

          <h2>
            We Would Love
            <span>To Hear From You.</span>
          </h2>

          <p className="contact-description">
            Have a question about your stay, our rooms or
            hotel facilities? Our team is always happy to help.
          </p>

          <div className="contact-details">

            <div className="contact-detail">
              <div className="contact-icon">⌖</div>

              <div>
                <span>VISIT US</span>
                <strong>
                  StaySphere Hotel
                  <br />
                  Jaipur, Rajasthan, India
                </strong>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-icon">☎</div>

              <div>
                <span>CALL US</span>
                <strong>+91 98765 43210</strong>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-icon">✉</div>

              <div>
                <span>EMAIL US</span>
                <strong>hello@staysphere.com</strong>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-icon">◷</div>

              <div>
                <span>GUEST SUPPORT</span>
                <strong>Available 24/7</strong>
              </div>
            </div>

          </div>
        </div>

        <div className="contact-form-wrapper">

          <div className="contact-form-header">
            <span>CONTACT US</span>
            <h3>Send Us A Message</h3>
          </div>

          {submitted && (
            <div className="contact-success">
              ✓ Thank you! Your message has been received.
            </div>
          )}

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="contact-form-row">

              <div className="contact-field">
                <label htmlFor="contact-name">
                  Your Name *
                </label>

                <input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">
                  Email Address *
                </label>

                <input
                  id="contact-email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

            </div>

            <div className="contact-field">
              <label htmlFor="contact-phone">
                Phone Number
              </label>

              <input
                id="contact-phone"
                type="tel"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">
                Message *
              </label>

              <textarea
                id="contact-message"
                rows="5"
                placeholder="How can we help you?"
                required
              />
            </div>

            <button
              type="submit"
              className="contact-submit"
            >
              Send Message
              <span>→</span>
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}