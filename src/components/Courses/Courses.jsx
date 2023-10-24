import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import formatCourseDuration from '../../helpers/pipeDuration';
import { getAuthorNames } from '../../helpers/getAuthorNames';

import { getCourses } from '../../store/courses/selectors';
import { getAuthors } from '../../store/authors/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetCurrentUser } from '../../store/user/thunk';
import { getCurrentUserRole } from '../../store/user/selectors';

function Courses() {
	let navigate = useNavigate();
	let dispatch = useDispatch();

	let courses = useSelector(getCourses);
	let authors = useSelector(getAuthors);
	let userRole = useSelector(getCurrentUserRole);

	const [input, setInput] = useState('');
	const [filteredCourses, setFilteredCourses] = useState(courses);
	const [isFiltered, setIsFiltered] = useState(false);

	useEffect(() => {
		if (!localStorage.getItem('userToken')) {
			navigate('/login');
		} else {
			dispatch(thunkGetCurrentUser());
		}
		setFilteredCourses(courses);
	}, [navigate, dispatch, userRole, courses]);

	const handleSearchSubmit = (event) => {
		event.preventDefault();

		if (input.length === 0) {
			setIsFiltered(false);
		} else {
			let filteredCourses = courses.filter(
				(course) =>
					course.title.toLowerCase().includes(input.toLowerCase()) ||
					course.id.toLowerCase().includes(input.toLowerCase())
			);
			setFilteredCourses(filteredCourses);
			setIsFiltered(true);
		}
	};

	return (
		<>
			<section className='row mt-3 justify-content-between'>
				<SearchBar
					className='d-inline-flex col-md-6'
					inputValue={input}
					onSubmit={handleSearchSubmit}
					onChange={(event) => setInput(event.target.value)}
					inputPlaceholder='Enter course name or id...'
				/>
				{userRole === 'admin' && (
					<Button
						className='btn btn-primary col-auto mt-2 mt-md-0'
						type='button'
						buttonText='Add new course'
						onClick={() => {
							navigate('/courses/add');
						}}
					/>
				)}
			</section>
			{isFiltered
				? filteredCourses.map((course) => {
						return (
							<CourseCard
								key={course.id}
								courseTitle={course.title}
								courseDescription={course.description}
								courseAuthors={getAuthorNames(course.authors, authors)}
								courseDuration={`${formatCourseDuration(
									course.duration
								)} hours`}
								courseCreationDate={course.creationDate}
								courseId={course.id}
								userRole={userRole}
							/>
						);
				  })
				: courses.map((course) => {
						return (
							<CourseCard
								key={course.id}
								courseTitle={course.title}
								courseDescription={course.description}
								courseAuthors={getAuthorNames(course.authors, authors)}
								courseDuration={`${formatCourseDuration(
									course.duration
								)} hours`}
								courseCreationDate={course.creationDate}
								courseId={course.id}
								userRole={userRole}
							/>
						);
				  })}
		</>
	);
}

Courses.propTypes = {
	authorList: PropTypes.array,
	courseList: PropTypes.array,
};

export default Courses;
