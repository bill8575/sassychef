import { NgModule } from '@angular/core';
import { Routes, 
	RouterModule, 
	PreloadAllModules } from '@angular/router';

// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { ServerResolver } from './servers/server/server-resolver.service';
// import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
// import { DropdownDirective } from './shared/dropdown.directive';
// import { ShoppingListService } from './shopping-list/shopping-list.service';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipeResolverService } from './recipes/recipe-resolver.service';
// import { AuthComponent } from './auth/auth.component';
// import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // Lazy-loading the 'recipes' component 
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
  // { path: 'shopping-list', component: ShoppingListComponent },    
  // { path: 'not-found', component: PageNotFoundComponent },   
  // { path: '**', redirectTo: '/not-found' }
  // { path: 'auth', component: AuthComponent }
];

@NgModule({
	imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}) 
	],
	exports: [RouterModule]
})
export class AppRoutingModule {

}