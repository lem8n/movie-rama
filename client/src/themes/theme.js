import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
	palette: {
		secondary: red,
	},
	typography: {
		button: {
			textTransform: 'none',
		},
	},
});
