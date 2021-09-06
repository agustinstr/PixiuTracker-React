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
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
	<Router>
		<React.StrictMode>
			<Switch>
				<Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
				<Route path='/logout' component={Logout} exact />
				<ProtectedRoute exact path='/' component={Dashboard} />
      </Switch>
		</React.StrictMode>
	</Router>
);

export default App;