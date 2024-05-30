import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

type TFieldProps = {
	label: string;
	maxValue?: string;
	startValue?: string;
	callBack: (value: string) => void;
};

export const Field = ({ label, callBack }: TFieldProps) => {
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		callBack(e.currentTarget.value);
	};
	return (
		<StyledField>
			<Label htmlFor=''>{label}:</Label>
			<Input onChange={onChange} type='number' />
		</StyledField>
	);
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

const Input = styled.input`
	max-width: 228px;
	width: 100%;
	padding: 10px 15px;
	border: 3px solid ${props => props.theme.colors.accent};
	border-radius: 5px;
	color: ${props => props.theme.colors.primary};
	font-weight: 900;
	text-align: center;
`;
