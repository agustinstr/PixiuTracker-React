import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import TotalBalances from './components/TotalBalances';
import './index.css';


const App = () => (
	<Router>
		<React.StrictMode>
			<Switch>
				<Route path='/login' component={Login} exact />
        		<Route path='/register' component={Register} exact />
				<Route path='/logout' component={Logout} exact />
				<ProtectedRoute exact path='/balances' component={TotalBalances} />
				<ProtectedRoute exact path='/' component={Dashboard} />
      </Switch>
		</React.StrictMode>
	</Router>
);

export default App;