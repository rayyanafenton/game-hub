import { GameQuery } from "../App";
import useData from "./useData";

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
    rating_top: number;
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
            platforms: gameQuery.platform?.id,
            ordering: gameQuery.sortOrder,
            search: gameQuery.searchText,
        }
    }, [gameQuery])

export default useGames