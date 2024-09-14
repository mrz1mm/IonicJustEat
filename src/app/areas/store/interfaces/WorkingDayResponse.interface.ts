import { WorkingHourResponse } from './WorkingHourResponse.interface';

export interface WorkingDayResponse {
  order: number;
  storeId: number;
  weekDayCode: number;
  weekDayName: string;
  workingHours: WorkingHourResponse[];
}
