import { FlexWrapper } from '../FlexWrapper';
import { ValueFields } from '../value-fields/ValueFields';
import { SetValue } from '../set-value/SetValue';
import { InfoBoard } from '../info-board/InfoBoard';
import { ControlButtons } from '../control-buttons/ControlButtons';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { TValue } from '../../types/types';
import { board, inc, max, reset, set, start } from '../../mock/data';

export const Counter = () => {
	const [values, setValues] = useState<Record<string, TValue>>({
		[start]: {
			id: start,
			title: 'start value',
			value: '0',
			error: false,
		},
		[max]: {
			id: max,
			title: 'max value',
			value: '0',
			error: false,
		},
		[board]: {
			id: board,
			title: 'board',
			value: 'enter values and press "set"',
			error: false,
		},
	});

	const [disabledBtns, setDisabledBtns] = useState({
		[set]: {
			id: set,
			disabled: false,
		},
		[inc]: {
			id: inc,
			disabled: false,
		},
		[reset]: {
			id: reset,
			disabled: false,
		},
	});

	const onChangeValue = (key: string, value: string) => {
		const less = values[key].id === max && +values[start].value > +value;
		const more = values[key].id === start && +values[max].value < +value;
		const equal =
			(values[key].id === start && +values[max].value === +value) ||
			(values[key].id === max && +values[start].value === +value);

		if (less || more || equal) {
			const newValues = {
				...values,
				[max]: { ...values[max], error: true },
				[key]: { ...values[key], value, error: true },
				[board]: { ...values[board], value: 'Incorrect value', error: true },
			};
			setValues(newValues);
		} else {
			const newValues = { ...values, [key]: { ...values[key], value, error: +value < 0 ? true : false } };
			setValues(newValues);
		}
	};

	const onChangeIncHandler = () => {
		const boardValue = +values[board].value + 1;

		if (boardValue <= +values[max].value) {
			setValues({
				...values,
				[board]: {
					...values[board],
					value: boardValue.toString(),
					error: boardValue === +values[max].value ? true : values[board].error,
				},
			});
		}
	};

	const onChangeResetHandler = () => {
		setValues({ ...values, [board]: { ...values[board], value: values[start].value, error: false } });
	};

	const setValuesHandler = () => {
		const newSavedValues = { ...values, [board]: { ...values[board], value: values[start].value } };
		setValues(newSavedValues);
		localStorage.setItem('values', JSON.stringify(newSavedValues));
	};

	useEffect(() => {
		const savedValues = localStorage.getItem('values');
		if (savedValues) {
			const parsedValues = JSON.parse(savedValues);
			setValues(parsedValues);
		}
	}, []);

	return (
		<StyledCounter>
			<FlexWrapper gap='20px' direction='column'>
				<ValueFields onChangeValue={onChangeValue} values={values} />
				<SetValue values={values} setValuesHandler={setValuesHandler} />
			</FlexWrapper>

			<FlexWrapper gap='20px' direction='column'>
				<InfoBoard boardValue={values[board]} />
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
