import React, { useState } from "react";
import { Search, ChevronRight } from "lucide-react";

const PatientsList = ({ patients = [], onSelectPatient }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Function to filter patients based on search term and selected filter
  const filteredPatients = patients.filter((patient) => {
    if (!patient) return false;

    const matchesSearch =
      patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id?.toString().includes(searchTerm);

    const recentVisitThreshold = Date.now() - 30 * 24 * 60 * 60 * 1000;

    switch (filter) {
      case "recent":
        return (
          matchesSearch &&
          new Date(patient.lastVisit).getTime() > recentVisitThreshold
        );
      case "critical":
        return matchesSearch && patient.status === "critical";
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add New Patient
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center mb-4 gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search patients by name or ID"
            aria-label="Search patients"
            className="w-full p-3 pl-10 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        <label className="sr-only" htmlFor="filter">
          Filter by status
        </label>
        <select
          id="filter"
          className="p-3 border border-gray-300 rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Patients</option>
          <option value="recent">Recent (30 days)</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {/* Patients Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Age</th>
              <th className="py-3 px-4 text-left">Last Visit</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{patient.id || "N/A"}</td>
                  <td className="py-3 px-4">{patient.name || "Unknown"}</td>
                  <td className="py-3 px-4">{patient.age ?? "N/A"}</td>
                  <td className="py-3 px-4">
                    {patient.lastVisit
                      ? new Date(patient.lastVisit).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        patient.status === "stable"
                          ? "bg-green-100 text-green-800"
                          : patient.status === "improving"
                          ? "bg-blue-100 text-blue-800"
                          : patient.status === "critical"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {patient.status
                        ? patient.status.charAt(0).toUpperCase() +
                          patient.status.slice(1)
                        : "Unknown"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                      onClick={() => onSelectPatient(patient.id)}
                    >
                      View <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsList;
