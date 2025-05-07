// import { useState, useContext, useEffect } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import ChangePasswordDialog from "./basic/ChangePasswordDialog";
// import { AuthContext } from "@/context/AuthContext";

// export default function TopBar() {
//   const { user } = useContext(AuthContext);
//   const [open, setOpen] = useState(false);
//   const [greeting, setGreeting] = useState("");

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) {
//       setGreeting("Good Morning");
//     } else if (hour < 18) {
//       setGreeting("Good Afternoon");
//     } else {
//       setGreeting("Good Evening");
//     }
//   }, []);

//   return (
//     <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 rounded-xl shadow-lg bg-white p-4 mb-2">
//       <h2 className="text-xl font-semibold text-blue-500">
//         {greeting}, {user?.name || "User"}
//       </h2>

//       <DropdownMenu>
//         <DropdownMenuTrigger>
//           <Avatar className="h-9 w-9 border border-muted cursor-pointer">
//             <AvatarImage
//               src={user?.avatar || "/placeholder.svg?height=36&width=36"}
//               alt="User avatar"
//             />
//             <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
//           </Avatar>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-white shadow-lg rounded-md p-2 w-auto">
//           <DropdownMenuLabel className="text-gray-900 font-semibold">
//             Role:{" "}
//             <span className="text-sm text-gray-500 px-3">
//               {user?.role || "User"}
//             </span>
//           </DropdownMenuLabel>
//           <div className="p-2">
//             <button
//               className="text-blue-500 hover:cursor-pointer"
//               onClick={() => setOpen(true)}
//             >
//               Change Password
//             </button>
//           </div>
//           <DropdownMenuLabel className="text-gray-900 font-semibold">
//             Last Login:{" "}
//             <span className="text-sm text-gray-500 px-3">
//               {user?.lastLogin || "N/A"}
//             </span>
//           </DropdownMenuLabel>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <ChangePasswordDialog open={open} setOpen={setOpen} />
//     </div>
//   );
// }

"use client";

import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function TopBar() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 rounded-xl shadow-lg bg-white p-4 mb-2">
      <h2 className="text-xl font-semibold text-blue-500">
        {greeting}, {user?.name || "Admin"}
      </h2>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-9 w-9 border border-muted cursor-pointer">
            <AvatarImage
              src={user?.avatar || "/placeholder.svg?height=36&width=36"}
              alt="User avatar"
            />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg rounded-md p-2 w-auto">
          <DropdownMenuLabel className="text-gray-900 font-semibold">
            Role:{" "}
            <span className="text-sm text-gray-500 px-3">
              {user?.role || "User"}
            </span>
          </DropdownMenuLabel>
          <div className="p-2">
            <button
              className="text-blue-500 hover:underline hover:cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Change Password
            </button>
          </div>
          <DropdownMenuLabel className="text-gray-900 font-semibold">
            Last Login:{" "}
            <span className="text-sm text-gray-500 px-3">
              {user?.lastLogin || "N/A"}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog for Change Password */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <ChangePasswordForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Separated ChangePasswordForm component inside same file
import { Eye, EyeOff } from "lucide-react"; // add this at the top
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";

function ChangePasswordForm({ onSuccess }) {
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdatePassword = async () => {
    if (!old_password || !new_password || !confirm_password) {
      setMessage("Please fill all fields.");
      return;
    }
  
    if (new_password.length < 6) {
      setMessage("New password must be at least 6 characters.");
      return;
    }
  
    if (new_password !== confirm_password) {
      setMessage("New password and confirm password do not match.");
      return;
    }
  
    try {
      setLoading(true);
      setMessage("");
  
      const token = localStorage.getItem("accessToken");
      console.log("Token",token); // get token from localStorage
  
      await axiosInstance.post(
        API_PATHS.PASSSWORD.CHANGEPASSWORD,
        {
          old_password,
          new_password,
          confirm_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token in Authorization header
          },
        }
      );
  
      setMessage("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onSuccess(); // Close the dialog
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      {message && (
        <div className="mb-4 text-sm text-red-500">
          {message}
        </div>
      )}

      {/* Old Password */}
      <div className="mb-4 relative">
        <label className="block mb-1 font-medium">Old Password</label>
        <input
          type={showOldPassword ? "text" : "password"}
          className="w-full p-2 border rounded pr-10"
          value={old_password}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <div
          className="absolute right-3 top-9 cursor-pointer text-gray-500"
          onClick={() => setShowOldPassword(!showOldPassword)}
        >
          {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </div>
      </div>

      {/* New Password */}
      <div className="mb-4 relative">
        <label className="block mb-1 font-medium">New Password</label>
        <input
          type={showNewPassword ? "text" : "password"}
          className="w-full p-2 border rounded pr-10"
          value={new_password}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div
          className="absolute right-3 top-9 cursor-pointer text-gray-500"
          onClick={() => setShowNewPassword(!showNewPassword)}
        >
          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </div>
      </div>

      {/* Confirm New Password */}
      <div className="mb-4 relative">
        <label className="block mb-1 font-medium">Confirm New Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          className="w-full p-2 border rounded pr-10"
          value={confirm_password}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div
          className="absolute right-3 top-9 cursor-pointer text-gray-500"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </div>
      </div>

      <button
        onClick={handleUpdatePassword}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
}


