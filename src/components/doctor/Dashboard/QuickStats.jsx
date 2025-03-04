// src/components/doctor/Dashboard/QuickStats.jsx
import React, { useEffect, useState } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import axios from "axios"; // For API calls

const QuickStats = () => {
  const [stats, setStats] = useState({
    appointmentsToday: 0,
    pendingRequests: 0,
    totalPatients: 0,
  });

  useEffect(() => {
    // Fetch stats from the API
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/doctor/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <Calendar className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="font-semibold">Today's Appointments</h3>
        </div>
        <p className="text-3xl font-bold text-blue-800">
          {stats.appointmentsToday}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <Clock className="w-5 h-5 text-yellow-500 mr-2" />
          <h3 className="font-semibold">Pending Requests</h3>
        </div>
        <p className="text-3xl font-bold text-yellow-600">
          {stats.pendingRequests}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <Users className="w-5 h-5 text-green-500 mr-2" />
          <h3 className="font-semibold">Total Patients</h3>
        </div>
        <p className="text-3xl font-bold text-green-700">
          {stats.totalPatients}
        </p>
      </div>
    </div>
  );
};

export default QuickStats;
