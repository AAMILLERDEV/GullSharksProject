export interface PaymentDetail {
  id: number;
  order_ID: number;
  cardType_ID: number;
  cardNumber: string;
  securityCode: number;
  user_ID: number;
  total: number;
  isDeleted: boolean;

}
