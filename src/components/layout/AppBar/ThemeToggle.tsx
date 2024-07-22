// /components/ThemeToggle.tsx
import React from 'react';
import { IconButton } from '@mui/material';
import { useThemeContext } from '../../../context/ThemeContext';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeToggle: React.FC = () => {
  const { toggleTheme, mode } = useThemeContext();

  return (
    <IconButton
      onClick={toggleTheme}
      // color='inherit' // Parent component's color is grey, doesn't look too good. Comment it out for now
    >
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
};

export default ThemeToggle;
