// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

import { RecipeService } from '../recipes/recipe.service';

export class ShoppingListService {
	// ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();

	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Pork chop', 6),
		new Ingredient('Onion', 12)
	];
	
	getIngredients() {
		// return this.ingredients;		
		return this.ingredients.slice();
	}

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());    
  }	

  addIngredients(ingredients: Ingredient[]) {
  	// for (let ig of ingredients) {
  	// 	this.addIngredient(ig);
  	// }
  	// ES6 features http://es6-features.org, ... is array to list 
  	//   conversion
  	this.ingredients.push(...ingredients);
  	// this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());    
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());    
  }
} 