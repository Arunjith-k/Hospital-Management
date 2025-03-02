import React, { useState } from "react";

const AppointmentCalendar = ({ appointments }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate days for the current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // Empty cells for days before the first of the month
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Get appointments for the selected date
  const getAppointmentsForDate = (day) => {
    if (!day) return [];

    const dateToCheck = new Date(year, month, day);
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === dateToCheck.getDate() &&
        appointmentDate.getMonth() === dateToCheck.getMonth() &&
        appointmentDate.getFullYear() === dateToCheck.getFullYear()
      );
    });
  };

  // Navigate to previous/next month
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Appointment Calendar</h2>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-100">
            &lt;
          </button>
          <span className="font-medium">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-100">
            &gt;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="font-medium py-1 text-sm text-gray-600">
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          const dayAppointments = getAppointmentsForDate(day);
          const isToday =
            day &&
            new Date().getDate() === day &&
            new Date().getMonth() === month &&
            new Date().getFullYear() === year;

          return (
            <div
              key={index}
              className={`p-1 text-sm min-h-12 ${!day ? "text-gray-300" : ""} 
                         ${
                           isToday ? "bg-blue-50 font-bold text-blue-600" : ""
                         }`}
            >
              {day && (
                <>
                  <div className="mb-1">{day}</div>
                  {dayAppointments.length > 0 && (
                    <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5">
                      {dayAppointments.length} appts
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
