import React, { useState, useEffect } from "react";
import { UserGroupIcon } from "@heroicons/react/24/outline";

import { Tab } from "@headlessui/react";
import {
  ChartBarIcon,
  CalendarIcon,
  BedIcon,
  UsersIcon, // Replace UserGroupIcon with UsersIcon
  CogIcon,
  SearchIcon,
  BellIcon,
  ClipboardListIcon,
} from "lucide-react";
// Mock data - Replace with actual API calls in production
const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    bedId: "A101",
    admissionDate: "2025-02-20",
    status: "Critical",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    bedId: "B205",
    admissionDate: "2025-02-22",
    status: "Stable",
  },
  {
    id: 3,
    name: "Robert Brown",
    age: 58,
    bedId: "A104",
    admissionDate: "2025-02-15",
    status: "Recovering",
  },
  { id: 4, name: "Sarah Johnson", age: 29, bedId: null, status: "Waiting" },
];

const mockBeds = [
  { id: "A101", ward: "General", status: "Occupied", patientId: 1 },
  { id: "A102", ward: "General", status: "Available", patientId: null },
  { id: "A103", ward: "General", status: "Maintenance", patientId: null },
  { id: "A104", ward: "General", status: "Occupied", patientId: 3 },
  { id: "B201", ward: "ICU", status: "Available", patientId: null },
  { id: "B202", ward: "ICU", status: "Available", patientId: null },
  { id: "B203", ward: "ICU", status: "Maintenance", patientId: null },
  { id: "B204", ward: "ICU", status: "Available", patientId: null },
  { id: "B205", ward: "ICU", status: "Occupied", patientId: 2 },
];

const mockAppointments = [
  {
    id: 101,
    patientName: "Emily Wilson",
    doctorName: "Dr. Thompson",
    department: "Cardiology",
    date: "2025-02-28",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 102,
    patientName: "Michael Clark",
    doctorName: "Dr. Patel",
    department: "Neurology",
    date: "2025-02-28",
    time: "11:30 AM",
    status: "Pending",
  },
  {
    id: 103,
    patientName: "Olivia Taylor",
    doctorName: "Dr. Rodriguez",
    department: "Pediatrics",
    date: "2025-03-01",
    time: "09:15 AM",
    status: "Confirmed",
  },
  {
    id: 104,
    patientName: "James Anderson",
    doctorName: "Dr. Lee",
    department: "Orthopedics",
    date: "2025-03-02",
    time: "02:00 PM",
    status: "Cancelled",
  },
  {
    id: 105,
    patientName: "Sophia Martinez",
    doctorName: "Dr. Johnson",
    department: "Dermatology",
    date: "2025-03-03",
    time: "10:45 AM",
    status: "Pending",
  },
];

