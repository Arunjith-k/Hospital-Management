import React, { useState } from "react";

const AvailabilitySettings = () => {
  const [availability, setAvailability] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleChange = (day) => {
    setAvailability({
      ...availability,
      [day]: !availability[day],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle availability submission logic here
    console.log("Availability Updated:", availability);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(availability).map((day) => (
        <div key={day}>
          <label>
            <input
              type="checkbox"
              checked={availability[day]}
              onChange={() => handleChange(day)}
            />
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </label>
        </div>
      ))}
      <button type="submit">Save Availability</button>
    </form>
  );
};

export default AvailabilitySettings;
