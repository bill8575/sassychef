import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { DropdownDirective } from '../shared/dropdown.directive';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [
		// DropdownDirective,
		RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,    
	],
  imports: [
  	// RouterModule.forChild(recipesRoutes),
  	RouterModule,  	
 		SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ],	
	exports: [
		// DropdownDirective
	// 	RecipesComponent,
 //    RecipeListComponent,
 //    RecipeDetailComponent,
 //    RecipeItemComponent,
 //    RecipeStartComponent,
 //    RecipeEditComponent, 	
	],
})
export class RecipesModule {}