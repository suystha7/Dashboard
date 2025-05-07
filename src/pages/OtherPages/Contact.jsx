// import ContactTable from "@/components/basic/ContactTable";
// import { API_PATHS } from "@/utils/apiPaths";
// import axiosInstance from "@/utils/axiosInstance";
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// const Contact = () => {
//   const [data, setData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const fetchData = async () => {
//     setLoading(true);
//     const filters = Object.fromEntries([...searchParams]);

//     try {
//       const res = await axiosInstance.get(API_PATHS.CONTACT.GET_CONTACTS, {
//         params: filters,
//       });

//       setData(res.data.results);
//       setTotalCount(res.data.count);
//     } catch (error) {
//       console.error("Failed to fetch contacts", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [searchParams]);

//   const handleFilterChange = (key, value) => {
//     const newParams = new URLSearchParams(searchParams);

//     if (value === "") {
//       newParams.delete(key);
//     } else {
//       newParams.set(key, value);
//     }

//     setSearchParams(newParams);
//   };

//   return (
//     <div className="container p-5 bg-white h-fit overflow-hidden rounded-md">
//       <div className="flex items-center justify-between mt-4">
//         <h2 className="text-2xl font-semibold">Contacts</h2>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 my-6 justify-end">
//         {/* Status Filter (is_active) */}
//         <select
//           onChange={(e) => handleFilterChange("is_active", e.target.value)}
//           className="border p-2 rounded"
//           value={searchParams.get("is_active") || ""}
//         >
//           <option value="">All Status</option>
//           <option value="true">Active</option>
//           <option value="false">Inactive</option>
//         </select>

//         {/* Read Status (is_read) */}
//         <select
//           onChange={(e) => handleFilterChange("is_read", e.target.value)}
//           className="border p-2 rounded"
//           value={searchParams.get("is_read") || ""}
//         >
//           <option value="">All Read Status</option>
//           <option value="true">Read</option>
//           <option value="false">Unread</option>
//         </select>

//         {/* Importance Status (is_important) */}
//         <select
//           onChange={(e) => handleFilterChange("is_important", e.target.value)}
//           className="border p-2 rounded"
//           value={searchParams.get("is_important") || ""}
//         >
//           <option value="">All Importance</option>
//           <option value="true">Important</option>
//           <option value="false">Not Important</option>
//         </select>
//       </div>

//       {/* Table or Loading State */}
//       {loading ? (
//         <div className="flex items-center justify-center space-x-2 h-64">
//           <span className="text-lg text-muted-foreground">Loading contacts...</span>
//         </div>
//       ) : (
//         <div className="flex-1 overflow-auto mt-4">
//           <ContactTable
//             data={data}
//             currentPage={parseInt(searchParams.get("page")) || 1}
//             totalcount={totalCount}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Contact;



import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import PaginatedTable from "@/components/basic/PaginatedTable";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchContacts = async (url = null) => {
    setLoading(true);
    try {
      const filters = Object.fromEntries([...searchParams]);

      let fetchUrl = url || API_PATHS.CONTACT.GET_CONTACTS;
      const res = await axiosInstance.get(fetchUrl, {
        params: !url ? filters : {},
      });

      setContacts(res.data.results || []);
      setTotalCount(res.data.count || 0);
      setCurrentPage(res.data.current_page || 1);
      setTotalPages(res.data.total_pages || 1);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    newParams.set("page", 1); // Reset to first page on filter change
    setSearchParams(newParams);
  };

  return (
    <div className="container p-5 bg-white h-fit overflow-hidden rounded-md">
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-2xl font-semibold">Contacts</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 my-6 justify-end">
        {/* <p>{count}</p> */}
        {/* Status Filter */}
        <select
          onChange={(e) => handleFilterChange("is_active", e.target.value)}
          className="border p-2 rounded"
          value={searchParams.get("is_active") || ""}
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        {/* Read Filter */}
        <select
          onChange={(e) => handleFilterChange("is_read", e.target.value)}
          className="border p-2 rounded"
          value={searchParams.get("is_read") || ""}
        >
          <option value="">All Read Status</option>
          <option value="true">Read</option>
          <option value="false">Unread</option>
        </select>

        {/* Important Filter */}
        <select
          onChange={(e) => handleFilterChange("is_important", e.target.value)}
          className="border p-2 rounded"
          value={searchParams.get("is_important") || ""}
        >
          <option value="">All Importance</option>
          <option value="true">Important</option>
          <option value="false">Not Important</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center space-x-2 h-64">
          <span className="text-lg text-muted-foreground">Loading contacts...</span>
        </div>
      ) : (
        <div className="flex-1 overflow-auto mt-4">
          <PaginatedTable
            type="contact" // you can use this inside PaginatedTable to render contact-specific columns
            totalpages={totalPages}
            totalcount={totalCount}
            currentPage={currentPage}
            previous={prevPageUrl}
            next={nextPageUrl}
            data={contacts}
            onPageChange={fetchContacts}
          />
        </div>
      )}
    </div>
  );
};

export default Contact;

