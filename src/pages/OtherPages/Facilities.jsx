import { useState, useEffect } from "react";
import { API_PATHS } from "@/utils/apiPaths";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import PaginatedTable from "@/components/basic/PaginatedTable";
import { Loader2, Plus, Search } from "lucide-react";
import Add from "@/components/actions/Add";
import FacilityForm from "@/components/forms/FacilityForm";
import axiosInstance from "@/utils/axiosInstance";

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance(
          API_PATHS.FACILITIES.GET_FACILITIES
        );
        if (!response.ok) throw new Error("Failed to fetch heroes");
        setFacilities(await response.json());
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroes();
  }, []);

  return (
    <div className="container p-6 bg-white mt-8">
      {isFormOpen && (
        <Add isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}>
          <FacilityForm
            onSubmit={() => setIsFormOpen(false)}
            onCancel={() => setIsFormOpen(false)}
            initialData={selectedFacility}
          />
        </Add>
      )}

      <div className="flex items-center justify-between border-b">
        <h2 className="text-2xl font-semibold">Manage Facilities</h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-full my-4">
            <input
              type="text"
              placeholder="Search facilities..."
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
            ADD FACILITIES <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 h-64">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground " />
          <span className="text-lg text-muted-foreground">
            Loading facilities...
          </span>
        </div>
      ) : (
        <div className="mt-12">
          <PaginatedTable
            type="facility"
            heroes={facilities}
            searchTerm={searchTerm}
            handleEditClick={setSelectedFacility}
            handleDeleteClick={(facility) => console.log("Delete:", facility)}
          />
        </div>
      )}
    </div>
  );
}
