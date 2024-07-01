import { styled } from 'styled-components';
import { Field, StyledField } from '../field/Field';
import { TValue } from '../../types/types';
import { max, start } from '../../mock/data';

type TValueFieldsProps = {
	maxError: boolean;
	startError: boolean;
	values: Record<string, TValue>;
	onChangeValue: (key: string, value: number) => void;
};

export const ValueFields = ({ values, startError, maxError, onChangeValue }: TValueFieldsProps) => {
	return (
		<StyledValueFields>
			<Field key={start} error={maxError} callBack={value => onChangeValue(start, value)} itemValue={values[start]} />
			<Field key={max} error={startError} callBack={value => onChangeValue(max, value)} itemValue={values[max]} />
		</StyledValueFields>
	);
};

const StyledValueFields = styled.div`
	width: 100%;
	padding: 10px;
	border-radius: 10px;
	border: 3px solid ${props => props.theme.colors.accent};
	${StyledField}:first-child {
		margin-bottom: 20px;
	}
`;
