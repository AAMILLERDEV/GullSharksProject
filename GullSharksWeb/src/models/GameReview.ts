export interface GameReview {
  id: number;
  user_ID: number;
  game_ID: number;
  isApproved: boolean;
  description: string;
  rating_ID: number;
  review_name: string;
  isDeleted: boolean;
  dateAdded: Date;
}
