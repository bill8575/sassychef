import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({providedIn: 'root'})
export class DataStorageService {
	constructor(private http: HttpClient, 
		private recipeService: RecipeService, 
		// private authService: AuthService
		private store: Store<fromApp.AppState>
	) {}

	storeRecipes() {
		const recipes = this.recipeService.getRecipes();
		// Post() if one recipe storing, Firebase provides this
		//	 put() service to override all stored recipes. 
		// console.log(recipes);
		this.http.put(
			'https://sassychef-b1ce4.firebaseio.com/sassyRecipes.json', 
			recipes
		).subscribe(response => {
			// console.log(response);
		});
	}

	loadRecipes() {
		// take(1) value from 'user' and after that immediately
		//   unsubscribe(), not an ongoing subscription
		return this.http.get<Recipe[]>(
				'https://sassychef-b1ce4.firebaseio.com/sassyRecipes.json',
			)
			.pipe(
				map(recipes => {
				return recipes.map(recipe => {
					return {
						...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
						};
					});
				}),
				tap(recipes => {
					// this.recipeService.setRecipes(recipes);
					this.store.dispatch(new RecipesActions.SetRecipes(recipes));
				})
			);
	}
}
