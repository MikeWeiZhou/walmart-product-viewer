/**
 * Category Model.
 * Matches Walmart Taxonomy API response.
 * https://developer.walmartlabs.com/docs/read/Taxonomy_API
 * 
 * Used for VS Code Intellisense.
 * JavaScript does not enforce this model.
 */
export class Category {
  // in Walmart documentation
  id: string;
  name: string;
  children?: Category[];

  // Not in Walmart documentation
  path?: string;
}