const Admin = () => {
  const [patients, setPatients] = useState(mockPatients);
  const [beds, setBeds] = useState(mockBeds);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Bed A103 maintenance scheduled for today", read: false },
    {
      id: 2,
      message: "New appointment request from James Anderson",
      read: false,
    },
    { id: 3, message: "ICU Ward reaching capacity (80%)", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Stats for dashboard
  const stats = {
    totalBeds: beds.length,
    availableBeds: beds.filter((bed) => bed.status === "Available").length,
    occupiedBeds: beds.filter((bed) => bed.status === "Occupied").length,
    maintenanceBeds: beds.filter((bed) => bed.status === "Maintenance").length,
    todayAppointments: appointments.filter((app) => app.date === "2025-02-28")
      .length,
    pendingAppointments: appointments.filter((app) => app.status === "Pending")
      .length,
  };

  // Filter functions
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBeds = beds.filter(
    (bed) =>
      bed.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.ward.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bed allocation function
  const allocateBed = (patientId, bedId) => {
    // Update bed status
    const updatedBeds = beds.map((bed) => {
      if (bed.id === bedId) {
        return { ...bed, status: "Occupied", patientId };
      }
      return bed;
    });

    // Update patient's bed assignment
    const updatedPatients = patients.map((patient) => {
      if (patient.id === patientId) {
        return { ...patient, bedId };
      }
      return patient;
    });

    setPatients(updatedPatients);
    setBeds(updatedBeds);
  };

  // Function to release a bed
  const releaseBed = (bedId) => {
    // Find the patient using this bed
    const patientUsingBed = patients.find((patient) => patient.bedId === bedId);

    // Update beds
    const updatedBeds = beds.map((bed) => {
      if (bed.id === bedId) {
        return { ...bed, status: "Available", patientId: null };
      }
      return bed;
    });

    // Update patients
    let updatedPatients = [...patients];
    if (patientUsingBed) {
      updatedPatients = patients.map((patient) => {
        if (patient.id === patientUsingBed.id) {
          return { ...patient, bedId: null };
        }
        return patient;
      });
    }

    setPatients(updatedPatients);
    setBeds(updatedBeds);
  };

  // Function to update appointment status
  const updateAppointmentStatus = (appointmentId, status) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status };
      }
      return appointment;
    });

    setAppointments(updatedAppointments);
  };

  // Function to mark notification as read
  const markNotificationAsRead = (notificationId) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    });

    setNotifications(updatedNotifications);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-800">
            Hospital Admin Panel
          </h1>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
            </div>

            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-100 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <BellIcon className="h-6 w-6 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border overflow-hidden z-10">
                  <div className="p-3 border-b bg-gray-50">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-gray-500 text-center">
                        No notifications
                      </p>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b hover:bg-gray-50 cursor-pointer flex items-start ${
                            !notification.read ? "bg-blue-50" : ""
                          }`}
                          onClick={() =>
                            markNotificationAsRead(notification.id)
                          }
                        >
                          <div className="flex-1">
                            <p
                              className={`text-sm ${
                                !notification.read
                                  ? "font-semibold"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                A
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm border-r">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
                    selectedTab === 0
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTab(0)}
                >
                  <ChartBarIcon className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
                    selectedTab === 1
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTab(1)}
                >
                  <BedIcon className="h-5 w-5" />
                  <span className="font-medium">Bed Management</span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
                    selectedTab === 2
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTab(2)}
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span className="font-medium">Appointments</span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
                    selectedTab === 3
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTab(3)}
                >
                  <UserGroupIcon className="h-5 w-5" />
                  <span className="font-medium">Patients</span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
                    selectedTab === 4
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTab(4)}
                >
                  <ClipboardListIcon className="h-5 w-5" />
                  <span className="font-medium">Reports</span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
                    selectedTab === 5
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTab(5)}
                >
                  <CogIcon className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard */}
          {selectedTab === 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Dashboard Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">Bed Status</h3>
                    <BedIcon className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Available</p>
                      <p className="text-2xl font-bold text-green-600">
                        {stats.availableBeds}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Occupied</p>
                      <p className="text-2xl font-bold text-red-600">
                        {stats.occupiedBeds}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Maintenance</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {stats.maintenanceBeds}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Total</p>
                      <p className="text-2xl font-bold">{stats.totalBeds}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">Appointments</h3>
                    <CalendarIcon className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Today</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {stats.todayAppointments}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Pending</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {stats.pendingAppointments}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">
                      Occupancy Rate
                    </h3>
                    <ChartBarIcon className="h-8 w-8 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-indigo-600">
                      {Math.round((stats.occupiedBeds / stats.totalBeds) * 100)}
                      %
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{
                          width: `${
                            (stats.occupiedBeds / stats.totalBeds) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="font-semibold">Recent Admissions</h3>
                  </div>
                  <div className="p-6">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Patient
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bed
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {patients.slice(0, 3).map((patient) => (
                          <tr key={patient.id}>
                            <td className="px-4 py-3">
                              <div>
                                <div className="font-medium">
                                  {patient.name}
                                </div>
                                <div className="text-gray-500 text-sm">
                                  Age: {patient.age}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {patient.bedId || "Not assigned"}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                  patient.status === "Critical"
                                    ? "bg-red-100 text-red-800"
                                    : patient.status === "Stable"
                                    ? "bg-green-100 text-green-800"
                                    : patient.status === "Recovering"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {patient.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="font-semibold">Upcoming Appointments</h3>
                  </div>
                  <div className="p-6">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Patient
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Doctor
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {appointments
                          .filter((a) => a.status !== "Cancelled")
                          .slice(0, 3)
                          .map((appointment) => (
                            <tr key={appointment.id}>
                              <td className="px-4 py-3">
                                <div className="font-medium">
                                  {appointment.patientName}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div>
                                  <div>{appointment.doctorName}</div>
                                  <div className="text-gray-500 text-sm">
                                    {appointment.department}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                    appointment.status === "Confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : appointment.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {appointment.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bed Management */}
          {selectedTab === 1 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Bed Allocation Management
                </h2>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    Add New Bed
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Bed Status Overview</h3>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                        <span className="text-sm text-gray-600">Available</span>
                      </div>
                      <div className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                        <span className="text-sm text-gray-600">Occupied</span>
                      </div>
                      <div className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                        <span className="text-sm text-gray-600">
                          Maintenance
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Bed ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ward
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Patient
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBeds.map((bed) => {
                        const patientAssigned = patients.find(
                          (p) => p.id === bed.patientId
                        );

                        return (
                          <tr key={bed.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {bed.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {bed.ward}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  bed.status === "Available"
                                    ? "bg-green-100 text-green-800"
                                    : bed.status === "Occupied"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {bed.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {patientAssigned
                                ? patientAssigned.name
                                : "Not assigned"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {bed.status === "Available" ? (
                                <button
                                  className="text-blue-600 hover:text-blue-900"
                                  onClick={() => {
                                    // In a real app, this would open a modal to select a patient
                                    const patientToAssign = patients.find(
                                      (p) => !p.bedId
                                    );
                                    if (patientToAssign) {
                                      allocateBed(patientToAssign.id, bed.id);
                                    } else {
                                      alert("No patients waiting for a bed!");
                                    }
                                  }}
                                >
                                  Assign
                                </button>
                              ) : bed.status === "Occupied" ? (
                                <button
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => releaseBed(bed.id)}
                                >
                                  Release
                                </button>
                              ) : (
                                <button
                                  className="text-gray-600 hover:text-gray-900"
                                  onClick={() => {
                                    // Mark as available
                                    const updatedBeds = beds.map((b) => {
                                      if (b.id === bed.id) {
                                        return { ...b, status: "Available" };
                                      }
                                      return b;
                                    });
                                    setBeds(updatedBeds);
                                  }}
                                >
                                  Mark Available
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="font-semibold">Patients Waiting for Bed</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Patient Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Age
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {patients
                        .filter((p) => !p.bedId)
                        .map((patient) => (
                          <tr key={patient.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {patient.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {patient.age}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  patient.status === "Critical"
                                    ? "bg-red-100 text-red-800"
                                    : patient.status === "Stable"
                                    ? "bg-green-100 text-green-800"
                                    : patient.status === "Recovering"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {patient.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button
                                className="text-blue-600 hover:text-blue-900"
                                onClick={() => {
                                  // Find an available bed
                                  const availableBed = beds.find(
                                    (b) => b.status === "Available"
                                  );
                                  if (availableBed) {
                                    allocateBed(patient.id, availableBed.id);
                                  } else {
                                    alert("No available beds!");
                                  }
                                }}
                              >
                                Assign Bed
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Appointments */}
          {selectedTab === 2 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Appointment Management
                </h2>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Add New Appointment
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="font-semibold">Upcoming Appointments</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Patient
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Doctor
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date & Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {appointment.patientName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {appointment.doctorName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {appointment.date} at {appointment.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                appointment.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {appointment.status === "Pending" && (
                              <>
                                <button
                                  className="text-green-600 hover:text-green-900 mr-2"
                                  onClick={() =>
                                    updateAppointmentStatus(
                                      appointment.id,
                                      "Confirmed"
                                    )
                                  }
                                >
                                  Confirm
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() =>
                                    updateAppointmentStatus(
                                      appointment.id,
                                      "Cancelled"
                                    )
                                  }
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Patients */}
          {selectedTab === 3 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Patient Management</h2>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Add New Patient
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="font-semibold">Patient List</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Age
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Bed
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPatients.map((patient) => (
                        <tr key={patient.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {patient.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {patient.age}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {patient.bedId || "Not assigned"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                patient.status === "Critical"
                                  ? "bg-red-100 text-red-800"
                                  : patient.status === "Stable"
                                  ? "bg-green-100 text-green-800"
                                  : patient.status === "Recovering"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {patient.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => {
                                // In a real app, this would open a modal to edit patient details
                                alert(`Edit patient: ${patient.name}`);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Reports */}
          {selectedTab === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Reports</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Reports feature coming soon...</p>
              </div>
            </div>
          )}

          {/* Settings */}
          {selectedTab === 5 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Settings</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Settings feature coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
