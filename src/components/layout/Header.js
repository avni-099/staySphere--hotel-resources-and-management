"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const initialNotifications = [
  {
    id: 1,
    type: "reservation",
    title: "New reservation received",
    message: "Richa Gupta booked Room 101.",
    time: "5 min ago",
    read: false,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment received",
    message: "₹8,500 received for RES-1001.",
    time: "20 min ago",
    read: false,
  },
  {
    id: 3,
    type: "housekeeping",
    title: "Room needs attention",
    message: "Room 301 is under maintenance.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    type: "checkout",
    title: "Today's checkout",
    message: "12 guests are scheduled to check out.",
    time: "2 hours ago",
    read: true,
  },
];

export default function Header() {
  const router = useRouter();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const [notifications, setNotifications] =
    useState(initialNotifications);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  /* =========================
     OUTSIDE CLICK
  ========================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =========================
     TOGGLE NOTIFICATIONS
  ========================= */

  const handleNotificationClick = () => {
    setShowNotifications((previous) => !previous);
    setShowProfile(false);
  };

  /* =========================
     TOGGLE PROFILE
  ========================= */

  const handleProfileClick = () => {
    setShowProfile((previous) => !previous);
    setShowNotifications(false);
  };

  /* =========================
     MARK SINGLE READ
  ========================= */

  const handleNotificationRead = (id) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              read: true,
            }
          : item
      )
    );
  };

  /* =========================
     MARK ALL READ
  ========================= */

  const handleMarkAllRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  /* =========================
     NOTIFICATION ICON
  ========================= */

  const getNotificationIcon = (type) => {
    if (type === "reservation") {
      return "📅";
    }

    if (type === "payment") {
      return "₹";
    }

    if (type === "housekeeping") {
      return "🧹";
    }

    if (type === "checkout") {
      return "🚪";
    }

    return "🔔";
  };

  /* =========================
     NAVIGATION
  ========================= */

  const handleSettings = () => {
    setShowProfile(false);
    router.push("/settings");
  };

  const handleMyProfile = () => {
    setShowProfile(false);

    alert(
      "My Profile page will be connected next."
    );
  };

  const handleChangePassword = () => {
    setShowProfile(false);

    alert(
      "Change Password will be connected from Settings."
    );

    router.push("/settings");
  };

  const handleLogout = () => {
    setShowProfile(false);

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) {
      return;
    }

    alert(
      "Logout functionality will be connected when authentication is added."
    );
  };

  return (
    <header className="admin-header">

      {/* =========================
          LEFT
      ========================= */}

      <div>
        <p className="header-label">
          HOTEL MANAGEMENT
        </p>

        <h2>
          Hello Admin
        </h2>
      </div>

      {/* =========================
          RIGHT
      ========================= */}

      <div className="header-right">

        {/* =========================
            NOTIFICATION
        ========================= */}

        <div
          ref={notificationRef}
          style={{
            position: "relative",
          }}
        >

          <button
            className="notification-btn"
            onClick={
              handleNotificationClick
            }
            aria-label="Notifications"
          >
            🔔

            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-3px",
                  right: "-3px",
                  minWidth: "19px",
                  height: "19px",
                  padding: "0 5px",
                  borderRadius: "20px",
                  background: "#a54855",
                  color: "#ffffff",
                  fontSize: "10px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #ffffff",
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* =========================
              NOTIFICATION DROPDOWN
          ========================= */}

          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: "58px",
                right: "0",
                width: "390px",
                maxWidth:
                  "calc(100vw - 30px)",
                background: "#ffffff",
                border:
                  "1px solid #e8eaf0",
                borderRadius: "18px",
                boxShadow:
                  "0 20px 50px rgba(0, 20, 61, 0.16)",
                zIndex: 1200,
                overflow: "hidden",
              }}
            >

              {/* HEADER */}

              <div
                style={{
                  padding:
                    "18px 20px",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "space-between",
                  borderBottom:
                    "1px solid #edf0f4",
                }}
              >

                <div>
                  <h3
                    style={{
                      margin: 0,
                      color:
                        "#00143d",
                      fontSize:
                        "17px",
                    }}
                  >
                    Notifications
                  </h3>

                  <p
                    style={{
                      margin:
                        "4px 0 0",
                      color:
                        "#667085",
                      fontSize:
                        "12px",
                    }}
                  >
                    {unreadCount > 0
                      ? `${unreadCount} unread notification${
                          unreadCount > 1
                            ? "s"
                            : ""
                        }`
                      : "All notifications are read"}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={
                      handleMarkAllRead
                    }
                    style={{
                      border: "none",
                      background:
                        "transparent",
                      color:
                        "#00143d",
                      fontSize:
                        "12px",
                      fontWeight:
                        "700",
                      cursor:
                        "pointer",
                    }}
                  >
                    Mark all read
                  </button>
                )}

              </div>

              {/* NOTIFICATION LIST */}

              <div
                style={{
                  maxHeight:
                    "390px",
                  overflowY:
                    "auto",
                }}
              >

                {notifications.length ===
                  0 && (
                  <div
                    style={{
                      padding:
                        "35px 20px",
                      textAlign:
                        "center",
                      color:
                        "#667085",
                    }}
                  >
                    No notifications
                  </div>
                )}

                {notifications.map(
                  (notification) => (
                    <button
                      key={
                        notification.id
                      }
                      onClick={() =>
                        handleNotificationRead(
                          notification.id
                        )
                      }
                      style={{
                        width: "100%",
                        border: "none",
                        background:
                          notification.read
                            ? "#ffffff"
                            : "#f8f9fc",
                        display: "flex",
                        gap: "12px",
                        padding:
                          "15px 20px",
                        textAlign: "left",
                        cursor: "pointer",
                        borderBottom:
                          "1px solid #f0f1f4",
                      }}
                    >

                      {/* ICON */}

                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          minWidth: "38px",
                          borderRadius:
                            "12px",
                          background:
                            notification.type ===
                            "payment"
                              ? "#ecfdf3"
                              : notification.type ===
                                "housekeeping"
                              ? "#fff7ed"
                              : "#f1f5ff",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          fontSize:
                            "17px",
                          color:
                            "#00143d",
                        }}
                      >
                        {getNotificationIcon(
                          notification.type
                        )}
                      </div>

                      {/* CONTENT */}

                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >

                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "flex-start",
                            justifyContent:
                              "space-between",
                            gap: "8px",
                          }}
                        >

                          <strong
                            style={{
                              color:
                                "#00143d",
                              fontSize:
                                "13px",
                              lineHeight:
                                "1.4",
                            }}
                          >
                            {
                              notification.title
                            }
                          </strong>

                          {!notification.read && (
                            <span
                              style={{
                                width:
                                  "7px",
                                height:
                                  "7px",
                                minWidth:
                                  "7px",
                                marginTop:
                                  "5px",
                                borderRadius:
                                  "50%",
                                background:
                                  "#c9a86a",
                              }}
                            />
                          )}

                        </div>

                        <p
                          style={{
                            margin:
                              "4px 0",
                            color:
                              "#667085",
                            fontSize:
                              "12px",
                            lineHeight:
                              "1.5",
                          }}
                        >
                          {
                            notification.message
                          }
                        </p>

                        <span
                          style={{
                            color:
                              "#98a2b3",
                            fontSize:
                              "11px",
                          }}
                        >
                          {
                            notification.time
                          }
                        </span>

                      </div>

                    </button>
                  )
                )}

              </div>

              {/* FOOTER */}

              <div
                style={{
                  padding:
                    "12px 20px",
                  borderTop:
                    "1px solid #edf0f4",
                  textAlign:
                    "center",
                }}
              >
                <button
                  onClick={() => {
                    setShowNotifications(
                      false
                    );
                    alert(
                      "Full notifications page will be added later."
                    );
                  }}
                  style={{
                    border: "none",
                    background:
                      "transparent",
                    color:
                      "#00143d",
                    fontWeight:
                      "700",
                    fontSize:
                      "12px",
                    cursor:
                      "pointer",
                  }}
                >
                  View all notifications →
                </button>
              </div>

            </div>
          )}

        </div>

        {/* =========================
            ADMIN PROFILE
        ========================= */}

        <div
          ref={profileRef}
          style={{
            position: "relative",
          }}
        >

          <button
            onClick={
              handleProfileClick
            }
            style={{
              border: "none",
              background:
                "transparent",
              padding: 0,
              display: "flex",
              alignItems:
                "center",
              gap: "10px",
              cursor:
                "pointer",
              textAlign:
                "left",
            }}
            aria-label="Admin profile"
          >

            <div className="admin-profile">

              <div className="profile-avatar">
                A
              </div>

              <div>
                <strong>
                  Admin
                </strong>

                <span>
                  Administrator
                </span>
              </div>

            </div>

            <span
              style={{
                color:
                  "#667085",
                fontSize:
                  "11px",
                marginLeft:
                  "2px",
                transition:
                  "transform 0.2s ease",
                transform:
                  showProfile
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            >
              ▼
            </span>

          </button>

          {/* =========================
              PROFILE DROPDOWN
          ========================= */}

          {showProfile && (
            <div
              style={{
                position: "absolute",
                top: "58px",
                right: "0",
                width: "245px",
                background:
                  "#ffffff",
                border:
                  "1px solid #e8eaf0",
                borderRadius:
                  "18px",
                boxShadow:
                  "0 20px 50px rgba(0, 20, 61, 0.16)",
                zIndex: 1200,
                overflow:
                  "hidden",
              }}
            >

              {/* PROFILE INFO */}

              <div
                style={{
                  padding:
                    "18px",
                  background:
                    "#f8f9fc",
                  borderBottom:
                    "1px solid #edf0f4",
                }}
              >

                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: "11px",
                  }}
                >

                  <div
                    className="profile-avatar"
                    style={{
                      width:
                        "42px",
                      height:
                        "42px",
                    }}
                  >
                    A
                  </div>

                  <div>
                    <strong
                      style={{
                        display:
                          "block",
                        color:
                          "#00143d",
                        fontSize:
                          "14px",
                      }}
                    >
                      Admin
                    </strong>

                    <span
                      style={{
                        display:
                          "block",
                        color:
                          "#667085",
                        fontSize:
                          "12px",
                        marginTop:
                          "2px",
                      }}
                    >
                      Administrator
                    </span>
                  </div>

                </div>

              </div>

              {/* MENU */}

              <div
                style={{
                  padding:
                    "8px",
                }}
              >

                <button
                  onClick={
                    handleMyProfile
                  }
                  style={{
                    width:
                      "100%",
                    border:
                      "none",
                    background:
                      "transparent",
                    padding:
                      "11px 12px",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap:
                      "11px",
                    borderRadius:
                      "9px",
                    color:
                      "#344054",
                    cursor:
                      "pointer",
                    textAlign:
                      "left",
                    fontSize:
                      "13px",
                  }}
                  onMouseEnter={(
                    event
                  ) => {
                    event.currentTarget.style.background =
                      "#f5f6f8";
                  }}
                  onMouseLeave={(
                    event
                  ) => {
                    event.currentTarget.style.background =
                      "transparent";
                  }}
                >
                  <span>
                    👤
                  </span>

                  <span>
                    My Profile
                  </span>
                </button>

                <button
                  onClick={
                    handleSettings
                  }
                  style={{
                    width:
                      "100%",
                    border:
                      "none",
                    background:
                      "transparent",
                    padding:
                      "11px 12px",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap:
                      "11px",
                    borderRadius:
                      "9px",
                    color:
                      "#344054",
                    cursor:
                      "pointer",
                    textAlign:
                      "left",
                    fontSize:
                      "13px",
                  }}
                  onMouseEnter={(
                    event
                  ) => {
                    event.currentTarget.style.background =
                      "#f5f6f8";
                  }}
                  onMouseLeave={(
                    event
                  ) => {
                    event.currentTarget.style.background =
                      "transparent";
                  }}
                >
                  <span>
                    ⚙️
                  </span>

                  <span>
                    Settings
                  </span>
                </button>

                <button
                  onClick={
                    handleChangePassword
                  }
                  style={{
                    width:
                      "100%",
                    border:
                      "none",
                    background:
                      "transparent",
                    padding:
                      "11px 12px",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap:
                      "11px",
                    borderRadius:
                      "9px",
                    color:
                      "#344054",
                    cursor:
                      "pointer",
                    textAlign:
                      "left",
                    fontSize:
                      "13px",
                  }}
                  onMouseEnter={(
                    event
                  ) => {
                    event.currentTarget.style.background =
                      "#f5f6f8";
                  }}
                  onMouseLeave={(
                    event
                  ) => {
                    event.currentTarget.style.background =
                      "transparent";
                  }}
                >
                  <span>
                    🔒
                  </span>

                  <span>
                    Change Password
                  </span>
                </button>

                <div
                  style={{
                    height:
                      "1px",
                    background:
                      "#edf0f4",
                    margin:
                      "6px 4px",
                  }}
                />

                <button
                  onClick={
                    handleLogout
                  }
                  style={{
                    width:
                      "100%",
                    border:
                      "none",
                    background:
                      "transparent",
                    padding:
                      "11px 12px",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap:
                      "11px",
                    borderRadius:
                      "9px",
                    color:
                      "#a54855",
                    cursor:
                      "pointer",
                    textAlign:
                      "left",
                    fontSize:
                      "13px",
                    fontWeight:
                      "600",
                  }}
                  onMouseEnter={(
                    event
                  ) => {
                    event.currentTarget.style.background =
                      "#fbecee";
                  }}
                  onMouseLeave={(
                    event
                  ) => {
                    event.currentTarget.style.background =
                      "transparent";
                  }}
                >
                  <span>
                    🚪
                  </span>

                  <span>
                    Logout
                  </span>
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}