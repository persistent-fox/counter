import styled, { css } from 'styled-components';
import { TValue } from '../../types/types';

type TInfoBoardProps = {
	boardValue: TValue;
	boardError: boolean;
};

export const InfoBoard = ({ boardValue, boardError }: TInfoBoardProps) => {
	return (
		<StyledInfoBoard error={boardError && boardValue.value !== 0 ? 'error' : ''}>
			{boardValue.value !== 0 ? boardValue.value : "enter values and press 'set'"}
		</StyledInfoBoard>
	);
};

type TStyledInfoBoardProps = {
	error: string;
};

const StyledInfoBoard = styled.span<TStyledInfoBoardProps>`
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
	${props =>
		props.error === 'error' &&
		css`
			color: ${props => props.theme.colors.error};
		`}
`;
