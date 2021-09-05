import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://localhost:5001/api/';


const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 30000,
    withCredentials: true,
	headers: {
		Authorization: Cookies.get('jwt') != null
        ? 'Bearer ' + Cookies.get('jwt')
        : null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 

});

export default axiosInstance;
