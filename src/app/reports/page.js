"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const reportData = [
  {
    id: 1,
    date: "24 Sep 2026",
    reservationId: "RES-1001",
    guest: "Richa Gupta",
    room: "101",
    roomType: "Deluxe Room",
    nights: 3,
    amount: 8500,
    payment: "Paid",
    status: "Confirmed",
  },
  {
    id: 2,
    date: "25 Sep 2026",
    reservationId: "RES-1002",
    guest: "Rahul Sharma",
    room: "102",
    roomType: "Premium Room",
    nights: 3,
    amount: 6200,
    payment: "Partial",
    status: "Pending",
  },
  {
    id: 3,
    date: "26 Sep 2026",
    reservationId: "RES-1003",
    guest: "Ankit Verma",
    room: "201",
    roomType: "Suite Room",
    nights: 3,
    amount: 9800,
    payment: "Paid",
    status: "Confirmed",
  },
  {
    id: 4,
    date: "27 Sep 2026",
    reservationId: "RES-1004",
    guest: "Priya Singh",
    room: "301",
    roomType: "Executive Suite",
    nights: 3,
    amount: 5400,
    payment: "Refunded",
    status: "Cancelled",
  },
  {
    id: 5,
    date: "27 Sep 2026",
    reservationId: "RES-1005",
    guest: "Karan Mehta",
    room: "202",
    roomType: "Deluxe Room",
    nights: 2,
    amount: 7000,
    payment: "Pending",
    status: "Pending",
  },
  {
    id: 6,
    date: "28 Sep 2026",
    reservationId: "RES-1006",
    guest: "Sneha Kapoor",
    room: "302",
    roomType: "Premium Room",
    nights: 2,
    amount: 4500,
    payment: "Paid",
    status: "Confirmed",
  },
];

const roomReport = [
  {
    room: "101",
    type: "Deluxe Room",
    status: "Available",
    price: 3500,
    bookings: 12,
    revenue: 42000,
  },
  {
    room: "102",
    type: "Premium Room",
    status: "Occupied",
    price: 4500,
    bookings: 15,
    revenue: 67500,
  },
  {
    room: "201",
    type: "Suite Room",
    status: "Reserved",
    price: 6500,
    bookings: 10,
    revenue: 65000,
  },
  {
    room: "202",
    type: "Deluxe Room",
    status: "Available",
    price: 3500,
    bookings: 9,
    revenue: 31500,
  },
  {
    room: "301",
    type: "Executive Suite",
    status: "Maintenance",
    price: 7500,
    bookings: 8,
    revenue: 60000,
  },
  {
    room: "302",
    type: "Premium Room",
    status: "Available",
    price: 4500,
    bookings: 11,
    revenue: 49500,
  },
];

const housekeepingReport = [
  {
    id: 1,
    room: "101",
    task: "Room Cleaning",
    staff: "Pooja Singh",
    priority: "High",
    status: "Completed",
  },
  {
    id: 2,
    room: "102",
    task: "Bathroom Cleaning",
    staff: "Rajesh Kumar",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    room: "201",
    task: "Deep Cleaning",
    staff: "Pooja Singh",
    priority: "High",
    status: "Completed",
  },
  {
    id: 4,
    room: "301",
    task: "Maintenance Check",
    staff: "Rajesh Kumar",
    priority: "High",
    status: "Pending",
  },
];

