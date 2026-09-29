"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.terms) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    localStorage.setItem(
      "staySphereUser",
      JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        loggedIn: true,
      })
    );

    window.location.href = "/account";
  };

  return (
    <main className="register-page">
      {/* LEFT VISUAL */}
      <section className="register-visual">
        <div className="register-visual-overlay" />

        <div className="register-visual-content">
          <Link href="/" className="register-logo">
            Stay<span>Sphere</span>
          </Link>

          <div className="register-visual-text">
            <span>JOIN STAYSPHERE</span>

            <h1>
              Your Next
              <br />
              <em>Escape</em> Starts Here.
            </h1>

            <p>
              Create your StaySphere account and make every
              hotel experience simple, comfortable and memorable.
            </p>

            <div className="register-benefits">
              <div>
                <span>✓</span>
                <p>Manage all your reservations</p>
              </div>

              <div>
                <span>✓</span>
                <p>Save your guest preferences</p>
              </div>

              <div>
                <span>✓</span>
                <p>Enjoy a faster booking experience</p>
              </div>
            </div>
          </div>

          <div className="register-visual-footer">
            <span>STAY</span>
            <i />
            <span>RELAX</span>
            <i />
            <span>REMEMBER</span>
          </div>
        </div>
      </section>

      {/* REGISTER FORM */}
      <section className="register-form-section">
        <div className="register-form-container">
          <Link href="/" className="register-mobile-logo">
            Stay<span>Sphere</span>
          </Link>

          <Link href="/login" className="register-back">
            ← Back to Login
          </Link>

          <div className="register-heading">
            <span>CREATE ACCOUNT</span>

            <h2>
              Begin Your
              <em>Journey.</em>
            </h2>

            <p>
              Create your account to start your StaySphere
              experience.
            </p>
          </div>

          {error && (
            <div className="register-error">
              <span>!</span>
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="register-form"
          >
            {/* NAME */}
            <div className="register-field">
              <label htmlFor="register-name">
                Full Name <span>*</span>
              </label>

              <div className="register-input-wrapper">
                <span className="register-input-icon">●</span>

                <input
                  id="register-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* EMAIL + PHONE */}
            <div className="register-form-row">
              <div className="register-field">
                <label htmlFor="register-email">
                  Email Address <span>*</span>
                </label>

                <div className="register-input-wrapper">
                  <span className="register-input-icon">✉</span>

                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="register-phone">
                  Mobile Number <span>*</span>
                </label>

                <div className="register-input-wrapper">
                  <span className="register-input-icon">☎</span>

                  <input
                    id="register-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            {/* PASSWORD */}
            <div className="register-field">
              <label htmlFor="register-password">
                Password <span>*</span>
              </label>

              <div className="register-input-wrapper">
                <span className="register-input-icon">◆</span>

                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="register-password-hint">
                {form.password.length > 0 && (
                  <>
                    <span
                      className={
                        form.password.length >= 6
                          ? "valid"
                          : ""
                      }
                    >
                      {form.password.length >= 6
                        ? "✓"
                        : "○"}{" "}
                      At least 6 characters
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="register-field">
              <label htmlFor="register-confirm-password">
                Confirm Password <span>*</span>
              </label>

              <div className="register-input-wrapper">
                <span className="register-input-icon">◆</span>

                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              {form.confirmPassword.length > 0 && (
                <div
                  className={`register-match ${
                    form.password === form.confirmPassword
                      ? "valid"
                      : ""
                  }`}
                >
                  {form.password === form.confirmPassword
                    ? "✓ Passwords match"
                    : "Passwords do not match"}
                </div>
              )}
            </div>

            {/* TERMS */}
            <label className="register-terms">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />

              <span>
                I agree to the{" "}
                <Link href="/terms">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              className="register-submit"
            >
              Create Account
              <span>→</span>
            </button>
          </form>

          <div className="register-divider">
            <span>OR</span>
          </div>

          <Link
            href="/rooms"
            className="register-guest-button"
          >
            Continue as Guest
          </Link>

          <p className="register-login-text">
            Already have an account?
            <Link href="/login"> Sign In</Link>
          </p>

          <div className="register-security">
            <span>◇</span>

            <p>
              Your information is kept secure and private.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}