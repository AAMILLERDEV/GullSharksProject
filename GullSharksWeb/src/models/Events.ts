export interface Events {
  id: number;
  eventName: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  isDeleted: boolean;
  isRegistered?: boolean;
}
