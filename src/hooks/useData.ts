import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface FetchRespons<T>{
    count: number;
    results: T[];

}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, depds?: any[]) => { 
    const [data, setData] = useState<T[]>([]); // Storing game object
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
  
    // Fetch request to the backend
    useEffect(() => {

        const controller = new AbortController();
        setIsLoading(true)
        
      apiClient
        .get<FetchRespons<T>>(endpoint, {signal: controller.signal, ...requestConfig})
          .then((res) =>{
              setData(res.data.results)
          setIsLoading(false)}
          )
          .catch((err) => {if (err instanceof CanceledError) return
              setError(err.message)
              setIsLoading(false)
          }
          );
        
        return () => controller.abort(); //cleanup function 
    }, depds? [...depds]: []); // Empty dependency array to run once

    return {data, error, isLoading}
}

export default useData