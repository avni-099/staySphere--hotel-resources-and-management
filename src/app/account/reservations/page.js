"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const initialReservations = [
  {
    id: "STY-1001",
    room: "Deluxe Room",
    category: "DELUXE",
    image: "/images/gallery-room.jpg",
    checkIn: "24 Sep 2026",
    checkOut: "27 Sep 2026",
    guests: 2,
    nights: 3,
    amount: 10500,
    payment: "Payment Successful",
    status: "Upcoming",
    bookingDate: "18 Sep 2026",
    roomNumber: "204",
  },
  {
    id: "STY-0987",
    room: "Premium Room",
    category: "PREMIUM",
    image: "/images/gallery-suite.jpg",
    checkIn: "12 Aug 2026",
    checkOut: "14 Aug 2026",
    guests: 2,
    nights: 2,
    amount: 8400,
    payment: "Payment Successful",
    status: "Completed",
    bookingDate: "05 Aug 2026",
    roomNumber: "305",
  },
  {
    id: "STY-0942",
    room: "Classic Room",
    category: "CLASSIC",
    image: "/images/gallery-room.jpg",
    checkIn: "05 Jul 2026",
    checkOut: "07 Jul 2026",
    guests: 2,
    nights: 2,
    amount: 6000,
    payment: "Payment Successful",
    status: "Completed",
    bookingDate: "28 Jun 2026",
    roomNumber: "112",
  },
  {
    id: "STY-0891",
    room: "Luxury Suite",
    category: "SUITE",
    image: "/images/gallery-suite.jpg",
    checkIn: "18 May 2026",
    checkOut: "20 May 2026",
    guests: 3,
    nights: 2,
    amount: 9800,
    payment: "Refunded",
    status: "Cancelled",
    bookingDate: "10 May 2026",
    roomNumber: "501",
  },
];

