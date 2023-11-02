export interface CartItem {
  id: number;
  game_ID: number;
  quantity: number;
  subtotal: number;
  total: number;
  user_ID: number;
  isDeleted: boolean;
}
