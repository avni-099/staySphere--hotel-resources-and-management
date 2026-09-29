"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
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

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    /*
      Frontend demo login.
      Backend authentication will be connected later.
    */

    localStorage.setItem(
      "staySphereUser",
      JSON.stringify({
        email: form.email,
        name: form.email.split("@")[0],
        loggedIn: true,
      })
    );

    window.location.href = "/account";
  };

  return (
    <main className="login-page">
      {/* LEFT VISUAL */}
      <section className="login-visual">
        <div className="login-visual-overlay" />

        <div className="login-visual-content">
          <Link href="/" className="login-logo">
            Stay<span>Sphere</span>
          </Link>

          <div className="login-visual-text">
            <span>WELCOME BACK</span>

            <h1>
              Your Stay.
              <br />
              Your <em>Sphere.</em>
            </h1>

            <p>
              Sign in to manage your reservations, discover your
              upcoming stays and enjoy a seamless StaySphere
              experience.
            </p>
          </div>

          <div className="login-visual-footer">
            <span>COMFORT</span>
            <i />
            <span>ELEGANCE</span>
            <i />
            <span>HOSPITALITY</span>
          </div>
        </div>
      </section>

      {/* LOGIN */}
      <section className="login-form-section">
        <div className="login-form-container">
          <Link href="/" className="login-mobile-logo">
            Stay<span>Sphere</span>
          </Link>

          <Link href="/" className="login-back">
            ← Back to StaySphere
          </Link>

          <div className="login-heading">
            <span>MEMBER LOGIN</span>

            <h2>
              Welcome
              <em>Back.</em>
            </h2>

            <p>
              Sign in to access your StaySphere account.
            </p>
          </div>

          {error && (
            <div className="login-error">
              <span>!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="login-email">
                Email Address
              </label>

              <div className="login-input-wrapper">
                <span className="login-input-icon">✉</span>

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="login-password">
                Password
              </label>

              <div className="login-input-wrapper">
                <span className="login-input-icon">◆</span>

                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="login-remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />

                <span>Remember me</span>
              </label>

              <Link href="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="login-submit">
              Sign In
              <span>→</span>
            </button>
          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <Link href="/rooms" className="login-guest-button">
            Continue as Guest
          </Link>

          <p className="login-register-text">
            Don't have an account?
            <Link href="/register"> Create Account</Link>
          </p>

          <div className="login-security">
            <span>◇</span>
            <p>
              Your account information is kept secure and private.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}