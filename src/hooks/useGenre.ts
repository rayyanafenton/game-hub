import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre{
    id: number;
    name: string;
}

interface FetchGenresRespons{
    count: number;
    results: Genre[];

}

const useGenres = () => { 
    const [genres, setGenres] = useState<Genre[]>([]); // Storing game object
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
  
    // Fetch request to the backend
    useEffect(() => {

        const controller = new AbortController();
        setIsLoading(true)
        
      apiClient
        .get<FetchGenresRespons>("/genres", {signal: controller.signal})
          .then((res) =>{
              setGenres(res.data.results)
          setIsLoading(false)}
          )
          .catch((err) => {if (err instanceof CanceledError) return
              setError(err.message)
              setIsLoading(false)
          }
          );
        
        return () => controller.abort(); //cleanup function 
    }, []); // Empty dependency array to run once

    return {genres, error, isLoading}
}

export default useGenres