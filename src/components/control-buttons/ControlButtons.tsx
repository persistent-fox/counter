import { styled } from 'styled-components';
import { Button } from '../button/Button';
import { TDisabledBtn } from '../../types/types';
import { inc, reset } from '../../mock/data';
import { useSelector } from 'react-redux';
import { TRootReducer } from '../../store/store';

type TControlButtonsProps = {
	onChangeIncHandler: () => void;
	onChangeResetHandler: () => void;
};

export const ControlButtons = ({ onChangeIncHandler, onChangeResetHandler }: TControlButtonsProps) => {
	const controlButtons = useSelector<TRootReducer, Record<string, TDisabledBtn>>(state => state.buttons);
	return (
		<StyledControlButtons>
			<Button disabled={controlButtons[inc].disabled} callBack={onChangeIncHandler}>
				inc
			</Button>
			<Button disabled={controlButtons[reset].disabled} callBack={onChangeResetHandler}>
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
