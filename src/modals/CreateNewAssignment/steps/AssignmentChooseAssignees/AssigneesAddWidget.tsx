import { List } from '@mui/material';
import AssigneesAddWidgetListItem, {
  Skeleton as AssigneesAddWidgetListItemSkeleton,
} from 'src/modals/CreateNewAssignment/steps/AssignmentChooseAssignees/AssigneesAddWidgetListItem';

export interface AssigneeSearchWidgetStudent {
  id: string;
  name: string;
  isSelected: boolean;
  isAlreadyAssigned: boolean;
}

export type onChange = (student: AssigneeSearchWidgetStudent, action: 'add' | 'remove') => void;

interface Props {
  students: AssigneeSearchWidgetStudent[];
  onChange: onChange;
  loading?: boolean;
}

export default function AssigneesAddWidget(props: Props) {
  const { students, onChange, loading } = props;

  return (
    <List
      sx={theme => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        padding: 2,
        height: '100%',
        boxShadow: theme.shadows[1],
        overflowY: 'auto',
      })}
    >
      {loading && (
        <>
          {[...Array(6)].map((_, index) => (
            <AssigneesAddWidgetListItemSkeleton key={`skeleton-loader-${index}`} />
          ))}
        </>
      )}
      {students.map(student => (
        <AssigneesAddWidgetListItem key={student.id} student={student} onChange={onChange} />
      ))}
    </List>
  );
}
