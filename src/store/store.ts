import { combineReducers, createStore } from 'redux';
import { counterValuesReducer } from './reducers/counterValuesReducer';
import { counterBtnsReducer } from './reducers/counterBtnsReducer';

export const rootReducer = combineReducers({
	values: counterValuesReducer,
	buttons: counterBtnsReducer,
});

export type TRootReducer = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
