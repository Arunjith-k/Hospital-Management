import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

// Define the DoctorCard component
const DoctorCard = ({ doctor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
    >
      {/* Updated image styling */}
      <div className="w-full h-48 bg-blue-50 flex items-center justify-center overflow-hidden">
        <img
          className="w-full h-full object-contain" // Use object-contain instead of object-cover
          src={doctor.image}
          alt={doctor.name}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-green-500">
          <p className="w-2 h-2 bg-green-500 rounded-full"></p>
          <p>Available</p>
        </div>
        <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
        <p className="text-gray-600 text-sm">{doctor.speciality}</p>
        <div className="flex items-center mt-1">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{doctor.rating}</span>
        </div>
      </div>
    </div>
  );
};

// TopDoctors component
const TopDoctors = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  console.log(context); // Debugging

  const { doctors, loading, error } = context;

  if (loading)
    return <p className="text-center text-gray-600">Loading top doctors...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading doctors: {error}</p>
    );
  if (!doctors || doctors.length === 0)
    return <p className="text-center text-gray-600">No doctors available.</p>;

  // Filter or sort to get top doctors if needed
  const topDoctors = doctors.slice(0, 3); // Just get first 3 as an example

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-auto">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {topDoctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
            onClick={() => {
              navigate(`/appointment/${doctor._id}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ))}
      </div>
      <button
        onClick={() => {
          navigate(`/doctors`);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition-colors duration-300"
      >
        View More
      </button>
    </div>
  );
};

export default TopDoctors;
