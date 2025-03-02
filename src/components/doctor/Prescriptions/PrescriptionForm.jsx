import React, { useState, useEffect } from "react";
import { Calendar, Clock, AlertTriangle } from "lucide-react";

const PrescriptionForm = ({
  patientId,
  onSubmit,
  existingPrescription = null,
}) => {
  const [prescription, setPrescription] = useState({
    patientId: patientId,
    medication: existingPrescription?.medication || "",
    dosage: existingPrescription?.dosage || "",
    frequency: existingPrescription?.frequency || "Once daily",
    duration: existingPrescription?.duration || "7 days",
    instructions: existingPrescription?.instructions || "",
    startDate:
      existingPrescription?.startDate || new Date().toISOString().split("T")[0],
    refills: existingPrescription?.refills || 0,
  });

  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const frequencyOptions = [
    "Once daily",
    "Twice daily",
    "Three times daily",
    "Four times daily",
    "Every 4 hours",
    "Every 6 hours",
    "Every 8 hours",
    "Every 12 hours",
    "As needed",
    "Before meals",
    "After meals",
    "At bedtime",
  ];

  const durationOptions = [
    "3 days",
    "5 days",
    "7 days",
    "10 days",
    "14 days",
    "30 days",
    "60 days",
    "90 days",
    "Until finished",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription((prev) => ({ ...prev, [name]: value }));

    // Simulate medication search suggestions
    if (name === "medication" && value.length > 2) {
      const commonMeds = [
        "Amoxicillin",
        "Azithromycin",
        "Lisinopril",
        "Metformin",
        "Atorvastatin",
        "Levothyroxine",
        "Amlodipine",
        "Omeprazole",
      ];

      setSuggestions(
        commonMeds.filter((med) =>
          med.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }

    // Simulate checking for drug interactions
    if (name === "medication" && value.length > 3) {
      setLoading(true);

      // Simulate API call delay
      setTimeout(() => {
        // Sample interactions for demo purposes
        if (value.toLowerCase().includes("amoxicillin")) {
          setInteractions([
            {
              severity: "moderate",
              with: "Allopurinol",
              description: "May increase risk of rash",
            },
            {
              severity: "minor",
              with: "Oral Contraceptives",
              description: "May decrease effectiveness",
            },
          ]);
        } else if (value.toLowerCase().includes("lisinopril")) {
          setInteractions([
            {
              severity: "severe",
              with: "Potassium supplements",
              description: "May cause hyperkalemia",
            },
            {
              severity: "moderate",
              with: "NSAIDs",
              description: "May decrease effectiveness",
            },
          ]);
        } else {
          setInteractions([]);
        }
        setLoading(false);
      }, 800);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prescription);
  };

  const selectSuggestion = (medication) => {
    setPrescription((prev) => ({ ...prev, medication }));
    setSuggestions([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        {existingPrescription ? "Edit Prescription" : "New Prescription"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medication
          </label>
          <input
            type="text"
            name="medication"
            value={prescription.medication}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Start typing medication name..."
            required
          />

          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {existingPrescription ? "Update Prescription" : "Create Prescription"}
        </button>
      </form>
    </div>
  );
};

export default PrescriptionForm;
