"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const galleryImages = [
  {
    id: 1,
    title: "Elegant Guest Room",
    category: "ROOMS",
    image: "/images/gallery-room.jpg",
  },
  {
    id: 2,
    title: "Fine Dining Experience",
    category: "DINING",
    image: "/images/gallery-dining.jpg",
  },
  {
    id: 3,
    title: "Poolside Escape",
    category: "POOL",
    image: "/images/gallery-pool.jpg",
  },
  {
    id: 4,
    title: "The StaySphere Lobby",
    category: "LOBBY",
    image: "/images/gallery-lobby.jpg",
  },
  {
    id: 5,
    title: "Luxury Suite",
    category: "ROOMS",
    image: "/images/gallery-suite.jpg",
  },
  {
    id: 6,
    title: "A Place To Relax",
    category: "POOL",
    image: "/images/gallery-pool.jpg",
  },
  {
    id: 7,
    title: "Comfort & Elegance",
    category: "ROOMS",
    image: "/images/gallery-suite.jpg",
  },
  {
    id: 8,
    title: "Warm Welcome",
    category: "LOBBY",
    image: "/images/gallery-lobby.jpg",
  },
  {
    id: 9,
    title: "Dining Moments",
    category: "DINING",
    image: "/images/gallery-dining.jpg",
  },
];

const categories = [
  "ALL",
  "ROOMS",
  "DINING",
  "POOL",
  "LOBBY",
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    activeCategory === "ALL"
      ? galleryImages
      : galleryImages.filter(
          (item) => item.category === activeCategory
        );

  const selectedIndex = selectedImage
    ? filteredImages.findIndex(
        (item) => item.id === selectedImage.id
      )
    : -1;

  const showPrevious = () => {
    if (selectedIndex === -1) return;

    const previousIndex =
      selectedIndex === 0
        ? filteredImages.length - 1
        : selectedIndex - 1;

    setSelectedImage(filteredImages[previousIndex]);
  };

  const showNext = () => {
    if (selectedIndex === -1) return;

    const nextIndex =
      selectedIndex === filteredImages.length - 1
        ? 0
        : selectedIndex + 1;

    setSelectedImage(filteredImages[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedImage) return;

      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = selectedImage
      ? "hidden"
      : "";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage, selectedIndex]);

  return (
    <main className="gallery-page">
      {/* NAVBAR */}
      <header className="gallery-navbar">
        <div className="gallery-navbar-inner">
          <Link href="/" className="gallery-brand">
            Stay<span>Sphere</span>
          </Link>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/rooms">Rooms</Link>
            <Link href="/facilities">Facilities</Link>
            <Link href="/gallery" className="active">
              Gallery
            </Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <Link href="/booking" className="gallery-nav-button">
            Book Your Stay
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="gallery-hero">
        <div className="gallery-hero-overlay" />

        <div className="gallery-hero-content">
          <span>THE STAYSPHERE GALLERY</span>

          <h1>
            See The
            <em>Experience.</em>
          </h1>

          <p>
            Take a glimpse into the rooms, spaces and moments
            that make StaySphere special.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="gallery-intro">
        <div className="gallery-intro-container">
          <div>
            <span>EXPLORE STAYSPHERE</span>

            <h2>
              Moments Worth
              <em>Remembering.</em>
            </h2>
          </div>

          <p>
            From beautifully designed rooms to peaceful poolside
            moments and warm dining experiences, discover the
            spaces created to make your stay memorable.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="gallery-section">
        <div className="gallery-filter">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                activeCategory === category ? "active" : ""
              }
              onClick={() => {
                setActiveCategory(category);
                setSelectedImage(null);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div className="gallery-grid">
          {filteredImages.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={`gallery-card gallery-card-${index + 1}`}
              onClick={() => setSelectedImage(item)}
            >
              <img src={item.image} alt={item.title} />

              <div className="gallery-card-overlay">
                <div className="gallery-card-content">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                  <strong>View Image →</strong>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="gallery-empty">
            No images available in this category.
          </div>
        )}
      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="gallery-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close gallery"
          >
            ×
          </button>

          <button
            type="button"
            className="gallery-lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
          >
            ←
          </button>

          <div
            className="gallery-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
            />

            <div className="gallery-lightbox-info">
              <div>
                <span>{selectedImage.category}</span>
                <h3>{selectedImage.title}</h3>
              </div>

              <strong>
                {selectedIndex + 1} / {filteredImages.length}
              </strong>
            </div>
          </div>

          <button
            type="button"
            className="gallery-lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      )}

      {/* EXPERIENCE BANNER */}
      <section className="gallery-experience">
        <div className="gallery-experience-overlay" />

        <div className="gallery-experience-content">
          <span>IT LOOKS BEAUTIFUL.</span>

          <h2>
            Imagine
            <em>Being Here.</em>
          </h2>

          <p>
            Pictures can show you the space. Your stay is where
            the experience truly begins.
          </p>

          <Link
            href="/rooms"
            className="gallery-experience-button"
          >
            Explore Rooms
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="gallery-cta">
        <div className="gallery-cta-content">
          <span>READY TO EXPERIENCE IT?</span>

          <h2>
            Your Stay Is
            <em>Waiting.</em>
          </h2>

          <p>
            Discover your room and start planning your StaySphere
            experience today.
          </p>

          <div className="gallery-cta-buttons">
            <Link
              href="/rooms"
              className="gallery-cta-primary"
            >
              View Rooms
              <span>→</span>
            </Link>

            <Link
              href="/booking"
              className="gallery-cta-secondary"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="gallery-footer">
        <div>
          <Link href="/" className="gallery-footer-brand">
            Stay<span>Sphere</span>
          </Link>

          <p>
            Comfort. Elegance. Hospitality.
          </p>
        </div>

        <div className="gallery-footer-links">
          <Link href="/">Home</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/facilities">Facilities</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <p className="gallery-footer-copy">
          © 2026 StaySphere. All rights reserved.
        </p>
      </footer>
    </main>
  );
}