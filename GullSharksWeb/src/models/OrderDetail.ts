export interface OrderDetail {
  id: number;
  quantity: number;
  subtotal: number;
  total: number;
  useShippingAddress: boolean;
  dateCreated: Date;
  isDeleted: boolean;
}
