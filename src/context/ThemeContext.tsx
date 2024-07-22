// /context/ThemeContext.tsx
import React, { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider, Theme } from '@mui/material/styles';
import { coolTheme, darkTheme, eduQuizTheme, lightTheme, neutralTheme, warmTheme } from 'src/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  toggleTheme: () => void;
  mode: ThemeMode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({ toggleTheme, mode }), [mode]);

  const theme: Theme = mode === 'light' ? eduQuizTheme : darkTheme;

  theme.direction = 'ltr';

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }

  return context;
};
