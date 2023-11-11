import { User } from "./User";
import { UserDetails } from "./UserDetails";

export interface FriendsList {
  id: number;
  user_ID: number;
  friend_ID: number;
  isConfirmed: boolean;
  isDeleted: boolean;
  dateAdded: Date;
  user?: User;
  userDetails?: UserDetails;
}
