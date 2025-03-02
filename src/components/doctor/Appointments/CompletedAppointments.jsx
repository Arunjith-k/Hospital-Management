import React, { useState } from "react";
import { Search, Calendar, Filter, FileText } from "lucide-react";

const CompletedAppointments = ({ appointments }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("week");

  const filteredAppointments = appointments.filter((appointment) => {
    return (
      appointment.patientName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Completed Appointments</h2>
      </div>

      <div className="p-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search patient or diagnosis..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              className="pl-9 pr-4 py-2 border rounded-lg appearance-none bg-white"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Diagnosis
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prescription
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <img
                        src={
                          appointment.patientImage || "/api/placeholder/32/32"
                        }
                        alt={appointment.patientName}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-xs text-gray-500">
                          ID: {appointment.patientId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{appointment.date}</p>
                    <p className="text-xs text-gray-500">{appointment.time}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm">{appointment.diagnosis}</p>
                  </td>
                  <td className="px-4 py-3">
                    {appointment.prescription ? (
                      <div className="flex items-center text-blue-600">
                        <FileText className="w-4 h-4 mr-1" />
                        <span className="text-sm">Prescribed</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">
                        No prescription
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                        View Notes
                      </button>
                      <button className="px-2 py-1 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100">
                        Follow-up
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No completed appointments found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredAppointments.length} of {appointments.length}{" "}
          appointments
        </p>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded text-sm">Previous</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
            1
          </button>
          <button className="px-3 py-1 border rounded text-sm">2</button>
          <button className="px-3 py-1 border rounded text-sm">3</button>
          <button className="px-3 py-1 border rounded text-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default CompletedAppointments;
