import React from "react";
import {
  Clock,
  Calendar,
  Phone,
  Mail,
  FileText,
  MessageSquare,
  User,
  AlertTriangle,
} from "lucide-react";

const AppointmentDetails = ({ appointment, onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Appointment Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Patient Information */}
          <div className="md:w-1/3">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex flex-col items-center mb-4">
                <img
                  src={appointment.patientImage || "/api/placeholder/80/80"}
                  alt={appointment.patientName}
                  className="w-20 h-20 rounded-full mb-2"
                />
                <h3 className="font-semibold text-lg">
                  {appointment.patientName}
                </h3>
                <p className="text-sm text-gray-600">
                  Patient ID: {appointment.patientId}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="text-sm">{appointment.patientDOB}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm">{appointment.patientPhone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm">{appointment.patientEmail}</p>
                  </div>
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <button className="w-full py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 mb-2">
                  View Medical Records
                </button>
                <button className="w-full py-2 bg-green-50 text-green-600 rounded hover:bg-green-100">
                  View Patient Profile
                </button>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="md:w-2/3">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold">Appointment Information</h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    appointment.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "Scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : appointment.status === "Checked In"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Date</p>
                  <p className="font-medium">{appointment.date}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-600">Time</p>
                  <p className="font-medium">{appointment.time}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-600">Type</p>
                  <p className="font-medium">{appointment.type}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="font-medium">{appointment.duration} minutes</p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">Reason for Visit</h3>
              <p>{appointment.reason}</p>

              {appointment.medicalHistory && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Medical History Notes</h3>
                  <p className="text-sm">{appointment.medicalHistory}</p>
                </div>
              )}

              {appointment.allergies && appointment.allergies.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                    <h3 className="font-semibold text-red-600">Allergies</h3>
                  </div>
                  <ul className="list-disc pl-5 text-sm">
                    {appointment.allergies.map((allergy, index) => (
                      <li key={index} className="text-red-600">
                        {allergy}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex space-x-4 mb-4">
              <button className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center">
                <FileText className="w-4 h-4 mr-2" />
                Start Consultation
              </button>
              <button className="flex-1 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message Patient
              </button>
            </div>

            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100">
                Reschedule
              </button>
              <button className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100">
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
