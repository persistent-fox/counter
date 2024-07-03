import { inc, reset, set } from '../../mock/data';
import { TDisabledBtn } from '../../types/types';

const initialState: Record<string, TDisabledBtn> = {
	[set]: {
		id: set,
		disabled: true,
	},
	[inc]: {
		id: inc,
		disabled: false,
	},
	[reset]: {
		id: reset,
		disabled: false,
	},
};

export type TChangeIncAC = {
	type: 'CHANGE INC';
	value: boolean;
};
export type TChangeSetAC = {
	type: 'CHANGE SET';
	value: boolean;
};
export type TChangeResetAC = {
	type: 'CHANGE RESET';
	value: boolean;
};

export type TActions = TChangeIncAC | TChangeSetAC | TChangeResetAC;

export const counterBtnsReducer = (state = initialState, action: TActions): Record<string, TDisabledBtn> => {
	switch (action.type) {
		case 'CHANGE INC':
			return { ...state, [inc]: { ...state[inc], disabled: action.value } };
		case 'CHANGE SET':
			return { ...state, [set]: { ...state[set], disabled: action.value } };
		case 'CHANGE RESET':
			return { ...state, [reset]: { ...state[reset], disabled: action.value } };
		default:
			return state;
	}
};

export const changeIncAC = (value: boolean) => {
	return {
		type: 'CHANGE INC',
		value: value,
	};
};
export const changeSetAC = (value: boolean) => {
	return {
		type: 'CHANGE SET',
		value: value,
	};
};
export const changeResetAC = (value: boolean) => {
	return {
		type: 'CHANGE RESET',
		value: value,
	};
};
