import { FlexWrapper } from '../FlexWrapper';
import { ValueFields } from '../value-fields/ValueFields';
import { SetValue } from '../set-value/SetValue';
import { InfoBoard } from '../info-board/InfoBoard';
import { ControlButtons } from '../control-buttons/ControlButtons';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { TDisabledBtn, TValue } from '../../types/types';
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

	const [disabledBtns, setDisabledBtns] = useState<Record<string, TDisabledBtn>>({
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
			setDisabledBtns({
				...disabledBtns,
				[set]: { ...disabledBtns[set], disabled: true },
				[inc]: { ...disabledBtns[inc], disabled: true },
				[reset]: { ...disabledBtns[reset], disabled: true },
			});
		} else {
			const startValue = values[key].id === start;
			const maxValue = values[key].id === max;
			if (startValue) {
				const newValues = {
					...values,
					[key]: { ...values[key], value, error: +value < 0 ? true : false },
					[max]: { ...values[max], error: false },
					[board]: { ...values[board], value: value, error: false },
				};
				setValues(newValues);
			}
			if (maxValue) {
				const newValues = {
					...values,
					[key]: { ...values[key], value, error: +value < 0 ? true : false },
					[start]: { ...values[start], error: false },
					[board]: { ...values[board], value: values[start].value, error: false },
				};
				setValues(newValues);
			}
			setDisabledBtns({
				...disabledBtns,
				[set]: { ...disabledBtns[set], disabled: +value < 0 ? true : false },
				[inc]: { ...disabledBtns[inc], disabled: true },
				[reset]: { ...disabledBtns[reset], disabled: true },
			});
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
		if (boardValue === +values[max].value) {
			setDisabledBtns({ ...disabledBtns, [inc]: { ...disabledBtns[inc], disabled: true } });
		}
	};

	const onChangeResetHandler = () => {
		setValues({ ...values, [board]: { ...values[board], value: values[start].value, error: false } });
		setDisabledBtns({ ...disabledBtns, [inc]: { ...disabledBtns[inc], disabled: false } });
	};

	const setValuesHandler = () => {
		const newSavedValues = { ...values, [board]: { ...values[board], value: values[start].value } };
		const newSavedButtons = {
			[set]: { ...disabledBtns[set], disabled: true },
			[inc]: { ...disabledBtns[inc], disabled: false },
			[reset]: { ...disabledBtns[reset], disabled: false },
		};

		setValues(newSavedValues);
		setDisabledBtns(newSavedButtons);
		localStorage.setItem('values', JSON.stringify(newSavedValues));
		localStorage.setItem('buttons', JSON.stringify(newSavedButtons));
	};

	useEffect(() => {
		const savedValues = localStorage.getItem('values');
		const savedButtons = localStorage.getItem('buttons');
		if (savedValues && savedButtons) {
			const parsedValues = JSON.parse(savedValues);
			const parsedButtons = JSON.parse(savedButtons);
			setValues(parsedValues);
			setDisabledBtns(parsedButtons);
		}
	}, []);

	return (
		<StyledCounter>
			<FlexWrapper gap='20px' direction='column'>
				<ValueFields onChangeValue={onChangeValue} values={values} />
				<SetValue disabledBtns={disabledBtns[set]} values={values} setValuesHandler={setValuesHandler} />
			</FlexWrapper>

			<FlexWrapper gap='20px' direction='column'>
				<InfoBoard boardValue={values[board]} />
				<ControlButtons
					disabledBtns={disabledBtns}
					onChangeIncHandler={onChangeIncHandler}
					onChangeResetHandler={onChangeResetHandler}
				/>
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
