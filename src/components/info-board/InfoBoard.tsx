import React from 'react';
import styled from 'styled-components';

type TInfoBoardProps = {
	title: string;
	boardValue: string;
};

export const InfoBoard = ({ title, boardValue }: TInfoBoardProps) => {
	return <StyledInfoBoard>{boardValue ? boardValue : title}</StyledInfoBoard>;
};

const StyledInfoBoard = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	padding: 10px 15px;
	border-radius: 5px;
	min-height: 134px;
	font-size: 30px;
	font-weight: 900;
	text-align: center;
	background-color: transparent;
	border: 3px solid ${props => props.theme.colors.accent};
	color: ${props => props.theme.colors.accent};
`;
