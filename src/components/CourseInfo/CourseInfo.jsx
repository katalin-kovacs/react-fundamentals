import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import formatCourseDuration from '../../helpers/pipeDuration';
import { getAuthorNames } from '../../helpers/getAuthorNames';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { getCourses } from '../../store/courses/selectors';
import { getAuthors } from '../../store/authors/selectors';

function CourseInfo() {
	let { courseId } = useParams();
	let navigate = useNavigate();

	let courses = useSelector(getCourses);
	let authors = useSelector(getAuthors);

	useEffect(() => {
		if (!localStorage.getItem('userToken')) {
			navigate('/login');
		}
	}, [navigate]);

	const currentCourse = courses.find((course) => course.id === courseId);

	return (
		<div>
			<Link to='/courses' className='btn btn-outline-primary mt-3'>
				{'< Back to the course list'}
			</Link>
			<h3 className='mt-3'>{currentCourse.title}</h3>
			<div className='row'>
				<div className='col-md-8'>
					<p>{currentCourse.description}</p>
				</div>
				<div className='col-md-4'>
					<p className='text-truncate'>
						<strong>Course ID: </strong>
						{currentCourse.id}
					</p>
					<p className='text-truncate'>
						<strong>Authors: </strong>
						{getAuthorNames(currentCourse.authors, authors)}
					</p>
					<p className='text-truncate'>
						<strong>Duration: </strong>
						{`${formatCourseDuration(currentCourse.duration)} hours`}
					</p>
					<p className='text-truncate'>
						<strong>Created: </strong>
						{currentCourse.creationDate}
					</p>
				</div>
			</div>
		</div>
	);
}

CourseInfo.propTypes = {
	authorList: PropTypes.array,
	courseList: PropTypes.array,
};

export default CourseInfo;
