
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react"; // <-- added Trash icon
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import toast from "react-hot-toast";

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState([]);

  const fetchSettings = async () => { 
    try {
      const response = await axiosInstance.get(API_PATHS.SETTINGS.GET);
      const data = response?.data?.data || response?.data || [];
      setSettings(data);
    } catch (error) {
      console.error("❌ Failed to fetch settings:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this setting?")) return;

    try {
      await axiosInstance.delete(`${API_PATHS.SETTINGS.DELETE}/${id}`);
      setSettings((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted successfully!");
    } catch (error) {
      console.error("❌ Failed to delete setting:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="container p-5 bg-white h-fit overflow-hidden rounded-md">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Global Settings</h2>
        <Button onClick={() => navigate("/settings/add")}>Add</Button>
      </div>

      <form className="space-y-6">
        {settings.length === 0 ? (
          <p className="text-gray-500">No settings found.</p>
        ) : (
          settings.map((setting, index) => (
            <div key={setting.id || index} className="flex items-center gap-2">
              <Label htmlFor={setting.id} className="w-40 text-right font-medium">
                {setting.label || setting.key || `Setting ${index + 1}`}
              </Label>
              <Input
                id={setting.id}
                value={setting.value || ""}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(`/settings/edit/${setting.id}`, { state: setting })}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleDelete(setting.id)}
              >
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))
        )}
      </form>
    </div>
  );
}
