/**
 * Walmart Category model. (matches Taxonomy API response object)
 * 
 * Used for VS Code Intellisense.
 * JavaScript does not enforce this model.
 */
export class Category {
  id: number;
  name: string;
  path: string;

  children?: Category[];
}