import { ChangeEvent } from 'react';
import { css, styled } from 'styled-components';
import { TValue } from '../../types/types';

type TFieldProps = {
	itemValue: TValue;
	callBack: (value: string) => void;
};

export const Field = ({ itemValue, callBack }: TFieldProps) => {
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		callBack(e.currentTarget.value);
	};
	return (
		<StyledField>
			<Label htmlFor=''>{itemValue.title}:</Label>
			<Input error={itemValue.error ? 'error' : ''} value={itemValue.value} onChange={onChange} type='number' />
		</StyledField>
	);
};

type TInputProps = {
	error: 'error' | '';
};

export const StyledField = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	width: 100%;
`;

const Label = styled.label`
	font-weight: 900;
	font-size: 30px;
	color: ${props => props.theme.colors.accent};
`;

const Input = styled.input<TInputProps>`
	max-width: 228px;
	width: 100%;
	padding: 10px 15px;
	border: 3px solid ${props => props.theme.colors.accent};
	border-radius: 5px;
	color: ${props => props.theme.colors.primary};
	font-weight: 900;
	text-align: center;
	${props =>
		props.error === 'error' &&
		css`
			border: 3px solid ${props => props.theme.colors.error};
			background-color: ${props => props.theme.colors.tertiary};
		`}
`;
