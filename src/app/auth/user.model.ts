export class User {
	constructor(
		public email: string, 
		public id: string, 
		private _token: string,
		private _tokenExpirationDate: Date
	) {}

	// use it like regUser.token ... 
	get token() {
		if (!this._tokenExpirationDate || 
			new Date() > this._tokenExpirationDate) {
			return null;
		}
		return this._token;
	}
}