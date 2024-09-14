import { CategoryResponse } from 'src/app/areas/admin/interfaces/CategoryResponse.interface';
import { ProductResponse } from 'src/app/areas/store/interfaces/ProductResponse.interface';
import { WorkingDayResponse } from 'src/app/areas/store/interfaces/WorkingDayResponse.interface';

export interface IStoreWithDistance {
  address: string;
  applicationUserId: string;
  cap: string;
  categories: CategoryResponse[];
  city: string;
  coverImg?: string;
  description?: string;
  isActive: boolean;
  latitude: string;
  logoImg?: string;
  longitude: string;
  phoneNumber: string;
  products?: ProductResponse[];
  storeId: string;
  storeName: string;
  storeTag?: string;
  workingDays: WorkingDayResponse[];
  Distance: number;
}
