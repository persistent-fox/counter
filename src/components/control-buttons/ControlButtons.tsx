import { styled } from 'styled-components';
import { Button } from '../button/Button';

type TControlButtonsProps = {
	onChangeIncHandler: () => void;
};

export const ControlButtons = ({ onChangeIncHandler }: TControlButtonsProps) => {
	return (
		<StyledControlButtons>
			<Button callBack={onChangeIncHandler}>inc</Button>
			<Button callBack={() => {}}>reset</Button>
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