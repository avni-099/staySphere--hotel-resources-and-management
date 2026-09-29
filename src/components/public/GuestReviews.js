"use client";

import { useState } from "react";

const reviews = [
  {
    name: "Riya Sharma",
    city: "Delhi, India",
    rating: 5,
    text: "The stay was absolutely wonderful. The room was beautiful, clean and extremely comfortable. The staff made us feel genuinely welcome.",
  },
  {
    name: "Arjun Mehta",
    city: "Mumbai, India",
    rating: 5,
    text: "StaySphere has a beautiful atmosphere and excellent service. Everything from check-in to breakfast was smooth and enjoyable.",
  },
  {
    name: "Neha Kapoor",
    city: "Jaipur, India",
    rating: 5,
    text: "A peaceful and elegant place to stay. The interiors were stunning and the entire experience felt premium from beginning to end.",
  },
];

export default function GuestReviews() {
  const [activeReview, setActiveReview] = useState(0);

  const review = reviews[activeReview];

  return (
    <section className="reviews-section">
      <div className="reviews-container">

        <div className="reviews-heading">
          <span className="reviews-eyebrow">
            GUEST EXPERIENCES
          </span>

          <h2>
            Loved By Our
            <span>Guests.</span>
          </h2>

          <p>
            Discover what our guests say about their
            StaySphere experience.
          </p>
        </div>

        <div className="reviews-content">

          <div className="reviews-quote-mark">
            “
          </div>

          <div className="reviews-stars">
            {"★".repeat(review.rating)}
          </div>

          <p className="reviews-text">
            {review.text}
          </p>

          <div className="reviews-author">
            <div className="reviews-avatar">
              {review.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div>
              <h3>{review.name}</h3>
              <span>{review.city}</span>
            </div>
          </div>

          <div className="reviews-navigation">
            <button
              type="button"
              onClick={() =>
                setActiveReview(
                  (activeReview - 1 + reviews.length) %
                    reviews.length
                )
              }
              aria-label="Previous review"
            >
              ←
            </button>

            <div className="reviews-dots">
              {reviews.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  className={
                    activeReview === index
                      ? "active"
                      : ""
                  }
                  onClick={() => setActiveReview(index)}
                  aria-label={`Show review ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveReview(
                  (activeReview + 1) % reviews.length
                )
              }
              aria-label="Next review"
            >
              →
            </button>
          </div>

        </div>

        <div className="reviews-bottom">
          <div>
            <strong>4.9</strong>
            <span>/ 5</span>
          </div>

          <p>Average Guest Rating</p>
        </div>

      </div>
    </section>
  );
}