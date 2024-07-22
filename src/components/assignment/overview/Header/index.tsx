import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Button from 'src/components/common/Button';
import { useTranslation } from 'next-i18next';
import { format } from 'date-fns';
import useModalStore from 'src/store/modal';
import { EModalID } from 'src/modals/ModalsFactory';
import AssignmentOverviewStatistics from 'src/components/assignment/overview/Header/Statistics';
import { Assignment } from 'src/types/assignment';

Chart.register(ArcElement, Tooltip, Legend);

const HeaderBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const assignment: Assignment = {
  title: 'Homework 1',
  description: 'Teaches you the basics of gardening',
  type: 'homework',
  passingGrade: 80,
  avgClassGrade: 56,
  assignees: {
    totalCount: 20,
  },
  class: {
    size: 25,
  },
  status: 'inProgress',
};

const assignees = [
  { name: 'Student 1', status: 'Turned In' },
  { name: 'Student 2', status: 'Graded' },
  { name: 'Student 3', status: 'In Progress' },
  { name: 'Student 4', status: 'Overdue' },
];

const statusCounts = {
  turnedIn: assignees.filter(a => a.status === 'Turned In').length,
  graded: assignees.filter(a => a.status === 'Graded').length,
  inProgress: assignees.filter(a => a.status === 'In Progress').length,
  overdue: assignees.filter(a => a.status === 'Overdue').length,
};

const AssignmentOverviewHeader = () => {
  const { t } = useTranslation();
  const openModal = useModalStore(store => store.openModal);
  const closeModal = useModalStore(store => store.closeModal);

  const pieData = {
    labels: [
      t('assignments:submissionStatuses.turned-in'),
      t('assignments:submissionStatuses.graded'),
      t('assignments:submissionStatuses.in-progress'),
      t('assignments:submissionStatuses.overdue'),
    ],
    datasets: [
      {
        data: [
          statusCounts.turnedIn,
          statusCounts.graded,
          statusCounts.inProgress,
          statusCounts.overdue,
        ],
        backgroundColor: ['#36A2EB', '#4BC0C0', '#FFCE56', '#FF6384'],
      },
    ],
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12} xl={7}>
        <Grid container>
          <Grid item>
            <HeaderBox>
              <Typography variant='h4'>{assignment.title}</Typography>
            </HeaderBox>
            <Typography variant='h5' gutterBottom>
              {assignment.description}
            </Typography>
            <Box display='inline-flex' alignItems='center'>
              <Typography variant='subtitle1' gutterBottom>
                {t('common:dueDate')}
              </Typography>
              <Typography variant='body1' gutterBottom sx={{ marginLeft: '4px' }}>
                {' '}
                {format(new Date('2022-02-02'), 'yyyy-MM-dd hh:mm a')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container id='statistic-container' mt={3}>
          <Grid item>
            <AssignmentOverviewStatistics assignment={assignment} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={3} xl={2}>
        <Grid container justifyContent='center'>
          <Grid item>
            <Box p={2} width={280} height={280}>
              <Pie data={pieData} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={3} xl={3} container alignItems='center'>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box display='flex' justifyContent='flex-end'>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                sx={{ maxWidth: 300 }}
                onClick={() =>
                  openModal(EModalID.CONFIRM_ACTION, {
                    title: t('assignments:generateReport'),
                    body: t('assignments:generateReportModalBody'),
                    onSubmit: () => {
                      console.info('submit report');
                      closeModal();
                    },
                  })
                }
              >
                {t('assignments:generateReport')}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display='flex' justifyContent='flex-end'>
              <Button
                fullWidth
                variant='outlined'
                sx={{ maxWidth: 300 }}
                onClick={() =>
                  openModal(EModalID.ASSIGNMENTS_EXTEND_DUE_DATE, {
                    onSubmit: () => {
                      console.info('extend due date');
                      closeModal();
                    },
                    onCancel: closeModal,
                  })
                }
              >
                {t('assignments:extendDueDate')}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display='flex' justifyContent='flex-end'>
              <Button
                fullWidth
                variant='text'
                color='error'
                sx={{ maxWidth: 300 }}
                onClick={() => {
                  openModal(EModalID.CONFIRM_DELETION_ACTION, {
                    title: t('assignments:confirmDeleteAssignmentModalTitle'),
                    body: t('assignments:confirmDeleteAssignmentModalBody'),
                    onSubmit: () => {
                      console.info('delete assignment');
                      closeModal();
                    },
                    onCancel: closeModal,
                  });
                }}
              >
                {t('assignments:deleteAssignment')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AssignmentOverviewHeader;
