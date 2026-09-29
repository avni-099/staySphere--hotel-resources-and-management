"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BookingConfirmationPage() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedBooking =
      localStorage.getItem("staySphereBooking");

    if (savedBooking) {
      try {
        setBooking(JSON.parse(savedBooking));
      } catch {
        setBooking(null);
      }
    }

    setLoading(false);
  }, []);

  const formatPrice = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const formatDate = (date) => {
    if (!date) return "Not selected";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const generateReservationId = () => {
    return "STY-" + Math.floor(100000 + Math.random() * 900000);
  };

  const [reservationId] = useState(generateReservationId());

  if (loading) {
    return (
      <main className="confirmation-loading">
        <div className="confirmation-loader">
          <div />
          <p>Preparing your reservation...</p>
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="confirmation-empty">
        <div className="confirmation-empty-icon">
          !
        </div>

        <span>RESERVATION NOT FOUND</span>

        <h1>No Booking Found</h1>

        <p>
          We couldn't find a recent StaySphere reservation.
          Please start a new booking.
        </p>

        <Link href="/rooms">
          Explore Rooms →
        </Link>
      </main>
    );
  }

  const guestName = `${booking.guest?.firstName || ""} ${
    booking.guest?.lastName || ""
  }`.trim();

  const paymentLabel =
    booking.paymentMethod === "card"
      ? "Credit / Debit Card"
      : booking.paymentMethod === "upi"
      ? "UPI"
      : "Pay at Hotel";

  return (
    <main className="booking-confirmation-page">
      {/* NAVBAR */}
      <header className="confirmation-navbar">
        <div className="confirmation-navbar-inner">
          <Link href="/" className="confirmation-logo">
            Stay<span>Sphere</span>
          </Link>

          <nav className="confirmation-nav">
            <Link href="/rooms">Rooms</Link>
            <Link href="/about">About</Link>
            <Link href="/facilities">Facilities</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <Link
            href="/account"
            className="confirmation-account-button"
          >
            My Account
          </Link>
        </div>
      </header>

      {/* SUCCESS HERO */}
      <section className="confirmation-success">
        <div className="confirmation-check">
          ✓
        </div>

        <span>RESERVATION CONFIRMED</span>

        <h1>
          Your stay is <em>confirmed.</em>
        </h1>

        <p>
          Thank you for choosing StaySphere, {guestName || "Guest"}.
          We look forward to welcoming you.
        </p>

        <div className="confirmation-id">
          <span>RESERVATION ID</span>
          <strong>{reservationId}</strong>
        </div>
      </section>

      {/* MAIN */}
      <section className="confirmation-main">
        {/* LEFT */}
        <div className="confirmation-content">
          {/* ROOM CARD */}
          <section className="confirmation-card confirmation-room-card">
            <div className="confirmation-card-heading">
              <div>
                <span>YOUR STAY</span>
                <h2>Reservation Details</h2>
              </div>

              <span className="confirmation-status">
                Confirmed
              </span>
            </div>

            <div className="confirmation-room">
              <img
                src={booking.room?.image}
                alt={booking.room?.name}
              />

              <div className="confirmation-room-info">
                <span>
                  {booking.room?.category || "ROOM"}
                </span>

                <h3>{booking.room?.name}</h3>

                <p>
                  {formatPrice(booking.room?.price)}
                  <small> / night</small>
                </p>
              </div>
            </div>

            <div className="confirmation-stay-grid">
              <div>
                <span>CHECK-IN</span>

                <strong>
                  {formatDate(booking.stay?.checkIn)}
                </strong>

                <small>From 2:00 PM</small>
              </div>

              <div>
                <span>CHECK-OUT</span>

                <strong>
                  {formatDate(booking.stay?.checkOut)}
                </strong>

                <small>Before 11:00 AM</small>
              </div>

              <div>
                <span>GUESTS</span>

                <strong>
                  {booking.stay?.guests || 1}{" "}
                  {booking.stay?.guests === 1
                    ? "Guest"
                    : "Guests"}
                </strong>
              </div>

              <div>
                <span>NIGHTS</span>

                <strong>
                  {booking.stay?.nights || 1}
                </strong>
              </div>
            </div>
          </section>

          {/* GUEST INFORMATION */}
          <section className="confirmation-card">
            <div className="confirmation-card-heading">
              <div>
                <span>GUEST INFORMATION</span>
                <h2>Guest Details</h2>
              </div>
            </div>

            <div className="confirmation-info-grid">
              <div>
                <span>FULL NAME</span>
                <strong>{guestName || "Guest"}</strong>
              </div>

              <div>
                <span>EMAIL ADDRESS</span>
                <strong>
                  {booking.guest?.email || "Not provided"}
                </strong>
              </div>

              <div>
                <span>MOBILE NUMBER</span>
                <strong>
                  {booking.guest?.phone || "Not provided"}
                </strong>
              </div>

              <div>
                <span>PAYMENT METHOD</span>
                <strong>{paymentLabel}</strong>
              </div>
            </div>
          </section>

          {/* SPECIAL REQUEST */}
          {booking.specialRequest && (
            <section className="confirmation-card">
              <div className="confirmation-card-heading">
                <div>
                  <span>YOUR PREFERENCES</span>
                  <h2>Special Request</h2>
                </div>
              </div>

              <div className="confirmation-request">
                <span>✦</span>

                <p>{booking.specialRequest}</p>
              </div>
            </section>
          )}

          {/* NEXT STEPS */}
          <section className="confirmation-card">
            <div className="confirmation-card-heading">
              <div>
                <span>WHAT'S NEXT</span>
                <h2>Before Your Stay</h2>
              </div>
            </div>

            <div className="confirmation-next-steps">
              <div>
                <span>01</span>

                <div>
                  <strong>Keep your reservation ID</strong>

                  <p>
                    Save your reservation ID for easy
                    reference when contacting us.
                  </p>
                </div>
              </div>

              <div>
                <span>02</span>

                <div>
                  <strong>Bring a valid ID</strong>

                  <p>
                    Please carry a valid government-issued
                    identification document during check-in.
                  </p>
                </div>
              </div>

              <div>
                <span>03</span>

                <div>
                  <strong>Arrive from 2:00 PM</strong>

                  <p>
                    Our check-in time begins at 2:00 PM.
                    Our team will be ready to welcome you.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SUMMARY */}
        <aside className="confirmation-summary">
          <div className="confirmation-summary-card">
            <div className="confirmation-summary-heading">
              <span>PAYMENT SUMMARY</span>
              <h2>Booking Total</h2>
            </div>

            <div className="confirmation-price-row">
              <span>
                Room ×{" "}
                {booking.stay?.nights || 1}{" "}
                {booking.stay?.nights === 1
                  ? "night"
                  : "nights"}
              </span>

              <strong>
                {formatPrice(
                  booking.pricing?.roomTotal
                )}
              </strong>
            </div>

            <div className="confirmation-price-row">
              <span>Taxes & Fees</span>

              <strong>
                {formatPrice(booking.pricing?.tax)}
              </strong>
            </div>

            <div className="confirmation-total">
              <span>Total Paid</span>

              <strong>
                {formatPrice(booking.pricing?.total)}
              </strong>
            </div>

            <div className="confirmation-payment-success">
              <span>✓</span>

              <div>
                <strong>
                  {booking.paymentMethod === "hotel"
                    ? "Payment Due at Hotel"
                    : "Payment Successful"}
                </strong>

                <p>
                  {paymentLabel}
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="confirmation-actions">
            <Link href="/account/reservations">
              View My Reservations
              <span>→</span>
            </Link>

            <Link href="/rooms">
              Book Another Room
              <span>+</span>
            </Link>
          </div>

          {/* HELP */}
          <div className="confirmation-help">
            <span>NEED ASSISTANCE?</span>

            <h3>We're here to help.</h3>

            <p>
              Have a question about your reservation? Our
              team is happy to assist you.
            </p>

            <Link href="/contact">
              Contact Support →
            </Link>
          </div>
        </aside>
      </section>

      {/* FOOTER */}
      <footer className="confirmation-footer">
        <div>
          <Link
            href="/"
            className="confirmation-footer-logo"
          >
            Stay<span>Sphere</span>
          </Link>

          <p>
            A refined stay, thoughtfully designed for you.
          </p>
        </div>

        <span>© 2026 StaySphere</span>
      </footer>
    </main>
  );
}