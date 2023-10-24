import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { thunkLoginAuth } from '../../store/user/thunk';

function Login() {
	let navigate = useNavigate();
	let dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (localStorage.getItem('userToken')) {
			navigate('/courses');
		}
	}, [navigate]);

	const handleEmailInput = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordInput = (event) => {
		setPassword(event.target.value);
	};

	const handleLoginSubmit = (event) => {
		event.preventDefault();

		dispatch(
			thunkLoginAuth(
				{
					email: email,
					password: password,
				},
				navigate
			)
		);
	};

	return (
		<form className='mt-3' onSubmit={handleLoginSubmit}>
			<h3>Login</h3>
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
					required={true}
					onChange={handlePasswordInput}
				/>
			</div>
			<Button
				className='btn btn-primary mt-3'
				type='submit'
				buttonText='Login'
			/>
			<div className='mt-3'>
				<p>
					If you don't have an account you can{' '}
					<Link to='/registration'>Register</Link>.
				</p>
			</div>
		</form>
	);
}

export default Login;
