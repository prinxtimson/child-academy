import axios from 'axios';
import { GET_NOTIFICATIONS, SET_NOTIFICATION } from './types';

// get authenticated user notifications action
export const getNotifications = () => async dispatch => {
	try {
		const res = await axios.get('/api/notifications');

		dispatch({
			type: GET_NOTIFICATIONS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// set notification on new notification receive action
export const onNotification = notification => dispatch => {
	dispatch({
		type: SET_NOTIFICATION,
		payload: notification,
	});
};

// mark notification read action
export const readNotification = () => async dispatch => {
	try {
		const res = await axios.put('/api/notifications');

		dispatch({
			type: GET_NOTIFICATIONS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};
