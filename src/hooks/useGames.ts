import { GameQuery } from "../App";
import useData from "./useData";
import { Genre } from "./useGenre";

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
  
const useGames = (gameQuery: GameQuery) =>
    useData<Game>('/games', {
        params: {
            genres: gameQuery.genre?.id,
            platforms: gameQuery.platform?.id
        }
    }, [gameQuery])

export default useGames