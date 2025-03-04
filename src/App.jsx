// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Add Navigate here
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/pages/Home";
import Doctors from "./components/pages/Doctors";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Contact from "./components/pages/Contact";
import Myprofile from "./components/pages/Myprofile";
import Myappointment from "./components/pages/Myappointment";
import Appointment from "./components/pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import DashboardLayout from "./components/doctor/Dashboard/DashboardLayout";
import Appointments from "./components/doctor/Appointments/UpcomingAppointments";
import PatientsList from "./components/doctor/Patients/PatientsList";
import PrescriptionForm from "./components/doctor/Prescriptions/PrescriptionForm";

const App = () => {
  return (
    <AuthProvider>
      <div className="mx-4 sm:mx-[10%]">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <Myprofile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-appointments"
            element={
              <ProtectedRoute>
                <Myappointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointment/:docId"
            element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            }
          />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* Doctor-Specific Routes */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute role="doctor">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardLayout />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="patients" element={<PatientsList />} />
            <Route path="prescriptions" element={<PrescriptionForm />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
