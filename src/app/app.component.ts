import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  styles: [`
  	h3 {
  		color: dodgerblue;
  	}
  `]
})
export class AppComponent implements OnInit {
	// collapsed = true;
	// loadedFeature = 'recipe';

	// onNavigate(feature: string) {
	// 	this.loadedFeature = feature;
	// }

  constructor(
    // private authService: AuthService,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService) {}

  ngOnInit() {
    // this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printlog('Hello from AppComponent!');
  }
}
