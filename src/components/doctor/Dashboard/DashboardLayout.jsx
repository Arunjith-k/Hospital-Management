// src/components/doctor/Dashboard/DashboardLayout.jsx
import React from "react";
import Sidebar from "../Navigation/Sidebar";
import Header from "../Navigation/Header";
import QuickStats from "./QuickStats";
import AppointmentCalendar from "./AppointmentCalendar";
import { AlertTriangle } from "lucide-react";

const DashboardLayout = () => {
  // Dummy data (replace with actual data fetching logic)
  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      reason: "Routine Checkup",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      reason: "Follow-up",
      time: "11:00 AM",
      status: "Pending",
    },
  ];

  const pendingRequests = [
    {
      id: 1,
      patientName: "Alice Johnson",
      time: "12:00 PM",
      reason: "Consultation",
    },
  ];

  const alerts = [
    {
      id: 1,
      message: "Urgent: Patient requires immediate attention.",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <QuickStats stats={{}} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Today's Appointments</h3>
                  <button className="text-sm text-blue-600 hover:underline">
                    View All
                  </button>
                </div>
                <div className="border-t pt-2">
                  {appointments.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex justify-between py-2 border-b"
                    >
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-sm text-gray-600">
                          {appointment.reason}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{appointment.time}</p>
                        <p className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full inline-block">
                          {appointment.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Pending Requests</h3>
                  <button className="text-sm text-blue-600 hover:underline">
                    View All
                  </button>
                </div>
                <div className="border-t pt-2">
                  {pendingRequests.slice(0, 2).map((request) => (
                    <div key={request.id} className="py-2 border-b">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">{request.patientName}</p>
                        <p className="text-sm text-gray-600">{request.time}</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {request.reason}
                      </p>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded hover:bg-green-200">
                          Accept
                        </button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200">
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <AppointmentCalendar appointments={appointments} />

              {alerts.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4 mt-6">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                    <h3 className="font-semibold">Urgent Notifications</h3>
                  </div>
                  <div className="border-t pt-2">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-center py-2 border-b text-red-600"
                      >
                        <div className="mr-2 p-1 bg-red-100 rounded">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <p>{alert.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
