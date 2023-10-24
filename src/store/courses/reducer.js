import {
	SAVE_NEW_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
	GET_COURSES,
} from './actionTypes';

const coursesInitialState = [];

const courses = (state = coursesInitialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SAVE_NEW_COURSE: {
			return [...state, payload];
		}
		case DELETE_COURSE: {
			return state.filter((course) => payload !== course.id);
		}
		case UPDATE_COURSE: {
			return state.map((course) =>
				course.id === payload.id ? payload : course
			);
		}
		case GET_COURSES: {
			return [...state, ...payload];
		}
		default:
			return state;
	}
};

export default courses;
