

import { useState, useEffect } from "react";
import { API_PATHS } from "@/utils/apiPaths";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader2, Plus } from "lucide-react";
import PaginatedTable from "@/components/basic/PaginatedTable";
import axiosInstance from "@/utils/axiosInstance";
import TestimonialForm from "@/components/forms/TestimonialForm";
import DialogForm from "@/components/actions/DialogForm";
import { useNavigate, useLocation } from "react-router-dom";
import TestimonialsTable from "@/components/basic/TestimonialsTable";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchTestimonials = async (url = null, deletedId = null) => {
    try {
      setIsLoading(true);

      let fetchUrl;

      if (!url) {
        fetchUrl = `${API_PATHS.TESTIMONIALS.GET_TESTIMONIALS}${location.search}`;
      } else if (typeof url === "string") {
        fetchUrl = url;
      } else {
        fetchUrl = API_PATHS.TESTIMONIALS.GET_TESTIMONIALS;
      }

      console.log("Fetching testimonials from:", fetchUrl);

      const response = await axiosInstance.get(fetchUrl);

      if (deletedId) {
        setTestimonials((prev) => prev.filter((item) => item.id !== deletedId));
        setTotalCount((prev) => prev - 1);
      }

      if (response.data?.results) {
        setTestimonials(response.data.results);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setCurrentPage(response.data.current_page || 1);
        setTotalPages(response.data.total_pages || 1);
        setTotalCount(response.data.count || 0);
      } else if (Array.isArray(response.data)) {
        setTestimonials(response.data);
        setTotalCount(response.data.length);
        setCurrentPage(1);
        setTotalPages(1);
        setNextPageUrl(null);
        setPrevPageUrl(null);
      } else {
        console.error("Unexpected data format:", response.data);
        toast.error("Unexpected data format received.");
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load testimonials"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const isInitialMount = !location.search || location.search === "?";
    if (!isInitialMount) {
      fetchTestimonials(
        `${API_PATHS.TESTIMONIALS.GET_TESTIMONIALS}${location.search}`
      );
    }
  }, []);

  const handleTestimonialSubmit = (newTestimonial) => {
    setTestimonials((prev) => [newTestimonial, ...prev]);
    setTotalCount((prev) => prev + 1);
    setIsFormOpen(false);
  };

  return (
    <div className="container p-5 bg-white h-fit overflow-hidden rounded-md">
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-2xl font-semibold">Manage Testimonials</h2>

        <Button
          onClick={() => navigate("/testimonials/addTestimonial")}
          className="cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          ADD TESTIMONIAL
        </Button>
      </div>

      {/* <DialogForm>
        <TestimonialForm
          title="Testimonial"
          onSubmit={handleTestimonialSubmit}
          onCancel={() => setIsFormOpen(false)}
          refreshData={fetchTestimonials}
        />
      </DialogForm> */}

      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 h-64">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="text-lg text-muted-foreground">
            Loading testimonials...
          </span>
        </div>
      ) : (
        <div className="flex-1 overflow-auto mt-8">
          <PaginatedTable
            type="testimonials"
            totalpages={totalPages}
            totalcount={totalCount}
            currentPage={currentPage}
            previous={prevPageUrl}
            next={nextPageUrl}
            data={testimonials}
            onPageChange={fetchTestimonials}
          />
        </div>
      )}
    </div>
  );
}
