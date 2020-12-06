import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers(
  {user: userReducer}
);

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));