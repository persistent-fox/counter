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
import { TDisabledBtn, TValue } from '../../types/types';

export const Counter = () => {
	const dispatch = useDispatch();
	const startValue = useSelector<TRootReducer, TValue>(state => state.values[start]);
	const maxValue = useSelector<TRootReducer, TValue>(state => state.values[max]);
	const boardValue = useSelector<TRootReducer, TValue>(state => state.values[board]);
	const controlButtons = useSelector<TRootReducer, Record<string, TDisabledBtn>>(state => state.buttons);

	const maxError = maxValue.value <= startValue.value || maxValue.value < 0;
	const startError = maxValue.value <= startValue.value || startValue.value < 0;
	const boardError = maxError || startError || boardValue.value === maxValue.value;

	const onChangeValue = (key: string, value: number) => {
		dispatch(changeValueAC(key, value));

		dispatch(changeSetAC(maxError || startError));
		dispatch(changeIncAC(false));
		dispatch(changeResetAC(false));
	};

	const onChangeIncHandler = () => {
		const newBoardValue = boardValue.value + 1;

		if (newBoardValue <= maxValue.value) {
			dispatch(incrementValueAC(boardValue.value));
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
		localStorage.setItem('values', JSON.stringify(startValue.value));
		localStorage.setItem('buttons', JSON.stringify(controlButtons));
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
				<InfoBoard boardError={boardError} boardValue={boardValue} />
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
