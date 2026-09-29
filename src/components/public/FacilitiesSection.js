const facilities = [
  {
    number: "01",
    icon: "✦",
    title: "Luxury Rooms",
    description:
      "Elegant rooms with comfortable interiors, premium bedding and everything you need for a relaxing stay.",
  },
  {
    number: "02",
    icon: "♨",
    title: "Spa & Wellness",
    description:
      "Take a moment to unwind with relaxing wellness experiences designed to refresh your body and mind.",
  },
  {
    number: "03",
    icon: "⌁",
    title: "Fine Dining",
    description:
      "Enjoy delicious meals and carefully crafted dining experiences in a sophisticated setting.",
  },
  {
    number: "04",
    icon: "◉",
    title: "Swimming Pool",
    description:
      "Relax beside our beautifully designed pool and enjoy a peaceful escape during your stay.",
  },
  {
    number: "05",
    icon: "◇",
    title: "Free Parking",
    description:
      "Convenient and secure parking facilities are available for guests throughout their stay.",
  },
  {
    number: "06",
    icon: "◌",
    title: "High-Speed WiFi",
    description:
      "Stay connected with reliable high-speed WiFi available throughout the hotel.",
  },
];

export default function FacilitiesSection() {
  return (
    <section className="facilities-section">

      <div className="facilities-container">

        {/* Heading */}
        <div className="facilities-heading">

          <div>
            <span className="facilities-eyebrow">
              HOTEL EXPERIENCE
            </span>

            <h2>
              Everything You Need
              <span> For A Perfect Stay.</span>
            </h2>
          </div>

          <p>
            From relaxing wellness experiences to thoughtful everyday
            conveniences, StaySphere is designed to make every moment
            of your stay comfortable.
          </p>

        </div>


        {/* Facilities Grid */}
        <div className="facilities-grid">

          {facilities.map((facility) => (
            <div
              className="facility-card"
              key={facility.number}
            >

              <div className="facility-top">

                <span className="facility-number">
                  {facility.number}
                </span>

                <span className="facility-icon">
                  {facility.icon}
                </span>

              </div>

              <h3>
                {facility.title}
              </h3>

              <p>
                {facility.description}
              </p>

              <div className="facility-line"></div>

              <span className="facility-arrow">
                →
              </span>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}