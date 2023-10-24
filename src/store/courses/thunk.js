import {
	addNewCourseService,
	deleteCourseService,
	updateCourseService,
} from '../../services';
import {
	deleteCourse,
	saveNewCourse,
	updateCourse,
} from '../courses/actionCreators';

export const thunkDeleteCourse = (id) => {
	return async (dispatch) => {
		let data = await deleteCourseService(id);

		if (data.successful) {
			dispatch(deleteCourse(id));
		}
	};
};

export const thunkAddNewCourse = (newCourse) => {
	return async (dispatch) => {
		let data = await addNewCourseService(newCourse);

		if (data.successful) {
			dispatch(saveNewCourse(data.result));
		}
	};
};

export const thunkUpdateCourse = (courseData) => {
	return async (dispatch) => {
		let data = await updateCourseService(courseData);

		if (data.successful) {
			dispatch(updateCourse(data.result));
		}
	};
};
