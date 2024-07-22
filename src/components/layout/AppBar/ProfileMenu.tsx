import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import { AccountCircle, Settings, Logout } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

const ProfileMenu: React.FC = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    console.log('Go to profile');
    handleClose();
  };

  const handleSettings = () => {
    console.log('Go to settings');
    handleClose();
  };

  const handleLogout = () => {
    console.log('Log out');
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-controls='profile-menu'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'
      >
        <Avatar src='https://randomuser.me/api/portraits/men/1.jpg' />
      </IconButton>
      <Menu id='profile-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={t('common:myProfile')} />
        </MenuItem>
        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary={t('common:settings')} />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary={t('common:logout')} />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
