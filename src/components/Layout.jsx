import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-200 overflow-hidden">
      {/* Sidebar */}
      <div className="w-[250px]">
        <Sidebar />
      </div>

      {/* Main content container */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Content area */}
        <div className="flex-1 p-2 my-2">
          <Outlet />{" "}
          {/* Ensures child pages like Hero, Facilities, etc., load correctly */}
        </div>
      </div>
    </div>
  );
};

export default Layout;


// "use client"

// import { useState, useEffect } from "react"
// import { Outlet } from "react-router-dom"
// import { Menu } from "lucide-react"
// import AppSidebar from "./sidebar"

// const Layout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

//   // Close sidebar when window is resized to desktop size
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768 && isSidebarOpen) {
//         setIsSidebarOpen(false)
//       }
//     }

//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [isSidebarOpen])

//   // Close sidebar when clicking outside on mobile
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isSidebarOpen && window.innerWidth < 768) {
//         // Close if clicking outside sidebar
//         setIsSidebarOpen(false)
//       }
//     }

//     if (isSidebarOpen) {
//       document.addEventListener("click", handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener("click", handleClickOutside)
//     }
//   }, [isSidebarOpen])

//   return (
//     <div className="min-h-screen bg-gray-100 flex relative">
//       {/* Mobile Top Navbar */}
//       <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow-md p-4 z-30 flex justify-between items-center">
//         <h2 className="text-xl font-bold">StarKids</h2>
//         <button
//           onClick={(e) => {
//             e.stopPropagation() // Prevent event from bubbling to document
//             toggleSidebar()
//           }}
//           className="text-gray-700 hover:text-gray-900 transition-colors"
//           aria-label="Toggle sidebar"
//         >
//           <Menu className="h-6 w-6" />
//         </button>
//       </div>

//       {/* Sidebar (mobile + desktop) */}
//       <AppSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Main content */}
//       <div className="flex-1 flex flex-col md:ml-64 pt-16 md:pt-0 overflow-x-hidden">
//         <div className="p-4 md:p-6 w-full max-w-full">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Layout



