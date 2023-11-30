export interface EventRegistry {
  id: number;
  user_ID: number;
  event_ID: number;
  dateAdded: Date | string;
  isDeleted: boolean;
}
