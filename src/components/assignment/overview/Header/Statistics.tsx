import React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { Assignment } from 'src/types/assignment';
import { useTranslation } from 'next-i18next';
import HomeworkIcon from 'src/svgs/classes/HomeworkIcon';

function Statistic({
  title,
  value,
  iconComponent,
}: {
  title: string;
  value: string | number;
  iconComponent?: React.ReactNode;
}) {
  return (
    <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
      <Typography variant='body2' color='text.secondary'>
        {title}
      </Typography>
      <Box display='flex' alignItems='center'>
        {iconComponent}
        <Typography
          variant='h6'
          color='text.primary'
          sx={theme => ({
            marginLeft: !iconComponent ? 'unset' : theme.spacing(1),
          })}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

interface Props {
  assignment: Assignment;
}

export default function AssignmentOverviewStatistics(props: Props) {
  const { t } = useTranslation();
  const { assignment } = props;

  return (
    <Grid
      container
      columnSpacing={3}
      alignItems='center'
      sx={theme => ({
        border: `1px solid ${theme.palette.divider}`,
        padding: 2,
        ml: 1,
        borderRadius: 1,
        display: 'flex',
        flexWrap: 'nowrap',
        width: 'auto',
        maxWidth: '100%',
      })}
    >
      <Grid item>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Statistic
            title={t('assignments:type')}
            value={t(`assignments:${assignment.type}`)}
            iconComponent={<HomeworkIcon />}
          />
        </Box>
      </Grid>
      <Grid item>
        <Divider orientation='vertical' flexItem sx={{ minHeight: '100px' }} />
      </Grid>
      <Grid item>
        <Box display='flex' flexDirection='column'>
          <Statistic title={t('assignments:passingGrade')} value={`%${assignment.passingGrade}`} />
        </Box>
      </Grid>
      <Grid item>
        <Divider orientation='vertical' flexItem sx={{ minHeight: '100px' }} />
      </Grid>
      <Grid item>
        <Box display='flex' flexDirection='column'>
          <Statistic
            title={t('assignments:averageClassGrade')}
            value={`%${assignment.avgClassGrade}`}
          />
        </Box>
      </Grid>
      <Grid item>
        <Divider orientation='vertical' flexItem sx={{ minHeight: '100px' }} />
      </Grid>
      <Grid item>
        <Box display='flex' flexDirection='column'>
          <Statistic
            title={t('assignments:totalAssignees')}
            value={`${assignment.assignees.totalCount} / ${assignment.class.size}`}
          />
        </Box>
      </Grid>
      <Grid item>
        <Divider orientation='vertical' flexItem sx={{ minHeight: '100px' }} />
      </Grid>
      <Grid item>
        <Box display='flex' flexDirection='column'>
          <Statistic
            title={t('assignments:status')}
            value={t(`assignments:statuses.${assignment.status}`)}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
