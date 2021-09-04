import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login'; 
import Register from './components/Register';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';

const App = () => (
	<Router>
		<React.StrictMode>
			<Header />
			<Switch>
				<Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
				<Route path='/logout' component={Logout} exact />
				<Route exact path='/' component={Dashboard} exact />			
      </Switch>
			<Footer />
		</React.StrictMode>
	</Router>
);

export default App;