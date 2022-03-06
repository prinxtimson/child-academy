import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Landing from './components/Landing';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Search from './components/Search';
import Profile from './components/dashboard/Profile';
import Alert from './components/Alert';
import Dashboard from './components/dashboard/DashboardIndex';
import PrivateRoute from './components/route/PrivateRoute';
import BecomeTutor from './components/becomeTutor/BecomeTutor';
import RequestResetPassword from './components/RequestResetPassword';
import ResetPassword from './components/ResetPassword';
import Faq from './components/Faq';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

// app css file
import './App.css';

// Utilities
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { onNotification } from './actions/notification';

// Socket
import { io } from 'socket.io-client';

require('dotenv').config();

// initialize socket
const socket = io('/', { query: { token: localStorage.token } });

setAuthToken(localStorage.token);

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	useEffect(() => {
		socket.on('notification', notification => {
			store.dispatch(onNotification(notification));
		});
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<section className='h-100'>
						<Route exact path='/' component={Landing} />
						<Alert />
						<Switch>
							<Route exact path='/signup' component={Signup} />
							<Route exact path='/signin' component={Signin} />
							<Route
								exact
								path='/request-reset-password'
								component={RequestResetPassword}
							/>
							<Route
								exact
								path='/reset-password/:token'
								component={ResetPassword}
							/>
							<Route exact path='/search/:searchParams' component={Search} />
							<Route exact path='/profile/:id' component={Profile} />
							<Route exact path='/faq' component={Faq} />
							<Route exact path='/about-us' component={AboutUs} />
							<Route exact path='/contact-us' component={ContactUs} />
							<PrivateRoute
								exact
								path='/dashboard/:pathName?/:id?'
								component={Dashboard}
							/>
							<PrivateRoute
								exact
								path='/become-a-tutor'
								component={BecomeTutor}
							/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
