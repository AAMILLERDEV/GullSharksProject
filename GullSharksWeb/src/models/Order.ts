import { OrderDetail } from "./OrderDetail";
import { PaymentDetail } from "./PaymentDetail";
import { ShippingAddress } from "./ShippingAddress";

export interface Order {
  id: number;
  game_ID: number;
  orderDetail_ID: number;
  user_ID: number;
  isConfirmed: boolean;
  isDeleted: boolean;
  paymentDetails?: PaymentDetail,
  orderDetails?: OrderDetail,
  shippingAddress?: ShippingAddress
  orderName?: string;
}
