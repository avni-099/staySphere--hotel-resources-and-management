"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const rooms = [
  {
    id: 1,
    name: "Deluxe Room",
    category: "DELUXE",
    price: 3500,
    guests: 2,
    bed: "King Bed",
    size: "320 sq.ft.",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
    description:
      "A beautifully designed room offering a peaceful atmosphere, elegant interiors and everything you need for a comfortable stay.",
    amenities: ["Free WiFi", "Breakfast", "Smart TV", "Room Service"],
  },
  {
    id: 2,
    name: "Premium Room",
    category: "PREMIUM",
    price: 4200,
    guests: 2,
    bed: "King Bed",
    size: "380 sq.ft.",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
    description:
      "A spacious premium room with refined interiors, comfortable furnishings and thoughtful amenities for a relaxing stay.",
    amenities: ["Free WiFi", "Breakfast", "Mini Bar", "Room Service"],
  },
  {
    id: 3,
    name: "Luxury Suite",
    category: "SUITE",
    price: 4900,
    guests: 3,
    bed: "King Bed",
    size: "520 sq.ft.",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
    description:
      "Experience elevated comfort in our luxury suite featuring generous space, elegant design and premium hospitality.",
    amenities: ["Free WiFi", "Breakfast", "Living Area", "Pool Access"],
  },
  {
    id: 4,
    name: "Executive Suite",
    category: "SUITE",
    price: 5400,
    guests: 3,
    bed: "King Bed",
    size: "580 sq.ft.",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    description:
      "Our spacious executive suite combines sophisticated interiors with extra living space for a luxurious experience.",
    amenities: ["Free WiFi", "Breakfast", "Living Room", "Bathtub"],
  },
  {
    id: 5,
    name: "Family Premium Room",
    category: "FAMILY",
    price: 4600,
    guests: 4,
    bed: "King + Sofa Bed",
    size: "450 sq.ft.",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
    description:
      "A comfortable family-friendly room designed with extra space and convenient amenities for a relaxing family stay.",
    amenities: ["Free WiFi", "Breakfast", "Smart TV", "Extra Bed"],
  },
  {
    id: 6,
    name: "Classic Room",
    category: "CLASSIC",
    price: 3000,
    guests: 2,
    bed: "Queen Bed",
    size: "280 sq.ft.",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=85",
    description:
      "A warm and comfortable room offering all the essentials for a pleasant and memorable StaySphere experience.",
    amenities: ["Free WiFi", "Breakfast", "Smart TV", "Parking"],
  },
];

const categories = [
  "ALL",
  "DELUXE",
  "PREMIUM",
  "SUITE",
  "FAMILY",
  "CLASSIC",
];

