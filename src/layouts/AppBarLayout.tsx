import React from 'react';
import { AppBar as MuiAppBar, Toolbar, useTheme, Box, Grid } from '@mui/material';

import { styled } from '@mui/material/styles';
import LogoSvg from 'src/svgs/Logo';
import ThemeToggle from 'src/components/layout/AppBar/ThemeToggle';

import LanguageSelect from 'src/components/layout/AppBar/LanguageSelect';
import NotificationsButton from 'src/components/layout/AppBar/NotificationsButton';
import ProfileMenu from 'src/components/layout/AppBar/ProfileMenu';
import AppBar from 'src/components/layout/AppBar';

interface AppBarProps {
  open?: boolean;
}

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Main = styled('main', {
  shouldForwardProp: prop => typeof prop === 'string' && !['open', 'isMobile'].includes(prop),
})<{
  open?: boolean;
  isMobile?: boolean;
}>(({ theme }) => ({
  position: 'relative',
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create(['margin-left', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const AppBarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return (
    <div style={{ display: 'flex', backgroundColor: theme.palette.background.default }}>
      <AppBar />
      <Main>{children}</Main>
    </div>
  );
};

export default AppBarLayout;
