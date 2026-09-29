"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const initialGuests = [
  {
    id: 1,
    name: "Richa Gupta",
    phone: "9876543210",
    email: "richa@example.com",
    idType: "Aadhaar",
    idNumber: "XXXX XXXX 4521",
    totalStays: 5,
    totalSpent: 42500,
    status: "Currently Staying",
    vip: true,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    phone: "9876543211",
    email: "rahul@example.com",
    idType: "Passport",
    idNumber: "P******42",
    totalStays: 3,
    totalSpent: 28600,
    status: "Returning",
    vip: false,
  },
  {
    id: 3,
    name: "Ankit Verma",
    phone: "9876543212",
    email: "ankit@example.com",
    idType: "Driving Licence",
    idNumber: "DL******89",
    totalStays: 7,
    totalSpent: 65200,
    status: "Currently Staying",
    vip: true,
  },
  {
    id: 4,
    name: "Priya Singh",
    phone: "9876543213",
    email: "priya@example.com",
    idType: "Voter ID",
    idNumber: "ABC****781",
    totalStays: 2,
    totalSpent: 15400,
    status: "Returning",
    vip: false,
  },
  {
    id: 5,
    name: "Aman Mehta",
    phone: "9876543214",
    email: "aman@example.com",
    idType: "Aadhaar",
    idNumber: "XXXX XXXX 6724",
    totalStays: 1,
    totalSpent: 7200,
    status: "New Guest",
    vip: false,
  },
  {
    id: 6,
    name: "Neha Kapoor",
    phone: "9876543215",
    email: "neha@example.com",
    idType: "Passport",
    idNumber: "P******65",
    totalStays: 4,
    totalSpent: 38900,
    status: "Returning",
    vip: true,
  },
];

