"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const MOCK_RESERVATIONS = [
  {
    id: "STY-1001",
    reservationId: "STY-1001",
    room: {
      name: "Deluxe Room",
      category: "DELUXE",
      image: "/images/gallery-room.jpg",
      bed: "King Bed",
      size: "320 sq.ft.",
    },
    guest: {
      firstName: "Richa",
      lastName: "Gupta",
      phone: "+91 98765 43210",
      email: "richa@example.com",
    },
    stay: {
      checkIn: "2026-09-24",
      checkOut: "2026-09-27",
      guests: 2,
      nights: 3,
    },
    pricing: {
      roomTotal: 10500,
      tax: 1260,
      total: 11760,
    },
    paymentMethod: "card",
    paymentStatus: "Payment Successful",
    status: "Upcoming",
    specialRequest: "Late Check-in",
  },

  {
    id: "STY-0987",
    reservationId: "STY-0987",
    room: {
      name: "Premium Room",
      category: "PREMIUM",
      image: "/images/gallery-room.jpg",
      bed: "King Bed",
      size: "380 sq.ft.",
    },
    guest: {
      firstName: "Richa",
      lastName: "Gupta",
      phone: "+91 98765 43210",
      email: "richa@example.com",
    },
    stay: {
      checkIn: "2026-08-12",
      checkOut: "2026-08-14",
      guests: 2,
      nights: 2,
    },
    pricing: {
      roomTotal: 8400,
      tax: 1008,
      total: 9408,
    },
    paymentMethod: "upi",
    paymentStatus: "Payment Successful",
    status: "Completed",
    specialRequest: "",
  },

  {
    id: "STY-0942",
    reservationId: "STY-0942",
    room: {
      name: "Classic Room",
      category: "CLASSIC",
      image: "/images/gallery-room.jpg",
      bed: "Queen Bed",
      size: "280 sq.ft.",
    },
    guest: {
      firstName: "Richa",
      lastName: "Gupta",
      phone: "+91 98765 43210",
      email: "richa@example.com",
    },
    stay: {
      checkIn: "2026-07-05",
      checkOut: "2026-07-07",
      guests: 2,
      nights: 2,
    },
    pricing: {
      roomTotal: 6000,
      tax: 720,
      total: 6720,
    },
    paymentMethod: "card",
    paymentStatus: "Payment Successful",
    status: "Completed",
    specialRequest: "Quiet Room",
  },

  {
    id: "STY-0891",
    reservationId: "STY-0891",
    room: {
      name: "Luxury Suite",
      category: "SUITE",
      image: "/images/gallery-suite.jpg",
      bed: "King Bed",
      size: "520 sq.ft.",
    },
    guest: {
      firstName: "Richa",
      lastName: "Gupta",
      phone: "+91 98765 43210",
      email: "richa@example.com",
    },
    stay: {
      checkIn: "2026-05-18",
      checkOut: "2026-05-20",
      guests: 3,
      nights: 2,
    },
    pricing: {
      roomTotal: 9800,
      tax: 1176,
      total: 10976,
    },
    paymentMethod: "card",
    paymentStatus: "Refunded",
    status: "Cancelled",
    specialRequest: "Birthday Setup",
  },
];

const FILTERS = [
  "All",
  "Upcoming",
  "Completed",
  "Cancelled",
];

