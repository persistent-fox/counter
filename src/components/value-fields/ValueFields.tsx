import { styled } from 'styled-components';
import { Field, StyledField } from '../field/Field';
import { TValue } from '../../types/types';
import { board } from '../../mock/data';

type TValueFieldsProps = {
	values: Record<string, TValue>;
	onChangeValue: (key: string, value: string) => void;
};

export const ValueFields = ({ values, onChangeValue }: TValueFieldsProps) => {
	return (
		<StyledValueFields>
			{Object.values(values)
				.filter(itemValue => itemValue.id !== board)
				.map(itemValue => {
					const onChangeValueByType = (value: string) => {
						onChangeValue(itemValue.id, value);
					};
					return <Field key={itemValue.id} callBack={onChangeValueByType} itemValue={itemValue} />;
				})}
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
