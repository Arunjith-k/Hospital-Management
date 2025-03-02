import React, { useState } from "react";
import { Phone, Mail, Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";

const PatientProfile = ({ patient, onBack }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!patient) return <div>Patient not found</div>;

  return (
    <div className="w-full h-full flex flex-col">
      <button onClick={onBack} className="flex items-center text-blue-600 mb-4">
        <ArrowLeft size={16} className="mr-1" /> Back to patients
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold mr-4">
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <p className="text-gray-600">Patient ID: {patient.id}</p>
              <div className="flex items-center mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs mr-2 ${
                    patient.status === "stable"
                      ? "bg-green-100 text-green-800"
                      : patient.status === "improving"
                      ? "bg-blue-100 text-blue-800"
                      : patient.status === "critical"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {patient.status.charAt(0).toUpperCase() +
                    patient.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md mb-2 w-full">
              Schedule Appointment
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md w-full">
              Send Message
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md flex-1 overflow-hidden">
        <div className="border-b">
          <div className="flex">
            {[
              "overview",
              "medical-records",
              "prescriptions",
              "appointments",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                {tab.replace("-", " ").replace(/\w/g, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          {activeTab === "overview" && (
            <div>
              <h3 className="text-lg font-medium mb-4">Patient Summary</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm text-gray-500 mb-1">Blood Type</h4>
                  <p className="text-lg font-medium">
                    {patient.bloodType || "Not recorded"}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm text-gray-500 mb-1">Height</h4>
                  <p className="text-lg font-medium">
                    {patient.height || "Not recorded"}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm text-gray-500 mb-1">Weight</h4>
                  <p className="text-lg font-medium">
                    {patient.weight || "Not recorded"}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm text-gray-500 mb-1">Allergies</h4>
                  <p className="text-lg font-medium">
                    {patient.allergies?.join(", ") || "None recorded"}
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-4">Current Medications</h3>
              {patient.currentMedications?.length > 0 ? (
                <ul className="list-disc pl-5">
                  {patient.currentMedications.map((med, idx) => (
                    <li key={idx} className="mb-2">
                      {med}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No current medications</p>
              )}
            </div>
          )}

          {activeTab === "medical-records" && (
            <p className="text-gray-500">Loading medical records...</p>
          )}
          {activeTab === "prescriptions" && (
            <p className="text-gray-500">Loading prescription history...</p>
          )}
          {activeTab === "appointments" && (
            <p className="text-gray-500">Loading appointment history...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
