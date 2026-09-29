"use client";

const reasons = [
  {
    number: "01",
    icon: "✦",
    title: "Premium Rooms",
    description:
      "Beautifully designed rooms with elegant interiors, comfortable bedding and thoughtful details.",
  },
  {
    number: "02",
    icon: "◇",
    title: "24/7 Guest Service",
    description:
      "Our team is available around the clock to make your stay comfortable and effortless.",
  },
  {
    number: "03",
    icon: "♢",
    title: "Safe & Secure",
    description:
      "Enjoy a peaceful stay with secure surroundings and reliable hotel services.",
  },
  {
    number: "04",
    icon: "✧",
    title: "Memorable Experience",
    description:
      "From relaxing spaces to attentive hospitality, every detail is designed around you.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="why-section">
      <div className="why-container">

        <div className="why-heading">
          <span className="why-eyebrow">
            WHY STAYSPHERE
          </span>

          <h2>
            Exceptional Hospitality
            <span>Designed Around You.</span>
          </h2>

          <p>
            More than just a place to stay, StaySphere brings
            together comfort, elegance and thoughtful hospitality
            for an experience worth remembering.
          </p>
        </div>


        <div className="why-grid">

          {reasons.map((item) => (
            <div
              className="why-card"
              key={item.number}
            >
              <div className="why-card-top">
                <span className="why-number">
                  {item.number}
                </span>

                <div className="why-icon">
                  {item.icon}
                </div>
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

              <div className="why-card-line"></div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}