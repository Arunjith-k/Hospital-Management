import React, { useState } from "react";
import { Download, Filter, Plus } from "lucide-react";

const MedicalRecords = ({ patientId, records }) => {
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  const filteredRecords = records
    ?.filter((record) => {
      if (filterType === "all") return true;
      return record.type === filterType;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Medical Records</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md flex items-center">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
            <Plus size={16} className="mr-2" />
            Add Record
          </button>
        </div>
      </div>

      <div className="flex items-center mb-4 gap-2">
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="lab">Lab Results</option>
          <option value="imaging">Imaging</option>
          <option value="consultation">Consultation</option>
          <option value="procedure">Procedure</option>
        </select>

        <select
          className="p-2 border border-gray-300 rounded-md ml-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredRecords?.length > 0 ? (
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="bg-white p-4 rounded-md border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{record.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(record.date).toLocaleDateString()} •{" "}
                      {record.type.charAt(0).toUpperCase() +
                        record.type.slice(1)}
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center">
                    <Download size={16} className="mr-1" />
                    Download
                  </button>
                </div>

                <div className="mt-3">
                  <p className="text-gray-700">{record.summary}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Added by: Dr. {record.doctor}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No medical records found</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Add First Record
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
