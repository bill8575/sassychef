import { Component, OnInit, OnDestroy
	// EventEmitter, Output 
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
// import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

	// @Output() recipeSelectedFromList = new EventEmitter<Recipe>();
  subscription: Subscription;
	recipes: Recipe[];
	// = [
	// 	new Recipe('A Pork Chop', 'This is a continental way to make a pork chop with herbs!', 
	// 		'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
	// 	new Recipe('Yummy Meatballs', 'Meatballs with a twist.', 
	// 		'https://lilluna.com/wp-content/uploads/2018/06/Easy-Delicious-Homemade-Meatballs-RESIZE.jpg')	
	// ];

  constructor(
              // private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.subscription = this.recipeService.recipesChanged
    this.subscription = this.store
      .select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes; 
        }
      )
  	// this.recipes = this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe) {
  // 	this.recipeSelectedFromList.emit(recipe);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