export default function RoomsPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("recommended");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
const [selectedRoomId, setSelectedRoomId] = useState(null);

  const filteredRooms = useMemo(() => {
    let result =
      activeCategory === "ALL"
        ? [...rooms]
        : rooms.filter(
            (room) => room.category === activeCategory
          );

    if (sortBy === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, sortBy]);

  const handleBookNow = (roomId) => {
  const savedUser = localStorage.getItem("staySphereUser");

  let isLoggedIn = false;

  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      isLoggedIn = user?.loggedIn === true;
    } catch {
      isLoggedIn = false;
    }
  }

  if (isLoggedIn) {
    window.location.href = `/booking?room=${roomId}`;
    return;
  }

  setSelectedRoomId(roomId);
  setLoginModalOpen(true);
};

  return (
    <>
      {/* Navbar */}

      <header className="rooms-page-navbar">
        <div className="rooms-page-navbar-inner">

          <Link href="/" className="rooms-page-brand">
            Stay<span>Sphere</span>
          </Link>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/rooms" className="active">
              Rooms
            </Link>
            <Link href="/facilities">Facilities</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="rooms-page-actions">
            <Link href="/login" className="rooms-page-login">
              Login
            </Link>

            <Link href="/rooms" className="rooms-page-book">
              Book Now
            </Link>
          </div>

        </div>
      </header>

      <main className="rooms-page">

        {/* Hero */}

        <section className="rooms-list-hero">
          <div className="rooms-list-hero-overlay"></div>

          <div className="rooms-list-hero-content">
            <span>STAYSPHERE ACCOMMODATION</span>

            <h1>
              Find Your
              <em>Perfect Stay.</em>
            </h1>

            <p>
              Discover beautifully designed rooms and suites
              created for comfort, relaxation and memorable stays.
            </p>
          </div>
        </section>

        {/* Rooms content */}

        <section className="rooms-list-section">

          <div className="rooms-list-container">

            <div className="rooms-list-heading">

              <div>
                <span>OUR ROOMS</span>

                <h2>
                  Choose Your
                  <em>Ideal Room.</em>
                </h2>
              </div>

              <p>
                Whether you are travelling for business, leisure
                or a family getaway, find a space that feels like
                your own.
              </p>

            </div>

            {/* Filters */}

            <div className="rooms-filter-bar">

              <div className="rooms-categories">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={
                      activeCategory === category
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveCategory(category)
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="rooms-sort">

                <label htmlFor="room-sort">
                  SORT BY
                </label>

                <select
                  id="room-sort"
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                >
                  <option value="recommended">
                    Recommended
                  </option>

                  <option value="low">
                    Price: Low to High
                  </option>

                  <option value="high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Highest Rated
                  </option>
                </select>

              </div>

            </div>

            {/* Result count */}

            <div className="rooms-result-count">
              Showing{" "}
              <strong>{filteredRooms.length}</strong>{" "}
              {filteredRooms.length === 1
                ? "room"
                : "rooms"}
            </div>

            {/* Room Grid */}

            <div className="rooms-list-grid">

              {filteredRooms.map((room) => (
                <article
                  className="rooms-list-card"
                  key={room.id}
                >

                  <div className="rooms-list-image">

                    <img
                      src={room.image}
                      alt={room.name}
                    />

                    <span className="rooms-list-category">
                      {room.category}
                    </span>

                    <div className="rooms-list-rating">
                      ★ {room.rating}
                    </div>

                  </div>

                  <div className="rooms-list-card-content">

                    <h3>{room.name}</h3>

                    <div className="rooms-list-meta">
                      <span>{room.bed}</span>
                      <span>{room.guests} Guests</span>
                      <span>{room.size}</span>
                    </div>

                    <p>
                      {room.description}
                    </p>

                    <div className="rooms-list-amenities">
                      {room.amenities
                        .slice(0, 3)
                        .map((amenity) => (
                          <span key={amenity}>
                            {amenity}
                          </span>
                        ))}
                    </div>

                    <div className="rooms-list-card-bottom">

                      <div className="rooms-list-price">
                        <strong>
                          ₹{room.price.toLocaleString("en-IN")}
                        </strong>

                        <span>/ night</span>
                      </div>

                      <div className="rooms-list-buttons">

                        <Link
                          href={`/rooms/${room.id}`}
                          className="rooms-view-button"
                        >
                          View Details
                        </Link>

                        <button
  type="button"
  className="rooms-book-button"
  onClick={() => handleBookNow(room.id)}
>
  Book Now
  <span>→</span>
</button>

                      </div>

                    </div>

                  </div>

                </article>
              ))}

            </div>

          </div>

        </section>

        {/* Bottom CTA */}

        <section className="rooms-page-cta">

          <div>
            <span>READY FOR YOUR STAY?</span>

            <h2>
              Your Comfortable Stay
              <em>Starts Here.</em>
            </h2>
          </div>

          <Link href="/booking">
            Book Your Stay
            <span>→</span>
          </Link>

        </section>

        {loginModalOpen && (
  <div
    className="rooms-login-modal-overlay"
    onClick={() => setLoginModalOpen(false)}
  >
    <div
      className="rooms-login-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="rooms-login-modal-close"
        onClick={() => setLoginModalOpen(false)}
        aria-label="Close"
      >
        ×
      </button>

      <div className="rooms-login-modal-icon">
        🔐
      </div>

      <span className="rooms-login-modal-label">
        LOGIN REQUIRED
      </span>

      <h2>Login to Book Your Stay</h2>

      <p>
        Please login to your StaySphere account before
        booking a room. Your selected room will be
        kept for you.
      </p>

      <div className="rooms-login-modal-actions">
        <button
          type="button"
          className="rooms-login-cancel"
          onClick={() => setLoginModalOpen(false)}
        >
          Cancel
        </button>

        <Link
          href={
            selectedRoomId
              ? `/login?redirect=/booking?room=${selectedRoomId}`
              : "/login"
          }
          className="rooms-login-proceed"
          onClick={() => setLoginModalOpen(false)}
        >
          Login Now
          <span>→</span>
        </Link>
      </div>
    </div>
  </div>
)}

      </main>
    </>
  );
}