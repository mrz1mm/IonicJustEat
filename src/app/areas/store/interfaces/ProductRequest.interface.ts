export interface ProductRequest {
  StoreId: string;
  ProductTypeId: string;
  ProductName: string;
  ProductPrice: number;
  ProductDescription?: string;
  ProductImg?: string;
}
