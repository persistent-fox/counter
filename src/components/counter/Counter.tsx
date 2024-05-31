import { FlexWrapper } from '../FlexWrapper';
import { ValueFields } from '../value-fields/ValueFields';
import { SetValue } from '../set-value/SetValue';
import { InfoBoard } from '../info-board/InfoBoard';
import { ControlButtons } from '../control-buttons/ControlButtons';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { TValue } from '../../types/types';
import { board, max, start } from '../../mock/data';

export const Counter = () => {
	const [values, setValues] = useState<Record<string, TValue>>({
		[start]: {
			id: start,
			title: 'start value',
			value: '0',
		},
		[max]: {
			id: max,
			title: 'max value',
			value: '0',
		},
		[board]: {
			id: board,
			title: 'Board',
			value: '0',
		},
	});

	const onChangeValue = (key: string, value: string) => {
		const newValues = { ...values, [key]: { ...values[key], value } };
		setValues(newValues);
	};

	const onChangeIncHandler = () => {};

	const setValuesHandler = () => {
		setValues({ ...values, board: values.start });
		localStorage.setItem('startValue', JSON.stringify(values.start));
		localStorage.setItem('maxValue', JSON.stringify(values.max));
	};

	useEffect(() => {
		setValues({
			startValue: JSON.parse(localStorage.getItem('startValue') || '0'),
			maxValue: JSON.parse(localStorage.getItem('maxValue') || '0'),
			boardValue: JSON.parse(localStorage.getItem('startValue') || '0'),
		});
		console.log('values', values);
	}, []);

	return (
		<StyledCounter>
			<FlexWrapper gap='20px' direction='column'>
				<ValueFields onChangeValue={onChangeValue} values={values} />
				<SetValue setValuesHandler={setValuesHandler} />
			</FlexWrapper>

			<FlexWrapper gap='20px' direction='column'>
				<InfoBoard boardValue={values[board]} />
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
