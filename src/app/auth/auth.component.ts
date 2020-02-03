import { Component, 
  ComponentFactoryResolver, 
  ViewChild,
  OnInit,
  OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
import { 
  // Observable, 
  Subscription } from 'rxjs';
import { Store } from '@ngrx/store';  

// import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
    // private authService: AuthService, 
    // private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(f: NgForm) {
    // console.log(f.value);
    if (!f.valid) {
      return;
    }
    const email = f.value.email;
    const password = f.value.password;
    this.error = null;

    // let authObs: Observable<AuthResponseData>

    // this.isLoading = true;
    if (this.isLoginMode) {
      // authObs =  this.authService.logIn(email, password);
      this.store.dispatch(
        new authActions.LoginStart({email: email, password: password})
      );
    } else {
      // authObs = this.authService.signUp(email, password);
      this.store.dispatch(
        new authActions.SignupStart({email: email, password: password})
      );
    }

    // authObs.subscribe(resData => {
    //      // console.log(resData);
    //      this.isLoading = false;
    //      this.router.navigate(['/recipes']);
    //    },
    //    errorMessage => {
    //      console.log(errorMessage);
    //      this.error = errorMessage;
    //      this.showErrorAlert(errorMessage);
    //      this.isLoading = false;
    //    });

    f.reset();
  }

  onHandleAlert() {
    // this.error = null;
    this.store.dispatch(new authActions.ClearError());
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }

    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private showErrorAlert(msg: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    // Clear anything before rendering something new in place
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = msg;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }
}