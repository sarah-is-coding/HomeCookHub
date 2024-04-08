export interface RecipeBoxObject {
  rating: number;
  title: string;
  description: string;
  image: string;
  reviewers: string;
  cook_time: number; // New property for cooking time
  prep_time: number; // New property for preparation time
  serving_size: number; // New property for the number of servings
  day?: string | Date;
  recipeID: string;
}
