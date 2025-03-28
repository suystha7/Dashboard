//Authentication and API fetching
"use client";

import PaginatedTable from "@/components/basic/PaginatedTable";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/helper";
import { Loader2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// API URL
const API_URL = "http://montessori.website/contact/contactapi/";

// Authentication helper function - all in one file as requested
const fetchWithAuth = async (url, options = {}) => {
  // Get the access token from localStorage
  const accessToken = localStorage.getItem("accessToken");

  // Check if token exists
  if (!accessToken) {
    throw new Error("Authentication required. Please login.");
  }

  // Add authorization header with token
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    ...options.headers,
  };

  // Make the authenticated request
  return fetch(url, {
    ...options,
    headers,
  });
};

// Simple SVG icons
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
);

const MailOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
    <path d="M21 9l-9 6-9-6"></path>
  </svg>
);

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const MoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
);

export default function ContactTable() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contacts from API with authentication
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);

        // Use the fetchWithAuth helper to make an authenticated request
        const response = await fetchWithAuth(API_URL);

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Authentication failed. Please login again.");
          }
          throw new Error(`Failed to fetch contacts: ${response.status}`);
        }

        const data = await response.json();
        setContacts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError(err.message);
        toast.error(err.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts based on search term and filter
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone?.includes(searchTerm);

    if (filter === "all") return matchesSearch;
    if (filter === "unread") return matchesSearch && !contact.is_read;
    if (filter === "important") return matchesSearch && contact.is_important;

    return matchesSearch;
  });

  // Toggle dropdown menu
  const toggleDropdown = (id) => {
    if (dropdownOpen === id) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(id);
    }
  };

  // Handle actions
  const handleMarkAsRead = async (id) => {
    try {
      const contact = contacts.find((c) => c.id === id);
      if (!contact) return;

      const updatedContact = { ...contact, is_read: !contact.is_read };

      const response = await fetchWithAuth(`${API_URL}${id}/`, {
        method: "PUT",
        body: JSON.stringify(updatedContact),
      });

      if (!response.ok) {
        throw new Error(`Failed to update contact: ${response.status}`);
      }

      setContacts(
        contacts.map((contact) =>
          contact.id === id ? updatedContact : contact
        )
      );
      toast.success("Contact updated successfully", "success");
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error(error.message, "error");
    }

    setDropdownOpen(null);
  };

  const handleToggleImportant = async (id) => {
    try {
      const contact = contacts.find((c) => c.id === id);
      if (!contact) return;

      const updatedContact = {
        ...contact,
        is_important: !contact.is_important,
      };

      const response = await fetchWithAuth(`${API_URL}${id}/`, {
        method: "PUT",
        body: JSON.stringify(updatedContact),
      });

      if (!response.ok) {
        throw new Error(`Failed to update contact: ${response.status}`);
      }

      setContacts(
        contacts.map((contact) =>
          contact.id === id ? updatedContact : contact
        )
      );
      toast.success("Contact updated successfully", "success");
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error(error.message, "error");
    }

    setDropdownOpen(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetchWithAuth(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete contact: ${response.status}`);
      }

      setContacts(contacts.filter((contact) => contact.id !== id));
      toast.success("Contact deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error(error.message, "error");
    }

    setDropdownOpen(null);
  };
  const tableHeaderClass = "font-medium text-[16px] text-gray-700";

  return (
    <div className="container mx-auto p-6 h-screen">
      <div className="bg-white p-6 mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex justify-between items-center mb-5 w-full">
            <div className="flex gap-1 ">
              <button
                className={`px-2 py-1 rounded-md text-xs font-medium ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`px-2 py-1 rounded-md text-xs font-medium flex items-center ${
                  filter === "unread"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setFilter("unread")}
              >
                <span className="mr-1">
                  <MailOpenIcon />
                </span>
                Unread
              </button>
              <button
                className={`px-2 py-1 rounded-md text-xs font-medium flex items-center ${
                  filter === "important"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setFilter("important")}
              >
                <span className="mr-1">
                  <StarIcon />
                </span>
                Important
              </button>
            </div>
            <Button
              onClick={() => alert("Add Contact functionality would go here")}
              className="hover:cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center space-x-2 h-64">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground " />
            <span className="text-lg text-muted-foreground">
              Loading contacts...
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={`w-[5%] ${tableHeaderClass}`}>
                    S.N
                  </TableHead>
                  <TableHead className={`w-[5%] ${tableHeaderClass}`}>
                    Name
                  </TableHead>
                  <TableHead className={`w-[5%] ${tableHeaderClass}`}>
                    Email
                  </TableHead>
                  <TableHead className={`w-[5%] ${tableHeaderClass}`}>
                    Message
                  </TableHead>
                  <TableHead className={`w-[5%] ${tableHeaderClass}`}>
                    Date
                  </TableHead>
                  <TableHead className={`w-[5%] ${tableHeaderClass}`}>
                    Status
                  </TableHead>
                  <TableHead className={`w-[5%] ${tableHeaderClass}`}>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white divide-y divide-gray-200">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <TableRow
                      key={contact.id}
                      className={!contact.is_read ? "bg-blue-50" : ""}
                    >
                      <TableCell className="px-3 py-2 whitespace-nowrap">
                        {contact.id}
                      </TableCell>
                      <TableCell className="px-3 py-2 whitespace-nowrap">
                        {contact.name}
                      </TableCell>
                      <TableCell className="px-3 py-2 whitespace-nowrap">
                        {contact.email}
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        {contact.message && contact.message.length > 50
                          ? `${contact.message.substring(0, 50)}...`
                          : contact.message}
                      </TableCell>
                      <TableCell className="px-3 py-2 whitespace-nowrap">
                        {formatDate(contact.created_at)}
                      </TableCell>
                      <TableCell className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          {!contact.is_read && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              <MailOpenIcon />
                            </span>
                          )}
                          {contact.is_important && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              <StarIcon />
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2 whitespace-nowrap text-right">
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(contact.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <MoreIcon />
                          </button>
                          {dropdownOpen === contact.id && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <div className="py-1">
                                <button
                                  onClick={() => handleMarkAsRead(contact.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <EyeIcon />
                                  <span className="ml-2">
                                    Mark as{" "}
                                    {contact.is_read ? "unread" : "read"}
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleToggleImportant(contact.id)
                                  }
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <StarIcon />
                                  <span className="ml-2">
                                    {contact.is_important
                                      ? "Remove importance"
                                      : "Mark as important"}
                                  </span>
                                </button>
                                <button
                                  onClick={() => handleDelete(contact.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                  <TrashIcon />
                                  <span className="ml-2">Delete</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan="7"
                      className="text-center py-10 text-muted-foreground"
                    >
                      {error ? `Error: ${error}` : "No contacts found."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
