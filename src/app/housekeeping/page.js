"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const initialTasks = [
  {
    id: 1,
    roomNumber: "101",
    roomType: "Deluxe Room",
    assignedTo: "Priya Sharma",
    status: "Pending",
    priority: "High",
    lastCleaned: "24 Sep 2026",
    notes: "Bathroom requires deep cleaning.",
  },
  {
    id: 2,
    roomNumber: "102",
    roomType: "Premium Room",
    assignedTo: "Amit Kumar",
    status: "In Progress",
    priority: "Medium",
    lastCleaned: "25 Sep 2026",
    notes: "Guest checkout completed.",
  },
  {
    id: 3,
    roomNumber: "201",
    roomType: "Suite Room",
    assignedTo: "Neha Singh",
    status: "Completed",
    priority: "Low",
    lastCleaned: "26 Sep 2026",
    notes: "Room cleaned and inspected.",
  },
  {
    id: 4,
    roomNumber: "202",
    roomType: "Deluxe Room",
    assignedTo: "Priya Sharma",
    status: "Pending",
    priority: "Urgent",
    lastCleaned: "23 Sep 2026",
    notes: "VIP guest arriving today.",
  },
  {
    id: 5,
    roomNumber: "301",
    roomType: "Executive Suite",
    assignedTo: "Amit Kumar",
    status: "In Progress",
    priority: "High",
    lastCleaned: "25 Sep 2026",
    notes: "Bedsheet replacement required.",
  },
  {
    id: 6,
    roomNumber: "302",
    roomType: "Premium Room",
    assignedTo: "Neha Singh",
    status: "Completed",
    priority: "Medium",
    lastCleaned: "26 Sep 2026",
    notes: "Standard cleaning completed.",
  },
];

const staffMembers = [
  "Priya Sharma",
  "Amit Kumar",
  "Neha Singh",
  "Rahul Verma",
];

