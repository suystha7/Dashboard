


import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";

export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  id,
  type
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      let url = "";
      let headers = {};

      // Determine endpoint and headers based on type
      if (type === "hero") {
        url = `${API_PATHS.HEROS.DELETE_HERO}/${id}`;
      } else if (type === "facility") {
        url = `${API_PATHS.FACILITIES.DELETE_FACILITY}/${id}`;
        headers.Authorization = `Bearer ${accessToken}`;
      }
      else if (type === "testimonials") {
        url = `${API_PATHS.TESTIMONIALS.DELETE_TESTIMONIALS}/${id}`;
        headers.Authorization = `Bearer ${accessToken}`;
      }
      else if (type === "activity") {
        url = `${API_PATHS.ACTIVITIES.DELETE_ACTIVITY}/${id}`;
        headers.Authorization = `Bearer ${accessToken}`}
       else {
        throw new Error("Unsupported delete type");
      }

      const response = await axiosInstance.delete(url, { headers });

      if (response.status === 204 || response.status === 200) {
        toast.success(`${type[0].toUpperCase() + type.slice(1)} deleted successfully!`);
        onConfirm(id);
      } else {
        throw new Error(`Failed to delete ${type}`);
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      toast.error(`Error deleting ${type}. Please try again later.`);
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p>Do you really want to delete this? This action cannot be undone.</p>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

