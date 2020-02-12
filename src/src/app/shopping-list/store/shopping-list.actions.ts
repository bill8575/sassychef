import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_SL_EDIT = '[Shopping List] Start Edit';
export const STOP_SL_EDIT = '[Shopping List] Stop Edit';

export class AddIngredient implements Action {
	readonly type = ADD_INGREDIENT;
	// payload: Ingredient;

	constructor(public payload: Ingredient) {}
}
 
export class AddIngredients implements Action {
	readonly type = ADD_INGREDIENTS;

	constructor(public payload: Ingredient[]) {}
} 

export class UpdateIngredient implements Action {
	readonly type = UPDATE_INGREDIENT;

	// constructor(public payload: {index: number, ingredient: Ingredient}) {}
	constructor(public payload: Ingredient) {}
} 

export class DeleteIngredient implements Action {
	readonly type = DELETE_INGREDIENT;

	// constructor(public payload: number) {}
} 

export class StartSlEdit implements Action {
	readonly type = START_SL_EDIT;

	// payload stores the index tp which ingredient is 
	//   being edited
	constructor(public payload: number) {}
}

export class StopSlEdit implements Action {
	readonly type = STOP_SL_EDIT;
}

// TypeScript feature, creating a super type via Unions
export type ShoppingListActionsType = 
| AddIngredient 
| AddIngredients 
| UpdateIngredient
| DeleteIngredient
| StartSlEdit
| StopSlEdit;

