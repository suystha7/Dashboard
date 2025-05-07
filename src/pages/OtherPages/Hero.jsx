

import { useState, useEffect } from "react";
import { API_PATHS } from "@/utils/apiPaths";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader2, Plus } from "lucide-react";
import PaginatedTable from "@/components/basic/PaginatedTable";
import axiosInstance from "@/utils/axiosInstance";
import HeroForm from "@/components/forms/HeroForm";
import DialogForm from "@/components/actions/DialogForm";
import { useNavigate, useLocation } from "react-router-dom";

export default function Hero() {
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Function to fetch heroes with filtering and pagination
  const fetchHeroes = async (url = null, deletedId = null) => {
    try {
      setIsLoading(true);
      
      // Determine which URL to use
      let fetchUrl;
      
      if (!url) {
        // Initial load - use current URL params if any
        fetchUrl = `${API_PATHS.HEROS.GET_HEROS}${location.search}`;
      } else if (typeof url === 'string') {
        // URL provided - use directly
        fetchUrl = url;
      } else {
        // Fallback to basic URL
        fetchUrl = API_PATHS.HEROS.GET_HEROS;
      }
      
      console.log("Fetching data from:", fetchUrl);
      
      const response = await axiosInstance.get(fetchUrl);
      console.log("API response:", response.data);
      
      // Handle deleted item if applicable
      if (deletedId) {
        setHeroes(prevHeroes => prevHeroes.filter(hero => hero.id !== deletedId));
        setTotalCount(prevCount => prevCount - 1);
      }
      
      // Update state with fetched data
      if (response.data && response.data.results) {
        setHeroes(response.data.results);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setCurrentPage(response.data.current_page || 1);
        setTotalPages(response.data.total_pages || 1);
        setTotalCount(response.data.count || 0);
      } else if (Array.isArray(response.data)) {
        // Handle case where API returns direct array
        setHeroes(response.data);
        setTotalCount(response.data.length);
        setCurrentPage(1);
        setTotalPages(1);
        setNextPageUrl(null);
        setPrevPageUrl(null);
      } else {
        // Fallback for unexpected response format
        console.error("Unexpected API response format:", response.data);
        toast.error("Received unexpected data format from server");
        setHeroes([]);
      }
    } catch (error) {
      console.error("Error fetching heroes:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to load heroes");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchHeroes();
  }, []);

  // Listen for URL changes (from filter/pagination actions)
  useEffect(() => {
    // Skip if component is still mounting
    const isInitialMount = !location.search || location.search === "?";
    if (!isInitialMount) {
      fetchHeroes(`${API_PATHS.HEROS.GET_HEROS}${location.search}`);
    }
  }, []);

  const handleHeroSubmit = (newHero) => {
    setHeroes(prevHeroes => [newHero, ...prevHeroes]);
    setTotalCount(prevCount => prevCount + 1);
    setIsFormOpen(false);
  };

  return (
    <div className="container p-5 bg-white h-fit overflow-hidden rounded-md">
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-2xl font-semibold">Manage Heroes</h2>
      
        <Button
          onClick={() => navigate("/hero/addHero")}
          className="cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          ADD HERO
        </Button>
      </div>

      <DialogForm>
        <HeroForm
          title="Hero"
          onSubmit={handleHeroSubmit}
          onCancel={() => setIsFormOpen(false)}
          refreshData={fetchHeroes}
        />
      </DialogForm>

      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 h-64">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="text-lg text-muted-foreground">
            Loading heroes...
          </span>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-auto mt-8">
            <PaginatedTable
              type="hero"
              totalpages={totalPages}
              totalcount={totalCount}
              currentPage={currentPage}
              previous={prevPageUrl}
              next={nextPageUrl}
              data={heroes}
              onPageChange={fetchHeroes}
            />
          </div>
        </>
      )}
    </div>
  );    
}