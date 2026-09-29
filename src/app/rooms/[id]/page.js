"use client";

import Link from "next/link";
import { use, useMemo, useState } from "react";

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
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "Our Deluxe Room is thoughtfully designed for guests who appreciate comfort, elegance and a peaceful atmosphere. Enjoy a beautifully furnished space with premium bedding, modern amenities and everything you need for a relaxing StaySphere experience.",
    amenities: [
      "Free WiFi",
      "Breakfast Included",
      "Smart TV",
      "Room Service",
      "Air Conditioning",
      "Tea & Coffee",
      "Daily Housekeeping",
      "24/7 Guest Support",
    ],
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
    reviews: 168,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "The Premium Room combines sophisticated interiors with generous space and thoughtful amenities. It is ideal for couples, business travellers and guests looking for a refined hotel experience.",
    amenities: [
      "Free WiFi",
      "Breakfast Included",
      "Mini Bar",
      "Smart TV",
      "Room Service",
      "Air Conditioning",
      "Work Desk",
      "Daily Housekeeping",
    ],
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
    reviews: 203,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "Experience elevated comfort in our Luxury Suite. With a spacious bedroom, elegant living area and premium facilities, this suite is designed for guests who want something truly special.",
    amenities: [
      "Free WiFi",
      "Breakfast Included",
      "Living Area",
      "Pool Access",
      "Smart TV",
      "Mini Bar",
      "Bathtub",
      "24/7 Room Service",
    ],
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
    reviews: 96,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "Our Executive Suite offers generous living space, sophisticated interiors and premium facilities. A perfect choice for extended stays, celebrations and business travellers.",
    amenities: [
      "Free WiFi",
      "Breakfast Included",
      "Separate Living Room",
      "Bathtub",
      "Mini Bar",
      "Premium TV",
      "Work Desk",
      "24/7 Room Service",
    ],
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
    reviews: 87,
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "Designed for families, this spacious room provides comfortable sleeping arrangements, extra living space and convenient amenities for everyone.",
    amenities: [
      "Free WiFi",
      "Breakfast Included",
      "Sofa Bed",
      "Smart TV",
      "Extra Bed",
      "Air Conditioning",
      "Mini Fridge",
      "Daily Housekeeping",
    ],
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
    reviews: 75,
    images: [
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "Our Classic Room offers a warm and comfortable environment with all the essentials for a pleasant StaySphere experience.",
    amenities: [
      "Free WiFi",
      "Breakfast Included",
      "Smart TV",
      "Parking",
      "Air Conditioning",
      "Tea & Coffee",
      "Daily Housekeeping",
      "24/7 Support",
    ],
  },
];

