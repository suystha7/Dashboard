import { Link, useLocation } from "react-router-dom";
import { FaHeart, FaHospital, FaCogs, FaSignOutAlt, FaPhoneAlt } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LayoutDashboardIcon } from "lucide-react";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const location = useLocation(); 

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: <LayoutDashboardIcon className="mr-3 text-xl" />,
    },
    {
      path: "/hero",
      label: "Hero",
      icon: <FaHeart className="mr-3 text-xl" />,
    },
    {
      path: "/facilities",
      label: "Facilities",
      icon: <FaHospital className="mr-3 text-xl" />,
    },
    {
      path: "/activities",
      label: "Activities",
      icon: <FaCogs className="mr-3 text-xl" />,
    },
    {
      path: "/contact",
      label: "Contact",
      icon: <FaPhoneAlt className="mr-3 text-xl" />,
    },
  ];

  return (
    <div className="w-64 bg-white text-black h-screen shadow-lg flex-shrink-0 fixed ">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">School Admin</h2>
      </div>
      <nav className="flex flex-col p-6 space-y-3">
        {navItems.map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center p-3 rounded-md transition ${
              location.pathname === path
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-500 hover:text-white"
            }`} 
          >
            {icon}
            {label}
          </Link>
        ))}
        <button
          type="button"
          onClick={logout}
          className="flex items-end p-3 rounded mt-70 text-black hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          <FaSignOutAlt className="mr-3 text-xl" />
          Logout
        </button>
      </nav>
    </div>
  );
}
