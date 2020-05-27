import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

//contains application state

const initialState = {};

const middleware = [ thunk ];

const reducers = combineReducers({
	//anything that comes from userReducer, it will be stored in user
	user: userReducer,
	data: dataReducer,
	UI: uiReducer
});

const store = createStore(
	reducers,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;