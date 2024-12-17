import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useLogin = ()=>{

  return ({
    queryKey: ["searchList"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:8080/users/recent-search",
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
};

