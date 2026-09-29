"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const initialStaff = [
  {
    id: 1,
    employeeId: "STF-1001",
    name: "Amit Sharma",
    role: "Front Desk Manager",
    department: "Front Office",
    phone: "9876543210",
    email: "amit@staysphere.com",
    joiningDate: "15 Jan 2024",
    status: "Active",
    salary: "45,000",
    emergencyContact: "9876500011",
  },
  {
    id: 2,
    employeeId: "STF-1002",
    name: "Neha Verma",
    role: "Receptionist",
    department: "Front Office",
    phone: "9876543211",
    email: "neha@staysphere.com",
    joiningDate: "10 Mar 2024",
    status: "Active",
    salary: "28,000",
    emergencyContact: "9876500012",
  },
  {
    id: 3,
    employeeId: "STF-1003",
    name: "Rajesh Kumar",
    role: "Housekeeping Supervisor",
    department: "Housekeeping",
    phone: "9876543212",
    email: "rajesh@staysphere.com",
    joiningDate: "22 Jun 2023",
    status: "Active",
    salary: "32,000",
    emergencyContact: "9876500013",
  },
  {
    id: 4,
    employeeId: "STF-1004",
    name: "Pooja Singh",
    role: "Housekeeper",
    department: "Housekeeping",
    phone: "9876543213",
    email: "pooja@staysphere.com",
    joiningDate: "05 Aug 2024",
    status: "Inactive",
    salary: "22,000",
    emergencyContact: "9876500014",
  },
  {
    id: 5,
    employeeId: "STF-1005",
    name: "Vikas Meena",
    role: "Chef",
    department: "Food & Beverage",
    phone: "9876543214",
    email: "vikas@staysphere.com",
    joiningDate: "18 Feb 2024",
    status: "Active",
    salary: "38,000",
    emergencyContact: "9876500015",
  },
  {
    id: 6,
    employeeId: "STF-1006",
    name: "Suresh Yadav",
    role: "Security Guard",
    department: "Security",
    phone: "9876543215",
    email: "suresh@staysphere.com",
    joiningDate: "12 Nov 2023",
    status: "Active",
    salary: "24,000",
    emergencyContact: "9876500016",
  },
];

