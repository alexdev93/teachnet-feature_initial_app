import React from 'react';
import { AppBar as MuiAppBar, Toolbar, IconButton, useTheme, Box, Grid } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import LogoSvg from 'src/svgs/Logo';
import ThemeToggle from 'src/components/layout/AppBar/ThemeToggle';
import LanguageSelect from 'src/components/layout/AppBar/LanguageSelect';
import NotificationsButton from 'src/components/layout/AppBar/NotificationsButton';
import ProfileMenu from 'src/components/layout/AppBar/ProfileMenu';
import Link from 'next/link';

interface AppBarProps {
  isDrawerOpen?: boolean;
  drawerWidth?: string;
}
const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'isDrawerOpen' && prop !== 'drawerWidth',
})<AppBarProps>(({ theme, isDrawerOpen, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + (isDrawerOpen ? 0 : 1),
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  ...(isDrawerOpen && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  isDrawerOpen?: boolean;
  handleDrawerToggle?: () => void;
  isMobile?: boolean;
}

export default function AppBar(props: Props) {
  const theme = useTheme();

  const { isDrawerOpen, isMobile, handleDrawerToggle } = props;

  return (
    <AppBarStyled position='fixed' isDrawerOpen={isDrawerOpen}>
      <Toolbar>
        {handleDrawerToggle && (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
            edge='start'
            sx={{
              color: theme.palette.text.primary,
              marginRight: 5,
              ...(isDrawerOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        {!isMobile && (
          <Box sx={{ flexGrow: 1 }}>
            {!isDrawerOpen && (
              <Link href='/dashboard' style={{ textDecoration: 'none' }}>
                <LogoSvg style={{ width: '160px' }} />
              </Link>
            )}
          </Box>
        )}
        <Grid container justifyContent='flex-end' alignItems='center' spacing={1}>
          <Grid item>
            <ThemeToggle />
          </Grid>
          <Grid item>
            <LanguageSelect />
          </Grid>
          <Grid item>
            <NotificationsButton />
          </Grid>
          <Grid item>
            <ProfileMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBarStyled>
  );
}
