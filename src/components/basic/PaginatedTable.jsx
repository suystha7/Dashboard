// "use client";

// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Filter from "./Filter";
// import Pagination from "./Pagination";
// import { DeleteConfirmationDialog } from "../actions/DeleteConfirmationDialog";
// import TableComponent from "./Table";
// import { API_PATHS } from "../../utils/apiPaths";
// import TestimonialsTable from "./TestimonialsTable";

// export default function PaginatedTable({
//   previous,
//   next,
//   onPageChange,
//   data,
//   currentPage,
//   totalpages,
//   totalcount,
//   type,
// }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const [debounceTimer, setDebounceTimer] = useState(null);

//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");
//   const [selectedStatus, setSelectedStatus] = useState(
//     queryParams.get("status") || "all"
//   );
//   const [selectedFeatured, setSelectedFeatured] = useState(
//     queryParams.get("is_featured") || "all"
//   );
//   const [selectedSort, setSelectedSort] = useState(
//     queryParams.get("created_at") || "default"
//   );

//   const getBaseUrl = () => {
//     if (type === "facility") return API_PATHS.FACILITIES.GET_FACILITIES;
//     else if (type === "activity") return API_PATHS.ACTIVITIES.GET_ACTIVITIES;
//     else if (type === "testimonials")
//       return API_PATHS.TESTIMONIALS.GET_TESTIMONIALS;
//     return API_PATHS.HEROS.GET_HEROS;
//   };

//   const baseUrl = getBaseUrl();

//   useEffect(() => {
//     console.log("Previous URL:", previous);
//     console.log("Next URL:", next);
//   }, [previous, next]);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);

//     const getReadable = (key, value) => {
//       if (key === "status") {
//         return value === "true"
//           ? "active"
//           : value === "false"
//           ? "inactive"
//           : "all";
//       }
//       if (key === "is_featured") {
//         return value === "true" ? "yes" : value === "false" ? "no" : "all";
//       }
//       if (key === "created_at") {
//         return value === "oldest"
//           ? "oldest"
//           : value === "latest"
//           ? "latest"
//           : "default";
//       }
//       return value;
//     };

//     setSearchTerm(params.get("search") || "");
//     setSelectedStatus(getReadable("status", params.get("status")));
//     setSelectedFeatured(getReadable("is_featured", params.get("is_featured")));
//     setSelectedSort(getReadable("created_at", params.get("created_at")));
//   }, [location.search]);

//   const handleFilterChange = (filter, value) => {
//     const params = new URLSearchParams(location.search);

//     // Convert UI values to API values
//     let queryValue = value;

//     if (filter === "status") {
//       if (value === "active") queryValue = "true";
//       else if (value === "inactive") queryValue = "false";
//       else queryValue = ""; // 'all'
//     }

//     if (filter === "is_featured") {
//       if (value === "yes") queryValue = "true";
//       else if (value === "no") queryValue = "false";
//       else queryValue = ""; // 'all'
//     }

//     if (filter === "created_at") {
//       if (value === "latest") queryValue = "latest";
//       else if (value === "oldest") queryValue = "oldest";
//       else queryValue = "";
//     }

//     // Update or delete the filter in query params
//     if (queryValue) {
//       params.set(filter, queryValue);
//     } else {
//       params.delete(filter);
//     }

//     // Always reset to page 1 when filters change
//     params.delete("page");

//     const queryString = params.toString();
//     const newUrl = queryString ? `?${queryString}` : "";

//     navigate(newUrl); // updates URL
//     onPageChange(`${baseUrl}${newUrl}`); // triggers API call
//   };

//   // Handle search with debounce
//   const handleSearchChange = (value) => {
//     setSearchTerm(value);

//     if (debounceTimer) {
//       clearTimeout(debounceTimer);
//     }

//     const timer = setTimeout(() => {
//       const params = new URLSearchParams(location.search);

//       if (value.trim()) {
//         params.set("search", value.trim());
//       } else {
//         params.delete("search");
//       }

//       params.delete("page");

//       const queryString = params.toString();
//       const newUrl = queryString ? `?${queryString}` : "";

//       navigate(newUrl);
//       onPageChange(`${baseUrl}${newUrl}`);

//       // Remove this line as it's redundant and apiUrl is undefined
//     }, 500);

//     setDebounceTimer(timer);
//   };

//   const handlePageChange = (url) => {
//     if (!url) return;

