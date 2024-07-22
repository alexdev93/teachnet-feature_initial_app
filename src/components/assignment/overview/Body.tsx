import React, { useState } from 'react';
import { Avatar, Box, Grid, List, ListItem, Paper, Typography, TextField } from '@mui/material';
import { TFunction, useTranslation } from 'next-i18next';
import DropdownMultiple from 'src/components/common/DropdownMultiple';
import SearchInput from 'src/components/common/SearchInput';
import { submissionStatuses } from 'src/constants/statuses';
import Button from 'src/components/common/Button';
import TextFieldPlain from 'src/components/common/TextFieldPlain';

const assignees = [
  { name: 'John Doe', status: 'Turned In', grade: 42 },
  { name: 'Jane Smith', status: 'Graded', grade: 61 },
  { name: 'Michael Johnson', status: 'In Progress', grade: 0 },
  { name: 'Emily Davis', status: 'Overdue', grade: 0 },
  { name: 'David Wilson', status: 'Turned In', grade: 23 },
  { name: 'Sarah Thompson', status: 'Graded', grade: 95 },
  { name: 'Robert Martinez', status: 'In Progress', grade: 0 },
  { name: 'Jennifer Anderson', status: 'Overdue', grade: 0 },
];

const getSubmissionStatusLabels = (t: TFunction) => {
  return submissionStatuses.map(status => ({
    ...status,
    label: t(`assignments:submissionStatuses.${status.value}`),
  }));
};

export default function AssignmentOverviewBody() {
  const { t } = useTranslation();
  const [focusedGradeIndex, setFocusedGradeIndex] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState(assignees[0]);

  const handleGradeFocus = (index: number) => {
    setFocusedGradeIndex(index);
  };

  const handleGradeBlur = () => {
    setFocusedGradeIndex(null);
  };

  const handleGradeChange = (assignee: any, value: string) => {
    // setGrades(prev => ({ ...prev, [index]: value }));
  };

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item sm={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SearchInput placeholder={t('assignments:searchForStudent')} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <DropdownMultiple
                    selectProps={{ multiple: true }}
                    label={t('assignments:submissionStatus')}
                    options={getSubmissionStatusLabels(t)}
                    onChange={values => console.info('values: ', values)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Paper variant='outlined' sx={{ maxHeight: '450px', overflow: 'auto' }}>
                  <List>
                    {assignees.map((assignee, index) => (
                      <ListItem
                        key={index}
                        divider
                        sx={theme => ({
                          cursor: 'pointer',
                          backgroundColor:
                            assignee.name === selectedStudent.name
                              ? theme.palette.secondary.main
                              : 'unset',
                        })}
                        onClick={() => console.info('Student Card Click')}
                      >
                        <Avatar
                          alt='User'
                          src='https://via.placeholder.com/40'
                          sx={{ width: 40, height: 40, mr: 2 }}
                        ></Avatar>
                        <Box
                          display='flex'
                          justifyContent='space-between'
                          alignItems='center'
                          width='100%'
                        >
                          <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{assignee.name} </Typography>
                            <Typography
                              variant='body2'
                              sx={theme => ({ color: theme.palette.text.secondary })}
                            >
                              {assignee.status}
                            </Typography>
                          </Box>
                          <Box
                            id='student-grade'
                            onClick={() => handleGradeFocus(index)}
                            sx={{ minWidth: '60px', textAlign: 'right' }}
                          >
                            {focusedGradeIndex === index ? (
                              <TextField
                                autoFocus
                                size='small'
                                value={assignee.grade}
                                onChange={e => handleGradeChange(assignee, e.target.value)}
                                onBlur={handleGradeBlur}
                                variant='outlined'
                              />
                            ) : (
                              <>{assignee.grade} / 100</>
                            )}
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={9}>
          <Box
            sx={theme => ({
              border: `solid 1px ${theme.palette.divider}`,
              borderRadius: 1,
            })}
          >
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Typography variant='h5'>John Doe</Typography>
              </Grid>
              <Grid item>
                <Button href={`/students/${'studentid12'}`}>View Profile</Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={theme => ({
          position: 'fixed',
          right: theme.spacing(3),
          bottom: theme.spacing(3),
        })}
      >
        <Grid container spacing={1} alignItems='center'>
          <Grid item>
            <Box
              display='flex'
              alignItems='center'
              sx={theme => ({
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 1,
                py: 2,
                px: 3,
              })}
            >
              <TextFieldPlain
                sx={theme => ({
                  '& input': {
                    color: theme.palette.secondary.contrastText,
                    textDecoration: 'underline',
                    fontSize: '1rem',
                    width: '20px',
                    padding: 0,
                  },
                })}
                // value={65}
                autoFocus
                defaultValue={0}
                color='primary'
              />
              <Typography
                variant='body1'
                sx={theme => ({
                  color: theme.palette.secondary.contrastText,
                  px: theme.spacing(1),
                })}
              >
                /
              </Typography>
              <Typography
                variant='body1'
                sx={theme => ({ color: theme.palette.secondary.contrastText })}
              >
                100
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Button
              disabled={true}
              sx={{
                p: '15px',
              }}
              variant='contained'
            >
              {t('common:next')}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
