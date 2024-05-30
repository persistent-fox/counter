import React from 'react';
import { styled } from 'styled-components';

type TButtonProps = {
	children: React.ReactNode;
	callBack: () => void;
};

export const Button = ({ children, callBack }: TButtonProps) => {
	return <StyledButton onClick={callBack}>{children}</StyledButton>;
};

export const StyledButton = styled.button`
	font-size: 30px;
	padding: 10px 20px;
	border-radius: 10px;
	color: ${props => props.theme.colors.primary};
	background-color: ${props => props.theme.colors.accent};
	font-weight: 900;
	line-height: 0.8;
	&:disabled {
		opacity: 0.5;
		cursor: no-drop;
	}
`;
