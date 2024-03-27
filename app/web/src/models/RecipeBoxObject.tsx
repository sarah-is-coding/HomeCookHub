export interface RecipeBoxObject {
  rating: number;
  title: string;
  description: string;
  image: string;
  reviewers: string;
  cookTime: number; // New property for cooking time
  prepTime: number; // New property for preparation time
  servingSize: number; // New property for the number of servings
}
