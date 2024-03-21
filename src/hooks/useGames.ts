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
  
    // Fetch request to the backend
    useEffect(() => {

        const controller = new AbortController();

      apiClient
        .get<FetchGamesResponse>("/games", {signal: controller.signal})
        .then((res) => setGames(res.data.results))
          .catch((err) => {if (err instanceof CanceledError) return
              setError(err.message)});
        
        return () => controller.abort(); //cleanup function 
    }, []); // Empty dependency array to run once

    return {games, error}
}

export default useGames