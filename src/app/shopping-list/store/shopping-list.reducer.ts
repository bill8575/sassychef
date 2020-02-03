// import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
// import { ADD_INGREDIENT, AddIngredient } from './shopping-list.actions';
import * as ShoppingListActions from './shopping-list.actions';

export interface SlState {
	ingredients: Ingredient[];
	editedIngredient: Ingredient;
	editedIngredientIdx: number;
}

// export interface AppState {
// 	shoppingList: SlState;
// }

const initState: SlState = {
	ingredients: [
		new Ingredient('Apples', 5),
		new Ingredient('Pork chop', 6),
		new Ingredient('Onion', 12)
	],
	editedIngredient: null,
	editedIngredientIdx: -1
};

export function shoppingListReducer(
	state: SlState = initState, 
	action: ShoppingListActions.ShoppingListActionsType
	) 
{
	switch (action.type) {
		case ShoppingListActions.ADD_INGREDIENT: 
			return { 
				// Copy the existing state				
				...state,
				ingredients: [...state.ingredients, action.payload]
			};
		case ShoppingListActions.ADD_INGREDIENTS: 
			return { 
				// ... means elements of
				...state,
				ingredients: [...state.ingredients, ...action.payload],
				editedIngredientIdx: -1,
				editedIngredient: null				
			};
		case ShoppingListActions.UPDATE_INGREDIENT:
			const ingredient = state.ingredients[state.editedIngredientIdx];
			const updatedIngredient = {
				...ingredient,
				...action.payload
			};
			const updatedIngredients = [...state.ingredients];
			updatedIngredients[state.editedIngredientIdx] = updatedIngredient;
			return {
				...state,
				ingredients: updatedIngredients,
				editedIngredientIdx: -1,
				editedIngredient: null
			};
		case ShoppingListActions.DELETE_INGREDIENT:
			return {
				...state,
				ingredients: state.ingredients.filter((ig, igIndex) => {
					return igIndex !== state.editedIngredientIdx;
				}),
				editedIngredientIdx: -1,
				editedIngredient: null
			};
			case ShoppingListActions.START_SL_EDIT:
				return {
					...state,
					editedIngredientIdx: action.payload,
					editedIngredient: { ...state.ingredients[action.payload] }
				};
			case ShoppingListActions.STOP_SL_EDIT:
				return {
					...state,
					editedIngredient: null,
					editedIngredientIndex: -1
				};				
		default:
			return state;
	}	
}