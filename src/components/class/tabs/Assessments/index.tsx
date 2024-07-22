import { Box, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { AssessmentTypeFilter } from 'src/components/class/tabs/Assessments/Filters';
import AssignmentCardAdmin from 'src/components/class/tabs/Assignments/AssignmentCardAdmin';
import Button from 'src/components/common/Button';
import SearchInput from 'src/components/common/SearchInput';
import { EModalID } from 'src/modals/ModalsFactory';
import useModalStore from 'src/store/modal';

export default function ClassAssessments() {
  const { t } = useTranslation();
  const openModal = useModalStore(state => state.openModal);

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={5} lg={8}>
          <SearchInput fullWidth placeholder={t('classes:assessments.searchForAssessments')} />
        </Grid>
        <Grid item xs={6} sm={4} md={2} lg={2}>
          <AssessmentTypeFilter onChange={option => console.log('option: ', option)} />
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Link href='/assessments/new' style={{ textDecoration: 'none' }}>
            <Button variant='contained' fullWidth sx={{ height: '100%' }}>
              {t('classes:assessments.newAssessment')}
            </Button>
          </Link>
        </Grid>
      </Grid>
      {/* <Grid container spacing={1} mt={3}>
        {[
          {
            id: 1,
            title: 'Homework 1',
            description: 'Teaches',
            dueDate: new Date('2022-02-02'),
          },
          {
            id: 2,
            title: 'Homework 2',
            description: 'Teaches',
            dueDate: new Date('2022-02-02'),
          },
        ].map(assignment => (
          <Grid item xs={12} key={assignment.id}>
            <Link href='/assignments/123' style={{ textDecoration: 'none', color: 'unset' }}>
              <AssignmentCardAdmin
                title={assignment.title}
                description={assignment.description}
                dueDate={assignment.dueDate}
                statistics={{
                  assigned: 10,
                  turnedIn: 5,
                  graded: 5,
                }}
              />
            </Link>
          </Grid>
        ))}
      </Grid> */}
    </Box>
  );
}
