import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 mt-12 border-t border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="hover:text-primary">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctors" className="hover:text-primary">
                All Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-primary">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-primary">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
          <p className="mb-2">Email: support@doctorbooking.com</p>
          <p className="mb-2">Phone: +1 123-456-7890</p>
          <p>Address: 123 Health Street, Medical City</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">For Admins</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/login" className="hover:text-primary">
                Admin Login
              </NavLink>
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            Administrative access is restricted to authorized personnel only.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center border-t border-gray-200 pt-4">
        <p>
          &copy; {new Date().getFullYear()} Doctor Booking System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
