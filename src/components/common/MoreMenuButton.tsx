import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from 'next-i18next';

export default function MoreMenuButton({
  id,
  options,
}: {
  id: string;
  options: Array<{ id: string; onClick: () => void; label: string }>;
}) {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        aria-controls={open ? 'menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={id}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map(option => (
          <MenuItem
            key={option.id}
            onClick={() => {
              option.onClick();
              handleClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
