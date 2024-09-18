import { CategoryResponse } from '../../admin/interfaces/CategoryResponse.interface';
import { ProductResponse } from './ProductResponse.interface';
import { WorkingDayResponse } from './WorkingDayResponse.interface';

export interface StoreResponse {
  address: string;
  applicationUserId: string;
  cap: string;
  categories: CategoryResponse[];
  city: string;
  coverImg: string;
  description: string;
  isActive: boolean;
  latitude: string;
  logoImg: string;
  longitude: string;
  phoneNumber: string;
  products: ProductResponse[];
  storeId: string;
  storeName: string;
  storeTag: string;
  workingDays: WorkingDayResponse[];
}
