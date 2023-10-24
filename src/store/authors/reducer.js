import { SAVE_NEW_AUTHOR, GET_AUTHORS } from './actionTypes';

const authorsInitialState = [];

const authors = (state = authorsInitialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SAVE_NEW_AUTHOR: {
			return [...state, payload];
		}
		case GET_AUTHORS: {
			return [...state, ...payload];
		}
		default:
			return state;
	}
};

export default authors;
