export interface ShippingAddress {
  id: number;
  userDetails_id: number;
  city: string;
  country_id: number;
  deliveryInstructions: string;
  province_id: number;
  postalCode: string;
  streetAddress: string;
}