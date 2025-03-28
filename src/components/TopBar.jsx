import { useState, useContext, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChangePasswordDialog from "./basic/ChangePasswordDialog";
import { AuthContext } from "@/context/AuthContext";

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
    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 rounded bg-white p-4 my-3">
      <h2 className="text-xl font-semibold text-blue-500">
        {greeting}, {user?.name || "User"}
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
              className="text-blue-500 hover:cursor-pointer"
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

      <ChangePasswordDialog open={open} setOpen={setOpen} />
    </div>
  );
}
