import { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AuthContext } from "@/context/AuthContext";
import { InputField } from "./InputField";

export default function ChangePasswordDialog({ open, setOpen }) {
  const { updatePassword } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleUpdatePassword = async () => {
    let newErrors = {};

    if (!oldPassword) {
      newErrors.oldPassword = "Please enter your old password.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!newPassword) {
      newErrors.newPassword = "Please enter a new password.";
    } else if (!passwordRegex.test(newPassword)) {
      newErrors.newPassword =
        "Password must be at least 6 characters, include an uppercase letter, and a number.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updatePassword(oldPassword, newPassword);
      alert("Password changed successfully!");
      setOpen(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (error) {
      setErrors({ oldPassword: "Old password is incorrect.", error });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <InputField
            label="Old Password"
            id="old-password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            error={errors.oldPassword}
            placeholder="Enter old password"
          />

          <InputField
            label="New Password"
            id="new-password"
            type="password"
            value={newPassword}
            placeholder="Enter new password"
            error={errors.newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <InputField
            label="Confirm Password"
            id="confirm-password"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            error={errors.confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <DialogFooter>
          <button
            className="w-full bg-blue-500 text-white hover:bg-blue-600 py-2 rounded-md"
            onClick={handleUpdatePassword}
          >
            Update Password
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
