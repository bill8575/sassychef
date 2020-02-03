import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';
import * as frmApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {

	@Effect()
	fetchRecipes = this.actions$.pipe(
		ofType(RecipesActions.FETCH_RECIPES),
		switchMap(() => {
			return this.http.get<Recipe[]>(
					'https://sassychef-b1ce4.firebaseio.com/sassyRecipes.json'
			);
		}),
		map(recipes => {
			return recipes.map(recipe => {
				return {
					...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
				};
			});
		}),
		map(recipes => {
			return new RecipesActions.SetRecipes(recipes);
		})
	);

	@Effect({dispatch: false})
	storeRecipes = this.actions$.pipe(
		ofType(RecipesActions.STORE_RECIPES),
		withLatestFrom(this.store.select('recipes')),
		switchMap(([actionData, recipesState]) => {
 			return this.http.put(
				'https://sassychef-b1ce4.firebaseio.com/sassyRecipes.json', 
				recipesState.recipes
			);
		})
	);

	constructor(private actions$: Actions,
		private http: HttpClient,
		private store: Store<frmApp.AppState>) {
	}
}