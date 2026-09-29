"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const initialPayments = [
  {
    id: 1,
    transactionId: "PAY-1001",
    reservationId: "RES-1001",
    guest: "Richa Gupta",
    room: "101",
    amount: "8,500",
    method: "UPI",
    status: "Paid",
    paymentDate: "24 Sep 2026",
    phone: "9876543210",
    notes: "Full payment received",
  },
  {
    id: 2,
    transactionId: "PAY-1002",
    reservationId: "RES-1002",
    guest: "Rahul Sharma",
    room: "102",
    amount: "3,100",
    method: "Credit Card",
    status: "Partial",
    paymentDate: "25 Sep 2026",
    phone: "9876543211",
    notes: "Remaining amount due at checkout",
  },
  {
    id: 3,
    transactionId: "PAY-1003",
    reservationId: "RES-1003",
    guest: "Ankit Verma",
    room: "201",
    amount: "9,800",
    method: "Cash",
    status: "Paid",
    paymentDate: "26 Sep 2026",
    phone: "9876543212",
    notes: "Paid at reception",
  },
  {
    id: 4,
    transactionId: "PAY-1004",
    reservationId: "RES-1004",
    guest: "Priya Singh",
    room: "301",
    amount: "5,400",
    method: "Bank Transfer",
    status: "Refunded",
    paymentDate: "27 Sep 2026",
    phone: "9876543213",
    notes: "Reservation cancelled",
  },
  {
    id: 5,
    transactionId: "PAY-1005",
    reservationId: "RES-1005",
    guest: "Karan Mehta",
    room: "202",
    amount: "7,000",
    method: "UPI",
    status: "Pending",
    paymentDate: "27 Sep 2026",
    phone: "9876543214",
    notes: "Payment confirmation pending",
  },
  {
    id: 6,
    transactionId: "PAY-1006",
    reservationId: "RES-1006",
    guest: "Sneha Kapoor",
    room: "302",
    amount: "4,500",
    method: "Debit Card",
    status: "Paid",
    paymentDate: "28 Sep 2026",
    phone: "9876543215",
    notes: "",
  },
];