export default function HousekeepingPage() {
  const [tasks, setTasks] = useState(initialTasks);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [selectedTask, setSelectedTask] = useState(null);

  const [showTaskModal, setShowTaskModal] =
    useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [taskToDelete, setTaskToDelete] = useState(null);

  const [taskForm, setTaskForm] = useState({
    roomNumber: "",
    roomType: "",
    assignedTo: "",
    status: "Pending",
    priority: "Medium",
    lastCleaned: "",
    notes: "",
  });

  const resetTaskForm = () => {
    setTaskForm({
      roomNumber: "",
      roomType: "",
      assignedTo: "",
      status: "Pending",
      priority: "Medium",
      lastCleaned: "",
      notes: "",
    });
  };

  const validateTask = () => {
    if (!taskForm.roomNumber.trim()) {
      alert("Please enter room number.");
      return false;
    }

    if (!/^\d+$/.test(taskForm.roomNumber)) {
      alert("Room number must contain only numbers.");
      return false;
    }

    if (!taskForm.roomType) {
      alert("Please select room type.");
      return false;
    }

    if (!taskForm.assignedTo) {
      alert("Please assign a housekeeping staff member.");
      return false;
    }

    if (!taskForm.status) {
      alert("Please select task status.");
      return false;
    }

    if (!taskForm.priority) {
      alert("Please select task priority.");
      return false;
    }

    if (!taskForm.lastCleaned) {
      alert("Please enter last cleaned date.");
      return false;
    }

    return true;
  };

  const handleAddTask = () => {
    if (!validateTask()) return;

    const newTask = {
      id: Date.now(),
      roomNumber: taskForm.roomNumber,
      roomType: taskForm.roomType,
      assignedTo: taskForm.assignedTo,
      status: taskForm.status,
      priority: taskForm.priority,
      lastCleaned: taskForm.lastCleaned,
      notes: taskForm.notes,
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);

    resetTaskForm();
    setShowTaskModal(false);

    alert("Housekeeping task added successfully.");
  };

  const handleEditTask = (task) => {
    setEditingTask(task);

    setTaskForm({
      roomNumber: task.roomNumber,
      roomType: task.roomType,
      assignedTo: task.assignedTo,
      status: task.status,
      priority: task.priority,
      lastCleaned: task.lastCleaned,
      notes: task.notes || "",
    });

    setSelectedTask(null);
    setShowTaskModal(true);
  };

  const handleUpdateTask = () => {
    if (!validateTask()) return;

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              roomNumber: taskForm.roomNumber,
              roomType: taskForm.roomType,
              assignedTo: taskForm.assignedTo,
              status: taskForm.status,
              priority: taskForm.priority,
              lastCleaned: taskForm.lastCleaned,
              notes: taskForm.notes,
            }
          : task
      )
    );

    resetTaskForm();
    setShowTaskModal(false);
    setEditingTask(null);

    alert("Housekeeping task updated successfully.");
  };

  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
    setEditingTask(null);
    resetTaskForm();
  };

  const handleDeleteTask = () => {
    if (!taskToDelete) return;

    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== taskToDelete.id
      )
    );

    if (selectedTask?.id === taskToDelete.id) {
      setSelectedTask(null);
    }

    setTaskToDelete(null);

    alert("Housekeeping task deleted successfully.");
  };

  const handleStatusChange = (task, newStatus) => {
    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === task.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );

    if (selectedTask?.id === task.id) {
      setSelectedTask({
        ...task,
        status: newStatus,
      });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      task.roomNumber
        .toLowerCase()
        .includes(searchText) ||
      task.roomType
        .toLowerCase()
        .includes(searchText) ||
      task.assignedTo
        .toLowerCase()
        .includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const urgentTasks = tasks.filter(
    (task) => task.priority === "Urgent"
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
              <h1>Housekeeping</h1>

              <p>
                Manage room cleaning, housekeeping staff and
                daily cleaning tasks.
              </p>
            </div>

            <button
              className="add-room-btn"
              onClick={() => {
                setEditingTask(null);
                resetTaskForm();
                setShowTaskModal(true);
              }}
            >
              + Add Task
            </button>
          </div>

          {/* SUMMARY */}

          <div className="reservation-summary">

            <div className="reservation-summary-card">
              <span>Total Tasks</span>

              <strong>{totalTasks}</strong>
            </div>

            <div className="reservation-summary-card">
              <span>Pending</span>

              <strong>{pendingTasks}</strong>
            </div>

            <div className="reservation-summary-card">
              <span>In Progress</span>

              <strong>{inProgressTasks}</strong>
            </div>

            <div className="reservation-summary-card">
              <span>Completed</span>

              <strong>{completedTasks}</strong>
            </div>

            <div className="reservation-summary-card">
              <span>Urgent</span>

              <strong>{urgentTasks}</strong>
            </div>

          </div>

          {/* SEARCH + FILTER */}

          <div className="reservation-toolbar">

            <input
              type="text"
              placeholder="Search room, room type or staff..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            <div className="reservation-filters">

              {[
                "All",
                "Pending",
                "In Progress",
                "Completed",
              ].map((status) => (
                <button
                  key={status}
                  className={
                    statusFilter === status
                      ? "active-filter"
                      : ""
                  }
                  onClick={() =>
                    setStatusFilter(status)
                  }
                >
                  {status}
                </button>
              ))}

            </div>
          </div>

          {/* PRIORITY FILTER */}

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "14px",
            }}
          >
            {[
              "All",
              "Low",
              "Medium",
              "High",
              "Urgent",
            ].map((priority) => (
              <button
                key={priority}
                onClick={() =>
                  setPriorityFilter(priority)
                }
                style={{
                  padding: "8px 14px",
                  border:
                    priorityFilter === priority
                      ? "1px solid #00143d"
                      : "1px solid #e1e5eb",
                  borderRadius: "10px",
                  background:
                    priorityFilter === priority
                      ? "#00143d"
                      : "#ffffff",
                  color:
                    priorityFilter === priority
                      ? "#ffffff"
                      : "#475467",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {priority}
              </button>
            ))}
          </div>

          {/* TASK TABLE */}

          <div className="reservation-table-card">

            <div className="reservation-table-header">

              <div>
                <p>ROOM OPERATIONS</p>

                <h3>Housekeeping Tasks</h3>
              </div>

              <span>
                {filteredTasks.length} tasks
              </span>

            </div>

            <div className="reservation-table-wrapper">

              <table className="reservation-table">

                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Room Type</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Last Cleaned</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredTasks.map((task) => (

                    <tr
                      key={task.id}
                      onClick={() =>
                        setSelectedTask(task)
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >

                      <td>
                        <strong>
                          Room {task.roomNumber}
                        </strong>

                        <small>
                          Task #{task.id}
                        </small>
                      </td>

                      <td>
                        <strong>
                          {task.roomType}
                        </strong>
                      </td>

                      <td>
                        <div className="reservation-guest">

                          <div className="reservation-avatar">
                            {task.assignedTo.charAt(0)}
                          </div>

                          <span>
                            {task.assignedTo}
                          </span>

                        </div>
                      </td>

                      <td>
                        <span
                          className={`reservation-status ${
                            task.status ===
                            "Completed"
                              ? "confirmed"
                              : task.status ===
                                "In Progress"
                              ? "pending"
                              : "cancelled"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td>

                        <span
                          className="payment-status"
                          style={{
                            background:
                              task.priority ===
                              "Urgent"
                                ? "#fbecee"
                                : task.priority ===
                                  "High"
                                ? "#fff6e8"
                                : task.priority ===
                                  "Medium"
                                ? "#eef2ff"
                                : "#edf8f2",

                            color:
                              task.priority ===
                              "Urgent"
                                ? "#a54855"
                                : task.priority ===
                                  "High"
                                ? "#a76717"
                                : task.priority ===
                                  "Medium"
                                ? "#4b5fa8"
                                : "#26734d",
                          }}
                        >
                          {task.priority}
                        </span>

                      </td>

                      <td>
                        <strong>
                          {task.lastCleaned}
                        </strong>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {filteredTasks.length === 0 && (

              <div className="no-reservations">

                <h3>No housekeeping tasks found</h3>

                <p>
                  Try changing your search or filters.
                </p>

              </div>

            )}

          </div>

        </main>
      </div>

      {/* TASK DETAILS MODAL */}

      {selectedTask && (

        <div className="reservation-modal-overlay">

          <div className="reservation-modal">

            <div className="reservation-modal-header">

              <div>

                <span>HOUSEKEEPING TASK</span>

                <h2>
                  Room {selectedTask.roomNumber}
                </h2>

              </div>

              <button
                className="reservation-modal-close"
                onClick={() =>
                  setSelectedTask(null)
                }
              >
                ×
              </button>

            </div>

            <div className="reservation-modal-content">

              <div className="reservation-detail-item">
                <span>Room Type</span>

                <strong>
                  {selectedTask.roomType}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>Assigned To</span>

                <strong>
                  {selectedTask.assignedTo}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>Status</span>

                <strong>
                  {selectedTask.status}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>Priority</span>

                <strong>
                  {selectedTask.priority}
                </strong>
              </div>

              <div className="reservation-detail-item">
                <span>Last Cleaned</span>

                <strong>
                  {selectedTask.lastCleaned}
                </strong>
              </div>

              {selectedTask.notes && (

                <div className="reservation-detail-item">

                  <span>Notes</span>

                  <strong>
                    {selectedTask.notes}
                  </strong>

                </div>

              )}

              {/* STATUS ACTIONS */}

              <div
                style={{
                  marginTop: "24px",
                }}
              >

                <p
                  style={{
                    marginBottom: "10px",
                    color: "#667085",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  CHANGE STATUS
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >

                  {[
                    "Pending",
                    "In Progress",
                    "Completed",
                  ].map((status) => (

                    <button
                      key={status}
                      className="add-room-btn"
                      onClick={() =>
                        handleStatusChange(
                          selectedTask,
                          status
                        )
                      }
                      style={{
                        background:
                          selectedTask.status ===
                          status
                            ? "#00143d"
                            : "#f2f4f7",
                        color:
                          selectedTask.status ===
                          status
                            ? "#ffffff"
                            : "#344054",
                      }}
                    >
                      {status}
                    </button>

                  ))}

                </div>

              </div>

              {/* ACTIONS */}

              <div className="reservation-form-actions">

                <button
                  className="add-room-btn"
                  onClick={() =>
                    handleEditTask(selectedTask)
                  }
                >
                  ✏️ Edit Task
                </button>

                <button
                  className="add-room-btn"
                  onClick={() => {
                    setTaskToDelete(selectedTask);
                    setSelectedTask(null);
                  }}
                  style={{
                    background: "#fbecee",
                    color: "#a54855",
                  }}
                >
                  ✕ Delete Task
                </button>

                <button
                  className="add-room-btn"
                  onClick={() =>
                    setSelectedTask(null)
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

      {/* ADD / EDIT TASK MODAL */}

      {showTaskModal && (

        <div className="reservation-modal-overlay">

          <div className="reservation-modal">

            <div className="reservation-modal-header">

              <div>

                <span>HOUSEKEEPING MANAGEMENT</span>

                <h2>
                  {editingTask
                    ? "Edit Task"
                    : "Add Housekeeping Task"}
                </h2>

              </div>

              <button
                className="reservation-modal-close"
                onClick={handleCloseTaskModal}
              >
                ×
              </button>

            </div>

            <div className="reservation-modal-content">

              <p>
                {editingTask
                  ? "Update housekeeping task information."
                  : "Create a new room cleaning task."}
              </p>

              <div className="reservation-form-group">

                <label>Room Number</label>

                <input
                  type="text"
                  placeholder="e.g. 101"
                  value={taskForm.roomNumber}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      roomNumber:
                        event.target.value,
                    })
                  }
                />

              </div>

              <div className="reservation-form-group">

                <label>Room Type</label>

                <select
                  value={taskForm.roomType}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      roomType:
                        event.target.value,
                    })
                  }
                >

                  <option value="">
                    Select room type
                  </option>

                  <option value="Deluxe Room">
                    Deluxe Room
                  </option>

                  <option value="Premium Room">
                    Premium Room
                  </option>

                  <option value="Suite Room">
                    Suite Room
                  </option>

                  <option value="Executive Suite">
                    Executive Suite
                  </option>

                </select>

              </div>

              <div className="reservation-form-group">

                <label>Assign Staff</label>

                <select
                  value={taskForm.assignedTo}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      assignedTo:
                        event.target.value,
                    })
                  }
                >

                  <option value="">
                    Select staff member
                  </option>

                  {staffMembers.map((staff) => (

                    <option
                      key={staff}
                      value={staff}
                    >
                      {staff}
                    </option>

                  ))}

                </select>

              </div>

              <div className="reservation-form-group">

                <label>Status</label>

                <select
                  value={taskForm.status}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      status:
                        event.target.value,
                    })
                  }
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                </select>

              </div>

              <div className="reservation-form-group">

                <label>Priority</label>

                <select
                  value={taskForm.priority}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      priority:
                        event.target.value,
                    })
                  }
                >

                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Urgent">
                    Urgent
                  </option>

                </select>

              </div>

              <div className="reservation-form-group">

                <label>Last Cleaned</label>

                <input
                  type="date"
                  value={taskForm.lastCleaned}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      lastCleaned:
                        event.target.value,
                    })
                  }
                />

              </div>

              <div className="reservation-form-group">

                <label>Notes</label>

                <textarea
                  rows="3"
                  placeholder="Add cleaning instructions..."
                  value={taskForm.notes}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      notes: event.target.value,
                    })
                  }
                />

              </div>

              <div className="reservation-form-actions">

                <button
                  className="add-room-btn"
                  onClick={
                    editingTask
                      ? handleUpdateTask
                      : handleAddTask
                  }
                >
                  {editingTask
                    ? "Update Task"
                    : "Add Task"}
                </button>

                <button
                  className="add-room-btn"
                  onClick={handleCloseTaskModal}
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

      {taskToDelete && (

        <div className="reservation-modal-overlay">

          <div className="reservation-modal">

            <div className="reservation-modal-header">

              <div>

                <span>HOUSEKEEPING MANAGEMENT</span>

                <h2>Delete Task</h2>

              </div>

              <button
                className="reservation-modal-close"
                onClick={() =>
                  setTaskToDelete(null)
                }
              >
                ×
              </button>

            </div>

            <div className="reservation-modal-content">

              <p>
                Are you sure you want to delete this
                housekeeping task?
              </p>

              <div className="reservation-detail-item">

                <span>Room</span>

                <strong>
                  Room {taskToDelete.roomNumber}
                </strong>

              </div>

              <div className="reservation-detail-item">

                <span>Assigned To</span>

                <strong>
                  {taskToDelete.assignedTo}
                </strong>

              </div>

              <div className="reservation-form-actions">

                <button
                  className="add-room-btn"
                  onClick={() =>
                    setTaskToDelete(null)
                  }
                  style={{
                    background: "#f2f4f7",
                    color: "#344054",
                  }}
                >
                  No, Keep Task
                </button>

                <button
                  className="add-room-btn"
                  onClick={handleDeleteTask}
                  style={{
                    background: "#a54855",
                    color: "#ffffff",
                  }}
                >
                  Delete Task
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}