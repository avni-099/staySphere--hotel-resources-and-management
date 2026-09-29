"use client";

import { useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RoomAvailability from "@/components/dashboard/RoomAvailability";
import RecentReservations from "@/components/dashboard/RecentReservations";

const upcomingCheckIns = [
  {
    id: "RES-1005",
    guest: "Karan Mehta",
    room: "202",
    roomType: "Deluxe Room",
    time: "12:30 PM",
    status: "Confirmed",
  },
  {
    id: "RES-1006",
    guest: "Sneha Kapoor",
    room: "302",
    roomType: "Premium Room",
    time: "02:00 PM",
    status: "Confirmed",
  },
  {
    id: "RES-1007",
    guest: "Amit Sharma",
    room: "201",
    roomType: "Suite Room",
    time: "04:30 PM",
    status: "Pending",
  },
];

const todayActivity = [
  {
    id: 1,
    title: "Check-in",
    guest: "Richa Gupta",
    room: "101",
    time: "10:30 AM",
    type: "checkin",
  },
  {
    id: 2,
    title: "Payment Received",
    guest: "Ankit Verma",
    room: "201",
    time: "11:15 AM",
    type: "payment",
  },
  {
    id: 3,
    title: "Room Cleaning",
    guest: "Room 301",
    room: "",
    time: "12:00 PM",
    type: "housekeeping",
  },
  {
    id: 4,
    title: "Check-out",
    guest: "Rahul Sharma",
    room: "102",
    time: "01:00 PM",
    type: "checkout",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="main-section">

        <Header />

        <main className="main-content">

          {/* =========================
              PAGE HEADER
          ========================= */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "26px",
            }}
          >

            <div>
              <h1>
                Dashboard
              </h1>

              <p className="page-subtitle">
                Overview of your hotel
              </p>
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#667085",
                background: "#ffffff",
                padding: "10px 15px",
                borderRadius: "10px",
                border:
                  "1px solid #e8eaf0",
              }}
            >
              Today · 26 September 2026
            </div>

          </div>

          {/* =========================
              STATS
          ========================= */}

          <div className="stats-grid">

            <DashboardStats
              title="Total Bookings"
              value="128"
              description="This month"
            />

            <DashboardStats
              title="Check-ins"
              value="18"
              description="Today"
            />

            <DashboardStats
              title="Check-outs"
              value="12"
              description="Today"
            />

            <DashboardStats
              title="Revenue"
              value="₹4.8L"
              description="This month"
            />

          </div>

          {/* =========================
              QUICK ACTIONS
          ========================= */}

          <section
            style={{
              marginTop: "28px",
              marginBottom: "28px",
            }}
          >

            <div
              style={{
                marginBottom: "14px",
              }}
            >

              <p
                style={{
                  margin: 0,
                  color: "#c9a86a",
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                }}
              >
                QUICK ACTIONS
              </p>

              <h2
                style={{
                  margin: "5px 0 0",
                  color: "#00143d",
                  fontSize: "20px",
                }}
              >
                Manage Hotel
              </h2>

            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, minmax(0, 1fr))",
                gap: "16px",
              }}
            >

              {/* =========================
                  NEW RESERVATION
              ========================= */}

              <button
                onClick={() =>
                  router.push(
                    "/reservations"
                  )
                }
                style={{
                  border:
                    "1px solid #e8eaf0",
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "20px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition:
                    "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(-2px)";

                  event.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(0,20,61,0.08)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(0)";

                  event.currentTarget.style.boxShadow =
                    "none";
                }}
              >

                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    background: "#eef3ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    marginBottom: "12px",
                  }}
                >
                  📅
                </div>

                <strong
                  style={{
                    color: "#00143d",
                    display: "block",
                    fontSize: "15px",
                  }}
                >
                  New Reservation
                </strong>

                <span
                  style={{
                    color: "#667085",
                    display: "block",
                    marginTop: "5px",
                    fontSize: "12px",
                  }}
                >
                  Create a new booking
                </span>

              </button>

              {/* =========================
                  ADD GUEST
              ========================= */}

              <button
                onClick={() =>
                  router.push("/guests")
                }
                style={{
                  border:
                    "1px solid #e8eaf0",
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "20px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition:
                    "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(-2px)";

                  event.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(0,20,61,0.08)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(0)";

                  event.currentTarget.style.boxShadow =
                    "none";
                }}
              >

                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    background: "#ecfdf3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    marginBottom: "12px",
                  }}
                >
                  👤
                </div>

                <strong
                  style={{
                    color: "#00143d",
                    display: "block",
                    fontSize: "15px",
                  }}
                >
                  Add Guest
                </strong>

                <span
                  style={{
                    color: "#667085",
                    display: "block",
                    marginTop: "5px",
                    fontSize: "12px",
                  }}
                >
                  Register a new guest
                </span>

              </button>

              {/* =========================
                  ADD PAYMENT
              ========================= */}

              <button
                onClick={() =>
                  router.push("/payments")
                }
                style={{
                  border:
                    "1px solid #e8eaf0",
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "20px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition:
                    "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(-2px)";

                  event.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(0,20,61,0.08)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(0)";

                  event.currentTarget.style.boxShadow =
                    "none";
                }}
              >

                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    background: "#fff7ed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    marginBottom: "12px",
                  }}
                >
                  ₹
                </div>

                <strong
                  style={{
                    color: "#00143d",
                    display: "block",
                    fontSize: "15px",
                  }}
                >
                  Add Payment
                </strong>

                <span
                  style={{
                    color: "#667085",
                    display: "block",
                    marginTop: "5px",
                    fontSize: "12px",
                  }}
                >
                  Record a payment
                </span>

              </button>

            </div>

          </section>

          {/* =========================
              ROOM AVAILABILITY
          ========================= */}

          <RoomAvailability />

          {/* =========================
              TWO COLUMN SECTION
          ========================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1.4fr 1fr",
              gap: "24px",
              marginTop: "28px",
            }}
          >

            {/* =========================
                UPCOMING CHECK-INS
            ========================= */}

            <section
              style={{
                background: "#ffffff",
                border:
                  "1px solid #e8eaf0",
                borderRadius: "18px",
                overflow: "hidden",
              }}
            >

              <div
                style={{
                  padding: "20px 22px",
                  borderBottom:
                    "1px solid #edf0f4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  gap: "10px",
                }}
              >

                <div>

                  <p
                    style={{
                      margin: 0,
                      color: "#c9a86a",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing:
                        "1px",
                    }}
                  >
                    TODAY
                  </p>

                  <h3
                    style={{
                      margin:
                        "5px 0 0",
                      color: "#00143d",
                    }}
                  >
                    Upcoming Check-ins
                  </h3>

                </div>

                <button
                  onClick={() =>
                    router.push(
                      "/reservations"
                    )
                  }
                  style={{
                    border: "none",
                    background:
                      "transparent",
                    color: "#00143d",
                    fontWeight: "700",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  View all →
                </button>

              </div>

              <div>

                {upcomingCheckIns.map(
                  (booking) => (
                    <div
                      key={booking.id}
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        gap: "15px",
                        padding:
                          "17px 22px",
                        borderBottom:
                          "1px solid #f0f1f4",
                      }}
                    >

                      <div
                        style={{
                          display: "flex",
                          alignItems:
                            "center",
                          gap: "12px",
                          minWidth: 0,
                        }}
                      >

                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            minWidth: "40px",
                            borderRadius:
                              "12px",
                            background:
                              "#eef3ff",
                            color:
                              "#00143d",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            fontWeight: "700",
                          }}
                        >
                          {booking.guest.charAt(
                            0
                          )}
                        </div>

                        <div
                          style={{
                            minWidth: 0,
                          }}
                        >

                          <strong
                            style={{
                              display:
                                "block",
                              color:
                                "#00143d",
                              fontSize:
                                "13px",
                            }}
                          >
                            {
                              booking.guest
                            }
                          </strong>

                          <span
                            style={{
                              display:
                                "block",
                              color:
                                "#667085",
                              fontSize:
                                "11px",
                              marginTop:
                                "3px",
                            }}
                          >
                            Room{" "}
                            {
                              booking.room
                            }{" "}
                            ·{" "}
                            {
                              booking.roomType
                            }
                          </span>

                        </div>

                      </div>

                      <div
                        style={{
                          textAlign:
                            "right",
                          minWidth:
                            "75px",
                        }}
                      >

                        <strong
                          style={{
                            display:
                              "block",
                            color:
                              "#00143d",
                            fontSize:
                              "12px",
                          }}
                        >
                          {
                            booking.time
                          }
                        </strong>

                        <span
                          style={{
                            display:
                              "inline-block",
                            marginTop:
                              "4px",
                            padding:
                              "4px 8px",
                            borderRadius:
                              "20px",
                            background:
                              booking.status ===
                              "Confirmed"
                                ? "#ecfdf3"
                                : "#fff7ed",
                            color:
                              booking.status ===
                              "Confirmed"
                                ? "#067647"
                                : "#b54708",
                            fontSize:
                              "10px",
                            fontWeight:
                              "700",
                          }}
                        >
                          {
                            booking.status
                          }
                        </span>

                      </div>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* =========================
                TODAY ACTIVITY
            ========================= */}

            <section
              style={{
                background: "#ffffff",
                border:
                  "1px solid #e8eaf0",
                borderRadius: "18px",
                overflow: "hidden",
              }}
            >

              <div
                style={{
                  padding: "20px 22px",
                  borderBottom:
                    "1px solid #edf0f4",
                }}
              >

                <p
                  style={{
                    margin: 0,
                    color: "#c9a86a",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing:
                      "1px",
                  }}
                >
                  LIVE ACTIVITY
                </p>

                <h3
                  style={{
                    margin:
                      "5px 0 0",
                    color: "#00143d",
                  }}
                >
                  Today's Activity
                </h3>

              </div>

              <div
                style={{
                  padding:
                    "5px 22px 10px",
                }}
              >

                {todayActivity.map(
                  (activity) => (
                    <div
                      key={activity.id}
                      style={{
                        display: "flex",
                        gap: "12px",
                        padding:
                          "14px 0",
                        borderBottom:
                          "1px solid #f0f1f4",
                      }}
                    >

                      <div
                        style={{
                          width: "34px",
                          height: "34px",
                          minWidth: "34px",
                          borderRadius:
                            "10px",
                          background:
                            activity.type ===
                            "payment"
                              ? "#ecfdf3"
                              : activity.type ===
                                "housekeeping"
                              ? "#fff7ed"
                              : "#eef3ff",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          fontSize:
                            "15px",
                        }}
                      >
                        {activity.type ===
                        "checkin"
                          ? "✓"
                          : activity.type ===
                            "checkout"
                          ? "→"
                          : activity.type ===
                            "payment"
                          ? "₹"
                          : "🧹"}
                      </div>

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
                                "12px",
                            }}
                          >
                            {
                              activity.title
                            }
                          </strong>

                          <span
                            style={{
                              color:
                                "#98a2b3",
                              fontSize:
                                "10px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            {
                              activity.time
                            }
                          </span>

                        </div>

                        <span
                          style={{
                            display:
                              "block",
                            color:
                              "#667085",
                            fontSize:
                              "11px",
                            marginTop:
                              "3px",
                          }}
                        >
                          {
                            activity.guest
                          }

                          {activity.room && (
                            <>
                              {" "}
                              · Room{" "}
                              {
                                activity.room
                              }
                            </>
                          )}
                        </span>

                      </div>

                    </div>
                  )
                )}

              </div>

            </section>

          </div>

          {/* =========================
              RECENT RESERVATIONS
          ========================= */}

          <div
            style={{
              marginTop: "28px",
            }}
          >
            <RecentReservations />
          </div>

        </main>

      </div>

    </div>
  );
}