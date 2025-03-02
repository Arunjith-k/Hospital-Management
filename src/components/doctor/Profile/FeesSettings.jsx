import React, { useState } from "react";

const FeesSettings = () => {
  const [fees, setFees] = useState({
    hourlyRate: 0,
    consultationFee: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFees({
      ...fees,
      [name]: parseFloat(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle fees submission logic here
    console.log("Fees Updated:", fees);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Hourly Rate:</label>
        <input
          type="number"
          name="hourlyRate"
          value={fees.hourlyRate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Consultation Fee:</label>
        <input
          type="number"
          name="consultationFee"
          value={fees.consultationFee}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Fees</button>
    </form>
  );
};

export default FeesSettings;
