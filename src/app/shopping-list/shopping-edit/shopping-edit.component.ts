import { Component, 
  OnInit, 
  OnDestroy,
	// ElementRef, 
  ViewChild, 
	// EventEmitter, Output 
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
// import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
// import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false; 
  // editedItemIndex: number; 
  editedItem: Ingredient;

	// @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
	// @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

	// @Output() ingredientAdded = new EventEmitter<{name: string, amount: number}>();

  constructor(
    // private slService: ShoppingListService, 
    // private store: Store<fromShoppingList.AppState>) { }
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // console.log('heyhey!');
    this.subscription = this.store.select('shoppingList')
      .subscribe(stateData => {
        if (stateData.editedIngredientIdx > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          // this.editedItemIndex = stateData.editedIngredientIdx;          
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  // onAddItem(form: NgForm) {
  onSubmit(form: NgForm) {
  	// const ingName = this.nameInputRef.nativeElement.value;
  	// const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
  	const newIngredient = new Ingredient(value.name, value.amount);
  	// this.ingredientAdded.emit(newIngredient);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
       //  new ShoppingListActions.UpdateIngredient({
       //    index: this.editedItemIndex, 
       //    ingredient: newIngredient
       // }))
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    form.reset();
    this.editMode = false;
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopSlEdit());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    // this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.store.dispatch(new ShoppingListActions.DeleteIngredient);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopSlEdit());    
  }
}
