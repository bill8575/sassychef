import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import * as ShoppingListActions from './store/shopping-list.actions';
// import * as fromShoppingList from './store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	// ingredients: Ingredient[] = [
	// 	new Ingredient('Apples', 5),
	// 	new Ingredient('Pork chop', 6),
	// 	new Ingredient('Onion', 12)
	// ];
  // ingredients: Ingredient[];
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private igChangeSub: Subscription;

  constructor(
    // private slService: ShoppingListService,
    private loggingService: LoggingService,
    // private store: Store<fromShoppingList.AppState>    
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // // Before it was subscribing to EventEmitter, has been 
    // //   changed to Subject
    // this.igChangeSub = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
    
    this.loggingService.printlog('Hello from ShoppinglistComponent!');
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  // }

  onEditItem(index: number) {
    // this.slService.startEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartSlEdit(index)); 
  }

  // ngOnDestroy(): void {
  //   // this.igChangeSub.unsubscribe();
  // }
}
