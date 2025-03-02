import React from "react";
import { Calendar, Clock, Users } from "lucide-react";

const QuickStats = ({ stats }) => {
  const { appointmentsToday, pendingRequests, totalPatients } = stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <Calendar className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="font-semibold">Today's Appointments</h3>
        </div>
        <p className="text-3xl font-bold text-blue-800">{appointmentsToday}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <Clock className="w-5 h-5 text-yellow-500 mr-2" />
          <h3 className="font-semibold">Pending Requests</h3>
        </div>
        <p className="text-3xl font-bold text-yellow-600">{pendingRequests}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <Users className="w-5 h-5 text-green-500 mr-2" />
          <h3 className="font-semibold">Total Patients</h3>
        </div>
        <p className="text-3xl font-bold text-green-700">{totalPatients}</p>
      </div>
    </div>
  );
};

export default QuickStats;
