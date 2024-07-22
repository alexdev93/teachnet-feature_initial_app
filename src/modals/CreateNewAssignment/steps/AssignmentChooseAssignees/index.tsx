import { Box, Grid } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'next-i18next';
import Button from 'src/components/common/Button';
import { FormikInitialValues } from 'src/modals/CreateNewAssignment/types';
import SearchWidget from 'src/modals/CreateNewAssignment/steps/AssignmentChooseAssignees/AssigneesSearchWidget';
import AddWidget from 'src/modals/CreateNewAssignment/steps/AssignmentChooseAssignees/AssigneesAddWidget';
import PreviewWidget from 'src/modals/CreateNewAssignment/steps/AssignmentChooseAssignees/AssigneesPreviewWidget';

const MOCK_STUDENTS = [
  {
    id: '1',
    name: 'Kyle Broflowski',
    isSelected: false,
    isAlreadyAssigned: false,
  },
  {
    id: '2',
    name: 'Stan Marsh',
    isSelected: false,
    isAlreadyAssigned: true,
  },
  {
    id: '3',
    name: 'Eric Cartman',
    isSelected: true,
    isAlreadyAssigned: false,
  },
  {
    id: '4',
    name: 'Kenny McCormick',
    isSelected: true,
    isAlreadyAssigned: true,
  },
  {
    id: '5',
    name: 'Butters Stotch',
    isSelected: false,
    isAlreadyAssigned: false,
  },
  {
    id: 'long-name',
    name: 'Long name Long name Long name Long name Long name Long name Long name Long name',
    isSelected: false,
    isAlreadyAssigned: false,
  },
  {
    id: '6',
    name: 'Wendy Testaburger',
    isSelected: true,
    isAlreadyAssigned: false,
  },
  {
    id: '7',
    name: 'Bebe Stevens',
    isSelected: true,
    isAlreadyAssigned: false,
  },
  {
    id: '8',
    name: 'Token Black',
    isSelected: false,
    isAlreadyAssigned: false,
  },
  {
    id: '9',
    name: 'Clyde Donovan',
    isSelected: true,
    isAlreadyAssigned: false,
  },
  {
    id: '10',
    name: 'Craig Tucker',
    isSelected: true,
    isAlreadyAssigned: false,
  },
];

interface NewAssignmentChooseAssigneesStepProps {
  formik: FormikProps<FormikInitialValues>;
  onPrev: () => void;
  onNext: () => void;
}

export default function NewAssignmentChooseAssigneesStep(
  props: NewAssignmentChooseAssigneesStepProps,
) {
  const { formik, onPrev, onNext } = props;
  const { t } = useTranslation();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} sx={{ maxHeight: 380 }}>
          <SearchWidget />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ maxHeight: 380 }}>
          <AddWidget
            loading={false}
            students={MOCK_STUDENTS}
            onChange={(student, action) => {
              console.info('Student: ', student, 'Action: ', action);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} mt={2} sx={{ maxHeight: 230 }}>
          <PreviewWidget students={MOCK_STUDENTS.filter(student => student.isSelected)} />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='flex-end'>
            <Button
              variant='outlined'
              sx={{ minWidth: '100px' }}
              style={{ marginRight: '8px' }}
              onClick={() => onPrev()}
            >
              {t('common:back')}
            </Button>
            <Button
              variant='contained'
              color='primary'
              sx={{ minWidth: '100px' }}
              onClick={() => {
                onNext();
              }}
            >
              {t('common:next')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