//     try {
//       // Extract the full query string from the URL
//       const urlObj = new URL(url);
//       const urlParams = urlObj.searchParams;

//       // Get current params from the browser URL
//       const currentParams = new URLSearchParams(location.search);

//       // Update page parameter
//       const pageNumber = urlParams.get("page");
//       if (pageNumber) {
//         currentParams.set("page", pageNumber);
//       } else {
//         // If no page in URL, default to page 1
//         currentParams.set("page", "1");
//       }

//       const queryString = currentParams.toString();
//       const newUrl = queryString ? `?${queryString}` : "";

//       // Update browser URL
//       navigate(newUrl);

//       // Make API call
//       onPageChange(`${baseUrl}${newUrl}`);
//     } catch (error) {
//       console.error("Error parsing pagination URL:", error);
//       // Fallback to direct call if URL parsing fails
//       onPageChange(url);
//     }
//   };

//   return (
//     <div className="overflow-hidden">
//       <Filter
//         searchTerm={searchTerm}
//         onSearchChange={handleSearchChange}
//         selectedStatus={selectedStatus}
//         selectedFeatured={selectedFeatured}
//         selectedSort={selectedSort}
//         handleFilterChange={handleFilterChange}
//         totalcount={totalcount}
//       />

//       {type === "testimonials" ? (
//         <div className="mt-1">
//           <TestimonialsTable
//             type={type}
//             data={data}
//             handleDeleteClick={(item) => {
//               setItemToDelete(item);
//               setIsDeleteDialogOpen(true);
//             }}
//           />
//         </div>
//       ) : (
//         <div className="mt-1">
//           <TableComponent
//             type={type}
//             data={data}
//             handleDeleteClick={(item) => {
//               setItemToDelete(item);
//               setIsDeleteDialogOpen(true);
//             }}
//           />
//         </div>
//       )}

//       <Pagination
//         totalpages={totalpages}
//         currentPage={currentPage}
//         previous={previous}
//         next={next}
//         onPageChange={handlePageChange}
//       />

//       {itemToDelete && (
//         <DeleteConfirmationDialog
//           isOpen={isDeleteDialogOpen}
//           onClose={() => setIsDeleteDialogOpen(false)}
//           onConfirm={() => {
//             const params = new URLSearchParams(location.search);

//             // Use the same baseUrl function we defined earlier
//             const baseUrl = getBaseUrl();
//             const url = `${baseUrl}?${params.toString()}`;

//             onPageChange(url, itemToDelete.id);
//             setIsDeleteDialogOpen(false);
//             setItemToDelete(null);
//           }}
//           id={itemToDelete?.id}
//           type={type}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import Pagination from "./Pagination";
import { DeleteConfirmationDialog } from "../actions/DeleteConfirmationDialog";
import TableComponent from "./Table";
import { API_PATHS } from "../../utils/apiPaths";
import TestimonialsTable from "./TestimonialsTable";
import ContactTable from "./ContactTable";

