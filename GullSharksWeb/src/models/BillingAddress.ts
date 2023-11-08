export interface BillingAddress {
  id: number;
  user_ID: number;
  city: string;
  country_ID: number;
  deliveryInstructions: string;
  province_ID: number;
  postalCode: string;
  streetAddress: string;
  matchShipping: boolean;
  isDeleted: boolean;
}
