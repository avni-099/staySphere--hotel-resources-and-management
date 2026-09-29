"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("staySphereUser");

      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);

          if (parsedUser?.loggedIn) {
            setUser(parsedUser);
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    // Detect login/logout changes from other tabs/components
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setAccountOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("staySphereUser");
    setUser(null);
    setAccountOpen(false);
    setMenuOpen(false);
    window.location.href = "/";
  };

  const getUserName = () => {
    if (!user) return "Guest";

    if (user.name) {
      return user.name;
    }

    if (user.email) {
      return user.email.split("@")[0];
    }

    return "Guest";
  };

  const getInitial = () => {
    const name = getUserName();

    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="stay-navbar">
      <div className="stay-navbar-inner">

        {/* ================= LOGO ================= */}

        <Link
          href="/"
          className="stay-brand"
          onClick={closeMenu}
        >
          <Image
            src="/images/staysphere-logo.png"
            alt="StaySphere Hotel"
            width={300}
            height={100}
            priority
            className="stay-logo"
          />
        </Link>


        {/* ================= DESKTOP MENU ================= */}

        <nav className="stay-nav">

          <Link
            href="/"
            className="stay-nav-link"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            href="/rooms"
            className="stay-nav-link"
            onClick={closeMenu}
          >
            Rooms
          </Link>

          <Link
            href="/facilities"
            className="stay-nav-link"
            onClick={closeMenu}
          >
            Facilities
          </Link>

          <Link
            href="/gallery"
            className="stay-nav-link"
            onClick={closeMenu}
          >
            Gallery
          </Link>

          <Link
            href="/about"
            className="stay-nav-link"
            onClick={closeMenu}
          >
            About
          </Link>

          <Link
            href="/contact"
            className="stay-nav-link"
            onClick={closeMenu}
          >
            Contact
          </Link>

        </nav>


        {/* ================= RIGHT SIDE ================= */}

        <div className="stay-actions">

          {!user ? (
            <>
              <Link
                href="/login"
                className="stay-login"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                href="/rooms"
                className="stay-book"
                onClick={closeMenu}
              >
                Book Now
              </Link>
            </>
          ) : (
            <>
              {/* ACCOUNT DROPDOWN */}

              <div className="stay-account-wrapper">

                <button
                  type="button"
                  className="stay-account-button"
                  onClick={() =>
                    setAccountOpen(!accountOpen)
                  }
                >
                  <span className="stay-account-avatar">
                    {getInitial()}
                  </span>

                  <span className="stay-account-name">
                    {getUserName()}
                  </span>

                  <span
                    className={`stay-account-arrow ${
                      accountOpen ? "account-open" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>


                {accountOpen && (
                  <div className="stay-account-dropdown">

                    <div className="stay-account-dropdown-user">
                      <span className="stay-account-dropdown-avatar">
                        {getInitial()}
                      </span>

                      <div>
                        <strong>{getUserName()}</strong>

                        <span>
                          {user.email || "StaySphere Guest"}
                        </span>
                      </div>
                    </div>

                    <div className="stay-account-dropdown-divider" />

                    <Link
                      href="/account"
                      onClick={closeMenu}
                    >
                      <span>♙</span>
                      My Account
                    </Link>

                    <Link
                      href="/account/reservations"
                      onClick={closeMenu}
                    >
                      <span>▣</span>
                      My Reservations
                    </Link>

                    <Link
                      href="/rooms"
                      onClick={closeMenu}
                    >
                      <span>⌂</span>
                      Book a Room
                    </Link>

                    <div className="stay-account-dropdown-divider" />

                    <button
                      type="button"
                      className="stay-logout-button"
                      onClick={handleLogout}
                    >
                      <span>↪</span>
                      Logout
                    </button>

                  </div>
                )}

              </div>

              <Link
                href="/rooms"
                className="stay-book"
                onClick={closeMenu}
              >
                Book Now
              </Link>
            </>
          )}

        </div>


        {/* ================= MOBILE BUTTON ================= */}

        <button
          type="button"
          className={`stay-menu-button ${
            menuOpen ? "menu-open" : ""
          }`}
          onClick={() => {
            setMenuOpen(!menuOpen);
            setAccountOpen(false);
          }}
          aria-label={
            menuOpen ? "Close menu" : "Open menu"
          }
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      {/* ================= MOBILE MENU ================= */}

      {menuOpen && (
        <div className="stay-mobile-menu">

          <Link
            href="/"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            href="/rooms"
            onClick={closeMenu}
          >
            Rooms
          </Link>

          <Link
            href="/facilities"
            onClick={closeMenu}
          >
            Facilities
          </Link>

          <Link
            href="/gallery"
            onClick={closeMenu}
          >
            Gallery
          </Link>

          <Link
            href="/about"
            onClick={closeMenu}
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={closeMenu}
          >
            Contact
          </Link>


          {/* ================= MOBILE ACCOUNT ================= */}

          {user ? (
            <>
              <div className="stay-mobile-user">

                <span className="stay-mobile-user-avatar">
                  {getInitial()}
                </span>

                <div>
                  <strong>{getUserName()}</strong>
                  <span>
                    {user.email || "StaySphere Guest"}
                  </span>
                </div>

              </div>

              <Link
                href="/account"
                className="mobile-account-link"
                onClick={closeMenu}
              >
                My Account
              </Link>

              <Link
                href="/account/reservations"
                className="mobile-account-link"
                onClick={closeMenu}
              >
                My Reservations
              </Link>

              <button
                type="button"
                className="mobile-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="mobile-login"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}


          <Link
            href="/rooms"
            className="mobile-book"
            onClick={closeMenu}
          >
            Book Your Stay
          </Link>

        </div>
      )}

    </header>
  );
}