export default function PaginatedTable({
  previous,
  next,
  onPageChange,
  data,
  currentPage,
  totalpages,
  totalcount,
  type,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");
  const [selectedStatus, setSelectedStatus] = useState(
    queryParams.get("status") || "all"
  );
  const [selectedFeatured, setSelectedFeatured] = useState(
    queryParams.get("is_featured") || "all"
  );
  const [selectedSort, setSelectedSort] = useState(
    queryParams.get("created_at") || "default"
  );

  const getBaseUrl = () => {
    if (type === "facility") return API_PATHS.FACILITIES.GET_FACILITIES;
    else if (type === "activity") return API_PATHS.ACTIVITIES.GET_ACTIVITIES;
    else if (type === "contact") return API_PATHS.CONTACT.GET_CONTACTS;
    else if (type === "testimonials")
      return API_PATHS.TESTIMONIALS.GET_TESTIMONIALS;
    return API_PATHS.HEROS.GET_HEROS;
  };

  const baseUrl = getBaseUrl();

  useEffect(() => {
    console.log("Previous URL:", previous);
    console.log("Next URL:", next);
  }, [previous, next]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const getReadable = (key, value) => {
      if (key === "status") {
        return value === "true"
          ? "active"
          : value === "false"
          ? "inactive"
          : "all";
      }
      if (key === "is_featured") {
        return value === "true" ? "yes" : value === "false" ? "no" : "all";
      }
      if (key === "created_at") {
        return value === "oldest"
          ? "oldest"
          : value === "latest"
          ? "latest"
          : "default";
      }
      return value;
    };

    setSearchTerm(params.get("search") || "");
    setSelectedStatus(getReadable("status", params.get("status")));
    setSelectedFeatured(getReadable("is_featured", params.get("is_featured")));
    setSelectedSort(getReadable("created_at", params.get("created_at")));
  }, [location.search]);

  const handleFilterChange = (filter, value) => {
    const params = new URLSearchParams(location.search);

    // Convert UI values to API values
    let queryValue = value;

    if (filter === "status") {
      if (value === "active") queryValue = "true";
      else if (value === "inactive") queryValue = "false";
      else queryValue = ""; // 'all'
    }

    if (filter === "is_featured") {
      if (value === "yes") queryValue = "true";
      else if (value === "no") queryValue = "false";
      else queryValue = ""; // 'all'
    }

    if (filter === "created_at") {
      if (value === "latest") queryValue = "latest";
      else if (value === "oldest") queryValue = "oldest";
      else queryValue = "";
    }

    // Update or delete the filter in query params
    if (queryValue) {
      params.set(filter, queryValue);
    } else {
      params.delete(filter);
    }

    // Always reset to page 1 when filters change
    params.delete("page");

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : "";

    navigate(newUrl); // updates URL
    onPageChange(`${baseUrl}${newUrl}`); // triggers API call
  };

  // Handle search with debounce
  const handleSearchChange = (value) => {
    setSearchTerm(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(location.search);

      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }

      params.delete("page");

      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : "";

      navigate(newUrl);
      onPageChange(`${baseUrl}${newUrl}`);

      // Remove this line as it's redundant and apiUrl is undefined
    }, 500);

    setDebounceTimer(timer);
  };

  const handlePageChange = (url) => {
    if (!url) return;

    try {
      // Extract the full query string from the URL
      const urlObj = new URL(url);
      const urlParams = urlObj.searchParams;

      // Get current params from the browser URL
      const currentParams = new URLSearchParams(location.search);

      // Update page parameter
      const pageNumber = urlParams.get("page");
      if (pageNumber) {
        currentParams.set("page", pageNumber);
      } else {
        // If no page in URL, default to page 1
        currentParams.set("page", "1");
      }

      const queryString = currentParams.toString();
      const newUrl = queryString ? `?${queryString}` : "";

      // Update browser URL
      navigate(newUrl);

      // Make API call
      onPageChange(`${baseUrl}${newUrl}`);
    } catch (error) {
      console.error("Error parsing pagination URL:", error);
      // Fallback to direct call if URL parsing fails
      onPageChange(url);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* <Filter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedStatus={selectedStatus}
        selectedFeatured={selectedFeatured}
        selectedSort={selectedSort}
        handleFilterChange={handleFilterChange}
        totalcount={totalcount}
      /> */}

        {type !== "contact" && (
          <Filter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedStatus={selectedStatus}
          selectedFeatured={selectedFeatured}
          selectedSort={selectedSort}
          handleFilterChange={handleFilterChange}
          totalcount={totalcount}
          />
        )}


        {type === "testimonials" ? (
          <div className="mt-1">
            <TestimonialsTable
              type={type}
              data={data}
              handleDeleteClick={(item) => {
                setItemToDelete(item);
                setIsDeleteDialogOpen(true);
              }}
            />
          </div>
        ) : type === "contact" ? (
          <div className="mt-1">
            <ContactTable
              type={type}
              data={data}
              handleDeleteClick={(item) => {
                setItemToDelete(item);
                setIsDeleteDialogOpen(true);
              }}
            />
          </div>
        ) : (
          <div className="mt-1">
            <TableComponent
              type={type}
              data={data}
              handleDeleteClick={(item) => {
                setItemToDelete(item);
                setIsDeleteDialogOpen(true);
              }}
            />
          </div>
        )}


      <Pagination
        totalpages={totalpages}
        currentPage={currentPage}
        previous={previous}
        next={next}
        onPageChange={handlePageChange}
      />

      {itemToDelete && (
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={() => {
            const params = new URLSearchParams(location.search);

            // Use the same baseUrl function we defined earlier
            const baseUrl = getBaseUrl();
            const url = `${baseUrl}?${params.toString()}`;

            onPageChange(url, itemToDelete.id);
            setIsDeleteDialogOpen(false);
            setItemToDelete(null);
          }}
          id={itemToDelete?.id}
          type={type}
        />
      )}
    </div>
  );
}
