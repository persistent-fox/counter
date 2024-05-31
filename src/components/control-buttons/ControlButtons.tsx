import { styled } from 'styled-components';
import { Button } from '../button/Button';
import { TDisabledBtn } from '../../types/types';
import { inc, reset } from '../../mock/data';

type TControlButtonsProps = {
	disabledBtns: Record<string, TDisabledBtn>;
	onChangeIncHandler: () => void;
	onChangeResetHandler: () => void;
};

export const ControlButtons = ({ disabledBtns, onChangeIncHandler, onChangeResetHandler }: TControlButtonsProps) => {
	return (
		<StyledControlButtons>
			<Button disabled={disabledBtns[inc].disabled} callBack={onChangeIncHandler}>
				inc
			</Button>
			<Button disabled={disabledBtns[reset].disabled} callBack={onChangeResetHandler}>
				reset
			</Button>
		</StyledControlButtons>
	);
};

const StyledControlButtons = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 40px;
	width: 100%;
	padding: 10px 30px;
	border-radius: 10px;
	border: 3px solid ${props => props.theme.colors.accent};
`;