export default function GuestsPage() {
  const [guests, setGuests] = useState(initialGuests);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [selectedGuest, setSelectedGuest] = useState(null);

  const [showGuestModal, setShowGuestModal] = useState(false);

  const [editingGuest, setEditingGuest] = useState(null);

  const [guestToDelete, setGuestToDelete] = useState(null);

  const [guestForm, setGuestForm] = useState({
    name: "",
    phone: "",
    email: "",
    idType: "",
    idNumber: "",
    totalStays: "",
    totalSpent: "",
    status: "New Guest",
    vip: false,
  });

  const resetGuestForm = () => {
    setGuestForm({
      name: "",
      phone: "",
      email: "",
      idType: "",
      idNumber: "",
      totalStays: "",
      totalSpent: "",
      status: "New Guest",
      vip: false,
    });
  };

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const maskIdNumber = (idType, value) => {
    if (!value) return "";

    const cleanValue = value.trim();

    if (idType === "Aadhaar") {
      const digits = cleanValue.replace(/\D/g, "");

      if (digits.length === 12) {
        return `XXXX XXXX ${digits.slice(-4)}`;
      }

      return cleanValue;
    }

    if (idType === "Passport") {
      if (cleanValue.length <= 2) {
        return cleanValue;
      }

      return `${cleanValue.slice(0, 1)}******${cleanValue.slice(-2)}`;
    }

    if (idType === "Driving Licence") {
      if (cleanValue.length <= 2) {
        return cleanValue;
      }

      return `${cleanValue.slice(0, 2)}******${cleanValue.slice(-2)}`;
    }

    if (idType === "Voter ID") {
      if (cleanValue.length <= 3) {
        return cleanValue;
      }

      return `${cleanValue.slice(0, 3)}****${cleanValue.slice(-3)}`;
    }

    return cleanValue;
  };

  const validateGuest = () => {
    if (!guestForm.name.trim()) {
      alert("Please enter guest name.");
      return false;
    }

    if (!guestForm.phone.trim()) {
      alert("Please enter phone number.");
      return false;
    }

    if (!/^\d{10}$/.test(guestForm.phone)) {
      alert("Phone number must contain exactly 10 digits.");
      return false;
    }

    if (!guestForm.email.trim()) {
      alert("Please enter email address.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(guestForm.email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!guestForm.idType) {
      alert("Please select identity type.");
      return false;
    }

    if (!guestForm.idNumber.trim()) {
      alert("Please enter identity number.");
      return false;
    }

    if (guestForm.totalStays === "") {
      alert("Please enter total stays.");
      return false;
    }

    if (Number(guestForm.totalStays) < 0) {
      alert("Total stays cannot be negative.");
      return false;
    }

    if (guestForm.totalSpent === "") {
      alert("Please enter total spent.");
      return false;
    }

    if (Number(guestForm.totalSpent) < 0) {
      alert("Total spent cannot be negative.");
      return false;
    }

    return true;
  };

  const handleAddGuest = () => {
    if (!validateGuest()) return;

    const newGuest = {
      id: Date.now(),
      name: guestForm.name.trim(),
      phone: guestForm.phone,
      email: guestForm.email.trim(),
      idType: guestForm.idType,
      idNumber: maskIdNumber(
        guestForm.idType,
        guestForm.idNumber
      ),
      totalStays: Number(guestForm.totalStays),
      totalSpent: Number(guestForm.totalSpent),
      status: guestForm.status,
      vip: guestForm.vip,
    };

    setGuests((previousGuests) => [
      ...previousGuests,
      newGuest,
    ]);

    resetGuestForm();
    setShowGuestModal(false);

    alert("Guest added successfully.");
  };

  const handleEditGuest = (guest) => {
    setEditingGuest(guest);

    setGuestForm({
      name: guest.name,
      phone: guest.phone,
      email: guest.email,
      idType: guest.idType,
      idNumber: guest.idNumber,
      totalStays: String(guest.totalStays),
      totalSpent: String(guest.totalSpent),
      status: guest.status,
      vip: guest.vip,
    });

    setSelectedGuest(null);
    setShowGuestModal(true);
  };

  const handleUpdateGuest = () => {
    if (!validateGuest()) return;

    setGuests((previousGuests) =>
      previousGuests.map((guest) =>
        guest.id === editingGuest.id
          ? {
              ...guest,
              name: guestForm.name.trim(),
              phone: guestForm.phone,
              email: guestForm.email.trim(),
              idType: guestForm.idType,
              idNumber: maskIdNumber(
                guestForm.idType,
                guestForm.idNumber
              ),
              totalStays: Number(guestForm.totalStays),
              totalSpent: Number(guestForm.totalSpent),
              status: guestForm.status,
              vip: guestForm.vip,
            }
          : guest
      )
    );

    resetGuestForm();
    setShowGuestModal(false);
    setEditingGuest(null);

    alert("Guest updated successfully.");
  };

  const handleCloseGuestModal = () => {
    setShowGuestModal(false);
    setEditingGuest(null);
    resetGuestForm();
  };

  const handleDeleteGuest = () => {
    if (!guestToDelete) return;

    setGuests((previousGuests) =>
      previousGuests.filter(
        (guest) => guest.id !== guestToDelete.id
      )
    );

    if (selectedGuest?.id === guestToDelete.id) {
      setSelectedGuest(null);
    }

    setGuestToDelete(null);

    alert("Guest deleted successfully.");
  };

  const handleToggleVip = (guest) => {
    setGuests((previousGuests) =>
      previousGuests.map((item) =>
        item.id === guest.id
          ? {
              ...item,
              vip: !item.vip,
            }
          : item
      )
    );

    if (selectedGuest?.id === guest.id) {
      setSelectedGuest({
        ...guest,
        vip: !guest.vip,
      });
    }
  };

  const filteredGuests = guests.filter((guest) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      guest.name.toLowerCase().includes(searchText) ||
      guest.phone.includes(searchText) ||
      guest.email.toLowerCase().includes(searchText) ||
      guest.idType.toLowerCase().includes(searchText) ||
      guest.idNumber.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" ||
      (filter === "VIP" && guest.vip) ||
      guest.status === filter;

    return matchesSearch && matchesFilter;
  });

  const totalGuests = guests.length;

  const currentlyStaying = guests.filter(
    (guest) => guest.status === "Currently Staying"
  ).length;

  const returningGuests = guests.filter(
    (guest) => guest.status === "Returning"
  ).length;

  const vipGuests = guests.filter(
    (guest) => guest.vip
  ).length;

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="main-section">
        <Header />

        <main className="main-content">
          {/* PAGE HEADER */}

          <div className="reservations-page-header">
            <div>
              <h1>Guests</h1>

              <p>
                Manage guest profiles, identity details and
                stay information.
              </p>
            </div>

            <button
              className="add-room-btn"
              onClick={() => {
                setEditingGuest(null);
                resetGuestForm();
                setShowGuestModal(true);
              }}
            >
              + Add Guest
            </button>
          </div>

          {/* SUMMARY */}

          <div className="reservation-summary">
            <div className="reservation-summary-card">
              <span>Total Guests</span>
              <strong>{totalGuests}</strong>
            </div>

            <div className="reservation-summary-card">
              <span>Currently Staying</span>
              <strong>{currentlyStaying}</strong>
            </div>

            <div className="reservation-summary-card">
              <span>Returning Guests</span>
              <strong>{returningGuests}</strong>
            </div>

            <div className="reservation-summary-card">
              <span>VIP Guests</span>
              <strong>{vipGuests}</strong>
            </div>
          </div>

          {/* SEARCH + FILTER */}

          <div className="reservation-toolbar">
            <input
              type="text"
              placeholder="Search guest name, phone or ID..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            <div className="reservation-filters">
              {[
                "All",
                "Currently Staying",
                "Returning",
                "VIP",
              ].map((status) => (
                <button
                  key={status}
                  className={
                    filter === status
                      ? "active-filter"
                      : ""
                  }
                  onClick={() => setFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* GUEST TABLE */}

          <div className="reservation-table-card">
            <div className="reservation-table-header">
              <div>
                <p>GUEST DIRECTORY</p>

                <h3>All Guests</h3>
              </div>

              <span>
                {filteredGuests.length} guests
              </span>
            </div>

            <div className="reservation-table-wrapper">
              <table className="reservation-table">
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Contact</th>
                    <th>Identity</th>
                    <th>Stays</th>
                    <th>Total Spent</th>
                    <th>Status</th>
                    <th>VIP</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredGuests.map((guest) => (
                    <tr
                      key={guest.id}
                      onClick={() =>
                        setSelectedGuest(guest)
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <td>
                        <div className="reservation-guest">
                          <div className="reservation-avatar">
                            {guest.name.charAt(0)}
                          </div>

                          <div>
                            <strong>{guest.name}</strong>

                            <small>
                              {guest.email}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <strong>{guest.phone}</strong>
                      </td>

                      <td>
                        <strong>{guest.idType}</strong>

                        <small>
                          {guest.idNumber}
                        </small>
                      </td>

                      <td>
                        <strong>
                          {guest.totalStays}
                        </strong>

                        <small>Total stays</small>
                      </td>

                      <td>
                        <strong>
                          {formatCurrency(
                            guest.totalSpent
                          )}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`reservation-status ${
                            guest.status ===
                            "Currently Staying"
                              ? "confirmed"
                              : guest.status ===
                                "Returning"
                              ? "pending"
                              : "refunded"
                          }`}
                        >
                          {guest.status}
                        </span>
                      </td>

                      <td>
                        {guest.vip ? (
                          <span className="payment-status paid">
                            VIP
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "#98a2b3",
                            }}
                          >
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredGuests.length === 0 && (
              <div className="no-reservations">
                <h3>No guests found</h3>

                <p>
                  Try changing your search or filter.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* GUEST DETAILS MODAL */}

      {selectedGuest && (
        <div className="reservation-modal-overlay">
          <div className="reservation-modal">
            <div className="reservation-modal-header">
              <div>
                <span>GUEST PROFILE</span>

                <h2>{selectedGuest.name}</h2>
              </div>

              <button
                className="reservation-modal-close"
                onClick={() =>
                  setSelectedGuest(null)
                }
              >
                ×
              </button>
            </div>

            <div className="reservation-modal-content">
              <div className="reservation-detail-item">
                <span>Guest Name</span>

                <strong>
                  {selectedGuest.name}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>Phone</span>

                <strong>
                  {selectedGuest.phone}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>Email</span>

                <strong>
                  {selectedGuest.email}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>Identity Type</span>

                <strong>
                  {selectedGuest.idType}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>Identity Number</span>

                <strong>
                  {selectedGuest.idNumber}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>Total Stays</span>

                <strong>
                  {selectedGuest.totalStays}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>Total Spent</span>

                <strong>
                  {formatCurrency(
                    selectedGuest.totalSpent
                  )}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>Guest Status</span>

                <strong>
                  {selectedGuest.status}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>VIP Guest</span>

                <strong>
                  {selectedGuest.vip ? "Yes" : "No"}
                </strong>
              </div>

              <div className="reservation-form-actions">
                <button
                  className="add-room-btn"
                  onClick={() =>
                    handleToggleVip(selectedGuest)
                  }
                >
                  {selectedGuest.vip
                    ? "Remove VIP"
                    : "Make VIP"}
                </button>

                <button
                  className="add-room-btn"
                  onClick={() =>
                    handleEditGuest(selectedGuest)
                  }
                >
                  ✏️ Edit Guest
                </button>

                <button
                  className="add-room-btn"
                  onClick={() => {
                    setGuestToDelete(selectedGuest);
                    setSelectedGuest(null);
                  }}
                  style={{
                    background: "#fbecee",
                    color: "#a54855",
                  }}
                >
                  ✕ Delete Guest
                </button>

                <button
                  className="add-room-btn"
                  onClick={() =>
                    setSelectedGuest(null)
                  }
                  style={{
                    background: "#f2f4f7",
                    color: "#344054",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT GUEST MODAL */}

      {showGuestModal && (
        <div className="reservation-modal-overlay">
          <div className="reservation-modal">
            <div className="reservation-modal-header">
              <div>
                <span>GUEST MANAGEMENT</span>

                <h2>
                  {editingGuest
                    ? "Edit Guest"
                    : "Add New Guest"}
                </h2>
              </div>

              <button
                className="reservation-modal-close"
                onClick={handleCloseGuestModal}
              >
                ×
              </button>
            </div>

            <div className="reservation-modal-content">
              <p>
                {editingGuest
                  ? "Update guest information."
                  : "Add a new guest profile to the hotel system."}
              </p>

              <div className="reservation-form-group">
                <label>Guest Name</label>

                <input
                  type="text"
                  placeholder="Enter guest name"
                  value={guestForm.name}
                  onChange={(event) =>
                    setGuestForm({
                      ...guestForm,
                      name: event.target.value,
                    })
                  }
                />
              </div>

              <div className="reservation-form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  placeholder="Enter 10 digit mobile number"
                  maxLength="10"
                  value={guestForm.phone}
                  onChange={(event) =>
                    setGuestForm({
                      ...guestForm,
                      phone: event.target.value,
                    })
                  }
                />
              </div>

              <div className="reservation-form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter email address"
                  value={guestForm.email}
                  onChange={(event) =>
                    setGuestForm({
                      ...guestForm,
                      email: event.target.value,
                    })
                  }
                />
              </div>

              <div className="reservation-form-group">
                <label>Identity Type</label>

                <select
                  value={guestForm.idType}
                  onChange={(event) =>
                    setGuestForm({
                      ...guestForm,
                      idType: event.target.value,
                    })
                  }
                >
                  <option value="">
                    Select identity type
                  </option>

                  <option value="Aadhaar">
                    Aadhaar
                  </option>

                  <option value="Passport">
                    Passport
                  </option>

                  <option value="Driving Licence">
                    Driving Licence
                  </option>

                  <option value="Voter ID">
                    Voter ID
                  </option>
                </select>
              </div>

              <div className="reservation-form-group">
                <label>Identity Number</label>

                <input
                  type="text"
                  placeholder="Enter identity number"
                  value={guestForm.idNumber}
                  onChange={(event) =>
                    setGuestForm({
                      ...guestForm,
                      idNumber: event.target.value,
                    })
                  }
                />
              </div>

              <div className="reservation-form-group">
                <label>Total Stays</label>

                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 5"
                  value={guestForm.totalStays}
                  onChange={(event) =>
                    setGuestForm({
                      ...guestForm,
                      totalStays: event.target.value,
                    })
                  }
                />
              </div>

              <div className="reservation-form-group">
                <label>Total Spent</label>

                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 42500"
                  value={guestForm.totalSpent}
                  onChange={(event) =>
                    setGuestForm({
                      ...guestForm,
                      totalSpent: event.target.value,
                    })
                  }
                />
              </div>

              <div className="reservation-form-group">
                <label>Guest Status</label>

                <select
                  value={guestForm.status}
                  onChange={(event) =>
                    setGuestForm({
                      ...guestForm,
                      status: event.target.value,
                    })
                  }
                >
                  <option value="New Guest">
                    New Guest
                  </option>

                  <option value="Currently Staying">
                    Currently Staying
                  </option>

                  <option value="Returning">
                    Returning
                  </option>
                </select>
              </div>

              <div className="reservation-form-group">
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={guestForm.vip}
                    onChange={(event) =>
                      setGuestForm({
                        ...guestForm,
                        vip: event.target.checked,
                      })
                    }
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                  />

                  VIP Guest
                </label>
              </div>

              <div className="reservation-form-actions">
                <button
                  className="add-room-btn"
                  onClick={
                    editingGuest
                      ? handleUpdateGuest
                      : handleAddGuest
                  }
                >
                  {editingGuest
                    ? "Update Guest"
                    : "Add Guest"}
                </button>

                <button
                  className="add-room-btn"
                  onClick={handleCloseGuestModal}
                  style={{
                    background: "#f2f4f7",
                    color: "#344054",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}

      {guestToDelete && (
        <div className="reservation-modal-overlay">
          <div className="reservation-modal">
            <div className="reservation-modal-header">
              <div>
                <span>GUEST MANAGEMENT</span>

                <h2>Delete Guest</h2>
              </div>

              <button
                className="reservation-modal-close"
                onClick={() =>
                  setGuestToDelete(null)
                }
              >
                ×
              </button>
            </div>

            <div className="reservation-modal-content">
              <p>
                Are you sure you want to delete this guest
                profile?
              </p>

              <div className="reservation-detail-item">
                <span>Guest</span>

                <strong>
                  {guestToDelete.name}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>Phone</span>

                <strong>
                  {guestToDelete.phone}
                </strong>
              </div>

              <div className="reservation-form-actions">
                <button
                  className="add-room-btn"
                  onClick={() =>
                    setGuestToDelete(null)
                  }
                  style={{
                    background: "#f2f4f7",
                    color: "#344054",
                  }}
                >
                  No, Keep Guest
                </button>

                <button
                  className="add-room-btn"
                  onClick={handleDeleteGuest}
                  style={{
                    background: "#a54855",
                    color: "#ffffff",
                  }}
                >
                  Delete Guest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}