import React, { useState } from "react";
import { Search, Filter, Clock } from "lucide-react";

const PendingRequests = ({ requests }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("all");

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterUrgency === "all" ||
      request.urgency.toLowerCase() === filterUrgency.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Pending Appointment Requests</h2>
      </div>

      <div className="p-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search patient or reason..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            className="pl-9 pr-4 py-2 border rounded-lg appearance-none bg-white"
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
          >
            <option value="all">All Urgency</option>
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
      </div>

      <div className="p-4">
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="border rounded-lg overflow-hidden"
              >
                <div
                  className={`p-3 flex justify-between items-center ${
                    request.urgency === "Emergency"
                      ? "bg-red-50"
                      : request.urgency === "Urgent"
                      ? "bg-yellow-50"
                      : "bg-blue-50"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src={request.patientImage || "/api/placeholder/40/40"}
                      alt={request.patientName}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{request.patientName}</p>
                      <p className="text-xs text-gray-600">
                        Patient ID: {request.patientId}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      request.urgency === "Emergency"
                        ? "bg-red-100 text-red-800"
                        : request.urgency === "Urgent"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {request.urgency}
                  </span>
                </div>

                <div className="p-3">
                  <div className="flex items-start mb-2">
                    <Clock className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-gray-600 text-sm">Requested Time</p>
                      <p className="font-medium">
                        {request.requestedDate} | {request.requestedTime}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-gray-600 text-sm">Reason for visit</p>
                    <p>{request.reason}</p>
                  </div>

                  {request.notes && (
                    <div className="mb-3">
                      <p className="text-gray-600 text-sm">Additional notes</p>
                      <p className="text-sm">{request.notes}</p>
                    </div>
                  )}

                  <div className="flex justify-between mt-4">
                    <div>
                      <p className="text-xs text-gray-500">
                        Requested {request.requestedAgo}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                        Reschedule
                      </button>
                      <button className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200">
                        Decline
                      </button>
                      <button className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200">
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No pending requests found matching your criteria
            </p>
          </div>
        )}
      </div>

      <div className="p-4 border-t flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredRequests.length} of {requests.length} requests
        </p>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded text-sm">Previous</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
            1
          </button>
          <button className="px-3 py-1 border rounded text-sm">2</button>
          <button className="px-3 py-1 border rounded text-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default PendingRequests;
