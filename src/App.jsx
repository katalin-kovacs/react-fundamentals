import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';

import { useEffect } from 'react';

import { getAllAuthors, getAllCourses } from './services';
import { getAuthors } from './store/authors/actionCreators';
import { getCourses } from './store/courses/actionCreators';
import { useDispatch } from 'react-redux';
import CourseForm from './components/CourseForm/CourseForm';
import { PrivateRouter } from './components/PrivateRouter/PrivateRouter';

function App() {
	let dispatch = useDispatch();

	useEffect(() => {
		const getCoursesFromApi = async () => {
			try {
				let allCourses = await getAllCourses();
				let allAuthors = await getAllAuthors();
				dispatch(getCourses(allCourses.result));
				dispatch(getAuthors(allAuthors.result));
			} catch (error) {
				console.log(error);
				alert(error);
			}
		};
		getCoursesFromApi();
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Courses />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route path='/courses' element={<Courses />} />
				<Route path='/courses/:courseId' element={<CourseInfo />} />
				<Route element={<PrivateRouter />}>
					<Route path='/courses/add' element={<CourseForm />} />
					<Route path='/courses/update/:courseId' element={<CourseForm />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
