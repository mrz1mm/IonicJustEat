import { IngredientResponse } from './IngredientResponse.interface';
import { ProductTypeResponse } from './ProductTypeResponse.interface';

export interface ProductResponse {
  productId: string;
  storeId: string;
  productName: string;
  productPrice: number;
  description?: string;
  productImg?: string;
  isActive: boolean;
  ingredients: IngredientResponse[];
  productType: ProductTypeResponse;
}
