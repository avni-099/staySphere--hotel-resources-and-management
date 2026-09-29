"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const upcomingBooking = {
  id: "STY-1001",
  room: "Deluxe Room",
  category: "DELUXE",
  image: "/images/gallery-room.jpg",
  checkIn: "24 Sep 2026",
  checkOut: "27 Sep 2026",
  nights: 3,
  guests: 2,
  amount: 10500,
  status: "Confirmed",
};

const recentBookings = [
  {
    id: "STY-0987",
    room: "Premium Room",
    date: "12 Aug 2026",
    nights: 2,
    amount: 8400,
    status: "Completed",
  },
  {
    id: "STY-0942",
    room: "Classic Room",
    date: "05 Jul 2026",
    nights: 2,
    amount: 6000,
    status: "Completed",
  },
];

export default function AccountPage() {
  const [user, setUser] = useState({
    name: "Guest",
    email: "",
    phone: "",
  });

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("staySphereUser");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        setUser({
          name: parsedUser.name || "Guest",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
        });
      } catch {
        setUser({
          name: "Guest",
          email: "",
          phone: "",
        });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("staySphereUser");
    window.location.href = "/";
  };

  const firstName = user.name
    ? user.name.split(" ")[0]
    : "Guest";

  return (
    <main className="account-page">
      {/* TOP NAVBAR */}
      <header className="account-navbar">
        <div className="account-navbar-inner">
          <Link href="/" className="account-brand">
            Stay<span>Sphere</span>
          </Link>

          <div className="account-nav-right">
            <Link href="/rooms" className="account-book-button">
              Book a Room
            </Link>

            <div className="account-avatar">
              {firstName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <div className="account-layout">
        {/* SIDEBAR */}
        <aside className="account-sidebar">
          <div className="account-profile-mini">
            <div className="account-large-avatar">
              {firstName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user.name}</strong>
              <span>StaySphere Guest</span>
            </div>
          </div>

          <nav className="account-sidebar-nav">
            <button
              type="button"
              className={
                activeMenu === "dashboard" ? "active" : ""
              }
              onClick={() => setActiveMenu("dashboard")}
            >
              <span>⌂</span>
              Dashboard
            </button>

            <Link
              href="/account/reservations"
              className={
                activeMenu === "reservations" ? "active" : ""
              }
              onClick={() => setActiveMenu("reservations")}
            >
              <span>▣</span>
              My Reservations
            </Link>

            <button
              type="button"
              className={
                activeMenu === "profile" ? "active" : ""
              }
              onClick={() => setActiveMenu("profile")}
            >
              <span>●</span>
              My Profile
            </button>

            <button
              type="button"
              className={
                activeMenu === "preferences" ? "active" : ""
              }
              onClick={() => setActiveMenu("preferences")}
            >
              <span>◇</span>
              Preferences
            </button>
          </nav>

          <div className="account-sidebar-bottom">
            <Link href="/">
              <span>←</span>
              Back to Website
            </Link>

            <button
              type="button"
              onClick={() => setShowLogout(true)}
            >
              <span>↪</span>
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <section className="account-main">
          {/* DASHBOARD */}
          {activeMenu === "dashboard" && (
            <>
              <div className="account-page-heading">
                <div>
                  <span>MY ACCOUNT</span>

                  <h1>
                    Welcome back,
                    <em>{firstName}.</em>
                  </h1>

                  <p>
                    Here's everything you need for your StaySphere
                    experience.
                  </p>
                </div>

                <Link
                  href="/rooms"
                  className="account-heading-button"
                >
                  Find a Room
                  <span>→</span>
                </Link>
              </div>

              {/* STATS */}
              <div className="account-stats">
                <div className="account-stat-card">
                  <span className="account-stat-icon">▣</span>

                  <div>
                    <strong>3</strong>
                    <span>Total Bookings</span>
                  </div>
                </div>

                <div className="account-stat-card">
                  <span className="account-stat-icon">◷</span>

                  <div>
                    <strong>1</strong>
                    <span>Upcoming Stay</span>
                  </div>
                </div>

                <div className="account-stat-card">
                  <span className="account-stat-icon">✓</span>

                  <div>
                    <strong>2</strong>
                    <span>Completed Stays</span>
                  </div>
                </div>

                <div className="account-stat-card">
                  <span className="account-stat-icon">✦</span>

                  <div>
                    <strong>4.9</strong>
                    <span>Guest Rating</span>
                  </div>
                </div>
              </div>

              {/* UPCOMING STAY */}
              <section className="account-upcoming">
                <div className="account-section-heading">
                  <div>
                    <span>UPCOMING STAY</span>
                    <h2>Your Next Stay</h2>
                  </div>

                  <Link href="/account/reservations">
                    View All
                    <span>→</span>
                  </Link>
                </div>

                <div className="account-upcoming-card">
                  <div className="account-upcoming-image">
                    <img
                      src={upcomingBooking.image}
                      alt={upcomingBooking.room}
                    />

                    <span>{upcomingBooking.status}</span>
                  </div>

                  <div className="account-upcoming-content">
                    <div>
                      <span className="account-room-category">
                        {upcomingBooking.category}
                      </span>

                      <h3>{upcomingBooking.room}</h3>

                      <p>
                        Reservation #{upcomingBooking.id}
                      </p>
                    </div>

                    <div className="account-stay-details">
                      <div>
                        <span>CHECK-IN</span>
                        <strong>
                          {upcomingBooking.checkIn}
                        </strong>
                      </div>

                      <div>
                        <span>CHECK-OUT</span>
                        <strong>
                          {upcomingBooking.checkOut}
                        </strong>
                      </div>

                      <div>
                        <span>GUESTS</span>
                        <strong>
                          {upcomingBooking.guests} Guests
                        </strong>
                      </div>

                      <div>
                        <span>TOTAL</span>
                        <strong>
                          ₹
                          {upcomingBooking.amount.toLocaleString(
                            "en-IN"
                          )}
                        </strong>
                      </div>
                    </div>

                    <div className="account-upcoming-actions">
                      <Link
                        href="/account/reservations"
                        className="account-view-button"
                      >
                        View Reservation
                        <span>→</span>
                      </Link>

                      <Link
                        href="/contact"
                        className="account-help-link"
                      >
                        Need Help?
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              {/* RECENT BOOKINGS */}
              <section className="account-recent">
                <div className="account-section-heading">
                  <div>
                    <span>BOOKING HISTORY</span>
                    <h2>Recent Reservations</h2>
                  </div>

                  <Link href="/account/reservations">
                    All Reservations
                    <span>→</span>
                  </Link>
                </div>

                <div className="account-recent-list">
                  {recentBookings.map((booking) => (
                    <div
                      className="account-recent-row"
                      key={booking.id}
                    >
                      <div className="account-recent-room">
                        <div className="account-recent-icon">
                          ▣
                        </div>

                        <div>
                          <strong>{booking.room}</strong>

                          <span>
                            #{booking.id} · {booking.date}
                          </span>
                        </div>
                      </div>

                      <div className="account-recent-nights">
                        <span>NIGHTS</span>
                        <strong>{booking.nights}</strong>
                      </div>

                      <div className="account-recent-amount">
                        <span>AMOUNT</span>
                        <strong>
                          ₹
                          {booking.amount.toLocaleString(
                            "en-IN"
                          )}
                        </strong>
                      </div>

                      <span className="account-completed">
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* QUICK ACTIONS */}
              <section className="account-quick">
                <div className="account-section-heading">
                  <div>
                    <span>QUICK ACTIONS</span>
                    <h2>What Would You Like To Do?</h2>
                  </div>
                </div>

                <div className="account-quick-grid">
                  <Link
                    href="/rooms"
                    className="account-quick-card"
                  >
                    <span>◇</span>
                    <h3>Book a Room</h3>
                    <p>
                      Find the perfect room for your next stay.
                    </p>
                    <strong>Explore Rooms →</strong>
                  </Link>

                  <Link
                    href="/account/reservations"
                    className="account-quick-card"
                  >
                    <span>▣</span>
                    <h3>My Reservations</h3>
                    <p>
                      View and manage all your hotel bookings.
                    </p>
                    <strong>View Bookings →</strong>
                  </Link>

                  <button
                    type="button"
                    className="account-quick-card"
                    onClick={() => setActiveMenu("profile")}
                  >
                    <span>●</span>
                    <h3>My Profile</h3>
                    <p>
                      Review your personal account information.
                    </p>
                    <strong>View Profile →</strong>
                  </button>
                </div>
              </section>
            </>
          )}

          {/* PROFILE */}
          {activeMenu === "profile" && (
            <section className="account-simple-section">
              <div className="account-page-heading">
                <div>
                  <span>ACCOUNT</span>
                  <h1>
                    My <em>Profile.</em>
                  </h1>
                  <p>
                    Your personal information associated with
                    your StaySphere account.
                  </p>
                </div>
              </div>

              <div className="account-profile-card">
                <div className="account-profile-header">
                  <div className="account-large-avatar">
                    {firstName.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <span>STAYSPHERE GUEST</span>
                    <h2>{user.name}</h2>
                  </div>
                </div>

                <div className="account-profile-details">
                  <div>
                    <span>FULL NAME</span>
                    <strong>{user.name}</strong>
                  </div>

                  <div>
                    <span>EMAIL ADDRESS</span>
                    <strong>
                      {user.email || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>MOBILE NUMBER</span>
                    <strong>
                      {user.phone || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>MEMBERSHIP</span>
                    <strong>StaySphere Guest</strong>
                  </div>
                </div>

                <p className="account-demo-note">
                  Profile editing will be connected to the backend
                  authentication system later.
                </p>
              </div>
            </section>
          )}

          {/* PREFERENCES */}
          {activeMenu === "preferences" && (
            <section className="account-simple-section">
              <div className="account-page-heading">
                <div>
                  <span>ACCOUNT</span>
                  <h1>
                    My <em>Preferences.</em>
                  </h1>
                  <p>
                    Your hotel experience preferences will appear
                    here.
                  </p>
                </div>
              </div>

              <div className="account-preferences-card">
                <div>
                  <span>EMAIL UPDATES</span>
                  <strong>Booking confirmations & updates</strong>
                  <small>
                    Receive important information about your
                    reservations.
                  </small>
                </div>

                <label className="account-toggle">
                  <input type="checkbox" defaultChecked />
                  <span />
                </label>
              </div>

              <div className="account-preferences-card">
                <div>
                  <span>SPECIAL OFFERS</span>
                  <strong>StaySphere offers & promotions</strong>
                  <small>
                    Receive occasional hotel offers and special
                    packages.
                  </small>
                </div>

                <label className="account-toggle">
                  <input type="checkbox" />
                  <span />
                </label>
              </div>

              <div className="account-preferences-card">
                <div>
                  <span>REMINDERS</span>
                  <strong>Upcoming stay reminders</strong>
                  <small>
                    Get reminders before your check-in date.
                  </small>
                </div>

                <label className="account-toggle">
                  <input type="checkbox" defaultChecked />
                  <span />
                </label>
              </div>
            </section>
          )}
        </section>
      </div>

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div
          className="account-modal-overlay"
          onClick={() => setShowLogout(false)}
        >
          <div
            className="account-logout-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="account-modal-icon">↪</div>

            <span>LOG OUT</span>

            <h2>Leave StaySphere?</h2>

            <p>
              You can sign in again anytime to access your
              reservations and account.
            </p>

            <div className="account-modal-actions">
              <button
                type="button"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}