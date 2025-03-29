  import { useState, useEffect } from "react";
  import { API_PATHS } from "@/utils/apiPaths";
  import { Button } from "@/components/ui/button";
  import toast from "react-hot-toast";
  import HeroForm from "@/components/forms/HeroForm";
  import { Loader2, Plus, Search } from "lucide-react";
  import PaginatedTable from "@/components/basic/PaginatedTable";
  import Add from "@/components/actions/Add";
  import axiosInstance from "@/utils/axiosInstance";

  export default function Hero() {
    const [heroes, setHeroes] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedHero, setSelectedHero] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchHeroes = async () => {
        try {
          setIsLoading(true);
          const response = await axiosInstance.get(API_PATHS.HEROS.GET_HEROS);
          setHeroes(response.data); 
        } catch (err) {
          toast.error(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchHeroes();
    }, []);

    return (
      <div className="container p-6 bg-white">
        {isFormOpen && (
          <Add isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}>
            <HeroForm
              onSubmit={() => setIsFormOpen(false)}
              onCancel={() => setIsFormOpen(false)}
              initialData={selectedHero}
            />
          </Add>
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Manage Heroes</h2>
          <div className="flex items-center space-x-4">
            <div className="relative w-full my-4">
              <input
                type="text"
                placeholder="Search heroes..."
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
              ADD HERO <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center space-x-2 h-64">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground " />
            <span className="text-lg text-muted-foreground">
              Loading heroes...
            </span>
          </div>
        ) : (
          <div className="mt-12">
            <PaginatedTable
              type="hero"
              data={heroes}
              searchTerm={searchTerm}
              handleEditClick={setSelectedHero}
              handleDeleteClick={(hero) => console.log("Delete:", hero)}
            />
          </div>
        )}
      </div>
    );
  }
