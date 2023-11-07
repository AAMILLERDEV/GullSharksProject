export interface Ratings {
  id: number;
  user_ID: number;
  game_ID: number;
  ratingNumber: number;
  isDeleted: boolean;
  game_rating?: number;
}
