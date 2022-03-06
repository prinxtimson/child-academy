import axios from 'axios';
import { setAlert } from './alert';
import {
	ACCOUNT_DELETED,
	CLEAR_PROFILE,
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	GET_PROFILES,
} from './types';

// get current user profile
export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me');

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response?.statusText,
				status: err.response?.status,
			},
		});
	}
};

// get tutor profiles action
export const getProfiles = () => async dispatch => {
	dispatch({ type: CLEAR_PROFILE });

	try {
		const res = await axios.get('/api/profile');

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response?.statusText,
				status: err.response?.status,
			},
		});
	}
};

// get user profile by id action
export const getProfileById = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response?.statusText,
				status: err.response?.status,
			},
		});
	}
};

// update user profile action
export const updateProfile = formData => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post('/api/profile', formData, config);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Profile updated', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// add experience action
export const addExperience = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put('/api/profile/experience', formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experience added', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Edit experience action
export const editExperience = (formData, id, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(
			`/api/profile/experience/${id}`,
			formData,
			config
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experience updated', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add education action
export const addEducation = formData => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify(formData);
		const res = await axios.put('/api/profile/education', body, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Education added', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Edit education action
export const editEducation = (formData, id, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(
			`/api/profile/education/${id}`,
			formData,
			config
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Education updated', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete experience action
export const delExperience = id => async dispatch => {
	if (
		window.confirm(
			'Are you sure you want to delete experience? This can NOT be undone!'
		)
	) {
		try {
			const res = await axios.delete(`/api/profile/experience/${id}`);

			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data,
			});

			dispatch(setAlert('Experience deleted', 'success'));
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	}
};

// Delete education action
export const delEducation = id => async dispatch => {
	if (
		window.confirm(
			'Are you sure want to delete education? This can NOT be undone!'
		)
	) {
		try {
			const res = await axios.delete(`/api/profile/education/${id}`);

			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data,
			});

			dispatch(setAlert('Education deleted', 'success'));
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	}
};

// Delete user account action
export const delAccount = () => async dispatch => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		try {
			await axios.delete('/api/profile');

			dispatch({
				type: CLEAR_PROFILE,
			});

			dispatch({ type: ACCOUNT_DELETED });

			dispatch(setAlert('Your account had been deleted successfuly'));
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	}
};
