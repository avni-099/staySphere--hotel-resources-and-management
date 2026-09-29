"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const rooms = [
  {
    id: 1,
    name: "Deluxe Room",
    category: "DELUXE",
    price: 3500,
    guests: 2,
    bed: "King Bed",
    size: "320 sq.ft.",
    image: "/images/gallery-room.jpg",
  },
  {
    id: 2,
    name: "Premium Room",
    category: "PREMIUM",
    price: 4200,
    guests: 2,
    bed: "King Bed",
    size: "380 sq.ft.",
    image: "/images/gallery-room.jpg",
  },
  {
    id: 3,
    name: "Luxury Suite",
    category: "SUITE",
    price: 4900,
    guests: 3,
    bed: "King Bed",
    size: "520 sq.ft.",
    image: "/images/gallery-suite.jpg",
  },
  {
    id: 4,
    name: "Executive Suite",
    category: "SUITE",
    price: 5400,
    guests: 3,
    bed: "King Bed",
    size: "580 sq.ft.",
    image: "/images/gallery-suite.jpg",
  },
  {
    id: 5,
    name: "Family Premium Room",
    category: "FAMILY",
    price: 4600,
    guests: 4,
    bed: "King + Sofa Bed",
    size: "450 sq.ft.",
    image: "/images/gallery-room.jpg",
  },
  {
    id: 6,
    name: "Classic Room",
    category: "CLASSIC",
    price: 3000,
    guests: 2,
    bed: "Queen Bed",
    size: "280 sq.ft.",
    image: "/images/gallery-room.jpg",
  },
];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
  specialRequest: "",
  paymentMethod: "card",
  cardNumber: "",
  expiry: "",
  cvv: "",
  upiId: "",
  agreeTerms: false,
};

