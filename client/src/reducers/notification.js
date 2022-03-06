import { GET_NOTIFICATIONS, SET_NOTIFICATION } from '../actions/types';

const initialState = {
	notifications: [],
	loading: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, actions) => {
	const { type, payload } = actions;

	switch (type) {
		case GET_NOTIFICATIONS:
			return {
				loading: false,
				notifications: payload,
			};
		case SET_NOTIFICATION:
			return {
				loading: false,
				notifications: [payload, ...state.notifications],
			};
		default:
			return state;
	}
};
