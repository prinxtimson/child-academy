import {
	CLEAR_LESSON,
	GET_LESSONS,
	LESSON_ACCEPTED,
	LESSON_BOOKED_FAIL,
	LESSON_BOOKED_SUCCESS,
	LESSON_CANCELED,
	LESSON_DECLINED,
	LESSON_ERROR,
	LESSON_UPDATE,
} from '../actions/types';

const initialState = {
	lesson: null,
	lessons: [],
	loading: true,
	error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, actions) => {
	const { type, payload } = actions;

	switch (type) {
		case LESSON_ACCEPTED:
		case LESSON_UPDATE:
		case LESSON_CANCELED:
		case LESSON_DECLINED:
			const index = state.lessons.findIndex(item => item._id === payload._id);
			state.lessons.splice(index, 1, payload);
			return {
				...state,
				lesson: payload,
				lessons: [...state.lessons],
				loading: false,
			};
		case LESSON_BOOKED_SUCCESS:
			return {
				...state,
				lessons: [payload, ...state.lessons],
				loading: false,
			};
		case GET_LESSONS:
			return {
				...state,
				lessons: payload,
				loading: false,
			};
		case LESSON_BOOKED_FAIL:
		case LESSON_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case CLEAR_LESSON:
			return {
				lesson: null,
				lessons: [],
				loading: false,
				error: {},
			};
		default:
			return state;
	}
};
