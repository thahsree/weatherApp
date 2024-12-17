import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { useFetchLocation } from "./useFetchLocation";

export const useWeatherSearch = () => {
  const { data: currentPlace } = useFetchLocation();
  const queryClient = useQueryClient();

  const locationResponse = queryClient.getQueryData<string>(["location"]);
  const access_key = import.meta.env.VITE_WEATHER_ACCESS_KEY;

  const queryLocation = locationResponse || currentPlace;

  const previousQueryLocation = useRef<string | null>(null);

  // Query for fetching weather data
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ["weather", queryLocation],
    queryFn: async () => {
      if (!queryLocation) return;

      const response = await axios.get(
        `https://api.weatherstack.com/current?access_key=${access_key}&query=${queryLocation}`
      );

      if (response.data.success === false) {
        if (response.data.error.code === 104) {
          alert(response.data.error.info);
        } else {
          alert("Please enter a valid location");
        }
        return [];
      }
      const isuser = localStorage.getItem("user");
      if (isuser) {
        // Post recent search if user logged in;
        try {
          await axios.post(
            `http://localhost:8080/users/recent-search`,
            { query: queryLocation },
            { withCredentials: true }
          );
        } catch (error) {
          console.log(error);
          alert("Internal server error");
        }
      }

      return response.data;
    },
    refetchOnWindowFocus: false, // Prevent refetching when the window is focused
    enabled: !!queryLocation && queryLocation !== previousQueryLocation, // Only run query when queryLocation exists and !== previous location
    refetchOnMount: false, // Prevent refetching on component remount
  });

  if (queryLocation) {
    previousQueryLocation.current = queryLocation;
  }

  return { data, isError, error, isLoading, refetch };
};
