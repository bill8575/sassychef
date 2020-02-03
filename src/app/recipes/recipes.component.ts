import { Component, OnInit } from '@angular/core';

// import { FormsModule } from '@angular/forms'; 

// import { Recipe } from './recipe.model';
// import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  // providers: [RecipeService]
})

// export class RecipesComponent implements OnInit {
export class RecipesComponent {
  // selectedRecipe: Recipe; 

  // constructor(private recipeService: RecipeService) { }
  constructor() { }  

  // ngOnInit() {
  // 	this.recipeService.recipeSelected.subscribe(
  // 		(recipe: Recipe) => {
  // 			this.selectedRecipe = recipe;
  // 		})
  // 	;
  // }

}