export default function ReportsPage() {
  const [reportType, setReportType] =
    useState("Revenue");

  const [dateRange, setDateRange] =
    useState("This Month");

  const [search, setSearch] = useState("");

  const [selectedReport, setSelectedReport] =
    useState(null);

  /* =========================
     SUMMARY
  ========================= */

  const totalRevenue = reportData.reduce(
    (total, item) => total + item.amount,
    0
  );

  const collectedRevenue = reportData
    .filter((item) => item.payment === "Paid")
    .reduce(
      (total, item) => total + item.amount,
      0
    );

  const pendingRevenue = reportData
    .filter(
      (item) =>
        item.payment === "Pending" ||
        item.payment === "Partial"
    )
    .reduce(
      (total, item) => total + item.amount,
      0
    );

  const cancelledBookings = reportData.filter(
    (item) => item.status === "Cancelled"
  ).length;

  const confirmedBookings = reportData.filter(
    (item) => item.status === "Confirmed"
  ).length;

  const totalBookings = reportData.length;

  const occupancyRate = Math.round(
    (confirmedBookings / totalBookings) * 100
  );

  /* =========================
     FILTERED DATA
  ========================= */

  const filteredReportData = useMemo(() => {
    const searchText =
      search.toLowerCase();

    return reportData.filter((item) => {
      return (
        item.guest
          .toLowerCase()
          .includes(searchText) ||
        item.reservationId
          .toLowerCase()
          .includes(searchText) ||
        item.room
          .toLowerCase()
          .includes(searchText) ||
        item.roomType
          .toLowerCase()
          .includes(searchText)
      );
    });
  }, [search]);

  /* =========================
     PRINT REPORT
  ========================= */

  const handlePrintReport = () => {
    window.print();
  };

  /* =========================
     EXPORT REPORT
  ========================= */

  const handleExportReport = () => {
    alert(
      "Export feature is frontend demo only. Backend/Excel export can be connected later."
    );
  };

  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="main-section">

        <Header />

        {/* =========================
            REPORT DETAILS
        ========================= */}

        {selectedReport && (
          <div className="room-drawer-overlay">

            <div className="room-drawer">

              <div className="room-drawer-header">

                <div>
                  <span>
                    REPORT DETAILS
                  </span>

                  <h2>
                    {selectedReport.reservationId}
                  </h2>
                </div>

                <button
                  className="room-drawer-close"
                  onClick={() =>
                    setSelectedReport(null)
                  }
                >
                  ×
                </button>

              </div>

              <div className="room-drawer-content">

                <div className="room-detail-item">
                  <span>
                    Guest
                  </span>

                  <strong>
                    {selectedReport.guest}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Reservation ID
                  </span>

                  <strong>
                    {selectedReport.reservationId}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Room
                  </span>

                  <strong>
                    Room {selectedReport.room}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Room Type
                  </span>

                  <strong>
                    {selectedReport.roomType}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Stay Duration
                  </span>

                  <strong>
                    {selectedReport.nights} Nights
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Booking Date
                  </span>

                  <strong>
                    {selectedReport.date}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Payment
                  </span>

                  <strong>
                    {selectedReport.payment}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Reservation Status
                  </span>

                  <strong>
                    {selectedReport.status}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Amount
                  </span>

                  <strong>
                    ₹
                    {selectedReport.amount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <button
                  className="add-room-btn"
                  onClick={() =>
                    setSelectedReport(null)
                  }
                  style={{
                    marginTop: "24px",
                  }}
                >
                  Close
                </button>

              </div>
            </div>
          </div>
        )}

        {/* =========================
            REPORT PAGE
        ========================= */}

        <main className="main-content">

          {/* PAGE HEADER */}

          <div className="rooms-page-header">

            <div>
              <h1>
                Reports
              </h1>

              <p>
                View hotel performance,
                revenue, reservations and
                operational reports.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >

              <button
                className="add-room-btn"
                onClick={
                  handlePrintReport
                }
              >
                🖨 Print Report
              </button>

              <button
                className="add-room-btn"
                onClick={
                  handleExportReport
                }
              >
                ↓ Export Report
              </button>

            </div>

          </div>

          {/* =========================
              REPORT CONTROLS
          ========================= */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >

            {/* REPORT TYPE */}

            <select
              value={reportType}
              onChange={(event) =>
                setReportType(
                  event.target.value
                )
              }
              style={{
                padding: "12px 16px",
                border:
                  "1px solid #dfe3ea",
                borderRadius: "10px",
                background:
                  "#ffffff",
                color:
                  "#344054",
                outline: "none",
                minWidth: "190px",
              }}
            >
              <option value="Revenue">
                Revenue Report
              </option>

              <option value="Reservations">
                Reservation Report
              </option>

              <option value="Rooms">
                Room Report
              </option>

              <option value="Payments">
                Payment Report
              </option>

              <option value="Housekeeping">
                Housekeeping Report
              </option>
            </select>

            {/* DATE RANGE */}

            <select
              value={dateRange}
              onChange={(event) =>
                setDateRange(
                  event.target.value
                )
              }
              style={{
                padding: "12px 16px",
                border:
                  "1px solid #dfe3ea",
                borderRadius: "10px",
                background:
                  "#ffffff",
                color:
                  "#344054",
                outline: "none",
                minWidth: "170px",
              }}
            >
              <option value="Today">
                Today
              </option>

              <option value="This Week">
                This Week
              </option>

              <option value="This Month">
                This Month
              </option>

              <option value="Last Month">
                Last Month
              </option>

              <option value="This Year">
                This Year
              </option>
            </select>

          </div>

          {/* =========================
              SUMMARY CARDS
          ========================= */}

          <div className="room-summary">

            <div className="room-summary-card">

              <span>
                Total Revenue
              </span>

              <strong>
                ₹
                {totalRevenue.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <div className="room-summary-card">

              <span>
                Collected
              </span>

              <strong>
                ₹
                {collectedRevenue.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <div className="room-summary-card">

              <span>
                Pending
              </span>

              <strong>
                ₹
                {pendingRevenue.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <div className="room-summary-card">

              <span>
                Occupancy
              </span>

              <strong>
                {occupancyRate}%
              </strong>

            </div>

            <div className="room-summary-card">

              <span>
                Bookings
              </span>

              <strong>
                {totalBookings}
              </strong>

            </div>

          </div>

          {/* =========================
              REPORT TYPE INFO
          ========================= */}

          <div
            style={{
              background:
                "#ffffff",
              border:
                "1px solid #e8eaf0",
              borderRadius:
                "18px",
              padding:
                "20px 24px",
              marginBottom:
                "24px",
              display:
                "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              gap: "20px",
              flexWrap:
                "wrap",
            }}
          >

            <div>

              <span
                style={{
                  fontSize:
                    "12px",
                  fontWeight:
                    "700",
                  letterSpacing:
                    "1px",
                  color:
                    "#c9a86a",
                }}
              >
                REPORT
              </span>

              <h3
                style={{
                  margin:
                    "5px 0 0",
                  color:
                    "#00143d",
                }}
              >
                {reportType} Report
              </h3>

            </div>

            <span
              style={{
                color:
                  "#667085",
                fontSize:
                  "14px",
              }}
            >
              Period: {dateRange}
            </span>

          </div>

          {/* =========================
              REVENUE / RESERVATION
              REPORT
          ========================= */}

          {(reportType === "Revenue" ||
            reportType === "Reservations" ||
            reportType === "Payments") && (
            <>

              {/* SEARCH */}

              <div className="room-search">

                <input
                  type="text"
                  placeholder="Search guest, reservation, room or room type..."
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                />

              </div>

              <div className="reservation-table-card">

                <div className="reservation-table-header">

                  <div>
                    <p>
                      {reportType.toUpperCase()}
                    </p>

                    <h3>
                      Hotel Performance
                    </h3>
                  </div>

                  <span>
                    {
                      filteredReportData.length
                    } records
                  </span>

                </div>

                <div className="reservation-table-wrapper">

                  <table className="reservation-table">

                    <thead>

                      <tr>

                        <th>
                          Date
                        </th>

                        <th>
                          Reservation
                        </th>

                        <th>
                          Guest
                        </th>

                        <th>
                          Room
                        </th>

                        <th>
                          Nights
                        </th>

                        <th>
                          Amount
                        </th>

                        <th>
                          Payment
                        </th>

                        <th>
                          Status
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredReportData.map(
                        (item) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              setSelectedReport(
                                item
                              )
                            }
                            style={{
                              cursor:
                                "pointer",
                            }}
                          >

                            <td>
                              {item.date}
                            </td>

                            <td>
                              <strong>
                                {
                                  item.reservationId
                                }
                              </strong>
                            </td>

                            <td>
                              <div className="reservation-guest">

                                <div className="reservation-avatar">
                                  {item.guest.charAt(
                                    0
                                  )}
                                </div>

                                <span>
                                  {item.guest}
                                </span>

                              </div>
                            </td>

                            <td>
                              <strong>
                                Room{" "}
                                {item.room}
                              </strong>

                              <small>
                                {
                                  item.roomType
                                }
                              </small>
                            </td>

                            <td>
                              {item.nights}
                            </td>

                            <td>
                              <strong>
                                ₹
                                {item.amount.toLocaleString(
                                  "en-IN"
                                )}
                              </strong>
                            </td>

                            <td>
                              <span
                                className={`payment-status ${item.payment.toLowerCase()}`}
                              >
                                {
                                  item.payment
                                }
                              </span>
                            </td>

                            <td>
                              <span
                                className={`reservation-status ${item.status
                                  .toLowerCase()
                                  .replace(
                                    " ",
                                    "-"
                                  )}`}
                              >
                                {
                                  item.status
                                }
                              </span>
                            </td>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>

                {filteredReportData.length ===
                  0 && (
                  <div className="no-reservations">

                    <h3>
                      No records found
                    </h3>

                    <p>
                      Try changing your
                      search.
                    </p>

                  </div>
                )}

              </div>

            </>
          )}

          {/* =========================
              ROOM REPORT
          ========================= */}

          {reportType === "Rooms" && (
            <div className="reservation-table-card">

              <div className="reservation-table-header">

                <div>
                  <p>
                    ROOM MANAGEMENT
                  </p>

                  <h3>
                    Room Performance
                  </h3>
                </div>

                <span>
                  {roomReport.length} rooms
                </span>

              </div>

              <div className="reservation-table-wrapper">

                <table className="reservation-table">

                  <thead>

                    <tr>

                      <th>
                        Room
                      </th>

                      <th>
                        Type
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Price
                      </th>

                      <th>
                        Bookings
                      </th>

                      <th>
                        Revenue
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {roomReport.map(
                      (room) => (
                        <tr
                          key={room.room}
                        >

                          <td>
                            <strong>
                              Room{" "}
                              {room.room}
                            </strong>
                          </td>

                          <td>
                            {room.type}
                          </td>

                          <td>
                            <span
                              className={`reservation-status ${room.status
                                .toLowerCase()
                                .replace(
                                  " ",
                                  "-"
                                )}`}
                            >
                              {
                                room.status
                              }
                            </span>
                          </td>

                          <td>
                            <strong>
                              ₹
                              {room.price.toLocaleString(
                                "en-IN"
                              )}
                            </strong>
                          </td>

                          <td>
                            {room.bookings}
                          </td>

                          <td>
                            <strong>
                              ₹
                              {room.revenue.toLocaleString(
                                "en-IN"
                              )}
                            </strong>
                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>
          )}

          {/* =========================
              HOUSEKEEPING REPORT
          ========================= */}

          {reportType ===
            "Housekeeping" && (
            <div className="reservation-table-card">

              <div className="reservation-table-header">

                <div>
                  <p>
                    HOUSEKEEPING
                  </p>

                  <h3>
                    Housekeeping Activity
                  </h3>
                </div>

                <span>
                  {
                    housekeepingReport.length
                  } tasks
                </span>

              </div>

              <div className="reservation-table-wrapper">

                <table className="reservation-table">

                  <thead>

                    <tr>

                      <th>
                        Room
                      </th>

                      <th>
                        Task
                      </th>

                      <th>
                        Staff
                      </th>

                      <th>
                        Priority
                      </th>

                      <th>
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {housekeepingReport.map(
                      (task) => (
                        <tr
                          key={task.id}
                        >

                          <td>
                            <strong>
                              Room{" "}
                              {task.room}
                            </strong>
                          </td>

                          <td>
                            {task.task}
                          </td>

                          <td>
                            {task.staff}
                          </td>

                          <td>
                            <span
                              className={`reservation-status ${task.priority
                                .toLowerCase()
                                .replace(
                                  " ",
                                  "-"
                                )}`}
                            >
                              {
                                task.priority
                              }
                            </span>
                          </td>

                          <td>
                            <span
                              className={`reservation-status ${task.status
                                .toLowerCase()
                                .replace(
                                  " ",
                                  "-"
                                )}`}
                            >
                              {
                                task.status
                              }
                            </span>
                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>
          )}

          {/* =========================
              REPORT FOOTER
          ========================= */}

          <div
            style={{
              marginTop: "24px",
              padding: "18px 20px",
              borderRadius: "14px",
              background: "#f8f9fb",
              border: "1px solid #e8eaf0",
              color: "#667085",
              fontSize: "13px",
            }}
          >
            <strong
              style={{
                color: "#00143d",
              }}
            >
              StaySphere Reports
            </strong>

            <span>
              {" "}
              — This report currently uses
              frontend mock data. Real-time
              reports, database aggregation,
              Excel/PDF export and date-based
              filtering can be connected when
              the backend is implemented.
            </span>
          </div>

        </main>

      </div>
    </div>
  );
}