export default function AccountReservationsPage() {
  const [reservations, setReservations] =
    useState(initialReservations);

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedReservation, setSelectedReservation] =
    useState(null);
  const [cancelReservation, setCancelReservation] =
    useState(null);

  const filters = [
    "All",
    "Upcoming",
    "Completed",
    "Cancelled",
  ];

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesFilter =
        activeFilter === "All" ||
        reservation.status === activeFilter;

      const searchText = search.toLowerCase();

      const matchesSearch =
        reservation.id.toLowerCase().includes(searchText) ||
        reservation.room.toLowerCase().includes(searchText) ||
        reservation.category.toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [reservations, activeFilter, search]);

  const upcomingCount = reservations.filter(
    (item) => item.status === "Upcoming"
  ).length;

  const completedCount = reservations.filter(
    (item) => item.status === "Completed"
  ).length;

  const cancelledCount = reservations.filter(
    (item) => item.status === "Cancelled"
  ).length;

  const handleCancelReservation = () => {
    if (!cancelReservation) return;

    setReservations((previous) =>
      previous.map((reservation) =>
        reservation.id === cancelReservation.id
          ? {
              ...reservation,
              status: "Cancelled",
              payment: "Refunded",
            }
          : reservation
      )
    );

    setCancelReservation(null);
    setSelectedReservation(null);
  };

  return (
    <main className="customer-reservations-page">
      {/* NAVBAR */}
      <header className="customer-reservations-navbar">
        <div className="customer-reservations-navbar-inner">
          <Link href="/" className="customer-reservations-brand">
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
              A
            </Link>
          </div>
        </div>
      </header>

      <div className="customer-reservations-layout">
        {/* SIDEBAR */}
        <aside className="customer-reservations-sidebar">
          <div className="customer-reservations-sidebar-profile">
            <div className="customer-reservations-big-avatar">
              A
            </div>

            <div>
              <strong>StaySphere Guest</strong>
              <span>Customer Account</span>
            </div>
          </div>

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
              <span>◇</span>
              Book a Room
            </Link>

            <Link href="/contact">
              <span>?</span>
              Contact Support
            </Link>
          </nav>

          <div className="customer-reservations-sidebar-bottom">
            <Link href="/">
              ← Back to Website
            </Link>
          </div>
        </aside>

        {/* MAIN */}
        <section className="customer-reservations-main">
          {/* PAGE HEADER */}
          <div className="customer-reservations-heading">
            <div>
              <span>MY ACCOUNT</span>

              <h1>
                My <em>Reservations.</em>
              </h1>

              <p>
                View and manage all your StaySphere bookings
                in one place.
              </p>
            </div>

            <Link
              href="/rooms"
              className="customer-reservations-heading-btn"
            >
              Book a New Room
              <span>→</span>
            </Link>
          </div>

          {/* SUMMARY */}
          <div className="customer-reservation-summary">
            <div>
              <span>Total Bookings</span>
              <strong>{reservations.length}</strong>
            </div>

            <div>
              <span>Upcoming</span>
              <strong>{upcomingCount}</strong>
            </div>

            <div>
              <span>Completed</span>
              <strong>{completedCount}</strong>
            </div>

            <div>
              <span>Cancelled</span>
              <strong>{cancelledCount}</strong>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="customer-reservation-toolbar">
            <div className="customer-reservation-tabs">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={
                    activeFilter === filter ? "active" : ""
                  }
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="customer-reservation-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search booking..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>
          </div>

          {/* RESERVATIONS */}
          <div className="customer-reservation-list">
            {filteredReservations.length === 0 ? (
              <div className="customer-reservation-empty">
                <div>▣</div>

                <h2>No Reservations Found</h2>

                <p>
                  We couldn't find any booking matching your
                  search or selected filter.
                </p>

                <Link href="/rooms">
                  Explore Rooms →
                </Link>
              </div>
            ) : (
              filteredReservations.map((reservation) => (
                <article
                  className="customer-reservation-card"
                  key={reservation.id}
                >
                  {/* IMAGE */}
                  <div className="customer-reservation-image">
                    <img
                      src={reservation.image}
                      alt={reservation.room}
                    />

                    <span
                      className={`customer-status ${reservation.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {reservation.status}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="customer-reservation-content">
                    <div className="customer-reservation-top">
                      <div>
                        <span className="customer-room-category">
                          {reservation.category}
                        </span>

                        <h2>{reservation.room}</h2>

                        <p>
                          Reservation #
                          <strong>{reservation.id}</strong>
                        </p>
                      </div>

                      <div className="customer-reservation-price">
                        <span>TOTAL</span>

                        <strong>
                          ₹
                          {reservation.amount.toLocaleString(
                            "en-IN"
                          )}
                        </strong>
                      </div>
                    </div>

                    <div className="customer-reservation-details">
                      <div>
                        <span>CHECK-IN</span>
                        <strong>
                          {reservation.checkIn}
                        </strong>
                      </div>

                      <div>
                        <span>CHECK-OUT</span>
                        <strong>
                          {reservation.checkOut}
                        </strong>
                      </div>

                      <div>
                        <span>GUESTS</span>
                        <strong>
                          {reservation.guests} Guests
                        </strong>
                      </div>

                      <div>
                        <span>NIGHTS</span>
                        <strong>
                          {reservation.nights}
                        </strong>
                      </div>
                    </div>

                    <div className="customer-reservation-bottom">
                      <div className="customer-payment-status">
                        <span>PAYMENT</span>

                        <strong
                          className={
                            reservation.payment ===
                            "Refunded"
                              ? "refunded"
                              : ""
                          }
                        >
                          {reservation.payment}
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

                        {reservation.status === "Upcoming" && (
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
              ))
            )}
          </div>

          {/* BOTTOM CTA */}
          <div className="customer-reservation-cta">
            <div>
              <span>PLAN YOUR NEXT STAY</span>

              <h2>
                Ready for another
                <em> StaySphere experience?</em>
              </h2>

              <p>
                Discover our rooms, suites and personalized
                hospitality.
              </p>
            </div>

            <Link href="/rooms">
              Explore Rooms
              <span>→</span>
            </Link>
          </div>
        </section>
      </div>

      {/* DETAILS MODAL */}
      {selectedReservation && (
        <div
          className="customer-reservation-modal-overlay"
          onClick={() => setSelectedReservation(null)}
        >
          <div
            className="customer-reservation-details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="customer-modal-close"
              onClick={() => setSelectedReservation(null)}
            >
              ×
            </button>

            <div className="customer-modal-header">
              <span>RESERVATION DETAILS</span>

              <h2>{selectedReservation.room}</h2>

              <p>
                Reservation #
                <strong>{selectedReservation.id}</strong>
              </p>
            </div>

            <div className="customer-modal-image">
              <img
                src={selectedReservation.image}
                alt={selectedReservation.room}
              />
            </div>

            <div className="customer-modal-info-grid">
              <div>
                <span>STATUS</span>
                <strong>
                  {selectedReservation.status}
                </strong>
              </div>

              <div>
                <span>ROOM</span>
                <strong>
                  Room {selectedReservation.roomNumber}
                </strong>
              </div>

              <div>
                <span>CHECK-IN</span>
                <strong>
                  {selectedReservation.checkIn}
                </strong>
              </div>

              <div>
                <span>CHECK-OUT</span>
                <strong>
                  {selectedReservation.checkOut}
                </strong>
              </div>

              <div>
                <span>GUESTS</span>
                <strong>
                  {selectedReservation.guests} Guests
                </strong>
              </div>

              <div>
                <span>NIGHTS</span>
                <strong>
                  {selectedReservation.nights} Nights
                </strong>
              </div>

              <div>
                <span>BOOKED ON</span>
                <strong>
                  {selectedReservation.bookingDate}
                </strong>
              </div>

              <div>
                <span>PAYMENT</span>
                <strong>
                  {selectedReservation.payment}
                </strong>
              </div>
            </div>

            <div className="customer-modal-total">
              <span>TOTAL AMOUNT</span>

              <strong>
                ₹
                {selectedReservation.amount.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div className="customer-modal-actions">
              <Link href="/contact">
                Need Help?
              </Link>

              {selectedReservation.status === "Upcoming" && (
                <button
                  type="button"
                  onClick={() => {
                    setCancelReservation(
                      selectedReservation
                    );
                    setSelectedReservation(null);
                  }}
                >
                  Cancel Reservation
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CANCEL MODAL */}
      {cancelReservation && (
        <div
          className="customer-reservation-modal-overlay"
          onClick={() => setCancelReservation(null)}
        >
          <div
            className="customer-cancel-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="customer-cancel-icon">!</div>

            <span>CANCEL RESERVATION</span>

            <h2>Are you sure?</h2>

            <p>
              You are about to cancel your reservation for{" "}
              <strong>
                {cancelReservation.room}
              </strong>
              .
            </p>

            <div className="customer-cancel-booking">
              <span>{cancelReservation.id}</span>
              <strong>
                {cancelReservation.checkIn} →{" "}
                {cancelReservation.checkOut}
              </strong>
            </div>

            <div className="customer-cancel-actions">
              <button
                type="button"
                onClick={() => setCancelReservation(null)}
              >
                Keep Reservation
              </button>

              <button
                type="button"
                onClick={handleCancelReservation}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}