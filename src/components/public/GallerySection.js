"use client";

import { useState } from "react";

const galleryItems = [
  {
    image: "/images/gallery-room.jpg",
    title: "Luxury Rooms",
    category: "ROOMS",
  },
  {
    image: "/images/gallery-dining.jpg",
    title: "Fine Dining",
    category: "DINING",
  },
  {
    image: "/images/gallery-pool.jpg",
    title: "Swimming Pool",
    category: "POOL",
  },
  {
    image: "/images/gallery-lobby.jpg",
    title: "Hotel Interior",
    category: "INTERIOR",
  },
  {
    image: "/images/gallery-suite.jpg",
    title: "Premium Suite",
    category: "ROOMS",
  },
];

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="gallery-section">

      <div className="gallery-container">

        {/* ================= HEADING ================= */}

        <div className="gallery-heading">

          <div>
            <span className="gallery-eyebrow">
              OUR GALLERY
            </span>

            <h2>
              Moments Worth
              <span>Remembering.</span>
            </h2>
          </div>

          <p>
            Explore the spaces, details and experiences
            that make every StaySphere stay memorable.
          </p>

        </div>


        {/* ================= GALLERY ================= */}

        <div className="gallery-grid">

          {galleryItems.map((item, index) => (

            <button
              type="button"
              key={item.image}
              className={`gallery-item gallery-item-${index + 1}`}
              onClick={() => setActiveImage(item)}
            >

              <img
                src={item.image}
                alt={item.title}
              />

              <div className="gallery-overlay">

                <span>
                  {item.category}
                </span>

                <h3>
                  {item.title}
                </h3>

                <strong>
                  +
                </strong>

              </div>

            </button>

          ))}

        </div>


        {/* ================= FULL GALLERY BUTTON ================= */}

        <div className="gallery-button-wrapper">

          <a
            href="/gallery"
            className="gallery-button"
          >
            View Full Gallery
            <span>→</span>
          </a>

        </div>

      </div>


      {/* ================= LIGHTBOX ================= */}

      {activeImage && (

        <div
          className="gallery-lightbox"
          onClick={() => setActiveImage(null)}
        >

          <button
            type="button"
            className="gallery-close"
            onClick={() => setActiveImage(null)}
          >
            ×
          </button>

          <img
            src={activeImage.image}
            alt={activeImage.title}
            onClick={(event) => event.stopPropagation()}
          />

          <div className="gallery-lightbox-title">
            {activeImage.title}
          </div>

        </div>

      )}

    </section>
  );
}