import { Injectable } from '@angular/core';
import { Resolve, 
	ActivatedRouteSnapshot, 
	RouterStateSnapshot,
	Router,
	ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import * as frmApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

	constructor(
		private store: Store<frmApp.AppState>,
		private actions$: Actions, 
		// private dataStorageService: DataStorageService, 
		private recipeService: RecipeService,
		private router: Router,
    private route: ActivatedRoute) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		// const recipes = this.recipeService.getRecipes();

		// if (recipes.length === 0 ) {
		// 	return this.dataStorageService.loadRecipes();								
		// } else {
		// 	return recipes;
		// }
		return this.store.select('recipes').pipe(
			take(1),
			map(recipeState => {
			return recipeState.recipes;
		}),
		switchMap(recipes => {
			if (recipes.length === 0 ) {
				this.store.dispatch(new RecipesActions.FetchRecipes());
				// Wait for the recipes getting set
				return this.actions$.pipe(
					ofType(RecipesActions.SET_RECIPES),
					take(1)
				);
			} else {
				return of(recipes);
			}
		}));

 	}
}