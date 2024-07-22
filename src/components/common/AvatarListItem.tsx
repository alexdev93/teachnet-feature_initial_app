import { Avatar, Box, ListItem, ListItemBaseProps, Typography } from '@mui/material';
import { stringAvatar } from 'src/utils/avatar';

export default function AvatarListItem({
  name,
  avatarSrc,
  secondaryAction,
}: {
  name: string;
  avatarSrc: string;
  secondaryAction?: ListItemBaseProps['secondaryAction'];
}) {
  return (
    <ListItem divider sx={theme => ({})} secondaryAction={secondaryAction}>
      <Avatar
        alt='User'
        src={avatarSrc}
        sx={{ width: 40, height: 40, mr: 2 }}
        {...stringAvatar(name)}
      />
      <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
        <div>
          <Typography
            variant='body1'
            color='textPrimary'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '20vw', // Hack to prevent long names from breaking the layout
            }}
          >
            {name}
          </Typography>
        </div>
        {/* <Box id='action-section' sx={{ minWidth: '60px', textAlign: 'right' }}>
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
      </Box> */}
      </Box>
    </ListItem>
  );
}
