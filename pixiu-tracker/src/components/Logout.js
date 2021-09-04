import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';

export default function SignUp() {
	const history = useHistory();

	useEffect(() => {
		const response = axiosInstance.post('v1/users/auth/logout/', {});
		localStorage.removeItem('token');
		
		axiosInstance.defaults.headers['Authorization'] = null;
		history.push('/login');
	});
	return <div>Logout</div>;
}
