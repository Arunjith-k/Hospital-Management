// src/components/doctor/Navigation/Header.jsx
import React, { useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";

export default function Header() {
  const { logout } = useContext(AuthContext);

  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Doctor Portal</h1>
      <button
        onClick={logout}
        className="p-2 bg-red-500 hover:bg-red-600 rounded flex items-center"
      >
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </header>
  );
}
