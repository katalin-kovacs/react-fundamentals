import {
	SAVE_NEW_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
	GET_COURSES,
} from './actionTypes';

export const saveNewCourse = (newCourse) => ({
	type: SAVE_NEW_COURSE,
	payload: newCourse,
});

export const deleteCourse = (courseId) => ({
	type: DELETE_COURSE,
	payload: courseId,
});

export const updateCourse = (courseData) => ({
	type: UPDATE_COURSE,
	payload: courseData,
});

export const getCourses = (courses) => ({
	type: GET_COURSES,
	payload: courses,
});
