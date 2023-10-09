export interface GameReview {
  id: number;
  user_id: number;
  game_id: number;
  isApproved: number;
  description: string;
  rating_id: number;
  review_name: string;
}