export default function BookingPage() {
  const searchParams = useSearchParams();

  const roomId = Number(searchParams.get("room")) || 1;

  const selectedRoom =
    rooms.find((room) => room.id === roomId) || rooms[0];

  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [guestOpen, setGuestOpen] = useState(false);

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) {
      return 1;
    }

    const checkIn = new Date(form.checkIn);
    const checkOut = new Date(form.checkOut);

    const difference =
      checkOut.getTime() - checkIn.getTime();

    const calculatedNights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return calculatedNights > 0 ? calculatedNights : 1;
  }, [form.checkIn, form.checkOut]);

  const roomTotal = selectedRoom.price * nights;

  const tax = Math.round(roomTotal * 0.12);

  const total = roomTotal + tax;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const selectGuests = (value) => {
    setForm((prev) => ({
      ...prev,
      guests: String(value),
    }));

    setGuestOpen(false);
    setError("");
  };

  const handleSpecialRequest = (request) => {
    setForm((prev) => ({
      ...prev,
      specialRequest:
        prev.specialRequest === request ? "" : request,
    }));

    setError("");
  };

  const validateForm = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone
    ) {
      setError("Please fill in all guest details.");
      return false;
    }

    if (!form.checkIn || !form.checkOut) {
      setError(
        "Please select check-in and check-out dates."
      );
      return false;
    }

    if (
      new Date(form.checkOut) <=
      new Date(form.checkIn)
    ) {
      setError(
        "Check-out date must be after check-in date."
      );
      return false;
    }

    if (form.paymentMethod === "card") {
      if (
        !form.cardNumber ||
        !form.expiry ||
        !form.cvv
      ) {
        setError(
          "Please complete your card details."
        );
        return false;
      }
    }

    if (form.paymentMethod === "upi") {
      if (!form.upiId) {
        setError("Please enter your UPI ID.");
        return false;
      }
    }

    if (!form.agreeTerms) {
      setError(
        "Please accept the terms and conditions to continue."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    const reservationId = `STY-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    const reservation = {
      reservationId,

      room: selectedRoom,

      guest: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
      },

      stay: {
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: Number(form.guests),
        nights,
      },

      specialRequest: form.specialRequest,

      paymentMethod: form.paymentMethod,

      pricing: {
        roomTotal,
        tax,
        total,
      },

      status: "Upcoming",

      paymentStatus:
        form.paymentMethod === "payAtHotel"
          ? "Payment Due"
          : "Payment Successful",

      bookedAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(
      localStorage.getItem("staySphereBookings") || "[]"
    );

    existingBookings.unshift(reservation);

    localStorage.setItem(
      "staySphereBookings",
      JSON.stringify(existingBookings)
    );

    localStorage.setItem(
      "staySphereBooking",
      JSON.stringify(reservation)
    );

    window.location.href =
      "/booking/confirmation";
  };

  return (
    <main className="booking-page">

      {/* ================= NAVBAR ================= */}

      <nav className="booking-navbar">

        <div className="booking-navbar-inner">

          <Link href="/" className="booking-logo">
            Stay<span>Sphere</span>
          </Link>

          <div className="booking-nav">
            <Link href="/">Home</Link>
            <Link href="/rooms">Rooms</Link>
            <Link href="/about">About</Link>
            <Link href="/facilities">
              Facilities
            </Link>
            <Link href="/contact">Contact</Link>
          </div>

          <Link
            href="/account"
            className="booking-account-button"
          >
            My Account
          </Link>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="booking-page-hero">

        <div>

          <span>STAYSPHERE RESERVATIONS</span>

          <h1>
            Complete Your <em>Booking</em>
          </h1>

          <p>
            Reserve your room and get ready for a
            comfortable and memorable stay.
          </p>

        </div>

      </section>

      {/* ================= MAIN ================= */}

      <section className="booking-main">

        {/* ================= FORM COLUMN ================= */}

        <form
  id="booking-form"
  className="booking-form-column"
  onSubmit={handleSubmit}
>

          {/* ================= GUEST DETAILS ================= */}

          <div className="booking-card">

            <div className="booking-card-heading">

              <div className="booking-step-number">
                01
              </div>

              <div>
                <span>GUEST DETAILS</span>
                <h2>Guest Information</h2>
              </div>

            </div>

            <div className="booking-form-grid">

              <div className="booking-field">
                <label>
                  First Name <b>*</b>
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </div>

              <div className="booking-field">
                <label>
                  Last Name <b>*</b>
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </div>

              <div className="booking-field">
                <label>
                  Email Address <b>*</b>
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
              </div>

              <div className="booking-field">
                <label>
                  Phone Number <b>*</b>
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

            </div>

          </div>

          {/* ================= STAY DETAILS ================= */}

          <div className="booking-card">

            <div className="booking-card-heading">

              <div className="booking-step-number">
                02
              </div>

              <div>
                <span>YOUR STAY</span>
                <h2>Stay Details</h2>
              </div>

            </div>

            <div className="booking-form-grid">

              <div className="booking-field">
                <label>
                  Check-in <b>*</b>
                </label>

                <input
                  type="date"
                  name="checkIn"
                  value={form.checkIn}
                  onChange={handleChange}
                />
              </div>

              <div className="booking-field">
                <label>
                  Check-out <b>*</b>
                </label>

                <input
                  type="date"
                  name="checkOut"
                  value={form.checkOut}
                  onChange={handleChange}
                />
              </div>

              <div className="booking-field booking-guests-field">

                <label>
                  Guests <b>*</b>
                </label>

                <button
                  type="button"
                  className="booking-guest-selector"
                  onClick={() =>
                    setGuestOpen(!guestOpen)
                  }
                >
                  <span>
                    {form.guests}{" "}
                    {Number(form.guests) === 1
                      ? "Guest"
                      : "Guests"}
                  </span>

                  <span>
                    {guestOpen ? "▲" : "▼"}
                  </span>
                </button>

                {guestOpen && (
                  <div className="booking-guest-dropdown">

                    {[1, 2, 3, 4].map(
                      (guestCount) => (
                        <button
                          type="button"
                          key={guestCount}
                          onClick={() =>
                            selectGuests(
                              guestCount
                            )
                          }
                        >
                          {guestCount}{" "}
                          {guestCount === 1
                            ? "Guest"
                            : "Guests"}
                        </button>
                      )
                    )}

                  </div>
                )}

              </div>

            </div>

            <div className="booking-info-note">

              <span>i</span>

              <p>
                Check-in from{" "}
                <strong>2:00 PM</strong>
                {" · "}
                Check-out before{" "}
                <strong>11:00 AM</strong>
              </p>

            </div>

          </div>

          {/* ================= SPECIAL REQUESTS ================= */}

          <div className="booking-card">

            <div className="booking-card-heading">

              <div className="booking-step-number">
                03
              </div>

              <div>
                <span>
                  PERSONALIZE YOUR STAY
                </span>

                <h2>Special Requests</h2>
              </div>

            </div>

            <div className="booking-request-options">

              {[
                "Late Check-in",
                "Extra Bed",
                "Airport Pickup",
                "Birthday Setup",
                "Quiet Room",
              ].map((request) => (

                <button
                  type="button"
                  key={request}
                  className={
                    form.specialRequest ===
                    request
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handleSpecialRequest(
                      request
                    )
                  }
                >
                  {request}
                </button>

              ))}

            </div>

            <div
              className="booking-field full"
              style={{ marginTop: "18px" }}
            >

              <textarea
                name="specialRequest"
                value={form.specialRequest}
                onChange={handleChange}
                placeholder="Any additional request..."
                rows="5"
              />

            </div>

          </div>

          {/* ================= PAYMENT ================= */}

          <div className="booking-card">

            <div className="booking-card-heading">

              <div className="booking-step-number">
                04
              </div>

              <div>
                <span>SECURE PAYMENT</span>
                <h2>Payment Method</h2>
              </div>

            </div>

            <div className="booking-payment-methods">

              <button
                type="button"
                className={
                  form.paymentMethod === "card"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    paymentMethod: "card",
                  }))
                }
              >

                <span>💳</span>

                <div>
                  <strong>
                    Credit / Debit Card
                  </strong>

                  <small>
                    Secure card payment
                  </small>
                </div>

              </button>

              <button
                type="button"
                className={
                  form.paymentMethod === "upi"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    paymentMethod: "upi",
                  }))
                }
              >

                <span>📱</span>

                <div>
                  <strong>UPI</strong>

                  <small>
                    Pay using UPI
                  </small>
                </div>

              </button>

              <button
                type="button"
                className={
                  form.paymentMethod ===
                  "payAtHotel"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    paymentMethod:
                      "payAtHotel",
                  }))
                }
              >

                <span>🏨</span>

                <div>
                  <strong>
                    Pay at Hotel
                  </strong>

                  <small>
                    Pay during check-in
                  </small>
                </div>

              </button>

            </div>

            {/* CARD */}

            {form.paymentMethod ===
              "card" && (

              <div className="booking-card-fields">

                <div className="booking-field full">

                  <label>
                    Card Number <b>*</b>
                  </label>

                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />

                </div>

                <div className="booking-field">

                  <label>
                    Expiry Date <b>*</b>
                  </label>

                  <input
                    type="text"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                  />

                </div>

                <div className="booking-field">

                  <label>
                    CVV <b>*</b>
                  </label>

                  <input
                    type="password"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="•••"
                    maxLength="4"
                  />

                </div>

              </div>

            )}

            {/* UPI */}

            {form.paymentMethod ===
              "upi" && (

              <div className="booking-upi-box">

                <span>📱</span>

                <div>

                  <strong>
                    UPI Payment
                  </strong>

                  <p>
                    Enter your UPI ID to continue
                    with the payment.
                  </p>

                  <div
                    className="booking-field"
                    style={{
                      marginTop: "12px",
                    }}
                  >

                    <input
                      type="text"
                      name="upiId"
                      value={form.upiId}
                      onChange={handleChange}
                      placeholder="example@upi"
                    />

                  </div>

                </div>

              </div>

            )}

            {/* PAY AT HOTEL */}

            {form.paymentMethod ===
              "payAtHotel" && (

              <div className="booking-upi-box">

                <span>🏨</span>

                <div>

                  <strong>
                    Pay at Hotel
                  </strong>

                  <p>
                    You can pay the complete
                    amount during check-in.
                  </p>

                </div>

              </div>

            )}

            <label className="booking-agreement">

              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
              />

              <span>
                I agree to the{" "}
                <Link href="/terms">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy">
                  Privacy Policy
                </Link>
                .
              </span>

            </label>

            {error && (
              <div className="booking-agreement-error">
                {error}
              </div>
            )}

          </div>

        </form>

        {/* ================= SUMMARY ================= */}

        <aside className="booking-summary">

          <div className="booking-summary-sticky">

            <div className="booking-summary-title">

              <span>
                YOUR RESERVATION
              </span>

              <h2>
                Booking Summary
              </h2>

            </div>

            {/* ROOM */}

            <div className="booking-room-preview">

              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
              />

              <div>

                <span>
                  {selectedRoom.category}
                </span>

                <h3>
                  {selectedRoom.name}
                </h3>

                <p>
                  ₹
                  {selectedRoom.price.toLocaleString(
                    "en-IN"
                  )}
                  <small> / night</small>
                </p>

              </div>

            </div>

            {/* DATES */}

            <div className="booking-summary-stay">

              <div>

                <span>CHECK-IN</span>

                <strong>
                  {form.checkIn ||
                    "Select date"}
                </strong>

              </div>

              <div>

                <span>CHECK-OUT</span>

                <strong>
                  {form.checkOut ||
                    "Select date"}
                </strong>

              </div>

            </div>

            {/* GUESTS */}

            <div className="booking-summary-guests">

              <span>GUESTS</span>

              <strong>
                {form.guests}{" "}
                {Number(form.guests) === 1
                  ? "Guest"
                  : "Guests"}
              </strong>

            </div>

            {/* PRICE */}

            <div className="booking-price-breakdown">

              <div>

                <span>
                  ₹
                  {selectedRoom.price.toLocaleString(
                    "en-IN"
                  )}{" "}
                  × {nights}{" "}
                  {nights === 1
                    ? "night"
                    : "nights"}
                </span>

                <strong>
                  ₹
                  {roomTotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div>

                <span>
                  Taxes & Fees
                </span>

                <strong>
                  ₹
                  {tax.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="booking-total-row">

                <span>Total</span>

                <strong>
                  ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

            </div>

            {/* CONFIRM BUTTON */}

            <button
              type="submit"
              form="booking-form"
              className="booking-confirm-button"
              disabled={isSubmitting}
              
            >
              <span>→</span>

              {isSubmitting
                ? "Processing..."
                : "Confirm Booking"}
            </button>

            <div className="booking-secure-note">

              <span>✓</span>

              <p>
                Secure reservation · No hidden
                booking charges
              </p>

            </div>

            <div className="booking-cancellation-note">

              <strong>
                Free cancellation
              </strong>

              <p>
                Cancel according to the property's
                cancellation policy. No hidden
                booking charges.
              </p>

            </div>

          </div>

        </aside>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="booking-footer">

        <div>

          <Link
            href="/"
            className="booking-footer-logo"
          >
            Stay<span>Sphere</span>
          </Link>

          <p>
            Your comfort, our commitment.
          </p>

        </div>

        <div>
          <span>
            © {new Date().getFullYear()} StaySphere.
            All rights reserved.
          </span>
        </div>

      </footer>

    </main>
  );
}