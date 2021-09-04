import axios from 'axios';

const baseURL = 'https://localhost:5001/api/';


const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('token')
        ? 'Token ' + localStorage.getItem('token')
        : null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 

});

export default axiosInstance;