function formatDate(dateString) {
  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatPaymentMethod(method) {
  if (method === "card") {
    return "Credit / Debit Card";
  }

  if (method === "upi") {
    return "UPI";
  }

  if (method === "payAtHotel") {
    return "Pay at Hotel";
  }

  return method || "-";
}

function getInitials(name) {
  if (!name) {
    return "S";
  }

  const parts = name.trim().split(" ");

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0) +
    parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

export default function CustomerReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [activeFilter, setActiveFilter] =
    useState("All");

  const [search, setSearch] = useState("");

  const [selectedReservation, setSelectedReservation] =
    useState(null);

  const [cancelReservation, setCancelReservation] =
    useState(null);

  const [user, setUser] = useState(null);

  /* =====================================================
     LOAD USER + RESERVATIONS
  ===================================================== */

  useEffect(() => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("staySphereUser") || "null"
      );

      setUser(savedUser);

      const savedBookings = JSON.parse(
        localStorage.getItem("staySphereBookings") || "[]"
      );

      /*
       * If actual bookings exist, show them.
       * Otherwise show the old demo reservations.
       */
      if (
        Array.isArray(savedBookings) &&
        savedBookings.length > 0
      ) {
        setReservations(savedBookings);
      } else {
        setReservations(MOCK_RESERVATIONS);
      }
    } catch (error) {
      console.error(
        "Unable to load reservations:",
        error
      );

      setReservations(MOCK_RESERVATIONS);
    }
  }, []);

  /* =====================================================
     USER INFORMATION
  ===================================================== */

  const userName =
    user?.name || "Guest";

  const userEmail =
    user?.email || "guest@staysphere.com";

  const userInitials =
    getInitials(userName);

  /* =====================================================
     FILTER RESERVATIONS
  ===================================================== */

  const filteredReservations = useMemo(() => {
    let result = [...reservations];

    if (activeFilter !== "All") {
      result = result.filter(
        (reservation) =>
          reservation.status?.toLowerCase() ===
          activeFilter.toLowerCase()
      );
    }

    if (search.trim()) {
      const searchValue =
        search.toLowerCase();

      result = result.filter(
        (reservation) => {
          const roomName =
            reservation.room?.name
              ?.toLowerCase() || "";

          const reservationId =
            reservation.reservationId
              ?.toLowerCase() || "";

          const firstName =
            reservation.guest?.firstName
              ?.toLowerCase() || "";

          const lastName =
            reservation.guest?.lastName
              ?.toLowerCase() || "";

          return (
            roomName.includes(searchValue) ||
            reservationId.includes(
              searchValue
            ) ||
            firstName.includes(
              searchValue
            ) ||
            lastName.includes(
              searchValue
            )
          );
        }
      );
    }

    return result;
  }, [
    reservations,
    activeFilter,
    search,
  ]);

  /* =====================================================
     COUNTS
  ===================================================== */

  const upcomingCount =
    reservations.filter(
      (item) =>
        item.status === "Upcoming"
    ).length;

  const completedCount =
    reservations.filter(
      (item) =>
        item.status === "Completed"
    ).length;

  const cancelledCount =
    reservations.filter(
      (item) =>
        item.status === "Cancelled"
    ).length;

  /* =====================================================
     CANCEL RESERVATION
  ===================================================== */

  const confirmCancellation = () => {
    if (!cancelReservation) {
      return;
    }

    const updatedReservations =
      reservations.map(
        (reservation) => {
          if (
            reservation.reservationId ===
            cancelReservation.reservationId
          ) {
            return {
              ...reservation,
              status: "Cancelled",
              paymentStatus:
                reservation.paymentStatus ===
                "Payment Successful"
                  ? "Refund Pending"
                  : reservation.paymentStatus,
              cancelledAt:
                new Date().toISOString(),
            };
          }

          return reservation;
        }
      );

    setReservations(updatedReservations);

    /*
     * Only save if real bookings
     * were already present.
     */
    const savedBookings = JSON.parse(
      localStorage.getItem(
        "staySphereBookings"
      ) || "[]"
    );

    if (
      Array.isArray(savedBookings) &&
      savedBookings.length > 0
    ) {
      localStorage.setItem(
        "staySphereBookings",
        JSON.stringify(
          updatedReservations
        )
      );
    }

    setCancelReservation(null);

    setSelectedReservation(null);
  };

  return (
    <main className="customer-reservations-page">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="customer-reservations-navbar">

        <div className="customer-reservations-navbar-inner">

          <Link
            href="/"
            className="customer-reservations-brand"
          >
            Stay<span>Sphere</span>
          </Link>

          <div className="customer-reservations-nav-right">

            <Link
              href="/rooms"
              className="customer-reservations-book-btn"
            >
              Book a Room
            </Link>

            <Link
              href="/account"
              className="customer-reservations-avatar"
            >
              {userInitials}
            </Link>

          </div>

        </div>

      </nav>

      {/* =================================================
          MAIN LAYOUT
      ================================================= */}

      <div className="customer-reservations-layout">

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="customer-reservations-sidebar">

          {/* PROFILE */}

          <div className="customer-reservations-sidebar-profile">

            <div className="customer-reservations-big-avatar">
              {userInitials}
            </div>

            <div>

              <strong>
                {userName}
              </strong>

              <span>
                {userEmail}
              </span>

            </div>

          </div>

          {/* NAVIGATION */}

          <nav className="customer-reservations-nav">

            <Link href="/account">
              <span>⌂</span>
              Dashboard
            </Link>

            <Link
              href="/account/reservations"
              className="active"
            >
              <span>▣</span>
              My Reservations
            </Link>

            <Link href="/rooms">
              <span>⌂</span>
              Explore Rooms
            </Link>

            <Link href="/account">
              <span>◉</span>
              My Profile
            </Link>

          </nav>

          {/* BOTTOM */}

          <div className="customer-reservations-sidebar-bottom">

            <Link href="/">
              ← Back to Website
            </Link>

          </div>

        </aside>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <section className="customer-reservations-main">

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="customer-reservations-heading">

            <div>

              <span>
                YOUR STAYSPHERE JOURNEY
              </span>

              <h1>
                My <em>Reservations</em>
              </h1>

              <p>
                Manage your stays and keep
                track of all your hotel
                reservations.
              </p>

            </div>

            <Link
              href="/rooms"
              className="customer-reservations-heading-btn"
            >
              Book a New Stay
              <span>→</span>
            </Link>

          </div>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <div className="customer-reservation-summary">

            <div>

              <span>
                TOTAL RESERVATIONS
              </span>

              <strong>
                {reservations.length}
              </strong>

            </div>

            <div>

              <span>
                UPCOMING
              </span>

              <strong>
                {upcomingCount}
              </strong>

            </div>

            <div>

              <span>
                COMPLETED
              </span>

              <strong>
                {completedCount}
              </strong>

            </div>

            <div>

              <span>
                CANCELLED
              </span>

              <strong>
                {cancelledCount}
              </strong>

            </div>

          </div>

          {/* =================================================
              TOOLBAR
          ================================================= */}

          <div className="customer-reservation-toolbar">

            <div className="customer-reservation-tabs">

              {FILTERS.map(
                (filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={
                      activeFilter ===
                      filter
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveFilter(
                        filter
                      )
                    }
                  >
                    {filter}
                  </button>
                )
              )}

            </div>

            <div className="customer-reservation-search">

              <span>
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search reservation..."
              />

            </div>

          </div>

          {/* =================================================
              RESERVATIONS
          ================================================= */}

          {filteredReservations.length ===
            0 ? (

            <div className="customer-reservation-empty">

              <div>
                ◫
              </div>

              <h2>
                No Reservations Found
              </h2>

              <p>
                We couldn't find any
                reservations matching
                your search.
              </p>

              <Link href="/rooms">
                Explore Rooms →
              </Link>

            </div>

          ) : (

            <div className="customer-reservation-list">

              {filteredReservations.map(
                (reservation) => {

                  const room =
                    reservation.room ||
                    {};

                  const stay =
                    reservation.stay ||
                    {};

                  const guest =
                    reservation.guest ||
                    {};

                  const pricing =
                    reservation.pricing ||
                    {};

                  const paymentStatus =
                    reservation.paymentStatus ||
                    "Payment Successful";

                  return (
                    <article
                      className="customer-reservation-card"
                      key={
                        reservation.reservationId
                      }
                    >

                      {/* IMAGE */}

                      <div className="customer-reservation-image">

                        <img
                          src={
                            room.image ||
                            "/images/hero-hotel.jpg"
                          }
                          alt={
                            room.name ||
                            "Hotel Room"
                          }
                        />

                        <span
                          className={`customer-status ${
                            reservation.status ===
                            "Completed"
                              ? "completed"
                              : reservation.status ===
                                "Cancelled"
                              ? "cancelled"
                              : ""
                          }`}
                        >
                          {
                            reservation.status ||
                            "Upcoming"
                          }
                        </span>

                      </div>

                      {/* CONTENT */}

                      <div className="customer-reservation-content">

                        {/* TOP */}

                        <div className="customer-reservation-top">

                          <div>

                            <span className="customer-room-category">
                              {
                                room.category ||
                                "HOTEL ROOM"
                              }
                            </span>

                            <h2>
                              {
                                room.name ||
                                "StaySphere Room"
                              }
                            </h2>

                            <p>
                              Reservation ID:{" "}
                              <strong>
                                {
                                  reservation.reservationId
                                }
                              </strong>
                            </p>

                          </div>

                          <div className="customer-reservation-price">

                            <span>
                              TOTAL AMOUNT
                            </span>

                            <strong>
                              ₹
                              {Number(
                                pricing.total ||
                                0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </strong>

                          </div>

                        </div>

                        {/* DETAILS */}

                        <div className="customer-reservation-details">

                          <div>

                            <span>
                              CHECK-IN
                            </span>

                            <strong>
                              {formatDate(
                                stay.checkIn
                              )}
                            </strong>

                          </div>

                          <div>

                            <span>
                              CHECK-OUT
                            </span>

                            <strong>
                              {formatDate(
                                stay.checkOut
                              )}
                            </strong>

                          </div>

                          <div>

                            <span>
                              GUESTS
                            </span>

                            <strong>
                              {stay.guests ||
                                2}{" "}
                              {Number(
                                stay.guests ||
                                2
                              ) === 1
                                ? "Guest"
                                : "Guests"}
                            </strong>

                          </div>

                          <div>

                            <span>
                              DURATION
                            </span>

                            <strong>
                              {stay.nights ||
                                1}{" "}
                              {Number(
                                stay.nights ||
                                1
                              ) === 1
                                ? "Night"
                                : "Nights"}
                            </strong>

                          </div>

                        </div>

                        {/* BOTTOM */}

                        <div className="customer-reservation-bottom">

                          <div className="customer-payment-status">

                            <span>
                              PAYMENT
                            </span>

                            <strong
                              className={
                                paymentStatus ===
                                "Refunded" ||
                                paymentStatus ===
                                "Refund Pending"
                                  ? "refunded"
                                  : ""
                              }
                            >
                              {paymentStatus}
                            </strong>

                          </div>

                          <div className="customer-reservation-actions">

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedReservation(
                                  reservation
                                )
                              }
                            >
                              View Details
                              <span>→</span>
                            </button>

                            {reservation.status ===
                              "Upcoming" && (
                              <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                  setCancelReservation(
                                    reservation
                                  )
                                }
                              >
                                Cancel
                              </button>
                            )}

                          </div>

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

            </div>

          )}

          {/* =================================================
              CTA
          ================================================= */}

          <div className="customer-reservation-cta">

            <div>

              <span>
                READY FOR YOUR NEXT ESCAPE?
              </span>

              <h2>
                Discover Your{" "}
                <em>Perfect Stay</em>
              </h2>

              <p>
                Explore our rooms and find
                the perfect place for your
                next memorable journey.
              </p>

            </div>

            <Link href="/rooms">
              Explore Rooms
              <span>→</span>
            </Link>

          </div>

        </section>

      </div>

      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      {selectedReservation && (

        <div
          className="customer-reservation-modal-overlay"
          onClick={() =>
            setSelectedReservation(null)
          }
        >

          <div
            className="customer-reservation-details-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="customer-modal-close"
              onClick={() =>
                setSelectedReservation(null)
              }
            >
              ×
            </button>

            {/* HEADER */}

            <div className="customer-modal-header">

              <span>
                RESERVATION DETAILS
              </span>

              <h2>
                {
                  selectedReservation.room
                    ?.name ||
                  "StaySphere Room"
                }
              </h2>

              <p>
                Reservation ID:{" "}
                <strong>
                  {
                    selectedReservation.reservationId
                  }
                </strong>
              </p>

            </div>

            {/* IMAGE */}

            <div className="customer-modal-image">

              <img
                src={
                  selectedReservation.room
                    ?.image ||
                  "/images/hero-hotel.jpg"
                }
                alt={
                  selectedReservation.room
                    ?.name ||
                  "Hotel Room"
                }
              />

            </div>

            {/* INFO */}

            <div className="customer-modal-info-grid">

              <div>
                <span>
                  CHECK-IN
                </span>

                <strong>
                  {formatDate(
                    selectedReservation.stay
                      ?.checkIn
                  )}
                </strong>
              </div>

              <div>
                <span>
                  CHECK-OUT
                </span>

                <strong>
                  {formatDate(
                    selectedReservation.stay
                      ?.checkOut
                  )}
                </strong>
              </div>

              <div>
                <span>
                  GUESTS
                </span>

                <strong>
                  {
                    selectedReservation.stay
                      ?.guests
                  }
                </strong>
              </div>

              <div>
                <span>
                  NIGHTS
                </span>

                <strong>
                  {
                    selectedReservation.stay
                      ?.nights
                  }
                </strong>
              </div>

              <div>
                <span>
                  GUEST NAME
                </span>

                <strong>
                  {
                    selectedReservation.guest
                      ?.firstName
                  }{" "}
                  {
                    selectedReservation.guest
                      ?.lastName
                  }
                </strong>
              </div>

              <div>
                <span>
                  PHONE
                </span>

                <strong>
                  {
                    selectedReservation.guest
                      ?.phone
                  }
                </strong>
              </div>

              <div>
                <span>
                  PAYMENT METHOD
                </span>

                <strong>
                  {formatPaymentMethod(
                    selectedReservation.paymentMethod
                  )}
                </strong>
              </div>

              <div>
                <span>
                  PAYMENT STATUS
                </span>

                <strong>
                  {
                    selectedReservation.paymentStatus
                  }
                </strong>
              </div>

            </div>

            {/* TOTAL */}

            <div className="customer-modal-total">

              <span>
                TOTAL AMOUNT
              </span>

              <strong>
                ₹
                {Number(
                  selectedReservation.pricing
                    ?.total || 0
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            {/* ACTIONS */}

            <div className="customer-modal-actions">

              <Link href="/rooms">
                Book Another Room
              </Link>

              {selectedReservation.status ===
                "Upcoming" && (
                <button
                  type="button"
                  onClick={() => {
                    setCancelReservation(
                      selectedReservation
                    );

                    setSelectedReservation(
                      null
                    );
                  }}
                >
                  Cancel Reservation
                </button>
              )}

            </div>

          </div>

        </div>

      )}

      {/* =================================================
          CANCEL MODAL
      ================================================= */}

      {cancelReservation && (

        <div
          className="customer-reservation-modal-overlay"
          onClick={() =>
            setCancelReservation(null)
          }
        >

          <div
            className="customer-cancel-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="customer-cancel-icon">
              !
            </div>

            <span>
              RESERVATION MANAGEMENT
            </span>

            <h2>
              Cancel Reservation?
            </h2>

            <p>
              Are you sure you want to
              cancel your reservation?
            </p>

            <div className="customer-cancel-booking">

              <span>
                RESERVATION
              </span>

              <strong>
                {
                  cancelReservation.reservationId
                }
              </strong>

            </div>

            <div className="customer-cancel-actions">

              <button
                type="button"
                onClick={() =>
                  setCancelReservation(null)
                }
              >
                Keep Reservation
              </button>

              <button
                type="button"
                onClick={
                  confirmCancellation
                }
              >
                Cancel Reservation
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}