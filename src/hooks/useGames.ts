import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform{
    id: number;
    name: string;
    slug: string;
}
export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[] //object with property platform with type Platform
    metacritic: number;
}
  // Shape of response object -> find from the API documentation
interface FetchGamesResponse {
    count: number;
    results: Game[];
}
  
const useGames = () => {
    const [games, setGames] = useState<Game[]>([]); // Storing game object
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
  
    // Fetch request to the backend
    useEffect(() => {

        const controller = new AbortController();
        setIsLoading(true)
      apiClient
        .get<FetchGamesResponse>("/games", {signal: controller.signal})
          .then((res) =>{
              setGames(res.data.results)
          setIsLoading(false)}
          )
          .catch((err) => {if (err instanceof CanceledError) return
              setError(err.message)
              setIsLoading(false)
          }
          );
        
        return () => controller.abort(); //cleanup function 
    }, []); // Empty dependency array to run once

    return {games, error, isLoading}
}

export default useGames