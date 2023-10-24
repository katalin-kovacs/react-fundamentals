import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

export const userLogin = (userData) => ({
	type: USER_LOGIN,
	payload: userData,
});

export const userLogout = () => ({
	type: USER_LOGOUT,
});
