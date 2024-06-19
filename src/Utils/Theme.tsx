import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({
    palette: {
        primary: {
            main: '#56b53f',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#202020',
            paper: '#2f2f2f',
        },
        text: {
            primary: 'rgba(236,236,236,0.87)',
            secondary: 'rgba(216,216,216,0.54)',
            disabled: 'rgba(123,123,123,0.38)'
        },
    },
    typography: {
        fontFamily: '"Crimson Text"',
    },
})
