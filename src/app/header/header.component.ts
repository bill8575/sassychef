import { Component, 
  OnInit,
  OnDestroy
  // EventEmitter, 
  // Output 
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
// import { DropdownDirective } from '../shared/dropdown.directive';
import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  //styleUrls: ['./app.component.css']
  // styles: [`
  // 	h3 {
  // 		color: dodgerblue;
  // 	}
  // `]
})

export class HeaderComponent implements OnInit, OnDestroy {

	// @Output() featureSelected = new EventEmitter<string>();

	// onSelect(feature: string) {
	// 	this.featureSelected.emit(feature);
	// }
  recipe: Recipe;
  id: number;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageSvc: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    // this.userSub = this.authService.user
    this.userSub = this.store.select('auth')
      .pipe(map(authState => {
        return authState.user;
      })) 
      .subscribe(usr => {
        this.isAuthenticated = !!usr;
        console.log(usr);
        console.log(!usr);
        console.log(!!usr);
      });
  }

  onSaveData() {
    // this.dataStorageSvc.storeRecipes();
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.dataStorageSvc.loadRecipes().subscribe();
    // this.store.dispatch(new RecipeActions.FetchRecipes());
    this.router.navigate([''], {relativeTo: this.route});
    // console.log('Hey man!!');

  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }
  
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}  
