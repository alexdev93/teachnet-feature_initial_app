import React from 'react';
import { Typography, Grid, Divider } from '@mui/material';
import { Box } from '@mui/system';
import HomeworkIcon from 'src/svgs/classes/HomeworkIcon';
import { format } from 'date-fns';
import { useTranslation } from 'next-i18next';

// Define a type for the props
type AssignmentCardAdminProps = {
  title: string;
  description: string;
  dueDate: Date;
  onClick?: () => void;
  disabled?: boolean;
  statistics: {
    assigned: number;
    turnedIn: number;
    graded: number;
  };
};

function Statistic({ title, value }: { title: string; value: number }) {
  return (
    <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
      <Typography variant='h4' color='text.primary'>
        {value}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {title}
      </Typography>
    </Box>
  );
}

const AssignmentCardAdmin: React.FC<AssignmentCardAdminProps> = ({
  title,
  description,
  dueDate,
  onClick,
  disabled,
  statistics,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={theme => ({
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        cursor: !disabled ? 'pointer' : 'auto',
        boxShadow: 'none',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      })}
      onClick={onClick}
    >
      <Box
        sx={theme => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          marginLeft: 2,
          marginRight: 3,
        })}
      >
        <HomeworkIcon transform='scale(1.5)' />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box display='flex' justifyContent='space-between'>
          <Box>
            <Typography variant='h6' component='div'>
              {title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {description}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {`${t('classes:assignments.dueDate')}: ${format(dueDate, 'yyyy-MM-dd HH:mm')}`}
            </Typography>
          </Box>
          <Grid container spacing={2} justifyContent='flex-end' alignItems='center'>
            <Grid item>
              <Statistic title={t('assignments:assigned')} value={statistics.assigned} />
            </Grid>
            <Grid item height='100%'>
              <Divider orientation='vertical' flexItem sx={{ minHeight: '100%' }} />
            </Grid>
            <Grid item>
              <Statistic
                title={t('assignments:submissionStatuses.turned-in')}
                value={statistics.turnedIn}
              />
            </Grid>
            <Grid item height='100%'>
              <Divider orientation='vertical' flexItem sx={{ minHeight: '100%' }} />
            </Grid>
            <Grid item>
              <Statistic
                title={t('assignments:submissionStatuses.graded')}
                value={statistics.graded}
              />
            </Grid>
            <Grid item />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AssignmentCardAdmin;
