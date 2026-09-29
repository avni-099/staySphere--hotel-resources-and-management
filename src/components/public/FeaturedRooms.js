const rooms = [
  {
    id: 1,
    name: "Deluxe Room",
    type: "King Bed • 2 Guests",
    price: "₹3,500",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
    description:
      "A beautifully designed room offering comfort, elegance and a relaxing atmosphere.",
  },
  {
    id: 2,
    name: "Premium Room",
    type: "King Bed • 2 Guests",
    price: "₹4,200",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
    description:
      "Enjoy refined interiors, premium amenities and a peaceful stay with modern comfort.",
  },
  {
    id: 3,
    name: "Luxury Suite",
    type: "King Bed • 3 Guests",
    price: "₹4,900",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
    description:
      "A spacious suite designed for guests who appreciate extra space and sophisticated living.",
  },
];

export default function FeaturedRooms() {
  return (
    <section className="featured-rooms">
      <div className="featured-rooms-container">

        {/* Section Heading */}
        <div className="rooms-heading">

          <div className="rooms-heading-left">
            <span className="rooms-eyebrow">
              STAYSPHERE ACCOMMODATION
            </span>

            <h2>
              Rooms Designed
              <span> For Your Comfort.</span>
            </h2>
          </div>

          <p>
            Discover thoughtfully designed rooms and suites where
            contemporary elegance meets the comfort of a memorable stay.
          </p>

        </div>

        {/* Room Cards */}
        <div className="rooms-grid">

          {rooms.map((room) => (
            <article className="room-card" key={room.id}>

              {/* Image */}
              <div className="room-image-wrapper">

                <img
                  src={room.image}
                  alt={room.name}
                  className="room-image"
                />

                <div className="room-image-overlay"></div>

                <span className="room-tag">
                  STAYSPHERE
                </span>

              </div>

              {/* Content */}
              <div className="room-card-content">

                <div className="room-title-row">
                  <h3>{room.name}</h3>

                  <div className="room-price">
                    <strong>{room.price}</strong>
                    <span>/ night</span>
                  </div>
                </div>

                <div className="room-type">
                  {room.type}
                </div>

                <p>
                  {room.description}
                </p>

                <div className="room-card-bottom">

                  <a href={`/rooms/${room.id}`}>
                    View Details
                    <span>→</span>
                  </a>

                  <span className="room-line"></span>

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* View All */}
        <div className="view-all-rooms">
          <a href="/rooms">
            View All Rooms
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}