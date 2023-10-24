import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

function Registration() {
	let navigate = useNavigate();

	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (localStorage.getItem('userToken')) {
			navigate('/courses');
		}
	}, [navigate]);

	const handleUserNameInput = (event) => {
		setUserName(event.target.value);
	};

	const handleEmailInput = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordInput = (event) => {
		setPassword(event.target.value);
	};

	async function registrationAuth(body) {
		const response = await fetch('http://localhost:3000/register', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await response.json();

		if (data.errors) {
			throw new Error(`${data.errors.join(',')}`);
		} else {
			navigate('/login');
		}
	}

	const handleRegistrationSubmit = async (event) => {
		event.preventDefault();

		if (password.length < 6) {
			alert('Password should be at least 6 characters long.');
			return false;
		}

		try {
			await registrationAuth({
				name: userName,
				email: email,
				password: password,
				role: 'user',
			});
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};

	return (
		<form className='mt-3' onSubmit={handleRegistrationSubmit}>
			<h3>Registration</h3>
			<div className='form-group mt-3'>
				<Input
					className='form-control'
					labelClassName='h6'
					labelText='Name'
					inputPlaceholder='Enter name...'
					type='text'
					id='userName'
					labelExtras={<abbr title='This field is required.'>*</abbr>}
					required={true}
					onChange={handleUserNameInput}
				/>
			</div>
			<div className='form-group mt-3'>
				<Input
					className='form-control'
					labelClassName='h6'
					labelText='Email'
					inputPlaceholder='Enter email...'
					type='email'
					id='email'
					labelExtras={<abbr title='This field is required.'>*</abbr>}
					required={true}
					onChange={handleEmailInput}
				/>
			</div>
			<div className='form-group  mt-3'>
				<Input
					className='form-control'
					labelClassName='h6'
					labelText='Password'
					inputPlaceholder='Enter password...'
					type='password'
					id='password'
					labelExtras={
						<abbr title='Password should be at least 6 characters long.'>
							*
						</abbr>
					}
					required={true}
					onChange={handlePasswordInput}
				/>
			</div>
			<Button
				className='btn btn-primary mt-3'
				type='submit'
				buttonText='Registration'
			/>
			<div className='mt-3'>
				<p>
					If you have an account you can <Link to='/login'>Login</Link>.
				</p>
			</div>
		</form>
	);
}

export default Registration;
