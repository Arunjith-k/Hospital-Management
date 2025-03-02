// src/components/doctor/Navigation/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import {
  FaUserMd,
  FaCalendarAlt,
  FaUsers,
  FaFilePrescription,
  FaUserCog,
  FaBars,
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", icon: <FaUserMd />, link: "/doctor/dashboard" },
  {
    name: "Appointments",
    icon: <FaCalendarAlt />,
    link: "/doctor/appointments",
  },
  { name: "Patients", icon: <FaUsers />, link: "/doctor/patients" },
  {
    name: "Prescriptions",
    icon: <FaFilePrescription />,
    link: "/doctor/prescriptions",
  },
  { name: "Profile", icon: <FaUserCog />, link: "/doctor/profile" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`p-4 bg-gray-900 text-white h-screen ${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 p-2 rounded bg-gray-700"
      >
        <FaBars />
      </button>
      <nav className="space-y-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="ml-2">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
