// src/components/pages/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("patient");

  // Check if the admin login page is requested
  const urlParams = new URLSearchParams(window.location.search);
  const isAdminLogin = urlParams.get("admin") === "true";

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Simulate login logic (replace with actual API call)
    const userData = {
      role: isAdminLogin ? "admin" : userType, // Set role based on admin login
      email,
      name,
    };

    login(userData); // Use the login function from AuthContext

    // Redirect based on user role
    if (userData.role === "doctor") {
      navigate("/doctor/dashboard");
    } else if (userData.role === "admin") {
      navigate("/admin");
    } else if (userData.role === "patient") {
      navigate("/"); // Changed from "/home" to "/" to match the home route
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      {/* Admin Login Form */}
      {isAdminLogin ? (
        <form
          onSubmit={onSubmitHandler}
          className="p-6 border rounded-xl shadow-lg min-w-[340px] sm:min-w-96 text-zinc-600"
        >
          <p className="text-2xl font-semibold">Admin Login</p>
          <p>Please enter your admin credentials</p>

          <div className="mt-4">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mt-4">
            <p>Password</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-red-600 text-white w-full py-2 rounded-md"
          >
            Login as Admin
          </button>
        </form>
      ) : (
        // Main Login Form for Patients & Doctors
        <form onSubmit={onSubmitHandler} className="flex items-center">
          <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
            <p className="text-2xl font-semibold ">
              {state === "Sign Up" ? "Create Account" : "Login"}
            </p>
            <p>
              Please {state === "Sign Up" ? "sign up" : "log in"} to book an
              appointment
            </p>

            {/* User Type Selection */}
            <div className="w-full">
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="patient"
                    checked={userType === "patient"}
                    onChange={() => setUserType("patient")}
                  />
                  Patient
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="doctor"
                    checked={userType === "doctor"}
                    onChange={() => setUserType("doctor")}
                  />
                  Doctor
                </label>
              </div>
            </div>

            {state === "Sign Up" && (
              <div className="w-full">
                <p>Full Name</p>
                <input
                  className="border border-zinc-300 rounded w-full p-2 mt-1"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            )}

            <div className="w-full">
              <p>Email</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="w-full">
              <p>Password</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-md text-base"
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>
            {state === "Sign Up" ? (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-primary cursor-pointer"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Create a new account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-primary cursor-pointer"
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;