import React, { useState } from "react";
import { Calendar, Check, AlertTriangle, RefreshCw, X } from "lucide-react";

const PrescriptionHistory = ({ patientId, prescriptions }) => {
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <Check className="text-green-500" size={18} />;
      case "expired":
        return <X className="text-red-500" size={18} />;
      case "pending":
        return <RefreshCw className="text-yellow-500" size={18} />;
      case "interaction":
        return <AlertTriangle className="text-orange-500" size={18} />;
      default:
        return null;
    }
  };

  const filteredPrescriptions = prescriptions?.filter((prescription) => {
    if (statusFilter === "all") return true;
    return prescription.status === statusFilter;
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Prescription History
        </h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Create New Prescription
        </button>
      </div>

      <div className="bg-gray-50 rounded-md p-4 mb-6">
        <div className="font-medium mb-2">Filter by Status</div>
        <div className="flex flex-wrap gap-2">
          {["all", "active", "pending", "expired", "interaction"].map(
            (status) => (
              <button
                key={status}
                className={`px-3 py-1.5 rounded-md flex items-center ${
                  statusFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700"
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {getStatusIcon(status)}
                <span className="ml-1 capitalize">{status}</span>
              </button>
            )
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredPrescriptions?.length > 0 ? (
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="bg-white p-4 rounded-md border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-lg mr-2">
                        {prescription.medication}
                      </h3>
                      <span
                        className={`flex items-center px-2 py-0.5 rounded-full text-xs ${
                          prescription.status === "active"
                            ? "bg-green-100 text-green-800"
                            : prescription.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : prescription.status === "expired"
                            ? "bg-red-100 text-red-800"
                            : prescription.status === "interaction"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {getStatusIcon(prescription.status)}
                        <span className="ml-1 capitalize">
                          {prescription.status}
                        </span>
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {prescription.dosage} • {prescription.frequency}
                    </p>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    {new Date(
                      prescription.prescribed
                    ).toLocaleDateString()} - {prescription.duration}
                  </div>
                </div>

                {prescription.instructions && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <p className="text-gray-700">{prescription.instructions}</p>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Prescribed by: Dr. {prescription.prescribedBy}
                  </span>
                  <div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm mr-3">
                      Renew
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Modify
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              No prescriptions found with the selected filter
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Create New Prescription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionHistory;
