"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const initialSettings = {
  hotelName: "StaySphere Hotel",
  hotelCode: "STAY-001",
  email: "admin@staysphere.com",
  phone: "9876543210",
  address:
    "123 Hotel Street, Jaipur, Rajasthan, India",
  city: "Jaipur",
  state: "Rajasthan",
  country: "India",
  pincode: "302001",

  checkInTime: "14:00",
  checkOutTime: "11:00",

  currency: "INR",
  currencySymbol: "₹",

  taxEnabled: true,
  taxName: "GST",
  taxPercentage: "18",

  bookingEnabled: true,
  allowOnlineBooking: true,
  allowCancellation: true,
  cancellationHours: "24",

  emailNotifications: true,
  smsNotifications: true,
  bookingNotifications: true,
  paymentNotifications: true,
  housekeepingNotifications: true,
};

export default function SettingsPage() {
  const [settings, setSettings] =
    useState(initialSettings);

  const [activeTab, setActiveTab] =
    useState("Hotel Profile");

  const [saved, setSaved] =
    useState(false);

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [passwordForm, setPasswordForm] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  /* =========================
     UPDATE SETTING
  ========================= */

  const updateSetting = (field, value) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
  };

  /* =========================
     SAVE SETTINGS
  ========================= */

  const handleSaveSettings = () => {
    setSaved(true);

    alert(
      "Settings saved successfully."
    );

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  /* =========================
     RESET SETTINGS
  ========================= */

  const handleResetSettings = () => {
    const confirmReset =
      window.confirm(
        "Are you sure you want to reset all settings?"
      );

    if (!confirmReset) {
      return;
    }

    setSettings(initialSettings);
    setSaved(false);
  };

  /* =========================
     CHANGE PASSWORD
  ========================= */

  const handleChangePassword = () => {
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      alert(
        "Please fill all password fields."
      );
      return;
    }

    if (
      passwordForm.newPassword.length < 6
    ) {
      alert(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      alert(
        "New password and confirm password do not match."
      );
      return;
    }

    alert(
      "Password changed successfully."
    );

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowPasswordModal(false);
  };

  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="main-section">

        <Header />

        {/* =========================
            CHANGE PASSWORD MODAL
        ========================= */}

        {showPasswordModal && (
          <div className="room-drawer-overlay">

            <div className="room-drawer">

              <div className="room-drawer-header">

                <div>
                  <span>
                    SECURITY
                  </span>

                  <h2>
                    Change Password
                  </h2>
                </div>

                <button
                  className="room-drawer-close"
                  onClick={() =>
                    setShowPasswordModal(
                      false
                    )
                  }
                >
                  ×
                </button>

              </div>

              <div className="room-drawer-content">

                <p>
                  Update your administrator
                  account password.
                </p>

                <div className="room-form-group">
                  <label>
                    Current Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={
                      passwordForm.currentPassword
                    }
                    onChange={(event) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword:
                          event.target.value,
                      })
                    }
                  />
                </div>

                <div className="room-form-group">
                  <label>
                    New Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={
                      passwordForm.newPassword
                    }
                    onChange={(event) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword:
                          event.target.value,
                      })
                    }
                  />
                </div>

                <div className="room-form-group">
                  <label>
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={
                      passwordForm.confirmPassword
                    }
                    onChange={(event) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword:
                          event.target.value,
                      })
                    }
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "24px",
                  }}
                >

                  <button
                    className="add-room-btn"
                    onClick={
                      handleChangePassword
                    }
                  >
                    Change Password
                  </button>

                  <button
                    className="add-room-btn"
                    onClick={() =>
                      setShowPasswordModal(
                        false
                      )
                    }
                    style={{
                      background:
                        "#f2f4f7",
                      color:
                        "#344054",
                    }}
                  >
                    Cancel
                  </button>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* =========================
            SETTINGS PAGE
        ========================= */}

        <main className="main-content">

          {/* PAGE HEADER */}

          <div className="rooms-page-header">

            <div>
              <h1>
                Settings
              </h1>

              <p>
                Manage your hotel profile,
                booking preferences and
                notification settings.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >

              <button
                className="add-room-btn"
                onClick={
                  handleResetSettings
                }
                style={{
                  background:
                    "#f2f4f7",
                  color:
                    "#344054",
                }}
              >
                Reset
              </button>

              <button
                className="add-room-btn"
                onClick={
                  handleSaveSettings
                }
              >
                Save Changes
              </button>

            </div>

          </div>

          {/* =========================
              SETTINGS LAYOUT
          ========================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "230px minmax(0, 1fr)",
              gap: "24px",
              alignItems: "start",
            }}
          >

            {/* =========================
                SETTINGS SIDEBAR
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
                  "10px",
              }}
            >

              {[
                "Hotel Profile",
                "General",
                "Tax & Billing",
                "Booking",
                "Notifications",
                "Security",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab)
                  }
                  style={{
                    width: "100%",
                    textAlign:
                      "left",
                    padding:
                      "13px 15px",
                    border: "none",
                    borderRadius:
                      "10px",
                    background:
                      activeTab ===
                      tab
                        ? "#00143d"
                        : "transparent",
                    color:
                      activeTab ===
                      tab
                        ? "#ffffff"
                        : "#475467",
                    fontWeight:
                      activeTab ===
                      tab
                        ? "700"
                        : "500",
                    cursor:
                      "pointer",
                    marginBottom:
                      "4px",
                  }}
                >
                  {tab}
                </button>
              ))}

            </div>

            {/* =========================
                SETTINGS CONTENT
            ========================= */}

            <div>

              {/* =========================
                  HOTEL PROFILE
              ========================= */}

              {activeTab ===
                "Hotel Profile" && (
                <div
                  style={{
                    background:
                      "#ffffff",
                    border:
                      "1px solid #e8eaf0",
                    borderRadius:
                      "18px",
                    padding:
                      "26px",
                  }}
                >

                  <div
                    style={{
                      marginBottom:
                        "24px",
                    }}
                  >
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
                      HOTEL PROFILE
                    </span>

                    <h2
                      style={{
                        margin:
                          "5px 0",
                        color:
                          "#00143d",
                      }}
                    >
                      Hotel Information
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color:
                          "#667085",
                      }}
                    >
                      Basic information
                      about your hotel.
                    </p>
                  </div>

                  <div
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap:
                        "18px",
                    }}
                  >

                    <div className="room-form-group">
                      <label>
                        Hotel Name
                      </label>

                      <input
                        type="text"
                        value={
                          settings.hotelName
                        }
                        onChange={(event) =>
                          updateSetting(
                            "hotelName",
                            event.target
                              .value
                          )
                        }
                      />
                    </div>

                    <div className="room-form-group">
                      <label>
                        Hotel Code
                      </label>

                      <input
                        type="text"
                        value={
                          settings.hotelCode
                        }
                        onChange={(event) =>
                          updateSetting(
                            "hotelCode",
                            event.target
                              .value
                          )
                        }
                      />
                    </div>

                    <div className="room-form-group">
                      <label>
                        Email
                      </label>

                      <input
                        type="email"
                        value={
                          settings.email
                        }
                        onChange={(event) =>
                          updateSetting(
                            "email",
                            event.target
                              .value
                          )
                        }
                      />
                    </div>

                    <div className="room-form-group">
                      <label>
                        Phone
                      </label>

                      <input
                        type="tel"
                        maxLength="10"
                        value={
                          settings.phone
                        }
                        onChange={(event) =>
                          updateSetting(
                            "phone",
                            event.target
                              .value
                          )
                        }
                      />
                    </div>

                    <div
                      className="room-form-group"
                      style={{
                        gridColumn:
                          "1 / -1",
                      }}
                    >
                      <label>
                        Address
                      </label>

                      <textarea
                        rows="3"
                        value={
                          settings.address
                        }
                        onChange={(event) =>
                          updateSetting(
                            "address",
                            event.target
                              .value
                          )
                        }
                      />
                    </div>

                    <div className="room-form-group">
                      <label>
                        City
                      </label>

                      <input
                        type="text"
                        value={
                          settings.city
                        }
                        onChange={(event) =>
                          updateSetting(
                            "city",
                            event.target
                              .value
                          )
                        }
                      />
                    </div>

                    <div className="room-form-group">
                      <label>
                        State
                      </label>

                      <input
                        type="text"
                        value={
                          settings.state
                        }
                        onChange={(event) =>
                          updateSetting(
                            "state",
                            event.target
                              .value
                          )
                        }
                      />
                    </div>

                    <div className="room-form-group">
                      <label>
                        Country
                      </label>

                      <input
                        type="text"
                        value={
                          settings.country
                        }
                        onChange={(event) =>
                          updateSetting(
                            "country",
                            event.target
                              .value
                          )
                        }
                      />
                    </div>

                    <div className="room-form-group">
                      <label>
                        Pincode
                      </label>

                      <input
                        type="text"
                        value={
                          settings.pincode
                        }
                        onChange={(event) =>
                          updateSetting(
                            "pincode",
                            event.target
                              .value
                          )
                        }
                      />
                    </div>

                  </div>

                </div>
              )}

              {/* =========================
                  GENERAL
              ========================= */}

              {activeTab ===
                "General" && (
                <div
                  style={{
                    background:
                      "#ffffff",
                    border:
                      "1px solid #e8eaf0",
                    borderRadius:
                      "18px",
                    padding:
                      "26px",
                  }}
                >

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
                    GENERAL SETTINGS
                  </span>

                  <h2
                    style={{
                      margin:
                        "5px 0",
                      color:
                        "#00143d",
                    }}
                  >
                    Hotel Operations
                  </h2>

                  <p
                    style={{
                      color:
                        "#667085",
                      marginBottom:
                        "24px",
                    }}
                  >
                    Configure your daily
                    hotel operating timings.
                  </p>

                  <div
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap:
                        "18px",
                    }}
                  >

                    <div className="room-form-group">
                      <label>
                        Check-in Time
                      </label>

                      <input
                        type="time"
                        value={
                          settings.checkInTime
                        }
                        onChange={(event) =>
                          updateSetting(
                            "checkInTime",
                            event.target
                              .value
                          )
                        }
                      />
                    </div>

                    <div className="room-form-group">
                      <label>
                        Check-out Time
                      </label>

                      <input
                        type="time"
                        value={
                          settings.checkOutTime
                        }
                        onChange={(event) =>
                          updateSetting(
                            "checkOutTime",
                            event.target
                              .value
                          )
                        }
                      />
                    </div>

                    <div className="room-form-group">
                      <label>
                        Currency
                      </label>

                      <select
                        value={
                          settings.currency
                        }
                        onChange={(event) =>
                          updateSetting(
                            "currency",
                            event.target
                              .value
                          )
                        }
                      >
                        <option value="INR">
                          INR - Indian Rupee
                        </option>

                        <option value="USD">
                          USD - US Dollar
                        </option>

                        <option value="EUR">
                          EUR - Euro
                        </option>

                        <option value="GBP">
                          GBP - British Pound
                        </option>
                      </select>
                    </div>

                    <div className="room-form-group">
                      <label>
                        Currency Symbol
                      </label>

                      <input
                        type="text"
                        value={
                          settings.currencySymbol
                        }
                        onChange={(event) =>
                          updateSetting(
                            "currencySymbol",
                            event.target
                              .value
                          )
                        }
                      />
                    </div>

                  </div>

                </div>
              )}

              {/* =========================
                  TAX & BILLING
              ========================= */}

              {activeTab ===
                "Tax & Billing" && (
                <div
                  style={{
                    background:
                      "#ffffff",
                    border:
                      "1px solid #e8eaf0",
                    borderRadius:
                      "18px",
                    padding:
                      "26px",
                  }}
                >

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
                    TAX & BILLING
                  </span>

                  <h2
                    style={{
                      margin:
                        "5px 0",
                      color:
                        "#00143d",
                    }}
                  >
                    Tax Configuration
                  </h2>

                  <p
                    style={{
                      color:
                        "#667085",
                      marginBottom:
                        "24px",
                    }}
                  >
                    Configure taxes applied
                    to hotel bookings.
                  </p>

                  {/* TAX ENABLE */}

                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      padding:
                        "16px",
                      border:
                        "1px solid #e8eaf0",
                      borderRadius:
                        "12px",
                      marginBottom:
                        "20px",
                    }}
                  >

                    <div>
                      <strong>
                        Enable Tax
                      </strong>

                      <p
                        style={{
                          margin:
                            "4px 0 0",
                          color:
                            "#667085",
                          fontSize:
                            "13px",
                        }}
                      >
                        Apply tax to
                        reservations and
                        payments.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        updateSetting(
                          "taxEnabled",
                          !settings.taxEnabled
                        )
                      }
                      style={{
                        width:
                          "52px",
                        height:
                          "28px",
                        border:
                          "none",
                        borderRadius:
                          "20px",
                        background:
                          settings.taxEnabled
                            ? "#00143d"
                            : "#d0d5dd",
                        position:
                          "relative",
                        cursor:
                          "pointer",
                      }}
                    >
                      <span
                        style={{
                          position:
                            "absolute",
                          top:
                            "4px",
                          left:
                            settings.taxEnabled
                              ? "28px"
                              : "4px",
                          width:
                            "20px",
                          height:
                            "20px",
                          borderRadius:
                            "50%",
                          background:
                            "#ffffff",
                          transition:
                            "0.2s",
                        }}
                      />
                    </button>

                  </div>

                  {settings.taxEnabled && (
                    <div
                      style={{
                        display:
                          "grid",
                        gridTemplateColumns:
                          "1fr 1fr",
                        gap:
                          "18px",
                      }}
                    >

                      <div className="room-form-group">
                        <label>
                          Tax Name
                        </label>

                        <input
                          type="text"
                          value={
                            settings.taxName
                          }
                          onChange={(event) =>
                            updateSetting(
                              "taxName",
                              event.target
                                .value
                            )
                          }
                        />
                      </div>

                      <div className="room-form-group">
                        <label>
                          Tax Percentage
                        </label>

                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={
                            settings.taxPercentage
                          }
                          onChange={(event) =>
                            updateSetting(
                              "taxPercentage",
                              event.target
                                .value
                            )
                          }
                        />
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* =========================
                  BOOKING
              ========================= */}

              {activeTab ===
                "Booking" && (
                <div
                  style={{
                    background:
                      "#ffffff",
                    border:
                      "1px solid #e8eaf0",
                    borderRadius:
                      "18px",
                    padding:
                      "26px",
                  }}
                >

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
                    BOOKING SETTINGS
                  </span>

                  <h2
                    style={{
                      margin:
                        "5px 0",
                      color:
                        "#00143d",
                    }}
                  >
                    Reservation Preferences
                  </h2>

                  <p
                    style={{
                      color:
                        "#667085",
                      marginBottom:
                        "24px",
                    }}
                  >
                    Control how reservations
                    are handled.
                  </p>

                  <div
                    style={{
                      display:
                        "flex",
                      flexDirection:
                        "column",
                      gap:
                        "12px",
                    }}
                  >

                    {[
                      {
                        key:
                          "bookingEnabled",
                        title:
                          "Enable Bookings",
                        description:
                          "Allow new hotel reservations.",
                      },
                      {
                        key:
                          "allowOnlineBooking",
                        title:
                          "Online Booking",
                        description:
                          "Allow customers to make online reservations.",
                      },
                      {
                        key:
                          "allowCancellation",
                        title:
                          "Allow Cancellation",
                        description:
                          "Allow guests to cancel reservations.",
                      },
                    ].map((item) => (
                      <div
                        key={
                          item.key
                        }
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "center",
                          padding:
                            "16px",
                          border:
                            "1px solid #e8eaf0",
                          borderRadius:
                            "12px",
                        }}
                      >

                        <div>
                          <strong>
                            {item.title}
                          </strong>

                          <p
                            style={{
                              margin:
                                "4px 0 0",
                              color:
                                "#667085",
                              fontSize:
                                "13px",
                            }}
                          >
                            {
                              item.description
                            }
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            updateSetting(
                              item.key,
                              !settings[
                                item.key
                              ]
                            )
                          }
                          style={{
                            width:
                              "52px",
                            height:
                              "28px",
                            border:
                              "none",
                            borderRadius:
                              "20px",
                            background:
                              settings[
                                item.key
                              ]
                                ? "#00143d"
                                : "#d0d5dd",
                            position:
                              "relative",
                            cursor:
                              "pointer",
                          }}
                        >
                          <span
                            style={{
                              position:
                                "absolute",
                              top:
                                "4px",
                              left:
                                settings[
                                  item.key
                                ]
                                  ? "28px"
                                  : "4px",
                              width:
                                "20px",
                              height:
                                "20px",
                              borderRadius:
                                "50%",
                              background:
                                "#ffffff",
                            }}
                          />
                        </button>

                      </div>
                    ))}

                  </div>

                  {settings.allowCancellation && (
                    <div
                      className="room-form-group"
                      style={{
                        marginTop:
                          "20px",
                        maxWidth:
                          "300px",
                      }}
                    >
                      <label>
                        Cancellation Before
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={
                          settings.cancellationHours
                        }
                        onChange={(event) =>
                          updateSetting(
                            "cancellationHours",
                            event.target
                              .value
                          )
                        }
                      />

                      <small
                        style={{
                          color:
                            "#667085",
                        }}
                      >
                        Hours before
                        check-in.
                      </small>
                    </div>
                  )}

                </div>
              )}

              {/* =========================
                  NOTIFICATIONS
              ========================= */}

              {activeTab ===
                "Notifications" && (
                <div
                  style={{
                    background:
                      "#ffffff",
                    border:
                      "1px solid #e8eaf0",
                    borderRadius:
                      "18px",
                    padding:
                      "26px",
                  }}
                >

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
                    NOTIFICATIONS
                  </span>

                  <h2
                    style={{
                      margin:
                        "5px 0",
                      color:
                        "#00143d",
                    }}
                  >
                    Notification Preferences
                  </h2>

                  <p
                    style={{
                      color:
                        "#667085",
                      marginBottom:
                        "24px",
                    }}
                  >
                    Choose which hotel
                    notifications should be
                    enabled.
                  </p>

                  <div
                    style={{
                      display:
                        "flex",
                      flexDirection:
                        "column",
                      gap:
                        "12px",
                    }}
                  >

                    {[
                      {
                        key:
                          "emailNotifications",
                        title:
                          "Email Notifications",
                        description:
                          "Receive important hotel updates through email.",
                      },
                      {
                        key:
                          "smsNotifications",
                        title:
                          "SMS Notifications",
                        description:
                          "Send booking and payment updates through SMS.",
                      },
                      {
                        key:
                          "bookingNotifications",
                        title:
                          "Booking Notifications",
                        description:
                          "Get notified when a reservation is created or updated.",
                      },
                      {
                        key:
                          "paymentNotifications",
                        title:
                          "Payment Notifications",
                        description:
                          "Get notified when payments are received or refunded.",
                      },
                      {
                        key:
                          "housekeepingNotifications",
                        title:
                          "Housekeeping Notifications",
                        description:
                          "Receive updates about housekeeping tasks.",
                      },
                    ].map((item) => (
                      <div
                        key={
                          item.key
                        }
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "center",
                          padding:
                            "16px",
                          border:
                            "1px solid #e8eaf0",
                          borderRadius:
                            "12px",
                        }}
                      >

                        <div>
                          <strong>
                            {item.title}
                          </strong>

                          <p
                            style={{
                              margin:
                                "4px 0 0",
                              color:
                                "#667085",
                              fontSize:
                                "13px",
                            }}
                          >
                            {
                              item.description
                            }
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            updateSetting(
                              item.key,
                              !settings[
                                item.key
                              ]
                            )
                          }
                          style={{
                            width:
                              "52px",
                            height:
                              "28px",
                            border:
                              "none",
                            borderRadius:
                              "20px",
                            background:
                              settings[
                                item.key
                              ]
                                ? "#00143d"
                                : "#d0d5dd",
                            position:
                              "relative",
                            cursor:
                              "pointer",
                          }}
                        >
                          <span
                            style={{
                              position:
                                "absolute",
                              top:
                                "4px",
                              left:
                                settings[
                                  item.key
                                ]
                                  ? "28px"
                                  : "4px",
                              width:
                                "20px",
                              height:
                                "20px",
                              borderRadius:
                                "50%",
                              background:
                                "#ffffff",
                            }}
                          />
                        </button>

                      </div>
                    ))}

                  </div>

                </div>
              )}

              {/* =========================
                  SECURITY
              ========================= */}

              {activeTab ===
                "Security" && (
                <div
                  style={{
                    background:
                      "#ffffff",
                    border:
                      "1px solid #e8eaf0",
                    borderRadius:
                      "18px",
                    padding:
                      "26px",
                  }}
                >

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
                    SECURITY
                  </span>

                  <h2
                    style={{
                      margin:
                        "5px 0",
                      color:
                        "#00143d",
                    }}
                  >
                    Account Security
                  </h2>

                  <p
                    style={{
                      color:
                        "#667085",
                      marginBottom:
                        "24px",
                    }}
                  >
                    Manage your administrator
                    account security.
                  </p>

                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      padding:
                        "18px",
                      border:
                        "1px solid #e8eaf0",
                      borderRadius:
                        "12px",
                    }}
                  >

                    <div>
                      <strong>
                        Administrator Password
                      </strong>

                      <p
                        style={{
                          margin:
                            "5px 0 0",
                          color:
                            "#667085",
                          fontSize:
                            "13px",
                        }}
                      >
                        Change the password
                        used to access the
                        admin panel.
                      </p>
                    </div>

                    <button
                      className="add-room-btn"
                      onClick={() =>
                        setShowPasswordModal(
                          true
                        )
                      }
                    >
                      Change Password
                    </button>

                  </div>

                  <div
                    style={{
                      marginTop:
                        "16px",
                      padding:
                        "16px",
                      borderRadius:
                        "12px",
                      background:
                        "#f8f9fb",
                      color:
                        "#667085",
                      fontSize:
                        "13px",
                    }}
                  >
                    <strong
                      style={{
                        color:
                          "#00143d",
                      }}
                    >
                      Security Note:
                    </strong>{" "}
                    This is currently a
                    frontend-only demo.
                    Authentication and
                    password changes will be
                    connected to the backend
                    later.
                  </div>

                </div>
              )}

            </div>

          </div>

          {/* =========================
              SAVE BAR
          ========================= */}

          <div
            style={{
              marginTop:
                "24px",
              padding:
                "18px 20px",
              background:
                saved
                  ? "#ecfdf3"
                  : "#f8f9fb",
              border:
                saved
                  ? "1px solid #abefc6"
                  : "1px solid #e8eaf0",
              borderRadius:
                "14px",
              display:
                "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              gap:
                "15px",
            }}
          >

            <div>

              <strong
                style={{
                  color:
                    saved
                      ? "#067647"
                      : "#00143d",
                }}
              >
                {saved
                  ? "✓ Changes saved successfully"
                  : "Settings are ready to be updated"}
              </strong>

              <p
                style={{
                  margin:
                    "4px 0 0",
                  color:
                    "#667085",
                  fontSize:
                    "13px",
                }}
              >
                Remember to save your
                changes after updating
                settings.
              </p>

            </div>

            <button
              className="add-room-btn"
              onClick={
                handleSaveSettings
              }
            >
              Save Changes
            </button>

          </div>

        </main>

      </div>
    </div>
  );
}