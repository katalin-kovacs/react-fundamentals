import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { getUserName } from '../../store/user/selectors';
import { thunkLogout } from '../../store/user/thunk';

function Header() {
	let navigate = useNavigate();
	let dispatch = useDispatch();

	const userName = useSelector(getUserName);

	const handleLogout = async () => {
		dispatch(thunkLogout());
		localStorage.clear();
		navigate('/login');
	};

	return (
		<nav className='navbar navbar-light bg-light justify-content-between'>
			<Logo className=''></Logo>
			{localStorage.getItem('userToken') && (
				<div className='d-inline-flex justify-content-end'>
					<p className='m-auto px-3'>{userName}</p>
					<Button
						className='btn btn-secondary'
						type='button'
						buttonText='Logout'
						onClick={handleLogout}
					></Button>
				</div>
			)}
		</nav>
	);
}

export default Header;
