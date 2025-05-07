
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import toast from "react-hot-toast";

export default function GlobalSettingsForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); 
  console.log("Id",id);
  const editing = Boolean(id);

  // Preload data from state if available (from navigate)
  const initialData = location.state || {};

  const [key, setKey] = useState(initialData.key || "");
  const [label, setLabel] = useState(initialData.label || "");
  const [value, setValue] = useState(initialData.value || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [status, setStatus] = useState(initialData.status || false);
  const [isProtected, setIsProtected] = useState(initialData.isProtected || false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { key, label, value, description, status, isProtected };

    try {
      if (editing) {
        await axiosInstance.patch(`${API_PATHS.SETTINGS.EDIT}/${id}`, payload);
        toast.success("Edited successfully!");
      } else {
        await axiosInstance.post(API_PATHS.SETTINGS.CREATE, payload);
        toast.success("Added successfully!");
      }
      navigate("/settings");
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <div className="container p-5 bg-white h-fit overflow-hidden rounded-md">
      <h2 className="text-2xl font-bold mb-6">
        {editing ? "Edit Global Setting" : "Add Global Setting"}
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Key */}
        <div className="flex items-center gap-4">
          <Label htmlFor="key" className="w-40 text-right font-medium">Key</Label>
          <Input
            id="key"
            placeholder="Enter key"
            className="flex-1"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>

        {/* Label */}
        <div className="flex items-center gap-4">
          <Label htmlFor="label" className="w-40 text-right font-medium">Label</Label>
          <Input
            id="label"
            placeholder="Enter label"
            className="flex-1"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        {/* Value */}
        <div className="flex items-center gap-4">
          <Label htmlFor="value" className="w-40 text-right font-medium">Value</Label>
          <Input
            id="value"
            placeholder="Enter value"
            className="flex-1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="flex items-center gap-4">
          <Label htmlFor="description" className="w-40 text-right font-medium">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter description"
            className="flex-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Switches */}
        <div className="flex items-center gap-4">
          <Label className="w-40 text-right font-medium">Protected</Label>
          <Switch checked={isProtected} onCheckedChange={setIsProtected} />
        </div>
        <div className="flex items-center gap-4">
          <Label className="w-40 text-right font-medium">Status</Label>
          <Switch checked={status} onCheckedChange={setStatus} />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button type="submit">{editing ? "Edit" : "Add"}</Button>
          <Button variant="secondary" type="button" onClick={() => navigate("/settings")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}


