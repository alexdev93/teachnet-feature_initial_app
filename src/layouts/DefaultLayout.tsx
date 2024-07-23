import React, { useState } from 'react';
import {
  IconButton,
  Drawer as MuiDrawer,
  List,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  useTheme,
  ListItemButton,
  Box,
  Theme,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import LogoSvg from 'src/svgs/Logo';
import { CSSObject } from '@emotion/react';
import DashboardIcon from 'src/svgs/dashboard/DashboardIcon';
import ClassesIcon from 'src/svgs/dashboard/ClassesIcon';
import AssignmentsIcon from 'src/svgs/dashboard/AssignmentsIcon';

import { TFunction, useTranslation } from 'next-i18next';
import useIsMobile from 'src/components/hooks/useIsMobile';
import GoBackButton from 'src/components/common/GoBackButton';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AppBar from 'src/components/layout/AppBar';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Main = styled('main', {
  shouldForwardProp: prop => typeof prop === 'string' && !['open', 'isMobile'].includes(prop),
})<{
  open?: boolean;
  isMobile?: boolean;
}>(({ theme, open, isMobile }) => ({
  position: 'relative',
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create(['margin-left', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  ...(!isMobile && {
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
  }),
  [theme.breakpoints.up('sm')]: {
    marginLeft: `calc(${theme.spacing(8)} + 1px)`,
  },
  ...(open && {
    transition: theme.transitions.create(['margin-left', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

const getRoutes = (t: TFunction) => [
  {
    id: 'dashboard',
    path: '/dashboard',
    icon: DashboardIcon,
    title: t('common:dashboard'),
  },
  {
    id: 'classes',
    path: '/classes',
    icon: ClassesIcon,
    title: t('common:ClassRooms'),
  },
  {
    id: 'assignments',
    path: '/assignments',
    icon: AssignmentsIcon,
    title: t('common:assignments'),
  },
];

const getGoBackBtnPosition = (isDrawerOpen: boolean, isMobile: boolean) => {
  // Mobile go back button not supported at the moment
  if (isMobile) return;
  if (isDrawerOpen) {
    return {
      left: `${drawerWidth + 12}px`,
      top: '90px',
    };
  }

  return {
    left: `${80}px`,
    top: '90px',
  };
};

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation('common');
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const getIcon = () => {
    if (theme.direction === 'ltr') {
      if (open) return <ChevronLeftIcon />;

      return <ChevronRightIcon />;
    }
    if (open) return <ChevronRightIcon />;

    return <ChevronLeftIcon />;
  };

  const onPageClick = (text: string) => {
    console.log(`Navigating to ${text}`);
    if (isMobile) setOpen(false);
  };

  const routes = getRoutes(t);

  const isRootRoute =
    router.pathname === '/' || !!routes.find(route => route.path === router.pathname);

  return (
    <div style={{ display: 'flex', backgroundColor: theme.palette.background.default }}>
      <CssBaseline />
      <AppBar handleDrawerToggle={handleDrawerToggle} isMobile={isMobile} isDrawerOpen={open} />
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <Box
            display='flex'
            justifyContent='space-between'
            width='100%'
            minHeight={100}
            alignItems='center'
          >
            {open && (
              <>
                <LogoSvg style={{ width: '180px' }} />
                <IconButton onClick={handleDrawerToggle}>{getIcon()}</IconButton>
              </>
            )}
          </Box>
        </DrawerHeader>
        <List>
          {routes.map(route => {
            const isCurrentRoute = router.pathname === route.path;

            return (
              <Link
                href={route.path}
                key={route.id}
                style={{ textDecoration: 'none', color: 'unset' }}
              >
                <ListItemButton
                  onClick={() => onPageClick(route.id)}
                  sx={{
                    backgroundColor: isCurrentRoute ? theme.palette.action.selected : 'unset',
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                    '& .MuiListItemIcon-root': { color: theme.palette.primary.dark },
                  }}
                >
                  <ListItemIcon sx={{ marginLeft: '6px' }}>{<route.icon />}</ListItemIcon>
                  <ListItemText
                    primary={route.title}
                    sx={{
                      '.MuiTypography-root': {
                        color: theme.palette.text.primary,
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Drawer>
      {!isRootRoute && !isMobile && (
        <GoBackButton
          styles={{
            position: 'absolute',
            zIndex: 1,
            transition: theme.transitions.create(['left', 'top'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...getGoBackBtnPosition(open, isMobile),
          }}
          onClick={() => router.back()}
        />
      )}
      <Main open={open} isMobile={isMobile}>
        <DrawerHeader />
        {children}
      </Main>
    </div>
  );
};

export default DefaultLayout;
