import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_LESSONS,
	LESSON_ACCEPTED,
	LESSON_BOOKED_FAIL,
	LESSON_BOOKED_SUCCESS,
	LESSON_DECLINED,
	LESSON_ERROR,
	LESSON_CANCELED,
	LESSON_UPDATE,
} from './types';

// get user lesson actions
export const getLessons = () => async dispatch => {
	try {
		const res = await axios.get('/api/lesson');

		dispatch({
			type: GET_LESSONS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		dispatch({ type: LESSON_ERROR });
	}
};

// Book lesson action
export const bookLesson = (formData, onSuccessful) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/lesson', formData, config);

		dispatch({
			type: LESSON_BOOKED_SUCCESS,
			payload: res.data,
		});
		onSuccessful();
		dispatch(setAlert('lesson booked successfuly', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LESSON_BOOKED_FAIL,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Update lesson action
export const updateLesson = (formData, id) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.put(`/api/lesson/${id}`, formData, config);

		dispatch({
			type: LESSON_UPDATE,
			payload: res.data,
		});
		dispatch(setAlert('lesson updated successfuly', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LESSON_BOOKED_FAIL,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// accept lesson action
export const acceptLesson = lessonId => async dispatch => {
	try {
		const res = await axios.get(`/api/lesson/accept/${lessonId}`);

		dispatch({
			type: LESSON_ACCEPTED,
			payload: res.data,
		});
		dispatch(setAlert('lesson accepted', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LESSON_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Declined lesson action
export const declineLesson = lessonId => async dispatch => {
	try {
		const res = await axios.get(`/api/lesson/decline/${lessonId}`);
		console.log(res.data);
		dispatch({
			type: LESSON_DECLINED,
			payload: res.data,
		});
		dispatch(setAlert('lesson declined', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LESSON_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//cancel lesson action
export const cancelLesson = lessonId => async dispatch => {
	try {
		const res = await axios.get(`/api/lesson/cancel/${lessonId}`);

		dispatch({
			type: LESSON_CANCELED,
			payload: res.data,
		});
		dispatch(setAlert('lesson canceled', 'success'));
	} catch (err) {
		const errors = err.response?.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LESSON_ERROR,
			payload: { msg: err.response?.statusText, status: err.response?.status },
		});
	}
};
