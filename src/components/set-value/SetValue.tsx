import { styled } from 'styled-components';
import { Button } from '../button/Button';
import { useSelector } from 'react-redux';
import { TRootReducer } from '../../store/store';
import { set } from '../../mock/data';

type TSetValueProps = {
	setValuesHandler: () => void;
};

export const SetValue = ({ setValuesHandler }: TSetValueProps) => {
	const setBtnState = useSelector<TRootReducer, boolean>(state => state.buttons[set].disabled);
	return (
		<StyledSetValue>
			<Button disabled={setBtnState} callBack={setValuesHandler}>
				set
			</Button>
		</StyledSetValue>
	);
};

const StyledSetValue = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 10px 30px;
	border-radius: 10px;
	border: 3px solid ${props => props.theme.colors.accent};
`;
