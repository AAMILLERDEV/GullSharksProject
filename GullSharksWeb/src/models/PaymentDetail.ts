export interface PaymentDetail {
  id: number;
  order_ID: number;
  cardType_ID: number;
  cardNumber: number;
  securityCode: number;
  user_ID: number;
  total: number;
  isDeleted: boolean;

}
