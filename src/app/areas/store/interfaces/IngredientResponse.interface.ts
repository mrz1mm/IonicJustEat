export interface IngredientResponse {
  ingredientId: string;
  storeId: string;
  ingredientName: string;
  ingredientPrice: number;
  description?: string;
  isActive: boolean;
}
