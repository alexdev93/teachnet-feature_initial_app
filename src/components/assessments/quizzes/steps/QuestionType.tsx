import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import MultipleChoiceIcon from './icons/MultipleChoiceIcon';
import TrueFalseIcon from './icons/TrueFalseIcon';
import FillInTheBlankIcon from './icons/FillInTheBlankIcon';

type QuestionTypeOption = 'multiple-choice' | 'true-false' | 'fill-in-the-blank';

const QuestionType: React.FC = () => {
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState<QuestionTypeOption | null>(null);

  const handleSelect = (type: QuestionTypeOption) => {
    setSelectedType(type);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Grid container spacing={4} justifyContent='center'>
        <Grid item>
          <Paper
            className={`${selectedType === 'multiple-choice' ? 'selected' : ''}`}
            elevation={3}
            sx={{
              padding: theme.spacing(4),
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&.selected': {
                backgroundColor: theme.palette.primary.light,
              },
            }}
            onClick={() => handleSelect('multiple-choice')}
          >
            <MultipleChoiceIcon />
            <Typography variant='h6'>Multiple Choice</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            className={`${selectedType === 'true-false' ? 'selected' : ''}`}
            elevation={3}
            sx={{
              padding: theme.spacing(4),
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&.selected': {
                backgroundColor: theme.palette.primary.light,
              },
            }}
            onClick={() => handleSelect('true-false')}
          >
            <TrueFalseIcon />
            <Typography variant='h6'>True/False</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            className={`${selectedType === 'fill-in-the-blank' ? 'selected' : ''}`}
            elevation={3}
            sx={{
              padding: theme.spacing(4),
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&.selected': {
                backgroundColor: theme.palette.primary.light,
              },
            }}
            onClick={() => handleSelect('fill-in-the-blank')}
          >
            <FillInTheBlankIcon />
            <Typography variant='h6'>Fill in the Blank</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuestionType;
