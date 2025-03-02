import React from "react";
import { Bell } from "lucide-react";

const DashboardHeader = ({ doctor }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={doctor.profilePic || "/api/placeholder/64/64"}
          alt={doctor.name}
          className="w-16 h-16 rounded-full border-4 border-white shadow mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{doctor.name}</h1>
          <p className="text-gray-600">{doctor.specialty}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
          {doctor.unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {doctor.unreadNotifications}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
