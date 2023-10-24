import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

const user = (state = userInitialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_LOGIN: {
			let newUser = {
				isAuth: payload.isAuth,
				name: payload.name,
				email: payload.email,
				token: payload.token,
				role: payload.role,
			};
			return { ...state, ...newUser };
		}
		case USER_LOGOUT: {
			return { ...userInitialState };
		}
		default:
			return state;
	}
};

export default user;
