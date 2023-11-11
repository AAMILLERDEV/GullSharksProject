import { Game } from "./Game";

export interface UserGame {
    id: number;
    user_ID: number;
    game_ID: number;
    isDeleted: boolean;
    game?: Game;
}
