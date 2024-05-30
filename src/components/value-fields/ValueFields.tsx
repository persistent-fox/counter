import { styled } from 'styled-components';
import { Field, StyledField } from '../field/Field';

type TValueFieldsProps = {
	maxValue: string;
	startValue: string;
	onChangeMaxValue: (value: string) => void;
	onChangeStartValue: (value: string) => void;
};

export const ValueFields = ({ maxValue, startValue, onChangeStartValue, onChangeMaxValue }: TValueFieldsProps) => {
	return (
		<StyledValueFields>
			<Field callBack={onChangeMaxValue} maxValue={maxValue} label='max-value' />
			<Field callBack={onChangeStartValue} startValue={startValue} label='start-value' />
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
