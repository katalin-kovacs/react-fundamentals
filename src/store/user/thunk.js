import { getCurrentUser, loginAuth, logoutService } from '../../services';
import { userLogin, userLogout } from './actionCreators';

export const thunkLogout = () => {
	return async (dispatch, getState) => {
		const userToken = getState().user.token;
		try {
			await logoutService(userToken);
			dispatch(userLogout());
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};
};

export const thunkLoginAuth = (loginBody, navigate) => {
	return async (dispatch) => {
		try {
			let data = await loginAuth(loginBody);

			dispatch(
				userLogin({
					isAuth: true,
					name: data.user.name,
					email: data.user.email,
					token: data.result,
				})
			);

			localStorage.setItem('userToken', data.result);
			navigate('/courses');
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};
};

export const thunkGetCurrentUser = () => {
	return async (dispatch) => {
		try {
			let currentUser = await getCurrentUser();

			dispatch(
				userLogin({
					isAuth: true,
					name:
						currentUser.result.role === 'admin'
							? 'Admin' // bc, admin has no name in the backend
							: currentUser.result.name,
					email: currentUser.result.email,
					token: localStorage.getItem('userToken'),
					role: currentUser.result.role,
				})
			);
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};
};
