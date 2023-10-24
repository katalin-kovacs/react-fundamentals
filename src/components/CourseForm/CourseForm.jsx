import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import formatCourseDuration from '../../helpers/pipeDuration';
import { getCurrentDate } from '../../helpers/dateGeneratop';
import { getAuthorNames } from '../../helpers/getAuthorNames';

import { getAuthors } from '../../store/authors/selectors';
import { useSelector, useDispatch } from 'react-redux';
import {
	thunkAddNewCourse,
	thunkUpdateCourse,
} from '../../store/courses/thunk';
import { thunkSaveNewAuthor } from '../../store/authors/thunk';
import { getCourses } from '../../store/courses/selectors';

function CourseForm() {
	let { courseId } = useParams();
	let navigate = useNavigate();
	let dispatch = useDispatch();

	let authors = useSelector(getAuthors);
	let courses = useSelector(getCourses);
	const courseToEdit = courses.find((course) => course.id === courseId);

	const [courseTitle, setCourseTitle] = useState(
		courseId ? courseToEdit.title : ''
	);
	const [courseDescription, setCourseDescription] = useState(
		courseId ? courseToEdit.description : ''
	);

	const [authorInput, setAuthorInput] = useState('');
	const [courseAuthors, setCourseAuthors] = useState(
		courseId ? [...courseToEdit.authors] : []
	);

	const [courseDuration, setCourseDuration] = useState(
		courseId ? courseToEdit.duration : 0
	);

	const handleCourseSubmit = (event) => {
		event.preventDefault();

		if (courseAuthors.length === 0) {
			alert('All fields are required.');
			return false;
		}

		if (courseId) {
			dispatch(
				thunkUpdateCourse({
					id: courseId,
					title: courseTitle,
					description: courseDescription,
					duration: Number(courseDuration),
					authors: courseAuthors,
				})
			);
		} else {
			dispatch(
				thunkAddNewCourse({
					title: courseTitle,
					description: courseDescription,
					creationDate: getCurrentDate(),
					duration: Number(courseDuration),
					authors: courseAuthors,
				})
			);
		}

		navigate('/courses');
	};

	const handleTitleInput = (event) => {
		setCourseTitle(event.target.value);
	};

	const handleDescriptionInput = (event) => {
		setCourseDescription(event.target.value);
	};

	const handleDurationInput = (event) => {
		setCourseDuration(event.target.value);
	};

	const handleAddAuthor = (event) => {
		event.preventDefault();

		let newAuthorList = [...courseAuthors];
		let newAuthorID = '';

		authors.filter((author) => {
			if (author.id.includes(event.target.value)) {
				return (newAuthorID = author.id);
			} else return null;
		});

		if (courseAuthors.includes(newAuthorID)) {
			alert('This author is already in the course author list.');
		} else {
			newAuthorList.push(newAuthorID);
			setCourseAuthors(newAuthorList);
		}
	};

	const handleRemoveAuthor = (event) => {
		setCourseAuthors((previousAuthorsList) => {
			let newAuthorsList = previousAuthorsList.filter((author) => {
				return author !== event.target.value;
			});
			return newAuthorsList;
		});
	};

	const handleNewAuthor = () => {
		if (authorInput.length < 2) {
			alert('Author name should be longer than 2 characters.');
			return false;
		} else if (authors.find((author) => author.name === authorInput)) {
			alert('This author is already in the list.');
		} else {
			dispatch(thunkSaveNewAuthor({ name: authorInput }));
		}
	};

	return (
		<form className='container mt-3' onSubmit={handleCourseSubmit}>
			{courseId ? <h3>Update course</h3> : <h3>Create new course</h3>}
			<section className='row justify-content-between mt-3'>
				<Input
					className='col-6'
					labelClassName='h6'
					labelText='Title'
					labelExtras={<abbr title='This field is required.'>*</abbr>}
					inputPlaceholder='Enter title...'
					type='text'
					id='courseTitle'
					required={true}
					onChange={handleTitleInput}
					inputValue={courseId && courseTitle}
				/>
				<Button
					className='btn btn-primary col-auto'
					type='submit'
					buttonText={courseId ? 'Update course' : 'Create course'}
				/>
			</section>
			<section className='row mt-3'>
				<label className='h6' htmlFor='courseDescription'>
					Description
					<abbr title='This field is required and it should be at least 2 characters long.'>
						*
					</abbr>
				</label>
				<textarea
					id='courseDescription'
					name='courseDescription'
					placeholder='Enter description...'
					minLength={2}
					required={true}
					onChange={handleDescriptionInput}
					value={courseId && courseDescription}
				></textarea>
			</section>
			<section className='row mt-3 justify-content-between'>
				<div className='col-5'>
					<fieldset className='row'>
						<legend className='h6'>Add Author</legend>
						<Input
							className=''
							labelText='Author name'
							labelExtras={
								<abbr title='It should be minimum 2 characters long.'>*</abbr>
							}
							inputPlaceholder='Enter author name...'
							type='text'
							id='courseAuthorName'
							onChange={(event) => setAuthorInput(event.target.value)}
						/>
						<Button
							className='btn btn-outline-primary col-auto mt-2'
							type='button'
							buttonText='Create author'
							onClick={handleNewAuthor}
						/>
					</fieldset>

					<fieldset className='row mt-3'>
						<legend className='h6'>Duration</legend>
						<Input
							className=''
							labelText='Course duration'
							labelExtras={
								<abbr title='This field is required and it should be at least 1 minutes long.'>
									*
								</abbr>
							}
							inputPlaceholder='Enter duration in minutes...'
							type='number'
							id='courseDuration'
							required={true}
							min={1}
							onChange={handleDurationInput}
							inputValue={courseDuration}
						/>
						<p className='mt-2'>
							Duration: <strong>{formatCourseDuration(courseDuration)}</strong>{' '}
							hours
						</p>
					</fieldset>
				</div>
				<div className='col-5'>
					<fieldset className=''>
						<legend className='h6'>Authors</legend>
						{authors.map((author) => {
							return (
								<div
									key={author.id}
									className='row justify-content-between mb-2'
								>
									<p className='col-auto my-auto'>{author.name}</p>
									<Button
										value={author.id}
										className='btn btn-outline-primary col-auto'
										type='button'
										buttonText='Add author'
										onClick={handleAddAuthor}
									/>
								</div>
							);
						})}
					</fieldset>
					<fieldset className='mt-3'>
						<legend className='h6'>
							Course Authors
							<abbr title='This field is required. A course should have at least 1 author.'>
								*
							</abbr>
						</legend>
						{courseAuthors.map((authorID) => {
							return (
								<div
									key={authorID}
									className='row justify-content-between mb-2'
								>
									<p className='col-auto my-auto'>
										{getAuthorNames([authorID], authors)}
									</p>
									<Button
										value={authorID}
										className='btn btn-outline-primary col-auto'
										type='button'
										buttonText='Remove author'
										onClick={handleRemoveAuthor}
									/>
								</div>
							);
						})}
					</fieldset>
				</div>
			</section>
		</form>
	);
}

CourseForm.propTypes = {
	courseList: PropTypes.array,
	authorList: PropTypes.array,
	handleCourseList: PropTypes.func,
	handleAuthorsList: PropTypes.func,
};

export default CourseForm;
