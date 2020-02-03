import { 
	// EventEmitter, 
	Injectable 
} from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
// import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
	// recipeSelected = new EventEmitter<Recipe>();
	// recipeSelected = new Subject<Recipe>();
	recipesChanged = new Subject<Recipe[]>();

	// private recipes: Recipe[] = [
	// 	new Recipe('Tasty Pork Chop', 
	// 		'This is a continental way to make a pork chop with herbs!', 
	// 		'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
	// 		[
	// 			new Ingredient('Meat', 1),
	// 			new Ingredient('Apple sause', 2)
	// 		]
	// 		),
	// 	new Recipe('Yummy Meatballs', 
	// 		'Meatballs with a twist.', 
	// 		'https://www.maxpixel.net/static/photo/1x/Pan-Fat-Meatballs-Coleslaw-Minced-Meat-1994807.jpg',
	// 		[
	// 			new Ingredient('Ground beef', 3),
	// 			new Ingredient('Chives', 1),
	// 			new Ingredient('Cheese', 2)	
	// 		])	
	// ];

	private recipes: Recipe[] = [];

	constructor(
		// private slService: ShoppingListService,
		// private store: Store<fromShoppingList.AppState>) {}
		private store: Store<fromApp.AppState>) {}

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}

	getRecipes() {
	// "slice" - Get a copy, cannot access the actual list from outside		
		return this.recipes.slice();
	}

	getRecipe(idx: number) {
		return this.recipes[idx];
	}
	
	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		// this.slService.addIngredients(ingredients);
		this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	}

	updateRecipe(index: number, newRecipe: Recipe) { 
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(this.recipes.slice());
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice());
	}
}