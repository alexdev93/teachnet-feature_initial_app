import { Manrope, Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

// Date Picker Theme TS support (see https://mui.com/x/react-date-pickers/base-concepts/#theme-augmentation)
import type {} from '@mui/x-date-pickers/themeAugmentation';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const manrope = Manrope({
  subsets: ['latin'],
});

const shape = {
  borderRadius: 15,
};

const typography = {
  h1: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#000000', // Black for headings
  },
  body1: {
    fontSize: '1rem',
    // color: '#5f6368', // Medium Gray for body text
  },
  fontFamily: manrope.style.fontFamily,
  shape,
};

// export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // dark mode palette
    primary: {
      main: '#007BFF', // The blue used in borders and buttons
    },
    secondary: {
      main: '#292929',
    },
    background: {
      // default: '#121212', // Dark background for the main content area
      default: '#161616',
      paper: '#1D1D1D',
    },
    text: {
      primary: '#FFFFFF', // White text for dark mode
      secondary: '#B0B0B0', // A lighter gray for secondary text in dark mode
    },
  },
  typography,
  shape,
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // light mode palette
    primary: {
      main: '#007BFF', // The blue used in borders and buttons
    },
    secondary: {
      main: '#F0F0F0', // The light gray used in the sidebar
    },
    background: {
      // default: '#FFFFFF', // The white used in the main content area
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000', // The black or dark gray used for text
      secondary: '#666666', // A lighter gray for secondary text
    },
  },
  typography,
  shape,
});

export const neutralTheme = createTheme({
  palette: {
    primary: {
      main: '#607d8b', // Blue Gray
    },
    secondary: {
      main: '#8e24aa', // Purple
    },
    background: {
      default: '#f5f5f5', // Light Gray
      paper: '#ffffff', // White
    },
    text: {
      primary: '#000000', // Black
    },
  },
  typography,
  shape,
});

export const warmTheme = createTheme({
  palette: {
    primary: {
      main: '#ff5722', // Deep Orange
    },
    secondary: {
      main: '#ffc107', // Amber
    },
    background: {
      // default: '#fff8e1', // Light Amber
      paper: '#ffffff', // White
    },
    text: {
      primary: '#000000', // Black
    },
  },
  typography,
  shape,
});

export const coolTheme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green
    },
    secondary: {
      main: '#00bcd4', // Cyan
    },
    background: {
      // default: '#e0f.7fa', // Light Cyan
      paper: '#ffffff', // White
    },
    text: {
      primary: '#000000', // Black
    },
  },
  typography,
  shape,
});

export const eduQuizTheme = createTheme({
  palette: {
    primary: {
      main: '#617AFA', // Accent Blue
    },
    secondary: {
      main: '#EDF0F2', // Gray for text
    },
    background: {
      // default: '#f4f6f8', // Light Gray for background
      default: '#ffffff', // White for background
      paper: '#ffffff', // White for cards and paper
    },
    text: {
      primary: '#000000', // Black for main text
      secondary: '#5f6368', // Medium Gray for secondary text
    },
    action: {
      hover: '#e0f2ff', // Light Blue hover effect
    },
    divider: '#E5E8EB',
  },
  typography,
  shape,
});
