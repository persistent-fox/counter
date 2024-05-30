import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle<{
	theme: typeof theme;
}>`
	*, *::before, *::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		background-color: ${props => props.theme.colors.primary};
		font-family: "Kanit", sans-serif;
		font-weight: 800;
	}

	button {
		border: none;
		cursor: pointer;
	}

`;
