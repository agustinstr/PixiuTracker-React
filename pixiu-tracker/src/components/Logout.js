import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';

const LogOut = () => {
	const history = useHistory();

	useEffect(() => {
		const response = axiosInstance.post('user/logout', {});
		localStorage.setItem('isLogged', 'false');
		history.push('/login');
	});
	return <div>Logout</div>;
}

export default LogOut
