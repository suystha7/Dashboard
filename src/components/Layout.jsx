import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-[250px]">
        <Sidebar />
      </div>

      {/* Main content container */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Content area */}
        <div className="flex-1 p-6">
          <Outlet /> {/* Ensures child pages like Hero, Facilities, etc., load correctly */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