export default function StaffPage() {
  const [staff, setStaff] = useState(initialStaff);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedStaff, setSelectedStaff] =
    useState(null);

  const [showStaffModal, setShowStaffModal] =
    useState(false);

  const [editingStaffId, setEditingStaffId] =
    useState(null);

  const [deleteStaff, setDeleteStaff] =
    useState(null);

  const [staffForm, setStaffForm] = useState({
    name: "",
    role: "",
    department: "",
    phone: "",
    email: "",
    joiningDate: "",
    status: "Active",
    salary: "",
    emergencyContact: "",
  });

  /* =========================
     SUMMARY
  ========================= */

  const totalStaff = staff.length;

  const activeStaff = staff.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveStaff = staff.filter(
    (item) => item.status === "Inactive"
  ).length;

  const frontOfficeStaff = staff.filter(
    (item) => item.department === "Front Office"
  ).length;

  /* =========================
     RESET FORM
  ========================= */

  const resetForm = () => {
    setStaffForm({
      name: "",
      role: "",
      department: "",
      phone: "",
      email: "",
      joiningDate: "",
      status: "Active",
      salary: "",
      emergencyContact: "",
    });
  };

  /* =========================
     DATE FORMAT
  ========================= */

  const formatDateForDisplay = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(`${dateString}T00:00:00`);

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

  const validateStaff = () => {
    if (!staffForm.name.trim()) {
      alert("Please enter staff name.");
      return false;
    }

    if (!staffForm.role) {
      alert("Please select staff role.");
      return false;
    }

    if (!staffForm.department) {
      alert("Please select department.");
      return false;
    }

    if (!staffForm.phone.trim()) {
      alert("Please enter phone number.");
      return false;
    }

    if (!/^\d{10}$/.test(staffForm.phone)) {
      alert(
        "Phone number must contain exactly 10 digits."
      );
      return false;
    }

    if (!staffForm.email.trim()) {
      alert("Please enter email address.");
      return false;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        staffForm.email
      )
    ) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!staffForm.joiningDate) {
      alert("Please select joining date.");
      return false;
    }

    if (!staffForm.salary) {
      alert("Please enter salary.");
      return false;
    }

    if (Number(staffForm.salary) <= 0) {
      alert("Salary must be greater than 0.");
      return false;
    }

    if (!staffForm.emergencyContact.trim()) {
      alert("Please enter emergency contact.");
      return false;
    }

    if (
      !/^\d{10}$/.test(
        staffForm.emergencyContact
      )
    ) {
      alert(
        "Emergency contact must contain exactly 10 digits."
      );
      return false;
    }

    return true;
  };

  /* =========================
     ADD / UPDATE STAFF
  ========================= */

  const handleSaveStaff = () => {
    if (!validateStaff()) {
      return;
    }

    if (editingStaffId !== null) {
      setStaff((previousStaff) =>
        previousStaff.map((item) =>
          item.id === editingStaffId
            ? {
                ...item,
                name: staffForm.name.trim(),
                role: staffForm.role,
                department:
                  staffForm.department,
                phone: staffForm.phone,
                email: staffForm.email,
                joiningDate:
                  formatDateForDisplay(
                    staffForm.joiningDate
                  ),
                status: staffForm.status,
                salary: Number(
                  staffForm.salary
                ).toLocaleString("en-IN"),
                emergencyContact:
                  staffForm.emergencyContact,
              }
            : item
        )
      );

      alert("Staff updated successfully.");
    } else {
      const nextEmployeeNumber =
        staff.length + 1001;

      const newStaff = {
        id: Date.now(),
        employeeId: `STF-${nextEmployeeNumber}`,
        name: staffForm.name.trim(),
        role: staffForm.role,
        department: staffForm.department,
        phone: staffForm.phone,
        email: staffForm.email,
        joiningDate:
          formatDateForDisplay(
            staffForm.joiningDate
          ),
        status: staffForm.status,
        salary: Number(
          staffForm.salary
        ).toLocaleString("en-IN"),
        emergencyContact:
          staffForm.emergencyContact,
      };

      setStaff((previousStaff) => [
        ...previousStaff,
        newStaff,
      ]);

      alert("Staff added successfully.");
    }

    resetForm();
    setEditingStaffId(null);
    setShowStaffModal(false);
  };

  /* =========================
     EDIT STAFF
  ========================= */

  const handleEditStaff = (item) => {
    setEditingStaffId(item.id);

    setStaffForm({
      name: item.name,
      role: item.role,
      department: item.department,
      phone: item.phone,
      email: item.email,
      joiningDate:
        formatDateForInput(
          item.joiningDate
        ),
      status: item.status,
      salary: item.salary.replace(
        /,/g,
        ""
      ),
      emergencyContact:
        item.emergencyContact,
    });

    setSelectedStaff(null);
    setShowStaffModal(true);
  };

  /* =========================
     DELETE STAFF
  ========================= */

  const handleDeleteStaff = () => {
    if (!deleteStaff) {
      return;
    }

    setStaff((previousStaff) =>
      previousStaff.filter(
        (item) =>
          item.id !== deleteStaff.id
      )
    );

    setDeleteStaff(null);

    alert("Staff deleted successfully.");
  };

  /* =========================
     FILTER + SEARCH
  ========================= */

  const filteredStaff = staff.filter(
    (item) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(searchText) ||
        item.employeeId
          .toLowerCase()
          .includes(searchText) ||
        item.role
          .toLowerCase()
          .includes(searchText) ||
        item.phone
          .includes(searchText);

      const matchesDepartment =
        departmentFilter === "All" ||
        item.department ===
          departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    }
  );

  /* =========================
     RETURN
  ========================= */

  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="main-section">

        <Header />

        {/* =========================
            STAFF DETAILS
        ========================= */}

        {selectedStaff && (
          <div className="room-drawer-overlay">

            <div className="room-drawer">

              <div className="room-drawer-header">

                <div>
                  <span>
                    STAFF DETAILS
                  </span>

                  <h2>
                    {selectedStaff.name}
                  </h2>
                </div>

                <button
                  className="room-drawer-close"
                  onClick={() =>
                    setSelectedStaff(
                      null
                    )
                  }
                >
                  ×
                </button>

              </div>

              <div className="room-drawer-content">

                <div className="room-detail-item">
                  <span>
                    Employee ID
                  </span>

                  <strong>
                    {selectedStaff.employeeId}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Role
                  </span>

                  <strong>
                    {selectedStaff.role}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Department
                  </span>

                  <strong>
                    {selectedStaff.department}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Phone
                  </span>

                  <strong>
                    {selectedStaff.phone}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Email
                  </span>

                  <strong>
                    {selectedStaff.email}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Joining Date
                  </span>

                  <strong>
                    {selectedStaff.joiningDate}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Status
                  </span>

                  <strong>
                    {selectedStaff.status}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Salary
                  </span>

                  <strong>
                    ₹{selectedStaff.salary}
                  </strong>
                </div>

                <div className="room-detail-item">
                  <span>
                    Emergency Contact
                  </span>

                  <strong>
                    {selectedStaff.emergencyContact}
                  </strong>
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
                    onClick={() =>
                      handleEditStaff(
                        selectedStaff
                      )
                    }
                  >
                    ✏️ Edit Staff
                  </button>

                  <button
                    className="add-room-btn"
                    onClick={() => {
                      setDeleteStaff(
                        selectedStaff
                      );

                      setSelectedStaff(
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

        {deleteStaff && (
          <div className="room-drawer-overlay">

            <div className="room-drawer">

              <div className="room-drawer-header">

                <div>
                  <span>
                    STAFF MANAGEMENT
                  </span>

                  <h2>
                    Delete Staff
                  </h2>
                </div>

                <button
                  className="room-drawer-close"
                  onClick={() =>
                    setDeleteStaff(
                      null
                    )
                  }
                >
                  ×
                </button>

              </div>

              <div className="room-drawer-content">

                <p>
                  Are you sure you want to
                  delete{" "}
                  <strong>
                    {deleteStaff.name}
                  </strong>
                  ?
                </p>

                <p>
                  This action will remove the
                  staff member from the current
                  staff list.
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
                      setDeleteStaff(
                        null
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    className="add-room-btn"
                    onClick={
                      handleDeleteStaff
                    }
                    style={{
                      background:
                        "#a54855",
                      color:
                        "#ffffff",
                    }}
                  >
                    Delete Staff
                  </button>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* =========================
            ADD / EDIT STAFF
        ========================= */}

        {showStaffModal && (
          <div className="room-drawer-overlay">

            <div className="room-drawer">

              <div className="room-drawer-header">

                <div>
                  <span>
                    STAFF MANAGEMENT
                  </span>

                  <h2>
                    {editingStaffId !==
                    null
                      ? "Edit Staff"
                      : "Add New Staff"}
                  </h2>
                </div>

                <button
                  className="room-drawer-close"
                  onClick={() => {
                    setShowStaffModal(
                      false
                    );
                    setEditingStaffId(
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
                  {editingStaffId !==
                  null
                    ? "Update staff information."
                    : "Add a new staff member to your hotel."}
                </p>

                {/* NAME */}

                <div className="room-form-group">
                  <label>
                    Staff Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter staff name"
                    value={
                      staffForm.name
                    }
                    onChange={(event) =>
                      setStaffForm({
                        ...staffForm,
                        name:
                          event.target
                            .value,
                      })
                    }
                  />
                </div>

                {/* ROLE */}

                <div className="room-form-group">
                  <label>
                    Role
                  </label>

                  <select
                    value={
                      staffForm.role
                    }
                    onChange={(event) =>
                      setStaffForm({
                        ...staffForm,
                        role:
                          event.target
                            .value,
                      })
                    }
                  >
                    <option value="">
                      Select role
                    </option>

                    <option value="Front Desk Manager">
                      Front Desk Manager
                    </option>

                    <option value="Receptionist">
                      Receptionist
                    </option>

                    <option value="Housekeeping Supervisor">
                      Housekeeping Supervisor
                    </option>

                    <option value="Housekeeper">
                      Housekeeper
                    </option>

                    <option value="Chef">
                      Chef
                    </option>

                    <option value="Waiter">
                      Waiter
                    </option>

                    <option value="Security Guard">
                      Security Guard
                    </option>

                    <option value="Accountant">
                      Accountant
                    </option>

                    <option value="Manager">
                      Manager
                    </option>
                  </select>
                </div>

                {/* DEPARTMENT */}

                <div className="room-form-group">
                  <label>
                    Department
                  </label>

                  <select
                    value={
                      staffForm.department
                    }
                    onChange={(event) =>
                      setStaffForm({
                        ...staffForm,
                        department:
                          event.target
                            .value,
                      })
                    }
                  >
                    <option value="">
                      Select department
                    </option>

                    <option value="Front Office">
                      Front Office
                    </option>

                    <option value="Housekeeping">
                      Housekeeping
                    </option>

                    <option value="Food & Beverage">
                      Food & Beverage
                    </option>

                    <option value="Security">
                      Security
                    </option>

                    <option value="Accounts">
                      Accounts
                    </option>

                    <option value="Management">
                      Management
                    </option>
                  </select>
                </div>

                {/* PHONE */}

                <div className="room-form-group">
                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="Enter 10 digit phone"
                    value={
                      staffForm.phone
                    }
                    onChange={(event) =>
                      setStaffForm({
                        ...staffForm,
                        phone:
                          event.target
                            .value,
                      })
                    }
                  />
                </div>

                {/* EMAIL */}

                <div className="room-form-group">
                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={
                      staffForm.email
                    }
                    onChange={(event) =>
                      setStaffForm({
                        ...staffForm,
                        email:
                          event.target
                            .value,
                      })
                    }
                  />
                </div>

                {/* JOINING DATE */}

                <div className="room-form-group">
                  <label>
                    Joining Date
                  </label>

                  <input
                    type="date"
                    value={
                      staffForm.joiningDate
                    }
                    onChange={(event) =>
                      setStaffForm({
                        ...staffForm,
                        joiningDate:
                          event.target
                            .value,
                      })
                    }
                  />
                </div>

                {/* STATUS */}

                <div className="room-form-group">
                  <label>
                    Status
                  </label>

                  <select
                    value={
                      staffForm.status
                    }
                    onChange={(event) =>
                      setStaffForm({
                        ...staffForm,
                        status:
                          event.target
                            .value,
                      })
                    }
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>

                {/* SALARY */}

                <div className="room-form-group">
                  <label>
                    Monthly Salary
                  </label>

                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 30000"
                    value={
                      staffForm.salary
                    }
                    onChange={(event) =>
                      setStaffForm({
                        ...staffForm,
                        salary:
                          event.target
                            .value,
                      })
                    }
                  />
                </div>

                {/* EMERGENCY CONTACT */}

                <div className="room-form-group">
                  <label>
                    Emergency Contact
                  </label>

                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="Enter emergency contact"
                    value={
                      staffForm.emergencyContact
                    }
                    onChange={(event) =>
                      setStaffForm({
                        ...staffForm,
                        emergencyContact:
                          event.target
                            .value,
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
                      handleSaveStaff
                    }
                  >
                    {editingStaffId !==
                    null
                      ? "Update Staff"
                      : "Add Staff"}
                  </button>

                  <button
                    className="add-room-btn"
                    onClick={() => {
                      setShowStaffModal(
                        false
                      );
                      setEditingStaffId(
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
            STAFF PAGE
        ========================= */}

        <main className="main-content">

          {/* PAGE HEADER */}

          <div className="rooms-page-header">

            <div>
              <h1>
                Staff
              </h1>

              <p>
                Manage hotel employees,
                departments and staff
                information.
              </p>
            </div>

            <button
              className="add-room-btn"
              onClick={() => {
                setEditingStaffId(
                  null
                );

                resetForm();

                setShowStaffModal(
                  true
                );
              }}
            >
              + Add New Staff
            </button>

          </div>

          {/* SUMMARY */}

          <div className="room-summary">

            <div className="room-summary-card">
              <span>
                Total Staff
              </span>

              <strong>
                {totalStaff}
              </strong>
            </div>

            <div className="room-summary-card">
              <span>
                Active
              </span>

              <strong>
                {activeStaff}
              </strong>
            </div>

            <div className="room-summary-card">
              <span>
                Inactive
              </span>

              <strong>
                {inactiveStaff}
              </strong>
            </div>

            <div className="room-summary-card">
              <span>
                Front Office
              </span>

              <strong>
                {frontOfficeStaff}
              </strong>
            </div>

          </div>

          {/* SEARCH */}

          <div className="room-search">

            <input
              type="text"
              placeholder="Search staff name, ID, role or phone..."
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

            <select
              value={
                departmentFilter
              }
              onChange={(event) =>
                setDepartmentFilter(
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
                color: "#344054",
                outline: "none",
              }}
            >
              <option value="All">
                All Departments
              </option>

              <option value="Front Office">
                Front Office
              </option>

              <option value="Housekeeping">
                Housekeeping
              </option>

              <option value="Food & Beverage">
                Food & Beverage
              </option>

              <option value="Security">
                Security
              </option>

              <option value="Accounts">
                Accounts
              </option>

              <option value="Management">
                Management
              </option>
            </select>

            <div className="room-filters">

              {[
                "All",
                "Active",
                "Inactive",
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

          {/* STAFF TABLE */}

          <div className="reservation-table-card">

            <div className="reservation-table-header">

              <div>
                <p>
                  STAFF MANAGEMENT
                </p>

                <h3>
                  All Staff
                </h3>
              </div>

              <span>
                {filteredStaff.length} staff
              </span>

            </div>

            <div className="reservation-table-wrapper">

              <table className="reservation-table">

                <thead>
                  <tr>
                    <th>
                      Employee
                    </th>

                    <th>
                      Role
                    </th>

                    <th>
                      Department
                    </th>

                    <th>
                      Contact
                    </th>

                    <th>
                      Joining Date
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Salary
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {filteredStaff.map(
                    (item) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          setSelectedStaff(
                            item
                          )
                        }
                        style={{
                          cursor:
                            "pointer",
                        }}
                      >

                        {/* EMPLOYEE */}

                        <td>
                          <div className="reservation-guest">

                            <div className="reservation-avatar">
                              {item.name.charAt(
                                0
                              )}
                            </div>

                            <div>
                              <strong>
                                {item.name}
                              </strong>

                              <small>
                                {item.employeeId}
                              </small>
                            </div>

                          </div>
                        </td>

                        {/* ROLE */}

                        <td>
                          <strong>
                            {item.role}
                          </strong>
                        </td>

                        {/* DEPARTMENT */}

                        <td>
                          {item.department}
                        </td>

                        {/* CONTACT */}

                        <td>
                          <strong>
                            {item.phone}
                          </strong>

                          <small>
                            {item.email}
                          </small>
                        </td>

                        {/* JOINING DATE */}

                        <td>
                          {item.joiningDate}
                        </td>

                        {/* STATUS */}

                        <td>
                          <span
                            className={`reservation-status ${item.status
                              .toLowerCase()
                              .replace(
                                " ",
                                "-"
                              )}`}
                          >
                            {item.status}
                          </span>
                        </td>

                        {/* SALARY */}

                        <td>
                          <strong>
                            ₹{item.salary}
                          </strong>
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* NO STAFF */}

            {filteredStaff.length ===
              0 && (
              <div className="no-reservations">

                <h3>
                  No staff found
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