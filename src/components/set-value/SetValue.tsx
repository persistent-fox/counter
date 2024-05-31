import { styled } from 'styled-components';
import { Button } from '../button/Button';
import { TDisabledBtn, TValue } from '../../types/types';

type TSetValueProps = {
	setValuesHandler: () => void;
	values: Record<string, TValue>;
	disabledBtns: TDisabledBtn;
};

export const SetValue = ({ disabledBtns, setValuesHandler }: TSetValueProps) => {
	return (
		<StyledSetValue>
			<Button disabled={disabledBtns.disabled} callBack={setValuesHandler}>
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
