import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InfoIcon from '@mui/icons-material/Info';
import { Avatar, Box, ListItem, Popover, Skeleton as MUISkeleton, Typography } from '@mui/material';
import Button from 'src/components/common/Button';
import {
  AssigneeSearchWidgetStudent,
  onChange,
} from 'src/modals/CreateNewAssignment/steps/AssignmentChooseAssignees/AssigneesAddWidget';
import { stringAvatar } from 'src/utils/avatar';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface Props {
  student: AssigneeSearchWidgetStudent;
  onChange: onChange;
}

function AlreadyAssignedInfoPopup() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Button variant='contained' size='small' color='primary' disabled>
          <InfoIcon />
        </Button>
      </Box>
      <Popover
        id='already-assigned-info-popup'
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography
          variant='body2'
          sx={{
            padding: 1,
          }}
        >
          {t('assignments:alreadyAssigned')}
        </Typography>
      </Popover>
    </>
  );
}

export default function AssigneesAddWidgetListItem({ student, onChange }: Props) {
  return (
    <ListItem divider sx={theme => ({})}>
      <Avatar
        alt='User'
        src='https://via.placeholder.com/40'
        sx={{ width: 40, height: 40, mr: 2 }}
        {...stringAvatar(student.name)}
      />
      <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
        <div>
          <Typography
            variant='body1'
            color={student.isAlreadyAssigned ? 'textSecondary' : 'textPrimary'}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '20vw', // Hack to prevent long names from breaking the layout
            }}
          >
            {student.name}{' '}
          </Typography>
        </div>
        <Box id='action-section' sx={{ minWidth: '60px', textAlign: 'right' }}>
          {student.isAlreadyAssigned ? (
            <AlreadyAssignedInfoPopup />
          ) : (
            <Button
              variant={student.isSelected ? 'outlined' : 'contained'}
              size='small'
              color={student.isSelected ? 'warning' : 'primary'}
              onClick={() => onChange(student, student.isSelected ? 'remove' : 'add')}
            >
              {!student.isSelected && <AddIcon />}
              {student.isSelected && <RemoveIcon />}
            </Button>
          )}
        </Box>
      </Box>
    </ListItem>
  );
}

export function Skeleton() {
  return (
    <ListItem divider>
      <MUISkeleton variant='circular' width={40} height={40} sx={{ mr: 2 }} />
      <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
        <Box display='flex' flexDirection='column' width='100%'>
          <MUISkeleton variant='text' width='60%' />
        </Box>
        <Box id='action-section' sx={{ minWidth: '60px', textAlign: 'right' }}>
          <MUISkeleton variant='rounded' width={60} height={44} />
        </Box>
      </Box>
    </ListItem>
  );
}
