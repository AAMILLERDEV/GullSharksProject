export interface ShippingAddress {
  id: number;
  user_ID: number;
  city: string;
  country_ID: number;
  deliveryInstructions: string;
  province_ID: number;
  postalCode: string;
  streetAddress: string;
  isDeleted: boolean;
}
