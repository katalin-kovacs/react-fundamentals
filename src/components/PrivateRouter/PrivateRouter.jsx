import { useSelector } from 'react-redux';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { getCurrentUserRole } from '../../store/user/selectors';

export const PrivateRouter = () => {
	const location = useLocation();
	const userRole = useSelector(getCurrentUserRole);
	return userRole === 'admin' ? (
		<Outlet />
	) : localStorage.getItem('userToken') ? (
		<Navigate to='/courses' state={{ from: location }} replace />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};
