import { board, max, start } from '../../mock/data';
import { TValue } from '../../types/types';

const initialState: Record<string, TValue> = {
	[start]: {
		id: start,
		title: 'start value',
		value: 0,
	},
	[max]: {
		id: max,
		title: 'max value',
		value: 0,
	},
	[board]: {
		id: board,
		title: 'board',
		value: 0,
	},
};

export type TChangeValueAC = {
	type: 'CHANGE VALUE';
	key: string;
	value: number;
};
export type TIncrementValueAC = {
	type: 'INCREMENT VALUE';
	boardValue: number;
};

export type TResetValueAC = {
	type: 'RESET VALUE';
};

export type TActions = TChangeValueAC | TIncrementValueAC | TResetValueAC;

export const counterValuesReducer = (state = initialState, action: TActions): Record<string, TValue> => {
	switch (action.type) {
		case 'CHANGE VALUE':
			return {
				...state,
				[action.key]: { ...state[action.key], value: action.value },
			};
		case 'INCREMENT VALUE':
			return {
				...state,
				[board]: {
					...state[board],
					value: action.boardValue,
				},
			};
		case 'RESET VALUE':
			return { ...state, [board]: { ...state[board], value: state[start].value } };

		default:
			return state;
	}
};

export const changeValueAC = (key: string, value: number): TChangeValueAC => {
	return {
		type: 'CHANGE VALUE',
		key: key,
		value: value,
	};
};

export const incrementValueAC = (boardValue: number): TIncrementValueAC => {
	return {
		type: 'INCREMENT VALUE',
		boardValue: boardValue,
	};
};

export const resetValueAC = (): TResetValueAC => {
	return {
		type: 'RESET VALUE',
	};
};
