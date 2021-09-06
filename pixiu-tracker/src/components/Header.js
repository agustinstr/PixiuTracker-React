import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axiosInstance from '../axios';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
}));



function Header() {
	const classes = useStyles();
	let isLogged = (localStorage.getItem('isLogged')=== 'true');
	const history = useHistory();

	const handleLogOut = () => {
		const response = axiosInstance.post('user/logout', {});
		history.push('/login');
	}

	window.addEventListener('storage', () => {
		// When local storage changes, dump the list to
		// the console.
		console.log(window.localStorage.getItem('loggedIn'));
	  });

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/dashboard"
							underline="none"
							color="textPrimary"
						>
							PixiuTracker
						</Link>
					</Typography>
					<Button
						
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/logout"
						//onClick = {handleLogOut}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;
