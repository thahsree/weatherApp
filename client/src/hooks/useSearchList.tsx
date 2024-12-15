import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSearchList = ()=>{

    return useQuery({
        queryKey:["searchList"],
        queryFn: async()=>{

            const response = await axios.get('http://localhost:8080/users/recent-search',{
                withCredentials:true
            });
            return response.data;
        }
    })
}