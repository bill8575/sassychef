import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { tap, catchError } from 'rxjs/operators';
// import { throwError, 
// 	// Subject, 
// 	BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import { environment } from '../../environments/environment';	
import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

/*
	kind(string) ????
  idToken(string)				A Firebase Auth ID token for the newly created user.
  email(string)					The email for the newly created user.
  refreshToken(string)	A Firebase Auth refresh token for the newly created user.
	expiresIn(string)			The number of seconds in which the ID token expires.
	localId(string)				The uid of the newly created user.
*/

// export interface AuthResponseData {
// 	kind: string;
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string; 
//   registered?: boolean;
// }
@Injectable({providedIn: 'root'})
export class AuthService {

	// user = new Subject<User>();	
	// user = new BehaviorSubject<User>(null);
	private tokenExpirationTimer: any;

	constructor(
		// private http: HttpClient, 
		// private router: Router,
		private store: Store<fromApp.AppState>) { }

	// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
	// this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]')
	// 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsY_Tk097yfgB3v58fA2IspXbJ4Ft18ek',			
	// signUp(email: string, password: string){
	// 	return this.http.post<AuthResponseData>(
	// 		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fbKey,
	// 		{
	// 			email: email,
	// 			password: password,
	// 			returnSecureToken: true
	// 		}
	// 	)
	// 	.pipe(
	// 		catchError(this.handleError),
	// 		tap(respData => {
				// const expireationDate = new Date(new Date().getTime() + +respData.expiresIn*1000);
				// const user = new User(respData.email, 
				// 	respData.localId,
				// 	respData.idToken,															
				// 	expireationDate
				// );
				// this.user.next(user);
				// '+' is to convert string to number.				
	// 			this.handleAuthentication(respData.email,
	// 				respData.localId,
	// 				respData.idToken,
	// 				+respData.expiresIn
	// 			);	
	// 		})
	// 	);	
	// }

	// 'https://identitytoolkit.googleapis.com/identitytoolkit/v3/replyingparty/verifyPassword?key=AIzaSyDsY_Tk097yfgB3v58fA2IspXbJ4Ft18ek',
	// 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDsY_Tk097yfgB3v58fA2IspXbJ4Ft18ek', 	
	// logIn(email: string, password: string) {
	// 	return this.http
	// 		.post<AuthResponseData>(
	// 			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + 
	// 				environment.fbKey, 
	// 			{
	// 				email: email,
	// 				password: password,
	// 				returnSecureToken: true
	// 			}
	// 		)
	// 		.pipe(
	// 			catchError(this.handleError),
	// 			tap(respData => {
					// const expireationDate = new Date(new Date().getTime() + +respData.expiresIn*1000);
					// const user = new User(respData.email, 
					// 	respData.localId,
					// 	respData.idToken,															
					// 	expireationDate
					// );
					// this.user.next(user);
					// '+' is to convert string to number.				
		// 			this.handleAuthentication(respData.email,
		// 				respData.localId,
		// 				respData.idToken,
		// 				+respData.expiresIn);
		// 		})
		// 	);	
		// }

	// autoLogin() {
	// 	const userData: {
	// 		email: string;
	// 		id: string;
	// 		_token: string;
	// 		_tokenExpirationDate: string;
	// 	} = JSON.parse(localStorage.getItem('userData'));
	// 	if (!userData) {
	// 		return;
	// 	}

	// 	const loadedUser = new User(userData.email, 
	// 		userData.id, 
	// 		userData._token,
	// 		new Date(userData._tokenExpirationDate)
	// 	);

		// Use the token getter to check ... 
		// if (loadedUser.token) {
			// this.user.next(loadedUser);
			// this.store.dispatch(new AuthActions.AuthenticateSuccess({
			// 	email: loadedUser.email,
			// 	userId: loadedUser.id,
			// 	token: loadedUser.token,
			// 	expirationDate: new Date(userData._tokenExpirationDate)
			// 	})
			// );
			// Future expirationDate (in millisecond) MINUS
			// 		current date (converted to ms) provides the 
			//    expiration in milliseconds 
	// 		const expirationDuration = new 
	// 			Date(userData._tokenExpirationDate).getTime() - 
	// 			new Date().getTime();
	// 		this.autoLogout(expirationDuration);
	// 	}
	// }

	// logout() {
	// 	// this.user.next(null);
	// 	this.store.dispatch(new AuthActions.Logout());
	// 	// Navigate now is handled in the Effects
	// 	// this.router.navigate(['/auth']);
	// 	localStorage.removeItem('userData');
	// 	if (this.tokenExpirationTimer) {
	// 		clearTimeout(this.tokenExpirationTimer);
	// 	}
	// 	this.tokenExpirationTimer = null;
	// }

	// autoLogout should be called whenever a new user 
	//		Subject was emitted to the applcation
	// autoLogout(expirationDuration: number) {
	setLogoutTimer(expirationDuration: number) {		
		console.log(expirationDuration);
		this.tokenExpirationTimer = setTimeout(() => {
			// this.logout();
			this.store.dispatch(new AuthActions.Logout());
		}, expirationDuration);
		// }, 2000);		 
	}

	clearLogoutTimer() {
		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
			this.tokenExpirationTimer = null;
		}
	}

	// private handleAuthentication(
	// 	email: string, 
	// 	userId: string, 
	// 	token: string, 
	// 	expiredIn: number) {
	// 	// times 1000 converting seconds to ms. 
	// 	const expireationDate = new Date(new Date().getTime() + expiredIn*1000);
	// 	const user = new User(email, 
	// 		userId,
	// 		token,															
	// 		expireationDate
	// 	);
	// 	// this.user.next(user);
	// 	this.store.dispatch(
	// 		new AuthActions.AuthenticateSuccess({
	// 			email: email,
	// 			userId: userId,
	// 			token: token,
	// 			expirationDate: expireationDate			
	// 		})
	// 	);

	// 	// Store into localstorage ... 
	// 	this.autoLogout(expiredIn*1000);
	// 	localStorage.setItem('userData', JSON.stringify(user));
	// }

	// private handleError(errorRes: HttpErrorResponse) {
	// 	let errorMessage = 'An unknown error occurred!';
	// 	if (!errorRes.error || !errorRes.error.error) {
	// 		return throwError(errorMessage);
	// 	}
	// 	switch (errorRes.error.error.message) {
	// 		case 'EMAIL_EXISTS':
	// 			errorMessage = 'This email exists already!';
	// 			break;
	// 		case 'EMAIL_NOT_FOUND':
	// 			errorMessage = 'This email does not exist!';
	// 			break;
	// 		case 'INVALID_PASSWORD':
	// 			errorMessage = 'Password was invalid!';
	// 			break;				
	// 	}												 
	// 	return throwError(errorMessage);		
	// }
}