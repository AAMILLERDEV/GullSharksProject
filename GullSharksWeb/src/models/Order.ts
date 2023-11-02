export interface Order {
  id: number;
  game_ID: number;
  orderDetail_ID: number;
  user_ID: number;
  isConfirmed: boolean;
  isDeleted: boolean;
}
