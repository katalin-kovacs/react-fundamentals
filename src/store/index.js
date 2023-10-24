import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authors from '../store/authors/reducer';
import courses from '../store/courses/reducer';
import user from '../store/user/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ authors, courses, user });
const middleware = [thunk];
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