export default function PaymentsPage() {
  const [payments, setPayments] =
    useState(initialPayments);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [methodFilter, setMethodFilter] =
    useState("All");

  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const [showPaymentModal, setShowPaymentModal] =
    useState(false);

  const [editingPaymentId, setEditingPaymentId] =
    useState(null);

  const [deletePayment, setDeletePayment] =
    useState(null);

  const [paymentForm, setPaymentForm] = useState({
    reservationId: "",
    guest: "",
    room: "",
    amount: "",
    method: "",
    status: "Paid",
    paymentDate: "",
    phone: "",
    notes: "",
  });

  /* =========================
     SUMMARY
  ========================= */

  const totalTransactions = payments.length;

  const totalCollected = payments
    .filter((item) => item.status === "Paid")
    .reduce(
      (total, item) =>
        total + Number(item.amount.replace(/,/g, "")),
      0
    );

  const totalPending = payments
    .filter((item) => item.status === "Pending")
    .reduce(
      (total, item) =>
        total + Number(item.amount.replace(/,/g, "")),
      0
    );

  const totalPartial = payments
    .filter((item) => item.status === "Partial")
    .reduce(
      (total, item) =>
        total + Number(item.amount.replace(/,/g, "")),
      0
    );

  const totalRefunded = payments
    .filter((item) => item.status === "Refunded")
    .reduce(
      (total, item) =>
        total + Number(item.amount.replace(/,/g, "")),
      0
    );

  /* =========================
     RESET FORM
  ========================= */

  const resetForm = () => {
    setPaymentForm({
      reservationId: "",
      guest: "",
      room: "",
      amount: "",
      method: "",
      status: "Paid",
      paymentDate: "",
      phone: "",
      notes: "",
    });
  };

  /* =========================
     DATE FORMAT
  ========================= */

  const formatDateForDisplay = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(
      `${dateString}T00:00:00`
    );

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /* =========================
     VALIDATION
  ========================= */

  const validatePayment = () => {
    if (!paymentForm.reservationId.trim()) {
      alert("Please enter reservation ID.");
      return false;
    }

    if (!paymentForm.guest.trim()) {
      alert("Please enter guest name.");
      return false;
    }

    if (!paymentForm.room.trim()) {
      alert("Please enter room number.");
      return false;
    }

    if (!/^\d+$/.test(paymentForm.room)) {
      alert("Room number must contain only numbers.");
      return false;
    }

    if (!paymentForm.amount) {
      alert("Please enter payment amount.");
      return false;
    }

    if (Number(paymentForm.amount) <= 0) {
      alert("Payment amount must be greater than 0.");
      return false;
    }

    if (!paymentForm.method) {
      alert("Please select payment method.");
      return false;
    }

    if (!paymentForm.status) {
      alert("Please select payment status.");
      return false;
    }

    if (!paymentForm.paymentDate) {
      alert("Please select payment date.");
      return false;
    }

    if (!paymentForm.phone.trim()) {
      alert("Please enter guest phone number.");
      return false;
    }

    if (!/^\d{10}$/.test(paymentForm.phone)) {
      alert(
        "Phone number must contain exactly 10 digits."
      );
      return false;
    }

    return true;
  };

  /* =========================
     ADD / UPDATE PAYMENT
  ========================= */

  const handleSavePayment = () => {
    if (!validatePayment()) {
      return;
    }

    if (editingPaymentId !== null) {
      setPayments((previousPayments) =>
        previousPayments.map((payment) =>
          payment.id === editingPaymentId
            ? {
                ...payment,
                reservationId:
                  paymentForm.reservationId,
                guest:
                  paymentForm.guest.trim(),
                room:
                  paymentForm.room,
                amount: Number(
                  paymentForm.amount
                ).toLocaleString("en-IN"),
                method:
                  paymentForm.method,
                status:
                  paymentForm.status,
                paymentDate:
                  formatDateForDisplay(
                    paymentForm.paymentDate
                  ),
                phone:
                  paymentForm.phone,
                notes:
                  paymentForm.notes,
              }
            : payment
        )
      );

      alert("Payment updated successfully.");
    } else {
      const nextPaymentNumber =
        payments.length + 1001;

      const newPayment = {
        id: Date.now(),
        transactionId:
          `PAY-${nextPaymentNumber}`,
        reservationId:
          paymentForm.reservationId,
        guest:
          paymentForm.guest.trim(),
        room:
          paymentForm.room,
        amount: Number(
          paymentForm.amount
        ).toLocaleString("en-IN"),
        method:
          paymentForm.method,
        status:
          paymentForm.status,
        paymentDate:
          formatDateForDisplay(
            paymentForm.paymentDate
          ),
        phone:
          paymentForm.phone,
        notes:
          paymentForm.notes,
      };

      setPayments((previousPayments) => [
        ...previousPayments,
        newPayment,
      ]);

      alert("Payment added successfully.");
    }

    resetForm();
    setEditingPaymentId(null);
    setShowPaymentModal(false);
  };

  /* =========================
     EDIT PAYMENT
  ========================= */

  const handleEditPayment = (payment) => {
    setEditingPaymentId(payment.id);

    setPaymentForm({
      reservationId:
        payment.reservationId,
      guest:
        payment.guest,
      room:
        payment.room,
      amount:
        payment.amount.replace(/,/g, ""),
      method:
        payment.method,
      status:
        payment.status,
      paymentDate:
        formatDateForInput(
          payment.paymentDate
        ),
      phone:
        payment.phone,
      notes:
        payment.notes || "",
    });

    setSelectedPayment(null);
    setShowPaymentModal(true);
  };

  /* =========================
     DELETE PAYMENT
  ========================= */

  const handleDeletePayment = () => {
    if (!deletePayment) {
      return;
    }

    setPayments((previousPayments) =>
      previousPayments.filter(
        (payment) =>
          payment.id !== deletePayment.id
      )
    );

    setDeletePayment(null);

    alert("Payment deleted successfully.");
  };

  /* =========================
     REFUND PAYMENT
  ========================= */

  const handleRefundPayment = (payment) => {
    setPayments((previousPayments) =>
      previousPayments.map((item) =>
        item.id === payment.id
          ? {
              ...item,
              status: "Refunded",
            }
          : item
      )
    );

    setSelectedPayment({
      ...payment,
      status: "Refunded",
    });

    alert("Payment marked as refunded.");
  };

  /* =========================
     SEARCH + FILTER
  ========================= */

  const filteredPayments = payments.filter(
    (payment) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        payment.transactionId
          .toLowerCase()
          .includes(searchText) ||
        payment.reservationId
          .toLowerCase()
          .includes(searchText) ||
        payment.guest
          .toLowerCase()
          .includes(searchText) ||
        payment.room
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        payment.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" ||
        payment.method === methodFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod
      );
    }
  );

  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="main-section">

        <Header />

        {/* =========================
            PAYMENT DETAILS
        ========================= */}

        {selectedPayment && (
          <div className="room-drawer-overlay">

            <div className="room-drawer">

              <div className="room-drawer-header">

                <div>
                  <span>
                    PAYMENT DETAILS
                  </span>

                  <h2>
                    {selectedPayment.transactionId}
                  </h2>
                </div>

                <button
                  className="room-drawer-close"
                  onClick={() =>
                    setSelectedPayment(null)
                  }
                >
                  ×
                </button>

              </div>

              <div className="room-drawer-content">

                <div className="room-detail-item">
                  <span>
                    Transaction ID
                  </span>

                  <strong>
                    {selectedPayment.transactionId}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Reservation ID
                  </span>

                  <strong>
                    {selectedPayment.reservationId}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Guest
                  </span>

                  <strong>
                    {selectedPayment.guest}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Room
                  </span>

                  <strong>
                    Room {selectedPayment.room}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Amount
                  </span>

                  <strong>
                    ₹{selectedPayment.amount}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Payment Method
                  </span>

                  <strong>
                    {selectedPayment.method}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Payment Status
                  </span>

                  <strong>
                    {selectedPayment.status}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Payment Date
                  </span>

                  <strong>
                    {selectedPayment.paymentDate}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Phone
                  </span>

                  <strong>
                    {selectedPayment.phone}
                  </strong>
                </div>

                {selectedPayment.notes && (
                  <div className="room-detail-item">
                    <span>
                      Notes
                    </span>

                    <strong>
                      {selectedPayment.notes}
                    </strong>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "24px",
                    flexWrap: "wrap",
                  }}
                >

                  <button
                    className="add-room-btn"
                    onClick={() =>
                      handleEditPayment(
                        selectedPayment
                      )
                    }
                  >
                    ✏️ Edit Payment
                  </button>

                  {selectedPayment.status !==
                    "Refunded" && (
                    <button
                      className="add-room-btn"
                      onClick={() =>
                        handleRefundPayment(
                          selectedPayment
                        )
                      }
                      style={{
                        background:
                          "#fff4e5",
                        color:
                          "#a65d00",
                      }}
                    >
                      ↩ Refund
                    </button>
                  )}

                  <button
                    className="add-room-btn"
                    onClick={() => {
                      setDeletePayment(
                        selectedPayment
                      );

                      setSelectedPayment(
                        null
                      );
                    }}
                    style={{
                      background:
                        "#fbecee",
                      color:
                        "#a54855",
                    }}
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* =========================
            DELETE CONFIRMATION
        ========================= */}

        {deletePayment && (
          <div className="room-drawer-overlay">

            <div className="room-drawer">

              <div className="room-drawer-header">

                <div>
                  <span>
                    PAYMENT MANAGEMENT
                  </span>

                  <h2>
                    Delete Payment
                  </h2>
                </div>

                <button
                  className="room-drawer-close"
                  onClick={() =>
                    setDeletePayment(null)
                  }
                >
                  ×
                </button>

              </div>

              <div className="room-drawer-content">

                <p>
                  Are you sure you want to
                  delete payment{" "}
                  <strong>
                    {deletePayment.transactionId}
                  </strong>
                  ?
                </p>

                <p>
                  This action will remove the
                  payment from the current
                  payment list.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "24px",
                  }}
                >

                  <button
                    className="add-room-btn"
                    onClick={() =>
                      setDeletePayment(
                        null
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    className="add-room-btn"
                    onClick={
                      handleDeletePayment
                    }
                    style={{
                      background:
                        "#a54855",
                      color:
                        "#ffffff",
                    }}
                  >
                    Delete Payment
                  </button>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* =========================
            ADD / EDIT PAYMENT
        ========================= */}

        {showPaymentModal && (
          <div className="room-drawer-overlay">

            <div className="room-drawer">

              <div className="room-drawer-header">

                <div>
                  <span>
                    PAYMENT MANAGEMENT
                  </span>

                  <h2>
                    {editingPaymentId !==
                    null
                      ? "Edit Payment"
                      : "Add New Payment"}
                  </h2>
                </div>

                <button
                  className="room-drawer-close"
                  onClick={() => {
                    setShowPaymentModal(
                      false
                    );
                    setEditingPaymentId(
                      null
                    );
                    resetForm();
                  }}
                >
                  ×
                </button>

              </div>

              <div className="room-drawer-content">

                <p>
                  {editingPaymentId !==
                  null
                    ? "Update payment information."
                    : "Record a new hotel payment."}
                </p>

                {/* RESERVATION ID */}

                <div className="room-form-group">
                  <label>
                    Reservation ID
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. RES-1007"
                    value={
                      paymentForm.reservationId
                    }
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        reservationId:
                          event.target.value,
                      })
                    }
                  />
                </div>

                {/* GUEST */}

                <div className="room-form-group">
                  <label>
                    Guest Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter guest name"
                    value={
                      paymentForm.guest
                    }
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        guest:
                          event.target.value,
                      })
                    }
                  />
                </div>

                {/* ROOM */}

                <div className="room-form-group">
                  <label>
                    Room Number
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. 101"
                    value={
                      paymentForm.room
                    }
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        room:
                          event.target.value,
                      })
                    }
                  />
                </div>

                {/* AMOUNT */}

                <div className="room-form-group">
                  <label>
                    Payment Amount
                  </label>

                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 5000"
                    value={
                      paymentForm.amount
                    }
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        amount:
                          event.target.value,
                      })
                    }
                  />
                </div>

                {/* METHOD */}

                <div className="room-form-group">
                  <label>
                    Payment Method
                  </label>

                  <select
                    value={
                      paymentForm.method
                    }
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        method:
                          event.target.value,
                      })
                    }
                  >
                    <option value="">
                      Select payment method
                    </option>

                    <option value="Cash">
                      Cash
                    </option>

                    <option value="UPI">
                      UPI
                    </option>

                    <option value="Credit Card">
                      Credit Card
                    </option>

                    <option value="Debit Card">
                      Debit Card
                    </option>

                    <option value="Bank Transfer">
                      Bank Transfer
                    </option>
                  </select>
                </div>

                {/* STATUS */}

                <div className="room-form-group">
                  <label>
                    Payment Status
                  </label>

                  <select
                    value={
                      paymentForm.status
                    }
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        status:
                          event.target.value,
                      })
                    }
                  >
                    <option value="Paid">
                      Paid
                    </option>

                    <option value="Partial">
                      Partial
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Refunded">
                      Refunded
                    </option>
                  </select>
                </div>

                {/* DATE */}

                <div className="room-form-group">
                  <label>
                    Payment Date
                  </label>

                  <input
                    type="date"
                    value={
                      paymentForm.paymentDate
                    }
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        paymentDate:
                          event.target.value,
                      })
                    }
                  />
                </div>

                {/* PHONE */}

                <div className="room-form-group">
                  <label>
                    Guest Phone
                  </label>

                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="Enter 10 digit phone"
                    value={
                      paymentForm.phone
                    }
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        phone:
                          event.target.value,
                      })
                    }
                  />
                </div>

                {/* NOTES */}

                <div className="room-form-group">
                  <label>
                    Notes
                  </label>

                  <textarea
                    rows="3"
                    placeholder="Add payment note..."
                    value={
                      paymentForm.notes
                    }
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        notes:
                          event.target.value,
                      })
                    }
                  />
                </div>

                {/* ACTIONS */}

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
                      handleSavePayment
                    }
                  >
                    {editingPaymentId !==
                    null
                      ? "Update Payment"
                      : "Add Payment"}
                  </button>

                  <button
                    className="add-room-btn"
                    onClick={() => {
                      setShowPaymentModal(
                        false
                      );
                      setEditingPaymentId(
                        null
                      );
                      resetForm();
                    }}
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
            PAYMENTS PAGE
        ========================= */}

        <main className="main-content">

          {/* PAGE HEADER */}

          <div className="rooms-page-header">

            <div>
              <h1>
                Payments
              </h1>

              <p>
                Manage hotel payments,
                transactions and refunds.
              </p>
            </div>

            <button
              className="add-room-btn"
              onClick={() => {
                setEditingPaymentId(
                  null
                );

                resetForm();

                setShowPaymentModal(
                  true
                );
              }}
            >
              + Add Payment
            </button>

          </div>

          {/* SUMMARY */}

          <div className="room-summary">

            <div className="room-summary-card">
              <span>
                Transactions
              </span>

              <strong>
                {totalTransactions}
              </strong>
            </div>

            <div className="room-summary-card">
              <span>
                Collected
              </span>

              <strong>
                ₹
                {totalCollected.toLocaleString(
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
                {totalPending.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div className="room-summary-card">
              <span>
                Partial
              </span>

              <strong>
                ₹
                {totalPartial.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div className="room-summary-card">
              <span>
                Refunded
              </span>

              <strong>
                ₹
                {totalRefunded.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

          </div>

          {/* SEARCH */}

          <div className="room-search">

            <input
              type="text"
              placeholder="Search transaction, reservation, guest or room..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>

          {/* FILTERS */}

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >

            {/* METHOD */}

            <select
              value={
                methodFilter
              }
              onChange={(event) =>
                setMethodFilter(
                  event.target.value
                )
              }
              style={{
                padding: "11px 14px",
                border:
                  "1px solid #dfe3ea",
                borderRadius: "10px",
                background:
                  "#ffffff",
                color:
                  "#344054",
                outline: "none",
              }}
            >
              <option value="All">
                All Payment Methods
              </option>

              <option value="Cash">
                Cash
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Credit Card">
                Credit Card
              </option>

              <option value="Debit Card">
                Debit Card
              </option>

              <option value="Bank Transfer">
                Bank Transfer
              </option>
            </select>

            {/* STATUS */}

            <div className="room-filters">

              {[
                "All",
                "Paid",
                "Partial",
                "Pending",
                "Refunded",
              ].map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    setStatusFilter(
                      status
                    )
                  }
                  className={
                    statusFilter ===
                    status
                      ? "active-filter"
                      : ""
                  }
                >
                  {status}
                </button>
              ))}

            </div>

          </div>

          {/* PAYMENT TABLE */}

          <div className="reservation-table-card">

            <div className="reservation-table-header">

              <div>
                <p>
                  PAYMENT MANAGEMENT
                </p>

                <h3>
                  All Transactions
                </h3>
              </div>

              <span>
                {filteredPayments.length} transactions
              </span>

            </div>

            <div className="reservation-table-wrapper">

              <table className="reservation-table">

                <thead>
                  <tr>

                    <th>
                      Transaction
                    </th>

                    <th>
                      Guest
                    </th>

                    <th>
                      Reservation
                    </th>

                    <th>
                      Room
                    </th>

                    <th>
                      Amount
                    </th>

                    <th>
                      Method
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Date
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredPayments.map(
                    (payment) => (
                      <tr
                        key={payment.id}
                        onClick={() =>
                          setSelectedPayment(
                            payment
                          )
                        }
                        style={{
                          cursor:
                            "pointer",
                        }}
                      >

                        {/* TRANSACTION */}

                        <td>
                          <strong>
                            {payment.transactionId}
                          </strong>
                        </td>

                        {/* GUEST */}

                        <td>
                          <div className="reservation-guest">

                            <div className="reservation-avatar">
                              {payment.guest.charAt(
                                0
                              )}
                            </div>

                            <div>
                              <strong>
                                {payment.guest}
                              </strong>

                              <small>
                                {payment.phone}
                              </small>
                            </div>

                          </div>
                        </td>

                        {/* RESERVATION */}

                        <td>
                          <strong>
                            {payment.reservationId}
                          </strong>
                        </td>

                        {/* ROOM */}

                        <td>
                          Room{" "}
                          {payment.room}
                        </td>

                        {/* AMOUNT */}

                        <td>
                          <strong>
                            ₹{payment.amount}
                          </strong>
                        </td>

                        {/* METHOD */}

                        <td>
                          {payment.method}
                        </td>

                        {/* STATUS */}

                        <td>
                          <span
                            className={`reservation-status ${payment.status
                              .toLowerCase()
                              .replace(
                                " ",
                                "-"
                              )}`}
                          >
                            {payment.status}
                          </span>
                        </td>

                        {/* DATE */}

                        <td>
                          {payment.paymentDate}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* NO PAYMENTS */}

            {filteredPayments.length ===
              0 && (
              <div className="no-reservations">

                <h3>
                  No payments found
                </h3>

                <p>
                  Try changing your
                  search or filters.
                </p>

              </div>
            )}

          </div>

        </main>

      </div>
    </div>
  );
}