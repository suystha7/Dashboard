//Authentication and API fetching
"use client";

import { useEffect, useState } from "react";
import { Users, Home, Activity, Phone, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TopBar from "@/components/TopBar";

// API URLs
const API_ENDPOINTS = {
  heroes: "http://montessori.website/hero/heroapi/",
  facilities: "http://montessori.website/facility/facilityapi/",
  activities: "http://montessori.website/activity/activityapi/",
  contacts: "http://montessori.website/contact/contactapi/",
};

// Authentication helper function
const fetchWithAuth = async (url) => {
  // Get the access token from localStorage
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Authentication required. Please login.");
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Authentication failed. Please login again.");
    }
    throw new Error(`API request failed with status: ${response.status}`);
  }

  return response.json();
};

const initialCardItems = [
  {
    title: "Heroes",
    icon: Users,
    count: 0,
    description: "Total hero sections",
    loading: true,
    error: null,
  },
  {
    title: "Facilities",
    icon: Home,
    count: 0,
    description: "Total facilities",
    loading: true,
    error: null,
  },
  {
    title: "Activities",
    icon: Activity,
    count: 0,
    description: "Total activities",
    loading: true,
    error: null,
  },
  {
    title: "Contacts",
    icon: Phone,
    count: 0,
    description: "Total contact pages",
    loading: true,
    error: null,
  },
];

export default function Dashboard() {
  const [cardItems, setCardItems] = useState(initialCardItems);
  const [globalError, setGlobalError] = useState(null);

  useEffect(() => {
    // Function to fetch data for a specific endpoint
    const fetchData = async (index, endpoint, title) => {
      try {
        const data = await fetchWithAuth(endpoint);

        // Update the count for this card
        setCardItems((prevItems) => {
          const newItems = [...prevItems];
          newItems[index] = {
            ...newItems[index],
            count: Array.isArray(data) ? data.length : 0,
            loading: false,
            error: null,
          };
          return newItems;
        });
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);

        // Update error state for this card
        setCardItems((prevItems) => {
          const newItems = [...prevItems];
          newItems[index] = {
            ...newItems[index],
            loading: false,
            error: error.message,
          };
          return newItems;
        });

        // If it's an authentication error, set it globally
        if (error.message.includes("Authentication")) {
          setGlobalError(error.message);
        }
      }
    };

    // Fetch data for all endpoints
    fetchData(0, API_ENDPOINTS.heroes, "Heroes");
    fetchData(1, API_ENDPOINTS.facilities, "Facilities");
    fetchData(2, API_ENDPOINTS.activities, "Activities");
    fetchData(3, API_ENDPOINTS.contacts, "Contacts");
  }, []);

  return (
    <>
      <div>
        <TopBar />
      </div>

      <div className="container mx-auto px-4 sm:px-6 bg-white h-full pt-2">
        <div className="mb-6 sm:mb-8 mt-4 sm:mt-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            School Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Overview of school content and resources
          </p>
        </div>

        {/* Global Error Message */}
        {globalError && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md">
            <p className="font-medium">{globalError}</p>
            <p className="text-sm mt-1">
              Please check your authentication or try logging in again.
            </p>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {cardItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="hidden md:block">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <item.icon className="h-7 w-7 text-gray-700" />
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  {item.loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-700" />
                      <span className="text-sm text-gray-700">
                        Loading...
                      </span>
                    </div>
                  ) : item.error ? (
                    <div className="text-sm text-red-500">
                      Error loading data
                    </div>
                  ) : (
                    <>
                      <div className="text-4xl font-bold">{item.count}</div>
                      <p className="text-balance text-gray-700 mt-3">
                        {item.description}
                      </p>
                    </>
                  )}
                </CardContent>
              </div>

              {/* Mobile layout for sm and below */}
              <div className="md:hidden p-3 sm:p-4 flex flex-col items-center justify-center text-center">
                <item.icon className="h-6 w-6 mb-2 text-primary" />
                <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                {item.loading ? (
                  <div className="flex items-center space-x-2 mt-1">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Loading...
                    </span>
                  </div>
                ) : item.error ? (
                  <div className="text-xs text-red-500 mt-1">
                    Error loading data
                  </div>
                ) : (
                  <>
                    <div className="text-xl sm:text-2xl font-bold">
                      {item.count}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
