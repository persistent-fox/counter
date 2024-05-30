import { FlexWrapper } from '../FlexWrapper';
import { ValueFields } from '../value-fields/ValueFields';
import { SetValue } from '../set-value/SetValue';
import { InfoBoard } from '../info-board/InfoBoard';
import { ControlButtons } from '../control-buttons/ControlButtons';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';

export const Counter = () => {
	const [maxValue, setMaxValue] = useState('0');
	const [boardValue, setBoardValue] = useState('');
	const [startValue, setStartValue] = useState('0');

	const onChangeMaxValue = (value: string) => {
		setMaxValue(value);
	};

	const onChangeStartValue = (value: string) => {
		setStartValue(value);
	};

	const onChangeIncHandler = () => {};

	const setValuesHandler = () => {
		setBoardValue(startValue);
		localStorage.setItem('maxValue', JSON.stringify(maxValue));
		localStorage.setItem('startValue', JSON.stringify(startValue));
	};

	useEffect(() => {
		const maxValue = localStorage.getItem('maxValue');
		const startValue = localStorage.getItem('startValue');
		if (maxValue) {
			setMaxValue(JSON.parse(maxValue));
		}
		if (startValue) {
			setMaxValue(JSON.parse(startValue));
		}
	}, []);

	return (
		<StyledCounter>
			<FlexWrapper gap='20px' direction='column'>
				<ValueFields
					onChangeStartValue={onChangeStartValue}
					onChangeMaxValue={onChangeMaxValue}
					maxValue={maxValue}
					startValue={startValue}
				/>
				<SetValue setValuesHandler={setValuesHandler} />
			</FlexWrapper>

			<FlexWrapper gap='20px' direction='column'>
				<InfoBoard boardValue={boardValue} title='Board' />
				<ControlButtons onChangeIncHandler={onChangeIncHandler} />
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
