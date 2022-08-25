import Http from "utils/Http";
import { authLogin, authLogout, authRefreshToken, authUser } from 'store/actions/auth';

let API_URL = process.env.REACT_APP_ENVIRONMENT === 'development' ? process.env.REACT_APP_TEST_API_URL : process.env.REACT_APP_API_URL;

export function login(credentials) {
	return dispatch =>
		new Promise((resolve, reject) => {
			Http.post(API_URL+"/auth/login", credentials)
				.then(res => {
					dispatch(authLogin(res.data));
					return resolve(res.data);
				})
				.catch(err => {
					const statusCode = err.response.status;
					if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
						reject(err.response.data);
					}
				});
		});
}

export function logout() {
	return dispatch =>
		new Promise((resolve, reject) => {
			Http.post(API_URL+"/logout")
				.then(res => {
					dispatch(authLogout());
					return resolve(res.data);
				})
				.catch(err => {
					const statusCode = err.response.status;
					if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
						reject(err.response.data);
					}
				});
		});
}

export function refreshToken() {
	let credentials = {
		grant_type: "refresh_token",
		refresh_token: localStorage.getItem('refresh_token')
	}
	return dispatch =>
		new Promise((resolve, reject) => {
			Http.post(API_URL+"/auth/refreshToken", credentials)
				.then(res => {
					dispatch(authRefreshToken(res.data));
					return resolve(res.data);
				})
				.catch(err => {
					const statusCode = err.response.status;
					if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
						reject(err.response.data);
					}
				});
		});
}

//註冊--------------------------------------------------------------------------------------------
export function registerSubmit(credentials) {
	return new Promise((resolve, reject) => {
		Http.post(API_URL + "/auth/register", credentials)
			.then(response => {
				return resolve(response.data);
			})
			.catch(err => {
				const statusCode = err.response.status;
				if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
					reject(err.response.data);
				}
			});
			console.clear();
	});
}

export function fetchUser() {
	return dispatch =>
		new Promise((resolve, reject) => {
			Http.get(API_URL+"/me")
				.then(res => {
					dispatch(authUser(res.data));
					return resolve();
				})
				.catch(err => {
					const statusCode = err.response.status;
					if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
						reject(err);
					}
				});
		});
}

//修改密碼、Password----------------------------------------------------------------------------------
export function updatePassword(credentials) {
	return new Promise((resolve, reject) => {
		Http.put(API_URL+"/user/password", credentials)
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				const statusCode = err.response.status;
				if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
					reject(err.response.data);
				}
			});
	});
}
//-----------------------------------------------------------------------------------------