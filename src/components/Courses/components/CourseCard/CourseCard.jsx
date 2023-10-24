import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';

import { useDispatch } from 'react-redux';
import { thunkDeleteCourse } from '../../../../store/courses/thunk';

function CourseCard(props) {
	let dispatch = useDispatch();
	let navigate = useNavigate();

	const deleteCourseHandle = () => {
		dispatch(thunkDeleteCourse(props.courseId));
	};

	const editCourseHandle = () => {
		navigate(`/courses/update/${props.courseId}`);
	};

	return (
		<section className='row mt-3 py-3 bg-light'>
			<div className='col-8'>
				<h3>{props.courseTitle}</h3>
				<p>{props.courseDescription}</p>
			</div>
			<div className='col-4'>
				<p className='text-truncate'>
					<strong>Authors: </strong>
					{props.courseAuthors}
				</p>
				<p className='text-truncate'>
					<strong>Duration: </strong>
					{props.courseDuration}
				</p>
				<p className='text-truncate'>
					<strong>Created: </strong>
					{props.courseCreationDate}
				</p>
				<Link to={`/courses/${props.courseId}`}>
					<Button
						className='btn btn-outline-primary'
						type='button'
						buttonText='Show course'
					/>
				</Link>
				{props.userRole === 'admin' && (
					<>
						<Button
							className='btn btn-outline-primary'
							type='button'
							buttonText='🖉'
							onClick={editCourseHandle}
						/>
						<Button
							className='btn btn-outline-primary'
							type='button'
							buttonText='🗑'
							onClick={deleteCourseHandle}
						/>
					</>
				)}
			</div>
		</section>
	);
}

CourseCard.propTypes = {
	courseTitle: PropTypes.string,
	courseDescription: PropTypes.string,
	courseAuthors: PropTypes.string,
	courseDuration: PropTypes.string,
	courseCreationDate: PropTypes.string,
	courseId: PropTypes.string,
};

export default CourseCard;
