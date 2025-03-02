import {
  FaUserMd,
  FaCalendarAlt,
  FaUsers,
  FaFilePrescription,
  FaUserCog,
} from "react-icons/fa";

const navItems = [
  { name: "Dashboard", icon: <FaUserMd />, link: "/dashboard" },
  { name: "Appointments", icon: <FaCalendarAlt />, link: "/appointments" },
  { name: "Patients", icon: <FaUsers />, link: "/patients" },
  {
    name: "Prescriptions",
    icon: <FaFilePrescription />,
    link: "/prescriptions",
  },
  { name: "Profile", icon: <FaUserCog />, link: "/profile" },
];

export default function NavigationItems() {
  return (
    <nav className="p-4 bg-gray-100 flex space-x-4 shadow-md">
      {navItems.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <span className="mr-2">{item.icon}</span> {item.name}
        </a>
      ))}
    </nav>
  );
}
