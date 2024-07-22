import { Close } from '@mui/icons-material';
import { Box, IconButton, List } from '@mui/material';
import AvatarListItem from 'src/components/common/AvatarListItem';
import { AssigneeSearchWidgetStudent } from 'src/modals/CreateNewAssignment/steps/AssignmentChooseAssignees/AssigneesAddWidget';

export default function AssigneesPreviewWidget({
  students,
}: {
  students: AssigneeSearchWidgetStudent[];
}) {
  return (
    <Box
      sx={theme => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        padding: 2,
        height: '100%',
        boxShadow: theme.shadows[1],
        overflowY: 'auto',
      })}
    >
      <List>
        {students.map(student => (
          <AvatarListItem
            key={student.id}
            name={student.name}
            avatarSrc='https://via.placeholder.com/40'
            secondaryAction={
              <IconButton edge='end'>
                <Close />
              </IconButton>
            }
          />
        ))}
      </List>
    </Box>
  );
}
