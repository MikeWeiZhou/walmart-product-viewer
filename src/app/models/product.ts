/**
 * Product model.
 * Matches Walmart Paginated Products API response.
 * https://developer.walmartlabs.com/docs/read/Paginated_Products_API
 * 
 * Used for VS Code Intellisense.
 * JavaScript does not enforce this model.
 */
export class Product {
  // All these attributes are observed, but not in Walmart documentation
  itemId: number;
  name: string;
  mediumImage: string;
  salePrice: number;
  largeImage?: string;
}