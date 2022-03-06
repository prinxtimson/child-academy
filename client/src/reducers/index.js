import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import lesson from './lesson';
import notification from './notification';

export default combineReducers({
	alert,
	auth,
	profile,
	lesson,
	notification,
});
