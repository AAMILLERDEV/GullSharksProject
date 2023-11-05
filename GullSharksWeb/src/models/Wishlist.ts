import { Game } from "./Game";

export interface Wishlist {
  id: number;
  game_ID: number;
  user_ID: number;
  isDeleted: boolean;
  dateAdded: Date;
  quantity: number;
  game: Game;
}