export default function RoomDetailsPage({ params }) {
  const { id } = use(params);

  const room = useMemo(
    () => rooms.find((item) => item.id === Number(id)),
    [id]
  );

  const [activeImage, setActiveImage] = useState(0);
  const [guests, setGuests] = useState(1);

  if (!room) {
    return (
      <main className="room-not-found">
        <div>
          <span>STAYSPHERE</span>
          <h1>Room Not Found</h1>
          <p>
            The room you are looking for is not available.
          </p>
          <Link href="/rooms">
            ← Back to Rooms
          </Link>
        </div>
      </main>
    );
  }

  const totalGuests = Math.min(guests, room.guests);

  return (
    <main className="room-details-page">

      {/* Navbar */}

      <header className="room-details-navbar">
        <div className="room-details-navbar-inner">

          <Link
            href="/"
            className="room-details-brand"
          >
            Stay<span>Sphere</span>
          </Link>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/rooms" className="active">
              Rooms
            </Link>
            <Link href="/facilities">
              Facilities
            </Link>
            <Link href="/gallery">
              Gallery
            </Link>
            <Link href="/about">
              About
            </Link>
            <Link href="/contact">
              Contact
            </Link>
          </nav>

          <Link
            href="/login"
            className="room-details-login"
          >
            Login
          </Link>

        </div>
      </header>

      {/* Breadcrumb */}

      <div className="room-details-breadcrumb">
        <div>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/rooms">Rooms</Link>
          <span>/</span>
          <strong>{room.name}</strong>
        </div>
      </div>

      {/* Main Details */}

      <section className="room-details-section">

        <div className="room-details-container">

          {/* Gallery */}

          <div className="room-gallery">

            <div className="room-main-image">

              <img
                src={room.images[activeImage]}
                alt={room.name}
              />

              <span className="room-gallery-category">
                {room.category}
              </span>

              <div className="room-gallery-counter">
                {activeImage + 1} / {room.images.length}
              </div>

            </div>

            <div className="room-thumbnails">

              {room.images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={
                    activeImage === index
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveImage(index)
                  }
                >
                  <img
                    src={image}
                    alt={`${room.name} ${index + 1}`}
                  />
                </button>
              ))}

            </div>

          </div>

          {/* Information */}

          <div className="room-details-info">

            <span className="room-details-eyebrow">
              {room.category} ACCOMMODATION
            </span>

            <h1>{room.name}</h1>

            <div className="room-details-rating">
              <span>★</span>
              <strong>{room.rating}</strong>
              <span>
                ({room.reviews} guest reviews)
              </span>
            </div>

            <p className="room-details-description">
              {room.description}
            </p>

            {/* Room facts */}

            <div className="room-facts">

              <div>
                <span>BED</span>
                <strong>{room.bed}</strong>
              </div>

              <div>
                <span>GUESTS</span>
                <strong>{room.guests} Guests</strong>
              </div>

              <div>
                <span>SIZE</span>
                <strong>{room.size}</strong>
              </div>

            </div>

            {/* Amenities */}

            <div className="room-amenities">

              <h3>Room Amenities</h3>

              <div>
                {room.amenities.map((amenity) => (
                  <span key={amenity}>
                    ✓ {amenity}
                  </span>
                ))}
              </div>

            </div>

            {/* Booking Box */}

            <div className="room-booking-box">

              <div className="room-price">
                <span>FROM</span>

                <strong>
                  ₹{room.price.toLocaleString("en-IN")}
                </strong>

                <small>/ night</small>
              </div>

              <div className="room-guest-selector">

                <label htmlFor="room-guests">
                  GUESTS
                </label>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setGuests(
                        Math.max(1, guests - 1)
                      )
                    }
                    disabled={guests <= 1}
                  >
                    −
                  </button>

                  <strong>
                    {totalGuests}
                  </strong>

                  <button
                    type="button"
                    onClick={() =>
                      setGuests(
                        Math.min(
                          room.guests,
                          guests + 1
                        )
                      )
                    }
                    disabled={
                      guests >= room.guests
                    }
                  >
                    +
                  </button>
                </div>

              </div>

              <Link
                href={`/booking?room=${room.id}`}
                className="room-book-now"
              >
                Book This Room
                <span>→</span>
              </Link>

            </div>

            <p className="room-booking-note">
              ✓ Free cancellation according to booking policy
            </p>

          </div>

        </div>

      </section>

      {/* Experience Section */}

      <section className="room-experience">

        <div className="room-experience-container">

          <span>STAYSPHERE EXPERIENCE</span>

          <h2>
            Designed For
            <em>Comfort.</em>
          </h2>

          <p>
            Every StaySphere room is thoughtfully designed
            to give you a peaceful, comfortable and memorable
            experience from check-in to check-out.
          </p>

          <div className="room-experience-items">

            <div>
              <strong>24/7</strong>
              <span>Guest Support</span>
            </div>

            <div>
              <strong>4.9</strong>
              <span>Average Rating</span>
            </div>

            <div>
              <strong>15+</strong>
              <span>Beautiful Rooms</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Comfort Focused</span>
            </div>

          </div>

        </div>

      </section>

      {/* Bottom CTA */}

      <section className="room-details-cta">

        <div>
          <span>READY TO STAY?</span>

          <h2>
            Your Room Is
            <em>Waiting.</em>
          </h2>
        </div>

        <Link href={`/booking?room=${room.id}`}>
          Book Your Stay
          <span>→</span>
        </Link>

      </section>

    </main>
  );
}