// src/context/AuthContext.js
import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return {
    ...context,
    isAuthenticated: !!context.user,
    userType: context.user?.role
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { role: 'doctor' | 'patient' | 'admin', email: string, name: string }

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
