import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAllSearches = () => {
  return useQuery({
    queryKey: ["allsearches"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:8080/users/all-searches"
      );
      return response.data.result.reverse();
    },
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchIntervalInBackground: true,
  });
};
