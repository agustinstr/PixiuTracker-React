import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Cookies from 'js-cookie';



const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const  SignUp = () => {
	const [password, setpassword] = useState("")
	const [email, setemail] = useState("")
	const [username, setusername] = useState("")
	const [apiKey, setapikey] = useState("")
	const [apiSecret, setapisecret] = useState("")

	useEffect(() => {
		if (Cookies.get('jwt') !== "") {
		  history.push('/');
		} 
	  }, []);

	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();

		const asd = {
			Email:email,
			Password: password,
			Username: username,
			ApiSecret: apiKey,
			ApiKey: apiSecret
		};

		console.log (asd);

		axiosInstance
			.post('user/register/', {
				Email:email,
    			Password: password,
   				Username: username,
    			ApiSecret: apiKey,
    			ApiKey: apiSecret
			})
			.then((res) => {
				//localStorage.clear();
				history.push('/dashboard');
				console.log(res);
				console.log(res.data);
			})
			.catch((e) => {
				console.log("Error custom " + e); //for debugging purposes
			})
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form onSubmit = {handleSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={(e) => setemail(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								label="Username"
								name="username"
								autoComplete="username"
								onChange={(e) => setusername(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								onChange={(e) => setpassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="apiKey"
								label="Binance Api Key"
								name="apiKey"
								autoComplete="api_key"
								onChange={(e) => setapikey(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="api_secret"
								label="Api Secret"
								name="api_secret"
								autoComplete="api_secret"
								onChange={(e) => setapisecret(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Login
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}

export default SignUp;