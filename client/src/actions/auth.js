import axios from 'axios';
import { setAlert } from './alert';
import {
	AUTH_ERROR,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_USER,
	CLEAR_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { getCurrentProfile } from './profile';
import { getNotifications } from './notification';

// Load authenticated user action
export const loadUser = () => async dispatch => {
	setAuthToken(localStorage.token);

	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
		dispatch(getNotifications());
	} catch (err) {
		const { errors } = err.response.data;
		console.log(errors);

		dispatch({ type: AUTH_ERROR });
	}
};

// Upload user avatar action
export const uploadAvatar = file => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};

	try {
		const res = await axios.post('/api/users/upload', file, config);

		dispatch(loadUser());
		dispatch(getCurrentProfile());
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		const { errors } = err.response.data;
		console.log(errors);

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
	}
};

// Become a tutor action
export const becomeTutor = (formData, history) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.put('/api/users/become-a-tutor', formData, config);

		dispatch(loadUser());
		dispatch(setAlert(res.data.msg, 'success'));

		history.push('/dashboard/profile');
	} catch (err) {
		const { errors } = err.response.data;
		console.log(errors);

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
	}
};

//Login user action
export const loginUser = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/api/auth', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const { errors } = err.response.data;
		console.log(errors);

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({ type: LOGIN_FAIL });
	}
};

// Register user action
export const registerUser = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify(formData);

	try {
		const res = await axios.post('/api/users', body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const { errors } = err.response.data;
		console.log(errors);

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({ type: REGISTER_FAIL });
	}
};

// Request Password reset action
export const requestPasswordReset =
	(email, handleSuccess) => async dispatch => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = JSON.stringify({ email });

		try {
			const res = await axios.put(
				'/api/auth/request-password-reset',
				body,
				config
			);

			dispatch(setAlert(res.data.msg, 'success'));
			handleSuccess();
		} catch (err) {
			const { errors } = err.response.data;
			console.log(errors);

			if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
			}
		}
	};

// Reset password action
export const resetPassword =
	(password, token, handleSuccess) => async dispatch => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = JSON.stringify({ password, token });
		try {
			const res = await axios.put('/api/auth/reset-password', body, config);

			dispatch(setAlert(res.data.msg, 'success'));

			handleSuccess();
		} catch (err) {
			const { errors } = err.response.data;
			console.log(errors);

			if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
			}
		}
	};

// Logout user action
export const logoutUser = () => dispatch => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT_USER });
};
