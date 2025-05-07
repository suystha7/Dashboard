// import { Link, useLocation } from "react-router-dom";
// import { FaHeart, FaHospital, FaCogs, FaSignOutAlt, FaPhoneAlt,FaCommentAlt } from "react-icons/fa";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { LayoutDashboardIcon } from "lucide-react";

// export default function Sidebar() {
//   const { logout } = useContext(AuthContext);
//   const location = useLocation(); 

//   const navItems = [
//     {
//       path: "/",
//       label: "Dashboard",
//       icon: <LayoutDashboardIcon className="mr-3 text-xl" />,
//     },
//     // {
//     //   path: "/hero",
//     //   label: "Hero",
//     //   icon: <FaHeart className="mr-3 text-xl" />,
//     // },
//     {
//       path: "/facilities",
//       label: "Facilities",
//       icon: <FaHospital className="mr-3 text-xl" />,
//     },
//     {
//       path: "/activities",
//       label: "Activities",
//       icon: <FaCogs className="mr-3 text-xl" />,
//     },
//     {
//       path: "/testimonials",
//       label: "Testimonials",
//       icon: <FaCommentAlt className="mr-3 text-xl" />,
//     },
//     {
//       path: "/contact",
//       label: "Contact",
//       icon: <FaPhoneAlt className="mr-3 text-xl" />,
//     },
//   ];

//   return (
//     <div className="w-60 bg-white text-black h-fit   shadow-lg flex-shrink-0 fixed m-2 rounded-xl mt-6">
//       <div className="p-6 border-b border-gray-200">
//         <h2 className="text-2xl font-bold text-center">StarKids </h2>
//       </div>
//       <nav className="flex flex-col p-6 space-y-3">
//         {navItems.map(({ path, label, icon }) => (
//           <Link
//             key={path}
//             to={path}
//             className={`flex items-center p-3 rounded-md transition ${
//               location.pathname === path
//                 ? "bg-blue-500 text-white"
//                 : "hover:bg-blue-500 hover:text-white"
//             }`} 
//           >
//             {icon}
//             {label}
//           </Link>
//         ))}
//         <button
//           type="button"
//           onClick={logout}
//           className="flex items-end p-3 rounded mt-50 text-black hover:bg-red-600 hover:text-white transition cursor-pointer"
//         >
//           <FaSignOutAlt className="mr-3 text-xl" />
//           Logout
//         </button>
//       </nav>
//     </div>
//   );
// }






import { Link, useLocation } from "react-router-dom";
import { FaHeart, FaHospital, FaCogs, FaSignOutAlt, FaPhoneAlt, FaCommentAlt, FaCog } from "react-icons/fa";
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
      path: "/testimonials",
      label: "Testimonials",
      icon: <FaCommentAlt className="mr-3 text-xl" />,
    },
    {
      path: "/contact",
      label: "Contact",
      icon: <FaPhoneAlt className="mr-3 text-xl" />,
    },
  ];

  return (
    <div className="w-60 bg-white text-black h-fit shadow-lg flex-shrink-0 fixed m-2 rounded-xl mt-6">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-center">StarKids</h2>
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
        <div className="mt-30">
        {/* Settings item above Logout */}
        <Link
          to="/settings"
          className={`flex items-center p-3 rounded-md transition ${
            location.pathname === "/settings"
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-500 hover:text-white"
          }`}
        >
          <FaCog className="mr-3 text-xl" />
          Settings
        </Link>

        {/* Logout button */}
        <button
          type="button"
          onClick={logout}
          className="flex items-center p-3 rounded-md mt-2 text-black hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          <FaSignOutAlt className="mr-3 text-xl" />
          Logout
        </button>
        </div>
      </nav>
    </div>
  );
}

