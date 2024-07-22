import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Divider,
  Avatar,
  Box,
  Button,
  useTheme,
} from '@mui/material';
import NotificationsIcon from 'src/svgs/NotificationsIcon';
// import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';

const notifications = [
  {
    id: 1,
    message: 'New message from John',
    timestamp: '2 mins ago',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    message: 'Meeting at 3 PM',
    timestamp: '1 hour ago',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    message: 'New comment on your post',
    timestamp: '3 hours ago',
    profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  // Add more notifications as needed
];

const NotificationsButton: React.FC = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationList, setNotificationList] = useState(notifications);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewAll = () => {
    console.log('View all notifications');
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls='notifications-menu'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'
        sx={theme => ({
          backgroundColor: theme.palette.secondary.main,
          borderRadius: 1,
          minWidth: '45px',
          minHeight: '40px',
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
          },
        })}
      >
        <Badge badgeContent={notificationList.length} color='error'>
          <NotificationsIcon
            svgProps={{ transform: 'scale(1.3)', color: theme.palette.text.primary }}
          />
        </Badge>
      </Button>
      <Menu
        id='notifications-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 55 * 4.5,
              width: '40ch',
            },
          },
        }}
      >
        {notificationList.slice(0, 5).map(notification => (
          <MenuItem key={notification.id}>
            <ListItemIcon
              sx={theme => ({
                marginRight: theme.spacing(1),
              })}
            >
              <Avatar src={notification.profilePicture} />
            </ListItemIcon>
            <ListItemText primary={notification.message} secondary={notification.timestamp} />
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleViewAll}>
          <ListItemText primary='View All' />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NotificationsButton;
