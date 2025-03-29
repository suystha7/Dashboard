import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import PaginatedTable from "@/components/basic/PaginatedTable";
import { Loader2, Plus, Search } from "lucide-react";
import Add from "@/components/actions/Add";
import ActivityForm from "@/components/forms/ActivityForm";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

export default function Facilities() {
  const [activities, setActivities] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          API_PATHS.ACTIVITIES.GET_ACTIVITIES 
        );
        setActivities(response.data); 
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="container p-6 bg-white">
      {isFormOpen && (
        <Add isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}>
          <ActivityForm
            onSubmit={() => setIsFormOpen(false)}
            onCancel={() => setIsFormOpen(false)}
            initialData={selectedActivity}
          />
        </Add>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Manage Activities</h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-full my-4">
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full h-9 pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>

          <Button
            onClick={() => setIsFormOpen(true)}
            className="cursor-pointer"
          >
            ADD ACTIVITIES <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 h-64">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground " />
          <span className="text-lg text-muted-foreground">
            Loading activities...
          </span>
        </div>
      ) : (
        <div className="mt-12">
          <PaginatedTable
            type="activity"
            data={activities}
            searchTerm={searchTerm}
            handleEditClick={setSelectedActivity}
            handleDeleteClick={(activity) => console.log("Delete:", activity)}
          />
        </div>
      )}
    </div>
  );
}
