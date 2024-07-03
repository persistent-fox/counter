import { FlexWrapper } from '../FlexWrapper';
import { ValueFields } from '../value-fields/ValueFields';
import { SetValue } from '../set-value/SetValue';
import { InfoBoard } from '../info-board/InfoBoard';
import { ControlButtons } from '../control-buttons/ControlButtons';
import { styled } from 'styled-components';
import { useEffect } from 'react';
import { board, inc, max, reset, set, start } from '../../mock/data';
import { useDispatch } from 'react-redux';
import { changeValueAC, incrementValueAC, resetValueAC } from '../../store/reducers/counterValuesReducer';
import { useSelector } from 'react-redux';
import { TRootReducer } from '../../store/store';
import { changeIncAC, changeResetAC, changeSetAC } from '../../store/reducers/counterBtnsReducer';
import { TValue } from '../../types/types';

export const Counter = () => {
	const dispatch = useDispatch();
	const startValue = useSelector<TRootReducer, TValue>(state => state.values[start]);
	const maxValue = useSelector<TRootReducer, TValue>(state => state.values[max]);
	const boardValue = useSelector<TRootReducer, TValue>(state => state.values[board]);

	const maxError = maxValue.value <= startValue.value || maxValue.value < 0;
	const startError = maxValue.value <= startValue.value || startValue.value < 0;
	const boardError = maxError || startError || boardValue.value === maxValue.value;

	const onChangeValue = (key: string, value: number) => {
		dispatch(changeValueAC(key, value));

		dispatch(changeIncAC(true));
		dispatch(changeResetAC(true));
		dispatch(changeSetAC(boardError));
	};

	const onChangeIncHandler = () => {
		const newBoardValue = boardValue.value + 1;

		if (newBoardValue <= maxValue.value) {
			dispatch(incrementValueAC(newBoardValue));
		}
		if (newBoardValue === maxValue.value) {
			dispatch(changeIncAC(true));
		}
	};

	const onChangeResetHandler = () => {
		dispatch(resetValueAC());
		dispatch(changeIncAC(false));
	};

	const setValuesHandler = () => {
		dispatch(changeValueAC(board, startValue.value));
		dispatch(changeIncAC(false));
		dispatch(changeSetAC(true));
		dispatch(changeResetAC(false));
		const obj = {
			[start]: {
				id: start,
				title: 'start value',
				value: startValue.value,
			},
			[max]: {
				id: max,
				title: 'max value',
				value: maxValue.value,
			},
			[board]: {
				id: board,
				title: 'board',
				value: startValue.value,
			},
		};
		const btns = {
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
				disabled: true,
			},
		};
		localStorage.setItem('values', JSON.stringify(obj));
		localStorage.setItem('buttons', JSON.stringify(btns));
	};

	useEffect(() => {
		const savedValues = localStorage.getItem('values');
		const savedButtons = localStorage.getItem('buttons');
		if (savedValues && savedButtons) {
			const parsedValues = JSON.parse(savedValues);
			const parsedButtons = JSON.parse(savedButtons);
			dispatch(changeValueAC(board, parsedValues[board].value));
			dispatch(changeValueAC(start, parsedValues[start].value));
			dispatch(changeValueAC(max, parsedValues[max].value));

			dispatch(changeIncAC(parsedButtons[inc]));
			dispatch(changeSetAC(parsedButtons[set]));
			dispatch(changeResetAC(parsedButtons[reset]));
		}
	}, []);

	return (
		<StyledCounter>
			<FlexWrapper gap='20px' direction='column'>
				<ValueFields startError={startError} maxError={maxError} onChangeValue={onChangeValue} />
				<SetValue setValuesHandler={setValuesHandler} />
			</FlexWrapper>

			<FlexWrapper gap='20px' direction='column'>
				<InfoBoard startError={startError} maxError={maxError} boardError={boardError} boardValue={boardValue} />
				<ControlButtons onChangeIncHandler={onChangeIncHandler} onChangeResetHandler={onChangeResetHandler} />
			</FlexWrapper>
		</StyledCounter>
	);
};

const StyledCounter = styled.div`
	display: flex;
	justify-content: space-between;
	max-width: 800px;
	width: 100%;
	margin: 0 auto;
	padding: 10px;
`;
