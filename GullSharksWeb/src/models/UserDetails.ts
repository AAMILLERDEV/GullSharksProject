export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  user_ID: number;
  birthDate: Date;
  receivesUpdates: boolean;
  phoneNumber: string | null;
  isDeleted: boolean;
}
