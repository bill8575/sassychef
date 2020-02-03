import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';

// import { LoggingService } from '../logging.service';

@NgModule({
	declarations: [
		ShoppingListComponent,
		ShoppingEditComponent,	
	],
  imports: [
    // CommonModule,
    FormsModule,
  	RouterModule.forChild([
        // { path: 'shopping-list', component: ShoppingListComponent }      
        { path: '', component: ShoppingListComponent }
      ]),
    SharedModule
  ],
  providers: [
    // LoggingService
  ]	
}) 
export class ShoppingListModule {}